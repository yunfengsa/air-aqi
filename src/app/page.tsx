import { getAqiData } from '@/lib/aqi';
import AqiDashboard from '@/components/AqiDashboard';

export const metadata = {
  title: '空气质量指数 (AQI)  - 济南',
  description: '实时查看济南及周边城市的空气质量指数 (AQI) 及详细污染物数据。',
};

export default async function Home() {
  const aqiData = await getAqiData('jinan');

  if (!aqiData) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50 dark:bg-gray-900 p-4">
        <div className="bg-white dark:bg-gray-800 p-8 rounded-2xl shadow-xl text-center max-w-md w-full">
          <div className="text-red-500 text-5xl mb-4">⚠️</div>
          <h1 className="text-2xl font-bold text-gray-800 dark:text-gray-100 mb-2">无法获取数据</h1>
          <p className="text-gray-600 dark:text-gray-400 mb-6">
            抱歉，暂时无法连接到 AQI 数据服务。可能是因为 API 配额限制或网络问题。
          </p>
          <p className="text-sm text-gray-500 bg-gray-100 dark:bg-gray-700 p-3 rounded">
            请检查 API Token 是否配置正确。
          </p>
        </div>
      </div>
    );
  }

  return (
    <main className="min-h-screen bg-gray-50 dark:bg-gray-950 py-8 md:py-12 transition-colors">
      <AqiDashboard initialData={aqiData.data} />
    </main>
  );
}