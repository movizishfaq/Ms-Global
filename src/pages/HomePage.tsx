import React, { useEffect, useState, useRef, Children, Fragment } from 'react';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence, useInView } from 'framer-motion';
import { Marquee } from '../components/Marquee';
import { useCart } from '../App';
import {
  ChevronLeft,
  ChevronRight,
  Heart,
  Star,
  Zap,
  Sparkles,
  Droplets,
  Sun,
  Wind,
  Leaf,
  FlaskConical,
  Layers,
  Grid,
  SendIcon } from
'lucide-react';
import oip from './OIP.webp';
const HERO_IMAGE  = oip;

const PRIMARY = '#9E055F';
const DARK = '#7a0449';
const CATEGORIES = [
{
  label: 'Face Oils',
  icon: Droplets
},
{
  label: 'Serums',
  icon: Sparkles
},
{
  label: 'Moisturizer',
  icon: Sun
},
{
  label: 'Toner',
  icon: Wind
},
{
  label: 'Body Oil',
  icon: Leaf
},
{
  label: 'Masks',
  icon: FlaskConical
},
{
  label: 'SPF',
  icon: Layers
},
{
  label: 'All',
  icon: Grid
}];

const FLASH_PRODUCTS = [
{
  id: '1',
  name: 'Rose Hip Face Oil',
  price: 'Rp89.000',
  original: 'Rp160.000',
  rating: 4.9,
  sold: '10k+',
  progress: 90,
  image: HERO_IMAGE
},
{
  id: '2',
  name: 'Vitamin C Serum',
  price: 'Rp125.000',
  original: 'Rp250.000',
  rating: 4.8,
  sold: '8k+',
  progress: 75,
  image:
  'https://images.unsplash.com/photo-1608248597279-f99d160bfcbc?w=400&q=80'
},
{
  id: '3',
  name: 'Argan Hair Oil',
  price: 'Rp99.000',
  original: 'Rp199.000',
  rating: 4.9,
  sold: '12k+',
  progress: 85,
  image:
  'https://images.unsplash.com/photo-1571781926291-c477ebfd024b?w=400&q=80'
},
{
  id: '4',
  name: 'Body Glow Oil',
  price: 'Rp75.000',
  original: 'Rp150.000',
  rating: 4.7,
  sold: '5k+',
  progress: 60,
  image:
  'https://images.unsplash.com/photo-1598440947619-2c35fc9aa908?w=400&q=80'
},
{
  id: '5',
  name: 'Niacinamide Toner',
  price: 'Rp95.000',
  original: 'Rp140.000',
  rating: 4.9,
  sold: '20k+',
  progress: 95,
  image:
  'https://images.unsplash.com/photo-1631390519301-88d9f0f5e8b5?w=400&q=80'
}];

const TABS = [
'Best Seller',
'Keep Stylish',
'Special Discount',
'Official Store',
'Coveted'];

