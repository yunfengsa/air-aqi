import { AqiData } from '@/types/aqi';

const AQI_API_TOKEN = process.env.AQI_API_TOKEN;
const BASE_URL = 'https://api.waqi.info/feed';

export async function getAqiData(city: string = 'jinan'): Promise<AqiData | null> {
  if (!AQI_API_TOKEN) {
    console.error('AQI_API_TOKEN is not defined in environment variables.');
    return null;
  }

  try {
    const res = await fetch(`${BASE_URL}/${city}/?token=${AQI_API_TOKEN}`, {
      next: { revalidate: 3600 }, 
    });

    if (!res.ok) {
      throw new Error(`Failed to fetch AQI data: ${res.statusText}`);
    }

    const data: AqiData = await res.json();
    
    if (data.status !== 'ok') {
        console.error('API returned error status:', data);
        return null;
    }

    return data;
  } catch (error) {
    console.error('Error fetching AQI data:', error);
    return null;
  }
}

// ----------------------------------------------------------------------
// Types & Constants for Pollutant Details
// ----------------------------------------------------------------------

export interface PollutantInfo {
  name: string;
  desc: string;
  unit: string; // e.g., 'µg/m³', 'ppb'
  definition: string;
  source: string;
  levels: {
    max: number; // Upper limit for this level
    label: string;
    healthEffect: string;
    advice: string;
    color: string;
    textColor: string;
  }[];
}

