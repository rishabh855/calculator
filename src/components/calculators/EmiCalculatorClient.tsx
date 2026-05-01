'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { RefreshCw } from 'lucide-react';

export default function EmiCalculatorClient() {
  const [principal, setPrincipal] = useState<number | ''>('');
  const [rate, setRate] = useState<number | ''>('');
  const [tenure, setTenure] = useState<number | ''>('');
  const [tenureType, setTenureType] = useState<'yr' | 'mo'>('yr');

  const [emi, setEmi] = useState<number>(0);
  const [totalInterest, setTotalInterest] = useState<number>(0);
  const [totalPayment, setTotalPayment] = useState<number>(0);
  const [error, setError] = useState<string | null>(null);

  // Load saved inputs on mount
  useEffect(() => {
    const saved = localStorage.getItem('emi-inputs');
    if (saved) {
      try {
        const { p, r, t, type } = JSON.parse(saved);
        if (p) setPrincipal(p);
        if (r) setRate(r);
        if (t) setTenure(t);
        if (type) setTenureType(type);
      } catch (e) {
        // ignore
      }
    }
  }, []);

  // Calculate whenever inputs change
  useEffect(() => {
    calculateEMI();
    // Save to localstorage
    localStorage.setItem('emi-inputs', JSON.stringify({
      p: principal, r: rate, t: tenure, type: tenureType
    }));
  }, [principal, rate, tenure, tenureType]);

  const calculateEMI = () => {
    const p = Number(principal);
    const r = Number(rate);
    const t = Number(tenure);

    if (principal === '' || rate === '' || tenure === '') {
      setError(null);
      setEmi(0);
      setTotalInterest(0);
      setTotalPayment(0);
      return;
    }

    if (p <= 0) {
      setError('Loan amount must be greater than 0.');
      setEmi(0);
      setTotalInterest(0);
      setTotalPayment(0);
      return;
    }

    if (r <= 0 || r > 100) {
      setError('Interest rate must be between 0.1 and 100.');
      setEmi(0);
      setTotalInterest(0);
      setTotalPayment(0);
      return;
    }

    if (t <= 0 || (tenureType === 'yr' && t > 100) || (tenureType === 'mo' && t > 1200)) {
      setError('Please enter a valid loan tenure (max 100 years).');
      setEmi(0);
      setTotalInterest(0);
      setTotalPayment(0);
      return;
    }

    setError(null);

    const monthlyRate = r / 12 / 100;
    const months = tenureType === 'yr' ? t * 12 : t;

    const calculatedEmi = p * monthlyRate * (Math.pow(1 + monthlyRate, months) / (Math.pow(1 + monthlyRate, months) - 1));
    const calculatedTotalPayment = calculatedEmi * months;
    const calculatedTotalInterest = calculatedTotalPayment - p;

    setEmi(calculatedEmi);
    setTotalPayment(calculatedTotalPayment);
    setTotalInterest(calculatedTotalInterest);
  };

  const handleReset = () => {
    setPrincipal('');
    setRate('');
    setTenure('');
    setEmi(0);
    setTotalInterest(0);
    setTotalPayment(0);
    setError(null);
  };

  const formatCurrency = (val: number) => {
    return '₹' + Math.round(val).toLocaleString('en-IN');
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
      <div className="card">
        <h2 style={{ fontSize: '1.25rem', marginBottom: '1.5rem', display: 'flex', justifyContent: 'space-between' }}>
          Loan Details
          <button onClick={handleReset} style={{ background: 'none', border: 'none', cursor: 'pointer', color: 'var(--text-muted)' }} title="Reset">
            <RefreshCw size={18} />
          </button>
        </h2>

        <div className="input-group">
          <label className="input-label">Loan Amount (₹)</label>
          <input 
            type="number" 
            className="input-field" 
            value={principal} 
            onChange={(e) => setPrincipal(e.target.value === '' ? '' : Number(e.target.value))}
            placeholder="e.g. 100000"
          />
        </div>

        <div className="input-group">
          <label className="input-label">Interest Rate (% p.a.)</label>
          <input 
            type="number" 
            className="input-field" 
            value={rate} 
            onChange={(e) => setRate(e.target.value === '' ? '' : Number(e.target.value))}
            placeholder="e.g. 10.5"
            step="0.1"
          />
        </div>

        <div className="input-group">
          <label className="input-label">Loan Tenure</label>
          <div style={{ display: 'flex', gap: '0.5rem' }}>
            <input 
              type="number" 
              className="input-field" 
              style={{ flexGrow: 1 }}
              value={tenure} 
              onChange={(e) => setTenure(e.target.value === '' ? '' : Number(e.target.value))}
              placeholder="e.g. 5"
            />
            <select 
              className="input-field" 
              style={{ width: '100px' }}
              value={tenureType}
              onChange={(e) => setTenureType(e.target.value as 'yr' | 'mo')}
            >
              <option value="yr">Years</option>
              <option value="mo">Months</option>
            </select>
          </div>
        </div>
      </div>

      <div className="card" style={{ display: 'flex', flexDirection: 'column' }}>
        <h2 style={{ fontSize: '1.25rem', marginBottom: '1.5rem' }}>Calculation Result</h2>
        
        {error && (
          <div style={{ color: '#ef4444', backgroundColor: '#fef2f2', padding: '0.75rem', borderRadius: '0.5rem', marginBottom: '1.5rem', border: '1px solid #f87171', fontSize: '0.875rem' }}>
            {error}
          </div>
        )}

        <div className="result-box" style={{ flexGrow: 1, display: 'flex', flexDirection: 'column', gap: '1rem' }}>
          <div className="result-item" style={{ borderBottom: 'none', padding: 0 }}>
            <span className="result-label" style={{ fontSize: '1.125rem' }}>Monthly EMI</span>
          </div>
          <motion.div 
            key={emi}
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ type: 'spring', stiffness: 200, damping: 10 }}
            className="result-value highlight"
            style={{ fontSize: '2.5rem', marginBottom: '1rem' }}
          >
            {formatCurrency(emi)}
          </motion.div>

          <div style={{ borderTop: '1px solid var(--border-color)', margin: '0.5rem 0' }}></div>

          <div className="result-item">
            <span className="result-label">Principal Amount</span>
            <span className="result-value">{formatCurrency(Number(principal) || 0)}</span>
          </div>
          
          <div className="result-item">
            <span className="result-label">Total Interest</span>
            <span className="result-value">{formatCurrency(totalInterest)}</span>
          </div>
          
          <div className="result-item">
            <span className="result-label">Total Amount</span>
            <span className="result-value">{formatCurrency(totalPayment)}</span>
          </div>
        </div>
      </div>
    </div>
  );
}
