'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { RefreshCw, ArrowLeft } from 'lucide-react';
import Link from 'next/link';

export default function SIPCalculator() {
  const [investment, setInvestment] = useState<number | ''>('');
  const [rate, setRate] = useState<number | ''>('');
  const [tenure, setTenure] = useState<number | ''>('');

  const [totalInvested, setTotalInvested] = useState<number>(0);
  const [estimatedReturns, setEstimatedReturns] = useState<number>(0);
  const [totalValue, setTotalValue] = useState<number>(0);

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

    if (p <= 0 || r <= 0 || n <= 0) {
      setTotalInvested(0);
      setEstimatedReturns(0);
      setTotalValue(0);
      return;
    }

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
  };

  const formatCurrency = (val: number) => {
    return '₹' + Math.round(val).toLocaleString('en-IN');
  };

  return (
    <div className="container" style={{ maxWidth: '900px' }}>
      <title>SIP Calculator India – Estimate Mutual Fund Returns</title>
      <meta name="description" content="Free SIP Return Calculator. Calculate the future value of your monthly SIP investments in mutual funds accurately." />

      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <Link href="/" style={{ display: 'inline-flex', alignItems: 'center', gap: '0.5rem', color: 'var(--text-secondary)', marginBottom: '1rem', fontWeight: 500, transition: 'color 0.2s ease' }} onMouseOver={(e) => e.currentTarget.style.color = 'var(--text-primary)'} onMouseOut={(e) => e.currentTarget.style.color = 'var(--text-secondary)'}>
          <ArrowLeft size={18} /> Back to Home
        </Link>
        <h1 className="text-center mb-4">SIP Calculator</h1>
        <p className="text-center mb-8">Calculate the estimated returns on your monthly Mutual Fund investments.</p>

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

        <div className="card mt-8">
          <h3>What is a SIP?</h3>
          <p>A Systematic Investment Plan (SIP) is a facility offered by mutual funds to investors to invest in a disciplined manner. It allows an investor to invest a fixed amount of money at pre-defined intervals in the selected mutual fund scheme.</p>
          
          <h3>How do SIP Calculators work?</h3>
          <p>The SIP calculator uses the compound interest formula to estimate the future value of your investments. The formula is: <strong>FV = P × ({'{'}[1 + r] ^ n - 1{'}'} / r) × (1 + r)</strong></p>
          <ul style={{ paddingLeft: '1.5rem', color: 'var(--text-secondary)', marginBottom: '1.5rem' }}>
            <li><strong>FV</strong> = Future Value of the investment.</li>
            <li><strong>P</strong> = The amount invested per month.</li>
            <li><strong>r</strong> = The expected monthly rate of return (Annual Rate / 12 / 100).</li>
            <li><strong>n</strong> = Number of monthly investments.</li>
          </ul>

          <p style={{ fontSize: '0.875rem', color: 'var(--text-muted)' }}>* Mutual fund investments are subject to market risks. Please read all scheme related documents carefully before investing. The calculator provides an estimate and does not guarantee returns.</p>
        </div>
      </motion.div>
    </div>
  );
}
