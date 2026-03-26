import { setRequestLocale } from 'next-intl/server';
import type { Metadata } from 'next';
import NetWorthCalculator from '@/components/calculators/NetWorthCalculator';

export async function generateMetadata({ params }: { params: { locale: string } }): Promise<Metadata> {
  const isEs = params.locale === 'es';
  return {
    title: isEs
      ? 'Calculadora de Patrimonio Neto Gratuita 2026 — CalcFi'
      : 'Free Net Worth Calculator 2026 — CalcFi',
    description: isEs
      ? 'Calculadora de patrimonio neto gratuita 2026. Calcula tu patrimonio neto total a partir de activos y pasivos. Ratio activos/pasivos incluido.'
      : 'Free net worth calculator 2026. Calculate your total net worth from assets and liabilities. Includes assets/liabilities ratio.',
    alternates: {
      canonical: `https://calcfi.io/${params.locale}/net-worth`,
      languages: { en: 'https://calcfi.io/en/net-worth', es: 'https://calcfi.io/es/net-worth' },
    },
    openGraph: {
      title: isEs ? 'Calculadora de Patrimonio Neto — CalcFi' : 'Net Worth Calculator — CalcFi',
      description: isEs
        ? 'Calcula tu patrimonio neto total con activos y pasivos.'
        : 'Calculate your total net worth from assets and liabilities.',
      url: `https://calcfi.io/${params.locale}/net-worth`,
      images: [{ url: 'https://calcfi.io/og-image.png', width: 1200, height: 630 }],
    },
  };
}

export default function NetWorthPage({ params }: { params: { locale: string } }) {
  setRequestLocale(params.locale);
  return <NetWorthCalculator />;
}
