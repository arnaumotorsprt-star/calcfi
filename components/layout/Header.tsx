'use client';

import Link from 'next/link';
import { useLocale, useTranslations } from 'next-intl';
import { usePathname } from 'next/navigation';
import { useState } from 'react';

export default function Header() {
  const t = useTranslations('nav');
  const locale = useLocale();
  const pathname = usePathname();
  const [menuOpen, setMenuOpen] = useState(false);

  const otherLocale = locale === 'en' ? 'es' : 'en';
  const switchLocalePath = pathname.replace(`/${locale}`, `/${otherLocale}`);

  const tools = [
    { key: 'mortgage', href: `/${locale}/mortgage` },
    { key: 'compoundInterest', href: `/${locale}/compound-interest` },
    { key: 'loan', href: `/${locale}/loan` },
    { key: 'bitcoinProfit', href: `/${locale}/bitcoin-profit` },
    { key: 'dca', href: `/${locale}/dca` },
    { key: 'financialAdvisor', href: `/${locale}/financial-advisor` },
  ] as const;

  return (
    <header className="bg-white border-b border-slate-200 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <Link href={`/${locale}`} className="flex items-center gap-2">
            <span className="text-2xl font-bold text-blue-600">CalcFi</span>
            <span className="hidden sm:block text-xs text-slate-500 mt-1">.io</span>
          </Link>

          {/* Desktop nav */}
          <nav className="hidden lg:flex items-center gap-1">
            {tools.map((tool) => (
              <Link
                key={tool.key}
                href={tool.href}
                className="text-sm text-slate-600 hover:text-blue-600 px-3 py-2 rounded-md hover:bg-blue-50 transition-colors whitespace-nowrap"
              >
                {t(tool.key)}
              </Link>
            ))}
          </nav>

          <div className="flex items-center gap-3">
            <Link
              href={switchLocalePath}
              className="text-sm font-medium text-blue-600 hover:text-blue-700 border border-blue-200 rounded-md px-3 py-1.5 hover:bg-blue-50 transition-colors"
            >
              {otherLocale.toUpperCase()}
            </Link>

            {/* Mobile menu button */}
            <button
              className="lg:hidden p-2 rounded-md text-slate-600 hover:text-blue-600 hover:bg-slate-100"
              onClick={() => setMenuOpen(!menuOpen)}
              aria-label="Menu"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                {menuOpen ? (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                ) : (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                )}
              </svg>
            </button>
          </div>
        </div>

        {/* Mobile menu */}
        {menuOpen && (
          <div className="lg:hidden border-t border-slate-100 py-2">
            {tools.map((tool) => (
              <Link
                key={tool.key}
                href={tool.href}
                className="block text-sm text-slate-600 hover:text-blue-600 px-4 py-2.5 hover:bg-blue-50 transition-colors"
                onClick={() => setMenuOpen(false)}
              >
                {t(tool.key)}
              </Link>
            ))}
          </div>
        )}
      </div>
    </header>
  );
}
