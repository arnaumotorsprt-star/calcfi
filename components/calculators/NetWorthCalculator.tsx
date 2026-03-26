'use client';

import { useState } from 'react';
import { useTranslations } from 'next-intl';
import { calculateNetWorth } from '@/lib/calculations';
import AdSensePlaceholder from '@/components/layout/AdSensePlaceholder';

type Assets = { home: string; car: string; savings: string; investments: string; other: string };
type Liabilities = { mortgage: string; loans: string; creditCard: string; other: string };

const defaultAssets: Assets = { home: '300000', car: '15000', savings: '20000', investments: '30000', other: '0' };
const defaultLiabilities: Liabilities = { mortgage: '200000', loans: '10000', creditCard: '2000', other: '0' };

export default function NetWorthCalculator() {
  const t = useTranslations('netWorth');
  const tc = useTranslations('common');

  const [assets, setAssets] = useState<Assets>(defaultAssets);
  const [liabilities, setLiabilities] = useState<Liabilities>(defaultLiabilities);
  const [result, setResult] = useState<ReturnType<typeof calculateNetWorth> | null>(null);

  const fmt = (n: number) =>
    `$${Math.abs(n).toLocaleString('en-US', { maximumFractionDigits: 0 })}`;

  function handleCalculate() {
    const numAssets = {
      home: parseFloat(assets.home) || 0,
      car: parseFloat(assets.car) || 0,
      savings: parseFloat(assets.savings) || 0,
      investments: parseFloat(assets.investments) || 0,
      other: parseFloat(assets.other) || 0,
    };
    const numLiabilities = {
      mortgage: parseFloat(liabilities.mortgage) || 0,
      loans: parseFloat(liabilities.loans) || 0,
      creditCard: parseFloat(liabilities.creditCard) || 0,
      other: parseFloat(liabilities.other) || 0,
    };
    setResult(calculateNetWorth(numAssets, numLiabilities));
  }

  function handleReset() {
    setAssets(defaultAssets);
    setLiabilities(defaultLiabilities);
    setResult(null);
  }

  const inputClass = 'w-full border border-slate-300 rounded-lg px-4 py-2.5 text-slate-800 focus:outline-none focus:ring-2 focus:ring-blue-500';

  return (
    <div className="max-w-3xl mx-auto">
      <div className="bg-white rounded-2xl shadow-sm border border-slate-200 p-6 sm:p-8">
        <h1 className="text-2xl font-bold text-slate-800 mb-6">{t('title')}</h1>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
          {/* Assets */}
          <div>
            <p className="text-sm font-semibold text-blue-600 uppercase tracking-wider mb-3">
              {t('assets.title')}
            </p>
            <div className="space-y-3">
              {(Object.keys(defaultAssets) as (keyof Assets)[]).map((key) => (
                <div key={key}>
                  <label className="block text-sm font-medium text-slate-700 mb-1">
                    {t(`assets.${key}`)}
                  </label>
                  <input
                    type="number"
                    value={assets[key]}
                    onChange={(e) => setAssets((prev) => ({ ...prev, [key]: e.target.value }))}
                    className={inputClass}
                    min="0"
                  />
                </div>
              ))}
            </div>
          </div>

          {/* Liabilities */}
          <div>
            <p className="text-sm font-semibold text-red-500 uppercase tracking-wider mb-3">
              {t('liabilities.title')}
            </p>
            <div className="space-y-3">
              {(Object.keys(defaultLiabilities) as (keyof Liabilities)[]).map((key) => (
                <div key={key}>
                  <label className="block text-sm font-medium text-slate-700 mb-1">
                    {t(`liabilities.${key}`)}
                  </label>
                  <input
                    type="number"
                    value={liabilities[key]}
                    onChange={(e) => setLiabilities((prev) => ({ ...prev, [key]: e.target.value }))}
                    className={inputClass}
                    min="0"
                  />
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="flex gap-3 mt-6">
          <button
            onClick={handleCalculate}
            className="flex-1 bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 rounded-xl transition-colors"
          >
            {tc('calculate')}
          </button>
          <button
            onClick={handleReset}
            className="px-6 bg-slate-100 hover:bg-slate-200 text-slate-700 font-medium py-3 rounded-xl transition-colors"
          >
            {tc('reset')}
          </button>
        </div>

        {result && (
          <div className="mt-8">
            <h2 className="text-lg font-semibold text-slate-700 mb-4">{tc('results')}</h2>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
              <div className="bg-blue-50 border border-blue-200 rounded-xl p-4">
                <p className="text-xs text-blue-600">{t('results.totalAssets')}</p>
                <p className="text-lg font-bold text-blue-700 mt-1">{fmt(result.totalAssets)}</p>
              </div>
              <div className="bg-red-50 border border-red-200 rounded-xl p-4">
                <p className="text-xs text-red-600">{t('results.totalLiabilities')}</p>
                <p className="text-lg font-bold text-red-700 mt-1">{fmt(result.totalLiabilities)}</p>
              </div>
              <div
                className={`rounded-xl p-4 col-span-2 ${
                  result.netWorth >= 0
                    ? 'bg-emerald-600 text-white'
                    : 'bg-red-600 text-white'
                }`}
              >
                <p className="text-sm opacity-80">{t('results.netWorth')}</p>
                <p className="text-2xl font-bold mt-1">
                  {result.netWorth < 0 ? '-' : ''}{fmt(result.netWorth)}
                </p>
                <p className="text-xs opacity-70 mt-1">
                  {result.netWorth >= 0 ? t('positive') : t('negative')}
                </p>
              </div>
              {result.ratio !== null && (
                <div className="bg-slate-50 border border-slate-200 rounded-xl p-4 col-span-2 sm:col-span-4">
                  <p className="text-sm text-slate-500">{t('results.ratio')}</p>
                  <p className="text-xl font-bold text-slate-800 mt-1">
                    {result.ratio.toFixed(2)}x
                  </p>
                </div>
              )}
            </div>
          </div>
        )}
      </div>

      <AdSensePlaceholder />
    </div>
  );
}
