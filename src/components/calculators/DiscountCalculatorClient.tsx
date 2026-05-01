'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { RefreshCw } from 'lucide-react';

export default function DiscountCalculatorClient() {
  const [price, setPrice] = useState<number | ''>('');
  const [discount, setDiscount] = useState<number | ''>('');

  const [finalPrice, setFinalPrice] = useState<number>(0);
  const [savings, setSavings] = useState<number>(0);
  const [error, setError] = useState<string | null>(null);

  // Load saved inputs on mount
  useEffect(() => {
    const saved = localStorage.getItem('discount-inputs');
    if (saved) {
      try {
        const { p, d } = JSON.parse(saved);
        if (p) setPrice(p);
        if (d) setDiscount(d);
      } catch (e) {
        // ignore
      }
    }
  }, []);

  // Calculate whenever inputs change
  useEffect(() => {
    calculateDiscount();
    // Save to localstorage
    localStorage.setItem('discount-inputs', JSON.stringify({
      p: price, d: discount
    }));
  }, [price, discount]);

  const calculateDiscount = () => {
    const p = Number(price);
    const d = Number(discount);

    if (price === '' || discount === '') {
      setError(null);
      setFinalPrice(0);
      setSavings(0);
      return;
    }

    if (p < 0) {
      setError('Original price cannot be negative.');
      setFinalPrice(0);
      setSavings(0);
      return;
    }

    if (d < 0 || d > 100) {
      setError('Discount percentage must be between 0 and 100.');
      setFinalPrice(0);
      setSavings(0);
      return;
    }

    setError(null);
    const calculatedSavings = p * (d / 100);
    const calculatedFinalPrice = p - calculatedSavings;

    setSavings(calculatedSavings);
    setFinalPrice(calculatedFinalPrice);
  };

  const handleReset = () => {
    setPrice('');
    setDiscount('');
    setError(null);
  };

  const formatCurrency = (val: number) => {
    return '₹' + val.toLocaleString('en-IN', { minimumFractionDigits: 0, maximumFractionDigits: 2 });
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
      <div className="card">
        <h2 style={{ fontSize: '1.25rem', marginBottom: '1.5rem', display: 'flex', justifyContent: 'space-between' }}>
          Price Details
          <button onClick={handleReset} style={{ background: 'none', border: 'none', cursor: 'pointer', color: 'var(--text-muted)' }} title="Reset">
            <RefreshCw size={18} />
          </button>
        </h2>

        <div className="input-group">
          <label className="input-label">Original Price (₹)</label>
          <input 
            type="number" 
            className="input-field" 
            value={price} 
            onChange={(e) => setPrice(e.target.value === '' ? '' : Number(e.target.value))}
            placeholder="e.g. 1000"
          />
        </div>

        <div className="input-group">
          <label className="input-label">Discount Percentage (%)</label>
          <input 
            type="number" 
            className="input-field" 
            value={discount} 
            onChange={(e) => setDiscount(e.target.value === '' ? '' : Number(e.target.value))}
            placeholder="e.g. 20"
            step="0.1"
            max="100"
          />
          <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap', marginTop: '0.75rem' }}>
            {[10, 15, 20, 30, 50].map(rate => (
              <button
                key={rate}
                onClick={() => setDiscount(rate)}
                className={discount === rate ? 'btn-primary' : 'btn-secondary'}
                style={{ padding: '0.25rem 0.5rem', flex: 1, minWidth: '40px', fontSize: '0.75rem' }}
              >
                {rate}%
              </button>
            ))}
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
            <span className="result-label" style={{ fontSize: '1.125rem' }}>Final Price</span>
          </div>
          <motion.div 
            key={finalPrice}
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ type: 'spring', stiffness: 200, damping: 10 }}
            className="result-value highlight"
            style={{ fontSize: '2.5rem', marginBottom: '1rem' }}
          >
            {formatCurrency(finalPrice)}
          </motion.div>

          <div style={{ borderTop: '1px solid var(--border-color)', margin: '0.5rem 0' }}></div>

          <div className="result-item">
            <span className="result-label">Original Price</span>
            <span className="result-value" style={{ textDecoration: 'line-through', color: 'var(--text-muted)' }}>{formatCurrency(Number(price) || 0)}</span>
          </div>
          
          <div className="result-item">
            <span className="result-label">You Save</span>
            <span className="result-value" style={{ color: '#10b981' }}>{formatCurrency(savings)}</span>
          </div>
        </div>
      </div>
    </div>
  );
}
