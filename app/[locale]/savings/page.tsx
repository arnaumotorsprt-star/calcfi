import { setRequestLocale } from 'next-intl/server';
import type { Metadata } from 'next';
import SavingsCalculator from '@/components/calculators/SavingsCalculator';

export async function generateMetadata({ params }: { params: { locale: string } }): Promise<Metadata> {
  const isEs = params.locale === 'es';
  return {
    title: isEs
      ? 'Calculadora de Ahorro Gratuita 2026 — CalcFi'
      : 'Free Savings Calculator 2026 — CalcFi',
    description: isEs
      ? 'Calculadora de ahorro gratuita 2026. Descubre cuánto debes ahorrar cada mes para alcanzar tu objetivo financiero con intereses.'
      : 'Free savings calculator 2026. Find out how much to save each month to reach your financial goal. Includes interest calculation and growth chart.',
    alternates: {
      canonical: `https://calcfi.io/${params.locale}/savings`,
      languages: { en: 'https://calcfi.io/en/savings', es: 'https://calcfi.io/es/savings' },
    },
    openGraph: {
      title: isEs ? 'Calculadora de Ahorro — CalcFi' : 'Savings Calculator — CalcFi',
      description: isEs
        ? 'Calcula tu ahorro mensual necesario para alcanzar tu objetivo.'
        : 'Calculate your monthly savings needed to reach your goal.',
      url: `https://calcfi.io/${params.locale}/savings`,
      images: [{ url: 'https://calcfi.io/og-image.png', width: 1200, height: 630 }],
    },
  };
}

export default function SavingsPage({ params }: { params: { locale: string } }) {
  setRequestLocale(params.locale);
  return <SavingsCalculator />;
}
