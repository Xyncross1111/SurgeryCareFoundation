import { ImageResponse } from "next/og";
import { SITE_NAME, SITE_TAGLINE } from "@/lib/seo";

export const runtime = "edge";

export const alt = `${SITE_NAME} — ${SITE_TAGLINE}`;
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default async function OpengraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          height: "100%",
          width: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          padding: "80px",
          background: "linear-gradient(135deg, #0a8a4a 0%, #0d6e3c 100%)",
          color: "white",
          fontFamily: "system-ui, -apple-system, BlinkMacSystemFont, sans-serif",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: "16px" }}>
          <div
            style={{
              width: "64px",
              height: "64px",
              borderRadius: "16px",
              background: "rgba(255,255,255,0.15)",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              fontSize: "40px",
            }}
          >
            +
          </div>
          <div style={{ fontSize: "32px", fontWeight: 600, letterSpacing: "-0.02em" }}>
            {SITE_NAME}
          </div>
        </div>

        <div style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
          <div
            style={{
              fontSize: "72px",
              fontWeight: 800,
              lineHeight: 1.05,
              letterSpacing: "-0.03em",
              maxWidth: "900px",
            }}
          >
            {SITE_TAGLINE}
          </div>
          <div style={{ fontSize: "28px", opacity: 0.85, fontWeight: 400 }}>
            Donate to verified medical campaigns. Save lives.
          </div>
        </div>

        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            fontSize: "22px",
            opacity: 0.75,
          }}
        >
          <div>surgerycarefoundation.com</div>
          <div style={{ display: "flex", gap: "24px" }}>
            <span>80G Tax Benefit</span>
            <span>·</span>
            <span>Verified Campaigns</span>
            <span>·</span>
            <span>Secure Payments</span>
          </div>
        </div>
      </div>
    ),
    { ...size },
  );
}
