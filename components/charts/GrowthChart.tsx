'use client';

import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  Filler,
} from 'chart.js';
import { Line } from 'react-chartjs-2';

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  Filler
);

interface DataPoint {
  period: number;
  value: number;
  invested?: number;
}

interface Props {
  data: DataPoint[];
  valueLabel: string;
  investedLabel?: string;
  title: string;
  xLabel?: string;
}

export default function GrowthChart({ data, valueLabel, investedLabel, title, xLabel = 'Year' }: Props) {
  if (!data || data.length === 0) return null;

  const datasets = [
    {
      label: valueLabel,
      data: data.map((d) => Math.round(d.value)),
      borderColor: 'rgba(37, 99, 235, 1)',
      backgroundColor: 'rgba(37, 99, 235, 0.1)',
      fill: true,
      tension: 0.3,
      pointRadius: data.length > 30 ? 0 : 3,
    },
  ];

  if (investedLabel && data[0]?.invested !== undefined) {
    datasets.push({
      label: investedLabel,
      data: data.map((d) => Math.round(d.invested ?? 0)),
      borderColor: 'rgba(16, 185, 129, 1)',
      backgroundColor: 'rgba(16, 185, 129, 0)',
      fill: false,
      tension: 0.3,
      pointRadius: data.length > 30 ? 0 : 3,
      // @ts-expect-error borderDash is valid
      borderDash: [5, 5],
    });
  }

  const chartData = {
    labels: data.map((d) => `${xLabel} ${d.period}`),
    datasets,
  };

  const options = {
    responsive: true,
    plugins: {
      legend: { position: 'top' as const },
      title: { display: true, text: title, font: { size: 14 } },
      tooltip: {
        callbacks: {
          label: (ctx: { dataset: { label?: string }; raw: unknown }) =>
            `${ctx.dataset.label}: $${Number(ctx.raw).toLocaleString()}`,
        },
      },
    },
    scales: {
      y: {
        ticks: {
          callback: (value: string | number) => `$${Number(value).toLocaleString()}`,
        },
      },
    },
  };

  return (
    <div className="mt-8 bg-white rounded-xl p-4 border border-slate-200">
      <Line data={chartData} options={options} />
    </div>
  );
}
