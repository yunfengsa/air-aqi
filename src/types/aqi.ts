export interface AqiData {
  status: string;
  data: {
    aqi: number;
    idx: number;
    attributions: {
      url: string;
      name: string;
    }[];
    city: {
      geo: [number, number];
      name: string;
      url: string;
      location: string;
    };
    dominentpol: string;
    iaqi: {
      co?: { v: number };
      h?: { v: number };
      no2?: { v: number };
      o3?: { v: number };
      p?: { v: number };
      pm10?: { v: number };
      pm25?: { v: number };
      so2?: { v: number };
      t?: { v: number };
      w?: { v: number };
      [key: string]: { v: number } | undefined;
    };
    time: {
      s: string;
      tz: string;
      v: number;
      iso: string;
    };
    forecast: {
      daily: {
        o3: ForecastData[];
        pm10: ForecastData[];
        pm25: ForecastData[];
        uvi: ForecastData[];
      };
    };
    debug?: {
      sync: string;
    };
  };
}

export interface ForecastData {
  avg: number;
  day: string;
  max: number;
  min: number;
}
