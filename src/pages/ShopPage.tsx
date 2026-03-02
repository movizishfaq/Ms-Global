import React, { useState, useRef, Children } from 'react';
import { motion, useInView } from 'framer-motion';
import { ProductCard } from '../components/ProductCard';
const ALL_PRODUCTS = [
{
  id: 1,
  name: 'ROSE HIP FACE OIL',
  price: 'Rp89.000',
  category: 'FACE OILS',
  image: "/original-4006ba5de374258f3b7a9bf72a711ce4.webp",

  description:
  'Pure rosehip oil for radiant, youthful skin. Rich in vitamins A and C.'
},
{
  id: 2,
  name: 'VITAMIN C SERUM',
  price: 'Rp125.000',
  category: 'SERUMS',
  image:
  'https://images.unsplash.com/photo-1608248597279-f99d160bfcbc?w=400&q=80',
  description: 'Brightening vitamin C serum for a glowing, even complexion.'
},
{
  id: 3,
  name: 'ARGAN HAIR OIL',
  price: 'Rp99.000',
  category: 'HAIR',
  image:
  'https://images.unsplash.com/photo-1571781926291-c477ebfd024b?w=400&q=80',
  description:
  'Moroccan argan oil for silky, frizz-free hair with brilliant shine.'
},
{
  id: 4,
  name: 'BODY GLOW OIL',
  price: 'Rp75.000',
  category: 'BODY',
  image:
  'https://images.unsplash.com/photo-1598440947619-2c35fc9aa908?w=400&q=80',
  description:
  'Luxurious body oil that leaves skin glowing and deeply moisturized.'
},
{
  id: 5,
  name: 'NIACINAMIDE TONER',
  price: 'Rp95.000',
  category: 'TONERS',
  image:
  'https://images.unsplash.com/photo-1631390519301-88d9f0f5e8b5?w=400&q=80',
  description:
  'Pore-minimizing toner with 10% niacinamide for clear, smooth skin.'
},
{
  id: 6,
  name: 'JOJOBA FACE OIL',
  price: 'Rp120.000',
  category: 'FACE OILS',
  image:
  'https://images.unsplash.com/photo-1596462502278-27bfdc403348?w=400&q=80',
  description:
  'Lightweight jojoba oil that balances and nourishes all skin types.'
},
{
  id: 7,
  name: 'RETINOL NIGHT SERUM',
  price: 'Rp179.000',
  category: 'SERUMS',
  image:
  'https://images.unsplash.com/photo-1522335789203-aabd1fc54bc9?w=400&q=80',
  description: 'Overnight retinol serum for anti-aging and skin renewal.'
},
{
  id: 8,
  name: 'LUXURY BODY OIL',
  price: 'Rp199.000',
  category: 'BODY',
  image:
  'https://images.unsplash.com/photo-1570194065650-d99fb4bedf0a?w=400&q=80',
  description:
  'Premium blend of rare oils for an indulgent body care ritual.'
},
{
  id: 9,
  name: 'AHA BHA TONER',
  price: 'Rp115.000',
  category: 'TONERS',
  image:
  'https://images.unsplash.com/photo-1608248597279-f99d160bfcbc?w=400&q=80',
  description: 'Exfoliating toner with AHA and BHA for smooth, clear skin.'
}];

const FILTER_TAGS = ['ALL', 'FACE OILS', 'SERUMS', 'TONERS', 'BODY', 'HAIR'];
const containerVariants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.08
    }
  }
};
const itemVariants = {
  hidden: {
    opacity: 0,
    y: 30
  },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.5,
      ease: [0.22, 1, 0.36, 1]
    }
  }
};
export function ShopPage() {
  const [activeFilter, setActiveFilter] = useState('ALL');
  const gridRef = useRef<HTMLDivElement>(null);
  const gridInView = useInView(gridRef, {
    once: true,
    margin: '-50px'
  });
  const filtered =
  activeFilter === 'ALL' ?
  ALL_PRODUCTS :
  ALL_PRODUCTS.filter((p) => p.category === activeFilter);
  return (
    <div
      className="w-full min-h-screen"
      style={{
        backgroundColor: '#9E055F'
      }}>

      {/* Page Header */}
      <section
        className="px-6 py-12"
        style={{
          backgroundColor: '#7a0449'
        }}>

        <div className="max-w-screen-xl mx-auto flex flex-col md:flex-row items-start md:items-end justify-between gap-4">
          <h1 className="font-anton text-6xl md:text-8xl text-white uppercase leading-none">
            SHOP{' '}
            <span
              style={{
                color: '#FF0000'
              }}>

              ALL
            </span>
          </h1>
          <p
            className="font-mono text-sm uppercase tracking-widest"
            style={{
              color: 'rgba(255,255,255,0.6)'
            }}>

            {filtered.length} ITEMS
          </p>
        </div>
      </section>

      {/* Filter Tags */}
      <section
        className="px-6 py-4 overflow-x-auto border-b border-white/10"
        aria-label="Product filters"
        style={{
          backgroundColor: '#7a0449'
        }}>

        <div className="flex gap-3 min-w-max max-w-screen-xl mx-auto">
          {FILTER_TAGS.map((tag) => {
            const isActive = activeFilter === tag;
            return (
              <button
                key={tag}
                onClick={() => setActiveFilter(tag)}
                className="relative font-mono text-xs uppercase tracking-widest px-5 py-2 border-2 transition-colors rounded"
                style={{
                  backgroundColor: isActive ? '#fff' : 'transparent',
                  color: isActive ? '#9E055F' : '#fff',
                  borderColor: isActive ? '#fff' : 'rgba(255,255,255,0.4)'
                }}
                aria-pressed={isActive}>

                {tag}
              </button>);

          })}
        </div>
      </section>

      {/* Product Grid */}
      <section className="px-6 py-12" aria-label="Products">
        <div className="max-w-screen-xl mx-auto">
          <motion.div
            ref={gridRef}
            key={activeFilter}
            variants={containerVariants}
            initial="hidden"
            animate={gridInView ? 'visible' : 'hidden'}
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">

            {filtered.map((product) =>
            <motion.div key={product.id} variants={itemVariants}>
                <ProductCard product={product} />
              </motion.div>
            )}
          </motion.div>

          {filtered.length === 0 &&
          <div className="text-center py-24">
              <p
              className="font-mono text-sm uppercase tracking-widest"
              style={{
                color: 'rgba(255,255,255,0.4)'
              }}>

                NO ITEMS IN THIS CATEGORY
              </p>
            </div>
          }
        </div>
      </section>
    </div>);

}