import { Subtitle } from "@/components/subtitle";
import { GradientBackground } from "@/components/gradient-background";

export function PageHeader({
  subtitle,
  title,
  description,
}: {
  subtitle?: string;
  title: React.ReactNode;
  description?: React.ReactNode;
}) {
  return (
    <section className="relative isolate w-full overflow-hidden bg-white">
      <GradientBackground lines="bottom-right" />
      <div className="mx-auto flex max-w-325 flex-col gap-6 px-6 pb-20 pt-20 sm:pb-28 lg:px-8 lg:pb-32 lg:pt-24">
        {subtitle && <Subtitle>{subtitle}</Subtitle>}
        <h1 className="max-w-4xl text-4xl font-bold tracking-tight text-[#292b2c] md:text-6xl">
          {title}
        </h1>
        {description && (
          <p className="max-w-2xl text-lg text-[#565b5d]">{description}</p>
        )}
      </div>
    </section>
  );
}
