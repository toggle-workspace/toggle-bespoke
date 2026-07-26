import Image from 'next/image'
import { Card } from '@/components/ui/card'
import { Subtitle } from '@/components/subtitle'

type IconLabelGridItem = { label: string; icon: string | React.ReactNode }

const DEFAULT_VALUES: IconLabelGridItem[] = [
  { label: 'Client is our top priority', icon: '/about/value-priority.svg' },
  { label: 'Strategy backed by creativity', icon: '/about/value-strategy.svg' },
  { label: 'Clarity over complexity', icon: '/about/value-clarity.svg' },
  { label: 'People first', icon: '/about/value-people.svg' },
  { label: 'Embrace reality', icon: '/about/value-reality.svg' },
  {
    label: 'Transparency is our default',
    icon: '/about/value-transparency.svg',
  },
  { label: 'Diversity drives innovation', icon: '/about/value-diversity.svg' },
  { label: 'Results over vanity', icon: '/about/value-results.svg' },
]

const MD_COLS_CLASS = {
  2: 'md:grid-cols-2',
  3: 'md:grid-cols-3',
  4: 'md:grid-cols-4',
} as const

// ponytail: caps at 4 columns / 2 rows, matching this component's only real-world item counts
function getColumns(itemCount: number): keyof typeof MD_COLS_CLASS {
  return Math.min(4, Math.max(2, Math.ceil(itemCount / 2))) as keyof typeof MD_COLS_CLASS
}

export function IconLabelGrid({
  subtitle = 'Values',
  title = 'Our standards and principles',
  description,
  items = DEFAULT_VALUES,
}: {
  subtitle?: string
  title?: React.ReactNode
  description?: React.ReactNode
  items?: IconLabelGridItem[]
}) {
  return (
    <section className="w-full bg-background">
      <div className="mx-auto max-w-325 px-6 lg:px-8">
        <div className="flex flex-col gap-6 mb-6">
          <Subtitle>{subtitle}</Subtitle>
          <h2 className="text-4xl font-semibold text-foreground md:text-5xl">{title}</h2>
          {description && <p className="max-w-lg text-muted-foreground">{description}</p>}
        </div>
        <div className={`grid grid-cols-2 gap-4 ${MD_COLS_CLASS[getColumns(items.length)]}`}>
          {items.map((item) => (
            <Card key={item.label} variant="muted" className="justify-between gap-6 p-6">
              {typeof item.icon === 'string' ? (
                <Image
                  alt=""
                  width={44}
                  height={44}
                  className="size-11 fill-muted-foreground/50"
                  src={item.icon}
                />
              ) : (
                item.icon
              )}
              <p className="font-semibold text-foreground">{item.label}</p>
            </Card>
          ))}
        </div>
      </div>
    </section>
  )
}
