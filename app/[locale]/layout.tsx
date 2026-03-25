import { NextIntlClientProvider } from 'next-intl';
import { getMessages, setRequestLocale } from 'next-intl/server';
import { notFound } from 'next/navigation';
import type { Metadata } from 'next';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import '../globals.css';

const locales = ['en', 'es'];

export function generateStaticParams() {
  return locales.map((locale) => ({ locale }));
}

export async function generateMetadata({ params }: { params: { locale: string } }): Promise<Metadata> {
  const { locale } = params;
  return {
    metadataBase: new URL('https://calcfi.io'),
    openGraph: {
      type: 'website',
      locale,
      siteName: 'CalcFi',
      images: [{ url: '/og-image.png', width: 1200, height: 630, alt: 'CalcFi — Free Financial Calculators' }],
    },
    twitter: {
      card: 'summary_large_image',
      site: '@calcfi_io',
      creator: '@calcfi_io',
    },
  };
}

export default async function LocaleLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: { locale: string };
}) {
  const { locale } = params;

  if (!locales.includes(locale)) {
    notFound();
  }

  setRequestLocale(locale);

  const messages = await getMessages();

  return (
    <html lang={locale}>
      <head />
      <body className="min-h-screen flex flex-col bg-slate-50">
        <NextIntlClientProvider messages={messages}>
          <Header />
          <main className="flex-1 px-4 sm:px-6 lg:px-8 pb-8">
            {children}
          </main>
          <Footer />
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
