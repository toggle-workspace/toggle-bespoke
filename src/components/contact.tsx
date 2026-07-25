"use client";

import Image from "next/image";
import { Card } from "@/components/ui/card";
import { ContactForm } from "@/components/contact-form";

function ContactDetail({
  label,
  value,
}: {
  label: string;
  value?: string;
}) {
  if (!value) return null;
  return (
    <div className="flex flex-col gap-1.5">
      <p className="text-xs font-semibold tracking-widest text-[#889091] uppercase">
        {label}
      </p>
      <p className="text-lg font-semibold text-[#292b2c]">{value}</p>
    </div>
  );
}

export function Contact({
  phone,
  email,
  location,
  socialLinks = [],
  interests = [],
}: {
  phone?: string;
  email?: string;
  location?: string;
  socialLinks?: { icon?: string; label: string; link: string }[];
  interests?: string[];
}) {
  return (
    <section className="w-full">
      <div className="mx-auto max-w-325 px-6 lg:px-8">
        <div className="grid grid-cols-1 gap-12 lg:grid-cols-5 lg:gap-16">
          {/* Contact details */}
          <div className="flex flex-col gap-10 lg:col-span-2 lg:sticky lg:top-24 lg:self-start">
            <ContactDetail label="Call us" value={phone} />
            <ContactDetail label="Email us" value={email} />
            <ContactDetail label="Location" value={location} />

            {socialLinks.length > 0 && (
              <div className="flex items-center gap-3">
                {socialLinks.map((s) => (
                  <a
                    key={s.label}
                    href={s.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={s.label}
                  >
                    {s.icon && (
                      <Image
                        src={s.icon}
                        alt=""
                        aria-hidden
                        width={40}
                        height={40}
                        className="size-10"
                      />
                    )}
                  </a>
                ))}
              </div>
            )}
          </div>

          {/* Form */}
          <Card variant="muted" className="p-8 lg:col-span-3 lg:p-12">
            <h2 className="text-3xl font-bold text-[#292b2c] md:text-4xl">
              Book free intro call
            </h2>
            <p className="mt-4 text-[#565b5d]">
              Reach out to discover how your brand can grow and perform better.
              Our specialist will get back to you within{" "}
              <strong className="font-semibold text-[#292b2c]">24 hours</strong>{" "}
              — no pressure, just expert advice.
            </p>

            <ContactForm interests={interests} />
          </Card>
        </div>
      </div>
    </section>
  );
}
