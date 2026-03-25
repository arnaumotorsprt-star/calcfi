import { setRequestLocale, getTranslations } from 'next-intl/server';
import type { Metadata } from 'next';
import FinancialAdvisorAI from '@/components/calculators/FinancialAdvisorAI';

export async function generateMetadata({ params }: { params: { locale: string } }): Promise<Metadata> {
  const t = await getTranslations({ locale: params.locale, namespace: 'financialAdvisor' });
  return {
    title: t('meta.title'),
    description: t('meta.description'),
    alternates: {
      canonical: `https://calcfi.io/${params.locale}/financial-advisor`,
      languages: {
        en: 'https://calcfi.io/en/financial-advisor',
        es: 'https://calcfi.io/es/financial-advisor',
      },
    },
  };
}

export default function FinancialAdvisorPage({ params }: { params: { locale: string } }) {
  setRequestLocale(params.locale);
  return <FinancialAdvisorAI />;
}
