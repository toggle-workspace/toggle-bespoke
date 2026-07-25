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

const FALLBACK_ICON = '/marketing/icon-strategy.svg'
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
    icon: (typeof doc.icon === 'object' ? doc.icon?.url : undefined) ?? FALLBACK_ICON,
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
  const clientLogos = await getClientLogos()
  const caseStudies = await getAllCaseStudies(6)
  const content = await getContentSection('home', FALLBACK_CONTENT_IMAGE)
  return (
    <>
      <Hero
        subtitle="Strategy. Creativity. Results."
        title="Performance Marketing Made Clear & Effective"
        description="From brand positioning to digital campaigns, we deliver practical marketing solutions designed to increase visibility, engagement, and long-term growth."
        actions={[
          {
            label: 'Client Examples',
            href: '/case-studies',
            variant: 'brand-outline',
          },
          { label: 'Book Into Call', href: '/contact' },
        ]}
      />
      <div className="space-y-24 pt-16 sm:space-y-32 sm:pt-24">
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
            icon: service.icon,
            title: service.title,
            description: service.shortDescription,
            href: `/services/${service.slug}`,
          }))}
        />
        <ClientLogos logos={clientLogos} />
        <CaseStudiesGrid studies={caseStudies} />
        <NumberedFeatureGrid />
        <CTA
          title="Ready to grow your brand?"
          description="Take the first step toward marketing success."
          buttonLabel="Schedule a call with our experts"
          buttonHref="/contact"
          footnote={
            <>
              We&rsquo;ll respond within <b className="text-[#292b2c]">24 hours</b>. No pressure,
              just expert advice.
            </>
          }
        />
      </div>
    </>
  )
}
