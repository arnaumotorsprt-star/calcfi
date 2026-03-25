import { setRequestLocale, getTranslations } from 'next-intl/server';
import type { Metadata } from 'next';
import DCACalculator from '@/components/calculators/DCACalculator';

export async function generateMetadata({ params }: { params: { locale: string } }): Promise<Metadata> {
  const t = await getTranslations({ locale: params.locale, namespace: 'dca' });
  return {
    title: t('meta.title'),
    description: t('meta.description'),
    alternates: {
      canonical: `https://calcfi.io/${params.locale}/dca`,
      languages: {
        en: 'https://calcfi.io/en/dca',
        es: 'https://calcfi.io/es/dca',
      },
    },
  };
}

export default function DCAPage({ params }: { params: { locale: string } }) {
  setRequestLocale(params.locale);
  return <DCACalculator />;
}
