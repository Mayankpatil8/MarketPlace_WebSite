import React from "react";
import { Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import {
  FiZap,
  FiShield,
  FiTrendingUp,
  FiUsers,
  FiArrowRight,
  FiCheckCircle,
  FiPackage,
  FiSearch,
} from "react-icons/fi";
import "./Home.css";

const categories = [
  { name: "Motors & Drives", icon: "⚙️", desc: "Industrial motors, VFDs, servo drives" },
  { name: "Semiconductors", icon: "🔌", desc: "ICs, chips, regulators, sensors" },
  { name: "Manufacturing", icon: "🏭", desc: "CNC, tools, heavy machinery" },
  { name: "Automation", icon: "🤖", desc: "PLCs, controllers, robotics" },
  { name: "Safety Equipment", icon: "🦺", desc: "PPE, sensors, protection gear" },
  { name: "Electrical", icon: "⚡", desc: "Switches, panels, components" },
];

export default function Home() {
  const { user } = useAuth();

  return (
    <div className="home">
      {/* ================= HERO ================= */}
      <section className="hero">
        <div className="hero-content">
          <span className="hero-badge">🏭 B2B & B2C Industrial Marketplace</span>

          <h1 className="hero-title">
            Buy & Sell Industrial Products
            <br />
            <span className="accent">Faster. Smarter. Secure.</span>
          </h1>

          <p className="hero-subtitle">
            IndustrialHub helps you discover verified suppliers, compare products,
            close deals faster, and track your orders end-to-end on one simple platform.
          </p>

          <div className="hero-cta">
            {user ? (
              <Link
                to={
                  user.role === "admin"
                    ? "/admin/dashboard"
                    : user.role === "supplier"
                    ? "/supplier/dashboard"
                    : "/dashboard"
                }
                className="btn btn-primary btn-lg"
              >
                Go to Dashboard <FiArrowRight />
              </Link>
            ) : (
              <>
                <Link to="/register" className="btn btn-primary btn-lg">
                  Get Started <FiArrowRight />
                </Link>
                <Link to="/products" className="btn btn-outline btn-lg">
                  Browse Products
                </Link>
              </>
            )}
          </div>

          <div className="hero-stats">
            <div>
              <strong>10,000+</strong>
              <span>Manufacturers</span>
            </div>
            <div>
              <strong>15,000+</strong>
              <span>Products</span>
            </div>
            <div>
              <strong>₹2.4Cr+</strong>
              <span>Deals Closed</span>
            </div>
          </div>
        </div>

        <div className="hero-visual">
          <div className="hero-card">
            <FiZap />
            <div>
              <div className="hc-title">Fast Deals</div>
              <div className="hc-desc">Real-time B2B trading</div>
            </div>
          </div>
          <div className="hero-card">
            <FiShield />
            <div>
              <div className="hc-title">Trusted Suppliers</div>
              <div className="hc-desc">Verified businesses only</div>
            </div>
          </div>
          <div className="hero-card">
            <FiPackage />
            <div>
              <div className="hc-title">Easy Logistics</div>
              <div className="hc-desc">Track orders end-to-end</div>
            </div>
          </div>
        </div>
      </section>

      {/* ================= WHY ================= */}
      <section className="section">
        <h2 className="center-title">Why Choose IndustrialHub?</h2>
        <p className="center-subtitle">
          Everything you need for modern industrial procurement in one place.
        </p>

        <div className="grid-4">
          <div className="feature-card">
            <div className="feature-icon"><FiZap /></div>
            <h3>Faster Procurement</h3>
            <p>Find products and suppliers quickly with smart search and filters.</p>
          </div>
          <div className="feature-card">
            <div className="feature-icon"><FiShield /></div>
            <h3>Secure & Trusted</h3>
            <p>All suppliers are verified for safe and reliable transactions.</p>
          </div>
          <div className="feature-card">
            <div className="feature-icon"><FiTrendingUp /></div>
            <h3>Better Decisions</h3>
            <p>Compare prices, specs, and reviews before you buy.</p>
          </div>
          <div className="feature-card">
            <div className="feature-icon"><FiUsers /></div>
            <h3>Direct Connections</h3>
            <p>Connect directly with manufacturers and distributors.</p>
          </div>
        </div>
      </section>

      {/* ================= CATEGORIES ================= */}
      <section className="section section-alt">
        <div className="section-header">
          <h2>Browse by Category</h2>
          <Link to="/products" className="btn btn-outline btn-sm">
            View All <FiArrowRight />
          </Link>
        </div>

        <div className="cat-grid">
          {categories.map((cat) => (
            <Link
              key={cat.name}
              to={`/products?category=${cat.name.toLowerCase()}`}
              className="cat-card"
            >
              <div className="cat-icon">{cat.icon}</div>
              <div className="cat-name">{cat.name}</div>
              <div className="cat-desc">{cat.desc}</div>
            </Link>
          ))}
        </div>
      </section>

      {/* ================= HOW IT WORKS ================= */}
      <section className="section">
        <h2 className="center-title">How It Works</h2>

        <div className="grid-3">
          <div className="step-card">
            <FiSearch />
            <h3>Search</h3>
            <p>Find products and suppliers across all categories.</p>
          </div>
          <div className="step-card">
            <FiCheckCircle />
            <h3>Compare</h3>
            <p>Compare prices, specs, and ratings to choose the best.</p>
          </div>
          <div className="step-card">
            <FiPackage />
            <h3>Order & Track</h3>
            <p>Place orders and track delivery in real time.</p>
          </div>
        </div>
      </section>

      {/* ================= ROLES ================= */}
      {!user && (
        <section className="section section-alt">
          <h2 className="center-title">Join IndustrialHub</h2>
          <p className="center-subtitle">
            Choose your role and start using the platform today.
          </p>

          <div className="grid-3">
            <Link to="/register?role=customer" className="role-card">
              <span className="role-emoji">🛒</span>
              <h3>Buyer / Startup</h3>
              <p>Browse products, place orders, and track deliveries easily.</p>
              <span className="btn btn-primary btn-sm">Register as Buyer</span>
            </Link>

            <Link to="/register?role=supplier" className="role-card">
              <span className="role-emoji">🏭</span>
              <h3>Supplier / Manufacturer</h3>
              <p>List products, receive orders, and grow your business.</p>
              <span className="btn btn-primary btn-sm">Register as Supplier</span>
            </Link>

            <Link to="/register?role=admin" className="role-card">
              <span className="role-emoji">⚙️</span>
              <h3>Administrator</h3>
              <p>Manage users, products, orders, and platform data.</p>
              <span className="btn btn-primary btn-sm">Admin Access</span>
            </Link>
          </div>
        </section>
      )}

      {/* ================= FINAL CTA ================= */}
      <section className="final-cta">
        <h2>Start Trading Smarter Today</h2>
        <p>Join thousands of businesses using IndustrialHub for procurement.</p>
        <Link to="/register" className="btn btn-primary btn-lg">
          Create Free Account <FiArrowRight />
        </Link>
      </section>
    </div>
  );
}