import { skills } from "@/lib/data";
import Reveal from "./Reveal";
import SectionHeading from "./SectionHeading";

export default function Skills() {
  return (
    <section id="skills" className="mx-auto max-w-5xl scroll-mt-20 px-6 py-24">
      <SectionHeading index="02 — Skills" title="Tools of the trade" />

      <div className="grid gap-5 sm:grid-cols-2">
        {skills.map((group, i) => (
          <Reveal key={group.group} delay={i * 70}>
            <div className="card h-full p-6">
              <h3 className="mb-4 font-mono text-sm text-red-bright">
                {group.group}
              </h3>
              <div className="flex flex-wrap gap-2">
                {group.items.map((item) => (
                  <span key={item} className="chip">
                    {item}
                  </span>
                ))}
              </div>
            </div>
          </Reveal>
        ))}
      </div>
    </section>
  );
}
