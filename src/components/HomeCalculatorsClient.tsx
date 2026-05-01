'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';
import { Calculator, Percent, TrendingUp, Tags, ArrowRight, GraduationCap } from 'lucide-react';

export default function HomeCalculatorsClient() {
  const calculators = [
    {
      id: 'emi',
      title: 'EMI Calculator',
      description: 'Calculate your Equated Monthly Installment (EMI) for home, car, or personal loans instantly.',
      icon: <Calculator size={32} color="var(--accent-color)" />,
      link: '/emi-calculator-india'
    },
    {
      id: 'gst',
      title: 'GST Calculator',
      description: 'Easily calculate Goods and Service Tax (GST) inclusive and exclusive prices.',
      icon: <Percent size={32} color="var(--accent-color)" />,
      link: '/gst-calculator'
    },
    {
      id: 'sip',
      title: 'SIP Calculator',
      description: 'Estimate your mutual fund returns and wealth creation over time with Systematic Investment Plan.',
      icon: <TrendingUp size={32} color="var(--accent-color)" />,
      link: '/sip-calculator'
    },
    {
      id: 'discount',
      title: 'Discount Calculator',
      description: 'Find out the final price after discount and exactly how much you are saving.',
      icon: <Tags size={32} color="var(--accent-color)" />,
      link: '/discount-calculator'
    },
    {
      id: 'attendance',
      title: 'Attendance Calculator',
      description: 'Calculate your attendance percentage and find exactly how many classes to attend or bunk.',
      icon: <GraduationCap size={32} color="var(--accent-color)" />,
      link: '/attendance-calculator-india'
    }
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: { y: 0, opacity: 1, transition: { type: 'spring', stiffness: 100 } }
  };

  return (
    <motion.div 
      className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-8 mb-12"
      variants={containerVariants}
      initial="hidden"
      animate="visible"
    >
      {calculators.map((calc) => (
        <motion.div key={calc.id} variants={itemVariants}>
          <Link href={calc.link} style={{ display: 'block', height: '100%' }}>
            <div className="card" style={{ height: '100%', display: 'flex', flexDirection: 'column', cursor: 'pointer' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginBottom: '1rem' }}>
                <div style={{ 
                  backgroundColor: 'rgba(99, 102, 241, 0.1)', 
                  padding: '1rem', 
                  borderRadius: '1rem' 
                }}>
                  {calc.icon}
                </div>
                <h2 style={{ margin: 0, fontSize: '1.5rem' }}>{calc.title}</h2>
              </div>
              <p style={{ flexGrow: 1 }}>{calc.description}</p>
              <div style={{ 
                display: 'flex', 
                alignItems: 'center', 
                gap: '0.5rem', 
                color: 'var(--accent-color)', 
                fontWeight: 600,
                marginTop: '1.5rem' 
              }}>
                Open Calculator <ArrowRight size={18} />
              </div>
            </div>
          </Link>
        </motion.div>
      ))}
    </motion.div>
  );
}