export const POLLUTANT_DETAILS: Record<string, PollutantInfo> = {
  pm25: {
    name: 'PM2.5',
    desc: '细颗粒物',
    unit: 'µg/m³',
    definition: '直径小于2.5微米的颗粒物，能直接入肺，对人体危害最大。',
    source: '主要来源：汽车尾气、工业排放、燃煤、扬尘、二手烟等。',
    levels: [
      { max: 35, label: '优', healthEffect: '空气质量令人满意，基本无空气污染。', advice: '各类人群可正常活动。', color: 'bg-green-500', textColor: 'text-green-700' },
      { max: 75, label: '良', healthEffect: '空气质量可接受，但某些污染物可能对极少数异常敏感人群健康有较弱影响。', advice: '极少数异常敏感人群应减少户外活动。', color: 'bg-yellow-400', textColor: 'text-yellow-700' },
      { max: 115, label: '轻度污染', healthEffect: '易感人群症状有轻度加剧，健康人群出现刺激症状。', advice: '儿童、老年人及心脏病、呼吸系统疾病患者应减少长时间、高强度的户外锻炼。', color: 'bg-orange-500', textColor: 'text-orange-700' },
      { max: 150, label: '中度污染', healthEffect: '进一步加剧易感人群症状，可能对健康人群心脏、呼吸系统有影响。', advice: '儿童、老年人及心脏病、呼吸系统疾病患者避免长时间、高强度的户外锻炼，一般人群适量减少户外运动。', color: 'bg-red-500', textColor: 'text-red-700' },
      { max: 250, label: '重度污染', healthEffect: '心脏病和肺病患者症状显著加剧，运动耐受力降低，健康人群普遍出现症状。', advice: '儿童、老年人和心脏病、肺病患者应停留在室内，停止户外运动，一般人群减少户外运动。', color: 'bg-purple-500', textColor: 'text-purple-700' },
      { max: Infinity, label: '严重污染', healthEffect: '健康人群运动耐受力降低，有明显强烈症状，提前出现某些疾病。', advice: '儿童、老年人和病人应停留在室内，避免体力消耗，一般人群避免户外活动。', color: 'bg-red-900', textColor: 'text-red-900' },
    ],
  },
  pm10: {
    name: 'PM10',
    desc: '可吸入颗粒物',
    unit: 'µg/m³',
    definition: '直径小于10微米的颗粒物，可沉积在呼吸道。',
    source: '主要来源：道路扬尘、施工扬尘、风沙、工业粉尘等。',
    levels: [
      { max: 50, label: '优', healthEffect: '空气质量令人满意。', advice: '正常活动。', color: 'bg-green-500', textColor: 'text-green-700' },
      { max: 150, label: '良', healthEffect: '对极少数敏感人群有轻微影响。', advice: '敏感人群减少户外活动。', color: 'bg-yellow-400', textColor: 'text-yellow-700' },
      { max: 250, label: '轻度污染', healthEffect: '易感人群症状加剧。', advice: '老人、儿童减少户外活动。', color: 'bg-orange-500', textColor: 'text-orange-700' },
      { max: 350, label: '中度污染', healthEffect: '可能对呼吸系统产生影响。', advice: '避免长时间户外运动。', color: 'bg-red-500', textColor: 'text-red-700' },
      { max: 420, label: '重度污染', healthEffect: '症状显著加剧。', advice: '停止户外活动。', color: 'bg-purple-500', textColor: 'text-purple-700' },
      { max: Infinity, label: '严重污染', healthEffect: '明显强烈症状。', advice: '避免户外活动。', color: 'bg-red-900', textColor: 'text-red-900' },
    ],
  },
  o3: {
    name: 'O3',
    desc: '臭氧',
    unit: 'µg/m³',
    definition: '地面臭氧是光化学烟雾的主要成分，具有强刺激性。',
    source: '主要来源：汽车尾气、工业排放与阳光反应生成。',
    levels: [
      { max: 100, label: '优', healthEffect: '无影响。', advice: '正常活动。', color: 'bg-green-500', textColor: 'text-green-700' },
      { max: 160, label: '良', healthEffect: '可能对极少数敏感人群有影响。', advice: '敏感人群适量减少户外活动。', color: 'bg-yellow-400', textColor: 'text-yellow-700' },
      { max: 215, label: '轻度污染', healthEffect: '刺激眼睛和呼吸道。', advice: '儿童、老人减少户外活动。', color: 'bg-orange-500', textColor: 'text-orange-700' },
      { max: 265, label: '中度污染', healthEffect: '呼吸系统症状加剧。', advice: '避免户外活动。', color: 'bg-red-500', textColor: 'text-red-700' },
      { max: 800, label: '重度污染', healthEffect: '严重刺激呼吸系统。', advice: '停止户外活动。', color: 'bg-purple-500', textColor: 'text-purple-700' },
      { max: Infinity, label: '严重污染', healthEffect: '极度危害健康。', advice: '避免外出。', color: 'bg-red-900', textColor: 'text-red-900' },
    ],
  },
  no2: {
    name: 'NO2',
    desc: '二氧化氮',
    unit: 'µg/m³',
    definition: '红棕色有刺激性气味的气体，是酸雨的主要成因之一。',
    source: '主要来源：汽车尾气、燃煤发电、工业锅炉。',
    levels: [
      { max: 40, label: '优', healthEffect: '无影响。', advice: '正常活动。', color: 'bg-green-500', textColor: 'text-green-700' },
      { max: 80, label: '良', healthEffect: '基本无影响。', advice: '正常活动。', color: 'bg-yellow-400', textColor: 'text-yellow-700' },
      { max: 180, label: '轻度污染', healthEffect: '刺激呼吸道。', advice: '敏感人群减少户外活动。', color: 'bg-orange-500', textColor: 'text-orange-700' },
      { max: 280, label: '中度污染', healthEffect: '加剧哮喘症状。', advice: '避免长时间户外活动。', color: 'bg-red-500', textColor: 'text-red-700' },
      { max: 565, label: '重度污染', healthEffect: '严重影响呼吸系统。', advice: '停止户外活动。', color: 'bg-purple-500', textColor: 'text-purple-700' },
      { max: Infinity, label: '严重污染', healthEffect: '极度危害。', advice: '避免外出。', color: 'bg-red-900', textColor: 'text-red-900' },
    ],
  },
  so2: {
    name: 'SO2',
    desc: '二氧化硫',
    unit: 'µg/m³',
    definition: '无色有刺激性气味的气体，酸雨主要成分。',
    source: '主要来源：燃煤发电、金属冶炼、化工生产。',
    levels: [
      { max: 50, label: '优', healthEffect: '无影响。', advice: '正常活动。', color: 'bg-green-500', textColor: 'text-green-700' },
      { max: 150, label: '良', healthEffect: '基本无影响。', advice: '正常活动。', color: 'bg-yellow-400', textColor: 'text-yellow-700' },
      { max: 475, label: '轻度污染', healthEffect: '易感人群有轻微症状。', advice: '敏感人群减少户外活动。', color: 'bg-orange-500', textColor: 'text-orange-700' },
      { max: 800, label: '中度污染', healthEffect: '呼吸道疾病患者症状加剧。', advice: '避免户外活动。', color: 'bg-red-500', textColor: 'text-red-700' },
      { max: 1600, label: '重度污染', healthEffect: '明显危害健康。', advice: '停止户外活动。', color: 'bg-purple-500', textColor: 'text-purple-700' },
      { max: Infinity, label: '严重污染', healthEffect: '极度危害。', advice: '避免外出。', color: 'bg-red-900', textColor: 'text-red-900' },
    ],
  },
  co: {
    name: 'CO',
    desc: '一氧化碳',
    unit: 'mg/m³',
    definition: '无色无味有毒气体，主要由燃料不完全燃烧产生。',
    source: '主要来源：汽车尾气、燃煤取暖、工业废气。',
    levels: [
      { max: 2, label: '优', healthEffect: '无影响。', advice: '正常活动。', color: 'bg-green-500', textColor: 'text-green-700' },
      { max: 4, label: '良', healthEffect: '基本无影响。', advice: '正常活动。', color: 'bg-yellow-400', textColor: 'text-yellow-700' },
      { max: 14, label: '轻度污染', healthEffect: '心脏病患者受影响。', advice: '心脏病患者减少体力消耗。', color: 'bg-orange-500', textColor: 'text-orange-700' },
      { max: 24, label: '中度污染', healthEffect: '心血管系统受损。', advice: '避免剧烈运动。', color: 'bg-red-500', textColor: 'text-red-700' },
      { max: 36, label: '重度污染', healthEffect: '中枢神经系统受损。', advice: '停止户外活动。', color: 'bg-purple-500', textColor: 'text-purple-700' },
      { max: Infinity, label: '严重污染', healthEffect: '严重危害生命。', advice: '避免外出。', color: 'bg-red-900', textColor: 'text-red-900' },
    ],
  },
  // Default/Generic fallback for weather data or unknown pollutants
  default: {
    name: 'Unknown',
    desc: '环境指标',
    unit: '',
    definition: '该指标主要用于辅助判断天气状况。',
    source: '气象监测站。',
    levels: [],
  },
};

