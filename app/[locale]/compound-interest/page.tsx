import { setRequestLocale, getTranslations } from 'next-intl/server';
import type { Metadata } from 'next';
import CompoundInterestCalculator from '@/components/calculators/CompoundInterestCalculator';

export async function generateMetadata({ params }: { params: { locale: string } }): Promise<Metadata> {
  const t = await getTranslations({ locale: params.locale, namespace: 'compoundInterest' });
  return {
    title: t('meta.title'),
    description: t('meta.description'),
    alternates: {
      canonical: `https://calcfi.io/${params.locale}/compound-interest`,
      languages: {
        en: 'https://calcfi.io/en/compound-interest',
        es: 'https://calcfi.io/es/compound-interest',
      },
    },
  };
}

export default function CompoundInterestPage({ params }: { params: { locale: string } }) {
  setRequestLocale(params.locale);
  return <CompoundInterestCalculator />;
}
