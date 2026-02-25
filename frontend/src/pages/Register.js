import React, { useState } from 'react';
import { Link, useNavigate, useSearchParams } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { toast } from 'react-toastify';
import { FiZap } from 'react-icons/fi';
import './Auth.css';

export default function Register() {
  const { register } = useAuth();
  const navigate = useNavigate();
  const [params] = useSearchParams();
  const [form, setForm] = useState({ name: '', email: '', password: '', role: params.get('role') || 'customer', company: '', phone: '' });
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!form.name || !form.email || !form.password) return toast.error('Please fill required fields');
    if (form.password.length < 6) return toast.error('Password must be at least 6 characters');
    setLoading(true);
    try {
      const user = await register(form);
      toast.success(`Account created! Welcome, ${user.name}!`);
      if (user.role === 'admin') navigate('/admin/dashboard');
      else if (user.role === 'supplier') navigate('/supplier/dashboard');
      else navigate('/dashboard');
    } catch (err) {
      toast.error(err.response?.data?.message || 'Registration failed');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="auth-container">
      <div className="auth-card card">
        <div className="auth-logo"><FiZap /> IndustrialHub</div>
        <h2>Create Account</h2>
        <p className="auth-sub">Join the industrial marketplace</p>

        <form onSubmit={handleSubmit}>
          <div className="form-row">
            <div className="form-group">
              <label className="input-label">Full Name *</label>
              <input className="input" name="name" placeholder="Rahul Sharma" value={form.name} onChange={handleChange} />
            </div>
            <div className="form-group">
              <label className="input-label">Phone</label>
              <input className="input" name="phone" placeholder="+91 98765 43210" value={form.phone} onChange={handleChange} />
            </div>
          </div>
          <div className="form-group">
            <label className="input-label">Email *</label>
            <input className="input" name="email" type="email" placeholder="you@company.com" value={form.email} onChange={handleChange} />
          </div>
          <div className="form-row">
            <div className="form-group">
              <label className="input-label">Password *</label>
              <input className="input" name="password" type="password" placeholder="Min. 6 characters" value={form.password} onChange={handleChange} />
            </div>
            <div className="form-group">
              <label className="input-label">Register As *</label>
              <select className="input" name="role" value={form.role} onChange={handleChange}>
                <option value="customer">Customer / Startup</option>
                <option value="supplier">Supplier / Manufacturer</option>
                <option value="admin">Admin</option>
              </select>
            </div>
          </div>
          {(form.role === 'supplier' || form.role === 'customer') && (
            <div className="form-group">
              <label className="input-label">Company Name</label>
              <input className="input" name="company" placeholder="Your company / startup name" value={form.company} onChange={handleChange} />
            </div>
          )}
          <button className="btn btn-accent" style={{width:'100%', justifyContent:'center'}} disabled={loading}>
            {loading ? 'Creating Account...' : 'Create Account'}
          </button>
        </form>
        <p className="auth-link">Already have an account? <Link to="/login">Sign in</Link></p>
      </div>
    </div>
  );
}
