'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { RefreshCw } from 'lucide-react';

export default function SipCalculatorClient() {
  const [investment, setInvestment] = useState<number | ''>('');
  const [rate, setRate] = useState<number | ''>('');
  const [tenure, setTenure] = useState<number | ''>('');

  const [totalInvested, setTotalInvested] = useState<number>(0);
  const [estimatedReturns, setEstimatedReturns] = useState<number>(0);
  const [totalValue, setTotalValue] = useState<number>(0);
  const [error, setError] = useState<string | null>(null);

  // Load saved inputs on mount
  useEffect(() => {
    const saved = localStorage.getItem('sip-inputs');
    if (saved) {
      try {
        const { i, r, t } = JSON.parse(saved);
        if (i) setInvestment(i);
        if (r) setRate(r);
        if (t) setTenure(t);
      } catch (e) {
        // ignore
      }
    }
  }, []);

  // Calculate whenever inputs change
  useEffect(() => {
    calculateSIP();
    // Save to localstorage
    localStorage.setItem('sip-inputs', JSON.stringify({
      i: investment, r: rate, t: tenure
    }));
  }, [investment, rate, tenure]);

  const calculateSIP = () => {
    const p = Number(investment); // monthly investment
    const r = Number(rate); // annual interest rate
    const n = Number(tenure); // tenure in years

    if (investment === '' || rate === '' || tenure === '') {
      setError(null);
      setTotalInvested(0);
      setEstimatedReturns(0);
      setTotalValue(0);
      return;
    }

    if (p <= 0) {
      setError('Monthly investment must be greater than 0.');
      setTotalInvested(0);
      setEstimatedReturns(0);
      setTotalValue(0);
      return;
    }

    if (r <= 0 || r > 100) {
      setError('Expected return rate must be between 0.1 and 100.');
      setTotalInvested(0);
      setEstimatedReturns(0);
      setTotalValue(0);
      return;
    }

    if (n <= 0 || n > 100) {
      setError('Time period must be between 1 and 100 years.');
      setTotalInvested(0);
      setEstimatedReturns(0);
      setTotalValue(0);
      return;
    }

    setError(null);

    const i = r / 100 / 12; // monthly rate of return
    const months = n * 12; // total number of months

    // Future Value of SIP = P × ({[1 + i]n - 1} / i) × (1 + i)
    const futureValue = p * ((Math.pow(1 + i, months) - 1) / i) * (1 + i);
    const investedAmount = p * months;
    const returns = futureValue - investedAmount;

    setTotalInvested(investedAmount);
    setEstimatedReturns(returns);
    setTotalValue(futureValue);
  };

  const handleReset = () => {
    setInvestment('');
    setRate('');
    setTenure('');
    setError(null);
  };

  const formatCurrency = (val: number) => {
    return '₹' + Math.round(val).toLocaleString('en-IN');
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
      <div className="card">
        <h2 style={{ fontSize: '1.25rem', marginBottom: '1.5rem', display: 'flex', justifyContent: 'space-between' }}>
          Investment Details
          <button onClick={handleReset} style={{ background: 'none', border: 'none', cursor: 'pointer', color: 'var(--text-muted)' }} title="Reset">
            <RefreshCw size={18} />
          </button>
        </h2>

        <div className="input-group">
          <label className="input-label">Monthly Investment (₹)</label>
          <input 
            type="number" 
            className="input-field" 
            value={investment} 
            onChange={(e) => setInvestment(e.target.value === '' ? '' : Number(e.target.value))}
            placeholder="e.g. 5000"
          />
        </div>

        <div className="input-group">
          <label className="input-label">Expected Return Rate (% p.a.)</label>
          <input 
            type="number" 
            className="input-field" 
            value={rate} 
            onChange={(e) => setRate(e.target.value === '' ? '' : Number(e.target.value))}
            placeholder="e.g. 12"
            step="0.1"
          />
        </div>

        <div className="input-group">
          <label className="input-label">Time Period (Years)</label>
          <input 
            type="number" 
            className="input-field" 
            value={tenure} 
            onChange={(e) => setTenure(e.target.value === '' ? '' : Number(e.target.value))}
            placeholder="e.g. 10"
          />
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
            <span className="result-label" style={{ fontSize: '1.125rem' }}>Total Value</span>
          </div>
          <motion.div 
            key={totalValue}
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ type: 'spring', stiffness: 200, damping: 10 }}
            className="result-value highlight"
            style={{ fontSize: '2.5rem', marginBottom: '1rem' }}
          >
            {formatCurrency(totalValue)}
          </motion.div>

          <div style={{ borderTop: '1px solid var(--border-color)', margin: '0.5rem 0' }}></div>

          <div className="result-item">
            <span className="result-label">Invested Amount</span>
            <span className="result-value">{formatCurrency(totalInvested)}</span>
          </div>
          
          <div className="result-item">
            <span className="result-label">Est. Returns</span>
            <span className="result-value" style={{ color: 'var(--accent-color)' }}>+{formatCurrency(estimatedReturns)}</span>
          </div>
        </div>
      </div>
    </div>
  );
}
