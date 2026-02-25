import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { LineChart, Line, BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, PieChart, Pie, Cell, Legend } from 'recharts';
import API from '../../utils/api';
import { FiUsers, FiBox, FiPackage, FiBriefcase, FiTrendingUp, FiArrowRight } from 'react-icons/fi';
import './AdminDashboard.css';

const MONTHS = ['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec'];
const COLORS = ['#f59e0b','#06b6d4','#10b981','#ef4444'];

export default function AdminDashboard() {
  const [stats, setStats] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    API.get('/admin/dashboard').then(({ data }) => {
      setStats(data.stats);
      setLoading(false);
    }).catch(() => setLoading(false));
  }, []);

  if (loading) return <div className="loading-spinner"><div className="spinner" /></div>;
  if (!stats) return <div className="empty-state">Failed to load dashboard</div>;

  const monthlyData = (stats.monthlyRevenue || []).map((m) => ({
    month: MONTHS[m._id.month - 1],
    Revenue: m.revenue,
    Fees: m.fees,
    Orders: m.orders,
  }));

  const pieData = (stats.usersByRole || []).map((r) => ({ name: r._id, value: r.count }));
  const orderStatusData = (stats.ordersByStatus || []).map((o) => ({ name: o._id, value: o.count }));

  return (
    <div className="admin-dashboard">
      <div className="page-header flex-between">
        <div>
          <h1>Admin Dashboard</h1>
          <p>Platform overview and real-time analytics</p>
        </div>
        <Link to="/admin/profit-loss" className="btn btn-accent"><FiTrendingUp /> P&amp;L Report</Link>
      </div>

      {/* KPI Cards */}
      <div className="grid-4" style={{marginBottom: 28}}>
        {[
          { label: 'Total Users', value: stats.totalUsers, icon: FiUsers, color: '#dbeafe', iconColor: '#1e40af' },
          { label: 'Products Listed', value: stats.totalProducts, icon: FiBox, color: '#d1fae5', iconColor: '#065f46' },
          { label: 'Total Orders', value: stats.totalOrders, icon: FiPackage, color: '#fef3c7', iconColor: '#92400e' },
          { label: 'Active Deals', value: stats.totalDeals, icon: FiBriefcase, color: '#fce7f3', iconColor: '#9d174d' },
        ].map(({ label, value, icon: Icon, color, iconColor }) => (
          <div key={label} className="stat-card card">
            <div className="stat-header">
              <div className="stat-icon" style={{background: color, color: iconColor}}><Icon /></div>
            </div>
            <div className="stat-value">{value?.toLocaleString() || 0}</div>
            <div className="stat-label">{label}</div>
          </div>
        ))}
      </div>

      {/* Revenue summary */}
      <div className="grid-2" style={{marginBottom: 28}}>
        <div className="card" style={{padding: 24}}>
          <div className="card-title">Revenue Summary (Orders)</div>
          <div className="rev-row">
            <span>Gross Revenue</span>
            <strong>€{(stats.revenue?.totalRevenue || 0).toLocaleString()}</strong>
          </div>
          <div className="rev-row">
            <span>Platform Fees (2%)</span>
            <strong style={{color:'var(--success)'}}>€{(stats.revenue?.totalFees || 0).toLocaleString()}</strong>
          </div>
          <div className="rev-row">
            <span>Supplier Payouts</span>
            <strong style={{color:'var(--muted)'}}>€{((stats.revenue?.totalRevenue || 0) - (stats.revenue?.totalFees || 0)).toLocaleString()}</strong>
          </div>
        </div>
        <div className="card" style={{padding: 24}}>
          <div className="card-title">Deal Revenue</div>
          <div className="rev-row">
            <span>Total Deal Value</span>
            <strong>€{(stats.dealRevenue?.totalValue || 0).toLocaleString()}</strong>
          </div>
          <div className="rev-row">
            <span>Platform Commission (1.5%)</span>
            <strong style={{color:'var(--success)'}}>€{(stats.dealRevenue?.totalFees || 0).toLocaleString()}</strong>
          </div>
        </div>
      </div>

      {/* Charts */}
      {monthlyData.length > 0 && (
        <div className="card" style={{padding: 24, marginBottom: 28}}>
          <div className="card-title">Monthly Revenue Trend</div>
          <ResponsiveContainer width="100%" height={260}>
            <LineChart data={monthlyData}>
              <XAxis dataKey="month" tick={{fontSize: 12}} />
              <YAxis tick={{fontSize: 12}} />
              <Tooltip formatter={(v) => `€${v.toLocaleString()}`} />
              <Legend />
              <Line type="monotone" dataKey="Revenue" stroke="#f59e0b" strokeWidth={2.5} dot={false} />
              <Line type="monotone" dataKey="Fees" stroke="#06b6d4" strokeWidth={2} dot={false} />
            </LineChart>
          </ResponsiveContainer>
        </div>
      )}

      <div className="grid-2" style={{marginBottom: 28}}>
        {/* Users pie */}
        <div className="card" style={{padding: 24}}>
          <div className="card-title">Users by Role</div>
          <ResponsiveContainer width="100%" height={220}>
            <PieChart>
              <Pie data={pieData} dataKey="value" nameKey="name" cx="50%" cy="50%" outerRadius={80} label>
                {pieData.map((_, i) => <Cell key={i} fill={COLORS[i % COLORS.length]} />)}
              </Pie>
              <Legend />
              <Tooltip />
            </PieChart>
          </ResponsiveContainer>
        </div>

        {/* Order status bar */}
        <div className="card" style={{padding: 24}}>
          <div className="card-title">Orders by Status</div>
          <ResponsiveContainer width="100%" height={220}>
            <BarChart data={orderStatusData}>
              <XAxis dataKey="name" tick={{fontSize: 11}} />
              <YAxis tick={{fontSize: 11}} />
              <Tooltip />
              <Bar dataKey="value" fill="#0f172a" radius={[4,4,0,0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Top products */}
      <div className="card" style={{padding: 24}}>
        <div className="flex-between" style={{marginBottom: 16}}>
          <div className="card-title" style={{margin:0}}>Top Selling Products</div>
          <Link to="/admin/orders" className="btn btn-outline btn-sm">View Orders <FiArrowRight /></Link>
        </div>
        <div className="table-wrap">
          <table>
            <thead><tr><th>#</th><th>Product</th><th>Category</th><th>Price</th><th>Units Sold</th></tr></thead>
            <tbody>
              {(stats.topProducts || []).map((p, i) => (
                <tr key={p._id}>
                  <td>{i + 1}</td>
                  <td><strong>{p.name}</strong></td>
                  <td><span className="badge badge-blue">{p.category}</span></td>
                  <td>€{p.price?.toLocaleString()}</td>
                  <td><strong>{p.totalSold}</strong></td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
