import type { CollectionConfig } from 'payload'

import { anyone } from '../access/anyone'
import { authenticated } from '../access/authenticated'
import { phosphorIcon } from '@/fields/phosphorIcon'
import { revalidateIndustry, revalidateIndustryDelete } from './hooks/revalidateIndustry'

export const Industries: CollectionConfig = {
  slug: 'industries',
  access: {
    create: authenticated,
    delete: authenticated,
    read: anyone,
    update: authenticated,
  },
  admin: {
    useAsTitle: 'name',
  },
  fields: [
    {
      name: 'name',
      type: 'text',
      required: true,
    },
    phosphorIcon(),
  ],
  hooks: {
    afterChange: [revalidateIndustry],
    afterDelete: [revalidateIndustryDelete],
  },
}