const ALL_TAB_PRODUCTS: Record<string, typeof FLASH_PRODUCTS> = {
  'Best Seller': [
  {
    id: '10',
    name: 'Jojoba Face Oil',
    price: 'Rp120.000',
    original: '',
    rating: 4.9,
    sold: '15k+',
    progress: 0,
    image: HERO_IMAGE
  },
  {
    id: '11',
    name: 'Retinol Night Serum',
    price: 'Rp179.000',
    original: '',
    rating: 4.8,
    sold: '9k+',
    progress: 0,
    image:
    'https://images.unsplash.com/photo-1608248597279-f99d160bfcbc?w=400&q=80'
  },
  {
    id: '12',
    name: 'Niacinamide Toner',
    price: 'Rp95.000',
    original: 'Rp140.000',
    rating: 4.9,
    sold: '20k+',
    progress: 0,
    image:
    'https://images.unsplash.com/photo-1571781926291-c477ebfd024b?w=400&q=80'
  },
  {
    id: '13',
    name: 'Hyaluronic Moisturizer',
    price: 'Rp145.000',
    original: '',
    rating: 4.8,
    sold: '7k+',
    progress: 0,
    image:
    'https://images.unsplash.com/photo-1598440947619-2c35fc9aa908?w=400&q=80'
  },
  {
    id: '14',
    name: 'Glow Facial Oil',
    price: 'Rp110.000',
    original: 'Rp200.000',
    rating: 4.9,
    sold: '11k+',
    progress: 0,
    image:
    'https://images.unsplash.com/photo-1631390519301-88d9f0f5e8b5?w=400&q=80'
  },
  {
    id: '15',
    name: 'Tea Tree Spot Oil',
    price: 'Rp85.000',
    original: '',
    rating: 4.7,
    sold: '6k+',
    progress: 0,
    image:
    'https://images.unsplash.com/photo-1596462502278-27bfdc403348?w=400&q=80'
  },
  {
    id: '16',
    name: 'Luxury Body Oil',
    price: 'Rp199.000',
    original: 'Rp350.000',
    rating: 4.9,
    sold: '4k+',
    progress: 0,
    image:
    'https://images.unsplash.com/photo-1522335789203-aabd1fc54bc9?w=400&q=80'
  },
  {
    id: '17',
    name: 'Brightening Serum',
    price: 'Rp165.000',
    original: '',
    rating: 4.8,
    sold: '8k+',
    progress: 0,
    image:
    'https://images.unsplash.com/photo-1570194065650-d99fb4bedf0a?w=400&q=80'
  }],

  'Keep Stylish': [
  {
    id: '20',
    name: 'Vitamin E Oil',
    price: 'Rp89.000',
    original: 'Rp130.000',
    rating: 4.7,
    sold: '6k+',
    progress: 0,
    image:
    'https://images.unsplash.com/photo-1596462502278-27bfdc403348?w=400&q=80'
  },
  {
    id: '21',
    name: 'Collagen Serum',
    price: 'Rp210.000',
    original: '',
    rating: 4.9,
    sold: '3k+',
    progress: 0,
    image:
    'https://images.unsplash.com/photo-1570194065650-d99fb4bedf0a?w=400&q=80'
  },
  {
    id: '22',
    name: 'Aloe Vera Gel',
    price: 'Rp55.000',
    original: '',
    rating: 4.6,
    sold: '25k+',
    progress: 0,
    image: HERO_IMAGE
  },
  {
    id: '23',
    name: 'Peptide Eye Cream',
    price: 'Rp175.000',
    original: 'Rp220.000',
    rating: 4.8,
    sold: '5k+',
    progress: 0,
    image:
    'https://images.unsplash.com/photo-1608248597279-f99d160bfcbc?w=400&q=80'
  },
  {
    id: '24',
    name: 'Squalane Oil',
    price: 'Rp135.000',
    original: '',
    rating: 4.9,
    sold: '7k+',
    progress: 0,
    image:
    'https://images.unsplash.com/photo-1522335789203-aabd1fc54bc9?w=400&q=80'
  },
  {
    id: '25',
    name: 'Bakuchiol Serum',
    price: 'Rp195.000',
    original: 'Rp280.000',
    rating: 4.8,
    sold: '4k+',
    progress: 0,
    image:
    'https://images.unsplash.com/photo-1571781926291-c477ebfd024b?w=400&q=80'
  },
  {
    id: '26',
    name: 'Ceramide Cream',
    price: 'Rp160.000',
    original: '',
    rating: 4.7,
    sold: '9k+',
    progress: 0,
    image:
    'https://images.unsplash.com/photo-1598440947619-2c35fc9aa908?w=400&q=80'
  },
  {
    id: '27',
    name: 'AHA BHA Toner',
    price: 'Rp115.000',
    original: 'Rp160.000',
    rating: 4.8,
    sold: '11k+',
    progress: 0,
    image:
    'https://images.unsplash.com/photo-1631390519301-88d9f0f5e8b5?w=400&q=80'
  }],

  'Special Discount': [
  {
    id: '30',
    name: 'Marula Face Oil',
    price: 'Rp79.000',
    original: 'Rp199.000',
    rating: 4.9,
    sold: '8k+',
    progress: 0,
    image:
    'https://images.unsplash.com/photo-1570194065650-d99fb4bedf0a?w=400&q=80'
  },
  {
    id: '31',
    name: 'Glycolic Serum',
    price: 'Rp99.000',
    original: 'Rp220.000',
    rating: 4.7,
    sold: '5k+',
    progress: 0,
    image:
    'https://images.unsplash.com/photo-1596462502278-27bfdc403348?w=400&q=80'
  },
  {
    id: '32',
    name: 'Snail Mucin Essence',
    price: 'Rp85.000',
    original: 'Rp170.000',
    rating: 4.8,
    sold: '13k+',
    progress: 0,
    image: HERO_IMAGE
  },
  {
    id: '33',
    name: 'Tranexamic Acid',
    price: 'Rp110.000',
    original: 'Rp230.000',
    rating: 4.9,
    sold: '6k+',
    progress: 0,
    image:
    'https://images.unsplash.com/photo-1522335789203-aabd1fc54bc9?w=400&q=80'
  },
  {
    id: '34',
    name: 'Centella Toner',
    price: 'Rp65.000',
    original: 'Rp120.000',
    rating: 4.7,
    sold: '18k+',
    progress: 0,
    image:
    'https://images.unsplash.com/photo-1608248597279-f99d160bfcbc?w=400&q=80'
  },
  {
    id: '35',
    name: 'Lactic Acid Serum',
    price: 'Rp130.000',
    original: 'Rp260.000',
    rating: 4.8,
    sold: '7k+',
    progress: 0,
    image:
    'https://images.unsplash.com/photo-1571781926291-c477ebfd024b?w=400&q=80'
  },
  {
    id: '36',
    name: 'Propolis Ampoule',
    price: 'Rp145.000',
    original: 'Rp290.000',
    rating: 4.9,
    sold: '4k+',
    progress: 0,
    image:
    'https://images.unsplash.com/photo-1598440947619-2c35fc9aa908?w=400&q=80'
  },
  {
    id: '37',
    name: 'Azelaic Acid Cream',
    price: 'Rp120.000',
    original: 'Rp240.000',
    rating: 4.8,
    sold: '5k+',
    progress: 0,
    image:
    'https://images.unsplash.com/photo-1631390519301-88d9f0f5e8b5?w=400&q=80'
  }],

  'Official Store': [
  {
    id: '40',
    name: 'The Ordinary Serum',
    price: 'Rp189.000',
    original: '',
    rating: 4.9,
    sold: '30k+',
    progress: 0,
    image:
    'https://images.unsplash.com/photo-1596462502278-27bfdc403348?w=400&q=80'
  },
  {
    id: '41',
    name: 'Skintific Oil',
    price: 'Rp145.000',
    original: '',
    rating: 4.8,
    sold: '22k+',
    progress: 0,
    image: HERO_IMAGE
  },
  {
    id: '42',
    name: 'Somethinc Toner',
    price: 'Rp99.000',
    original: '',
    rating: 4.9,
    sold: '18k+',
    progress: 0,
    image:
    'https://images.unsplash.com/photo-1570194065650-d99fb4bedf0a?w=400&q=80'
  },
  {
    id: '43',
    name: 'Avoskin Serum',
    price: 'Rp175.000',
    original: '',
    rating: 4.7,
    sold: '9k+',
    progress: 0,
    image:
    'https://images.unsplash.com/photo-1608248597279-f99d160bfcbc?w=400&q=80'
  },
  {
    id: '44',
    name: 'Wardah Oil',
    price: 'Rp89.000',
    original: '',
    rating: 4.8,
    sold: '35k+',
    progress: 0,
    image:
    'https://images.unsplash.com/photo-1522335789203-aabd1fc54bc9?w=400&q=80'
  },
  {
    id: '45',
    name: 'Emina Moisturizer',
    price: 'Rp65.000',
    original: '',
    rating: 4.6,
    sold: '40k+',
    progress: 0,
    image:
    'https://images.unsplash.com/photo-1571781926291-c477ebfd024b?w=400&q=80'
  },
  {
    id: '46',
    name: 'Scarlett Serum',
    price: 'Rp135.000',
    original: '',
    rating: 4.9,
    sold: '28k+',
    progress: 0,
    image:
    'https://images.unsplash.com/photo-1598440947619-2c35fc9aa908?w=400&q=80'
  },
  {
    id: '47',
    name: 'MS Glow Oil',
    price: 'Rp199.000',
    original: '',
    rating: 4.8,
    sold: '15k+',
    progress: 0,
    image:
    'https://images.unsplash.com/photo-1631390519301-88d9f0f5e8b5?w=400&q=80'
  }],

  Coveted: [
  {
    id: '50',
    name: 'La Mer Oil',
    price: 'Rp850.000',
    original: 'Rp1.200.000',
    rating: 5.0,
    sold: '1k+',
    progress: 0,
    image:
    'https://images.unsplash.com/photo-1570194065650-d99fb4bedf0a?w=400&q=80'
  },
  {
    id: '51',
    name: 'SK-II Essence',
    price: 'Rp650.000',
    original: '',
    rating: 4.9,
    sold: '2k+',
    progress: 0,
    image:
    'https://images.unsplash.com/photo-1596462502278-27bfdc403348?w=400&q=80'
  },
  {
    id: '52',
    name: 'Tatcha Serum',
    price: 'Rp480.000',
    original: 'Rp600.000',
    rating: 4.9,
    sold: '800+',
    progress: 0,
    image: HERO_IMAGE
  },
  {
    id: '53',
    name: 'Sulwhasoo Oil',
    price: 'Rp520.000',
    original: '',
    rating: 4.8,
    sold: '1.5k+',
    progress: 0,
    image:
    'https://images.unsplash.com/photo-1608248597279-f99d160bfcbc?w=400&q=80'
  },
  {
    id: '54',
    name: 'Drunk Elephant Serum',
    price: 'Rp390.000',
    original: 'Rp490.000',
    rating: 4.9,
    sold: '3k+',
    progress: 0,
    image:
    'https://images.unsplash.com/photo-1522335789203-aabd1fc54bc9?w=400&q=80'
  },
  {
    id: '55',
    name: 'Sisley Oil',
    price: 'Rp720.000',
    original: '',
    rating: 5.0,
    sold: '500+',
    progress: 0,
    image:
    'https://images.unsplash.com/photo-1571781926291-c477ebfd024b?w=400&q=80'
  },
  {
    id: '56',
    name: 'Clé de Peau Serum',
    price: 'Rp980.000',
    original: 'Rp1.100.000',
    rating: 5.0,
    sold: '300+',
    progress: 0,
    image:
    'https://images.unsplash.com/photo-1598440947619-2c35fc9aa908?w=400&q=80'
  },
  {
    id: '57',
    name: 'Augustinus Bader',
    price: 'Rp1.200.000',
    original: '',
    rating: 4.9,
    sold: '200+',
    progress: 0,
    image:
    'https://images.unsplash.com/photo-1631390519301-88d9f0f5e8b5?w=400&q=80'
  }]

};
const STORES = [
{
  name: 'GlowLab Mall',
  tagline: '"Glow From Within"',
  products: [
  {
    price: 'Rp89.000',
    img: HERO_IMAGE
  },
  {
    price: 'Rp125.000',
    img: 'https://images.unsplash.com/photo-1608248597279-f99d160bfcbc?w=200&q=80'
  },
  {
    price: 'Rp99.000',
    img: 'https://images.unsplash.com/photo-1571781926291-c477ebfd024b?w=200&q=80'
  }]

},
{
  name: 'Radiance Hub',
  tagline: '"Unleash Your Glow"',
  products: [
  {
    price: 'Rp145.000',
    img: 'https://images.unsplash.com/photo-1598440947619-2c35fc9aa908?w=200&q=80'
  },
  {
    price: 'Rp75.000',
    img: 'https://images.unsplash.com/photo-1631390519301-88d9f0f5e8b5?w=200&q=80'
  },
  {
    price: 'Rp199.000',
    img: 'https://images.unsplash.com/photo-1596462502278-27bfdc403348?w=200&q=80'
  }]

},
{
  name: 'Skin Luxe',
  tagline: '"Be Extraordinary"',
  products: [
  {
    price: 'Rp179.000',
    img: 'https://images.unsplash.com/photo-1522335789203-aabd1fc54bc9?w=200&q=80'
  },
  {
    price: 'Rp95.000',
    img: 'https://images.unsplash.com/photo-1570194065650-d99fb4bedf0a?w=200&q=80'
  },
  {
    price: 'Rp165.000',
    img: HERO_IMAGE
  }]

},
{
  name: 'Aurora Beauty',
  tagline: '"Chic, Bold, Confident"',
  products: [
  {
    price: 'Rp110.000',
    img: 'https://images.unsplash.com/photo-1608248597279-f99d160bfcbc?w=200&q=80'
  },
  {
    price: 'Rp85.000',
    img: 'https://images.unsplash.com/photo-1571781926291-c477ebfd024b?w=200&q=80'
  },
  {
    price: 'Rp255.000',
    img: 'https://images.unsplash.com/photo-1598440947619-2c35fc9aa908?w=200&q=80'
  }]

}];

