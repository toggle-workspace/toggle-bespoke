import { Card } from '@/components/ui/card'
import { Reveal, RevealGroup, RevealItem } from '@/components/motion-primitives/reveal'

type StatGridItem = { value: string; label: string }

export function StatGrid({
  title,
  description,
  items,
  columns = 2,
}: {
  title: React.ReactNode
  description?: React.ReactNode
  items: StatGridItem[]
  columns?: 2 | 4
}) {
  return (
    <section className="w-full bg-background">
      <div className="mx-auto max-w-7xl">
        <Reveal className="mb-10 flex flex-col gap-4">
          <h2 className="text-3xl font-semibold tracking-tight text-foreground md:text-4xl">
            {title}
          </h2>
          {description && <p className="max-w-2xl text-muted-foreground">{description}</p>}
        </Reveal>
        <RevealGroup
          className={
            columns === 4
              ? 'grid grid-cols-2 gap-4 lg:grid-cols-4'
              : 'grid grid-cols-1 gap-4 sm:grid-cols-2'
          }
        >
          {items.map((item) => (
            <RevealItem key={item.label}>
              <Card variant="muted" className="gap-2 p-6">
                <span className="text-3xl font-semibold text-primary md:text-4xl">
                  {item.value}
                </span>
                <p className="text-sm text-muted-foreground">{item.label}</p>
              </Card>
            </RevealItem>
          ))}
        </RevealGroup>
      </div>
    </section>
  )
}
