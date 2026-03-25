'use client';

import { useState } from 'react';
import { useTranslations } from 'next-intl';
import { calculateCompoundInterest } from '@/lib/calculations';
import GrowthChart from '@/components/charts/GrowthChart';
import AdSensePlaceholder from '@/components/layout/AdSensePlaceholder';

export default function CompoundInterestCalculator() {
  const t = useTranslations('compoundInterest');
  const tc = useTranslations('common');

  const [principal, setPrincipal] = useState('10000');
  const [rate, setRate] = useState('7');
  const [years, setYears] = useState('20');
  const [frequency, setFrequency] = useState('12');
  const [result, setResult] = useState<ReturnType<typeof calculateCompoundInterest> | null>(null);

  const fmt = (n: number) => `$${n.toLocaleString('en-US', { maximumFractionDigits: 2 })}`;

  function handleCalculate() {
    const r = calculateCompoundInterest(
      parseFloat(principal) || 0,
      parseFloat(rate) || 0,
      parseInt(years) || 0,
      parseInt(frequency) || 1
    );
    setResult(r);
  }

  function handleReset() {
    setPrincipal('10000');
    setRate('7');
    setYears('20');
    setFrequency('12');
    setResult(null);
  }

  return (
    <div className="max-w-3xl mx-auto">
      <div className="bg-white rounded-2xl shadow-sm border border-slate-200 p-6 sm:p-8">
        <h1 className="text-2xl font-bold text-slate-800 mb-6">{t('title')}</h1>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-1">{t('fields.principal')}</label>
            <input
              type="number"
              value={principal}
              onChange={(e) => setPrincipal(e.target.value)}
              className="w-full border border-slate-300 rounded-lg px-4 py-2.5 text-slate-800 focus:outline-none focus:ring-2 focus:ring-blue-500"
              min="0"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-1">{t('fields.rate')}</label>
            <input
              type="number"
              value={rate}
              onChange={(e) => setRate(e.target.value)}
              className="w-full border border-slate-300 rounded-lg px-4 py-2.5 text-slate-800 focus:outline-none focus:ring-2 focus:ring-blue-500"
              step="0.1"
              min="0"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-1">{t('fields.years')}</label>
            <input
              type="number"
              value={years}
              onChange={(e) => setYears(e.target.value)}
              className="w-full border border-slate-300 rounded-lg px-4 py-2.5 text-slate-800 focus:outline-none focus:ring-2 focus:ring-blue-500"
              min="1"
              max="100"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-1">{t('fields.frequency')}</label>
            <select
              value={frequency}
              onChange={(e) => setFrequency(e.target.value)}
              className="w-full border border-slate-300 rounded-lg px-4 py-2.5 text-slate-800 focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="1">{t('frequency.annually')}</option>
              <option value="2">{t('frequency.semiAnnually')}</option>
              <option value="4">{t('frequency.quarterly')}</option>
              <option value="12">{t('frequency.monthly')}</option>
            </select>
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
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <div className="bg-blue-600 text-white rounded-xl p-4">
                <p className="text-sm opacity-80">{t('results.finalAmount')}</p>
                <p className="text-2xl font-bold mt-1">{fmt(result.finalAmount)}</p>
              </div>
              <div className="bg-slate-50 border border-slate-200 rounded-xl p-4">
                <p className="text-sm text-slate-500">{t('results.totalInterest')}</p>
                <p className="text-lg font-bold text-emerald-600 mt-1">{fmt(result.totalInterest)}</p>
              </div>
              <div className="bg-slate-50 border border-slate-200 rounded-xl p-4">
                <p className="text-sm text-slate-500">{t('results.totalGrowth')}</p>
                <p className="text-lg font-bold text-emerald-600 mt-1">{result.totalGrowth.toFixed(1)}%</p>
              </div>
            </div>

            <GrowthChart
              data={result.data.map((d) => ({ period: d.year, value: d.balance }))}
              valueLabel={t('chart.balance')}
              title={t('chart.title')}
              xLabel={tc('year')}
            />
          </div>
        )}
      </div>

      <AdSensePlaceholder />
    </div>
  );
}
