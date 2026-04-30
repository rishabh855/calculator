'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Calculator, Moon, Sun, Menu, X } from 'lucide-react';
import { useTheme } from './ThemeProvider';
import { useState } from 'react';

export default function Navbar() {
  const { theme, toggleTheme } = useTheme();
  const pathname = usePathname();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const links = [
    { name: 'Home', href: '/' },
    { name: 'EMI Calc', href: '/emi-calculator-india' },
    { name: 'GST Calc', href: '/gst-calculator' },
    { name: 'SIP Calc', href: '/sip-calculator' },
    { name: 'Discount', href: '/discount-calculator' },
  ];

  return (
    <nav style={{ 
      backgroundColor: 'var(--bg-secondary)', 
      borderBottom: '1px solid var(--border-color)',
      position: 'sticky',
      top: 0,
      zIndex: 50
    }}>
      <div className="container" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', height: '4rem' }}>
        <Link href="/" style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', fontWeight: 700, fontSize: '1.25rem' }}>
          <Calculator color="var(--accent-color)" size={24} />
          SmartCalc<span style={{ color: 'var(--accent-color)' }}>India</span>
        </Link>

        {/* Desktop Nav */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '2rem' }} className="hidden-mobile">
          <div style={{ display: 'flex', gap: '1.5rem' }}>
            {links.map((link) => (
              <Link 
                key={link.href} 
                href={link.href}
                style={{
                  fontWeight: 500,
                  fontSize: '0.9rem',
                  color: pathname === link.href ? 'var(--accent-color)' : 'var(--text-secondary)',
                  transition: 'color 0.2s ease'
                }}
              >
                {link.name}
              </Link>
            ))}
          </div>
          
          <button 
            onClick={toggleTheme} 
            className="btn-secondary"
            style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '0.5rem', borderRadius: '50%' }}
            aria-label="Toggle theme"
          >
            {theme === 'dark' ? <Sun size={20} /> : <Moon size={20} />}
          </button>
        </div>

        {/* Mobile Menu Toggle */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }} className="mobile-only">
          <button 
            onClick={toggleTheme} 
            style={{ background: 'none', border: 'none', color: 'var(--text-primary)', cursor: 'pointer' }}
            aria-label="Toggle theme"
          >
            {theme === 'dark' ? <Sun size={20} /> : <Moon size={20} />}
          </button>
          <button 
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            style={{ background: 'none', border: 'none', color: 'var(--text-primary)', cursor: 'pointer' }}
          >
            {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      {/* Mobile Nav */}
      {isMenuOpen && (
        <div style={{ 
          backgroundColor: 'var(--bg-secondary)', 
          borderBottom: '1px solid var(--border-color)',
          padding: '1rem',
          display: 'flex',
          flexDirection: 'column',
          gap: '1rem'
        }}>
          {links.map((link) => (
            <Link 
              key={link.href} 
              href={link.href}
              onClick={() => setIsMenuOpen(false)}
              style={{
                fontWeight: 500,
                padding: '0.5rem 0',
                color: pathname === link.href ? 'var(--accent-color)' : 'var(--text-secondary)',
              }}
            >
              {link.name}
            </Link>
          ))}
        </div>
      )}
      
      {/* Quick hack for mobile visibility without global.css classes if they don't apply */}
      <style dangerouslySetInnerHTML={{__html: `
        @media (min-width: 768px) {
          .mobile-only { display: none !important; }
        }
        @media (max-width: 767px) {
          .hidden-mobile { display: none !important; }
        }
      `}} />
    </nav>
  );
}
