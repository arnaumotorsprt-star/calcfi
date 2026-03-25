import { setRequestLocale, getTranslations } from 'next-intl/server';
import type { Metadata } from 'next';
import Link from 'next/link';

interface Tool {
  key: 'mortgage' | 'compoundInterest' | 'loan' | 'bitcoinProfit' | 'dca' | 'financialAdvisor';
  href: string;
  category: 'finance' | 'crypto' | 'ai';
  icon: React.ReactNode;
}

const tools: Tool[] = [
  {
    key: 'mortgage',
    href: 'mortgage',
    category: 'finance',
    icon: (
      <svg className="w-6 h-6" fill="none" stroke="currentColor" strokeWidth={1.8} viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" d="M3 12l9-9 9 9M5 10v9a1 1 0 001 1h4v-5h4v5h4a1 1 0 001-1v-9" />
      </svg>
    ),
  },
  {
    key: 'compoundInterest',
    href: 'compound-interest',
    category: 'finance',
    icon: (
      <svg className="w-6 h-6" fill="none" stroke="currentColor" strokeWidth={1.8} viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 18L9 11.25l4.306 4.307a11.95 11.95 0 015.814-5.519l2.74-1.22m0 0l-5.94-2.28m5.94 2.28l-2.28 5.941" />
      </svg>
    ),
  },
  {
    key: 'loan',
    href: 'loan',
    category: 'finance',
    icon: (
      <svg className="w-6 h-6" fill="none" stroke="currentColor" strokeWidth={1.8} viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 8.25h19.5M2.25 9h19.5m-16.5 5.25h6m-6 2.25h3m-3.75 3h15a2.25 2.25 0 002.25-2.25V6.75A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25v10.5A2.25 2.25 0 004.5 19.5z" />
      </svg>
    ),
  },
  {
    key: 'bitcoinProfit',
    href: 'bitcoin-profit',
    category: 'crypto',
    icon: (
      <svg className="w-6 h-6" fill="none" stroke="currentColor" strokeWidth={1.8} viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" d="M12 6v12m-3-2.818l.879.659c1.171.879 3.07.879 4.242 0 1.172-.879 1.172-2.303 0-3.182C13.536 12.219 12.768 12 12 12c-.725 0-1.45-.22-2.003-.659-1.106-.879-1.106-2.303 0-3.182s2.9-.879 4.006 0l.415.33M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
      </svg>
    ),
  },
  {
    key: 'dca',
    href: 'dca',
    category: 'crypto',
    icon: (
      <svg className="w-6 h-6" fill="none" stroke="currentColor" strokeWidth={1.8} viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" d="M16.023 9.348h4.992v-.001M2.985 19.644v-4.992m0 0h4.992m-4.993 0l3.181 3.183a8.25 8.25 0 0013.803-3.7M4.031 9.865a8.25 8.25 0 0113.803-3.7l3.181 3.182m0-4.991v4.99" />
      </svg>
    ),
  },
  {
    key: 'financialAdvisor',
    href: 'financial-advisor',
    category: 'ai',
    icon: (
      <svg className="w-6 h-6" fill="none" stroke="currentColor" strokeWidth={1.8} viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" d="M9.813 15.904L9 18.75l-.813-2.846a4.5 4.5 0 00-3.09-3.09L2.25 12l2.846-.813a4.5 4.5 0 003.09-3.09L9 5.25l.813 2.846a4.5 4.5 0 003.09 3.09L15.75 12l-2.846.813a4.5 4.5 0 00-3.09 3.09z" />
      </svg>
    ),
  },
];

const categoryStyles = {
  finance: {
    border: 'border-t-[#1a56db]',
    iconBg: 'bg-blue-50',
    iconColor: 'text-[#1a56db]',
    ctaBg: 'bg-[#1a56db] hover:bg-blue-700',
  },
  crypto: {
    border: 'border-t-orange-500',
    iconBg: 'bg-orange-50',
    iconColor: 'text-orange-500',
    ctaBg: 'bg-orange-500 hover:bg-orange-600',
  },
  ai: {
    border: 'border-t-[#059669]',
    iconBg: 'bg-emerald-50',
    iconColor: 'text-[#059669]',
    ctaBg: 'bg-[#059669] hover:bg-emerald-700',
  },
};

export async function generateMetadata({ params }: { params: { locale: string } }): Promise<Metadata> {
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
  const isEs = params.locale === 'es';

  return (
    <div className="max-w-6xl mx-auto">

      {/* Hero */}
      <div className="text-center pt-8 pb-16">
        <div className="inline-flex items-center gap-2 bg-emerald-50 border border-emerald-200 text-emerald-700 text-xs font-semibold px-3 py-1.5 rounded-full mb-6">
          <span className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
          {isEs ? '100% Gratuito' : '100% Free'}
        </div>
        <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-slate-900 mb-5 leading-tight tracking-tight">
          {isEs ? (
            <>Calcula tu futuro<br /><span className="text-[#1a56db]">financiero</span></>
          ) : (
            <>Calculate your<br /><span className="text-[#1a56db]">financial future</span></>
          )}
        </h1>
        <p className="text-lg text-slate-500 max-w-xl mx-auto leading-relaxed">
          {isEs
            ? 'Herramientas financieras gratuitas para tomar mejores decisiones'
            : 'Free financial tools to make smarter money decisions'}
        </p>
      </div>

      {/* Tool cards grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
        {tools.map((tool) => {
          const styles = categoryStyles[tool.category];
          return (
            <div
              key={tool.key}
              className={`bg-white rounded-2xl border-t-4 ${styles.border} shadow-card hover:shadow-card-hover hover:-translate-y-0.5 transition-all duration-200 p-6 flex flex-col`}
              style={{ border: '1px solid #e2e8f0', borderTopWidth: 4 }}
            >
              <div className={`w-11 h-11 rounded-xl ${styles.iconBg} ${styles.iconColor} flex items-center justify-center mb-4 shrink-0`}>
                {tool.icon}
              </div>
              <h2 className="text-base font-bold text-slate-900 mb-1.5">
                {t(`tools.${tool.key}.title`)}
              </h2>
              <p className="text-sm text-slate-500 leading-relaxed flex-1 mb-5">
                {t(`tools.${tool.key}.description`)}
              </p>
              <Link
                href={`/${params.locale}/${tool.href}`}
                className={`inline-flex items-center justify-center gap-1.5 ${styles.ctaBg} text-white text-sm font-semibold px-4 py-2.5 rounded-xl transition-colors`}
              >
                {t(`tools.${tool.key}.cta`)}
                <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M9 5l7 7-7 7" />
                </svg>
              </Link>
            </div>
          );
        })}
      </div>

      {/* Bottom note */}
      <p className="text-center text-xs text-slate-400 mt-12 mb-4">
        {isEs
          ? 'Para fines educativos únicamente. No es asesoramiento financiero.'
          : 'For educational purposes only. Not financial advice.'}
      </p>
    </div>
  );
}
