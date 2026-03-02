import React from 'react';
import { motion } from 'framer-motion';
const TICKER_CONTENT =
'NEW DROP AVAILABLE ★ FREE SHIPPING OVER $150 ★ LIMITED STOCK ★ USE CODE: VOID10 FOR 10% OFF ★ SEASON 3 NOW LIVE ★ NEW DROP AVAILABLE ★ FREE SHIPPING OVER $150 ★ LIMITED STOCK ★ USE CODE: VOID10 FOR 10% OFF ★ SEASON 3 NOW LIVE ★';
export function Marquee() {
  return (
    <div
      className="bg-black overflow-hidden h-10 flex items-center"
      aria-label="Announcements ticker">

      <motion.div
        className="flex whitespace-nowrap"
        animate={{
          x: ['0%', '-50%']
        }}
        transition={{
          duration: 28,
          ease: 'linear',
          repeat: Infinity
        }}>

        <span className="font-mono text-xs text-white uppercase tracking-widest pr-8">
          {TICKER_CONTENT}
        </span>
        <span className="font-mono text-xs text-white uppercase tracking-widest pr-8">
          {TICKER_CONTENT}
        </span>
      </motion.div>
    </div>);

}