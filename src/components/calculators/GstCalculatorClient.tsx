'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { RefreshCw } from 'lucide-react';

export default function GstCalculatorClient() {
  const [amount, setAmount] = useState<number | ''>('');
  const [gstRate, setGstRate] = useState<number>(18);
  const [isInclusive, setIsInclusive] = useState<boolean>(false);

  const [gstAmount, setGstAmount] = useState<number>(0);
  const [netAmount, setNetAmount] = useState<number>(0);
  const [totalAmount, setTotalAmount] = useState<number>(0);
  const [error, setError] = useState<string | null>(null);

  // Load saved inputs on mount
  useEffect(() => {
    const saved = localStorage.getItem('gst-inputs');
    if (saved) {
      try {
        const { a, r, inc } = JSON.parse(saved);
        if (a) setAmount(a);
        if (r) setGstRate(r);
        if (inc !== undefined) setIsInclusive(inc);
      } catch (e) {
        // ignore
      }
    }
  }, []);

  // Calculate whenever inputs change
  useEffect(() => {
    calculateGST();
    // Save to localstorage
    localStorage.setItem('gst-inputs', JSON.stringify({
      a: amount, r: gstRate, inc: isInclusive
    }));
  }, [amount, gstRate, isInclusive]);

  const calculateGST = () => {
    const amt = Number(amount);
    const rate = Number(gstRate);

    if (amount === '') {
      setError(null);
      setGstAmount(0);
      setNetAmount(0);
      setTotalAmount(0);
      return;
    }

    if (amt <= 0) {
      setError('Amount must be greater than 0.');
      setGstAmount(0);
      setNetAmount(0);
      setTotalAmount(0);
      return;
    }

    if (rate < 0 || rate > 100) {
      setError('GST rate must be between 0 and 100.');
      setGstAmount(0);
      setNetAmount(0);
      setTotalAmount(0);
      return;
    }

    setError(null);

    if (isInclusive) {
      // GST is already included in the amount
      const baseAmount = amt / (1 + rate / 100);
      const calculatedGst = amt - baseAmount;
      
      setNetAmount(baseAmount);
      setGstAmount(calculatedGst);
      setTotalAmount(amt);
    } else {
      // GST needs to be added
      const calculatedGst = amt * (rate / 100);
      
      setNetAmount(amt);
      setGstAmount(calculatedGst);
      setTotalAmount(amt + calculatedGst);
    }
  };

  const handleReset = () => {
    setAmount('');
    setGstRate(18);
    setIsInclusive(false);
    setError(null);
  };

  const formatCurrency = (val: number) => {
    return '₹' + val.toLocaleString('en-IN', { minimumFractionDigits: 2, maximumFractionDigits: 2 });
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
      <div className="card">
        <h2 style={{ fontSize: '1.25rem', marginBottom: '1.5rem', display: 'flex', justifyContent: 'space-between' }}>
          Tax Details
          <button onClick={handleReset} style={{ background: 'none', border: 'none', cursor: 'pointer', color: 'var(--text-muted)' }} title="Reset">
            <RefreshCw size={18} />
          </button>
        </h2>

        <div className="input-group">
          <label className="input-label">Amount (₹)</label>
          <input 
            type="number" 
            className="input-field" 
            value={amount} 
            onChange={(e) => setAmount(e.target.value === '' ? '' : Number(e.target.value))}
            placeholder="e.g. 1000"
          />
        </div>

        <div className="input-group">
          <label className="input-label">GST Rate (%)</label>
          <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap' }}>
            {[3, 5, 12, 18, 28].map(rate => (
              <button
                key={rate}
                onClick={() => setGstRate(rate)}
                className={gstRate === rate ? 'btn-primary' : 'btn-secondary'}
                style={{ padding: '0.5rem 1rem', flex: 1, minWidth: '60px' }}
              >
                {rate}%
              </button>
            ))}
          </div>
        </div>

        <div className="input-group" style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', marginTop: '1.5rem', padding: '1rem', backgroundColor: 'var(--bg-primary)', borderRadius: '0.5rem' }}>
          <div>
            <label className="input-label" style={{ marginBottom: 0 }}>GST Inclusive?</label>
            <p style={{ margin: 0, fontSize: '0.75rem', color: 'var(--text-muted)' }}>Is GST already added?</p>
          </div>
          <label className="toggle-switch">
            <input 
              type="checkbox" 
              checked={isInclusive} 
              onChange={(e) => setIsInclusive(e.target.checked)} 
            />
            <span className="slider"></span>
          </label>
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
          <div className="result-item">
            <span className="result-label">Net Amount (without GST)</span>
            <span className="result-value">{formatCurrency(netAmount)}</span>
          </div>
          
          <div className="result-item">
            <span className="result-label">GST Amount ({gstRate}%)</span>
            <span className="result-value" style={{ color: 'var(--accent-color)' }}>+{formatCurrency(gstAmount)}</span>
          </div>

          <div style={{ borderTop: '1px solid var(--border-color)', margin: '0.5rem 0' }}></div>

          <div className="result-item" style={{ borderBottom: 'none', padding: 0 }}>
            <span className="result-label" style={{ fontSize: '1.125rem' }}>Total Amount</span>
          </div>
          <motion.div 
            key={totalAmount}
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ type: 'spring', stiffness: 200, damping: 10 }}
            className="result-value highlight"
            style={{ fontSize: '2.5rem', marginBottom: '1rem' }}
          >
            {formatCurrency(totalAmount)}
          </motion.div>
        </div>
      </div>
    </div>
  );
}
