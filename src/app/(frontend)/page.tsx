import { Hero } from '@/components/hero'
import { IconFeatureGrid } from '@/components/icon-feature-grid'
import { ClientLogos } from '@/components/client-logos'
import { CaseStudiesGrid } from '@/components/case-studies-grid'
import { NumberedFeatureGrid } from '@/components/numbered-feature-grid'
import { CTA } from '@/components/cta'
import { getPayload } from 'payload'
import config from '@payload-config'
import { getAllCaseStudies } from '@/lib/case-studies'
import { getContentSection } from '@/lib/content-sections'
import { PhosphorIcon } from '@/components/phosphor-icon'
import { AboutTeam } from '@/components/about-team'
import { SplitContent } from '@/components/split-content'

const FALLBACK_CONTENT_IMAGE = '/marketing/hero-video-bg.jpg'

async function getServices() {
  const payload = await getPayload({ config })
  const { docs } = await payload.find({
    collection: 'services',
    sort: 'order',
    limit: 10,
    depth: 1,
  })
  return docs.map((doc) => ({
    title: doc.serviceName,
    slug: doc.slug,
    shortDescription: doc.description ?? '',
    icon: doc.icon,
  }))
}

async function getHighlights() {
  const payload = await getPayload({ config })
  const { docs } = await payload.find({
    collection: 'highlights',
    sort: 'order',
  })
  return docs.map((doc, index) => ({
    number: `${String(index + 1).padStart(2, '0')}.`,
    title: doc.title,
    description: doc.description,
  }))
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
    image: (typeof doc.image === 'object' ? doc.image?.url : undefined) ?? FALLBACK_CONTENT_IMAGE,
  }))
}

async function getClientLogos() {
  const payload = await getPayload({ config })
  const { docs } = await payload.find({
    collection: 'client',
    sort: 'order',
    limit: 20,
    depth: 1,
  })
  const logos = docs
    .filter((doc) => typeof doc.logo === 'object' && doc.logo?.url)
    .map((doc) => ({
      src: (doc.logo as { url: string }).url,
      alt: doc.companyName,
    }))
  return logos.length > 0 ? logos : undefined
}

export default async function Home() {
  const payloadServices = await getServices()
  const highlights = await getHighlights()
  const team = await getTeam()
  const clientLogos = await getClientLogos()
  const caseStudies = await getAllCaseStudies(6)
  const content = await getContentSection('home-about', FALLBACK_CONTENT_IMAGE)
  return (
    <>
      <Hero
        subtitle="Expert Execution. Proven Results"
        title="Expert Marketing Setup, Completed in One Weekend"
        description="Senior marketers work hands-on with your team to build, launch, document, your paid marketing so you can run it confidently without an agency."
        actions={[
          {
            label: 'Client Examples',
            href: '/case-studies',
            variant: 'brand-outline',
          },
          { label: 'Get Your Marketing Set Up', href: '/contact' },
        ]}
      />
      <div className="space-y-24 pt-16 sm:space-y-32 sm:pt-24">
        {content && (
          <SplitContent
            title={content?.title}
            description={content?.description}
            link={content?.link}
            stats={content?.stats}
            image={content?.image}
          />
        )}
        <NumberedFeatureGrid
          title="Your entire paid marketing setup, built in one weekend"
          subtitle="What We Do"
          items={highlights}
        />
        <AboutTeam
          subtitle="Our Team"
          title="Meet the people behind the work"
          description="A group of strategists, creatives, and marketers dedicated to building brands that stand out and perform."
          link={{ label: 'Meet The Team', href: '/team' }}
          members={team}
        />
        <IconFeatureGrid
          items={payloadServices.map((service) => ({
            icon: <PhosphorIcon name={service.icon} className="size-14 fill-muted-foreground/50" />,
            title: service.title,
            description: service.shortDescription,
            href: `/services/${service.slug}`,
          }))}
        />
        <ClientLogos logos={clientLogos} />
        <CaseStudiesGrid studies={caseStudies} />
        <CTA
          title="Get Your Marketing Set Up"
          description="Tell us about your team and we'll see if this is right for you."
          buttonLabel="Schedule a call with our experts"
          buttonHref="/contact"
        />
      </div>
    </>
  )
}
