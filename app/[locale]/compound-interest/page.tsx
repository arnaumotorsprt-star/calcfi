import { setRequestLocale } from 'next-intl/server';
import type { Metadata } from 'next';
import CompoundInterestCalculator from '@/components/calculators/CompoundInterestCalculator';
import FaqSection from '@/components/seo/FaqSection';
import AboutTool from '@/components/seo/AboutTool';
import RelatedTools from '@/components/seo/RelatedTools';
import JsonLd from '@/components/seo/JsonLd';
import { seoContent, webAppSchema, breadcrumbSchema, howToSchema, getRelatedTools } from '@/lib/seo-content';

const TOOL = 'compound-interest' as const;

export async function generateMetadata({ params }: { params: { locale: string } }): Promise<Metadata> {
  const isEs = params.locale === 'es';
  return {
    title: isEs ? 'Calculadora de Interés Compuesto Gratuita 2026 — CalcFi' : 'Free Compound Interest Calculator 2026 — CalcFi',
    description: isEs
      ? 'Calculadora de interés compuesto gratuita 2026. Calcula el crecimiento de tu inversión con capitalización mensual, trimestral o anual. Gráfico de crecimiento incluido. Sin registro.'
      : 'Free compound interest calculator 2026. Calculate investment growth with monthly, quarterly or annual compounding. Includes growth chart. No registration required. Instant results.',
    alternates: {
      canonical: `https://calcfi.io/${params.locale}/compound-interest`,
      languages: { en: 'https://calcfi.io/en/compound-interest', es: 'https://calcfi.io/es/compound-interest' },
    },
    openGraph: {
      title: isEs ? 'Calculadora Interés Compuesto — CalcFi' : 'Compound Interest Calculator — CalcFi',
      description: isEs ? 'Visualiza el crecimiento de tu inversión con interés compuesto.' : 'Visualize your investment growth with compound interest.',
      url: `https://calcfi.io/${params.locale}/compound-interest`,
      images: [{ url: 'https://calcfi.io/og-image.png', width: 1200, height: 630 }],
    },
  };
}

export default function CompoundInterestPage({ params }: { params: { locale: string } }) {
  setRequestLocale(params.locale);
  const locale = params.locale as 'en' | 'es';
  const content = seoContent[locale][TOOL];
  const related = getRelatedTools(locale, TOOL);

  return (
    <>
      <JsonLd data={webAppSchema(locale, TOOL, content.appName, content.appDescription, content.appFeatures)} />
      <JsonLd data={breadcrumbSchema(locale, TOOL, content.appName.split(' — ')[0])} />
      <JsonLd data={howToSchema(content.howToName, content.howToSteps)} />
      <CompoundInterestCalculator />
      <FaqSection faqs={content.faqs} title={content.faqTitle} />
      <AboutTool title={content.aboutTitle} body={content.aboutBody} />
      <RelatedTools tools={related} title={content.relatedTitle} />
    </>
  );
}
