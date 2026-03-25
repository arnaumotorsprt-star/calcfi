import { setRequestLocale } from 'next-intl/server';
import type { Metadata } from 'next';
import DCACalculator from '@/components/calculators/DCACalculator';
import FaqSection from '@/components/seo/FaqSection';
import AboutTool from '@/components/seo/AboutTool';
import RelatedTools from '@/components/seo/RelatedTools';
import JsonLd from '@/components/seo/JsonLd';
import { seoContent, webAppSchema, breadcrumbSchema, howToSchema, getRelatedTools } from '@/lib/seo-content';

const TOOL = 'dca' as const;

export async function generateMetadata({ params }: { params: { locale: string } }): Promise<Metadata> {
  const isEs = params.locale === 'es';
  return {
    title: isEs ? 'Calculadora DCA Crypto Gratuita 2026 — CalcFi' : 'Free DCA Crypto Calculator 2026 — CalcFi',
    description: isEs
      ? 'Calculadora DCA gratuita para crypto 2026. Calcula tu precio medio de compra, rentabilidad total y evolución de cartera con la estrategia Dollar Cost Averaging. Sin registro.'
      : 'Free DCA crypto calculator 2026. Calculate your average cost basis, total return and portfolio performance using the Dollar Cost Averaging strategy. No registration. Instant results.',
    alternates: {
      canonical: `https://calcfi.io/${params.locale}/dca`,
      languages: { en: 'https://calcfi.io/en/dca', es: 'https://calcfi.io/es/dca' },
    },
    openGraph: {
      title: isEs ? 'Calculadora DCA Crypto — CalcFi' : 'DCA Crypto Calculator — CalcFi',
      description: isEs ? 'Calcula tu precio medio y rentabilidad con la estrategia DCA.' : 'Calculate your average cost and returns with the DCA strategy.',
      url: `https://calcfi.io/${params.locale}/dca`,
      images: [{ url: 'https://calcfi.io/og-image.png', width: 1200, height: 630 }],
    },
  };
}

export default function DCAPage({ params }: { params: { locale: string } }) {
  setRequestLocale(params.locale);
  const locale = params.locale as 'en' | 'es';
  const content = seoContent[locale][TOOL];
  const related = getRelatedTools(locale, TOOL);

  return (
    <>
      <JsonLd data={webAppSchema(locale, TOOL, content.appName, content.appDescription, content.appFeatures)} />
      <JsonLd data={breadcrumbSchema(locale, TOOL, content.appName.split(' — ')[0])} />
      <JsonLd data={howToSchema(content.howToName, content.howToSteps)} />
      <DCACalculator />
      <FaqSection faqs={content.faqs} title={content.faqTitle} />
      <AboutTool title={content.aboutTitle} body={content.aboutBody} />
      <RelatedTools tools={related} title={content.relatedTitle} />
    </>
  );
}
