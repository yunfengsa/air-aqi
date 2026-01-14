## 接口地址
https://api.waqi.info/feed/jinan/?token={{API_TOKEN}}

## 接口说明
访问 https://aqicn.org/json-api/doc/#api-Geolocalized_Feed-GetGeolocFeed 进行查看

## 示例数据
https://api.waqi.info/feed/jinan/?token=xx

```json
{
    "status": "ok",
    "data": {
        "aqi": 157,
        "idx": 1505,
        "attributions": [
            {
                "url": "http://sthj.shandong.gov.cn/",
                "name": "Environmental Protection Department of Shandong Province (山东省环境保护厅)"
            },
            {
                "url": "https://waqi.info/",
                "name": "World Air Quality Index Project"
            }
        ],
        "city": {
            "geo": [
                36.650997,
                117.120497
            ],
            "name": "Jinan (济南)",
            "url": "https://aqicn.org/city/jinan",
            "location": ""
        },
        "dominentpol": "pm25",
        "iaqi": {
            "co": {
                "v": 0.1
            },
            "h": {
                "v": 53
            },
            "no2": {
                "v": 26.6
            },
            "o3": {
                "v": 1.3
            },
            "p": {
                "v": 996.5
            },
            "pm10": {
                "v": 96
            },
            "pm25": {
                "v": 157
            },
            "so2": {
                "v": 8.2
            },
            "t": {
                "v": 2.1
            },
            "w": {
                "v": 2
            }
        },
        "time": {
            "s": "2026-01-14 07:00:00",
            "tz": "+08:00",
            "v": 1768374000,
            "iso": "2026-01-14T07:00:00+08:00"
        },
        "forecast": {
            "daily": {
                "o3": [
                    {
                        "avg": 8,
                        "day": "2025-04-05",
                        "max": 10,
                        "min": 7
                    }
                ],
                "pm10": [
                    {
                        "avg": 46,
                        "day": "2026-01-12",
                        "max": 46,
                        "min": 46
                    },
                    {
                        "avg": 38,
                        "day": "2026-01-13",
                        "max": 46,
                        "min": 23
                    },
                    {
                        "avg": 57,
                        "day": "2026-01-14",
                        "max": 58,
                        "min": 46
                    },
                    {
                        "avg": 47,
                        "day": "2026-01-15",
                        "max": 58,
                        "min": 46
                    },
                    {
                        "avg": 58,
                        "day": "2026-01-16",
                        "max": 69,
                        "min": 46
                    },
                    {
                        "avg": 47,
                        "day": "2026-01-17",
                        "max": 57,
                        "min": 46
                    },
                    {
                        "avg": 26,
                        "day": "2026-01-18",
                        "max": 45,
                        "min": 19
                    },
                    {
                        "avg": 16,
                        "day": "2026-01-19",
                        "max": 24,
                        "min": 10
                    },
                    {
                        "avg": 19,
                        "day": "2026-01-20",
                        "max": 19,
                        "min": 11
                    }
                ],
                "pm25": [
                    {
                        "avg": 138,
                        "day": "2026-01-12",
                        "max": 138,
                        "min": 138
                    },
                    {
                        "avg": 112,
                        "day": "2026-01-13",
                        "max": 138,
                        "min": 76
                    },
                    {
                        "avg": 157,
                        "day": "2026-01-14",
                        "max": 159,
                        "min": 138
                    },
                    {
                        "avg": 117,
                        "day": "2026-01-15",
                        "max": 158,
                        "min": 89
                    },
                    {
                        "avg": 153,
                        "day": "2026-01-16",
                        "max": 170,
                        "min": 138
                    },
                    {
                        "avg": 136,
                        "day": "2026-01-17",
                        "max": 148,
                        "min": 124
                    },
                    {
                        "avg": 74,
                        "day": "2026-01-18",
                        "max": 133,
                        "min": 68
                    },
                    {
                        "avg": 52,
                        "day": "2026-01-19",
                        "max": 68,
                        "min": 37
                    },
                    {
                        "avg": 67,
                        "day": "2026-01-20",
                        "max": 68,
                        "min": 47
                    }
                ],
                "uvi": [
                    {
                        "avg": 0,
                        "day": "2026-01-13",
                        "max": 0,
                        "min": 0
                    },
                    {
                        "avg": 0,
                        "day": "2026-01-14",
                        "max": 1,
                        "min": 0
                    },
                    {
                        "avg": 0,
                        "day": "2026-01-15",
                        "max": 2,
                        "min": 0
                    },
                    {
                        "avg": 0,
                        "day": "2026-01-16",
                        "max": 2,
                        "min": 0
                    },
                    {
                        "avg": 1,
                        "day": "2026-01-17",
                        "max": 2,
                        "min": 0
                    },
                    {
                        "avg": 0,
                        "day": "2026-01-18",
                        "max": 0,
                        "min": 0
                    }
                ]
            }
        },
        "debug": {
            "sync": "2026-01-14T08:27:04+09:00"
        }
    }
}