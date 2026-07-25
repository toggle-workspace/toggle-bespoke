import { Suspense } from 'react'
import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import { getPayload } from 'payload'
import { PageHeader } from '@/components/page-header'
import { IconFeatureGrid } from '@/components/icon-feature-grid'
import { IconLabelGrid } from '@/components/icon-label-grid'
import { CaseStudiesGrid } from '@/components/case-studies-grid'
import { NumberedFeatureGrid } from '@/components/numbered-feature-grid'
import { FAQ } from '@/components/faq'
import { CTA } from '@/components/cta'
import { getAllCaseStudies, getRelatedCaseStudies } from '@/lib/case-studies'
import config from '@payload-config'

const FALLBACK_ICON = '/marketing/icon-strategy.svg'

async function getService(slug: string) {
  const payload = await getPayload({ config })
  const { docs } = await payload.find({
    collection: 'services',
    where: { slug: { equals: slug } },
    limit: 1,
    depth: 2,
  })
  return docs[0] ?? null
}

async function getFAQs() {
  const payload = await getPayload({ config })
  const { docs } = await payload.find({
    collection: 'faq',
    sort: 'order',
  })
  return docs.map((doc) => ({ question: doc.question, answer: doc.answer }))
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>
}): Promise<Metadata> {
  const { slug } = await params
  const service = await getService(slug)
  if (!service) return {}
  return {
    title: service.serviceName,
    description: service.description ?? undefined,
  }
}

// Split out so it can stream in its own Suspense boundary instead of
// blocking PageHeader (and the LCP image) behind this second sequential fetch.
async function RelatedCaseStudies({ serviceId }: { serviceId: string }) {
  const taggedCaseStudies = await getRelatedCaseStudies(serviceId)
  const relatedCaseStudies =
    taggedCaseStudies.length > 0 ? taggedCaseStudies : await getAllCaseStudies(3)

  return (
    <CaseStudiesGrid
      subtitle="Featured case studies"
      title="Our marketing strategy in practice"
      studies={relatedCaseStudies}
      limit={3}
    />
  )
}

export default async function ServicePage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params
  const [service, faqs] = await Promise.all([getService(slug), getFAQs()])
  if (!service) notFound()

  const deliverables = service.deliverablesItems ?? []
  const deliverablesHaveDescriptions = deliverables.some((deliverable) => deliverable.description)

  return (
    <div>
      <PageHeader
        subtitle={service.serviceName}
        title={service.title ?? service.description ?? ''}
        description={service.description}
      />
      <div className="space-y-16 pt-16 sm:space-y-32 sm:pt-24">
        {deliverablesHaveDescriptions ? (
          <IconFeatureGrid
            subtitle="What we deliver"
            title={service.deliverablesSectionTitle ?? undefined}
            items={deliverables.map((deliverable) => ({
              icon:
                (typeof deliverable.icon === 'object' ? deliverable.icon?.url : undefined) ??
                FALLBACK_ICON,
              title: deliverable.title,
              description: deliverable.description ?? '',
            }))}
          />
        ) : (
          <IconLabelGrid
            subtitle="What we deliver"
            title={service.deliverablesSectionTitle ?? undefined}
            description=""
            items={deliverables.map((deliverable) => ({
              label: deliverable.title,
              icon:
                (typeof deliverable.icon === 'object' ? deliverable.icon?.url : undefined) ??
                FALLBACK_ICON,
            }))}
          />
        )}
        <Suspense fallback={null}>
          <RelatedCaseStudies serviceId={String(service.id)} />
        </Suspense>
        {(service.processItems?.length ?? 0) > 0 && (
          <NumberedFeatureGrid
            subtitle="Why choose us"
            title={service.processSectionTitle ?? undefined}
            items={[...(service.processItems ?? [])]
              .sort((a, b) => (a.order ?? 0) - (b.order ?? 0))
              .map((item) => ({
                number: String(item.order ?? 0).padStart(2, '0') + '.',
                title: item.title,
                description: item.description ?? '',
              }))}
          />
        )}
        <FAQ faqs={faqs} />
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
