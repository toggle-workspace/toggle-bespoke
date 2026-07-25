"use client";

import * as React from "react";
import { ArrowLeftIcon, ArrowRightIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import {
  Carousel,
  type CarouselApi,
  CarouselContent,
  CarouselItem,
} from "@/components/ui/carousel";
import { Subtitle } from "@/components/subtitle";
import { Reveal } from "@/components/motion-primitives/reveal";

type Testimonial = { title: string; quote: string; name: string; role: string };

export function Testimonials({
  subtitle = "Testimonials",
  title = "Real feedback from businesses we've helped grow",
  testimonials,
}: {
  subtitle?: string;
  title?: React.ReactNode;
  testimonials: Testimonial[];
}) {
  const [api, setApi] = React.useState<CarouselApi>();

  if (testimonials.length === 0) return null;

  return (
    <section className="w-full bg-white">
      <div className="mx-auto max-w-325 px-6 lg:px-8">
        <Reveal className="mb-14 flex flex-wrap items-end justify-between gap-6">
          <div className="flex flex-col gap-6">
            <Subtitle>{subtitle}</Subtitle>
            <h2 className="text-4xl font-semibold text-[#292b2c] md:text-5xl">
              {title}
            </h2>
          </div>
          <div className="hidden shrink-0 gap-2 md:flex">
            <Button
              variant="ghost"
              size="icon-lg"
              disabled={!api?.canScrollPrev()}
              onClick={() => api?.scrollPrev()}
            >
              <ArrowLeftIcon className="size-5" />
              <span className="sr-only">Previous testimonial</span>
            </Button>
            <Button
              variant="ghost"
              size="icon-lg"
              disabled={!api?.canScrollNext()}
              onClick={() => api?.scrollNext()}
            >
              <ArrowRightIcon className="size-5" />
              <span className="sr-only">Next testimonial</span>
            </Button>
          </div>
        </Reveal>
        <Carousel opts={{ align: "start" }} setApi={setApi} className="w-full">
          <CarouselContent className="-ml-5">
            {testimonials.map((testimonial) => (
              <CarouselItem
                key={testimonial.name}
                className="basis-[85%] pl-5 sm:basis-[55%] lg:basis-[35%]"
              >
                <Card
                  variant="muted"
                  className="h-80 justify-between gap-4 p-8"
                >
                  <div className="flex flex-col gap-3">
                    <h3 className="text-2xl font-semibold text-[#292b2c]">
                      {testimonial.title}
                    </h3>
                    <p className="text-[#565b5d]">{testimonial.quote}</p>
                  </div>
                  <div>
                    <p className="font-semibold text-[#292b2c]">{testimonial.name}</p>
                    <p className="text-sm text-[#889091]">{testimonial.role}</p>
                  </div>
                </Card>
              </CarouselItem>
            ))}
          </CarouselContent>
        </Carousel>
      </div>
    </section>
  );
}
