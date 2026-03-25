'use client';

import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';
import { Bar } from 'react-chartjs-2';

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

interface ScheduleItem {
  year: number;
  principal: number;
  interest: number;
  balance: number;
}

interface Props {
  schedule: ScheduleItem[];
  principalLabel: string;
  interestLabel: string;
  title: string;
}

export default function AmortizationChart({ schedule, principalLabel, interestLabel, title }: Props) {
  if (!schedule || schedule.length === 0) return null;

  const data = {
    labels: schedule.map((s) => `${s.year}`),
    datasets: [
      {
        label: principalLabel,
        data: schedule.map((s) => Math.round(s.principal)),
        backgroundColor: 'rgba(37, 99, 235, 0.8)',
        borderRadius: 2,
        stack: 'stack',
      },
      {
        label: interestLabel,
        data: schedule.map((s) => Math.round(s.interest)),
        backgroundColor: 'rgba(16, 185, 129, 0.8)',
        borderRadius: 2,
        stack: 'stack',
      },
    ],
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
      x: { stacked: true },
      y: {
        stacked: true,
        ticks: {
          callback: (value: string | number) => `$${Number(value).toLocaleString()}`,
        },
      },
    },
  };

  return (
    <div className="mt-8 bg-white rounded-xl p-4 border border-slate-200">
      <Bar data={data} options={options} />
    </div>
  );
}
