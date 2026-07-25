import Image from "next/image";
import { Subtitle } from "@/components/subtitle";
import {
  Reveal,
  RevealGroup,
  RevealItem,
} from "@/components/motion-primitives/reveal";

type Member = { name: string; role: string; image: string };

const DEFAULT_TEAM: Member[] = [
  { name: "Alexander Cole", role: "Founder / CEO", image: "/about/team-alexander-cole.jpg" },
  { name: "Sophia Turner", role: "Chief Operating Officer", image: "/about/team-sophia-turner.jpg" },
  { name: "Isabella Reed", role: "Senior Content Marketing Manager", image: "/about/team-isabella-reed.jpg" },
  { name: "Elena Rodriguez", role: "Senior Graphic Designer", image: "/about/team-elena-rodriguez.jpg" },
  { name: "Noah Carter", role: "Account Manager", image: "/about/team-noah-carter.jpg" },
  { name: "Clare Regis", role: "Operations Manager", image: "/about/team-clare-regis.jpg" },
  { name: "Liam Bennett", role: "Senior Art Director", image: "/about/team-liam-bennett.jpg" },
  { name: "Ethan Brooks", role: "Senior SEO Specialist", image: "/about/team-ethan-brooks.jpg" },
];

export function TeamGrid({
  subtitle = "Our team",
  title = "Meet the heart of our agency",
  description = "We embrace diversity of thought, continuous learning, and open-minded collaboration, building a reliable team that moves forward with a shared goal.",
  members = DEFAULT_TEAM,
}: {
  subtitle?: string;
  title?: React.ReactNode;
  description?: React.ReactNode;
  members?: Member[];
}) {
  if (members.length === 0) return null;

  return (
    <section className="w-full bg-white">
      <div className="mx-auto max-w-325 px-6 lg:px-8">
        <Reveal className="mb-14 flex flex-col gap-6">
          <Subtitle>{subtitle}</Subtitle>
          <h2 className="max-w-2xl text-4xl font-semibold text-[#292b2c] md:text-5xl">
            {title}
          </h2>
          {description && (
            <p className="max-w-2xl text-[#565b5d]">{description}</p>
          )}
        </Reveal>
        <RevealGroup className="grid grid-cols-1 gap-10 sm:grid-cols-2 lg:grid-cols-4">
          {members.map((member) => (
            <RevealItem key={member.name} className="flex flex-col gap-5">
              <div className="group relative aspect-square overflow-hidden">
                <Image
                  alt={member.name}
                  fill
                  className="object-cover transition-transform duration-300 group-hover:scale-105"
                  src={member.image}
                />
                <div className="absolute inset-x-0 bottom-0 h-3 bg-[#eb332d]" />
              </div>
              <div className="flex flex-col gap-1">
                <h3 className="text-xl font-semibold text-[#292b2c]">
                  {member.name}
                </h3>
                <p className="text-sm text-[#889091]">{member.role}</p>
              </div>
            </RevealItem>
          ))}
        </RevealGroup>
      </div>
    </section>
  );
}
