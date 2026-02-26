import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { AuthProvider, useAuth } from './context/AuthContext';
import Services from "./pages/Services";

// Layout
import Layout from './components/layout/Layout';

// Pages
import Home from './pages/Home';
import Login from './pages/Login';
import Register from './pages/Register';

// Customer
import CustomerDashboard from './pages/customer/Dashboard';
import ProductList from './pages/customer/ProductList';
import ProductDetail from './pages/customer/ProductDetail';
import Cart from './pages/customer/Cart';
import MyOrders from './pages/customer/MyOrders';
import Suggestions from './pages/customer/Suggestions';

// Supplier
import SupplierDashboard from './pages/supplier/Dashboard';
import ManageProducts from './pages/supplier/ManageProducts';
import ManageDeals from './pages/supplier/ManageDeals';
import SupplierOrders from './pages/supplier/Orders';

// Admin
import AdminDashboard from './pages/admin/Dashboard';
import AdminUsers from './pages/admin/Users';
import AdminOrders from './pages/admin/Orders';
import AdminDeals from './pages/admin/Deals';
import ProfitLoss from './pages/admin/ProfitLoss';

const PrivateRoute = ({ children, roles }) => {
  const { user } = useAuth();
  if (!user) return <Navigate to="/login" replace />;
  if (roles && !roles.includes(user.role)) return <Navigate to="/" replace />;
  return children;
};

function AppRoutes() {
  const { user } = useAuth();
  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route index element={<Home />} />
        <Route path="login" element={user ? <Navigate to="/" /> : <Login />} />
        <Route path="register" element={user ? <Navigate to="/" /> : <Register />} />
        <Route path="products" element={<ProductList />} />
        <Route path="products/:id" element={<ProductDetail />} />
        
        <Route path="/services" element={<Services />} />

        {/* Customer */}
        <Route path="dashboard" element={<PrivateRoute roles={['customer']}><CustomerDashboard /></PrivateRoute>} />
        <Route path="cart" element={<PrivateRoute roles={['customer']}><Cart /></PrivateRoute>} />
        <Route path="my-orders" element={<PrivateRoute roles={['customer']}><MyOrders /></PrivateRoute>} />
        <Route path="suggestions" element={<PrivateRoute roles={['customer']}><Suggestions /></PrivateRoute>} />

        {/* Supplier */}
        <Route path="supplier/dashboard" element={<PrivateRoute roles={['supplier']}><SupplierDashboard /></PrivateRoute>} />
        <Route path="supplier/products" element={<PrivateRoute roles={['supplier']}><ManageProducts /></PrivateRoute>} />
        <Route path="supplier/deals" element={<PrivateRoute roles={['supplier']}><ManageDeals /></PrivateRoute>} />
        <Route path="supplier/orders" element={<PrivateRoute roles={['supplier']}><SupplierOrders /></PrivateRoute>} />

        {/* Admin */}
        <Route path="admin/dashboard" element={<PrivateRoute roles={['admin']}><AdminDashboard /></PrivateRoute>} />
        <Route path="admin/users" element={<PrivateRoute roles={['admin']}><AdminUsers /></PrivateRoute>} />
        <Route path="admin/orders" element={<PrivateRoute roles={['admin']}><AdminOrders /></PrivateRoute>} />
        <Route path="admin/deals" element={<PrivateRoute roles={['admin']}><AdminDeals /></PrivateRoute>} />
        <Route path="admin/profit-loss" element={<PrivateRoute roles={['admin']}><ProfitLoss /></PrivateRoute>} />

        <Route path="*" element={<Navigate to="/" />} />
      </Route>
    </Routes>
  );
}

export default function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <AppRoutes />
        <ToastContainer position="top-right" autoClose={3000} hideProgressBar={false} />
      </BrowserRouter>
    </AuthProvider>
  );
}
