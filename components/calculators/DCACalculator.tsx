'use client';

import { useState } from 'react';
import { useTranslations } from 'next-intl';
import { calculateDCA } from '@/lib/calculations';
import GrowthChart from '@/components/charts/GrowthChart';
import AdSensePlaceholder from '@/components/layout/AdSensePlaceholder';

export default function DCACalculator() {
  const t = useTranslations('dca');
  const tc = useTranslations('common');

  const [amount, setAmount] = useState('100');
  const [periods, setPeriods] = useState('24');
  const [startPrice, setStartPrice] = useState('20000');
  const [endPrice, setEndPrice] = useState('50000');
  const [result, setResult] = useState<ReturnType<typeof calculateDCA> | null>(null);

  const fmt = (n: number) => `$${n.toLocaleString('en-US', { maximumFractionDigits: 2 })}`;
  const fmtBtc = (n: number) => n.toFixed(6);
  const isProfit = result && result.finalValue >= result.totalInvested;

  function handleCalculate() {
    const r = calculateDCA(
      parseFloat(amount) || 0,
      parseInt(periods) || 0,
      parseFloat(startPrice) || 0,
      parseFloat(endPrice) || 0
    );
    setResult(r);
  }

  function handleReset() {
    setAmount('100');
    setPeriods('24');
    setStartPrice('20000');
    setEndPrice('50000');
    setResult(null);
  }

  return (
    <div className="max-w-3xl mx-auto">
      <div className="bg-white rounded-2xl shadow-sm border border-slate-200 p-6 sm:p-8">
        <h1 className="text-2xl font-bold text-slate-800 mb-6">{t('title')}</h1>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
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
            <label className="block text-sm font-medium text-slate-700 mb-1">{t('fields.periods')}</label>
            <input
              type="number"
              value={periods}
              onChange={(e) => setPeriods(e.target.value)}
              className="w-full border border-slate-300 rounded-lg px-4 py-2.5 text-slate-800 focus:outline-none focus:ring-2 focus:ring-blue-500"
              min="2"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-1">{t('fields.startPrice')}</label>
            <input
              type="number"
              value={startPrice}
              onChange={(e) => setStartPrice(e.target.value)}
              className="w-full border border-slate-300 rounded-lg px-4 py-2.5 text-slate-800 focus:outline-none focus:ring-2 focus:ring-blue-500"
              min="0"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-1">{t('fields.endPrice')}</label>
            <input
              type="number"
              value={endPrice}
              onChange={(e) => setEndPrice(e.target.value)}
              className="w-full border border-slate-300 rounded-lg px-4 py-2.5 text-slate-800 focus:outline-none focus:ring-2 focus:ring-blue-500"
              min="0"
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
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
              <div className={`rounded-xl p-4 col-span-2 ${isProfit ? 'bg-emerald-500' : 'bg-red-500'} text-white`}>
                <p className="text-sm opacity-80">{t('results.finalValue')}</p>
                <p className="text-2xl font-bold mt-1">{fmt(result.finalValue)}</p>
                <p className="text-sm opacity-80 mt-1">
                  {t('results.totalReturn')}: {result.totalReturn.toFixed(2)}%
                </p>
              </div>
              <div className="bg-slate-50 border border-slate-200 rounded-xl p-4">
                <p className="text-sm text-slate-500">{t('results.totalInvested')}</p>
                <p className="text-lg font-bold text-slate-800 mt-1">{fmt(result.totalInvested)}</p>
              </div>
              <div className="bg-slate-50 border border-slate-200 rounded-xl p-4">
                <p className="text-sm text-slate-500">{t('results.avgPrice')}</p>
                <p className="text-lg font-bold text-blue-600 mt-1">{fmt(result.avgPrice)}</p>
              </div>
              <div className="bg-slate-50 border border-slate-200 rounded-xl p-4 col-span-2 sm:col-span-4">
                <p className="text-sm text-slate-500">{t('results.totalBtc')}</p>
                <p className="text-lg font-bold text-slate-800 mt-1">{fmtBtc(result.totalBtc)} BTC</p>
              </div>
            </div>

            <GrowthChart
              data={result.data}
              valueLabel={t('chart.value')}
              investedLabel={t('chart.invested')}
              title={t('chart.title')}
              xLabel="Period"
            />
          </div>
        )}
      </div>

      <AdSensePlaceholder />
    </div>
  );
}
