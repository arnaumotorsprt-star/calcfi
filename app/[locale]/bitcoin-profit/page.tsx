import { setRequestLocale, getTranslations } from 'next-intl/server';
import type { Metadata } from 'next';
import BitcoinProfitCalculator from '@/components/calculators/BitcoinProfitCalculator';

export async function generateMetadata({ params }: { params: { locale: string } }): Promise<Metadata> {
  const t = await getTranslations({ locale: params.locale, namespace: 'bitcoinProfit' });
  return {
    title: t('meta.title'),
    description: t('meta.description'),
    alternates: {
      canonical: `https://calcfi.io/${params.locale}/bitcoin-profit`,
      languages: {
        en: 'https://calcfi.io/en/bitcoin-profit',
        es: 'https://calcfi.io/es/bitcoin-profit',
      },
    },
  };
}

export default function BitcoinProfitPage({ params }: { params: { locale: string } }) {
  setRequestLocale(params.locale);
  return <BitcoinProfitCalculator />;
}
