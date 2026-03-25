import { setRequestLocale } from 'next-intl/server';
import type { Metadata } from 'next';

export async function generateMetadata({ params }: { params: { locale: string } }): Promise<Metadata> {
  const isEs = params.locale === 'es';
  return {
    title: isEs ? 'Política de Privacidad — CalcFi' : 'Privacy Policy — CalcFi',
    description: isEs
      ? 'Política de privacidad de CalcFi. Cómo manejamos tus datos, qué información recopilamos y cómo protegemos tu privacidad.'
      : 'CalcFi privacy policy. How we handle your data, what information we collect, and how we protect your privacy.',
    alternates: {
      canonical: `https://calcfi.io/${params.locale}/privacy`,
      languages: { en: 'https://calcfi.io/en/privacy', es: 'https://calcfi.io/es/privacy' },
    },
  };
}

export default function PrivacyPage({ params }: { params: { locale: string } }) {
  setRequestLocale(params.locale);
  const isEs = params.locale === 'es';

  const sections = isEs ? [
    {
      title: '1. Información que recopilamos',
      content: 'CalcFi no requiere registro ni cuenta de usuario. No recopilamos nombre, email, dirección ni ningún dato personal identificable para el uso de las calculadoras. Todas las calculadoras funcionan íntegramente en tu navegador.',
    },
    {
      title: '2. Datos de uso',
      content: 'Podemos recopilar datos de uso anónimos y agregados (páginas visitadas, duración de sesión) mediante herramientas de analítica web estándar. Estos datos no permiten identificarte personalmente.',
    },
    {
      title: '3. Asesor Financiero IA',
      content: 'Las conversaciones con el Asesor Financiero IA son procesadas por la API de Claude de Anthropic. CalcFi no almacena el historial de conversaciones en sus servidores. Cada sesión comienza desde cero. Consulta la política de privacidad de Anthropic para más detalles sobre el procesamiento de datos de la API.',
    },
    {
      title: '4. Cookies',
      content: 'CalcFi puede usar cookies técnicas esenciales para el funcionamiento del sitio. No usamos cookies de seguimiento publicitario de terceros.',
    },
    {
      title: '5. Servicios de terceros',
      content: 'CalcFi puede incluir publicidad de Google AdSense. Google puede usar cookies para mostrar anuncios relevantes. Consulta la política de privacidad de Google para más información.',
    },
    {
      title: '6. Tus derechos',
      content: 'Dado que no recopilamos datos personales identificables, no hay datos que solicitar, rectificar o eliminar para el uso estándar de las calculadoras. Para cualquier consulta, contacta con nosotros en hello@calcfi.io.',
    },
    {
      title: '7. Cambios en esta política',
      content: 'Podemos actualizar esta política de privacidad ocasionalmente. Los cambios significativos serán comunicados en el sitio web. El uso continuado de CalcFi implica la aceptación de la política vigente.',
    },
  ] : [
    {
      title: '1. Information We Collect',
      content: 'CalcFi does not require registration or user accounts. We do not collect names, email addresses, physical addresses, or any personally identifiable information to use the calculators. All calculators run entirely in your browser.',
    },
    {
      title: '2. Usage Data',
      content: 'We may collect anonymous, aggregated usage data (pages visited, session duration) through standard web analytics tools. This data cannot be used to identify you personally.',
    },
    {
      title: '3. Financial Advisor AI',
      content: 'Conversations with the Financial Advisor AI are processed through the Anthropic Claude API. CalcFi does not store conversation history on its servers. Each session starts fresh. Please review Anthropic\'s privacy policy for details on their API data processing.',
    },
    {
      title: '4. Cookies',
      content: 'CalcFi may use essential technical cookies required for site functionality. We do not use third-party advertising tracking cookies.',
    },
    {
      title: '5. Third-Party Services',
      content: 'CalcFi may include advertising from Google AdSense. Google may use cookies to display relevant ads. Please review Google\'s privacy policy for more information.',
    },
    {
      title: '6. Your Rights',
      content: 'Since we do not collect personally identifiable data, there is no personal data to request, rectify, or delete for standard calculator use. For any inquiries, contact us at hello@calcfi.io.',
    },
    {
      title: '7. Changes to This Policy',
      content: 'We may update this privacy policy occasionally. Significant changes will be communicated on the website. Continued use of CalcFi implies acceptance of the current policy.',
    },
  ];

  return (
    <div className="max-w-3xl mx-auto py-8">
      <h1 className="text-3xl font-extrabold text-slate-900 mb-2">
        {isEs ? 'Política de Privacidad' : 'Privacy Policy'}
      </h1>
      <p className="text-sm text-slate-400 mb-8">
        {isEs ? 'Última actualización: enero 2026' : 'Last updated: January 2026'}
      </p>

      <div className="space-y-6">
        {sections.map((section) => (
          <div key={section.title} className="bg-white border border-slate-200 rounded-2xl p-6">
            <h2 className="text-base font-bold text-slate-900 mb-3">{section.title}</h2>
            <p className="text-sm text-slate-600 leading-relaxed">{section.content}</p>
          </div>
        ))}
      </div>

      <p className="text-xs text-slate-400 text-center mt-8">
        {isEs ? 'Contacto: hello@calcfi.io' : 'Contact: hello@calcfi.io'}
      </p>
    </div>
  );
}
