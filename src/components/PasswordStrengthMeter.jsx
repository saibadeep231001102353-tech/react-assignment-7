import React, { useMemo } from 'react';
import { Check, X, ShieldAlert, ShieldCheck } from 'lucide-react';
import './PasswordStrengthMeter.css';

export const calculatePasswordStrength = (password = '') => {
  if (!password) {
    return {
      score: 0,
      label: 'None',
      color: 'var(--text-muted)',
      percent: 0,
      rules: {
        length: false,
        uppercase: false,
        lowercase: false,
        number: false,
        special: false
      }
    };
  }

  const rules = {
    length: password.length >= 8,
    uppercase: /[A-Z]/.test(password),
    lowercase: /[a-z]/.test(password),
    number: /[0-9]/.test(password),
    special: /[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]/.test(password)
  };

  let metCount = 0;
  if (rules.length) metCount++;
  if (rules.uppercase) metCount++;
  if (rules.lowercase) metCount++;
  if (rules.number) metCount++;
  if (rules.special) metCount++;

  let score = 0;
  let label = 'Very Weak';
  let color = 'var(--rose-500)';

  if (metCount === 0 || password.length === 0) {
    score = 0;
    label = 'None';
    color = 'var(--text-muted)';
  } else if (metCount <= 2 || password.length < 6) {
    score = 1;
    label = 'Weak';
    color = 'var(--rose-400)';
  } else if (metCount === 3) {
    score = 2;
    label = 'Fair';
    color = 'var(--amber-400)';
  } else if (metCount === 4) {
    score = 3;
    label = 'Good';
    color = 'var(--cyan-400)';
  } else {
    score = 4;
    label = 'Strong';
    color = 'var(--emerald-400)';
  }

  const percent = Math.min(100, Math.round((metCount / 5) * 100));

  return {
    score,
    label,
    color,
    percent,
    rules,
    metCount
  };
};

const PasswordStrengthMeter = ({ password, showCriteria = true }) => {
  const strength = useMemo(() => calculatePasswordStrength(password), [password]);

  if (!password) {
    return null;
  }

  return (
    <div className="password-strength-container animate-fade-in">
      <div className="strength-header">
        <span className="strength-title">
          {strength.score >= 3 ? (
            <ShieldCheck size={14} className="icon-emerald" />
          ) : (
            <ShieldAlert size={14} className="icon-amber" />
          )}
          Password Strength
        </span>
        <span
          className="strength-label-badge"
          style={{
            color: strength.color,
            borderColor: `${strength.color}40`,
            backgroundColor: `${strength.color}15`
          }}
        >
          {strength.label} ({strength.percent}%)
        </span>
      </div>

      <div className="strength-bar-track">
        <div
          className={`strength-bar-fill score-${strength.score}`}
          style={{
            width: `${strength.percent}%`,
            backgroundColor: strength.color
          }}
        />
      </div>

      {showCriteria && (
        <div className="criteria-list">
          <div className={`criteria-item ${strength.rules.length ? 'met' : 'unmet'}`}>
            {strength.rules.length ? <Check size={12} /> : <X size={12} />}
            <span>At least 8 characters</span>
          </div>
          <div className={`criteria-item ${strength.rules.uppercase ? 'met' : 'unmet'}`}>
            {strength.rules.uppercase ? <Check size={12} /> : <X size={12} />}
            <span>Uppercase letter (A-Z)</span>
          </div>
          <div className={`criteria-item ${strength.rules.lowercase ? 'met' : 'unmet'}`}>
            {strength.rules.lowercase ? <Check size={12} /> : <X size={12} />}
            <span>Lowercase letter (a-z)</span>
          </div>
          <div className={`criteria-item ${strength.rules.number ? 'met' : 'unmet'}`}>
            {strength.rules.number ? <Check size={12} /> : <X size={12} />}
            <span>At least one number (0-9)</span>
          </div>
          <div className={`criteria-item ${strength.rules.special ? 'met' : 'unmet'}`}>
            {strength.rules.special ? <Check size={12} /> : <X size={12} />}
            <span>Special symbol (!@#$%...)</span>
          </div>
        </div>
      )}
    </div>
  );
};

export default PasswordStrengthMeter;
