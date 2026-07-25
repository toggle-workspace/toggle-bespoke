import { Subtitle } from "@/components/subtitle";
import {
  Reveal,
  RevealGroup,
  RevealItem,
} from "@/components/motion-primitives/reveal";

type NumberedFeatureGridItem = { number: string; title: string; description: string };

const DEFAULT_REASONS: NumberedFeatureGridItem[] = [
  {
    number: "01.",
    title: "Focused on what truly matters",
    description:
      "We prioritize the outcomes that make a real difference, like performance, growth, and long-term value, ensuring every effort contributes to meaningful business results.",
  },
  {
    number: "02.",
    title: "Driven by insight, not assumptions",
    description:
      "Every decision we make is backed by data, research, and real customer understanding, so your strategy is grounded in what works.",
  },
  {
    number: "03.",
    title: "Committed to long-term success",
    description:
      "We don't chase quick wins. We build strategies designed to grow with your business and deliver sustainable results over time.",
  },
];

export function NumberedFeatureGrid({
  subtitle = "Why work with us",
  title = "What sets us apart",
  items = DEFAULT_REASONS,
}: {
  subtitle?: string;
  title?: React.ReactNode;
  items?: NumberedFeatureGridItem[];
}) {
  return (
    <section className="w-full bg-white">
      <div className="mx-auto max-w-325 px-6 lg:px-8">
        <Reveal className="mb-14">
          <Subtitle>{subtitle}</Subtitle>
        </Reveal>
        <Reveal>
          <h2 className="mb-14 text-4xl font-semibold text-[#292b2c] md:text-5xl">
            {title}
          </h2>
        </Reveal>
        <RevealGroup className="grid grid-cols-1 gap-16 md:grid-cols-3">
          {items.map((item) => (
            <RevealItem key={item.number} className="flex flex-col gap-5">
              <span className="text-6xl font-semibold text-[#d7dada]">
                {item.number}
              </span>
              <h3 className="text-2xl font-semibold text-[#292b2c]">
                {item.title}
              </h3>
              <p className="text-[#565b5d]">{item.description}</p>
            </RevealItem>
          ))}
        </RevealGroup>
      </div>
    </section>
  );
}
