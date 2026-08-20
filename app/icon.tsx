import { ImageResponse } from "next/og";

export const dynamic = "force-static";
export const size = { width: 64, height: 64 };
export const contentType = "image/png";

// Matches the header/footer brand badge exactly: amber rounded square with
// a bold "P" letterform. Fixed dark-on-amber colors (rather than theme
// tokens) so the icon reads clearly in a browser tab regardless of the
// OS/browser theme.
export default function Icon() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          background: "#e9a83f",
          borderRadius: 14,
        }}
      >
        <span
          style={{
            fontSize: 36,
            fontWeight: 700,
            color: "#17180f",
            fontFamily: "monospace",
          }}
        >
          P
        </span>
      </div>
    ),
    { ...size }
  );
}
