import { Metadata } from 'next';
import Link from 'next/link';
import { ArrowLeft } from 'lucide-react';
import GstCalculatorClient from '@/components/calculators/GstCalculatorClient';

export const metadata: Metadata = {
  title: 'GST Calculator India – Calculate GST Inclusive & Exclusive Online',
  description: 'Free GST Calculator for India. Quickly calculate Goods and Services Tax to find net and gross prices. Supports both GST Inclusive and Exclusive calculations.',
  alternates: {
    canonical: '/gst-calculator',
  },
};

export default function GSTCalculatorPage() {
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'WebApplication',
    name: 'GST Calculator India',
    url: 'https://calculator-kappa-inky-48.vercel.app/gst-calculator', // Update this with your actual domain later
    applicationCategory: 'FinanceApplication',
    operatingSystem: 'All',
    description: 'Quickly calculate Goods and Services Tax (GST) to find net and gross prices for Indian tax rates.',
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
        <h1 className="text-center mb-4">GST Calculator India</h1>
        <p className="text-center mb-8">Quickly calculate Goods and Services Tax (GST) to find net and gross prices.</p>

        <GstCalculatorClient />

        <article className="seo-content card mt-8">
          <section>
            <h2>What is a GST Calculator?</h2>
            <p>A GST Calculator is an essential utility that helps buyers, sellers, and businesses calculate the exact Goods and Services Tax (GST) amount for any product or service. Introduced in India, GST is an indirect tax that has replaced many indirect taxes in India such as the excise duty, VAT, services tax, etc. The Goods and Service Tax Act was passed in the Parliament on 29th March 2017 and came into effect on 1st July 2017.</p>
          </section>

          <section className="mt-6">
            <h2>How to Use the GST Calculator?</h2>
            <p>Our tool supports two modes of GST calculation to make your billing and accounting process effortless:</p>
            <ul style={{ paddingLeft: '1.5rem', color: 'var(--text-secondary)', marginBottom: '1.5rem' }}>
              <li><strong>Adding GST (Exclusive):</strong> Use this when you have the base price and need to add GST to find the final selling price. The formula is: <code>GST Amount = (Original Cost × GST %) / 100</code></li>
              <li><strong>Removing GST (Inclusive):</strong> Use this when the price already includes GST and you need to find out the base price before taxes. The formula is: <code>Base Price = Original Cost - [Original Cost × (100 / (100 + GST %))]</code></li>
            </ul>
            <p>Simply enter the amount, select the appropriate GST rate slab (3%, 5%, 12%, 18%, or 28%), and toggle the inclusive/exclusive switch to get instant results.</p>
          </section>

          <section className="mt-6">
            <h2>Benefits of Using Our GST Calculator</h2>
            <ul style={{ paddingLeft: '1.5rem', color: 'var(--text-secondary)', marginBottom: '1.5rem' }}>
              <li><strong>Saves Time:</strong> Quickly compute taxes for invoicing without manual calculations.</li>
              <li><strong>Ensures Accuracy:</strong> Prevents mathematical errors which are critical during tax filing.</li>
              <li><strong>Easy Splitting:</strong> It helps easily identify the CGST and SGST/IGST components of a transaction.</li>
              <li><strong>Business Friendly:</strong> Highly useful for SMEs and freelancers to correctly quote prices to clients.</li>
            </ul>
          </section>

          <section className="mt-6">
            <h2>Frequently Asked Questions (FAQs)</h2>
            <div style={{ marginTop: '1rem' }}>
              <h3 style={{ fontSize: '1.125rem', fontWeight: 600 }}>1. What are the different GST tax slabs in India?</h3>
              <p>In India, goods and services are primarily categorized into five tax slabs for collection of tax: 0%, 5%, 12%, 18%, and 28%. Gold and rough precious and semi-precious stones carry special rates of 3% and 0.25% respectively.</p>
              
              <h3 style={{ fontSize: '1.125rem', fontWeight: 600, marginTop: '1rem' }}>2. What is the difference between CGST, SGST, and IGST?</h3>
              <p>CGST (Central GST) and SGST (State GST) are levied on intra-state sales (within the same state). IGST (Integrated GST) is levied on inter-state sales (between two different states).</p>

              <h3 style={{ fontSize: '1.125rem', fontWeight: 600, marginTop: '1rem' }}>3. Who needs to register for GST?</h3>
              <p>Businesses with a turnover exceeding ₹40 Lakhs (for goods) or ₹20 Lakhs (for services) are required to register for GST. The threshold limits vary for special category states.</p>
            </div>
          </section>

          <section className="mt-8 border-t pt-6" style={{ borderTop: '1px solid var(--border-color)', paddingTop: '1.5rem' }}>
            <h2>Try Our Other Financial Calculators</h2>
            <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap', marginTop: '1rem' }}>
              <Link href="/emi-calculator-india" style={{ color: 'var(--accent-color)', fontWeight: 500, textDecoration: 'underline' }}>EMI Calculator</Link>
              <Link href="/sip-calculator" style={{ color: 'var(--accent-color)', fontWeight: 500, textDecoration: 'underline' }}>SIP Calculator</Link>
              <Link href="/discount-calculator" style={{ color: 'var(--accent-color)', fontWeight: 500, textDecoration: 'underline' }}>Discount Calculator</Link>
            </div>
          </section>
        </article>
      </div>
    </div>
  );
}
