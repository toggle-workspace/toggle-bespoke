import { getPayload } from 'payload'
import config from '@payload-config'

export type ContentSection = {
  title: string
  description?: string
  image: string
  link?: { label: string; href: string }
  stats?: { value: string; label: string }[]
}

export async function getContentSection(
  key: string,
  fallbackImage: string,
): Promise<ContentSection | undefined> {
  const payload = await getPayload({ config })
  const { docs } = await payload.find({
    collection: 'content-sections',
    where: { key: { equals: key } },
    depth: 1,
    limit: 1,
  })
  const doc = docs[0]
  if (!doc) return undefined
  return {
    title: doc.title,
    description: doc.description ?? undefined,
    image: (typeof doc.image === 'object' ? doc.image?.url : undefined) ?? fallbackImage,
    link: doc.linkLabel && doc.linkHref ? { label: doc.linkLabel, href: doc.linkHref } : undefined,
    stats: doc.stats?.map((s) => ({ value: s.value, label: s.label })),
  }
}
