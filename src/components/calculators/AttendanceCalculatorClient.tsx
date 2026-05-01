'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { RefreshCw } from 'lucide-react';

export default function AttendanceCalculatorClient() {
  const [present, setPresent] = useState<number | ''>('');
  const [total, setTotal] = useState<number | ''>('');
  const [target, setTarget] = useState<number | ''>(75);

  const [currentPercentage, setCurrentPercentage] = useState<number>(0);
  const [status, setStatus] = useState<'short' | 'safe' | null>(null);
  const [classesToAttend, setClassesToAttend] = useState<number>(0);
  const [classesToBunk, setClassesToBunk] = useState<number>(0);
  const [projectedPercentage, setProjectedPercentage] = useState<number>(0);
  const [projectedPresent, setProjectedPresent] = useState<number>(0);
  const [projectedTotal, setProjectedTotal] = useState<number>(0);
  const [error, setError] = useState<string | null>(null);

  // Load saved inputs on mount
  useEffect(() => {
    const saved = localStorage.getItem('attendance-inputs');
    if (saved) {
      try {
        const { p, t, tgt } = JSON.parse(saved);
        if (p !== undefined) setPresent(p);
        if (t !== undefined) setTotal(t);
        if (tgt !== undefined) setTarget(tgt);
      } catch (e) {
        // ignore
      }
    }
  }, []);

  // Calculate whenever inputs change
  useEffect(() => {
    calculateAttendance();
    // Save to localstorage
    localStorage.setItem('attendance-inputs', JSON.stringify({
      p: present, t: total, tgt: target
    }));
  }, [present, total, target]);

  const calculateAttendance = () => {
    const p = Number(present);
    const t = Number(total);
    const tgt = Number(target);

    if (present === '' || total === '' || target === '') {
      setError(null);
      setCurrentPercentage(0);
      setStatus(null);
      return;
    }

    if (p < 0 || t <= 0) {
      setError('Classes must be positive numbers. Total cannot be 0.');
      setCurrentPercentage(0);
      setStatus(null);
      return;
    }

    if (p > t) {
      setError('Present classes cannot be greater than total classes.');
      setCurrentPercentage(0);
      setStatus(null);
      return;
    }

    if (tgt <= 0 || tgt > 100) {
      setError('Target percentage must be between 1 and 100.');
      setCurrentPercentage(0);
      setStatus(null);
      return;
    }

    setError(null);

    const currentPerc = (p / t) * 100;
    setCurrentPercentage(currentPerc);

    if (currentPerc < tgt) {
      // Need to attend more classes
      // Formula: (p + x) / (t + x) = tgt / 100
      // 100p + 100x = tgt*t + tgt*x
      // x(100 - tgt) = tgt*t - 100p
      // x = (tgt*t - 100p) / (100 - tgt)
      
      if (tgt === 100) {
        setStatus('short');
        setClassesToAttend(Infinity); // Can never reach 100% if already below
        setProjectedPresent(p);
        setProjectedTotal(t);
        setProjectedPercentage(currentPerc);
      } else {
        const req = Math.ceil((tgt * t - 100 * p) / (100 - tgt));
        setStatus('short');
        setClassesToAttend(req);
        
        const finalP = p + req;
        const finalT = t + req;
        setProjectedPresent(finalP);
        setProjectedTotal(finalT);
        setProjectedPercentage((finalP / finalT) * 100);
      }
    } else {
      // Safe, can bunk classes
      // Formula: p / (t + x) = tgt / 100
      // 100p = tgt*t + tgt*x
      // tgt*x = 100p - tgt*t
      // x = (100p - tgt*t) / tgt
      
      const bunkable = Math.floor((100 * p - tgt * t) / tgt);
      setStatus('safe');
      setClassesToBunk(bunkable);
      
      const finalP = p;
      const finalT = t + bunkable;
      setProjectedPresent(finalP);
      setProjectedTotal(finalT);
      setProjectedPercentage(finalT === 0 ? 0 : (finalP / finalT) * 100);
    }
  };

  const handleReset = () => {
    setPresent('');
    setTotal('');
    setTarget(75);
    setError(null);
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
      <div className="card">
        <h2 style={{ fontSize: '1.25rem', marginBottom: '1.5rem', display: 'flex', justifyContent: 'space-between' }}>
          Class Details
          <button onClick={handleReset} style={{ background: 'none', border: 'none', cursor: 'pointer', color: 'var(--text-muted)' }} title="Reset">
            <RefreshCw size={18} />
          </button>
        </h2>

        <div className="input-group">
          <label className="input-label">Classes Attended</label>
          <input 
            type="number" 
            className="input-field" 
            value={present} 
            onChange={(e) => setPresent(e.target.value === '' ? '' : Number(e.target.value))}
            placeholder="e.g. 35"
          />
        </div>

        <div className="input-group">
          <label className="input-label">Total Classes Held</label>
          <input 
            type="number" 
            className="input-field" 
            value={total} 
            onChange={(e) => setTotal(e.target.value === '' ? '' : Number(e.target.value))}
            placeholder="e.g. 50"
          />
        </div>

        <div className="input-group">
          <label className="input-label">Target Attendance (%)</label>
          <input 
            type="number" 
            className="input-field" 
            value={target} 
            onChange={(e) => setTarget(e.target.value === '' ? '' : Number(e.target.value))}
            placeholder="e.g. 75"
            step="1"
            max="100"
          />
          <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap', marginTop: '0.75rem' }}>
            {[65, 75, 80, 85, 90].map(rate => (
              <button
                key={rate}
                onClick={() => setTarget(rate)}
                className={target === rate ? 'btn-primary' : 'btn-secondary'}
                style={{ padding: '0.25rem 0.5rem', flex: 1, minWidth: '40px', fontSize: '0.75rem' }}
              >
                {rate}%
              </button>
            ))}
          </div>
        </div>
      </div>

      <div className="card" style={{ display: 'flex', flexDirection: 'column' }}>
        <h2 style={{ fontSize: '1.25rem', marginBottom: '1.5rem' }}>Attendance Status</h2>
        
        {error && (
          <div style={{ color: '#ef4444', backgroundColor: '#fef2f2', padding: '0.75rem', borderRadius: '0.5rem', marginBottom: '1.5rem', border: '1px solid #f87171', fontSize: '0.875rem' }}>
            {error}
          </div>
        )}

        {status && !error && (
          <div className="result-box" style={{ flexGrow: 1, display: 'flex', flexDirection: 'column', gap: '1rem' }}>
            <div className="result-item" style={{ borderBottom: 'none', padding: 0 }}>
              <span className="result-label" style={{ fontSize: '1.125rem' }}>Current Attendance</span>
            </div>
            <motion.div 
              key={currentPercentage}
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ type: 'spring', stiffness: 200, damping: 10 }}
              className="result-value"
              style={{ fontSize: '2.5rem', marginBottom: '0.5rem', color: currentPercentage >= Number(target) ? '#10b981' : '#ef4444', fontWeight: 700 }}
            >
              {currentPercentage.toFixed(2)}%
            </motion.div>

            <div style={{ borderTop: '1px solid var(--border-color)', margin: '0.5rem 0' }}></div>

            {status === 'short' ? (
              <div style={{ backgroundColor: 'rgba(239, 68, 68, 0.1)', padding: '1rem', borderRadius: '0.5rem', border: '1px solid rgba(239, 68, 68, 0.2)' }}>
                <p style={{ margin: 0, fontWeight: 500, color: '#ef4444' }}>
                  {classesToAttend === Infinity ? "You can't reach 100% attendance anymore." : `You need to attend the next ${classesToAttend} classes to get back on track.`}
                </p>
              </div>
            ) : (
              <div style={{ backgroundColor: 'rgba(16, 185, 129, 0.1)', padding: '1rem', borderRadius: '0.5rem', border: '1px solid rgba(16, 185, 129, 0.2)' }}>
                <p style={{ margin: 0, fontWeight: 500, color: '#10b981' }}>
                  {classesToBunk === 0 ? "You are exactly on target. You cannot bunk any classes." : `You can safely bunk the next ${classesToBunk} classes.`}
                </p>
              </div>
            )}

            {(status === 'short' && classesToAttend !== Infinity) || (status === 'safe' && classesToBunk > 0) ? (
              <>
                <div style={{ borderTop: '1px solid var(--border-color)', margin: '0.5rem 0' }}></div>
                <div style={{ padding: '0.5rem 0' }}>
                  <p style={{ margin: '0 0 0.5rem 0', fontWeight: 600, fontSize: '0.875rem', color: 'var(--text-secondary)' }}>Projected Attendance afterward:</p>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <span style={{ fontSize: '0.875rem' }}>{projectedPresent} / {projectedTotal} classes</span>
                    <span style={{ fontWeight: 600, color: projectedPercentage >= Number(target) ? '#10b981' : '#ef4444' }}>{projectedPercentage.toFixed(2)}%</span>
                  </div>
                </div>
              </>
            ) : null}

          </div>
        )}
        {!status && !error && (
           <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', height: '100%', color: 'var(--text-muted)' }}>
             Enter your classes to see your status
           </div>
        )}
      </div>
    </div>
  );
}
