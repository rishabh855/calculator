import type { Metadata } from 'next';
import './globals.css';
import { ThemeProvider } from '../components/ThemeProvider';
import Navbar from '../components/Navbar';

export const metadata: Metadata = {
  title: 'SmartCalc India – Daily Life Calculators',
  description: 'A modern, fast, and simple suite of calculators for Indian users including EMI, GST, SIP, and Discount calculators.',
  keywords: 'EMI calculator india, GST calculator, SIP calculator, discount calculator, financial tools, personal finance',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body>
        <ThemeProvider>
          <Navbar />
          <main style={{ minHeight: 'calc(100vh - 4rem)', padding: '2rem 0' }}>
            {children}
          </main>
          <footer style={{ 
            backgroundColor: 'var(--bg-secondary)', 
            borderTop: '1px solid var(--border-color)',
            padding: '2rem 0',
            textAlign: 'center',
            color: 'var(--text-secondary)'
          }}>
            <div className="container">
              <p>© {new Date().getFullYear()} SmartCalc India. Built for speed and simplicity.</p>
            </div>
          </footer>
        </ThemeProvider>
      </body>
    </html>
  );
}
