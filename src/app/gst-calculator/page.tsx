'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { RefreshCw, ArrowLeft } from 'lucide-react';
import Link from 'next/link';

export default function GSTCalculator() {
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
    <div className="container" style={{ maxWidth: '900px' }}>
      <title>GST Calculator India – Calculate GST (Inclusive & Exclusive)</title>
      <meta name="description" content="Calculate GST amount and final price instantly. Supports both GST Inclusive and Exclusive calculations for Indian tax rates." />

      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <Link href="/" style={{ display: 'inline-flex', alignItems: 'center', gap: '0.5rem', color: 'var(--text-secondary)', marginBottom: '1rem', fontWeight: 500, transition: 'color 0.2s ease' }} onMouseOver={(e) => e.currentTarget.style.color = 'var(--text-primary)'} onMouseOut={(e) => e.currentTarget.style.color = 'var(--text-secondary)'}>
          <ArrowLeft size={18} /> Back to Home
        </Link>
        <h1 className="text-center mb-4">GST Calculator</h1>
        <p className="text-center mb-8">Quickly calculate Goods and Services Tax (GST) to find net and gross prices.</p>

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

        <div className="card mt-8">
          <h3>How to calculate GST?</h3>
          <p><strong>Add GST:</strong></p>
          <ul style={{ paddingLeft: '1.5rem', color: 'var(--text-secondary)', marginBottom: '1rem' }}>
            <li>GST Amount = (Original Cost × GST %) / 100</li>
            <li>Net Price = Original Cost + GST Amount</li>
          </ul>
          
          <p><strong>Remove GST (Inclusive):</strong></p>
          <ul style={{ paddingLeft: '1.5rem', color: 'var(--text-secondary)', marginBottom: '1.5rem' }}>
            <li>GST Amount = Original Cost - [Original Cost × {100 / (100 + gstRate)}]</li>
            <li>Net Price = Original Cost - GST Amount</li>
          </ul>

          <h3>What is GST?</h3>
          <p>Goods and Services Tax (GST) is an indirect tax (or consumption tax) used in India on the supply of goods and services. It is a comprehensive, multistage, destination-based tax.</p>
        </div>
      </motion.div>
    </div>
  );
}
