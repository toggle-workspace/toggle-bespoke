import type { CollectionAfterChangeHook, CollectionAfterDeleteHook } from 'payload'

import { revalidatePath } from 'next/cache'

// Content from these collections can surface on multiple, sometimes indirect,
// pages (e.g. an industry name surfacing through a client on a case study
// card), so revalidate the whole frontend layout rather than tracking every
// downstream path by hand.
export const revalidateContent: CollectionAfterChangeHook = ({ doc, req: { payload, context } }) => {
  if (!context.disableRevalidate) {
    payload.logger.info(`Revalidating site content`)
    revalidatePath('/', 'layout')
  }
  return doc
}

export const revalidateContentDelete: CollectionAfterDeleteHook = ({ doc, req: { context } }) => {
  if (!context.disableRevalidate) {
    revalidatePath('/', 'layout')
  }
  return doc
}
