import Image from "next/image";
import { TextLink } from "@/components/ui/text-link";
import {
  RevealGroup,
  RevealItem,
} from "@/components/motion-primitives/reveal";

type Stat = { value: string; label: string };

export function SplitContent({
  title,
  description,
  link,
  stats,
  image,
}: {
  title: React.ReactNode;
  description?: React.ReactNode;
  link?: { label: string; href: string };
  stats?: Stat[];
  image: string;
}) {
  return (
    <section className="w-full bg-white">
      <RevealGroup className="mx-auto flex max-w-325 flex-col items-stretch gap-10 px-6 lg:flex-row lg:px-8">
        <RevealItem className="flex flex-1 flex-col justify-center gap-6">
          <h2 className="text-2xl leading-snug font-medium text-[#292b2c] lg:text-3xl">
            {title}
          </h2>
          {description && <p className="text-[#565b5d]">{description}</p>}
          {stats && stats.length > 0 && (
            <div className="flex flex-wrap gap-10">
              {stats.map((stat) => (
                <div key={stat.label} className="flex flex-col gap-1">
                  <span className="text-4xl font-semibold text-[#eb332d]">
                    {stat.value}
                  </span>
                  <p className="max-w-40 font-semibold text-[#292b2c]">
                    {stat.label}
                  </p>
                </div>
              ))}
            </div>
          )}
          {link && (
            <TextLink href={link.href} className="text-base">
              {link.label}
            </TextLink>
          )}
        </RevealItem>
        <RevealItem className="relative min-h-100 flex-1 overflow-hidden rounded-2xl">
          <Image alt="" fill className="object-cover" src={image} />
        </RevealItem>
      </RevealGroup>
    </section>
  );
}
