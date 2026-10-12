import { ImageResponse } from "next/og";

export const alt = "The Share Community — Sharing Hope. Changing Lives.";
export const size = {
  width: 1200,
  height: 630,
};
export const contentType = "image/png";

export default async function Image() {
  return new ImageResponse(
    (
      <div
        style={{
          height: "100%",
          width: "100%",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          backgroundColor: "#0F4C5C",
          color: "#FFF8EC",
          fontFamily: "serif",
          padding: "60px",
          position: "relative",
        }}
      >
        <div
          style={{
            position: "absolute",
            top: -100,
            right: -100,
            width: 500,
            height: 500,
            borderRadius: "50%",
            backgroundColor: "rgba(245, 165, 36, 0.15)",
          }}
        />
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: "16px",
            marginBottom: "24px",
          }}
        >
          <div
            style={{
              width: "48px",
              height: "48px",
              borderRadius: "50%",
              backgroundColor: "#F5A524",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          />
          <span
            style={{
              fontSize: "24px",
              letterSpacing: "4px",
              textTransform: "uppercase",
              color: "#FDE3A8",
              fontWeight: 600,
            }}
          >
            The Share Community
          </span>
        </div>

        <h1
          style={{
            fontSize: "64px",
            fontWeight: "bold",
            textAlign: "center",
            maxWidth: "900px",
            lineHeight: 1.15,
            color: "#FFFFFF",
            margin: "0 0 20px 0",
          }}
        >
          Together, We Can Create Lasting Change
        </h1>

        <p
          style={{
            fontSize: "30px",
            fontStyle: "italic",
            color: "#F5A524",
            margin: 0,
          }}
        >
          Sharing Hope. Changing Lives.
        </p>
      </div>
    ),
    {
      ...size,
    }
  );
}
