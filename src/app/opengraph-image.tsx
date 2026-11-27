import { ImageResponse } from "next/og";
import { cacheLife } from "next/cache";
import { readFile } from "node:fs/promises";
import { join } from "node:path";

// Link preview for LINE, Facebook, Slack, X… (also used as the Twitter card image)
export const alt = "Hikari: made-to-measure curtains and blinds in Bangkok";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

const washi = "#f5f3f0";
const sumi = "#1c1b1a";
const sunbeam = "#f2cf8a";
const linen = "#d8cfbf";

const pleats =
  "repeating-linear-gradient(90deg, rgba(255,255,255,0.22) 0px, rgba(255,255,255,0.06) 12px, rgba(0,0,0,0.1) 26px, rgba(0,0,0,0.02) 38px, rgba(255,255,255,0.22) 48px)";

// Cached so the image is prerendered at build time (a plain async file read would make it render per request)
async function loadFont(weight: 400 | 600) {
  "use cache";
  cacheLife("max");
  const file = await readFile(join(process.cwd(), `src/app/_fonts/manrope-latin-${weight}.woff`));
  return new Uint8Array(file);
}

export default async function Image() {
  const [regular, semibold] = (await Promise.all([loadFont(400), loadFont(600)])).map((u8) => u8.slice().buffer);

  return new ImageResponse(
    (
      <div style={{ width: "100%", height: "100%", display: "flex", background: washi, color: sumi, fontFamily: "Manrope", padding: 64 }}>
        {/* Copy */}
        <div style={{ display: "flex", flexDirection: "column", flex: 1, paddingRight: 56 }}>
          <div style={{ display: "flex", alignItems: "center", gap: 14 }}>
            <svg width="40" height="40" viewBox="0 0 22 22" fill="none">
              <circle cx="11" cy="11" r="10" stroke={sumi} strokeWidth="1.4" />
              <path d="M6 4.5v13M11 1.5v19M16 4.5v13" stroke={sumi} strokeWidth="1.4" />
            </svg>
            <span style={{ fontSize: 34, fontWeight: 600, letterSpacing: -1 }}>Hikari</span>
          </div>

          <div style={{ display: "flex", flexDirection: "column", marginTop: 72, fontSize: 82, fontWeight: 600, lineHeight: 1.02, letterSpacing: -3.5 }}>
            <span>Light, made</span>
            <span>to measure.</span>
          </div>
          <span style={{ marginTop: 28, fontSize: 28, lineHeight: 1.35, color: "rgba(28,27,26,0.6)", maxWidth: 520 }}>
            Curtains, sheers & blinds for Bangkok homes. Free home measuring.
          </span>

          <div style={{ display: "flex", marginTop: "auto" }}>
            <div style={{ display: "flex", alignItems: "center", gap: 14, background: sumi, color: "white", borderRadius: 999, padding: "10px 10px 10px 28px", fontSize: 22, fontWeight: 600 }}>
              Book a free home visit
              <div style={{ display: "flex", width: 40, height: 40, borderRadius: 999, background: "white", alignItems: "center", justifyContent: "center" }}>
                <svg width="18" height="18" viewBox="0 0 14 14" fill="none">
                  <path d="M1 7h11M7.5 2.5 12 7l-4.5 4.5" stroke={sumi} strokeWidth="1.6" />
                </svg>
              </div>
            </div>
          </div>
        </div>

        {/* Window with curtains half drawn, like the Light Studio */}
        <div style={{ display: "flex", position: "relative", width: 440, height: "100%", borderRadius: 36, overflow: "hidden", background: "#c9d3c4" }}>
          {/* sky and garden through the glass */}
          <div style={{ position: "absolute", top: 0, right: 0, bottom: 0, left: 0, display: "flex", background: "linear-gradient(180deg, #fbe7c2 0%, #f6d79f 38%, #9fb08f 72%, #6f8466 100%)" }} />
          <div style={{ position: "absolute", top: 0, right: 0, bottom: 0, left: 0, display: "flex", background: "radial-gradient(circle at 62% 30%, rgba(255,240,205,0.95) 0%, rgba(255,226,170,0.35) 30%, rgba(255,226,170,0) 60%)" }} />
          {/* window frame */}
          <div style={{ position: "absolute", left: 0, right: 0, top: 0, bottom: 0, display: "flex", border: "14px solid #f3efe8", borderRadius: 36 }} />
          <div style={{ position: "absolute", top: 0, bottom: 0, left: 213, width: 14, display: "flex", background: "#f3efe8" }} />
          <div style={{ position: "absolute", left: 0, right: 0, top: 300, height: 14, display: "flex", background: "#f3efe8" }} />
          {/* curtains */}
          <div style={{ position: "absolute", top: 0, bottom: 0, left: 0, width: 128, display: "flex", backgroundColor: linen, backgroundImage: pleats, boxShadow: "14px 0 40px rgba(0,0,0,0.18)" }} />
          <div style={{ position: "absolute", top: 0, bottom: 0, right: 0, width: 128, display: "flex", backgroundColor: linen, backgroundImage: pleats, boxShadow: "-14px 0 40px rgba(0,0,0,0.18)" }} />
          {/* light readout */}
          <div style={{ position: "absolute", left: 22, bottom: 22, display: "flex", alignItems: "center", gap: 12, borderRadius: 999, padding: "8px 20px 8px 8px", background: "rgba(28,27,26,0.55)", color: "white" }}>
            <div style={{ display: "flex", width: 40, height: 40, borderRadius: 999, background: sunbeam, alignItems: "center", justifyContent: "center" }}>
              <div style={{ display: "flex", width: 14, height: 14, borderRadius: 999, background: sumi }} />
            </div>
            <div style={{ display: "flex", flexDirection: "column", lineHeight: 1.1 }}>
              <span style={{ fontSize: 14, color: "rgba(255,255,255,0.75)" }}>Light in the room</span>
              <span style={{ fontSize: 24, fontWeight: 600 }}>62%</span>
            </div>
          </div>
        </div>
      </div>
    ),
    {
      ...size,
      fonts: [
        { name: "Manrope", data: regular, weight: 400, style: "normal" },
        { name: "Manrope", data: semibold, weight: 600, style: "normal" },
      ],
    },
  );
}
