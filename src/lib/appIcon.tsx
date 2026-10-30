import { ImageResponse } from "next/og";

// color/primary 바탕에 text/on-primary 색 메모 모양. 글리프는 가운데 60%에 둬서 마스크로 잘려도 안 깨진다
const PRIMARY = "#3182F6";
const ON_PRIMARY = "#FFFFFF";

/** 홈 화면 아이콘 PNG를 만든다 */
export function appIcon(size: number) {
  const glyph = Math.round(size * 0.6);
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          background: PRIMARY,
        }}
      >
        <svg width={glyph} height={glyph} viewBox="0 0 22 22" fill="none">
          <path
            d="M6.41667 3.66667H12.8333L16.5 7.33333V18.3333H6.41667V3.66667Z"
            stroke={ON_PRIMARY}
            strokeWidth="1.83333"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <path
            d="M12.8333 3.66667V7.33333H16.5M9.16667 11H13.75M9.16667 14.6667H13.75"
            stroke={ON_PRIMARY}
            strokeWidth="1.83333"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      </div>
    ),
    { width: size, height: size },
  );
}
