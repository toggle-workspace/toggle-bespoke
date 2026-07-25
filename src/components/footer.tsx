import Image from 'next/image'
import Link from 'next/link'
import { getPayload } from 'payload'
import config from '@payload-config'
import { getCompanyInfo } from '@/lib/company-info'
import { NAV_LINKS as BASE_NAV_LINKS } from '@/lib/nav-links'

const NAV_LINKS = [...BASE_NAV_LINKS, { label: 'Contact', href: '/contact' }]

async function getServices() {
  const payload = await getPayload({ config })
  const { docs } = await payload.find({
    collection: 'services',
    sort: 'order',
    limit: 6,
    depth: 0,
  })
  return docs.map((doc) => ({
    label: doc.serviceName,
    href: `/services/${doc.slug}`,
  }))
}

export async function Footer() {
  const year = new Date().getFullYear()
  const [services, { description, socialLinks }] = await Promise.all([
    getServices(),
    getCompanyInfo(),
  ])

  return (
    <footer className="w-full bg-muted/5">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        {/* Top */}
        <div className="flex flex-col gap-12 py-16 md:flex-row md:justify-between">
          {/* Brand */}
          <div className="flex flex-col gap-4">
            <Link href="/" className="flex items-center gap-3">
              <Image src="/brand/logo-light.svg" alt="Toggle" width={66} height={18} priority />
            </Link>
            <p className="max-w-xs text-base leading-relaxed text-muted-foreground">
              {description}
            </p>
          </div>

          {/* Nav columns */}
          <div className="flex gap-16">
            <div className="flex flex-col gap-3">
              <p className="text-sm font-semibold">Navigation</p>
              <nav className="flex flex-col gap-2">
                {NAV_LINKS.map((link) => (
                  <Link
                    key={link.label}
                    href={link.href}
                    className="text-sm text-muted-foreground transition-colors hover:text-foreground"
                  >
                    {link.label}
                  </Link>
                ))}
              </nav>
            </div>

            <div className="flex flex-col gap-3">
              <p className="text-sm font-semibold">Services</p>
              <nav className="flex flex-col gap-2">
                {services.map((link) => (
                  <Link
                    key={link.label}
                    href={link.href}
                    className="text-sm text-muted-foreground transition-colors hover:text-foreground"
                  >
                    {link.label}
                  </Link>
                ))}
              </nav>
            </div>
          </div>
        </div>

        <hr className="border-border" />

        {/* Bottom */}
        <div className="flex flex-col items-start gap-4 py-6 sm:flex-row sm:items-center sm:justify-between">
          <div className="flex flex-col gap-1 sm:flex-row sm:items-center sm:gap-4">
            <p className="text-xs text-muted-foreground">
              © {year} Toggle Group Sdn. Bhd. All rights reserved.
            </p>
            <div className="flex items-center gap-2">
              <Link
                href="/privacy-policy"
                className="text-xs text-muted-foreground transition-colors hover:text-foreground"
              >
                Privacy Policy
              </Link>
              <span className="text-xs text-muted-foreground">|</span>
              <Link
                href="/terms"
                className="text-xs text-muted-foreground transition-colors hover:text-foreground"
              >
                Terms &amp; Conditions
              </Link>
            </div>
          </div>

          <div className="flex items-center gap-3">
            {socialLinks.map((s) => (
              <a
                key={s.label}
                href={s.href}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={s.label}
                className="rounded-full p-2 transition-colors hover:bg-accent"
              >
                {s.icon && <Image src={s.icon} alt="" aria-hidden width={20} height={20} />}
              </a>
            ))}
          </div>
        </div>
      </div>
    </footer>
  )
}
