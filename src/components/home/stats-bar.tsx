import { Container } from "@/components/ui/container";

interface StatItem {
  value: string;
  label: string;
}

const STATS: StatItem[] = [
  { value: "400+", label: "Volunteers" },
  { value: "19 L+", label: "Raised" },
  { value: "100K+", label: "Donations" },
  { value: "20+", label: "Active Causes" },
];

export function StatsBar() {
  return (
    <section className="border-y border-surface-border bg-white py-12 md:py-16">
      <Container>
        <div className="grid grid-cols-2 gap-8 md:grid-cols-4">
          {STATS.map((stat) => (
            <div key={stat.label} className="text-center">
              <p className="mb-1 text-[40px] font-black leading-tight text-primary md:text-[48px]">
                {stat.value}
              </p>
              <p className="text-body-sm font-bold text-slate-medium">
                {stat.label}
              </p>
            </div>
          ))}
        </div>
      </Container>
    </section>
  );
}
