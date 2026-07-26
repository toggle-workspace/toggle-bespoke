import type { CollectionConfig } from 'payload'

import { anyone } from '../access/anyone'
import { authenticated } from '../access/authenticated'
import { phosphorIcon } from '@/fields/phosphorIcon'
import { revalidateContent, revalidateContentDelete } from './hooks/revalidateContent'

export const Services: CollectionConfig = {
  slug: 'services',
  access: {
    create: authenticated,
    delete: authenticated,
    read: anyone,
    update: authenticated,
  },
  admin: {
    useAsTitle: 'serviceName',
  },
  fields: [
    {
      name: 'serviceName',
      type: 'text',
      required: true,
    },
    {
      name: 'order',
      type: 'number',
    },
    {
      name: 'description',
      type: 'text',
    },
    {
      name: 'slug',
      type: 'text',
    },
    phosphorIcon(),
    {
      name: 'title',
      type: 'text',
    },
    {
      name: 'deliverablesSectionTitle',
      type: 'text',
    },
    {
      name: 'deliverablesItems',
      type: 'array',
      fields: [
        phosphorIcon(),
        {
          name: 'title',
          type: 'text',
          required: true,
        },
        {
          name: 'description',
          type: 'text',
        },
      ],
    },
    {
      name: 'processSectionTitle',
      type: 'text',
    },
    {
      name: 'processItems',
      type: 'array',
      fields: [
        {
          name: 'order',
          type: 'number',
        },
        {
          name: 'title',
          type: 'text',
          required: true,
        },
        {
          name: 'description',
          type: 'text',
        },
      ],
    },
  ],
  hooks: {
    afterChange: [revalidateContent],
    afterDelete: [revalidateContentDelete],
  },
}
