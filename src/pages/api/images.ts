// src/pages/api/images.ts
import type { APIRoute } from 'astro';

export const GET: APIRoute = async () => {
  try {
    // NAS 내부 또는 Flask API 서버(포트 9002)로 직접 연결
    const response = await fetch('http://localhost:9002/api/images');
    
    if (!response.ok) {
      throw new Error(`Server responded with status: ${response.status}`);
    }

    const data = await response.json();

    return new Response(JSON.stringify(data), {
      status: 200,
      headers: {
        'Content-Type': 'application/json',
      },
    });
  } catch (error) {
    // 만약 localhost 접속이 안 될 경우 NAS 공피/도메인 직접 백업 호출
    try {
      const fallbackResponse = await fetch('https://image.lunasonata.com/api/images');
      const fallbackData = await fallbackResponse.json();
      return new Response(JSON.stringify(fallbackData), {
        status: 200,
        headers: { 'Content-Type': 'application/json' },
      });
    } catch (fallbackError) {
      return new Response(
        JSON.stringify({ success: false, error: '이미지 서버에 연결할 수 없습니다.' }),
        {
          status: 500,
          headers: { 'Content-Type': 'application/json' },
        }
      );
    }
  }
};