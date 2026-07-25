import type { Metadata } from 'next'
import { PageHeader } from '@/components/page-header'
import { SplitContent } from '@/components/split-content'
import { IconLabelGrid } from '@/components/icon-label-grid'
import { NumberedFeatureGrid } from '@/components/numbered-feature-grid'
import { TeamGrid } from '@/components/team-grid'
import { Testimonials } from '@/components/testimonials'
import { CTA } from '@/components/cta'
import { getPayload } from 'payload'
import config from '@payload-config'
import { getContentSection } from '@/lib/content-sections'

const FALLBACK_IMAGE = '/about/team-alexander-cole.jpg'
const FALLBACK_CONTENT_IMAGE = '/about/video-bg.jpg'

export const metadata: Metadata = {
  title: 'About',
  description:
    'Explore our values, philosophy, and approach that guide every project and help our clients build stronger, lasting brands.',
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

async function getTestimonials() {
  const payload = await getPayload({ config })
  const { docs } = await payload.find({
    collection: 'testimonials',
    sort: 'order',
  })
  return docs.map((doc) => ({
    title: doc.title,
    quote: doc.quote,
    name: doc.name,
    role: doc.role ?? '',
  }))
}

export default async function AboutPage() {
  const [team, testimonials, content] = await Promise.all([
    getTeam(),
    getTestimonials(),
    getContentSection('about', FALLBACK_CONTENT_IMAGE),
  ])
  return (
    <div>
      <PageHeader
        subtitle="About us"
        title="Building digital experiences that inspire and perform"
        description="Explore our values, philosophy, and approach that guide every project and help our clients build stronger, lasting brands."
      />
      <div className="space-y-24 pt-16 sm:space-y-32 sm:pt-24">
        <SplitContent
          title={content?.title ?? 'We believe marketing should deliver more than promises'}
          description={
            content?.description ??
            'Over the years, our team of strategists, creatives, and marketers has worked with brands of all sizes to build meaningful connections with their audiences, grow their businesses, and deliver measurable results. Every project reflects our commitment to strategy, creativity, and long-term success.'
          }
          link={content?.link}
          stats={
            content?.stats ?? [
              { value: '15+', label: 'Years of marketing experience' },
              { value: '100+', label: 'Successful cases' },
            ]
          }
          image={content?.image ?? FALLBACK_CONTENT_IMAGE}
        />
        <IconLabelGrid />
        <NumberedFeatureGrid />
        <TeamGrid members={team} />
        <Testimonials testimonials={testimonials} />
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
