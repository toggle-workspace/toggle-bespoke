import Image from 'next/image'
import { TextLink } from '@/components/ui/text-link'
import { Subtitle } from '@/components/subtitle'
import { RevealGroup, RevealItem } from '@/components/motion-primitives/reveal'
import { InfiniteSlider } from '@/components/motion-primitives/infinite-slider'
import { ProgressiveBlur } from '@/components/motion-primitives/progressive-blur'

type Stat = { value: string; label: string }
type Member = { name: string; role: string; image: string }

export function AboutTeam({
  subtitle,
  title,
  description,
  link,
  stats,
  members = [],
}: {
  subtitle?: string
  title: React.ReactNode
  description?: React.ReactNode
  link?: { label: string; href: string }
  stats?: Stat[]
  members?: Member[]
}) {
  const MIN_TILES = 8
  const mid = Math.ceil(members.length / 2)
  const rows = [members.slice(0, mid), members.slice(mid)].map((row) => {
    if (row.length === 0) return row
    const filled: Member[] = []
    while (filled.length < MIN_TILES) filled.push(...row)
    return filled
  })

  return (
    <section className="w-full bg-background">
      <RevealGroup className="mx-auto flex max-w-325 flex-col items-stretch gap-10 px-6 lg:flex-row lg:px-8">
        <RevealItem className="flex flex-1 flex-col justify-center gap-6">
          {subtitle && <Subtitle>{subtitle}</Subtitle>}
          <h2 className="text-4xl font-semibold text-foreground md:text-5xl max-w-2xl">{title}</h2>
          {description && <p className="text-muted-foreground text-lg">{description}</p>}
          {stats && stats.length > 0 && (
            <div className="flex flex-wrap gap-10">
              {stats.map((stat) => (
                <div key={stat.label} className="flex flex-col gap-1">
                  <span className="text-4xl font-semibold text-primary">{stat.value}</span>
                  <p className="max-w-40 font-semibold text-foreground">{stat.label}</p>
                </div>
              ))}
            </div>
          )}
          {link && (
            <TextLink href={link.href} className="mt-4 text-base">
              {link.label}
            </TextLink>
          )}
        </RevealItem>
        <RevealItem className="relative min-h-100 flex-1 overflow-hidden rounded-2xl">
          <div className="flex h-full flex-col justify-center gap-4">
            {rows.map(
              (row, i) =>
                row.length > 0 && (
                  <InfiniteSlider key={i} speed={30} gap={16} reverse={i === 1}>
                    {row.map((member, memberIndex) => (
                      <div
                        key={`${member.name}-${memberIndex}`}
                        className="relative size-40 shrink-0 overflow-hidden rounded-xl"
                      >
                        <Image alt={member.name} fill className="object-cover" src={member.image} />
                      </div>
                    ))}
                  </InfiniteSlider>
                ),
            )}
          </div>
          <div className="pointer-events-none absolute inset-y-0 left-0 w-24 bg-linear-to-r from-background to-transparent" />
          <div className="pointer-events-none absolute inset-y-0 right-0 w-24 bg-linear-to-l from-background to-transparent" />
          <ProgressiveBlur direction="left" className="absolute inset-y-0 left-0 w-16" />
          <ProgressiveBlur direction="right" className="absolute inset-y-0 right-0 w-16" />
        </RevealItem>
      </RevealGroup>
    </section>
  )
}
