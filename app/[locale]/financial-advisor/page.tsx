import { setRequestLocale } from 'next-intl/server';
import type { Metadata } from 'next';
import FinancialAdvisorAI from '@/components/calculators/FinancialAdvisorAI';
import FaqSection from '@/components/seo/FaqSection';
import AboutTool from '@/components/seo/AboutTool';
import RelatedTools from '@/components/seo/RelatedTools';
import JsonLd from '@/components/seo/JsonLd';
import { seoContent, webAppSchema, breadcrumbSchema, howToSchema, getRelatedTools } from '@/lib/seo-content';

const TOOL = 'financial-advisor' as const;

export async function generateMetadata({ params }: { params: { locale: string } }): Promise<Metadata> {
  const isEs = params.locale === 'es';
  return {
    title: isEs ? 'Asesor Financiero IA Gratis 2026 — CalcFi' : 'Free AI Financial Advisor 2026 — CalcFi',
    description: isEs
      ? 'Asesor financiero IA gratuito 2026 impulsado por Claude AI. Respuestas instantáneas sobre hipotecas, inversiones, crypto y finanzas personales en español e inglés. Sin registro.'
      : 'Free AI financial advisor 2026 powered by Claude AI. Get instant answers about mortgages, investments, crypto and personal finance in English and Spanish. No registration required.',
    alternates: {
      canonical: `https://calcfi.io/${params.locale}/financial-advisor`,
      languages: { en: 'https://calcfi.io/en/financial-advisor', es: 'https://calcfi.io/es/financial-advisor' },
    },
    openGraph: {
      title: isEs ? 'Asesor Financiero IA — CalcFi' : 'AI Financial Advisor — CalcFi',
      description: isEs ? 'Respuestas instantáneas a tus preguntas financieras con IA.' : 'Instant AI-powered answers to your financial questions.',
      url: `https://calcfi.io/${params.locale}/financial-advisor`,
      images: [{ url: 'https://calcfi.io/og-image.png', width: 1200, height: 630 }],
    },
  };
}

export default function FinancialAdvisorPage({ params }: { params: { locale: string } }) {
  setRequestLocale(params.locale);
  const locale = params.locale as 'en' | 'es';
  const content = seoContent[locale][TOOL];
  const related = getRelatedTools(locale, TOOL);

  return (
    <>
      <JsonLd data={webAppSchema(locale, TOOL, content.appName, content.appDescription, content.appFeatures, true)} />
      <JsonLd data={breadcrumbSchema(locale, TOOL, content.appName.split(' — ')[0])} />
      <JsonLd data={howToSchema(content.howToName, content.howToSteps)} />
      <FinancialAdvisorAI />
      <FaqSection faqs={content.faqs} title={content.faqTitle} />
      <AboutTool title={content.aboutTitle} body={content.aboutBody} />
      <RelatedTools tools={related} title={content.relatedTitle} />
    </>
  );
}
