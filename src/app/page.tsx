import { Metadata } from 'next';
import HomeCalculatorsClient from '@/components/HomeCalculatorsClient';

export const metadata: Metadata = {
  title: 'Free Online Financial Calculators for India – SmartCalc',
  description: 'Access a suite of modern, fast, and completely free calculators to help you make better financial decisions every day. EMI, GST, SIP, and Discount tools.',
  alternates: {
    canonical: '/',
  },
};

export default function Home() {
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    name: 'SmartCalc India',
    url: 'https://calculator-kappa-inky-48.vercel.app/', // Update domain
    description: 'A suite of modern, fast, and completely free financial calculators for India.',
  };

  return (
    <div className="container">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      
      <div className="text-center mb-8 mt-8">
        <h1 style={{ marginBottom: '1rem' }}>Free Online Financial Calculators for India</h1>
        <p style={{ maxWidth: '600px', margin: '0 auto', fontSize: '1.125rem' }}>
          A suite of modern, fast, and completely free calculators to help you make better financial decisions every day.
        </p>
      </div>

      <HomeCalculatorsClient />

      <article className="seo-content card mt-8">
        <section>
          <h2>Your All-in-One Hub for Everyday Financial Calculations</h2>
          <p>Managing personal finances, calculating business taxes, or making smart shopping decisions shouldn't require complex spreadsheets or confusing mathematical formulas. <strong>SmartCalc India</strong> is designed to provide you with an intuitive, fast, and completely free suite of online calculators tailored specifically for the Indian financial landscape.</p>
        </section>

        <section className="mt-6">
          <h2>Explore Our Calculators</h2>
          
          <div className="mt-4">
            <h3 style={{ fontSize: '1.125rem', fontWeight: 600 }}>1. EMI Calculator India</h3>
            <p>Planning to take a loan? Our <a href="/emi-calculator-india" style={{ color: 'var(--accent-color)', textDecoration: 'underline' }}>EMI Calculator</a> helps you instantly calculate your Equated Monthly Installment for home loans, car loans, or personal loans. It provides a clear breakdown of the principal amount and the total interest you will be paying over the loan tenure, helping you choose the right lender and repayment schedule.</p>
          </div>

          <div className="mt-4">
            <h3 style={{ fontSize: '1.125rem', fontWeight: 600 }}>2. GST Calculator</h3>
            <p>Whether you are a business owner generating invoices or a consumer verifying prices, our <a href="/gst-calculator" style={{ color: 'var(--accent-color)', textDecoration: 'underline' }}>GST Calculator</a> simplifies tax calculations. You can easily add GST to a base amount (Exclusive) or extract the GST amount from a total price (Inclusive) across all Indian tax slabs (3%, 5%, 12%, 18%, and 28%).</p>
          </div>

          <div className="mt-4">
            <h3 style={{ fontSize: '1.125rem', fontWeight: 600 }}>3. SIP Calculator</h3>
            <p>Mutual funds are a powerful wealth-creation tool. Use our <a href="/sip-calculator" style={{ color: 'var(--accent-color)', textDecoration: 'underline' }}>SIP Calculator</a> to estimate the future value of your Systematic Investment Plan. By leveraging the power of compounding, you can visualize how small, disciplined monthly investments can grow into a substantial corpus over time.</p>
          </div>

          <div className="mt-4">
            <h3 style={{ fontSize: '1.125rem', fontWeight: 600 }}>4. Discount Calculator</h3>
            <p>Don't be confused by complicated sale offers. The <a href="/discount-calculator" style={{ color: 'var(--accent-color)', textDecoration: 'underline' }}>Discount Calculator</a> instantly tells you the final price you need to pay after a percentage reduction, along with the exact amount of money you are saving. Perfect for shopping festivals and retail budgeting.</p>
          </div>

          <div className="mt-4">
            <h3 style={{ fontSize: '1.125rem', fontWeight: 600 }}>5. Attendance Calculator</h3>
            <p>For students navigating strict college attendance rules, our <a href="/attendance-calculator-india" style={{ color: 'var(--accent-color)', textDecoration: 'underline' }}>Attendance Calculator</a> removes the guesswork. Input your present and total classes, and it will instantly tell you how many upcoming classes you can safely bunk, or how many consecutive classes you must attend to reach your target percentage.</p>
          </div>
        </section>
        
        <section className="mt-6">
          <h2>Why Choose SmartCalc?</h2>
          <ul style={{ paddingLeft: '1.5rem', color: 'var(--text-secondary)' }}>
            <li><strong>Privacy First:</strong> All calculations are performed directly in your browser. We do not store or track your personal financial data.</li>
            <li><strong>Lightning Fast:</strong> Built with modern web technologies to ensure zero loading delays or page refreshes.</li>
            <li><strong>Mobile Friendly:</strong> A responsive design that works perfectly on your desktop, tablet, and smartphone.</li>
            <li><strong>100% Free:</strong> Unrestricted access to all tools without any hidden charges or required sign-ups.</li>
          </ul>
        </section>
      </article>
    </div>
  );
}
