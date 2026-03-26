'use client';

import { useState } from 'react';
import { useTranslations } from 'next-intl';
import { calculateSavingsGoal } from '@/lib/calculations';
import GrowthChart from '@/components/charts/GrowthChart';
import AdSensePlaceholder from '@/components/layout/AdSensePlaceholder';

export default function SavingsCalculator() {
  const t = useTranslations('savings');
  const tc = useTranslations('common');

  const [goal, setGoal] = useState('10000');
  const [months, setMonths] = useState('24');
  const [rate, setRate] = useState('3');
  const [result, setResult] = useState<ReturnType<typeof calculateSavingsGoal> | null>(null);

  const fmt = (n: number) =>
    `$${n.toLocaleString('en-US', { maximumFractionDigits: 2 })}`;

  function handleCalculate() {
    const r = calculateSavingsGoal(
      parseFloat(goal) || 0,
      parseInt(months) || 1,
      parseFloat(rate) || 0
    );
    setResult(r);
  }

  function handleReset() {
    setGoal('10000');
    setMonths('24');
    setRate('3');
    setResult(null);
  }

  return (
    <div className="max-w-3xl mx-auto">
      <div className="bg-white rounded-2xl shadow-sm border border-slate-200 p-6 sm:p-8">
        <h1 className="text-2xl font-bold text-slate-800 mb-6">{t('title')}</h1>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-1">
              {t('fields.goal')}
            </label>
            <input
              type="number"
              value={goal}
              onChange={(e) => setGoal(e.target.value)}
              className="w-full border border-slate-300 rounded-lg px-4 py-2.5 text-slate-800 focus:outline-none focus:ring-2 focus:ring-blue-500"
              min="0"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-1">
              {t('fields.months')}
            </label>
            <input
              type="number"
              value={months}
              onChange={(e) => setMonths(e.target.value)}
              className="w-full border border-slate-300 rounded-lg px-4 py-2.5 text-slate-800 focus:outline-none focus:ring-2 focus:ring-blue-500"
              min="1"
            />
          </div>
          <div className="sm:col-span-2">
            <label className="block text-sm font-medium text-slate-700 mb-1">
              {t('fields.rate')}
            </label>
            <input
              type="number"
              value={rate}
              onChange={(e) => setRate(e.target.value)}
              className="w-full border border-slate-300 rounded-lg px-4 py-2.5 text-slate-800 focus:outline-none focus:ring-2 focus:ring-blue-500"
              min="0"
              step="0.1"
            />
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
                <p className="text-sm opacity-80">{t('results.monthlyNeeded')}</p>
                <p className="text-2xl font-bold mt-1">{fmt(result.monthlyNeeded)}</p>
              </div>
              <div className="bg-slate-50 border border-slate-200 rounded-xl p-4">
                <p className="text-sm text-slate-500">{t('results.totalSaved')}</p>
                <p className="text-xl font-bold text-slate-800 mt-1">{fmt(result.totalContributed)}</p>
              </div>
              <div className="bg-emerald-50 border border-emerald-200 rounded-xl p-4">
                <p className="text-sm text-emerald-600">{t('results.interestEarned')}</p>
                <p className="text-xl font-bold text-emerald-700 mt-1">{fmt(result.interestEarned)}</p>
              </div>
            </div>

            <GrowthChart
              data={result.data}
              valueLabel={t('chart.savings')}
              investedLabel={t('chart.contributions')}
              title={t('chart.title')}
              xLabel="Month"
            />
          </div>
        )}
      </div>

      <AdSensePlaceholder />
    </div>
  );
}
