import React from 'react';
import { Link } from 'react-router-dom';
import './Services.css';

const SERVICES = [
  {
    id: 'certification',
    icon: '🏅',
    tag: 'Quality Assurance',
    title: 'Industrial Certification',
    subtitle: 'We handle it. You focus on business.',
    desc: 'From ISO to CE marking, our expert partners guide your products through every regulatory requirement. We prepare documentation, coordinate audits, and manage the full certification lifecycle.',
    features: [
      'ISO 9001 / EN 9100 / AQAP',
      'CE, RoHS, REACH, ATEX',
      'Audit & documentation handling',
      'End-to-end certification support',
    ],
    cta: 'Request Certification Consultation',
    accent: '#c9a84c',
  },
  {
    id: 'business',
    icon: '🏛',
    tag: 'Strategy',
    title: 'Business Model & Compliance',
    subtitle: 'Structure that scales.',
    desc: 'We design your commercial and compliance framework for European and global markets — from contracts and revenue models to audit-ready processes.',
    features: [
      'B2B & OEM business models',
      'Compliance-ready processes',
      'Contract & framework design',
      'Audit & governance structure',
    ],
    cta: 'Book Strategy Session',
    accent: '#7dd3fc',
  },
  {
    id: 'consulting',
    icon: '🎯',
    tag: 'Advisory',
    title: 'Market Entry Consulting',
    subtitle: 'Enter new markets the right way.',
    desc: 'We help manufacturers and suppliers plan, validate, and execute market entry strategies with full regulatory and commercial readiness.',
    features: [
      'Market & competitor analysis',
      'Go-to-market strategy',
      'Regulatory roadmap',
      'Partner & channel strategy',
    ],
    cta: 'Schedule a Discovery Call',
    accent: '#fca5a5',
  },
];

const PROCESS = [
  { step: '01', title: 'Assessment', desc: 'We review your business, products, and goals.' },
  { step: '02', title: 'Roadmap', desc: 'We design a clear certification and business roadmap.' },
  { step: '03', title: 'Execution', desc: 'Our experts manage documentation, audits, and partners.' },
  { step: '04', title: 'Delivery', desc: 'You receive approvals, certifications, and market access.' },
];

export default function Services() {
  return (
    <div className="svc-page">

      {/* HERO */}
      <section className="svc-hero">
        <div className="svc-hero__content">
          <div className="svc-eyebrow">Our Services</div>
          <h1 className="svc-hero-title">
            Built for Industrial<br /><em>Growth & Compliance.</em>
          </h1>
          <p className="svc-hero-subtitle">
  On our platform, we provide complete business consulting services to enrich your business
  and help you achieve new heights. From certification to business strategy — everything you
  need to operate, scale, and trade with confidence.
</p>
          <div className="svc-hero__ctas">
            <Link to="/register" className="svc-primary-btn">Start Free Today →</Link>
            <Link to="/about" className="svc-secondary-btn">Learn More</Link>
          </div>
        </div>
      </section>

      {/* SERVICES GRID */}
      <section className="svc-section">
        <h2 className="svc-section-title">What We Do</h2>
        <p className="svc-section-subtitle">
          Professional services designed for manufacturers, suppliers, and buyers.
        </p>

        <div className="svc-grid">
          {SERVICES.map((s) => (
            <div key={s.id} className="svc-card" style={{ '--accent': s.accent }}>
              <div className="svc-card__icon">{s.icon}</div>
              <div className="svc-card__tag">{s.tag}</div>
              <h3 className="svc-card__title">{s.title}</h3>
              <p className="svc-card__subtitle">{s.subtitle}</p>
              <p className="svc-card__desc">{s.desc}</p>
              <ul className="svc-card__features">
                {s.features.map(f => (
                  <li key={f}>✓ {f}</li>
                ))}
              </ul>
              <Link to="/register" className="svc-card__cta">{s.cta} →</Link>
            </div>
          ))}
        </div>
      </section>

      {/* PROCESS */}
      <section className="svc-process-section">
        <h2 className="svc-section-title">How It Works</h2>
        <p className="svc-section-subtitle">A simple and transparent 4-step process.</p>

        <div className="svc-process-track">
          {PROCESS.map(p => (
            <div key={p.step} className="svc-process-step">
              <div className="svc-process-num">{p.step}</div>
              <h3>{p.title}</h3>
              <p>{p.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* CTA */}
      <section className="svc-banner">
            <div className="svc-banner-inner">
                <h2>Your first consultation is free.</h2>
                <p>Talk to our experts and build your certification and growth roadmap today.</p>
                <Link to="/register" className="svc-primary-btn">Create Free Account →</Link>
            </div>
            </section>

    </div>
  );
}