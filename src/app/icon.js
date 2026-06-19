import { ImageResponse } from 'next/og';

export const size = { width: 32, height: 32 };
export const contentType = 'image/png';

export default function Icon() {
  return new ImageResponse(
    (
      <div
        style={{
          width: 32,
          height: 32,
          borderRadius: 8,
          background: 'linear-gradient(135deg, #dc2626, #9f1239)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        {/* Blood drop: CSS triangle tip + circle body */}
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
          <div
            style={{
              width: 0,
              height: 0,
              borderLeft: '5px solid transparent',
              borderRight: '5px solid transparent',
              borderBottom: '7px solid white',
            }}
          />
          <div
            style={{
              width: 12,
              height: 12,
              borderRadius: 6,
              background: 'white',
              marginTop: -1,
            }}
          />
        </div>
      </div>
    ),
    { ...size }
  );
}
