import { ImageResponse } from 'next/og';

export const size = { width: 1200, height: 630 };
export const contentType = 'image/png';

export default function OgImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: 1200,
          height: 630,
          background: '#070a13',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          position: 'relative',
          overflow: 'hidden',
        }}
      >
        {/* Glow blobs */}
        <div
          style={{
            position: 'absolute',
            top: '50%',
            left: '30%',
            transform: 'translate(-50%, -50%)',
            width: 500,
            height: 500,
            borderRadius: '50%',
            background: 'rgba(220,38,38,0.07)',
            filter: 'blur(80px)',
          }}
        />
        <div
          style={{
            position: 'absolute',
            bottom: -100,
            right: 100,
            width: 350,
            height: 350,
            borderRadius: '50%',
            background: 'rgba(159,18,57,0.08)',
            filter: 'blur(60px)',
          }}
        />

        {/* Content row */}
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: 72,
            padding: '0 96px',
          }}
        >
          {/* Icon */}
          <div
            style={{
              width: 180,
              height: 180,
              borderRadius: 40,
              background: 'linear-gradient(135deg, #dc2626, #9f1239)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              boxShadow: '0 0 80px rgba(220,38,38,0.5)',
              flexShrink: 0,
            }}
          >
            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
              <div
                style={{
                  width: 0,
                  height: 0,
                  borderLeft: '30px solid transparent',
                  borderRight: '30px solid transparent',
                  borderBottom: '42px solid white',
                }}
              />
              <div
                style={{
                  width: 68,
                  height: 68,
                  borderRadius: 34,
                  background: 'white',
                  marginTop: -4,
                }}
              />
            </div>
          </div>

          {/* Text */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
            <div
              style={{
                display: 'flex',
                fontSize: 96,
                fontWeight: 900,
                fontFamily: 'Arial Black, Arial, sans-serif',
                letterSpacing: -3,
                lineHeight: 1,
              }}
            >
              <span style={{ color: 'white' }}>Rokto</span>
              <span style={{ color: '#ef4444' }}>Seva</span>
            </div>
            <div
              style={{
                fontSize: 30,
                color: '#94a3b8',
                fontFamily: 'Arial, sans-serif',
                fontWeight: 600,
                letterSpacing: 1,
                textTransform: 'uppercase',
              }}
            >
              Blood Donation Platform · Bangladesh
            </div>
            <div
              style={{
                display: 'flex',
                gap: 16,
                marginTop: 8,
              }}
            >
              {['Find Donors', 'Emergency Requests', 'Save Lives'].map((tag) => (
                <div
                  key={tag}
                  style={{
                    fontSize: 18,
                    color: '#ef4444',
                    fontFamily: 'Arial, sans-serif',
                    fontWeight: 700,
                    padding: '6px 16px',
                    border: '1px solid rgba(239,68,68,0.3)',
                    borderRadius: 8,
                    background: 'rgba(239,68,68,0.08)',
                    textTransform: 'uppercase',
                    letterSpacing: 1,
                  }}
                >
                  {tag}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    ),
    { ...size }
  );
}
