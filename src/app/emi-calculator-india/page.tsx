import { Metadata } from 'next';
import Link from 'next/link';
import { ArrowLeft } from 'lucide-react';
import EmiCalculatorClient from '@/components/calculators/EmiCalculatorClient';

export const metadata: Metadata = {
  title: 'EMI Calculator India – Calculate Home, Car & Personal Loan EMI',
  description: 'Free EMI Calculator for India. Instantly calculate Equated Monthly Installment (EMI) for home, car, or personal loans. View total interest and payment schedule.',
  alternates: {
    canonical: '/emi-calculator-india',
  },
};

export default function EMICalculatorPage() {
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'WebApplication',
    name: 'EMI Calculator India',
    url: 'https://calculator-kappa-inky-48.vercel.app/emi-calculator-india', // Update this with your actual domain later
    applicationCategory: 'FinanceApplication',
    operatingSystem: 'All',
    description: 'Calculate your Equated Monthly Installment (EMI) for home, car, or personal loans instantly in India.',
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
        <h1 className="text-center mb-4">EMI Calculator India</h1>
        <p className="text-center mb-8">Calculate your Equated Monthly Installment (EMI) for home, car, or personal loans instantly.</p>

        <EmiCalculatorClient />

        <article className="seo-content card mt-8">
          <section>
            <h2>What is an EMI Calculator?</h2>
            <p>An EMI (Equated Monthly Installment) Calculator is a smart financial tool designed to help you calculate the monthly amount payable to a lender (bank or NBFC) against your loan. Whether you are planning to buy a new house, a car, or taking a personal loan for emergencies, calculating your EMI beforehand gives you a clear picture of your monthly financial commitment.</p>
          </section>

          <section className="mt-6">
            <h2>How Does the EMI Calculator Work?</h2>
            <p>Our online EMI Calculator uses a standard mathematical formula to determine your monthly payments. The formula is:</p>
            <div style={{ backgroundColor: 'var(--bg-primary)', padding: '1rem', borderRadius: '0.5rem', margin: '1rem 0' }}>
              <strong>E = P × r × (1 + r)^n / ((1 + r)^n - 1)</strong>
            </div>
            <ul style={{ paddingLeft: '1.5rem', color: 'var(--text-secondary)', marginBottom: '1.5rem' }}>
              <li><strong>E</strong> is the EMI (Equated Monthly Installment).</li>
              <li><strong>P</strong> is the Principal Loan Amount.</li>
              <li><strong>r</strong> is the monthly interest rate (Annual Rate / 12 / 100).</li>
              <li><strong>n</strong> is the loan tenure in months.</li>
            </ul>
            <p>Instead of doing these complex calculations manually, our tool instantly provides accurate results, including the total interest payable and the overall cost of the loan.</p>
          </section>

          <section className="mt-6">
            <h2>Benefits of Using Our EMI Calculator</h2>
            <ul style={{ paddingLeft: '1.5rem', color: 'var(--text-secondary)', marginBottom: '1.5rem' }}>
              <li><strong>Financial Planning:</strong> Knowing your exact monthly outflow helps you plan your budget effectively.</li>
              <li><strong>Compare Loan Offers:</strong> You can adjust the interest rate and tenure to compare loans from different banks and choose the most cost-effective option.</li>
              <li><strong>Accuracy and Speed:</strong> Eliminates human error and gives instantaneous results, saving you valuable time.</li>
              <li><strong>Complete Transparency:</strong> See exactly how much extra money you are paying as interest over the life of the loan.</li>
            </ul>
          </section>

          <section className="mt-6">
            <h2>Frequently Asked Questions (FAQs)</h2>
            <div style={{ marginTop: '1rem' }}>
              <h3 style={{ fontSize: '1.125rem', fontWeight: 600 }}>1. Does the EMI amount change during the loan tenure?</h3>
              <p>If you opt for a fixed interest rate loan, your EMI remains constant throughout the tenure. However, if you choose a floating interest rate, your EMI or loan tenure may change based on the RBI repo rate adjustments and your bank's policies.</p>
              
              <h3 style={{ fontSize: '1.125rem', fontWeight: 600, marginTop: '1rem' }}>2. Can I prepay my loan to reduce my EMI?</h3>
              <p>Yes, making a partial prepayment reduces your outstanding principal. You can then choose to either reduce your monthly EMI amount or shorten your remaining loan tenure while keeping the EMI the same.</p>

              <h3 style={{ fontSize: '1.125rem', fontWeight: 600, marginTop: '1rem' }}>3. How can I lower my loan EMI?</h3>
              <p>You can lower your EMI by opting for a longer loan tenure, negotiating a lower interest rate with your lender, or making a larger down payment upfront to reduce the principal loan amount.</p>
            </div>
          </section>

          <section className="mt-8 border-t pt-6" style={{ borderTop: '1px solid var(--border-color)', paddingTop: '1.5rem' }}>
            <h2>Try Our Other Financial Calculators</h2>
            <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap', marginTop: '1rem' }}>
              <Link href="/gst-calculator" style={{ color: 'var(--accent-color)', fontWeight: 500, textDecoration: 'underline' }}>GST Calculator</Link>
              <Link href="/sip-calculator" style={{ color: 'var(--accent-color)', fontWeight: 500, textDecoration: 'underline' }}>SIP Calculator</Link>
              <Link href="/discount-calculator" style={{ color: 'var(--accent-color)', fontWeight: 500, textDecoration: 'underline' }}>Discount Calculator</Link>
            </div>
          </section>
        </article>
      </div>
    </div>
  );
}
