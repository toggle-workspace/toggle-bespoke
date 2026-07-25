import { Card } from "@/components/ui/card";
import { Subtitle } from "@/components/subtitle";

type IconLabelGridItem = { label: string; icon: string };

const DEFAULT_VALUES: IconLabelGridItem[] = [
  { label: "Client is our top priority", icon: "/about/value-priority.svg" },
  { label: "Strategy backed by creativity", icon: "/about/value-strategy.svg" },
  { label: "Clarity over complexity", icon: "/about/value-clarity.svg" },
  { label: "People first", icon: "/about/value-people.svg" },
  { label: "Embrace reality", icon: "/about/value-reality.svg" },
  {
    label: "Transparency is our default",
    icon: "/about/value-transparency.svg",
  },
  { label: "Diversity drives innovation", icon: "/about/value-diversity.svg" },
  { label: "Results over vanity", icon: "/about/value-results.svg" },
];

export function IconLabelGrid({
  subtitle = "Values",
  title = "Our standards and principles",
  description = "These standards define how we operate every day and the qualities we expect from our people and partners.",
  items = DEFAULT_VALUES,
}: {
  subtitle?: string;
  title?: React.ReactNode;
  description?: React.ReactNode;
  items?: IconLabelGridItem[];
}) {
  return (
    <section className="w-full bg-white">
      <div className="mx-auto max-w-325 px-6 lg:px-8">
        <div className="mb-14 flex flex-col gap-6">
          <Subtitle>{subtitle}</Subtitle>
          <h2 className="text-4xl font-semibold text-[#292b2c] md:text-5xl">
            {title}
          </h2>
          {description && (
            <p className="max-w-lg text-[#565b5d]">{description}</p>
          )}
        </div>
        <div className="grid grid-cols-2 gap-4 md:grid-cols-4">
          {items.map((item) => (
            <Card
              key={item.label}
              variant="muted"
              className="justify-between gap-6 p-6"
            >
              <img alt="" className="size-11 fill-border" src={item.icon} />
              <p className="font-semibold text-[#292b2c]">{item.label}</p>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}
