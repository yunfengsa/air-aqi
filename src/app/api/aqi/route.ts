import { NextRequest, NextResponse } from 'next/server';
import { getAqiData } from '@/lib/aqi';

export async function GET(request: NextRequest) {
  const origin = request.headers.get('origin');
  const referer = request.headers.get('referer');
  const host = request.headers.get('host');

  // Helper to verify if a URL's host matches the request host
  const isSameHost = (urlStr: string | null) => {
    if (!urlStr || !host) return false;
    try {
      const url = new URL(urlStr);
      return url.host === host;
    } catch {
      return false;
    }
  };

  // Strictly require the request to come from the same origin or referer
  // This blocks direct API calls from tools (curl/Postman) or other websites
  const isAllowed = isSameHost(origin) || isSameHost(referer);

  if (!isAllowed) {
    return NextResponse.json(
      { error: 'Forbidden: Access denied from external sources' },
      { status: 403 }
    );
  }

  const data = await getAqiData('jinan');
  
  if (!data) {
    return NextResponse.json({ error: 'Failed to fetch data' }, { status: 500 });
  }

  return NextResponse.json(data);
}