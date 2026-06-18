"use client";

import { useEffect, useRef, useState } from "react";
import { navLinks, profile, socials } from "@/lib/data";
import Hero3DBackground from "./Hero3DBackground";

export default function OrbitHero() {
  const stageRef = useRef<HTMLDivElement>(null);
  const nodeRefs = useRef<(HTMLAnchorElement | null)[]>([]);
  const pausedRef = useRef(false);
  const [paused, setPaused] = useState(false);

  useEffect(() => {
    pausedRef.current = paused;
  }, [paused]);

  useEffect(() => {
    const reduce = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;
    const speed = reduce ? 0 : 0.16; // radians / second
    const n = navLinks.length;
    let rot = -Math.PI / 2; // start first node at top
    let last = performance.now();
    let raf = 0;

    const place = () => {
      const stage = stageRef.current;
      const r = stage ? stage.offsetWidth * 0.46 : 200;
      nodeRefs.current.forEach((el, i) => {
        if (!el) return;
        const a = (i / n) * Math.PI * 2 + rot;
        const x = Math.cos(a) * r;
        const y = Math.sin(a) * r;
        el.style.transform = `translate(calc(-50% + ${x.toFixed(
          1
        )}px), calc(-50% + ${y.toFixed(1)}px))`;
      });
    };

    const tick = (now: number) => {
      const dt = (now - last) / 1000;
      last = now;
      if (!pausedRef.current) rot += speed * dt;
      place();
      raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, []);

  return (
    <section
      id="top"
      className="relative flex min-h-screen flex-col items-center justify-center overflow-hidden px-6 py-24"
    >
      {/* Subtle 3D bat-signal glow behind everything */}
      <div className="pointer-events-none absolute inset-0 z-0 opacity-25">
        <Hero3DBackground />
      </div>

      {/* Name + tagline */}
      <div className="relative z-10 mb-8 text-center">
        <p className="mb-4 inline-flex items-center gap-2 rounded-full border border-red/40 bg-red/5 px-4 py-1.5 font-mono text-xs text-red-bright box-glow-soft">
          <span className="h-1.5 w-1.5 animate-pulse-glow rounded-full bg-red-bright" />
          {profile.graduating} · Open to opportunities
        </p>
        <h1 className="text-4xl font-bold tracking-tight sm:text-5xl md:text-6xl">
          <span className="text-gradient text-glow">{profile.name}</span>
        </h1>
        <h2 className="mt-3 font-mono text-base text-red-bright sm:text-lg">
          {profile.role}
        </h2>
      </div>

      {/* Orbit stage */}
      <div
        ref={stageRef}
        onMouseEnter={() => setPaused(true)}
        onMouseLeave={() => setPaused(false)}
        className="orbit-stage relative z-10"
      >
        {/* Decorative rings */}
        <span className="orbit-ring" style={{ inset: "2%" }} />
        <span className="orbit-ring" style={{ inset: "26%" }} />

        {/* Center Batman */}
        <div className="orbit-core">
          <BatHero />
        </div>

        {/* Orbiting section nodes */}
        {navLinks.map((link, i) => (
          <a
            key={link.href}
            href={link.href}
            ref={(el) => {
              nodeRefs.current[i] = el;
            }}
            className="orbit-node group"
          >
            <span className="orbit-dot" />
            <span className="orbit-label">{link.label}</span>
          </a>
        ))}
      </div>

      {/* CTA buttons */}
      <div className="relative z-10 mt-10 flex flex-wrap items-center justify-center gap-4">
        <a
          href="#projects"
          className="rounded-lg bg-red px-6 py-3 text-sm font-semibold text-white transition-all hover:bg-red-bright hover:box-glow"
        >
          View my work
        </a>
        <a
          href={socials.resume}
          target="_blank"
          rel="noopener noreferrer"
          className="rounded-lg border border-border px-6 py-3 text-sm font-semibold text-foreground transition-all hover:border-red/60 hover:box-glow"
        >
          Download résumé ↓
        </a>
      </div>

      <p className="relative z-10 mt-6 font-mono text-xs text-muted-2">
        hover to pause · click a planet to explore
      </p>
    </section>
  );
}

/** Big heroic Batman that stands at the center of the orbit. */
function BatHero() {
  return (
    <svg
      viewBox="0 0 120 150"
      xmlns="http://www.w3.org/2000/svg"
      className="orbit-bat"
    >
      <defs>
        <filter id="oh-eye" x="-80%" y="-80%" width="260%" height="260%">
          <feGaussianBlur stdDeviation="1.8" result="b" />
          <feMerge>
            <feMergeNode in="b" />
            <feMergeNode in="SourceGraphic" />
          </feMerge>
        </filter>
        <linearGradient id="oh-cape" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#1b1b22" />
          <stop offset="100%" stopColor="#070709" />
        </linearGradient>
        <radialGradient id="oh-floor" cx="50%" cy="50%" r="50%">
          <stop offset="0%" stopColor="rgba(225,29,42,0.5)" />
          <stop offset="100%" stopColor="rgba(225,29,42,0)" />
        </radialGradient>
      </defs>

      {/* Ground glow */}
      <ellipse cx="60" cy="138" rx="34" ry="7" fill="url(#oh-floor)" />

      {/* Cape spread wide */}
      <path
        d="M60 40 C 28 48 20 86 14 132 L 34 110 L 40 130 L 50 112 L 60 134 L 70 112 L 80 130 L 86 110 L 106 132 C 100 86 92 48 60 40 Z"
        fill="url(#oh-cape)"
        stroke="rgba(225,29,42,0.45)"
        strokeWidth="1.2"
      />

      {/* Legs */}
      <path d="M54 96 L50 130 L57 130 L60 98 Z" fill="#0a0a0c" />
      <path d="M66 96 L70 130 L63 130 L60 98 Z" fill="#0a0a0c" />

      {/* Body */}
      <path
        d="M60 48 C 47 48 44 62 47 82 C 50 98 70 98 73 82 C 76 62 73 48 60 48 Z"
        fill="#0c0c0f"
        stroke="rgba(225,29,42,0.25)"
        strokeWidth="0.9"
      />

      {/* Red chest emblem */}
      <path
        d="M60 62 l4.5 -4 -1.4 5.4 5.4 -1.4 -4 4 4 4 -5.4 -1.4 1.4 5.4 -4.5 -4 -4.5 4 1.4 -5.4 -5.4 1.4 4 -4 -4 -4 5.4 1.4 -1.4 -5.4 z"
        fill="var(--red-bright)"
        opacity="0.92"
      />

      {/* Arms */}
      <path d="M47 54 C 40 60 38 74 40 88 L 45 86 C 44 74 46 64 50 58 Z" fill="#0a0a0c" />
      <path d="M73 54 C 80 60 82 74 80 88 L 75 86 C 76 74 74 64 70 58 Z" fill="#0a0a0c" />

      {/* Cowl with ears */}
      <path
        d="M48 44 L 51 22 L 56 40 C 57.5 37 62.5 37 64 40 L 69 22 L 72 44 C 72 53 48 53 48 44 Z"
        fill="#08080a"
      />

      {/* Glowing eyes */}
      <g filter="url(#oh-eye)" fill="var(--red-bright)">
        <path d="M53 40 l6 -2 0 4 -6 2 z" />
        <path d="M67 40 l-6 -2 0 4 6 2 z" />
      </g>
    </svg>
  );
}
