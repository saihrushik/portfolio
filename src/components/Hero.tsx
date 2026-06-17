import { profile, socials } from "@/lib/data";

export default function Hero() {
  return (
    <section
      id="top"
      className="relative flex min-h-screen items-center overflow-hidden px-6 pt-24"
    >
      {/* Vertical scan-line accent */}
      <div className="pointer-events-none absolute right-[8%] top-0 hidden h-full w-px bg-gradient-to-b from-transparent via-red/40 to-transparent lg:block" />

      <div className="mx-auto w-full max-w-5xl">
        <p className="mb-5 inline-flex items-center gap-2 rounded-full border border-red/40 bg-red/5 px-4 py-1.5 font-mono text-xs text-red-bright box-glow-soft">
          <span className="h-1.5 w-1.5 animate-pulse-glow rounded-full bg-red-bright" />
          {profile.graduating} · Open to opportunities
        </p>

        <h1 className="text-5xl font-bold leading-[1.05] tracking-tight sm:text-6xl md:text-7xl">
          <span className="block text-muted-2 text-2xl font-medium sm:text-3xl mb-3">
            Hi, I&apos;m
          </span>
          <span className="text-gradient text-glow">{profile.name}</span>
        </h1>

        <h2 className="mt-6 font-mono text-lg text-red-bright sm:text-2xl cursor-blink">
          {profile.role}
        </h2>

        <p className="mt-6 max-w-2xl text-base leading-relaxed text-muted sm:text-lg">
          {profile.blurb}
        </p>

        <p className="mt-3 text-sm text-muted-2">
          {profile.tagline} · {profile.location}
        </p>

        <div className="mt-9 flex flex-wrap items-center gap-4">
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

        <div className="mt-10 flex items-center gap-5 text-muted">
          <a
            href={socials.github}
            target="_blank"
            rel="noopener noreferrer"
            className="transition-colors hover:text-red-bright"
          >
            GitHub
          </a>
          <span className="text-border">/</span>
          <a
            href={socials.linkedin}
            target="_blank"
            rel="noopener noreferrer"
            className="transition-colors hover:text-red-bright"
          >
            LinkedIn
          </a>
          <span className="text-border">/</span>
          <a
            href={`mailto:${socials.email}`}
            className="transition-colors hover:text-red-bright"
          >
            Email
          </a>
        </div>
      </div>

      {/* Scroll hint */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 text-xs text-muted-2">
        <span className="animate-pulse-glow">scroll ↓</span>
      </div>
    </section>
  );
}
