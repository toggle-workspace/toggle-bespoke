import type { Field } from 'payload'

import { PHOSPHOR_ICON_NAMES } from '@/lib/phosphor-icon-names'

const PHOSPHOR_ICON_OPTIONS = PHOSPHOR_ICON_NAMES.map((name) => ({
  label: name.replace(/Icon$/, ''),
  value: name,
}))

export const phosphorIcon = (name = 'icon', overrides: Record<string, unknown> = {}): Field => {
  const field: Field = {
    name,
    type: 'select',
    options: PHOSPHOR_ICON_OPTIONS,
    admin: {
      description: 'Icon from the Phosphor icon set. Preview icons at https://phosphoricons.com/',
    },
  }
  return { ...field, ...overrides } as Field
}
