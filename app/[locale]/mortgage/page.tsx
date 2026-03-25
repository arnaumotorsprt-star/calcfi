import { setRequestLocale } from 'next-intl/server';
import type { Metadata } from 'next';
import MortgageCalculator from '@/components/calculators/MortgageCalculator';
import FaqSection from '@/components/seo/FaqSection';
import AboutTool from '@/components/seo/AboutTool';
import RelatedTools from '@/components/seo/RelatedTools';
import JsonLd from '@/components/seo/JsonLd';
import { seoContent, webAppSchema, breadcrumbSchema, howToSchema, getRelatedTools } from '@/lib/seo-content';

const TOOL = 'mortgage' as const;

export async function generateMetadata({ params }: { params: { locale: string } }): Promise<Metadata> {
  const isEs = params.locale === 'es';
  return {
    title: isEs ? 'Calculadora de Hipoteca Gratuita 2026 — CalcFi' : 'Free Mortgage Calculator 2026 — CalcFi',
    description: isEs
      ? 'Calculadora de hipoteca gratuita 2026. Calcula tu cuota mensual, intereses totales y plan de amortización completo. Sin registro. Resultados instantáneos. Fórmula PMT estándar.'
      : 'Free mortgage calculator 2026. Calculate monthly payments, total interest and see full amortization schedule. No registration required. Fast and accurate results using the PMT formula.',
    alternates: {
      canonical: `https://calcfi.io/${params.locale}/mortgage`,
      languages: { en: 'https://calcfi.io/en/mortgage', es: 'https://calcfi.io/es/mortgage' },
    },
    openGraph: {
      title: isEs ? 'Calculadora de Hipoteca — CalcFi' : 'Mortgage Calculator — CalcFi',
      description: isEs ? 'Calcula tu cuota mensual e intereses totales gratis.' : 'Calculate your monthly payment and total interest for free.',
      url: `https://calcfi.io/${params.locale}/mortgage`,
      images: [{ url: 'https://calcfi.io/og-image.png', width: 1200, height: 630 }],
    },
  };
}

export default function MortgagePage({ params }: { params: { locale: string } }) {
  setRequestLocale(params.locale);
  const locale = params.locale as 'en' | 'es';
  const content = seoContent[locale][TOOL];
  const related = getRelatedTools(locale, TOOL);

  return (
    <>
      <JsonLd data={webAppSchema(locale, TOOL, content.appName, content.appDescription, content.appFeatures)} />
      <JsonLd data={breadcrumbSchema(locale, TOOL, content.appName.split(' — ')[0])} />
      <JsonLd data={howToSchema(content.howToName, content.howToSteps)} />
      <MortgageCalculator />
      <FaqSection faqs={content.faqs} title={content.faqTitle} />
      <AboutTool title={content.aboutTitle} body={content.aboutBody} />
      <RelatedTools tools={related} title={content.relatedTitle} />
    </>
  );
}
