import { InfiniteSlider } from "@/components/motion-primitives/infinite-slider";
import { Reveal } from "@/components/motion-primitives/reveal";

const DEFAULT_LOGOS = [1, 2, 3, 4, 5].map((i) => ({
  src: `/marketing/logo-${i}.svg`,
  alt: `Client logo ${i}`,
}));

export function ClientLogos({
  title = "Brands we’re proud to work with",
  logos = DEFAULT_LOGOS,
}: {
  title?: React.ReactNode;
  logos?: { src: string; alt: string }[];
}) {
  return (
    <section className="w-full bg-[#f7f8f8] py-20">
      <div className="mx-auto flex max-w-325 flex-col items-center gap-12 px-6 lg:px-8">
        <Reveal>
          <h2 className="text-center text-2xl font-semibold text-[#292b2c]">
            {title}
          </h2>
        </Reveal>
        <InfiniteSlider speed={40} gap={80} className="w-full">
          {logos.map(({ src, alt }) => (
            <img
              key={alt}
              alt={alt}
              className="h-8 w-auto object-contain opacity-70"
              src={src}
            />
          ))}
        </InfiniteSlider>
      </div>
    </section>
  );
}
