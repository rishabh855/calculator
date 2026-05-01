import { Metadata } from 'next';
import Link from 'next/link';
import { ArrowLeft } from 'lucide-react';
import SipCalculatorClient from '@/components/calculators/SipCalculatorClient';

export const metadata: Metadata = {
  title: 'SIP Calculator India – Estimate Mutual Fund SIP Returns Online',
  description: 'Free Mutual Fund SIP Return Calculator. Calculate the future value of your monthly SIP investments with compounding benefits accurately.',
  alternates: {
    canonical: '/sip-calculator',
  },
};

export default function SIPCalculatorPage() {
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'WebApplication',
    name: 'SIP Calculator India',
    url: 'https://calculator-kappa-inky-48.vercel.app/sip-calculator', // Update this with your actual domain later
    applicationCategory: 'FinanceApplication',
    operatingSystem: 'All',
    description: 'Calculate the estimated returns on your monthly Mutual Fund Systematic Investment Plan (SIP).',
  };

  return (
    <div className="container" style={{ maxWidth: '900px' }}>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      
      <div>
        <Link href="/" style={{ display: 'inline-flex', alignItems: 'center', gap: '0.5rem', color: 'var(--text-secondary)', marginBottom: '1rem', fontWeight: 500, transition: 'color 0.2s ease' }}>
          <ArrowLeft size={18} /> Back to Home
        </Link>
        <h1 className="text-center mb-4">SIP Calculator</h1>
        <p className="text-center mb-8">Calculate the estimated returns on your monthly Mutual Fund investments.</p>

        <SipCalculatorClient />

        <article className="seo-content card mt-8">
          <section>
            <h2>What is a SIP?</h2>
            <p>A Systematic Investment Plan (SIP) is a facility offered by mutual funds to investors to invest in a disciplined manner. It allows an investor to invest a fixed amount of money at pre-defined intervals (such as monthly or quarterly) in the selected mutual fund scheme, rather than making a large lump-sum investment.</p>
          </section>

          <section className="mt-6">
            <h2>How do SIP Calculators work?</h2>
            <p>The SIP calculator uses the compound interest formula to estimate the future value of your investments. The formula is:</p>
            <div style={{ backgroundColor: 'var(--bg-primary)', padding: '1rem', borderRadius: '0.5rem', margin: '1rem 0' }}>
              <strong>FV = P × [((1 + r)^n - 1) / r] × (1 + r)</strong>
            </div>
            <ul style={{ paddingLeft: '1.5rem', color: 'var(--text-secondary)', marginBottom: '1.5rem' }}>
              <li><strong>FV</strong> = Future Value of the investment.</li>
              <li><strong>P</strong> = The amount invested per month.</li>
              <li><strong>r</strong> = The expected monthly rate of return (Annual Rate / 12 / 100).</li>
              <li><strong>n</strong> = Total number of monthly investments.</li>
            </ul>
            <p style={{ fontSize: '0.875rem', color: 'var(--text-muted)' }}>* Mutual fund investments are subject to market risks. Please read all scheme related documents carefully before investing. The calculator provides an estimate and does not guarantee returns.</p>
          </section>

          <section className="mt-6">
            <h2>Benefits of SIP Investments</h2>
            <ul style={{ paddingLeft: '1.5rem', color: 'var(--text-secondary)', marginBottom: '1.5rem' }}>
              <li><strong>Rupee Cost Averaging:</strong> You buy more units when the market is low and fewer units when the market is high, averaging out the cost of your investment.</li>
              <li><strong>Power of Compounding:</strong> Reinvesting your returns creates a compounding effect, significantly growing your wealth over the long term.</li>
              <li><strong>Discipline:</strong> Instills financial discipline as a fixed sum is automatically invested every month.</li>
              <li><strong>Convenience:</strong> You can start with a very small amount, often as low as ₹500 per month.</li>
            </ul>
          </section>

          <section className="mt-6">
            <h2>Frequently Asked Questions (FAQs)</h2>
            <div style={{ marginTop: '1rem' }}>
              <h3 style={{ fontSize: '1.125rem', fontWeight: 600 }}>1. What is the minimum amount required to start a SIP?</h3>
              <p>You can start a Systematic Investment Plan with as little as ₹500 per month in most mutual fund schemes in India.</p>
              
              <h3 style={{ fontSize: '1.125rem', fontWeight: 600, marginTop: '1rem' }}>2. Can I stop or pause my SIP?</h3>
              <p>Yes, SIPs are highly flexible. You can pause, stop, or cancel your SIP anytime without any penalty. However, to get the best compounding benefits, it is recommended to continue for the long term.</p>

              <h3 style={{ fontSize: '1.125rem', fontWeight: 600, marginTop: '1rem' }}>3. How is the return on SIP calculated?</h3>
              <p>SIP returns are generally calculated using the XIRR (Extended Internal Rate of Return) method because multiple investments are made at different times. Our calculator provides a future value estimate based on a fixed expected annual return rate.</p>
            </div>
          </section>

          <section className="mt-8 border-t pt-6" style={{ borderTop: '1px solid var(--border-color)', paddingTop: '1.5rem' }}>
            <h2>Try Our Other Financial Calculators</h2>
            <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap', marginTop: '1rem' }}>
              <Link href="/emi-calculator-india" style={{ color: 'var(--accent-color)', fontWeight: 500, textDecoration: 'underline' }}>EMI Calculator</Link>
              <Link href="/gst-calculator" style={{ color: 'var(--accent-color)', fontWeight: 500, textDecoration: 'underline' }}>GST Calculator</Link>
              <Link href="/discount-calculator" style={{ color: 'var(--accent-color)', fontWeight: 500, textDecoration: 'underline' }}>Discount Calculator</Link>
            </div>
          </section>
        </article>
      </div>
    </div>
  );
}
