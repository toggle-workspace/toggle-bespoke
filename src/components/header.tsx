"use client";

import Image from "next/image";
import Link from "next/link";
import { MenuIcon, XIcon } from "lucide-react";
import { useState, useEffect } from "react";
import {
  Sheet,
  SheetTrigger,
  SheetContent,
  SheetClose,
} from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import { NAV_LINKS } from "@/lib/nav-links";

export function Header() {
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const mq = window.matchMedia("(min-width: 768px)");
    const handler = (e: MediaQueryListEvent) => {
      if (e.matches) setOpen(false);
    };
    mq.addEventListener("change", handler);
    return () => mq.removeEventListener("change", handler);
  }, []);

  return (
    <header className="sticky top-0 z-60 w-full border-b border-border bg-background">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-6 lg:px-8">
        <Link href="/" className="flex shrink-0 items-center gap-3">
          <Image
            src="/brand/logo-light.svg"
            alt="Toggle"
            width={66}
            height={18}
            priority
          />
          <span className="h-4 w-px bg-border" />
          <Image
            src="/brand/coo-logo.svg"
            alt="Toggle COO"
            width={59}
            height={18}
            priority
          />
        </Link>

        <nav className="hidden items-center gap-1 md:flex">
          {NAV_LINKS.map((link) => (
            <Link
              key={link.label}
              href={link.href}
              className="rounded-lg px-3 py-1.5 text-sm text-foreground transition-colors hover:bg-accent"
            >
              {link.label}
            </Link>
          ))}
        </nav>

        <Button
          size="l"
          className="hidden px-4 tracking-wide hover:opacity-90 md:flex"
          nativeButton={false}
          render={<Link href="/contact" />}
        >
          Book a call
        </Button>

        <Sheet open={open} onOpenChange={setOpen}>
          <SheetTrigger
            className="md:hidden rounded-lg p-2 text-foreground transition-colors hover:bg-accent"
            render={<button />}
          >
            {open ? (
              <XIcon className="size-5" />
            ) : (
              <MenuIcon className="size-5" />
            )}
            <span className="sr-only">{open ? "Close menu" : "Open menu"}</span>
          </SheetTrigger>
          <SheetContent
            side="top"
            showCloseButton={false}
            className="inset-0! w-screen h-screen max-w-none! flex flex-col p-0"
          >
            <nav className="flex flex-1 flex-col gap-1 p-6 pt-16">
              {NAV_LINKS.map((link) => (
                <SheetClose
                  key={link.label}
                  render={
                    <Link
                      href={link.href}
                      className="rounded-lg px-3 py-3 text-lg text-foreground transition-colors hover:bg-accent"
                    />
                  }
                >
                  {link.label}
                </SheetClose>
              ))}
            </nav>
            <div className="p-6">
              <SheetClose
                render={
                  <Button
                    size="xl"
                    className="w-full px-4 py-3 tracking-wide hover:opacity-90"
                    nativeButton={false}
                    render={<Link href="/contact" />}
                  />
                }
              >
                Book a call
              </SheetClose>
            </div>
          </SheetContent>
        </Sheet>
      </div>
    </header>
  );
}
