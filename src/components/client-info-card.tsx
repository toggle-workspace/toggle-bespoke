import Image from 'next/image'
import { Card } from '@/components/ui/card'

export function ClientInfoCard({
  name,
  logo,
  description,
  industry,
  location,
  website,
  services,
}: {
  name: string
  logo: string
  description: string
  industry: string
  location: string
  website: string
  services: string[]
}) {
  return (
    <div className="flex flex-col gap-6">
      <Card variant="muted" className="relative h-32 items-center justify-center p-6">
        <Image alt={name} fill className="object-contain p-6" src={logo} />
      </Card>
      <p className="text-sm text-muted-foreground">{description}</p>
      <dl className="flex flex-col gap-2 text-sm">
        <div className="flex gap-1">
          <dt className="font-semibold text-foreground">Industry:</dt>
          <dd className="text-muted-foreground">{industry}</dd>
        </div>
        <div className="flex gap-1">
          <dt className="font-semibold text-foreground">Location:</dt>
          <dd className="text-muted-foreground">{location}</dd>
        </div>
        {services.length > 0 && (
          <div className="flex gap-1">
            <dt className="font-semibold text-foreground">Services:</dt>
            <dd className="text-muted-foreground">{services.join(', ')}</dd>
          </div>
        )}
      </dl>
      <a
        href={website}
        target="_blank"
        rel="noopener noreferrer"
        className="w-fit text-sm font-semibold text-primary hover:underline"
      >
        {website}
      </a>
    </div>
  )
}
