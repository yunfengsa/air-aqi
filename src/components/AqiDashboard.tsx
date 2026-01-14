'use client';

import React, { useState, useEffect } from 'react';
import { AqiData } from '@/types/aqi';
import { getAqiLevel, getPollutantLevel } from '@/lib/aqi';
import PollutantDetailModal from './PollutantDetailModal';

interface AqiDashboardProps {
  initialData: AqiData['data'];
}

export default function AqiDashboard({ initialData }: AqiDashboardProps) {
  const [data, setData] = useState<AqiData['data']>(initialData);
  const [isRefreshing, setIsRefreshing] = useState(false);
  
  // State for Modal
  const [selectedPollutant, setSelectedPollutant] = useState<any | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  // Poll for updates every 4 hours (14,400,000 ms)
  useEffect(() => {
    const FOUR_HOURS_MS = 4 * 60 * 60 * 1000;
    
    const fetchData = async () => {
      setIsRefreshing(true);
      try {
        const res = await fetch('/api/aqi');
        if (res.ok) {
          const newData: AqiData = await res.json();
          if (newData.status === 'ok') {
            setData(newData.data);
          }
        }
      } catch (error) {
        console.error('Failed to auto-refresh AQI data:', error);
      } finally {
        setIsRefreshing(false);
      }
    };

    const interval = setInterval(fetchData, FOUR_HOURS_MS);
    return () => clearInterval(interval);
  }, []);

  const openModal = (key: string, value: number) => {
    const details = getPollutantLevel(key, value);
    // Combine fetched data with static dictionary data
    setSelectedPollutant({ ...details, value });
    setIsModalOpen(true);
  };

  const currentAqi = data.aqi;
  const { level, color, message } = getAqiLevel(currentAqi);
  const city = data.city.name;
  const time = data.time.s;

  // Filter forecast data to show only today and future
  const today = new Date().toISOString().split('T')[0];
  const filteredForecast = data.forecast.daily.pm25?.filter(day => day.day >= today) || [];

  return (
    <div className="max-w-4xl mx-auto p-4 md:p-6 space-y-8">
      {/* Header Section */}
      <header className="text-center space-y-2 relative">
        <h1 className="text-3xl md:text-4xl font-bold text-gray-800 dark:text-gray-100">
          空气质量指数 (AQI) 
        </h1>
        <div className="flex items-center justify-center gap-2 text-gray-500 dark:text-gray-400">
          <span>{city} - 更新时间: {time}</span>
          {isRefreshing && (
            <span className="inline-block w-2 h-2 bg-blue-500 rounded-full animate-pulse" title="正在更新..." />
          )}
        </div>
      </header>

      {/* Main AQI Card */}
      <div className={`rounded-3xl p-8 shadow-xl text-white transition-all duration-500 transform hover:scale-[1.01] ${color}`}>
        <div className="flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="text-center md:text-left space-y-2">
            <h2 className="text-2xl font-semibold opacity-90">当前 AQI 指数</h2>
            <div className="text-6xl md:text-8xl font-bold tracking-tighter">{currentAqi}</div>
          </div>
          <div className="text-center md:text-right space-y-2">
            <div className="text-4xl font-bold bg-white/20 backdrop-blur-sm px-6 py-2 rounded-full inline-block">
              {level}
            </div>
            <p className="text-lg opacity-90 max-w-md">{message}</p>
          </div>
        </div>
      </div>

      {/* Pollutants Grid - ENHANCED */}
      <section>
        <h3 className="text-xl font-semibold mb-4 text-gray-700 dark:text-gray-200 flex items-center gap-2">
          <span>详细污染物指标</span>
          <span className="text-xs font-normal text-gray-500 border border-gray-300 rounded px-1.5 py-0.5">点击查看详情</span>
        </h3>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
          {Object.entries(data.iaqi).map(([key, value]) => {
            if (!value) return null;
            
            // Get enriched data
            const info = getPollutantLevel(key, value.v);
            const isClickable = info.levels && info.levels.length > 0;

            return (
              <button 
                key={key} 
                onClick={() => isClickable && openModal(key, value.v)}
                disabled={!isClickable}
                className={`text-left w-full relative overflow-hidden bg-white dark:bg-gray-800 rounded-xl p-4 shadow-sm border transition-all duration-200 
                  ${isClickable ? 'hover:shadow-md hover:scale-105 cursor-pointer active:scale-95' : 'cursor-default'}
                  border-gray-100 dark:border-gray-700
                `}
              >
                {/* Color Status Indicator Strip (if applicable) */}
                {info.currentLevel.label !== '-' && (
                     <div className={`absolute top-0 left-0 w-1.5 h-full ${info.currentLevel.color}`} />
                )}

                <div className="pl-2">
                    <div className="flex justify-between items-start mb-1">
                        <span className="text-sm text-gray-500 dark:text-gray-400 font-medium truncate" title={info.desc}>{info.desc}</span>
                        {/* Status Label (Tiny) */}
                        {info.currentLevel.label !== '-' && (
                             <span className={`text-[10px] px-1.5 py-0.5 rounded ${info.currentLevel.color} text-white font-bold`}>
                                 {info.currentLevel.label}
                             </span>
                        )}
                    </div>
                    
                    <div className="flex items-baseline gap-1">
                         <div className={`text-2xl font-bold ${info.currentLevel.textColor || 'text-gray-800 dark:text-gray-100'}`}>
                            {value.v}
                         </div>
                         {info.unit && <span className="text-xs text-gray-400">{info.unit}</span>}
                    </div>
                    
                    <div className="text-xs font-mono text-gray-400 mt-2 bg-gray-50 dark:bg-gray-700/50 inline-block px-1.5 py-0.5 rounded">
                        {info.name}
                    </div>
                </div>
              </button>
            );
          })}
        </div>
      </section>

      {/* Forecast Section */}
      <section>
        <h3 className="text-xl font-semibold mb-4 text-gray-700 dark:text-gray-200">未来几天预报 (PM2.5)</h3>
        
        {/* Desktop View: Table */}
        <div className="hidden md:block bg-white dark:bg-gray-800 rounded-2xl shadow-sm border border-gray-100 dark:border-gray-700 overflow-hidden">
            <table className="w-full text-left text-sm">
                <thead className="bg-gray-50 dark:bg-gray-700/50 text-gray-600 dark:text-gray-300">
                    <tr>
                        <th className="px-6 py-3 font-medium">日期</th>
                        <th className="px-6 py-3 font-medium">平均值</th>
                        <th className="px-6 py-3 font-medium text-center">范围 (Min - Max)</th>
                        <th className="px-6 py-3 font-medium text-right">质量等级</th>
                    </tr>
                </thead>
                <tbody className="divide-y divide-gray-100 dark:divide-gray-700">
                    {filteredForecast.map((day, idx) => {
                         const { level: dayLevel, color: dayColor } = getAqiLevel(day.avg);
                         return (
                            <tr key={idx} className="hover:bg-gray-50/50 dark:hover:bg-gray-700/30 transition-colors">
                                <td className="px-6 py-4 font-medium text-gray-900 dark:text-gray-100 whitespace-nowrap">{day.day}</td>
                                <td className="px-6 py-4">{day.avg}</td>
                                <td className="px-6 py-4">
                                    <div className="flex items-center justify-center gap-2">
                                        <span className="text-xs text-gray-400">{day.min}</span>
                                        <div className="w-24 h-1.5 bg-gray-200 rounded-full overflow-hidden relative">
                                            <div 
                                                className="absolute top-0 bottom-0 bg-blue-500 opacity-50"
                                                style={{ 
                                                    left: `${Math.min((day.min / 300) * 100, 100)}%`, 
                                                    right: `${Math.max(100 - (day.max / 300) * 100, 0)}%` 
                                                }}
                                            />
                                        </div>
                                        <span className="text-xs text-gray-400">{day.max}</span>
                                    </div>
                                </td>
                                <td className="px-6 py-4 text-right">
                                    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${dayColor} text-white`}>
                                        {dayLevel}
                                    </span>
                                </td>
                            </tr>
                         );
                    })}
                </tbody>
            </table>
        </div>

        {/* Mobile View: Cards */}
        <div className="md:hidden space-y-3">
          {filteredForecast.map((day, idx) => {
            const { level: dayLevel, color: dayColor } = getAqiLevel(day.avg);
            return (
              <div key={idx} className="bg-white dark:bg-gray-800 p-4 rounded-xl shadow-sm border border-gray-100 dark:border-gray-700 flex items-center justify-between">
                <div className="space-y-1">
                  <div className="text-sm font-medium text-gray-900 dark:text-gray-100">{day.day}</div>
                  <div className="text-xs text-gray-500 flex items-center gap-2">
                    <span>平均: <b className="text-gray-700 dark:text-gray-300">{day.avg}</b></span>
                    <span>({day.min} - {day.max})</span>
                  </div>
                </div>
                <div className={`px-3 py-1 rounded-full text-xs font-semibold text-white ${dayColor}`}>
                  {dayLevel}
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* Footer / Attributions */}
      <footer className="pt-8 border-t border-gray-200 dark:border-gray-800 text-center text-sm text-gray-500">
        <p className="mb-2 font-medium">数据来源</p>
        <div className="flex flex-wrap justify-center gap-x-6 gap-y-2">
          {data.attributions.map((attr, idx) => (
            <a 
              key={idx} 
              href={attr.url} 
              target="_blank" 
              rel="noopener noreferrer"
              className="hover:text-blue-500 underline decoration-dotted underline-offset-2 transition-colors whitespace-nowrap"
            >
              {attr.name.split(' (')[0]} {/* Shorten name for mobile if it contains parenthesis */}
            </a>
          ))}
        </div>
      </footer>
      
      {/* Detail Modal */}
      <PollutantDetailModal 
        isOpen={isModalOpen} 
        onClose={() => setIsModalOpen(false)} 
        data={selectedPollutant}
      />
    </div>
  );
}
