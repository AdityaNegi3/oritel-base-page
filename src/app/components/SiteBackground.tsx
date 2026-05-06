import React, { PropsWithChildren, useMemo } from "react";

/**
 * Applies the HeroMonochromeLaunch background style globally across the site.
 * Keeps content in normal document flow; only paints the backdrop.
 */
export function SiteBackground({ children }: PropsWithChildren) {
  const palette = useMemo(
    () => ({
      surface: "bg-white text-neutral-950",
      background: {
        color: "#ffffff",
        overlays: [
          "radial-gradient(ellipse 65% 90% at 12% -10%, rgba(15,15,15,0.08), transparent 62%)",
          "radial-gradient(ellipse 45% 65% at 88% -20%, rgba(15,15,15,0.06), transparent 70%)",
        ],
        dots:
          "radial-gradient(circle at 25% 25%, rgba(17,17,17,0.12) 0.65px, transparent 1px), radial-gradient(circle at 75% 75%, rgba(17,17,17,0.08) 0.65px, transparent 1px)",
      },
    }),
    [],
  );

  return (
    <div className={`relative isolate min-h-screen overflow-hidden ${palette.surface}`}>
      <div
        className="pointer-events-none absolute inset-0 -z-20"
        style={{
          backgroundColor: palette.background.color,
          backgroundImage: palette.background.overlays.join(", "),
        }}
      />
      <div
        className="pointer-events-none absolute inset-0 -z-10 opacity-80"
        style={{
          backgroundImage: palette.background.dots,
          backgroundSize: "12px 12px",
        }}
      />

      {children}
    </div>
  );
}
