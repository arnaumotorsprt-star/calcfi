import { setRequestLocale } from 'next-intl/server';
import type { Metadata } from 'next';
import FireCalculator from '@/components/calculators/FireCalculator';

export async function generateMetadata({ params }: { params: { locale: string } }): Promise<Metadata> {
  const isEs = params.locale === 'es';
  return {
    title: isEs
      ? 'Calculadora FIRE — Independencia Financiera 2026 — CalcFi'
      : 'FIRE Calculator — Financial Independence 2026 — CalcFi',
    description: isEs
      ? 'Calculadora FIRE gratuita 2026. Calcula cuántos años faltan para tu independencia financiera y retiro anticipado. Gráfico de crecimiento incluido.'
      : 'Free FIRE calculator 2026. Calculate how many years until financial independence and early retirement. Includes portfolio growth chart.',
    alternates: {
      canonical: `https://calcfi.io/${params.locale}/fire`,
      languages: { en: 'https://calcfi.io/en/fire', es: 'https://calcfi.io/es/fire' },
    },
    openGraph: {
      title: isEs ? 'Calculadora FIRE — CalcFi' : 'FIRE Calculator — CalcFi',
      description: isEs
        ? 'Calcula cuántos años faltan para tu independencia financiera.'
        : 'Calculate how many years until financial independence.',
      url: `https://calcfi.io/${params.locale}/fire`,
      images: [{ url: 'https://calcfi.io/og-image.png', width: 1200, height: 630 }],
    },
  };
}

export default function FirePage({ params }: { params: { locale: string } }) {
  setRequestLocale(params.locale);
  return <FireCalculator />;
}
