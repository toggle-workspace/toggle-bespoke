import { Hero } from '@/components/hero'
import { SplitContent } from '@/components/split-content'
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
  const clientLogos = await getClientLogos()
  const caseStudies = await getAllCaseStudies(6)
  const content = await getContentSection('home', FALLBACK_CONTENT_IMAGE)
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
        <NumberedFeatureGrid
          title="Your entire paid marketing setup, built in one weekend"
          subtitle="What We Do"
          items={highlights}
        />
        <SplitContent
          title={
            content?.title ??
            'We’re a team of strategists, creatives, and marketers working together to produce standout content and ensure it reaches the right audience.'
          }
          description={content?.description}
          link={content?.link ?? { label: 'More about us', href: '/about' }}
          stats={content?.stats}
          image={content?.image ?? FALLBACK_CONTENT_IMAGE}
        />
        <IconFeatureGrid
          items={payloadServices.map((service) => ({
            icon: <PhosphorIcon name={service.icon} className="size-14" />,
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
