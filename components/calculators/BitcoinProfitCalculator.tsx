'use client';

import { useState } from 'react';
import { useTranslations } from 'next-intl';
import { calculateBitcoinProfit } from '@/lib/calculations';
import AdSensePlaceholder from '@/components/layout/AdSensePlaceholder';

export default function BitcoinProfitCalculator() {
  const t = useTranslations('bitcoinProfit');
  const tc = useTranslations('common');

  const [investment, setInvestment] = useState('1000');
  const [buyPrice, setBuyPrice] = useState('30000');
  const [sellPrice, setSellPrice] = useState('50000');
  const [fees, setFees] = useState('0.5');
  const [result, setResult] = useState<ReturnType<typeof calculateBitcoinProfit> | null>(null);

  const fmt = (n: number) => `$${n.toLocaleString('en-US', { maximumFractionDigits: 2 })}`;
  const fmtBtc = (n: number) => n.toFixed(8);

  function handleCalculate() {
    const r = calculateBitcoinProfit(
      parseFloat(investment) || 0,
      parseFloat(buyPrice) || 0,
      parseFloat(sellPrice) || 0,
      parseFloat(fees) || 0
    );
    setResult(r);
  }

  function handleReset() {
    setInvestment('1000');
    setBuyPrice('30000');
    setSellPrice('50000');
    setFees('0.5');
    setResult(null);
  }

  const isProfit = result && result.netProfit >= 0;

  return (
    <div className="max-w-3xl mx-auto">
      <div className="bg-white rounded-2xl shadow-sm border border-slate-200 p-6 sm:p-8">
        <h1 className="text-2xl font-bold text-slate-800 mb-6">{t('title')}</h1>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-1">{t('fields.investment')}</label>
            <input
              type="number"
              value={investment}
              onChange={(e) => setInvestment(e.target.value)}
              className="w-full border border-slate-300 rounded-lg px-4 py-2.5 text-slate-800 focus:outline-none focus:ring-2 focus:ring-blue-500"
              min="0"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-1">{t('fields.buyPrice')}</label>
            <input
              type="number"
              value={buyPrice}
              onChange={(e) => setBuyPrice(e.target.value)}
              className="w-full border border-slate-300 rounded-lg px-4 py-2.5 text-slate-800 focus:outline-none focus:ring-2 focus:ring-blue-500"
              min="0"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-1">{t('fields.sellPrice')}</label>
            <input
              type="number"
              value={sellPrice}
              onChange={(e) => setSellPrice(e.target.value)}
              className="w-full border border-slate-300 rounded-lg px-4 py-2.5 text-slate-800 focus:outline-none focus:ring-2 focus:ring-blue-500"
              min="0"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-1">{t('fields.fees')}</label>
            <input
              type="number"
              value={fees}
              onChange={(e) => setFees(e.target.value)}
              className="w-full border border-slate-300 rounded-lg px-4 py-2.5 text-slate-800 focus:outline-none focus:ring-2 focus:ring-blue-500"
              step="0.01"
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
                <p className="text-sm opacity-80">{t('results.netProfit')}</p>
                <p className="text-2xl font-bold mt-1">
                  {isProfit ? '+' : ''}{fmt(result.netProfit)}
                </p>
                <p className="text-sm opacity-80 mt-1">
                  ROI: {result.roi.toFixed(2)}%
                </p>
              </div>
              <div className="bg-slate-50 border border-slate-200 rounded-xl p-4">
                <p className="text-sm text-slate-500">{t('results.grossProfit')}</p>
                <p className={`text-lg font-bold mt-1 ${result.grossProfit >= 0 ? 'text-emerald-600' : 'text-red-600'}`}>
                  {result.grossProfit >= 0 ? '+' : ''}{fmt(result.grossProfit)}
                </p>
              </div>
              <div className="bg-slate-50 border border-slate-200 rounded-xl p-4">
                <p className="text-sm text-slate-500">{t('results.btcAmount')}</p>
                <p className="text-lg font-bold text-slate-800 mt-1">{fmtBtc(result.btcAmount)}</p>
              </div>
            </div>
          </div>
        )}
      </div>

      <AdSensePlaceholder />
    </div>
  );
}
