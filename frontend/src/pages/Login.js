import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { toast } from 'react-toastify';
import { FiZap, FiMail, FiLock, FiEye, FiEyeOff } from 'react-icons/fi';
import './Auth.css';

export default function Login() {
  const { login } = useAuth();
  const navigate = useNavigate();
  const [form, setForm] = useState({ email: '', password: '' });
  const [show, setShow] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!form.email || !form.password) return toast.error('Please fill all fields');
    setLoading(true);
    try {
      const user = await login(form.email, form.password);
      toast.success(`Welcome back, ${user.name}!`);
      if (user.role === 'admin') navigate('/admin/dashboard');
      else if (user.role === 'supplier') navigate('/supplier/dashboard');
      else navigate('/dashboard');
    } catch (err) {
      toast.error(err.response?.data?.message || 'Login failed');
    } finally {
      setLoading(false);
    }
  };

  const demoLogin = async (role) => {
    const demos = {
      customer: { email: 'customer@demo.com', password: 'demo1234' },
      supplier: { email: 'supplier@demo.com', password: 'demo1234' },
      admin: { email: 'admin@demo.com', password: 'demo1234' },
    };
    setForm(demos[role]);
  };

  return (
    <div className="auth-container">
      <div className="auth-card card">
        <div className="auth-logo"><FiZap /> IndustrialHub</div>
        <h2>Welcome Back</h2>
        <p className="auth-sub">Sign in to your account</p>

        <div className="demo-btns">
          <span>Demo:</span>
          {['customer','supplier','admin'].map(r => (
            <button key={r} className="btn btn-outline btn-sm" onClick={() => demoLogin(r)}>{r}</button>
          ))}
        </div>

        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label className="input-label">Email</label>
            <div className="input-icon-wrap">
              <FiMail />
              <input className="input" name="email" type="email" placeholder="you@company.com" value={form.email} onChange={handleChange} />
            </div>
          </div>
          <div className="form-group">
            <label className="input-label">Password</label>
            <div className="input-icon-wrap">
              <FiLock />
              <input className="input" name="password" type={show ? 'text' : 'password'} placeholder="••••••••" value={form.password} onChange={handleChange} />
              <button type="button" className="eye-btn" onClick={() => setShow(!show)}>{show ? <FiEyeOff /> : <FiEye />}</button>
            </div>
          </div>
          <button className="btn btn-primary" style={{width:'100%', justifyContent:'center'}} disabled={loading}>
            {loading ? 'Signing in...' : 'Sign In'}
          </button>
        </form>
        <p className="auth-link">Don't have an account? <Link to="/register">Register here</Link></p>
      </div>
    </div>
  );
}
