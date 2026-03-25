'use client';

import { useState } from 'react';
import { useTranslations } from 'next-intl';
import { calculateLoan } from '@/lib/calculations';
import AdSensePlaceholder from '@/components/layout/AdSensePlaceholder';

export default function LoanCalculator() {
  const t = useTranslations('loan');
  const tc = useTranslations('common');

  const [amount, setAmount] = useState('15000');
  const [rate, setRate] = useState('6');
  const [term, setTerm] = useState('60');
  const [result, setResult] = useState<ReturnType<typeof calculateLoan> | null>(null);

  const fmt = (n: number) => `$${n.toLocaleString('en-US', { maximumFractionDigits: 2 })}`;

  function handleCalculate() {
    const r = calculateLoan(
      parseFloat(amount) || 0,
      parseFloat(rate) || 0,
      parseInt(term) || 0
    );
    setResult(r);
  }

  function handleReset() {
    setAmount('15000');
    setRate('6');
    setTerm('60');
    setResult(null);
  }

  return (
    <div className="max-w-3xl mx-auto">
      <div className="bg-white rounded-2xl shadow-sm border border-slate-200 p-6 sm:p-8">
        <h1 className="text-2xl font-bold text-slate-800 mb-6">{t('title')}</h1>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-1">{t('fields.amount')}</label>
            <input
              type="number"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
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
            <label className="block text-sm font-medium text-slate-700 mb-1">{t('fields.term')}</label>
            <input
              type="number"
              value={term}
              onChange={(e) => setTerm(e.target.value)}
              className="w-full border border-slate-300 rounded-lg px-4 py-2.5 text-slate-800 focus:outline-none focus:ring-2 focus:ring-blue-500"
              min="1"
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
            </div>
          </div>
        )}
      </div>

      <AdSensePlaceholder />
    </div>
  );
}
