'use client';

export default function AdSensePlaceholder() {
  return (
    <div className="w-full flex justify-center my-6">
      <div
        className="bg-slate-100 border border-dashed border-slate-300 rounded-lg flex items-center justify-center text-slate-400 text-sm font-medium"
        style={{ width: '100%', maxWidth: 728, height: 90 }}
        data-ad-client="ca-pub-XXXXXXXX"
        data-ad-slot="XXXXXXXXXX"
      >
        Advertisement
      </div>
    </div>
  );
}
