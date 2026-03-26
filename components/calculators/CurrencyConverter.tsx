'use client';

import { useState, useEffect, useCallback } from 'react';
import { useTranslations } from 'next-intl';
import AdSensePlaceholder from '@/components/layout/AdSensePlaceholder';

const POPULAR_CURRENCIES = [
  'USD', 'EUR', 'GBP', 'JPY', 'CHF', 'CAD', 'AUD', 'CNY', 'HKD', 'SGD',
  'SEK', 'NOK', 'DKK', 'NZD', 'MXN', 'BRL', 'INR', 'KRW', 'ZAR', 'AED',
  'SAR', 'THB', 'MYR', 'IDR', 'PLN', 'CZK', 'HUF', 'RUB', 'TRY', 'ILS',
];

export default function CurrencyConverter() {
  const t = useTranslations('currencyConverter');

  const [amount, setAmount] = useState('1000');
  const [from, setFrom] = useState('USD');
  const [to, setTo] = useState('EUR');
  const [rates, setRates] = useState<Record<string, number> | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const [updatedAt, setUpdatedAt] = useState('');

  useEffect(() => {
    fetch('https://open.er-api.com/v6/latest/USD')
      .then((r) => r.json())
      .then((data) => {
        if (data.result === 'success') {
          setRates(data.rates);
          setUpdatedAt(new Date(data.time_last_update_utc).toLocaleDateString());
        } else {
          setError(true);
        }
      })
      .catch(() => setError(true))
      .finally(() => setLoading(false));
  }, []);

  const convert = useCallback(
    (amt: number, fromCur: string, toCur: string): number | null => {
      if (!rates) return null;
      const fromRate = rates[fromCur];
      const toRate = rates[toCur];
      if (!fromRate || !toRate) return null;
      return (amt / fromRate) * toRate;
    },
    [rates]
  );

  const result = rates ? convert(parseFloat(amount) || 0, from, to) : null;
  const rate = rates ? convert(1, from, to) : null;

  function handleSwap() {
    setFrom(to);
    setTo(from);
  }

  const selectClass =
    'w-full border border-slate-300 rounded-lg px-4 py-2.5 text-slate-800 focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white';

  return (
    <div className="max-w-3xl mx-auto">
      <div className="bg-white rounded-2xl shadow-sm border border-slate-200 p-6 sm:p-8">
        <h1 className="text-2xl font-bold text-slate-800 mb-6">{t('title')}</h1>

        {loading && (
          <div className="text-center py-8 text-slate-500">{t('loading')}</div>
        )}

        {error && (
          <div className="bg-red-50 border border-red-200 rounded-xl p-4 text-red-700 text-center">
            {t('error')}
          </div>
        )}

        {!loading && !error && rates && (
          <>
            <div className="grid grid-cols-1 sm:grid-cols-[1fr_auto_1fr] gap-4 items-end">
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1">
                  {t('fields.amount')}
                </label>
                <input
                  type="number"
                  value={amount}
                  onChange={(e) => setAmount(e.target.value)}
                  className="w-full border border-slate-300 rounded-lg px-4 py-2.5 text-slate-800 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  min="0"
                />
              </div>

              <button
                onClick={handleSwap}
                title={t('swap')}
                className="flex items-center justify-center w-10 h-10 rounded-full bg-slate-100 hover:bg-slate-200 text-slate-600 transition-colors mx-auto mb-0.5"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7h12m0 0l-4-4m4 4l-4 4m0 6H4m0 0l4 4m-4-4l4-4" />
                </svg>
              </button>

              <div className="grid grid-cols-2 gap-2">
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-1">
                    {t('fields.from')}
                  </label>
                  <select
                    value={from}
                    onChange={(e) => setFrom(e.target.value)}
                    className={selectClass}
                  >
                    {POPULAR_CURRENCIES.map((c) => (
                      <option key={c} value={c}>{c}</option>
                    ))}
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-1">
                    {t('fields.to')}
                  </label>
                  <select
                    value={to}
                    onChange={(e) => setTo(e.target.value)}
                    className={selectClass}
                  >
                    {POPULAR_CURRENCIES.map((c) => (
                      <option key={c} value={c}>{c}</option>
                    ))}
                  </select>
                </div>
              </div>
            </div>

            {result !== null && (
              <div className="mt-8">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="bg-blue-600 text-white rounded-xl p-5">
                    <p className="text-sm opacity-80">{t('results.result')}</p>
                    <p className="text-3xl font-bold mt-1">
                      {result.toLocaleString('en-US', { maximumFractionDigits: 2 })} {to}
                    </p>
                  </div>
                  <div className="bg-slate-50 border border-slate-200 rounded-xl p-5">
                    <p className="text-sm text-slate-500">{t('results.rate')}</p>
                    <p className="text-xl font-bold text-slate-800 mt-1">
                      1 {from} = {rate?.toFixed(4)} {to}
                    </p>
                    <p className="text-xs text-slate-400 mt-2">
                      {t('results.updated')}: {updatedAt}
                    </p>
                  </div>
                </div>
                <p className="text-xs text-slate-400 mt-3 text-center">{t('powered')}</p>
              </div>
            )}
          </>
        )}
      </div>

      <AdSensePlaceholder />
    </div>
  );
}
