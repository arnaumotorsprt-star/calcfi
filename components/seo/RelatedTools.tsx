import Link from 'next/link';

interface RelatedTool {
  title: string;
  href: string;
  description: string;
}

interface Props {
  tools: RelatedTool[];
  title?: string;
}

export default function RelatedTools({ tools, title = 'Related Tools' }: Props) {
  return (
    <section className="max-w-3xl mx-auto mt-8 mb-4">
      <h2 className="text-base font-semibold text-slate-700 mb-3">{title}</h2>
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
        {tools.map((tool) => (
          <Link
            key={tool.href}
            href={tool.href}
            className="bg-white border border-slate-200 rounded-xl p-4 hover:border-blue-200 hover:shadow-sm transition-all group"
          >
            <p className="text-sm font-semibold text-slate-800 group-hover:text-[#1a56db] transition-colors mb-1">
              {tool.title}
            </p>
            <p className="text-xs text-slate-500 leading-relaxed">{tool.description}</p>
          </Link>
        ))}
      </div>
    </section>
  );
}
