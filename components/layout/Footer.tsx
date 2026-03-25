'use client';

import Link from 'next/link';
import { useLocale, useTranslations } from 'next-intl';

export default function Footer() {
  const t = useTranslations('nav');
  const locale = useLocale();

  const tools = [
    { key: 'mortgage', href: `/${locale}/mortgage` },
    { key: 'compoundInterest', href: `/${locale}/compound-interest` },
    { key: 'loan', href: `/${locale}/loan` },
    { key: 'bitcoinProfit', href: `/${locale}/bitcoin-profit` },
    { key: 'dca', href: `/${locale}/dca` },
    { key: 'financialAdvisor', href: `/${locale}/financial-advisor` },
  ] as const;

  return (
    <footer className="bg-slate-800 text-slate-300 mt-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
          <div>
            <span className="text-xl font-bold text-white">CalcFi.io</span>
            <p className="mt-2 text-sm text-slate-400">
              Free professional financial and crypto calculators.
            </p>
            <div className="flex gap-3 mt-4">
              <Link href={`/en${locale === 'es' ? '' : ''}`} className="text-sm hover:text-white transition-colors">EN</Link>
              <span>|</span>
              <Link href={`/es`} className="text-sm hover:text-white transition-colors">ES</Link>
            </div>
          </div>
          <div>
            <p className="text-sm font-semibold text-slate-200 mb-3">Tools</p>
            <ul className="space-y-2">
              {tools.map((tool) => (
                <li key={tool.key}>
                  <Link
                    href={tool.href}
                    className="text-sm text-slate-400 hover:text-white transition-colors"
                  >
                    {t(tool.key)}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>
        <div className="border-t border-slate-700 mt-8 pt-6 text-center text-xs text-slate-500">
          © {new Date().getFullYear()} CalcFi.io — For educational purposes only. Not financial advice.
        </div>
      </div>
    </footer>
  );
}