// Helper function to get details for a specific pollutant value
export function getPollutantLevel(key: string, value: number) {
  const info = POLLUTANT_DETAILS[key] || { ...POLLUTANT_DETAILS.default, name: key.toUpperCase(), desc: key.toUpperCase() };
  
  // Find the matching level based on value
  const levelInfo = info.levels?.find(l => value <= l.max);
  
  // Return combined info. If no level matches (or for weather data), return safe defaults
  return {
    ...info,
    currentLevel: levelInfo || {
      label: '-',
      healthEffect: '无特别说明',
      advice: '无特别说明',
      color: 'bg-gray-100 dark:bg-gray-700',
      textColor: 'text-gray-600 dark:text-gray-300'
    }
  };
}

export const POLLUTANT_NAMES: Record<string, { name: string; desc: string }> = {
    // Keep this for backward compatibility if needed, but POLLUTANT_DETAILS is preferred now
    pm25: { name: 'PM2.5', desc: '细颗粒物' },
    pm10: { name: 'PM10', desc: '可吸入颗粒物' },
    o3: { name: 'O3', desc: '臭氧' },
    no2: { name: 'NO2', desc: '二氧化氮' },
    so2: { name: 'SO2', desc: '二氧化硫' },
    co: { name: 'CO', desc: '一氧化碳' },
    t: { name: 'Temperature', desc: '温度' },
    w: { name: 'Wind', desc: '风速' },
    h: { name: 'Humidity', desc: '湿度' },
    p: { name: 'Pressure', desc: '气压' },
    d: { name: 'Dew', desc: '露点' },
    wg: { name: 'Wind Gust', desc: '阵风' },
};

export function getAqiLevel(aqi: number): { level: string; color: string; message: string; textColor: string } {
  if (aqi <= 50) return { level: '优', color: 'bg-green-500', textColor: 'text-green-700', message: '空气质量令人满意，基本无空气污染。' };
  if (aqi <= 100) return { level: '良', color: 'bg-yellow-400', textColor: 'text-yellow-700', message: '空气质量可接受，但某些污染物可能对极少数异常敏感人群健康有较弱影响。' };
  if (aqi <= 150) return { level: '轻度污染', color: 'bg-orange-500', textColor: 'text-orange-700', message: '易感人群症状有轻度加剧，健康人群出现刺激症状。' };
  if (aqi <= 200) return { level: '中度污染', color: 'bg-red-500', textColor: 'text-red-700', message: '进一步加剧易感人群症状，可能对健康人群心脏、呼吸系统有影响。' };
  if (aqi <= 300) return { level: '重度污染', color: 'bg-purple-500', textColor: 'text-purple-700', message: '心脏病和肺病患者症状显著加剧，运动耐受力降低，健康人群普遍出现症状。' };
  return { level: '严重污染', color: 'bg-red-900', textColor: 'text-red-900', message: '健康人群运动耐受力降低，有明显强烈症状，提前出现某些疾病。' };
}