import { ImageResponse } from '@vercel/og';
import { NextRequest } from 'next/server';

export const config = {
  runtime: 'edge',
};

export default function handler(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const title = searchParams.get('title') || 'Web3 Trivia Quest';
    const subtitle = searchParams.get('subtitle');
    const score = searchParams.get('score');

    return new ImageResponse(
      (
        <div
          style={{
            height: '100%',
            width: '100%',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
            fontSize: 32,
            fontWeight: 600,
          }}
        >
          <div
            style={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              justifyContent: 'center',
              padding: '40px',
              backgroundColor: 'rgba(255, 255, 255, 0.95)',
              borderRadius: '24px',
              boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.25)',
              maxWidth: '800px',
              textAlign: 'center',
            }}
          >
            <div
              style={{
                fontSize: 48,
                fontWeight: 'bold',
                color: '#1f2937',
                marginBottom: '16px',
              }}
            >
              {title}
            </div>
            {subtitle && (
              <div
                style={{
                  fontSize: 24,
                  color: '#6b7280',
                  marginBottom: '24px',
                }}
              >
                {subtitle}
              </div>
            )}
            {score && (
              <div
                style={{
                  fontSize: 36,
                  fontWeight: 'bold',
                  color: '#059669',
                  background: 'linear-gradient(90deg, #10b981, #059669)',
                  backgroundClip: 'text',
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                }}
              >
                Score: {score}
              </div>
            )}
          </div>
        </div>
      ),
      {
        width: 1200,
        height: 630,
      }
    );
  } catch (error) {
    console.error('Error generating OG image:', error);
    return new Response('Failed to generate image', { status: 500 });
  }
}