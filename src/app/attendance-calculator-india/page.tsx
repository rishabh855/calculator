import { Metadata } from 'next';
import Link from 'next/link';
import { ArrowLeft } from 'lucide-react';
import AttendanceCalculatorClient from '@/components/calculators/AttendanceCalculatorClient';

export const metadata: Metadata = {
  title: 'Attendance Calculator India – Track Attendance & Bunk Safely',
  description: 'Calculate attendance percentage and find how many classes to attend or bunk. Free attendance calculator for students in India.',
  alternates: {
    canonical: '/attendance-calculator-india',
  },
};

export default function AttendanceCalculatorPage() {
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'WebApplication',
    name: 'Attendance Calculator India',
    url: 'https://calculator-kappa-inky-48.vercel.app/attendance-calculator-india', // Update this with your actual domain later
    applicationCategory: 'EducationalApplication',
    operatingSystem: 'All',
    description: 'Calculate attendance percentage and find how many classes to attend or bunk. Free attendance calculator for students in India.',
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
        <h1 className="text-center mb-4">Attendance Calculator India</h1>
        <p className="text-center mb-8">Quickly calculate your current attendance and find out exactly how many classes you can bunk or need to attend.</p>

        <AttendanceCalculatorClient />

        <article className="seo-content card mt-8">
          <section>
            <h2>What is an Attendance Percentage Calculator?</h2>
            <p>An Attendance Percentage Calculator is an essential academic tool designed specifically for college and school students in India. Most universities mandate a strict minimum attendance criteria (usually 75%). This calculator helps you mathematically determine your current standing based on the number of classes you've attended versus the total classes held.</p>
          </section>

          <section className="mt-6">
            <h2>How Does This Calculator Work?</h2>
            <p>The math behind tracking your attendance is simple, but calculating future scenarios can be tricky. Here is how our tool does the heavy lifting:</p>
            <ul style={{ paddingLeft: '1.5rem', color: 'var(--text-secondary)', marginBottom: '1.5rem' }}>
              <li><strong>Current Percentage:</strong> It divides your attended classes by the total held classes and multiplies by 100.</li>
              <li><strong>If you are below target:</strong> The calculator finds the exact number of <em>consecutive</em> future classes you must attend to pull your overall percentage back up to your target (e.g., 75%). It assumes every future class adds +1 to both your present and total count.</li>
              <li><strong>If you are above target:</strong> It calculates your "safe bunks." It tells you exactly how many upcoming classes you can skip without your overall percentage falling below the required target. Skipping a class adds +1 to the total count, but 0 to your present count.</li>
            </ul>
          </section>

          <section className="mt-6">
            <h2>How to Maintain a Good Attendance</h2>
            <p>Maintaining the required 75% or 80% mark doesn't mean you can never miss a class. It simply requires strategic planning:</p>
            <ul style={{ paddingLeft: '1.5rem', color: 'var(--text-secondary)', marginBottom: '1.5rem' }}>
              <li><strong>Track Regularly:</strong> Don't wait until the end of the semester. Input your data into this calculator weekly to stay aware of your standing.</li>
              <li><strong>Save Bunks for Emergencies:</strong> If you are safely above your target, don't waste your "bunkable" classes casually. Save them for genuine emergencies or exam preparation leave.</li>
              <li><strong>Understand the Math:</strong> Remember that missing a class hurts your percentage faster than attending a class improves it. This is because the denominator (total classes) always increases.</li>
            </ul>
          </section>

          <section className="mt-6">
            <h2>Why is it Useful for Students?</h2>
            <p>This calculator eliminates the anxiety of attendance shortages. It prevents you from getting debarred from final semester exams by giving you a clear, actionable target. Whether you need to catch up on missed lectures or just want to take a strategic day off, you will always know exactly where you stand mathematically.</p>
          </section>

          <section className="mt-6">
            <h2>Frequently Asked Questions (FAQs)</h2>
            <div style={{ marginTop: '1rem' }}>
              <h3 style={{ fontSize: '1.125rem', fontWeight: 600 }}>1. What is the minimum attendance required in Indian colleges?</h3>
              <p>Most universities regulated by the UGC and AICTE mandate a minimum of 75% attendance to be eligible to sit for semester examinations. Some institutions may allow relaxation up to 65% on medical grounds, but 75% is the standard target.</p>
              
              <h3 style={{ fontSize: '1.125rem', fontWeight: 600, marginTop: '1rem' }}>2. Can I bunk classes safely if I have 80% attendance?</h3>
              <p>Yes, if your university requires 75% and you currently have 80%, you have a buffer. Input your exact present and total classes into the calculator above, and it will tell you the precise number of upcoming classes you can safely skip.</p>

              <h3 style={{ fontSize: '1.125rem', fontWeight: 600, marginTop: '1rem' }}>3. How can I increase my attendance fast?</h3>
              <p>The only way to mathematically increase your attendance percentage is to attend every upcoming class consecutively without any leaves. The calculator will show you exactly how many consecutive days you need to show up.</p>
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
