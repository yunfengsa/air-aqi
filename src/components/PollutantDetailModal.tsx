'use client';

import React from 'react';
import { PollutantInfo } from '@/lib/aqi';

interface PollutantDetailModalProps {
  isOpen: boolean;
  onClose: () => void;
  data: (PollutantInfo & { value: number; currentLevel: any }) | null;
}

export default function PollutantDetailModal({ isOpen, onClose, data }: PollutantDetailModalProps) {
  if (!isOpen || !data) return null;

  const { currentLevel } = data;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-0">
      {/* Backdrop */}
      <div 
        className="absolute inset-0 bg-black/40 backdrop-blur-sm transition-opacity"
        onClick={onClose}
      />

      {/* Modal Card */}
      <div className="relative bg-white dark:bg-gray-800 rounded-2xl shadow-2xl w-full max-w-lg overflow-hidden flex flex-col max-h-[90vh] animate-in fade-in zoom-in-95 duration-200">
        
        {/* Header with Dynamic Color */}
        <div className={`${currentLevel.color} p-6 text-white`}>
            <div className="flex justify-between items-start">
                <div>
                    <h2 className="text-3xl font-bold flex items-center gap-2">
                        {data.name}
                        <span className="text-lg font-normal opacity-80 bg-white/20 px-2 py-0.5 rounded-md">
                            {data.value} {data.unit}
                        </span>
                    </h2>
                    <p className="opacity-90 mt-1">{data.desc}</p>
                </div>
                <button 
                    onClick={onClose}
                    className="p-1 rounded-full bg-white/20 hover:bg-white/30 transition-colors"
                >
                    <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                    </svg>
                </button>
            </div>
            
            <div className="mt-6 flex items-center gap-3">
                <div className="text-4xl font-bold bg-white/20 backdrop-blur-md px-4 py-1 rounded-lg">
                   {currentLevel.label}
                </div>
            </div>
        </div>

        {/* Scrollable Content */}
        <div className="p-6 overflow-y-auto space-y-6 text-gray-700 dark:text-gray-200">
            
            {/* Health & Advice Section */}
            <div className="space-y-4">
                <div className="bg-blue-50 dark:bg-blue-900/20 p-4 rounded-xl border border-blue-100 dark:border-blue-800">
                    <h3 className="text-blue-700 dark:text-blue-300 font-semibold mb-2 flex items-center gap-2">
                        <span className="text-xl">🩺</span> 健康影响
                    </h3>
                    <p className="text-sm leading-relaxed">{currentLevel.healthEffect}</p>
                </div>

                <div className="bg-green-50 dark:bg-green-900/20 p-4 rounded-xl border border-green-100 dark:border-green-800">
                    <h3 className="text-green-700 dark:text-green-300 font-semibold mb-2 flex items-center gap-2">
                        <span className="text-xl">🛡️</span> 建议措施
                    </h3>
                    <p className="text-sm leading-relaxed">{currentLevel.advice}</p>
                </div>
            </div>

            {/* Encyclopedia Section */}
            <div className="space-y-4 pt-2 border-t border-gray-100 dark:border-gray-700">
                <div>
                    <h4 className="font-semibold text-gray-900 dark:text-gray-100 mb-1">什么是 {data.name}?</h4>
                    <p className="text-sm text-gray-500 dark:text-gray-400 leading-relaxed">
                        {data.definition}
                    </p>
                </div>
                <div>
                    <h4 className="font-semibold text-gray-900 dark:text-gray-100 mb-1">主要来源</h4>
                    <p className="text-sm text-gray-500 dark:text-gray-400 leading-relaxed">
                        {data.source}
                    </p>
                </div>
            </div>

        </div>
      </div>
    </div>
  );
}
