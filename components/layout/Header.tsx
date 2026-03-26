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
    { key: 'fire', href: `/${locale}/fire` },
    { key: 'savings', href: `/${locale}/savings` },
    { key: 'netWorth', href: `/${locale}/net-worth` },
    { key: 'currencyConverter', href: `/${locale}/currency-converter` },
  ] as const;

  return (
    <header className="bg-white sticky top-0 z-50" style={{ boxShadow: '0 1px 8px rgba(0,0,0,0.08)' }}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">

          {/* Logo */}
          <Link href={`/${locale}`} className="flex items-center gap-1 shrink-0">
            <span className="text-xl font-bold text-slate-900 tracking-tight">CalcFi</span>
            <span className="w-2 h-2 rounded-full bg-emerald-500 mb-3 ml-0.5" />
          </Link>

          {/* Desktop nav */}
          <nav className="hidden lg:flex items-center gap-0.5">
            {tools.map((tool) => (
              <Link
                key={tool.key}
                href={tool.href}
                className="text-sm font-medium text-slate-500 hover:text-slate-900 px-3 py-2 rounded-lg hover:bg-slate-50 transition-colors whitespace-nowrap"
              >
                {t(tool.key)}
              </Link>
            ))}
          </nav>

          <div className="flex items-center gap-2">
            <Link
              href={switchLocalePath}
              className="text-xs font-semibold text-slate-500 hover:text-slate-900 border border-slate-200 rounded-lg px-3 py-1.5 hover:bg-slate-50 transition-colors tracking-wide"
            >
              {otherLocale.toUpperCase()}
            </Link>

            <button
              className="lg:hidden p-2 rounded-lg text-slate-500 hover:text-slate-900 hover:bg-slate-50 transition-colors"
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
          <div className="lg:hidden border-t border-slate-100 py-2 pb-4">
            {tools.map((tool) => (
              <Link
                key={tool.key}
                href={tool.href}
                className="block text-sm font-medium text-slate-600 hover:text-slate-900 px-4 py-2.5 hover:bg-slate-50 rounded-lg transition-colors"
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
