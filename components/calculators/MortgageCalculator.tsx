'use client';

import { useState } from 'react';
import { useTranslations } from 'next-intl';
import { calculateMortgage } from '@/lib/calculations';
import AmortizationChart from '@/components/charts/AmortizationChart';
import AdSensePlaceholder from '@/components/layout/AdSensePlaceholder';

export default function MortgageCalculator() {
  const t = useTranslations('mortgage');
  const tc = useTranslations('common');

  const [homePrice, setHomePrice] = useState('300000');
  const [downPayment, setDownPayment] = useState('60000');
  const [rate, setRate] = useState('3.5');
  const [years, setYears] = useState('30');
  const [result, setResult] = useState<ReturnType<typeof calculateMortgage> | null>(null);

  const fmt = (n: number) => `$${n.toLocaleString('en-US', { maximumFractionDigits: 2 })}`;

  function handleCalculate() {
    const r = calculateMortgage(
      parseFloat(homePrice) || 0,
      parseFloat(downPayment) || 0,
      parseFloat(rate) || 0,
      parseInt(years) || 0
    );
    setResult(r);
  }

  function handleReset() {
    setHomePrice('300000');
    setDownPayment('60000');
    setRate('3.5');
    setYears('30');
    setResult(null);
  }

  return (
    <div className="max-w-3xl mx-auto">
      <div className="bg-white rounded-2xl shadow-sm border border-slate-200 p-6 sm:p-8">
        <h1 className="text-2xl font-bold text-slate-800 mb-6">{t('title')}</h1>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-1">{t('fields.homePrice')}</label>
            <input
              type="number"
              value={homePrice}
              onChange={(e) => setHomePrice(e.target.value)}
              className="w-full border border-slate-300 rounded-lg px-4 py-2.5 text-slate-800 focus:outline-none focus:ring-2 focus:ring-blue-500"
              min="0"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-1">{t('fields.downPayment')}</label>
            <input
              type="number"
              value={downPayment}
              onChange={(e) => setDownPayment(e.target.value)}
              className="w-full border border-slate-300 rounded-lg px-4 py-2.5 text-slate-800 focus:outline-none focus:ring-2 focus:ring-blue-500"
              min="0"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-1">{t('fields.interestRate')}</label>
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
            <label className="block text-sm font-medium text-slate-700 mb-1">{t('fields.loanTerm')}</label>
            <input
              type="number"
              value={years}
              onChange={(e) => setYears(e.target.value)}
              className="w-full border border-slate-300 rounded-lg px-4 py-2.5 text-slate-800 focus:outline-none focus:ring-2 focus:ring-blue-500"
              min="1"
              max="50"
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
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
              <div className="bg-blue-600 text-white rounded-xl p-4 col-span-2 sm:col-span-1">
                <p className="text-sm opacity-80">{t('results.monthlyPayment')}</p>
                <p className="text-2xl font-bold mt-1">{fmt(result.monthly)}</p>
              </div>
              <div className="bg-slate-50 border border-slate-200 rounded-xl p-4">
                <p className="text-sm text-slate-500">{t('results.totalPayment')}</p>
                <p className="text-lg font-bold text-slate-800 mt-1">{fmt(result.total)}</p>
              </div>
              <div className="bg-slate-50 border border-slate-200 rounded-xl p-4">
                <p className="text-sm text-slate-500">{t('results.totalInterest')}</p>
                <p className="text-lg font-bold text-emerald-600 mt-1">{fmt(result.totalInterest)}</p>
              </div>
              <div className="bg-slate-50 border border-slate-200 rounded-xl p-4">
                <p className="text-sm text-slate-500">{t('results.loanAmount')}</p>
                <p className="text-lg font-bold text-slate-800 mt-1">{fmt(result.loanAmount)}</p>
              </div>
            </div>

            <AmortizationChart
              schedule={result.schedule}
              principalLabel={t('chart.principal')}
              interestLabel={t('chart.interest')}
              title={t('chart.title')}
            />
          </div>
        )}
      </div>

      <AdSensePlaceholder />
    </div>
  );
}
