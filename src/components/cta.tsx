import { buttonVariants } from "@/components/ui/button";
import { GradientBackground } from "@/components/gradient-background";
import { Reveal } from "@/components/motion-primitives/reveal";

export function CTA({
  title = "Call to Action",
  description = "Try our service free for 7 days. No credit card required.",
  buttonLabel = "Start free trial",
  buttonHref = "/contact",
  footnote,
}: {
  title?: string;
  description?: string;
  buttonLabel?: string;
  buttonHref?: string;
  footnote?: React.ReactNode;
}) {
  return (
    <section className="relative isolate w-full overflow-hidden bg-white">
      <GradientBackground />
      <Reveal className="mx-auto flex max-w-3xl flex-col items-center gap-6 px-4 py-20 text-center md:py-28">
        <h2 className="text-3xl font-semibold tracking-tight text-[#292b2c] text-balance md:text-6xl">
          {title}
        </h2>
        <p className="max-w-xl text-base text-[#565b5d] md:text-lg">
          {description}
        </p>
        <a
          href={buttonHref}
          className={buttonVariants({ size: "xl" })}
        >
          {buttonLabel}
        </a>
        {footnote && <p className="text-sm text-[#889091]">{footnote}</p>}
      </Reveal>
    </section>
  );
}
