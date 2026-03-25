import { setRequestLocale } from 'next-intl/server';
import type { Metadata } from 'next';
import BitcoinProfitCalculator from '@/components/calculators/BitcoinProfitCalculator';
import FaqSection from '@/components/seo/FaqSection';
import AboutTool from '@/components/seo/AboutTool';
import RelatedTools from '@/components/seo/RelatedTools';
import JsonLd from '@/components/seo/JsonLd';
import { seoContent, webAppSchema, breadcrumbSchema, howToSchema, getRelatedTools } from '@/lib/seo-content';

const TOOL = 'bitcoin-profit' as const;

export async function generateMetadata({ params }: { params: { locale: string } }): Promise<Metadata> {
  const isEs = params.locale === 'es';
  return {
    title: isEs ? 'Calculadora de Beneficio Bitcoin Gratuita 2026 — CalcFi' : 'Free Bitcoin Profit Calculator 2026 — CalcFi',
    description: isEs
      ? 'Calculadora de beneficio Bitcoin gratuita 2026. Calcula tu ganancia, pérdida y ROI en trading de crypto al instante. Incluye comisiones. Sin registro. Resultados inmediatos.'
      : 'Free Bitcoin profit calculator 2026. Calculate your crypto trading profit, loss and ROI instantly. Includes trading fees. No registration required. Works for any cryptocurrency trade.',
    alternates: {
      canonical: `https://calcfi.io/${params.locale}/bitcoin-profit`,
      languages: { en: 'https://calcfi.io/en/bitcoin-profit', es: 'https://calcfi.io/es/bitcoin-profit' },
    },
    openGraph: {
      title: isEs ? 'Calculadora Beneficio Bitcoin — CalcFi' : 'Bitcoin Profit Calculator — CalcFi',
      description: isEs ? 'Calcula tu ganancia o pérdida en trading de Bitcoin.' : 'Calculate your Bitcoin trading profit or loss instantly.',
      url: `https://calcfi.io/${params.locale}/bitcoin-profit`,
      images: [{ url: 'https://calcfi.io/og-image.png', width: 1200, height: 630 }],
    },
  };
}

export default function BitcoinProfitPage({ params }: { params: { locale: string } }) {
  setRequestLocale(params.locale);
  const locale = params.locale as 'en' | 'es';
  const content = seoContent[locale][TOOL];
  const related = getRelatedTools(locale, TOOL);

  return (
    <>
      <JsonLd data={webAppSchema(locale, TOOL, content.appName, content.appDescription, content.appFeatures)} />
      <JsonLd data={breadcrumbSchema(locale, TOOL, content.appName.split(' — ')[0])} />
      <JsonLd data={howToSchema(content.howToName, content.howToSteps)} />
      <BitcoinProfitCalculator />
      <FaqSection faqs={content.faqs} title={content.faqTitle} />
      <AboutTool title={content.aboutTitle} body={content.aboutBody} />
      <RelatedTools tools={related} title={content.relatedTitle} />
    </>
  );
}
