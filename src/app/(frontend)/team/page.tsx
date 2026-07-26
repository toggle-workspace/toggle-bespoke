import type { Metadata } from 'next'
import { PageHeader } from '@/components/page-header'
import { TeamGrid } from '@/components/team-grid'
import { CTA } from '@/components/cta'
import { getPayload } from 'payload'
import config from '@payload-config'
import { IconLabelGrid } from '@/components/icon-label-grid'
import { PhosphorIcon } from '@/components/phosphor-icon'

const FALLBACK_IMAGE = '/about/team-alexander-cole.jpg'

export const metadata: Metadata = {
  title: 'Team',
  description: 'Meet the strategists, creatives, and marketers behind our work.',
}

async function getTeam() {
  const payload = await getPayload({ config })
  const { docs } = await payload.find({
    collection: 'team',
    depth: 1,
    sort: 'order',
  })
  return docs.map((doc) => ({
    name: doc.name,
    role: doc.role ?? '',
    image: (typeof doc.image === 'object' ? doc.image?.url : undefined) ?? FALLBACK_IMAGE,
  }))
}

async function getIndustries() {
  const payload = await getPayload({ config })
  const { docs } = await payload.find({
    collection: 'industries',
    depth: 1,
  })
  return docs.map((doc) => ({
    label: doc.name,
    icon: <PhosphorIcon name={doc.icon} className="size-11 fill-muted-foreground/50" />,
  }))
}

export default async function TeamPage() {
  const [team, industries] = await Promise.all([getTeam(), getIndustries()])
  return (
    <div>
      <PageHeader
        subtitle="Our team"
        title="Meet the people behind the work"
        description="A group of strategists, creatives, and marketers dedicated to building brands that stand out and perform."
      />
      <div className="space-y-24 pt-16 sm:space-y-32 sm:pt-24">
        <TeamGrid members={team} hideHeading />
        <IconLabelGrid subtitle="Who we help" title="Industries we support" items={industries} />
        <CTA
          title="Ready to grow your brand?"
          description="Take the first step toward marketing success."
          buttonLabel="Schedule a call with our experts"
          buttonHref="/contact"
          footnote={
            <>
              We&rsquo;ll respond within <b className="text-foreground">24 hours</b>. No pressure,
              just expert advice.
            </>
          }
        />
      </div>
    </div>
  )
}
