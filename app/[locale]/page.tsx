import { setRequestLocale } from 'next-intl/server';
import { getTranslations } from 'next-intl/server';
import type { Metadata } from 'next';
import Link from 'next/link';

const tools = [
  { key: 'mortgage', href: 'mortgage', icon: '🏠' },
  { key: 'compoundInterest', href: 'compound-interest', icon: '📈' },
  { key: 'loan', href: 'loan', icon: '💳' },
  { key: 'bitcoinProfit', href: 'bitcoin-profit', icon: '₿' },
  { key: 'dca', href: 'dca', icon: '🔄' },
  { key: 'financialAdvisor', href: 'financial-advisor', icon: '🤖' },
] as const;

export async function generateMetadata({
  params,
}: {
  params: { locale: string };
}): Promise<Metadata> {
  const t = await getTranslations({ locale: params.locale, namespace: 'home' });
  return {
    title: t('title'),
    description: t('subtitle'),
    alternates: {
      canonical: `https://calcfi.io/${params.locale}`,
      languages: {
        en: 'https://calcfi.io/en',
        es: 'https://calcfi.io/es',
      },
    },
  };
}

export default async function HomePage({ params }: { params: { locale: string } }) {
  setRequestLocale(params.locale);
  const t = await getTranslations({ locale: params.locale, namespace: 'home' });

  return (
    <div className="max-w-6xl mx-auto">
      <div className="text-center mb-12">
        <h1 className="text-4xl sm:text-5xl font-bold text-slate-800 mb-4">
          {t('title')}
        </h1>
        <p className="text-lg text-slate-500 max-w-2xl mx-auto">
          {t('subtitle')}
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {tools.map((tool) => (
          <div
            key={tool.key}
            className="bg-white rounded-2xl border border-slate-200 p-6 hover:shadow-md hover:border-blue-200 transition-all group"
          >
            <div className="text-4xl mb-4">{tool.icon}</div>
            <h2 className="text-xl font-bold text-slate-800 mb-2 group-hover:text-blue-600 transition-colors">
              {t(`tools.${tool.key}.title`)}
            </h2>
            <p className="text-sm text-slate-500 mb-6 leading-relaxed">
              {t(`tools.${tool.key}.description`)}
            </p>
            <Link
              href={`/${params.locale}/${tool.href}`}
              className="inline-flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white text-sm font-semibold px-5 py-2.5 rounded-xl transition-colors"
            >
              {t(`tools.${tool.key}.cta`)}
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
}
