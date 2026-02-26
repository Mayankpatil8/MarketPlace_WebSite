import React, { useState } from 'react';
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, Legend } from 'recharts';

const MONTHS = ['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec'];

// 🇪🇺 European Dummy Data
const DUMMY_DATA = {
  2024: {
    monthly: MONTHS.map((_, i) => ({
      _id: i + 1,
      grossRevenue: 80000 + i * 25000,
      platformFees: 6000 + i * 1800,
      supplierPayouts: 70000 + i * 22000,
      orderCount: 25 + i * 4,
    })),
    dealMonthly: MONTHS.map((_, i) => ({
      _id: i + 1,
      dealRevenue: 50000 + i * 20000,
      dealFees: 2500 + i * 1200,
      dealCount: 5 + i,
    })),
  },
  2025: {
    monthly: MONTHS.map((_, i) => ({
      _id: i + 1,
      grossRevenue: 120000 + i * 40000,
      platformFees: 10000 + i * 2500,
      supplierPayouts: 105000 + i * 36000,
      orderCount: 40 + i * 6,
    })),
    dealMonthly: MONTHS.map((_, i) => ({
      _id: i + 1,
      dealRevenue: 90000 + i * 35000,
      dealFees: 5000 + i * 2000,
      dealCount: 10 + i * 2,
    })),
  },
  2026: {
    monthly: MONTHS.map((_, i) => ({
      _id: i + 1,
      grossRevenue: 200000 + i * 55000,
      platformFees: 18000 + i * 4000,
      supplierPayouts: 180000 + i * 50000,
      orderCount: 70 + i * 8,
    })),
    dealMonthly: MONTHS.map((_, i) => ({
      _id: i + 1,
      dealRevenue: 150000 + i * 60000,
      dealFees: 9000 + i * 3500,
      dealCount: 20 + i * 3,
    })),
  }
};

export default function ProfitLoss() {
  const [year, setYear] = useState(2026);

  const data = DUMMY_DATA[year];

  const chartData = MONTHS.map((m, i) => {
    const row = data.monthly[i];
    const deal = data.dealMonthly[i];
    return {
      month: m,
      'Order Revenue': row.grossRevenue,
      'Platform Fees': row.platformFees + deal.dealFees,
      'Deal Revenue': deal.dealRevenue,
      'Supplier Payout': row.supplierPayouts,
    };
  });

  const totals = chartData.reduce((acc, r) => ({
    revenue: acc.revenue + r['Order Revenue'],
    fees: acc.fees + r['Platform Fees'],
    deals: acc.deals + r['Deal Revenue'],
    payout: acc.payout + r['Supplier Payout'],
  }), { revenue: 0, fees: 0, deals: 0, payout: 0 });

  return (
    <div style={{maxWidth: 1100}}>
      <div className="page-header flex-between">
        <div>
          <h1>Profit &amp; Loss Report</h1>
          <p>Complete financial overview of the platform</p>
        </div>
        <select className="input" style={{width: 120}} value={year} onChange={e => setYear(Number(e.target.value))}>
          {[2024, 2025, 2026].map(y => <option key={y}>{y}</option>)}
        </select>
      </div>

      {/* Summary */}
      <div className="grid-4" style={{marginBottom: 28}}>
        {[
          { label: 'Gross Order Revenue', value: totals.revenue, color: '#dbeafe', textColor: '#1e40af' },
          { label: 'Total Deal Revenue', value: totals.deals, color: '#d1fae5', textColor: '#065f46' },
          { label: 'Total Platform Income', value: totals.fees, color: '#fef3c7', textColor: '#92400e' },
          { label: 'Supplier Payouts', value: totals.payout, color: '#fee2e2', textColor: '#991b1b' },
        ].map(({ label, value, color, textColor }) => (
          <div key={label} className="card stat-card" style={{background: color, border: 'none'}}>
            <div className="stat-value" style={{color: textColor}}>€{value.toLocaleString('de-DE')}</div>
            <div className="stat-label" style={{color: textColor, opacity: .8}}>{label}</div>
          </div>
        ))}
      </div>

      {/* Net Profit */}
      <div className="card" style={{padding: 24, marginBottom: 28, background: '#0f172a', color: '#fff'}}>
        <div style={{display: 'flex', justifyContent: 'space-between', alignItems: 'center'}}>
          <div>
            <div style={{fontSize: 13, opacity: .6}}>Net Platform Profit ({year})</div>
            <div style={{fontFamily: 'Syne', fontSize: 42, fontWeight: 800, color: '#f59e0b'}}>
              €{totals.fees.toLocaleString('de-DE')}
            </div>
          </div>
          <div style={{fontSize: 64}}>📈</div>
        </div>
      </div>

      {/* Chart */}
      <div className="card" style={{padding: 24}}>
        <ResponsiveContainer width="100%" height={320}>
          <BarChart data={chartData} barSize={16}>
            <XAxis dataKey="month" />
            <YAxis tickFormatter={v => `€${(v/1000).toFixed(0)}K`} />
            <Tooltip formatter={v => `€${v.toLocaleString('de-DE')}`} />
            <Legend />
            <Bar dataKey="Order Revenue" fill="#0f172a" radius={[3,3,0,0]} />
            <Bar dataKey="Platform Fees" fill="#f59e0b" radius={[3,3,0,0]} />
            <Bar dataKey="Deal Revenue" fill="#06b6d4" radius={[3,3,0,0]} />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}