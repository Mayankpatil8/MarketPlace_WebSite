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
          <span className="hero-badge">🏭 Buy from Verified & Trusted Suppliers</span>

          <h1 className="hero-title">
            Buy Industrial Parts with Confidence
            <br />
            <span className="accent">Quality. Trust. Transparency.</span>
          </h1>

          <p className="hero-subtitle">
            Purchase parts only from verified and trusted suppliers. The platform takes full responsibility for
            quality and reliability, so you always get exactly what is shown and promised.
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
              <span>Verified Suppliers</span>
            </div>
            <div>
              <strong>15,000+</strong>
              <span>Quality Products</span>
            </div>
            <div>
              <strong>100%</strong>
              <span>Trusted Deals</span>
            </div>
          </div>
        </div>

        <div className="hero-visual">
          <div className="hero-card">
            <FiZap />
            <div>
              <div className="hc-title">Fast & Easy Buying</div>
              <div className="hc-desc">Find the right parts quickly</div>
            </div>
          </div>
          <div className="hero-card">
            <FiShield />
            <div>
              <div className="hc-title">Trusted Suppliers</div>
              <div className="hc-desc">Only verified sellers allowed</div>
            </div>
          </div>
          <div className="hero-card">
            <FiPackage />
            <div>
              <div className="hc-title">Quality Guaranteed</div>
              <div className="hc-desc">What you see is what you get</div>
            </div>
          </div>
        </div>
      </section>

      {/* ================= WHY ================= */}
      <section className="section">
        <h2 className="center-title">Why Choose IndustrialHub?</h2>
        <p className="center-subtitle">
          A reliable platform to buy industrial products from trusted and verified suppliers.
        </p>

        <div className="grid-4">
          <div className="feature-card">
            <div className="feature-icon"><FiZap /></div>
            <h3>Easy Procurement</h3>
            <p>Find the right products quickly with simple search and filters.</p>
          </div>
          <div className="feature-card">
            <div className="feature-icon"><FiShield /></div>
            <h3>Safe & Reliable</h3>
            <p>All suppliers are verified and the platform ensures secure transactions.</p>
          </div>
          <div className="feature-card">
            <div className="feature-icon"><FiTrendingUp /></div>
            <h3>Quality First</h3>
            <p>You get high-quality products exactly as described on the platform.</p>
          </div>
          <div className="feature-card">
            <div className="feature-icon"><FiUsers /></div>
            <h3>Trusted Network</h3>
            <p>Buy directly from reliable manufacturers and authorized suppliers.</p>
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
            <p>Find products from verified and trusted suppliers.</p>
          </div>
          <div className="step-card">
            <FiCheckCircle />
            <h3>Choose with Confidence</h3>
            <p>All products are quality-checked and clearly described.</p>
          </div>
          <div className="step-card">
            <FiPackage />
            <h3>Order & Receive</h3>
            <p>Place your order and get exactly what you selected.</p>
          </div>
        </div>
      </section>

      {/* ================= ROLES ================= */}
      {!user && (
        <section className="section section-alt">
          <h2 className="center-title">Join IndustrialHub</h2>
          <p className="center-subtitle">
            Start using a trusted platform for reliable industrial purchasing.
          </p>

          <div className="grid-3">
            <Link to="/register?role=customer" className="role-card">
              <span className="role-emoji">🛒</span>
              <h3>Buyer</h3>
              <p>Browse products, place orders, and get quality items with confidence.</p>
              <span className="btn btn-primary btn-sm">Register as Buyer</span>
            </Link>

            <Link to="/register?role=supplier" className="role-card">
              <span className="role-emoji">🏭</span>
              <h3>Supplier</h3>
              <p>List your products and sell on a trusted and reliable platform.</p>
              <span className="btn btn-primary btn-sm">Register as Supplier</span>
            </Link>

           
          </div>
        </section>
      )}

      {/* ================= FINAL CTA ================= */}
      <section className="final-cta">
        <h2>Buy from Trusted Suppliers Today</h2>
        <p>Get high-quality products with full confidence and platform assurance.</p>
        <Link to="/register" className="btn btn-primary btn-lg">
          Create Free Account <FiArrowRight />
        </Link>
      </section>
    </div>
  );
}