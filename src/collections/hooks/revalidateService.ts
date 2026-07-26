import type { CollectionAfterChangeHook, CollectionAfterDeleteHook } from 'payload'

import { revalidateSitePaths } from '@/lib/revalidate'
import type { Service } from '../../payload-types'

export const revalidateService: CollectionAfterChangeHook<Service> = ({
  doc,
  req: { payload, context },
}) => {
  if (!context.disableRevalidate) {
    const paths = ['/', '/services', `/services/${doc.slug}`]

    payload.logger.info(`Revalidating services at paths: ${paths.join(', ')}`)

    revalidateSitePaths(paths)
  }
  return doc
}

export const revalidateServiceDelete: CollectionAfterDeleteHook<Service> = ({
  doc,
  req: { context },
}) => {
  if (!context.disableRevalidate) {
    revalidateSitePaths(['/', '/services', `/services/${doc?.slug}`])
  }
  return doc
}
