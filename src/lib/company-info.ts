import { getPayload } from 'payload'
import config from '@payload-config'

export async function getCompanyInfo() {
  const payload = await getPayload({ config })
  const info = await payload.findGlobal({ slug: 'company-info', depth: 1 })
  return {
    description:
      info.description ?? 'Your product is the gem. We build the website that proves it.',
    socialLinks: (info.socialLinks ?? []).map((s) => ({
      label: s.label,
      href: s.link,
      icon: typeof s.icon === 'object' ? (s.icon?.url ?? undefined) : undefined,
    })),
  }
}
