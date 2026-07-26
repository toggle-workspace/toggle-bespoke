import type { CollectionAfterChangeHook, CollectionAfterDeleteHook } from 'payload'

import { revalidateSitePaths } from '@/lib/revalidate'
import type { Industry } from '../../payload-types'

export const revalidateIndustry: CollectionAfterChangeHook<Industry> = ({
  doc,
  req: { payload, context },
}) => {
  if (!context.disableRevalidate) {
    payload.logger.info(`Revalidating industries at path: /team`)

    revalidateSitePaths(['/team'])
  }
  return doc
}

export const revalidateIndustryDelete: CollectionAfterDeleteHook<Industry> = ({
  doc,
  req: { context },
}) => {
  if (!context.disableRevalidate) {
    revalidateSitePaths(['/team'])
  }
  return doc
}
