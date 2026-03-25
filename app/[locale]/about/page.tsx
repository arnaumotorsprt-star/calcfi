import { setRequestLocale } from 'next-intl/server';
import type { Metadata } from 'next';
import JsonLd from '@/components/seo/JsonLd';

export async function generateMetadata({ params }: { params: { locale: string } }): Promise<Metadata> {
  const isEs = params.locale === 'es';
  return {
    title: isEs ? 'Sobre CalcFi — Calculadoras Financieras Gratuitas' : 'About CalcFi — Free Financial Calculators',
    description: isEs
      ? 'CalcFi ofrece calculadoras financieras y crypto gratuitas en español e inglés. Metodología de cálculo, fórmulas usadas y por qué puedes confiar en nuestros resultados.'
      : 'CalcFi provides free financial and crypto calculators in English and Spanish. Learn about our calculation methodology, formulas used, and why you can trust our results.',
    alternates: {
      canonical: `https://calcfi.io/${params.locale}/about`,
      languages: { en: 'https://calcfi.io/en/about', es: 'https://calcfi.io/es/about' },
    },
  };
}

export default function AboutPage({ params }: { params: { locale: string } }) {
  setRequestLocale(params.locale);
  const isEs = params.locale === 'es';

  const orgSchema = {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    name: 'CalcFi',
    url: 'https://calcfi.io',
    description: 'Free financial and crypto calculators in English and Spanish.',
    foundingDate: '2026',
    knowsAbout: ['Mortgage Calculator', 'Compound Interest', 'Loan Calculator', 'Bitcoin', 'DCA', 'Personal Finance'],
  };

  return (
    <>
      <JsonLd data={orgSchema} />
      <div className="max-w-3xl mx-auto py-8">
        <h1 className="text-3xl font-extrabold text-slate-900 mb-8">
          {isEs ? 'Sobre CalcFi' : 'About CalcFi'}
        </h1>

        <section className="bg-white border border-slate-200 rounded-2xl p-6 sm:p-8 mb-6">
          <h2 className="text-xl font-bold text-slate-900 mb-4">
            {isEs ? '¿Qué es CalcFi?' : 'What is CalcFi?'}
          </h2>
          <p className="text-sm text-slate-600 leading-relaxed mb-3">
            {isEs
              ? 'CalcFi es un conjunto de calculadoras financieras y crypto gratuitas disponibles en inglés y español. Nuestra misión es hacer que las herramientas financieras profesionales sean accesibles para todos, sin necesidad de registro ni suscripción.'
              : 'CalcFi is a collection of free financial and crypto calculators available in English and Spanish. Our mission is to make professional financial tools accessible to everyone, with no registration or subscription required.'}
          </p>
          <p className="text-sm text-slate-600 leading-relaxed">
            {isEs
              ? 'Todas las calculadoras funcionan íntegramente en tu navegador. Ningún dato personal es enviado a nuestros servidores. Los cálculos son instantáneos y precisos.'
              : 'All calculators run entirely in your browser. No personal data is sent to our servers. Calculations are instant and accurate.'}
          </p>
        </section>

        <section className="bg-white border border-slate-200 rounded-2xl p-6 sm:p-8 mb-6">
          <h2 className="text-xl font-bold text-slate-900 mb-4">
            {isEs ? 'Metodología y fiabilidad' : 'Methodology & Reliability'}
          </h2>
          <p className="text-sm text-slate-600 leading-relaxed mb-3">
            {isEs
              ? 'Todas nuestras calculadoras utilizan fórmulas matemáticas estándar empleadas por bancos e instituciones financieras a nivel mundial. No inventamos métodos propios ni hacemos estimaciones — aplicamos las fórmulas exactas.'
              : 'All our calculators use standard mathematical formulas used by banks and financial institutions worldwide. We do not invent proprietary methods or make estimates — we apply the exact formulas.'}
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-5">
            {[
              { label: isEs ? 'Hipoteca y Préstamo' : 'Mortgage & Loan', formula: 'PMT = P × [r(1+r)^n] / [(1+r)^n − 1]' },
              { label: isEs ? 'Interés Compuesto' : 'Compound Interest', formula: 'A = P(1 + r/n)^(nt)' },
              { label: isEs ? 'Beneficio Bitcoin' : 'Bitcoin Profit', formula: '(Sell − Buy) × BTC − Fees' },
              { label: 'DCA', formula: 'Avg Cost = Total Invested ÷ Total BTC' },
            ].map((item) => (
              <div key={item.label} className="bg-slate-50 rounded-xl p-4">
                <p className="text-xs font-semibold text-slate-700 mb-1">{item.label}</p>
                <code className="text-xs text-blue-700 font-mono">{item.formula}</code>
              </div>
            ))}
          </div>
        </section>

        <section className="bg-white border border-slate-200 rounded-2xl p-6 sm:p-8 mb-6">
          <h2 className="text-xl font-bold text-slate-900 mb-4">
            {isEs ? 'Asesor Financiero IA' : 'Financial Advisor AI'}
          </h2>
          <p className="text-sm text-slate-600 leading-relaxed mb-3">
            {isEs
              ? 'El Asesor Financiero IA está impulsado por Claude de Anthropic (modelo claude-haiku-4-5-20251001). Proporciona orientación educativa sobre finanzas personales, hipotecas, inversiones y crypto en español e inglés.'
              : 'The Financial Advisor AI is powered by Anthropic\'s Claude (model claude-haiku-4-5-20251001). It provides educational guidance on personal finance, mortgages, investments and crypto in English and Spanish.'}
          </p>
          <div className="bg-amber-50 border border-amber-200 rounded-xl p-4 text-sm text-amber-800">
            {isEs
              ? '⚠️ El asesor IA es solo para fines educativos. No es un asesor financiero homologado. Para decisiones de inversión importantes, consulta siempre con un profesional certificado.'
              : '⚠️ The AI advisor is for educational purposes only. It is not a licensed financial advisor. For important investment decisions, always consult a certified professional.'}
          </div>
        </section>

        <section className="bg-white border border-slate-200 rounded-2xl p-6 sm:p-8">
          <h2 className="text-xl font-bold text-slate-900 mb-4">
            {isEs ? '¿Por qué confiar en CalcFi?' : 'Why trust CalcFi?'}
          </h2>
          <ul className="space-y-3">
            {(isEs ? [
              'Fórmulas estándar usadas por la banca mundial',
              'Sin registro ni datos personales requeridos',
              'Cálculos íntegramente en tu navegador',
              'Disponible en español e inglés',
              'Actualizado para 2026',
              'Sin anuncios intrusivos en las herramientas',
            ] : [
              'Standard formulas used by global banking institutions',
              'No registration or personal data required',
              'All calculations run in your browser',
              'Available in English and Spanish',
              'Updated for 2026',
              'No intrusive ads on tool pages',
            ]).map((item) => (
              <li key={item} className="flex items-start gap-3 text-sm text-slate-600">
                <span className="w-5 h-5 rounded-full bg-emerald-50 text-emerald-600 flex items-center justify-center shrink-0 mt-0.5">
                  <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                  </svg>
                </span>
                {item}
              </li>
            ))}
          </ul>
        </section>
      </div>
    </>
  );
}
