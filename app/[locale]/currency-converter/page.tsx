import { setRequestLocale } from 'next-intl/server';
import type { Metadata } from 'next';
import CurrencyConverter from '@/components/calculators/CurrencyConverter';

export async function generateMetadata({ params }: { params: { locale: string } }): Promise<Metadata> {
  const isEs = params.locale === 'es';
  return {
    title: isEs
      ? 'Conversor de Divisas Gratis — Tipos en Tiempo Real 2026 — CalcFi'
      : 'Free Currency Converter — Real-Time Rates 2026 — CalcFi',
    description: isEs
      ? 'Conversor de divisas gratuito en tiempo real 2026. Convierte entre más de 160 divisas con tipos de cambio actualizados diariamente.'
      : 'Free real-time currency converter 2026. Convert between 160+ currencies with daily updated exchange rates. No registration required.',
    alternates: {
      canonical: `https://calcfi.io/${params.locale}/currency-converter`,
      languages: {
        en: 'https://calcfi.io/en/currency-converter',
        es: 'https://calcfi.io/es/currency-converter',
      },
    },
    openGraph: {
      title: isEs ? 'Conversor de Divisas — CalcFi' : 'Currency Converter — CalcFi',
      description: isEs
        ? 'Convierte entre más de 160 divisas con tipos en tiempo real.'
        : 'Convert between 160+ currencies with real-time exchange rates.',
      url: `https://calcfi.io/${params.locale}/currency-converter`,
      images: [{ url: 'https://calcfi.io/og-image.png', width: 1200, height: 630 }],
    },
  };
}

export default function CurrencyConverterPage({ params }: { params: { locale: string } }) {
  setRequestLocale(params.locale);
  return <CurrencyConverter />;
}
