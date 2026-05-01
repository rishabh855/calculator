import { Metadata } from 'next';
import Link from 'next/link';
import { ArrowLeft } from 'lucide-react';
import DiscountCalculatorClient from '@/components/calculators/DiscountCalculatorClient';

export const metadata: Metadata = {
  title: 'Discount Calculator Online – Calculate Final Price & Savings',
  description: 'Free Discount Calculator to quickly find out the final price after applying a percentage discount. Know exactly how much money you are saving instantly.',
  alternates: {
    canonical: '/discount-calculator',
  },
};

export default function DiscountCalculatorPage() {
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'WebApplication',
    name: 'Discount Calculator',
    url: 'https://calculator-kappa-inky-48.vercel.app/discount-calculator', // Update this with your actual domain later
    applicationCategory: 'FinanceApplication',
    operatingSystem: 'All',
    description: 'Find out the final price after discount and exactly how much money you save.',
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
        <h1 className="text-center mb-4">Discount Calculator</h1>
        <p className="text-center mb-8">Find out the final price after discount and exactly how much money you save.</p>

        <DiscountCalculatorClient />

        <article className="seo-content card mt-8">
          <section>
            <h2>What is a Discount Calculator?</h2>
            <p>A Discount Calculator is a handy financial tool used to calculate the final price of an item or service after applying a percentage-based discount. Whether you are shopping during a holiday sale, buying groceries, or running a retail store, knowing the exact amount you save and the final price to pay is essential for smart budgeting.</p>
          </section>

          <section className="mt-6">
            <h2>How to Calculate a Discount?</h2>
            <p>Calculating a discount manually involves two simple mathematical steps. However, our calculator automates this for instant results. Here are the formulas used:</p>
            <div style={{ backgroundColor: 'var(--bg-primary)', padding: '1rem', borderRadius: '0.5rem', margin: '1rem 0' }}>
              <strong>Savings = (Original Price × Discount %) / 100</strong><br />
              <strong>Final Price = Original Price - Savings</strong>
            </div>
            
            <p><strong>Example:</strong> If a smartphone costs ₹15,000 and has a 20% discount on it:</p>
            <ul style={{ paddingLeft: '1.5rem', color: 'var(--text-secondary)', marginBottom: '1.5rem' }}>
              <li><strong>Savings</strong> = (15,000 × 20) / 100 = ₹3,000</li>
              <li><strong>Final Price</strong> = 15,000 - 3,000 = ₹12,000</li>
            </ul>
          </section>

          <section className="mt-6">
            <h2>Benefits of Using a Discount Calculator</h2>
            <ul style={{ paddingLeft: '1.5rem', color: 'var(--text-secondary)', marginBottom: '1.5rem' }}>
              <li><strong>Smart Shopping:</strong> Quickly evaluate sale offers and verify if a "Flat 50% Off" is actually a good deal.</li>
              <li><strong>Budgeting:</strong> Helps you manage your expenses better by knowing exactly what you'll pay at checkout.</li>
              <li><strong>Saves Time:</strong> No need to do mental math or open a generic calculator app; just input the numbers and get the exact discount amount.</li>
              <li><strong>Business Use:</strong> Useful for shopkeepers and business owners to quickly quote final prices to customers during sales.</li>
            </ul>
          </section>

          <section className="mt-6">
            <h2>Frequently Asked Questions (FAQs)</h2>
            <div style={{ marginTop: '1rem' }}>
              <h3 style={{ fontSize: '1.125rem', fontWeight: 600 }}>1. How do I calculate a double discount?</h3>
              <p>A double discount (e.g., 20% off + an extra 10% off) is not calculated by adding the percentages (it's NOT 30% off). First, calculate the 20% off the original price. Then, take that new discounted price and calculate the 10% off of it. The final number is your actual price.</p>
              
              <h3 style={{ fontSize: '1.125rem', fontWeight: 600, marginTop: '1rem' }}>2. Is this calculator free to use?</h3>
              <p>Yes, our discount calculator is completely free, ad-free, and works instantly without needing to refresh the page.</p>

              <h3 style={{ fontSize: '1.125rem', fontWeight: 600, marginTop: '1rem' }}>3. Can I use this for markup calculation?</h3>
              <p>This calculator is specifically designed for discounts (price reductions). A markup is an increase in the original price, which requires adding the percentage instead of subtracting it.</p>
            </div>
          </section>

          <section className="mt-8 border-t pt-6" style={{ borderTop: '1px solid var(--border-color)', paddingTop: '1.5rem' }}>
            <h2>Try Our Other Financial Calculators</h2>
            <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap', marginTop: '1rem' }}>
              <Link href="/emi-calculator-india" style={{ color: 'var(--accent-color)', fontWeight: 500, textDecoration: 'underline' }}>EMI Calculator</Link>
              <Link href="/gst-calculator" style={{ color: 'var(--accent-color)', fontWeight: 500, textDecoration: 'underline' }}>GST Calculator</Link>
              <Link href="/sip-calculator" style={{ color: 'var(--accent-color)', fontWeight: 500, textDecoration: 'underline' }}>SIP Calculator</Link>
            </div>
          </section>
        </article>
      </div>
    </div>
  );
}
