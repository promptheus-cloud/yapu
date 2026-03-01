"use client";

import { useTranslations } from "next-intl";

function XIcon() {
  return (
    <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24">
      <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
    </svg>
  );
}

function LinkedInIcon() {
  return (
    <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24">
      <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
    </svg>
  );
}

export default function Footer() {
  const t = useTranslations("footer");

  return (
    <footer className="yapu-footer text-white/90">
      <div className="mx-auto max-w-6xl px-6 py-12">
        {/* Top row: Logo/tagline + Addresses + Legal */}
        <div className="grid gap-10 md:grid-cols-3">
          {/* Logo + Tagline */}
          <div>
            <div className="text-xl font-bold tracking-tight text-white">
              YAPU
            </div>
            <p className="mt-2 text-sm text-white/60">
              {t("tagline")}
            </p>
            <div className="mt-5 flex items-center gap-4">
              <a
                href="https://www.linkedin.com/company/yapu-solutions/"
                target="_blank"
                rel="noopener noreferrer"
                className="text-white/50 transition-colors hover:text-white"
              >
                <LinkedInIcon />
              </a>
              <a
                href="https://twitter.com/yapusolutions"
                target="_blank"
                rel="noopener noreferrer"
                className="text-white/50 transition-colors hover:text-white"
              >
                <XIcon />
              </a>
            </div>
          </div>

          {/* Addresses */}
          <div className="grid gap-6 sm:grid-cols-2 md:col-span-1">
            <div>
              <p className="text-sm font-semibold text-white">{t("companyBerlin")}</p>
              <p className="mt-1 text-sm text-white/60">{t("addressBerlin")}</p>
            </div>
            <div>
              <p className="text-sm font-semibold text-white">{t("companyQuito")}</p>
              <p className="mt-1 text-sm text-white/60">{t("addressQuito")}</p>
            </div>
          </div>

          {/* Legal + Contact */}
          <div>
            <p className="text-sm font-semibold text-white">{t("legalPolicies")}</p>
            <div className="mt-2 flex flex-col gap-1.5">
              <a href="#" className="text-sm text-white/60 transition-colors hover:text-white">
                {t("legalService")}
              </a>
              <a href="#" className="text-sm text-white/60 transition-colors hover:text-white">
                {t("privacyPolicy")}
              </a>
            </div>
            <div className="mt-4 flex flex-col gap-1 text-sm text-white/60">
              <a href="mailto:info@yapu.solutions" className="transition-colors hover:text-white">
                {t("email")}
              </a>
              <span>{t("phone")}</span>
            </div>
          </div>
        </div>

        {/* Bottom: Copyright */}
        <div className="mt-10 border-t border-white/10 pt-6 text-center text-xs text-white/40">
          &copy; {new Date().getFullYear()} {t("copyright")}
        </div>
      </div>
    </footer>
  );
}
