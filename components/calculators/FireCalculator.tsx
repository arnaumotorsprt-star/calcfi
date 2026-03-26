'use client';

import { useState } from 'react';
import { useTranslations } from 'next-intl';
import { calculateFire } from '@/lib/calculations';
import GrowthChart from '@/components/charts/GrowthChart';
import AdSensePlaceholder from '@/components/layout/AdSensePlaceholder';

export default function FireCalculator() {
  const t = useTranslations('fire');
  const tc = useTranslations('common');

  const [currentSavings, setCurrentSavings] = useState('50000');
  const [annualSavings, setAnnualSavings] = useState('20000');
  const [annualExpenses, setAnnualExpenses] = useState('40000');
  const [withdrawalRate, setWithdrawalRate] = useState('4');
  const [expectedReturn, setExpectedReturn] = useState('7');
  const [result, setResult] = useState<ReturnType<typeof calculateFire> | null>(null);

  const fmt = (n: number) =>
    `$${n.toLocaleString('en-US', { maximumFractionDigits: 0 })}`;

  function handleCalculate() {
    const r = calculateFire(
      parseFloat(currentSavings) || 0,
      parseFloat(annualSavings) || 0,
      parseFloat(annualExpenses) || 0,
      parseFloat(withdrawalRate) || 4,
      parseFloat(expectedReturn) || 7
    );
    setResult(r);
  }

  function handleReset() {
    setCurrentSavings('50000');
    setAnnualSavings('20000');
    setAnnualExpenses('40000');
    setWithdrawalRate('4');
    setExpectedReturn('7');
    setResult(null);
  }

  return (
    <div className="max-w-3xl mx-auto">
      <div className="bg-white rounded-2xl shadow-sm border border-slate-200 p-6 sm:p-8">
        <h1 className="text-2xl font-bold text-slate-800 mb-6">{t('title')}</h1>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-1">
              {t('fields.currentSavings')}
            </label>
            <input
              type="number"
              value={currentSavings}
              onChange={(e) => setCurrentSavings(e.target.value)}
              className="w-full border border-slate-300 rounded-lg px-4 py-2.5 text-slate-800 focus:outline-none focus:ring-2 focus:ring-blue-500"
              min="0"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-1">
              {t('fields.annualSavings')}
            </label>
            <input
              type="number"
              value={annualSavings}
              onChange={(e) => setAnnualSavings(e.target.value)}
              className="w-full border border-slate-300 rounded-lg px-4 py-2.5 text-slate-800 focus:outline-none focus:ring-2 focus:ring-blue-500"
              min="0"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-1">
              {t('fields.annualExpenses')}
            </label>
            <input
              type="number"
              value={annualExpenses}
              onChange={(e) => setAnnualExpenses(e.target.value)}
              className="w-full border border-slate-300 rounded-lg px-4 py-2.5 text-slate-800 focus:outline-none focus:ring-2 focus:ring-blue-500"
              min="0"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-1">
              {t('fields.withdrawalRate')}
            </label>
            <input
              type="number"
              value={withdrawalRate}
              onChange={(e) => setWithdrawalRate(e.target.value)}
              className="w-full border border-slate-300 rounded-lg px-4 py-2.5 text-slate-800 focus:outline-none focus:ring-2 focus:ring-blue-500"
              min="0"
              step="0.1"
            />
          </div>
          <div className="sm:col-span-2">
            <label className="block text-sm font-medium text-slate-700 mb-1">
              {t('fields.expectedReturn')}
            </label>
            <input
              type="number"
              value={expectedReturn}
              onChange={(e) => setExpectedReturn(e.target.value)}
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

            {result.alreadyFire ? (
              <div className="bg-emerald-50 border border-emerald-200 rounded-xl p-4 text-emerald-700 font-semibold text-center">
                {t('alreadyFire')}
              </div>
            ) : result.yearsToFire === -1 ? (
              <div className="bg-red-50 border border-red-200 rounded-xl p-4 text-red-700 font-semibold text-center">
                {t('never')}
              </div>
            ) : (
              <>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                  <div className="bg-blue-600 text-white rounded-xl p-4">
                    <p className="text-sm opacity-80">{t('results.yearsToFire')}</p>
                    <p className="text-3xl font-bold mt-1">{result.yearsToFire}</p>
                  </div>
                  <div className="bg-slate-50 border border-slate-200 rounded-xl p-4">
                    <p className="text-sm text-slate-500">{t('results.fireNumber')}</p>
                    <p className="text-xl font-bold text-slate-800 mt-1">{fmt(result.target)}</p>
                  </div>
                  <div className="bg-slate-50 border border-slate-200 rounded-xl p-4">
                    <p className="text-sm text-slate-500">{t('results.currentProgress')}</p>
                    <p className="text-xl font-bold text-slate-800 mt-1">
                      {result.progress.toFixed(1)}%
                    </p>
                    <div className="mt-2 h-2 bg-slate-200 rounded-full overflow-hidden">
                      <div
                        className="h-full bg-blue-500 rounded-full"
                        style={{ width: `${Math.min(100, result.progress)}%` }}
                      />
                    </div>
                  </div>
                </div>

                <GrowthChart
                  data={result.data}
                  valueLabel={t('chart.portfolio')}
                  investedLabel={t('chart.target')}
                  title={t('chart.title')}
                  xLabel={tc('year')}
                />
              </>
            )}
          </div>
        )}
      </div>

      <AdSensePlaceholder />
    </div>
  );
}
