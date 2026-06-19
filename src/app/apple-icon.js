import { ImageResponse } from 'next/og';

export const size = { width: 180, height: 180 };
export const contentType = 'image/png';

export default function AppleIcon() {
  return new ImageResponse(
    (
      <div
        style={{
          width: 180,
          height: 180,
          background: '#070a13',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          gap: 14,
        }}
      >
        {/* Icon circle */}
        <div
          style={{
            width: 96,
            height: 96,
            borderRadius: 24,
            background: 'linear-gradient(135deg, #dc2626, #9f1239)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            boxShadow: '0 0 40px rgba(220,38,38,0.5)',
          }}
        >
          <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
            <div
              style={{
                width: 0,
                height: 0,
                borderLeft: '16px solid transparent',
                borderRight: '16px solid transparent',
                borderBottom: '22px solid white',
              }}
            />
            <div
              style={{
                width: 36,
                height: 36,
                borderRadius: 18,
                background: 'white',
                marginTop: -2,
              }}
            />
          </div>
        </div>
        {/* Text */}
        <div
          style={{
            display: 'flex',
            fontSize: 28,
            fontWeight: 900,
            fontFamily: 'Arial Black, Arial, sans-serif',
            letterSpacing: -1,
          }}
        >
          <span style={{ color: 'white' }}>Rokto</span>
          <span style={{ color: '#ef4444' }}>Seva</span>
        </div>
      </div>
    ),
    { ...size }
  );
}
