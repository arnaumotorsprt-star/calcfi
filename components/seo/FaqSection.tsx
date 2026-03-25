'use client';

import { useState } from 'react';
import JsonLd from './JsonLd';

interface Faq {
  q: string;
  a: string;
}

interface Props {
  faqs: Faq[];
  title?: string;
}

export default function FaqSection({ faqs, title = 'Frequently Asked Questions' }: Props) {
  const [open, setOpen] = useState<number | null>(null);

  const schema = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: faqs.map((faq) => ({
      '@type': 'Question',
      name: faq.q,
      acceptedAnswer: { '@type': 'Answer', text: faq.a },
    })),
  };

  return (
    <section className="max-w-3xl mx-auto mt-12">
      <JsonLd data={schema} />
      <h2 className="text-xl font-bold text-slate-900 mb-6">{title}</h2>
      <div className="space-y-3">
        {faqs.map((faq, i) => (
          <div key={i} className="bg-white border border-slate-200 rounded-xl overflow-hidden">
            <button
              className="w-full flex items-center justify-between px-5 py-4 text-left"
              onClick={() => setOpen(open === i ? null : i)}
            >
              <span className="text-sm font-semibold text-slate-800 pr-4">{faq.q}</span>
              <svg
                className={`w-4 h-4 text-slate-400 shrink-0 transition-transform ${open === i ? 'rotate-180' : ''}`}
                fill="none" stroke="currentColor" viewBox="0 0 24 24"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
              </svg>
            </button>
            {open === i && (
              <div className="px-5 pb-4 text-sm text-slate-600 leading-relaxed border-t border-slate-100 pt-3">
                {faq.a}
              </div>
            )}
          </div>
        ))}
      </div>
    </section>
  );
}
