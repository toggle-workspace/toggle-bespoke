import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Reveal } from "@/components/motion-primitives/reveal";

type FAQItem = { question: string; answer: string };

export function FAQ({ faqs }: { faqs: FAQItem[] }) {
  if (faqs.length === 0) return null;

  return (
    <section className="w-full">
      <div className="bg-muted py-16 sm:py-24">
        <Reveal className="mx-auto max-w-4xl px-6 lg:px-8">
          <h2 className="mb-10 text-center text-4xl font-semibold tracking-tight md:text-5xl">
            Frequently Asked Questions
          </h2>
          <Accordion>
            {faqs.map((faq) => (
              <AccordionItem key={faq.question} value={faq.question}>
                <AccordionTrigger className="text-2xl font-semibold">
                  {faq.question}
                </AccordionTrigger>
                <AccordionContent className="text-[#565b5d]">
                  {faq.answer}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </Reveal>
      </div>
    </section>
  );
}
