'use client';

import Link from 'next/link';
import { useLocale, useTranslations } from 'next-intl';

export default function Footer() {
  const t = useTranslations('nav');
  const locale = useLocale();

  const financeTools = [
    { key: 'mortgage', href: `/${locale}/mortgage` },
    { key: 'compoundInterest', href: `/${locale}/compound-interest` },
    { key: 'loan', href: `/${locale}/loan` },
  ] as const;

  const cryptoTools = [
    { key: 'bitcoinProfit', href: `/${locale}/bitcoin-profit` },
    { key: 'dca', href: `/${locale}/dca` },
    { key: 'financialAdvisor', href: `/${locale}/financial-advisor` },
  ] as const;

  return (
    <footer className="bg-slate-900 text-slate-400 mt-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-8">

          {/* Brand */}
          <div className="col-span-2 sm:col-span-1">
            <div className="flex items-center gap-1 mb-3">
              <span className="text-base font-bold text-white tracking-tight">CalcFi</span>
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 mb-2.5" />
            </div>
            <p className="text-xs leading-relaxed text-slate-500 mb-4">
              Free financial & crypto calculators for smarter decisions.
            </p>
            <div className="flex gap-2">
              <Link href="/en" className="text-xs font-medium text-slate-400 hover:text-white border border-slate-700 rounded px-2 py-1 transition-colors">EN</Link>
              <Link href="/es" className="text-xs font-medium text-slate-400 hover:text-white border border-slate-700 rounded px-2 py-1 transition-colors">ES</Link>
            </div>
          </div>

          {/* Finance tools */}
          <div>
            <p className="text-xs font-semibold text-slate-300 uppercase tracking-wider mb-3">Finance</p>
            <ul className="space-y-2">
              {financeTools.map((tool) => (
                <li key={tool.key}>
                  <Link href={tool.href} className="text-xs text-slate-500 hover:text-white transition-colors">
                    {t(tool.key)}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Crypto + AI tools */}
          <div>
            <p className="text-xs font-semibold text-slate-300 uppercase tracking-wider mb-3">Crypto & AI</p>
            <ul className="space-y-2">
              {cryptoTools.map((tool) => (
                <li key={tool.key}>
                  <Link href={tool.href} className="text-xs text-slate-500 hover:text-white transition-colors">
                    {t(tool.key)}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Legal */}
          <div>
            <p className="text-xs font-semibold text-slate-300 uppercase tracking-wider mb-3">Legal</p>
            <ul className="space-y-2 mb-3">
              <li>
                <Link href={`/${locale}/privacy`} className="text-xs text-slate-500 hover:text-white transition-colors">
                  Privacy Policy
                </Link>
              </li>
              <li>
                <Link href={`/${locale}/about`} className="text-xs text-slate-500 hover:text-white transition-colors">
                  About CalcFi
                </Link>
              </li>
            </ul>
            <p className="text-xs text-slate-600 leading-relaxed">
              Educational purposes only. Not financial advice. Always consult a licensed advisor.
            </p>
          </div>

        </div>

        <div className="border-t border-slate-800 mt-8 pt-6 flex flex-col sm:flex-row items-center justify-between gap-2">
          <p className="text-xs text-slate-600">© {new Date().getFullYear()} CalcFi.io. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}
