import React from 'react';
import { ShieldCheck, Lock, KeyRound, Heart } from 'lucide-react';
import './Footer.css';

const Footer = () => {
  return (
    <footer className="footer-root">
      <div className="footer-container">
        <div className="footer-top-row">
          <div className="footer-brand-info">
            <div className="footer-logo">
              <ShieldCheck size={20} className="icon-emerald" />
              <span className="footer-title">
                Auth<span className="text-emerald">Guard</span> SecOps
              </span>
            </div>
            <p className="footer-desc">
              React Assignment 7: Cryptographic Authentication System, Client-Side Route Protection, 
              RFC 7519 JWT Simulation, and Assignment 6 Task Manager Integration.
            </p>
          </div>

          <div className="footer-specs">
            <h4>Assignment 7 Deliverables</h4>
            <ul className="footer-spec-list">
              <li>✓ Login & Logout System</li>
              <li>✓ Protected Dashboard Route Guard</li>
              <li>✓ Remember User Persistence (LocalStorage)</li>
              <li>✓ JWT Token Simulation (Header.Payload.Sig)</li>
              <li>✓ Username & Password Required Validation</li>
              <li>✓ NIST Password Strength Dynamic Meter</li>
            </ul>
          </div>
        </div>

        <div className="footer-bottom-row">
          <p className="footer-attribution">
            Engineered with <Heart size={14} className="icon-heart" /> by{' '}
            <strong className="author-highlight">Saibadeep Mullick</strong> • 
            <span className="degree-tag">4th Year BCA Student</span>
          </p>
          <div className="footer-meta-tags">
            <span className="meta-pill">React 19</span>
            <span className="meta-pill">React Router v6</span>
            <span className="meta-pill">JWT RFC 7519</span>
            <span className="meta-pill">Client Route Guard</span>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
