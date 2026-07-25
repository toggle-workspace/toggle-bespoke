import { cn } from "@/lib/utils"

function TextLink({
  className,
  ...props
}: React.ComponentProps<"a">) {
  return (
    <a
      data-slot="text-link"
      className={cn(
        "w-fit border-b-2 border-[#eb332d] pb-1.5 font-semibold text-[#292b2c]",
        className,
      )}
      {...props}
    />
  )
}

export { TextLink }
