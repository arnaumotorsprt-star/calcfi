interface Props {
  title: string;
  body: string[];
}

export default function AboutTool({ title, body }: Props) {
  return (
    <section className="max-w-3xl mx-auto mt-12 bg-white border border-slate-200 rounded-2xl p-6 sm:p-8">
      <h2 className="text-xl font-bold text-slate-900 mb-4">{title}</h2>
      {body.map((paragraph, i) => (
        <p key={i} className="text-sm text-slate-600 leading-relaxed mb-3 last:mb-0">
          {paragraph}
        </p>
      ))}
      <ul className="mt-5 grid grid-cols-2 gap-2">
        {['No registration required', 'Available in English & Spanish', 'Updated for 2026', 'Mobile-friendly'].map((item) => (
          <li key={item} className="flex items-center gap-2 text-xs text-slate-600">
            <span className="w-4 h-4 rounded-full bg-emerald-50 text-emerald-600 flex items-center justify-center shrink-0">
              <svg className="w-2.5 h-2.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
              </svg>
            </span>
            {item}
          </li>
        ))}
      </ul>
    </section>
  );
}
