import { setRequestLocale, getTranslations } from 'next-intl/server';
import type { Metadata } from 'next';
import MortgageCalculator from '@/components/calculators/MortgageCalculator';

export async function generateMetadata({ params }: { params: { locale: string } }): Promise<Metadata> {
  const t = await getTranslations({ locale: params.locale, namespace: 'mortgage' });
  return {
    title: t('meta.title'),
    description: t('meta.description'),
    alternates: {
      canonical: `https://calcfi.io/${params.locale}/mortgage`,
      languages: {
        en: 'https://calcfi.io/en/mortgage',
        es: 'https://calcfi.io/es/mortgage',
      },
    },
  };
}

export default function MortgagePage({ params }: { params: { locale: string } }) {
  setRequestLocale(params.locale);
  return <MortgageCalculator />;
}
