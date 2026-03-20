import { ImageResponse } from "next/og";

export const runtime = "edge";
export const alt = "Michael Lane — The Workshop";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default async function Image() {
  return new ImageResponse(
    (
      <div
        style={{
          background: "#0a0a0a",
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          fontFamily: "system-ui, sans-serif",
        }}
      >
        <div
          style={{
            fontSize: 72,
            fontWeight: 600,
            color: "#fafafa",
            letterSpacing: "-0.04em",
          }}
        >
          Michael Lane
        </div>
        <div style={{ fontSize: 28, color: "#a1a1aa", marginTop: 16 }}>
          The Workshop
        </div>
        <div
          style={{
            width: 60,
            height: 4,
            background: "#f59e0b",
            borderRadius: 2,
            marginTop: 24,
          }}
        />
      </div>
    ),
    { ...size },
  );
}
