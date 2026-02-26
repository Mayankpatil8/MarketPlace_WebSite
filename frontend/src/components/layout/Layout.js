import React, { useState } from 'react';
import { Outlet, Link, useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import {
  FiHome, FiBox, FiShoppingCart, FiPackage, FiBarChart2,
  FiUsers, FiSettings, FiLogOut, FiMenu, FiX, FiZap,
  FiTrendingUp, FiFileText, FiStar, FiBriefcase, FiSearch
} from 'react-icons/fi';
import './Layout.css';

const navConfig = {
  customer: [
    { to: '/products', icon: FiBox, label: 'Products' },
    { to: '/dashboard', icon: FiBarChart2, label: 'Dashboard' },
    { to: '/cart', icon: FiShoppingCart, label: 'My Cart' },
    { to: '/my-orders', icon: FiPackage, label: 'My Orders' },
    { to: '/suggestions', icon: FiStar, label: 'For You' },
  ],
  supplier: [
    { to: '/supplier/dashboard', icon: FiBarChart2, label: 'Dashboard' },
    { to: '/supplier/products', icon: FiBox, label: 'My Products' },
    { to: '/supplier/deals', icon: FiBriefcase, label: 'Deals' },
    { to: '/supplier/orders', icon: FiPackage, label: 'Orders' },
  ],
  admin: [
    { to: '/admin/dashboard', icon: FiBarChart2, label: 'Dashboard' },
    { to: '/admin/users', icon: FiUsers, label: 'Users' },
    { to: '/admin/orders', icon: FiPackage, label: 'Orders' },
    { to: '/admin/deals', icon: FiBriefcase, label: 'Deals' },
    { to: '/admin/profit-loss', icon: FiTrendingUp, label: 'Profit & Loss' },
  ],
};

export default function Layout() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const [sidebarOpen, setSidebarOpen] = useState(true);

const navItems = user ? (navConfig[user.role] || []) : [
  { to: '/', icon: FiHome, label: 'Home' },
  { to: '/products', icon: FiBox, label: 'Products' },
  { to: '/services', icon: FiFileText, label: 'Services' }, // ✅ NEW
];

  const handleLogout = () => { logout(); navigate('/login'); };

  return (
    <div className={`layout ${sidebarOpen ? 'sidebar-open' : 'sidebar-closed'}`}>
      {/* Sidebar */}
      <aside className="sidebar">
        <div className="sidebar-header">
          <div className="brand">
            <FiZap className="brand-icon" />
            {sidebarOpen && <span>IndustrialHub</span>}
          </div>
          <button className="toggle-btn" onClick={() => setSidebarOpen(!sidebarOpen)}>
            {sidebarOpen ? <FiX /> : <FiMenu />}
          </button>
        </div>

        {user && sidebarOpen && (
          <div className="sidebar-user">
            <div className="avatar">{user.name?.charAt(0).toUpperCase()}</div>
            <div>
              <div className="user-name">{user.name}</div>
              <div className="user-role">{user.role}</div>
            </div>
          </div>
        )}

        <nav className="sidebar-nav">
          {navItems.map(({ to, icon: Icon, label }) => (
            <Link
              key={to}
              to={to}
              className={`nav-item ${location.pathname === to ? 'active' : ''}`}
            >
              <Icon />
              {sidebarOpen && <span>{label}</span>}
            </Link>
          ))}
        </nav>

        <div className="sidebar-footer">
          {user ? (
            <button className="nav-item logout-btn" onClick={handleLogout}>
              <FiLogOut />
              {sidebarOpen && <span>Logout</span>}
            </button>
          ) : (
            <>
              <Link to="/login" className="nav-item"><FiSettings />{sidebarOpen && <span>Login</span>}</Link>
            </>
          )}
        </div>
      </aside>

      {/* Main content */}
      <main className="main-content">
        <header className="topbar">
          <div className="topbar-search">
            <FiSearch />
            <input type="text" placeholder="Search products, suppliers, deals..." />
          </div>
          <div className="topbar-right">
            {!user && (
            <>
              <Link to="/services" className="btn btn-outline btn-sm">Services</Link> {/* ✅ NEW */}
              <Link to="/login" className="btn btn-outline btn-sm">Login</Link>
              <Link to="/register" className="btn btn-accent btn-sm">Register</Link>
            </>
          )}
            {user && (
              <div className="topbar-user">
                <div className="avatar sm">{user.name?.charAt(0).toUpperCase()}</div>
                <span>{user.name}</span>
                <span className={`badge badge-${user.role === 'admin' ? 'red' : user.role === 'supplier' ? 'green' : 'blue'}`}>{user.role}</span>
              </div>
            )}
          </div>
        </header>

        <div className="page-content">
          <Outlet />
        </div>
      </main>
    </div>
  );
}
