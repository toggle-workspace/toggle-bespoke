import type { CollectionConfig } from 'payload'

import { anyone } from '../access/anyone'
import { authenticated } from '../access/authenticated'
import { defaultLexical } from '@/fields/defaultLexical'

export const CaseStudies: CollectionConfig = {
  slug: 'case-studies',
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
      name: 'shortDescription',
      type: 'text',
    },
    {
      name: 'order',
      type: 'number',
    },
    {
      name: 'slug',
      type: 'text',
    },
    {
      name: 'client',
      type: 'relationship',
      relationTo: 'client',
    },
    {
      name: 'challenges',
      type: 'richText',
      editor: defaultLexical,
    },
    {
      name: 'approach',
      type: 'richText',
      editor: defaultLexical,
    },
    {
      name: 'services',
      type: 'relationship',
      relationTo: 'services',
      hasMany: true,
    },
    {
      name: 'results',
      type: 'array',
      fields: [
        {
          name: 'value',
          type: 'text',
          required: true,
        },
        {
          name: 'label',
          type: 'text',
          required: true,
        },
      ],
    },
  ],
}
