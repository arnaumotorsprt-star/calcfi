import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: 'CalcFi — Financial & Crypto Calculators',
  description: 'Free professional financial and crypto calculators',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return children;
}
