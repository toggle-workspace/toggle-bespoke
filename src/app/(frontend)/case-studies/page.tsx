import type { Metadata } from 'next'
import { PageHeader } from '@/components/page-header'
import { CaseStudiesGrid } from '@/components/case-studies-grid'
import { CTA } from '@/components/cta'
import { getAllCaseStudies } from '@/lib/case-studies'

export const metadata: Metadata = {
  title: 'Case Studies',
  description:
    'Explore real examples of how our strategy, creativity, and marketing expertise drive growth and deliver meaningful outcomes for our clients.',
}

export default async function CaseStudiesPage() {
  const caseStudies = await getAllCaseStudies()
  return (
    <div>
      <PageHeader
        subtitle="Success stories"
        title="Wins worth sharing"
        description="Explore real examples of how our strategy, creativity, and marketing expertise drive growth and deliver meaningful outcomes for our clients."
      />
      <div className="space-y-16 pt-16 sm:space-y-32 sm:pt-24">
        <CaseStudiesGrid showHeader={false} studies={caseStudies} limit={caseStudies.length} />
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
