import { setRequestLocale } from 'next-intl/server';
import type { Metadata } from 'next';
import LoanCalculator from '@/components/calculators/LoanCalculator';
import FaqSection from '@/components/seo/FaqSection';
import AboutTool from '@/components/seo/AboutTool';
import RelatedTools from '@/components/seo/RelatedTools';
import JsonLd from '@/components/seo/JsonLd';
import { seoContent, webAppSchema, breadcrumbSchema, howToSchema, getRelatedTools } from '@/lib/seo-content';

const TOOL = 'loan' as const;

export async function generateMetadata({ params }: { params: { locale: string } }): Promise<Metadata> {
  const isEs = params.locale === 'es';
  return {
    title: isEs ? 'Calculadora de Préstamo Gratuita 2026 — CalcFi' : 'Free Loan Calculator 2026 — CalcFi',
    description: isEs
      ? 'Calculadora de préstamos gratuita 2026. Calcula tu cuota mensual, total a pagar e intereses para cualquier préstamo personal o de coche. Sin registro. Resultados instantáneos.'
      : 'Free loan calculator 2026. Calculate monthly payment, total cost and interest for any personal or auto loan. No registration required. Instant results using standard amortization formula.',
    alternates: {
      canonical: `https://calcfi.io/${params.locale}/loan`,
      languages: { en: 'https://calcfi.io/en/loan', es: 'https://calcfi.io/es/loan' },
    },
    openGraph: {
      title: isEs ? 'Calculadora de Préstamo — CalcFi' : 'Loan Calculator — CalcFi',
      description: isEs ? 'Calcula tu cuota mensual e intereses de cualquier préstamo.' : 'Calculate monthly payment and total interest for any loan.',
      url: `https://calcfi.io/${params.locale}/loan`,
      images: [{ url: 'https://calcfi.io/og-image.png', width: 1200, height: 630 }],
    },
  };
}

export default function LoanPage({ params }: { params: { locale: string } }) {
  setRequestLocale(params.locale);
  const locale = params.locale as 'en' | 'es';
  const content = seoContent[locale][TOOL];
  const related = getRelatedTools(locale, TOOL);

  return (
    <>
      <JsonLd data={webAppSchema(locale, TOOL, content.appName, content.appDescription, content.appFeatures)} />
      <JsonLd data={breadcrumbSchema(locale, TOOL, content.appName.split(' — ')[0])} />
      <JsonLd data={howToSchema(content.howToName, content.howToSteps)} />
      <LoanCalculator />
      <FaqSection faqs={content.faqs} title={content.faqTitle} />
      <AboutTool title={content.aboutTitle} body={content.aboutBody} />
      <RelatedTools tools={related} title={content.relatedTitle} />
    </>
  );
}
