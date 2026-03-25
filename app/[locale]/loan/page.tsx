import { setRequestLocale, getTranslations } from 'next-intl/server';
import type { Metadata } from 'next';
import LoanCalculator from '@/components/calculators/LoanCalculator';

export async function generateMetadata({ params }: { params: { locale: string } }): Promise<Metadata> {
  const t = await getTranslations({ locale: params.locale, namespace: 'loan' });
  return {
    title: t('meta.title'),
    description: t('meta.description'),
    alternates: {
      canonical: `https://calcfi.io/${params.locale}/loan`,
      languages: {
        en: 'https://calcfi.io/en/loan',
        es: 'https://calcfi.io/es/loan',
      },
    },
  };
}

export default function LoanPage({ params }: { params: { locale: string } }) {
  setRequestLocale(params.locale);
  return <LoanCalculator />;
}
