import type { CollectionConfig } from 'payload'

import { anyone } from '../access/anyone'
import { authenticated } from '../access/authenticated'
import { revalidateContent, revalidateContentDelete } from './hooks/revalidateContent'

export const Team: CollectionConfig = {
  slug: 'team',
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
    {
      name: 'role',
      type: 'text',
      required: true,
    },
    {
      name: 'description',
      type: 'textarea',
    },
    {
      name: 'image',
      type: 'upload',
      relationTo: 'media',
    },
    {
      name: 'order',
      type: 'number',
    },
  ],
  hooks: {
    afterChange: [revalidateContent],
    afterDelete: [revalidateContentDelete],
  },
}
