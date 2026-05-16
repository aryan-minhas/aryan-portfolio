'use client';

import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

export default function LoadingScreen() {
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    const t = setTimeout(() => setVisible(false), 1500);
    return () => clearTimeout(t);
  }, []);

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          className="fixed inset-0 bg-void flex items-center justify-center z-[99999]"
          initial={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
          aria-hidden="true"
        >
          <motion.div
            className="h-px bg-[#c2a649]"
            initial={{ width: 0 }}
            animate={{ width: '8rem' }}
            transition={{ duration: 1.0, ease: [0.16, 1, 0.3, 1] }}
            style={{ boxShadow: '0 0 12px rgba(194, 166, 73, 0.5), 0 0 4px rgba(194, 166, 73, 0.8)' }}
          />
        </motion.div>
      )}
    </AnimatePresence>
  );
}