// ─── Review Types ─────────────────────────────────────────────────────────────
interface Review {
  id: string;
  name: string;
  rating: number;
  comment: string;
  time: string;
}
const INITIAL_REVIEWS: Review[] = [
{
  id: 'r1',
  name: 'Ayesha K.',
  rating: 5,
  comment:
  'Amazing products! The Rose Hip Oil transformed my skin in just 2 weeks. Highly recommend!',
  time: '2 days ago'
},
{
  id: 'r2',
  name: 'Fatima R.',
  rating: 5,
  comment:
  'Fast delivery and great quality. Will definitely order again from MS Global!',
  time: '5 days ago'
},
{
  id: 'r3',
  name: 'Sara M.',
  rating: 4,
  comment:
  'Love the Vitamin C Serum. My skin glows every morning. Great value for money.',
  time: '1 week ago'
}];

// ─── Star Rating ──────────────────────────────────────────────────────────────
function StarRating({
  value,
  onChange



}: {value: number;onChange?: (v: number) => void;}) {
  const [hovered, setHovered] = useState(0);
  return (
    <div className="flex gap-1">
      {[1, 2, 3, 4, 5].map((star) =>
      <button
        key={star}
        type="button"
        onClick={() => onChange?.(star)}
        onMouseEnter={() => onChange && setHovered(star)}
        onMouseLeave={() => onChange && setHovered(0)}
        className={onChange ? 'cursor-pointer' : 'cursor-default'}
        aria-label={`${star} star`}>

          <Star
          className="w-5 h-5 transition-colors"
          style={{
            fill: star <= (hovered || value) ? '#FBBF24' : 'transparent',
            color:
            star <= (hovered || value) ?
            '#FBBF24' :
            'rgba(255,255,255,0.3)'
          }} />

        </button>
      )}
    </div>);

}
// ─── Reviews Section ──────────────────────────────────────────────────────────
function ReviewsSection() {
  const [reviews, setReviews] = useState<Review[]>(INITIAL_REVIEWS);
  const [name, setName] = useState('');
  const [comment, setComment] = useState('');
  const [rating, setRating] = useState(5);
  const [submitted, setSubmitted] = useState(false);
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim() || !comment.trim()) return;
    const newReview: Review = {
      id: `r${Date.now()}`,
      name: name.trim(),
      rating,
      comment: comment.trim(),
      time: 'Just now'
    };
    setReviews((prev) => [newReview, ...prev]);
    setName('');
    setComment('');
    setRating(5);
    setSubmitted(true);
    setTimeout(() => setSubmitted(false), 3000);
  };
  return (
    <section
      className="py-12 px-6 border-t border-white/10"
      style={{
        backgroundColor: PRIMARY
      }}>

      <div className="max-w-screen-xl mx-auto">
        <div className="text-center mb-10">
          <p className="font-mono text-xs text-white/50 uppercase tracking-[0.3em] mb-2">
            What Our Customers Say
          </p>
          <h2 className="font-anton text-4xl md:text-5xl text-white uppercase">
            CUSTOMER REVIEWS
          </h2>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
          {/* Form */}
          <div
            className="rounded-2xl p-6 border border-white/10 h-fit"
            style={{
              backgroundColor: 'rgba(255,255,255,0.08)'
            }}>

            <h3 className="font-anton text-xl text-white uppercase mb-5">
              LEAVE A REVIEW
            </h3>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block font-mono text-xs uppercase tracking-widest text-white/60 mb-2">
                  Your Name
                </label>
                <input
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="YOUR NAME"
                  required
                  className="w-full font-mono text-sm border-2 px-4 py-3 focus:outline-none transition-colors placeholder:text-white/30 rounded-lg text-white"
                  style={{
                    backgroundColor: 'rgba(255,255,255,0.1)',
                    borderColor: 'rgba(255,255,255,0.2)'
                  }} />

              </div>
              <div>
                <label className="block font-mono text-xs uppercase tracking-widest text-white/60 mb-2">
                  Star Rating
                </label>
                <StarRating value={rating} onChange={setRating} />
              </div>
              <div>
                <label className="block font-mono text-xs uppercase tracking-widest text-white/60 mb-2">
                  Your Comment
                </label>
                <textarea
                  value={comment}
                  onChange={(e) => setComment(e.target.value)}
                  placeholder="SHARE YOUR EXPERIENCE..."
                  required
                  rows={3}
                  className="w-full font-mono text-sm border-2 px-4 py-3 focus:outline-none transition-colors placeholder:text-white/30 rounded-lg text-white resize-none"
                  style={{
                    backgroundColor: 'rgba(255,255,255,0.1)',
                    borderColor: 'rgba(255,255,255,0.2)'
                  }} />

              </div>
              <motion.button
                type="submit"
                whileTap={{
                  scale: 0.99
                }}
                className="w-full font-mono text-sm uppercase tracking-widest text-white py-3.5 rounded-xl font-bold flex items-center justify-center gap-2 transition-opacity hover:opacity-90"
                style={{
                  backgroundColor: '#FF0000'
                }}>

                <SendIcon className="w-4 h-4" />
                SUBMIT REVIEW →
              </motion.button>
              <AnimatePresence>
                {submitted &&
                <motion.p
                  initial={{
                    opacity: 0,
                    y: -5
                  }}
                  animate={{
                    opacity: 1,
                    y: 0
                  }}
                  exit={{
                    opacity: 0
                  }}
                  className="font-mono text-xs text-green-400 text-center uppercase tracking-widest">

                    ✓ Review submitted! Thank you.
                  </motion.p>
                }
              </AnimatePresence>
            </form>
          </div>

          {/* Reviews List */}
          <div className="space-y-4 max-h-[480px] overflow-y-auto pr-1">
            <AnimatePresence initial={false}>
              {reviews.map((review, i) =>
              <motion.div
                key={review.id}
                initial={{
                  opacity: 0,
                  y: 20
                }}
                animate={{
                  opacity: 1,
                  y: 0
                }}
                transition={{
                  delay: i < 3 ? i * 0.06 : 0,
                  duration: 0.4
                }}
                className="rounded-xl p-4 border border-white/10"
                style={{
                  backgroundColor: 'rgba(255,255,255,0.08)'
                }}>

                  <div className="flex items-start justify-between mb-2 gap-2">
                    <div className="flex items-center gap-3">
                      <div
                      className="w-9 h-9 rounded-full flex items-center justify-center flex-shrink-0"
                      style={{
                        backgroundColor: '#FF0000'
                      }}>

                        <span className="font-mono text-xs text-white font-bold">
                          {review.name.charAt(0).toUpperCase()}
                        </span>
                      </div>
                      <div>
                        <p className="font-mono text-xs text-white font-bold">
                          {review.name}
                        </p>
                        <p className="font-mono text-xs text-white/40">
                          {review.time}
                        </p>
                      </div>
                    </div>
                    <StarRating value={review.rating} />
                  </div>
                  <p className="font-mono text-sm text-white/70 leading-relaxed pl-12">
                    {review.comment}
                  </p>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>
      </div>
    </section>);

}
// ─── Product Cards ────────────────────────────────────────────────────────────
function FlashProductCard({
  product


}: {product: (typeof FLASH_PRODUCTS)[0];}) {
  const [liked, setLiked] = useState(false);
  const { addToCart, cartItems } = useCart();
  const inCart = cartItems.some((i) => i.id === product.id);
  return (
    <div className="flex-shrink-0 w-44 bg-white border border-gray-100 rounded-lg overflow-hidden group shadow-sm">
      <div className="relative h-44 overflow-hidden bg-gray-50">
        <img
          src={product.image}
          alt={product.name}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300" />

        <button
          onClick={() => setLiked((l) => !l)}
          className="absolute top-2 right-2 w-7 h-7 bg-white rounded-full flex items-center justify-center shadow">

          <Heart
            className={`w-4 h-4 ${liked ? 'fill-red-500 text-red-500' : 'text-gray-400'}`} />

        </button>
        {product.original &&
        <div className="absolute top-2 left-2 bg-red-500 text-white font-mono text-xs px-1.5 py-0.5 rounded font-bold">
            SALE
          </div>
        }
      </div>
      <div className="p-2">
        <p className="font-mono text-xs text-gray-800 leading-tight mb-1 truncate">
          {product.name}
        </p>
        <div className="flex items-center gap-1 mb-1">
          <Star className="w-3 h-3 fill-yellow-400 text-yellow-400" />
          <span className="font-mono text-xs text-gray-500">
            {product.rating} · {product.sold} Sold
          </span>
        </div>
        <p className="font-mono text-sm font-bold text-gray-900">
          {product.price}
        </p>
        {product.original &&
        <p className="font-mono text-xs text-red-500 line-through">
            {product.original}
          </p>
        }
        {product.progress > 0 &&
        <div className="mt-1.5">
            <div className="h-1.5 bg-gray-100 rounded-full overflow-hidden">
              <div
              className="h-full bg-red-500 rounded-full"
              style={{
                width: `${product.progress}%`
              }} />

            </div>
          </div>
        }
        <button
          onClick={() =>
          !inCart &&
          addToCart({
            id: product.id,
            name: product.name,
            size: 'ONE SIZE',
            price: product.price,
            image: product.image
          })
          }
          className="mt-2 w-full font-mono text-xs py-1.5 rounded transition-colors font-bold"
          style={{
            backgroundColor: inCart ? '#9E055F' : '#000',
            color: '#fff'
          }}>

          {inCart ? '✓ IN CART' : 'ADD TO CART'}
        </button>
      </div>
    </div>);

}
function TodayProductCard({
  product


}: {product: (typeof FLASH_PRODUCTS)[0];}) {
  const [liked, setLiked] = useState(false);
  const { addToCart, cartItems } = useCart();
  const inCart = cartItems.some((i) => i.id === product.id);
  return (
    <motion.div
      variants={{
        hidden: {
          opacity: 0,
          y: 20
        },
        visible: {
          opacity: 1,
          y: 0,
          transition: {
            duration: 0.4,
            ease: [0.22, 1, 0.36, 1]
          }
        }
      }}
      className="bg-white border border-gray-100 rounded-lg overflow-hidden group cursor-pointer shadow-sm">

      <div className="relative h-40 overflow-hidden bg-gray-50">
        <img
          src={product.image}
          alt={product.name}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300" />

        <button
          onClick={() => setLiked((l) => !l)}
          className="absolute top-2 right-2 w-7 h-7 bg-white rounded-full flex items-center justify-center shadow">

          <Heart
            className={`w-4 h-4 ${liked ? 'fill-red-500 text-red-500' : 'text-gray-400'}`} />

        </button>
        {product.original &&
        <div className="absolute top-2 left-2 bg-red-500 text-white font-mono text-xs px-1.5 py-0.5 rounded font-bold">
            SALE
          </div>
        }
      </div>
      <div className="p-2.5">
        <p className="font-mono text-xs text-gray-800 leading-tight mb-1 line-clamp-2">
          {product.name}
        </p>
        <div className="flex items-center gap-1 mb-1">
          <Star className="w-3 h-3 fill-yellow-400 text-yellow-400" />
          <span className="font-mono text-xs text-gray-500">
            {product.rating} · {product.sold} Sold
          </span>
        </div>
        <div className="flex items-baseline gap-1.5">
          <p className="font-mono text-sm font-bold text-gray-900">
            {product.price}
          </p>
          {product.original &&
          <p className="font-mono text-xs text-gray-400 line-through">
              {product.original}
            </p>
          }
        </div>
        <button
          onClick={() =>
          !inCart &&
          addToCart({
            id: product.id,
            name: product.name,
            size: 'ONE SIZE',
            price: product.price,
            image: product.image
          })
          }
          className="mt-2 w-full font-mono text-xs py-1.5 rounded transition-colors font-bold"
          style={{
            backgroundColor: inCart ? '#9E055F' : '#000',
            color: '#fff'
          }}>

          {inCart ? '✓ IN CART' : 'ADD TO CART'}
        </button>
      </div>
    </motion.div>);

}
// ─── Main Page ────────────────────────────────────────────────────────────────
export function HomePage() {
  const [activeTab, setActiveTab] = useState('Best Seller');
  const [heroDot, setHeroDot] = useState(0);
  const flashScrollRef = useRef<HTMLDivElement>(null);
  const todayRef = useRef<HTMLDivElement>(null);
  const scrollFlash = (dir: 'left' | 'right') => {
    if (flashScrollRef.current) {
      flashScrollRef.current.scrollBy({
        left: dir === 'right' ? 200 : -200,
        behavior: 'smooth'
      });
    }
  };
  return (
    <div
      className="w-full"
      style={{
        backgroundColor: PRIMARY
      }}>

      <Marquee />

      {/* ── HERO ── */}
      <section
        className="relative overflow-hidden"
        style={{
          background: `radial-gradient(ellipse at 70% 50%, #c4076e 0%, #9E055F 40%, #7a0449 100%)`
        }}>

        <div
          className="absolute inset-0 pointer-events-none"
          aria-hidden="true">

          <div
            className="absolute top-10 left-10 w-64 h-64 rounded-full opacity-10"
            style={{
              background: 'radial-gradient(circle, #fff 0%, transparent 70%)'
            }} />

          <div
            className="absolute bottom-10 left-1/3 w-96 h-96 rounded-full opacity-5"
            style={{
              background: 'radial-gradient(circle, #fff 0%, transparent 70%)'
            }} />

          <div
            className="absolute top-1/4 right-1/4 w-48 h-48 rounded-full opacity-10"
            style={{
              background:
              'radial-gradient(circle, #FF0000 0%, transparent 70%)'
            }} />

        </div>

        <div className="relative max-w-screen-xl mx-auto px-6 py-16 md:py-24 grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
          <div>
            <motion.p
              initial={{
                opacity: 0,
                y: 10
              }}
              animate={{
                opacity: 1,
                y: 0
              }}
              transition={{
                delay: 0.1
              }}
              className="font-mono text-xs text-white/60 uppercase tracking-[0.3em] mb-4">

              #Big Beauty Sale
            </motion.p>
            <motion.h1
              initial={{
                opacity: 0,
                y: 40
              }}
              animate={{
                opacity: 1,
                y: 0
              }}
              transition={{
                delay: 0.2,
                duration: 0.7,
                ease: [0.22, 1, 0.36, 1]
              }}
              className="font-anton text-6xl md:text-8xl text-white leading-none uppercase mb-4">

              LET'S GLOW
              <br />
              <span
                style={{
                  color: '#FF0000'
                }}>

                BEYOND
              </span>
              <br />
              BOUNDARIES
            </motion.h1>
            <motion.p
              initial={{
                opacity: 0,
                y: 10
              }}
              animate={{
                opacity: 1,
                y: 0
              }}
              transition={{
                delay: 0.4
              }}
              className="font-mono text-sm text-white/70 mb-8 max-w-sm leading-relaxed">

              Premium Ladies Oil & Beauty Products — crafted for your glow
              journey.
            </motion.p>
            <motion.div
              initial={{
                opacity: 0,
                y: 10
              }}
              animate={{
                opacity: 1,
                y: 0
              }}
              transition={{
                delay: 0.5
              }}
              className="flex gap-3 flex-wrap">

              <Link
                to="/shop"
                className="font-mono text-sm uppercase tracking-widest text-white px-8 py-3 font-bold transition-colors"
                style={{
                  backgroundColor: '#FF0000'
                }}>

                SHOP NOW
              </Link>
              <Link
                to="/join"
                className="font-mono text-sm uppercase tracking-widest text-white px-8 py-3 font-bold border-2 border-white/40 hover:border-white transition-colors">

                JOIN US
              </Link>
            </motion.div>
            <div className="flex gap-2 mt-8">
              {[0, 1, 2].map((i) =>
              <button
                key={i}
                onClick={() => setHeroDot(i)}
                className="w-2.5 h-2.5 rounded-full transition-colors"
                style={{
                  backgroundColor:
                  heroDot === i ? '#fff' : 'rgba(255,255,255,0.3)'
                }} />

              )}
            </div>
          </div>

          <div className="relative flex justify-center items-center">
            <div
              className="absolute w-72 h-72 md:w-96 md:h-96 rounded-full"
              style={{
                background:
                'radial-gradient(circle, rgba(255,255,255,0.15) 0%, transparent 70%)',
                filter: 'blur(20px)'
              }} />

            <motion.div
              animate={{
                rotate: 360
              }}
              transition={{
                duration: 30,
                repeat: Infinity,
                ease: 'linear'
              }}
              className="absolute w-80 h-80 md:w-[420px] md:h-[420px] rounded-full border border-white/10"
              style={{
                borderStyle: 'dashed'
              }} />

            <motion.div
              animate={{
                rotate: -360
              }}
              transition={{
                duration: 20,
                repeat: Infinity,
                ease: 'linear'
              }}
              className="absolute w-64 h-64 md:w-[340px] md:h-[340px] rounded-full border border-white/10" />

            <motion.div
              animate={{
                rotate: 360
              }}
              transition={{
                duration: 18,
                repeat: Infinity,
                ease: 'linear'
              }}
              className="relative z-10">

              <img
                src={HERO_IMAGE}
                alt="Ladies Oil Product"
                className="w-56 h-56 md:w-80 md:h-80 object-cover rounded-full shadow-2xl border-4 border-white/20"
                style={{
                  filter: 'drop-shadow(0 0 30px rgba(255,255,255,0.2))'
                }} />

            </motion.div>
            <motion.div
              animate={{
                y: [0, -10, 0]
              }}
              transition={{
                duration: 3,
                repeat: Infinity,
                ease: 'easeInOut'
              }}
              className="absolute top-4 right-4 md:right-0 bg-white rounded-xl px-3 py-2 shadow-lg z-20">

              <p className="font-mono text-xs text-gray-500">Best Seller</p>
              <p
                className="font-anton text-lg"
                style={{
                  color: PRIMARY
                }}>

                50% OFF
              </p>
            </motion.div>
            <motion.div
              animate={{
                y: [0, 8, 0]
              }}
              transition={{
                duration: 3.5,
                repeat: Infinity,
                ease: 'easeInOut',
                delay: 0.5
              }}
              className="absolute bottom-8 left-0 md:-left-4 bg-white rounded-xl px-3 py-2 shadow-lg z-20">

              <p className="font-mono text-xs text-gray-500">Starting from</p>
              <p
                className="font-anton text-lg"
                style={{
                  color: '#FF0000'
                }}>

                Rp75.000
              </p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* ── CATEGORIES ── */}
      <section className="py-6 px-6 border-b border-white/10">
        <div className="max-w-screen-xl mx-auto">
          <div className="flex items-center gap-6 overflow-x-auto pb-2 scrollbar-hide">
            {CATEGORIES.map(({ label, icon: Icon }) =>
            <button
              key={label}
              className="flex flex-col items-center gap-2 flex-shrink-0 group">

                <div
                className="w-14 h-14 rounded-full flex items-center justify-center transition-colors"
                style={{
                  backgroundColor: 'rgba(255,255,255,0.15)'
                }}>

                  <Icon className="w-6 h-6 text-white" />
                </div>
                <span className="font-mono text-xs text-white/70 whitespace-nowrap">
                  {label}
                </span>
              </button>
            )}
          </div>
        </div>
      </section>

      {/* ── FLASH SALE ── */}
      <section className="py-8 px-6 border-b border-white/10">
        <div className="max-w-screen-xl mx-auto">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-3">
              <Zap className="w-5 h-5 fill-red-500 text-red-500" />
              <h2 className="font-anton text-2xl text-white uppercase">
                Flash Sale
              </h2>
              <FlashCountdown />
            </div>
            <div className="flex gap-2">
              <button
                onClick={() => scrollFlash('left')}
                className="w-8 h-8 border border-white/30 flex items-center justify-center hover:bg-white/20 transition-colors text-white">

                <ChevronLeft className="w-4 h-4" />
              </button>
              <button
                onClick={() => scrollFlash('right')}
                className="w-8 h-8 border border-white/30 flex items-center justify-center hover:bg-white/20 transition-colors text-white">

                <ChevronRight className="w-4 h-4" />
              </button>
            </div>
          </div>
          <div
            ref={flashScrollRef}
            className="flex gap-3 overflow-x-auto pb-2 scrollbar-hide">

            {FLASH_PRODUCTS.map((p) =>
            <FlashProductCard key={p.id} product={p} />
            )}
          </div>
        </div>
      </section>

      {/* ── TODAYS FOR YOU ── */}
      <section className="py-8 px-6 border-b border-white/10">
        <div className="max-w-screen-xl mx-auto">
          <div className="flex flex-wrap items-center gap-3 mb-6">
            <h2 className="font-anton text-2xl text-white uppercase mr-2">
              Todays For You!
            </h2>
            {TABS.map((tab) =>
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className="font-mono text-xs px-4 py-1.5 rounded-full border transition-colors"
              style={{
                backgroundColor: activeTab === tab ? '#fff' : 'transparent',
                color: activeTab === tab ? PRIMARY : '#fff',
                borderColor:
                activeTab === tab ? '#fff' : 'rgba(255,255,255,0.4)'
              }}>

                {tab}
              </button>
            )}
          </div>
          <AnimatePresence mode="wait">
            <motion.div
              key={activeTab}
              ref={todayRef}
              initial="hidden"
              animate="visible"
              exit={{
                opacity: 0,
                y: -10,
                transition: {
                  duration: 0.2
                }
              }}
              variants={{
                hidden: {},
                visible: {
                  transition: {
                    staggerChildren: 0.07
                  }
                }
              }}
              className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3">

              {ALL_TAB_PRODUCTS[activeTab].map((p) =>
              <TodayProductCard key={p.id} product={p} />
              )}
            </motion.div>
          </AnimatePresence>
        </div>
      </section>

      {/* ── BEST SELLING STORE ── */}
      <section className="py-10 px-6 border-b border-white/10">
        <div className="max-w-screen-xl mx-auto">
          <h2 className="font-anton text-2xl text-white uppercase mb-6 text-center">
            Best Selling Store
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div
              className="relative rounded-xl overflow-hidden flex flex-col items-center justify-end min-h-64"
              style={{
                backgroundColor: DARK
              }}>

              <img
                src={HERO_IMAGE}
                alt="GlowShop Mall"
                className="absolute inset-0 w-full h-full object-cover opacity-50" />

              <div className="relative z-10 p-4 text-center">
                <p className="font-anton text-2xl text-white">GlowShop Mall</p>
                <p className="font-mono text-xs text-white/70">
                  Shop, Glow, Delight and Experience Beauty Magic!
                </p>
              </div>
            </div>
            <div className="md:col-span-2 grid grid-cols-1 sm:grid-cols-2 gap-4">
              {STORES.map((store) =>
              <div
                key={store.name}
                className="rounded-xl p-3 border border-white/20"
                style={{
                  backgroundColor: 'rgba(255,255,255,0.08)'
                }}>

                  <div className="flex items-center gap-2 mb-2">
                    <div
                    className="w-8 h-8 rounded-full flex items-center justify-center"
                    style={{
                      backgroundColor: '#FF0000'
                    }}>

                      <Sparkles className="w-4 h-4 text-white" />
                    </div>
                    <div>
                      <p className="font-mono text-xs font-bold text-white">
                        {store.name}
                      </p>
                      <p className="font-mono text-xs text-white/50">
                        {store.tagline}
                      </p>
                    </div>
                  </div>
                  <div className="flex gap-2">
                    {store.products.map((p, i) =>
                  <div key={i} className="flex-1">
                        <img
                      src={p.img}
                      alt=""
                      className="w-full h-16 object-cover rounded border border-white/10" />

                        <p className="font-mono text-xs text-white/70 mt-1">
                          {p.price}
                        </p>
                      </div>
                  )}
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* ── QUOTE BANNER ── */}
      <section
        className="py-16 px-6"
        style={{
          backgroundColor: DARK
        }}>

        <div className="max-w-screen-xl mx-auto text-center">
          <motion.h2
            initial={{
              opacity: 0,
              y: 30
            }}
            whileInView={{
              opacity: 1,
              y: 0
            }}
            viewport={{
              once: true
            }}
            transition={{
              duration: 0.7,
              ease: [0.22, 1, 0.36, 1]
            }}
            className="font-anton text-4xl md:text-6xl text-white italic">

            "Let's Glow Beyond Boundaries"
          </motion.h2>
          <motion.div
            initial={{
              opacity: 0,
              y: 20
            }}
            whileInView={{
              opacity: 1,
              y: 0
            }}
            viewport={{
              once: true
            }}
            transition={{
              duration: 0.5,
              delay: 0.2
            }}
            className="mt-6">

            <Link
              to="/join"
              className="inline-block font-mono text-sm uppercase tracking-widest text-white px-10 py-4 font-bold transition-colors"
              style={{
                backgroundColor: '#FF0000'
              }}>

              JOIN WITH US →
            </Link>
          </motion.div>
        </div>
      </section>

      {/* ── CUSTOMER REVIEWS ── */}
      <ReviewsSection />

      {/* ── FOOTER ── */}
      <footer
        className="py-12 px-6 border-t border-white/10"
        style={{
          backgroundColor: DARK
        }}>

        <div className="max-w-screen-xl mx-auto">
          <div className="grid grid-cols-2 md:grid-cols-5 gap-8 mb-10">
            <div className="col-span-2 md:col-span-1">
              <Link
                to="/"
                className="font-anton text-3xl text-white block mb-2">

                GLOW
                <span
                  style={{
                    color: '#FF0000'
                  }}>

                  .
                </span>
              </Link>
              <p className="font-mono text-xs text-white/50">
                "Let's Glow Beyond Boundaries"
              </p>
              <div className="flex gap-3 mt-4">
                {['F', 'T', 'Y', 'I'].map((s) =>
                <div
                  key={s}
                  className="w-7 h-7 rounded-full flex items-center justify-center"
                  style={{
                    backgroundColor: 'rgba(255,255,255,0.15)'
                  }}>

                    <span className="font-mono text-xs text-white">{s}</span>
                  </div>
                )}
              </div>
            </div>
            {[
            {
              title: 'About',
              links: ['About Us', 'Career', 'Blog', 'B2B']
            },
            {
              title: 'Buy',
              links: ['Bill & Top Up', 'COD', 'Blog', 'Promo']
            },
            {
              title: 'Sell',
              links: ['Seller Education', 'Brand Index', 'Register Store']
            },
            {
              title: 'Help',
              links: ['Customer Care', 'Terms', 'Privacy', 'FAQ']
            }].
            map((col) =>
            <div key={col.title}>
                <p className="font-mono text-xs font-bold text-white uppercase tracking-widest mb-3">
                  {col.title}
                </p>
                <ul className="space-y-2">
                  {col.links.map((l) =>
                <li key={l}>
                      <a
                    href="#"
                    className="font-mono text-xs text-white/50 hover:text-white transition-colors">

                        {l}
                      </a>
                    </li>
                )}
                </ul>
              </div>
            )}
          </div>
          <div className="border-t border-white/10 pt-6 text-center">
            <p className="font-mono text-xs text-white/30">
              © 2001 – 2025 GLOW Beauty. All rights reserved.
            </p>
          </div>
        </div>
      </footer>
    </div>);

}
function FlashCountdown() {
  const [time, setTime] = useState({
    h: 8,
    m: 17,
    s: 56
  });
  useEffect(() => {
    const id = setInterval(() => {
      setTime((prev) => {
        let { h, m, s } = prev;
        s--;
        if (s < 0) {
          s = 59;
          m--;
        }
        if (m < 0) {
          m = 59;
          h--;
        }
        if (h < 0) {
          h = 23;
          m = 59;
          s = 59;
        }
        return {
          h,
          m,
          s
        };
      });
    }, 1000);
    return () => clearInterval(id);
  }, []);
  const pad = (n: number) => String(n).padStart(2, '0');
  return (
    <div className="flex items-center gap-1">
      {[time.h, time.m, time.s].map((v, i) =>
      <Fragment key={i}>
          <span className="font-mono text-xs bg-red-600 text-white px-2 py-1 rounded font-bold min-w-[28px] text-center">
            {pad(v)}
          </span>
          {i < 2 &&
        <span className="font-mono text-xs text-red-400 font-bold">:</span>
        }
        </Fragment>
      )}
    </div>);

}