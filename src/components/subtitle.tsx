export function Subtitle({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex items-center gap-2">
      <img alt="" className="size-3.5" src="/marketing/icon-bullet.svg" />
      <span className="font-semibold text-foreground">{children}</span>
    </div>
  )
}
