import * as PhosphorIcons from '@phosphor-icons/react/ssr'
import { QuestionIcon } from '@phosphor-icons/react/ssr'
import type { Icon } from '@phosphor-icons/react/lib'
import type { PhosphorIconName } from '@/lib/phosphor-icon-names'

export function PhosphorIcon({
  name,
  className,
}: {
  name?: PhosphorIconName | string | null
  className?: string
}) {
  const IconComponent =
    (name && (PhosphorIcons as unknown as Record<string, Icon>)[name]) || QuestionIcon
  return <IconComponent className={className} />
}
