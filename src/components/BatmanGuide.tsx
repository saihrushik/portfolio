"use client";

import { useEffect, useRef, useState } from "react";

/**
 * A miniature Batman that rides the right-side pole as you scroll:
 *  - scroll down  → he slides down the pole into the pit
 *  - scroll up    → he fires a grappling hook and zips upward
 *  - reach bottom → he stands guard over the Contact section
 *  - click a nav link / project / skill → he hops (jump animation)
 */
export default function BatmanGuide() {
  const [progress, setProgress] = useState(0); // 0 (top) → 1 (bottom)
  const [goingUp, setGoingUp] = useState(false);
  const [jumping, setJumping] = useState(false);
  const lastY = useRef(0);
  const upTimer = useRef<ReturnType<typeof setTimeout> | null>(null);
  const ticking = useRef(false);

  // Track scroll position + direction (rAF-throttled).
  useEffect(() => {
    const update = () => {
      const scrollable =
        document.documentElement.scrollHeight - window.innerHeight;
      const y = window.scrollY;
      setProgress(scrollable > 0 ? Math.min(1, Math.max(0, y / scrollable)) : 0);

      if (y < lastY.current - 2) {
        setGoingUp(true);
        if (upTimer.current) clearTimeout(upTimer.current);
        upTimer.current = setTimeout(() => setGoingUp(false), 450);
      }
      lastY.current = y;
      ticking.current = false;
    };

    const onScroll = () => {
      if (!ticking.current) {
        ticking.current = true;
        requestAnimationFrame(update);
      }
    };

    update();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => {
      window.removeEventListener("scroll", onScroll);
      if (upTimer.current) clearTimeout(upTimer.current);
    };
  }, []);

  // Make him hop when a nav link, project card, or skill is clicked.
  useEffect(() => {
    const triggerJump = () => {
      setJumping(true);
      window.setTimeout(() => setJumping(false), 700);
    };

    const onClick = (e: MouseEvent) => {
      const target = (e.target as HTMLElement).closest(
        'a[href^="#"], [data-batman-jump]'
      );
      if (!target) return;
      triggerJump();
      // Center the clicked project/skill so he visibly hops to it.
      if (
        target.hasAttribute("data-batman-jump") &&
        target.tagName !== "A"
      ) {
        target.scrollIntoView({ behavior: "smooth", block: "center" });
      }
    };

    document.addEventListener("click", onClick);
    return () => document.removeEventListener("click", onClick);
  }, []);

  const nearBottom = progress > 0.93;
  // Vertical travel along the rail: 6vh (top) → 82vh, then settle at the pit.
  const topVh = nearBottom ? 80 : 6 + progress * 78;

  const animClass = jumping
    ? "bat-anim-jump"
    : nearBottom
      ? "" // standing guard
      : goingUp
        ? "bat-anim-up"
        : "bat-anim-fall";

  return (
    <div className="bat-rail hidden md:block" aria-hidden="true">
      <div className="bat-pole" />
      <div className="bat-pit" />

      <div className="bat-figure" style={{ top: `${topVh}vh` }}>
        {goingUp && !nearBottom && <span className="bat-grapple" />}
        <div className={animClass}>
          <BatSvg standing={nearBottom} />
        </div>
      </div>
    </div>
  );
}

/** The little caped crusader. `standing` drops the cape + relaxes the pose. */
function BatSvg({ standing }: { standing: boolean }) {
  return (
    <svg viewBox="0 0 60 84" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <filter id="bat-eye-glow" x="-80%" y="-80%" width="260%" height="260%">
          <feGaussianBlur stdDeviation="1.4" result="b" />
          <feMerge>
            <feMergeNode in="b" />
            <feMergeNode in="SourceGraphic" />
          </feMerge>
        </filter>
        <linearGradient id="bat-cape" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#15151a" />
          <stop offset="100%" stopColor="#070709" />
        </linearGradient>
      </defs>

      {/* Cape — flutters while moving, drapes when standing */}
      <g
        className={standing ? undefined : "cape-flutter"}
        style={{ transformBox: "fill-box" }}
      >
        <path
          d={
            standing
              ? "M30 22 C 12 28 9 50 8 76 L 19 64 L 23 76 L 30 66 L 37 76 L 41 64 L 52 76 C 51 50 48 28 30 22 Z"
              : "M30 20 C 14 26 7 44 5 70 L 17 58 L 21 70 L 27 58 L 30 72 L 33 58 L 39 70 L 43 58 L 55 70 C 53 44 46 26 30 20 Z"
          }
          fill="url(#bat-cape)"
          stroke="rgba(225,29,42,0.45)"
          strokeWidth="1"
        />
      </g>

      {/* Body */}
      <path
        d="M30 28 C 22 28 20 36 22 48 C 24 59 36 59 38 48 C 40 36 38 28 30 28 Z"
        fill="#0a0a0c"
        stroke="rgba(225,29,42,0.25)"
        strokeWidth="0.8"
      />

      {/* Red chest emblem */}
      <path
        d="M30 38 l3 -3 -1 4 4 -1 -3 3 3 3 -4 -1 1 4 -3 -3 -3 3 1 -4 -4 1 3 -3 -3 -3 4 1 -1 -4 z"
        fill="var(--red-bright)"
        opacity="0.9"
      />

      {/* Cowl head + ears */}
      <path
        d="M22 24 L 24 9 L 28 21 C 29 19 31 19 32 21 L 36 9 L 38 24 C 38 31 22 31 22 24 Z"
        fill="#08080a"
      />

      {/* Glowing eyes */}
      <g filter="url(#bat-eye-glow)" fill="var(--red-bright)">
        <path d="M26 22 l4 -1.4 0 3 -4 1.4 z" />
        <path d="M34 22 l-4 -1.4 0 3 4 1.4 z" />
      </g>
    </svg>
  );
}
