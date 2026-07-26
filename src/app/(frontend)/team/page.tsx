import type { Metadata } from 'next'
import { PageHeader } from '@/components/page-header'
import { TeamGrid } from '@/components/team-grid'
import { CTA } from '@/components/cta'
import { getPayload } from 'payload'
import config from '@payload-config'

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
  })
  return docs.map((doc) => ({
    name: doc.name,
    role: doc.role ?? '',
    image: (typeof doc.image === 'object' ? doc.image?.url : undefined) ?? FALLBACK_IMAGE,
  }))
}

export default async function TeamPage() {
  const team = await getTeam()
  return (
    <div>
      <PageHeader
        subtitle="Our team"
        title="Meet the people behind the work"
        description="A group of strategists, creatives, and marketers dedicated to building brands that stand out and perform."
      />
      <div className="space-y-24 pt-16 sm:space-y-32 sm:pt-24">
        <TeamGrid members={team} />
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
