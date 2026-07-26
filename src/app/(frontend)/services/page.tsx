import type { Metadata } from 'next'
import { IconFeatureGrid } from '@/components/icon-feature-grid'
import { PageHeader } from '@/components/page-header'
import { getPayload } from 'payload'
import config from '@payload-config'
import { CTA } from '@/components/cta'
import { PhosphorIcon } from '@/components/phosphor-icon'

export const metadata: Metadata = {
  title: 'Services',
  description:
    'Explore the strategy, creative, and campaign services we use to help brands increase visibility, engagement, and long-term growth.',
}

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

export default async function ServicesPage() {
  const payloadServices = await getServices()
  return (
    <div>
      <PageHeader
        subtitle="Services"
        title="Marketing services built to grow your brand"
        description="Explore the strategy, creative, and campaign services we use to help brands increase visibility, engagement, and long-term growth."
      />
      <div className="space-y-16 pt-16 sm:space-y-32 sm:pt-24">
        <IconFeatureGrid
          items={payloadServices.map((service) => ({
            icon: <PhosphorIcon name={service.icon} className="size-14" />,
            title: service.title,
            description: service.shortDescription,
            href: `/services/${service.slug}`,
          }))}
        />
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
