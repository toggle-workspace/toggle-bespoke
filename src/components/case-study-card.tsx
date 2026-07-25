import Image from 'next/image'
import { Card, CardContent } from '@/components/ui/card'

export function CaseStudyCard({
  logo,
  title,
  industry,
  href,
}: {
  logo?: string
  title: string
  industry?: string
  href: string
}) {
  return (
    <a href={href} className="group block">
      <Card variant="default" className="border-transparent rounded-none bg-background">
        <CardContent className="p-0">
          <div className="relative flex h-45 items-center justify-center overflow-hidden bg-[#f2f3f3] p-8">
            {logo && (
              <Image
                alt={`${title} logo`}
                fill
                className="object-contain p-4 transition-transform duration-300 group-hover:scale-105"
                src={logo}
              />
            )}
          </div>
          <div className="flex flex-col gap-1 py-6 bg-background">
            <h3 className="text-xl font-semibold text-[#292b2c]">{title}</h3>
            {industry && <p className="text-sm text-[#889091]">{industry}</p>}
          </div>
        </CardContent>
      </Card>
    </a>
  )
}
