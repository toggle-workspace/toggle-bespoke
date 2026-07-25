import { CaseStudyCard } from "@/components/case-study-card";
import { TextLink } from "@/components/ui/text-link";
import { Subtitle } from "@/components/subtitle";
import type { CaseStudySummary } from "@/lib/case-studies";
import {
  Reveal,
  RevealGroup,
  RevealItem,
} from "@/components/motion-primitives/reveal";

export function CaseStudiesGrid({
  subtitle = "Wins worth sharing",
  title = "Our work speaks for itself",
  linkLabel = "Discover all case studies",
  linkHref = "/case-studies",
  showHeader = true,
  studies,
  limit = 6,
}: {
  subtitle?: string;
  title?: React.ReactNode;
  linkLabel?: string;
  linkHref?: string;
  showHeader?: boolean;
  studies: CaseStudySummary[];
  limit?: number;
}) {
  if (studies.length === 0) return null;

  return (
    <section className="w-full bg-background">
      <div className="mx-auto max-w-325 px-6 lg:px-8">
        {showHeader && (
          <Reveal className="mb-14 flex flex-wrap items-end justify-between gap-6">
            <div className="flex flex-col gap-6">
              {subtitle && <Subtitle>{subtitle}</Subtitle>}
              <h2 className="text-4xl font-semibold text-[#292b2c] md:text-5xl">
                {title}
              </h2>
            </div>
            <TextLink href={linkHref} className="text-base">
              {linkLabel}
            </TextLink>
          </Reveal>
        )}
        <RevealGroup className="grid grid-cols-1 gap-10 md:grid-cols-2 lg:grid-cols-3">
          {studies.slice(0, limit).map((study) => (
            <RevealItem key={study.title}>
              <CaseStudyCard
                href={study.slug ? `/case-studies/${study.slug}` : "#"}
                logo={study.logo}
                title={study.title}
                industry={study.industry}
              />
            </RevealItem>
          ))}
        </RevealGroup>
      </div>
    </section>
  );
}
