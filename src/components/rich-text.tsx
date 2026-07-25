import {
  RichText as PayloadRichText,
  type JSXConvertersFunction,
} from '@payloadcms/richtext-lexical/react'
import { type DefaultNodeTypes } from '@payloadcms/richtext-lexical'
import { type SerializedEditorState } from 'lexical'

const converters: JSXConvertersFunction<DefaultNodeTypes> = ({ defaultConverters }) =>
  defaultConverters

export function RichText({
  data,
  className,
}: {
  data?: SerializedEditorState | null
  className?: string
}) {
  if (!data) return null

  return (
    <PayloadRichText
      data={data}
      converters={converters}
      className={`flex flex-col gap-4 text-muted-foreground [&_h2]:text-2xl [&_h2]:font-semibold [&_h2]:text-foreground [&_h3]:text-lg [&_h3]:font-semibold [&_h3]:text-foreground [&_ul]:list-disc [&_ul]:pl-5 [&_ol]:list-decimal [&_ol]:pl-5 [&_a]:font-semibold [&_a]:text-primary [&_a]:hover:underline ${className ?? ''}`}
    />
  )
}
