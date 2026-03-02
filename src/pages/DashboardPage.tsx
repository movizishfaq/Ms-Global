import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import {
  ShoppingBagIcon,
  TrendingUpIcon,
  PackageIcon,
  DollarSignIcon,
  StarIcon,
  ArrowRightIcon,
  BarChart2Icon,
  HeartIcon,
  CopyIcon,
  CheckIcon,
  UsersIcon,
  GiftIcon } from
'lucide-react';
import { useAuth, useCart } from '../App';
const PRIMARY = '#9E055F';
const DARK = '#7a0449';
const RECENT_ORDERS = [
{
  id: '#ORD-001',
  name: 'Rose Hip Face Oil',
  date: 'Mar 1, 2026',
  status: 'Delivered',
  price: 'Rp89.000',
  image: "/original-4006ba5de374258f3b7a9bf72a711ce4.webp"

},
{
  id: '#ORD-002',
  name: 'Vitamin C Serum',
  date: 'Feb 28, 2026',
  status: 'Processing',
  price: 'Rp125.000',
  image:
  'https://images.unsplash.com/photo-1608248597279-f99d160bfcbc?w=100&q=80'
},
{
  id: '#ORD-003',
  name: 'Argan Hair Oil',
  date: 'Feb 25, 2026',
  status: 'Delivered',
  price: 'Rp99.000',
  image:
  'https://images.unsplash.com/photo-1571781926291-c477ebfd024b?w=100&q=80'
}];

const SOLD_ITEMS = [
{
  name: 'Jojoba Face Oil',
  sold: 42,
  revenue: 'Rp5.040.000',
  image:
  'https://images.unsplash.com/photo-1596462502278-27bfdc403348?w=100&q=80'
},
{
  name: 'Glow Serum Kit',
  sold: 28,
  revenue: 'Rp3.360.000',
  image:
  'https://images.unsplash.com/photo-1522335789203-aabd1fc54bc9?w=100&q=80'
},
{
  name: 'Body Glow Oil',
  sold: 19,
  revenue: 'Rp1.425.000',
  image:
  'https://images.unsplash.com/photo-1570194065650-d99fb4bedf0a?w=100&q=80'
}];

const ANALYTICS = [
{
  label: 'Products Bought',
  value: '12',
  icon: ShoppingBagIcon,
  change: '+3 this month'
},
{
  label: 'Products Sold',
  value: '89',
  icon: PackageIcon,
  change: '+12 this month'
},
{
  label: 'Total Profit',
  value: 'Rp9.8M',
  icon: DollarSignIcon,
  change: '+Rp1.2M this month'
},
{
  label: 'Avg. Rating',
  value: '4.9★',
  icon: StarIcon,
  change: 'Top Seller Badge'
}];

export function DashboardPage() {
  const { user, signOut } = useAuth();
  const { cartItems } = useCart();
  const navigate = useNavigate();
  const [activeSection, setActiveSection] = useState<
    'overview' | 'orders' | 'selling' | 'cart'>(
    'overview');
  const [copied, setCopied] = useState(false);
  const referralLink = `https://msglobal.com/ref/${user?.name?.toLowerCase().replace(/\s+/g, '') ?? 'user'}`;
  const handleCopyLink = () => {
    navigator.clipboard.writeText(referralLink).catch(() => {});
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };
  if (!user) {
    return (
      <div
        className="w-full min-h-screen flex items-center justify-center"
        style={{
          backgroundColor: PRIMARY
        }}>

        <div className="text-center">
          <p className="font-mono text-white/70 text-sm mb-4">
            Please sign in to view your dashboard
          </p>
          <Link
            to="/signin"
            className="font-mono text-sm uppercase tracking-widest text-white px-6 py-3 rounded-lg font-bold"
            style={{
              backgroundColor: '#FF0000'
            }}>

            SIGN IN
          </Link>
        </div>
      </div>);

  }
  return (
    <div
      className="w-full min-h-screen"
      style={{
        backgroundColor: PRIMARY
      }}>

      {/* Header */}
      <div
        className="border-b border-white/10 px-6 py-6"
        style={{
          backgroundColor: DARK
        }}>

        <div className="max-w-screen-xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-4">
            <div
              className="w-14 h-14 rounded-full overflow-hidden border-2 border-white/30 flex items-center justify-center"
              style={{
                backgroundColor: '#FF0000'
              }}>

              {user.avatar ?
              <img
                src={user.avatar}
                alt={user.name}
                className="w-full h-full object-cover" /> :


              <span className="font-anton text-xl text-white">
                  {user.name.charAt(0).toUpperCase()}
                </span>
              }
            </div>
            <div>
              <p className="font-mono text-xs text-white/50 uppercase tracking-widest">
                Welcome back,
              </p>
              <p className="font-anton text-2xl text-white">{user.name}</p>
            </div>
          </div>
          <button
            onClick={() => {
              signOut();
              navigate('/');
            }}
            className="font-mono text-xs text-white/50 hover:text-white transition-colors uppercase tracking-widest">

            SIGN OUT
          </button>
        </div>
      </div>

      <div className="max-w-screen-xl mx-auto px-6 py-8">
        {/* Tab Nav */}
        <div className="flex gap-2 mb-8 overflow-x-auto pb-2 scrollbar-hide">
          {(
          [
          {
            key: 'overview',
            label: 'Overview'
          },
          {
            key: 'orders',
            label: 'My Orders'
          },
          {
            key: 'selling',
            label: 'My Sales'
          },
          {
            key: 'cart',
            label: `Cart (${cartItems.length})`
          }] as
          const).
          map(({ key, label }) =>
          <button
            key={key}
            onClick={() => setActiveSection(key)}
            className="font-mono text-xs uppercase tracking-widest px-5 py-2.5 rounded-full whitespace-nowrap transition-colors font-bold"
            style={{
              backgroundColor:
              activeSection === key ? '#fff' : 'rgba(255,255,255,0.1)',
              color: activeSection === key ? PRIMARY : '#fff'
            }}>

              {label}
            </button>
          )}
        </div>

        {/* ── OVERVIEW ── */}
        {activeSection === 'overview' &&
        <motion.div
          initial={{
            opacity: 0,
            y: 20
          }}
          animate={{
            opacity: 1,
            y: 0
          }}
          transition={{
            duration: 0.4
          }}>

            {/* Stats Grid */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
              {ANALYTICS.map((stat, i) =>
            <motion.div
              key={stat.label}
              initial={{
                opacity: 0,
                y: 20
              }}
              animate={{
                opacity: 1,
                y: 0
              }}
              transition={{
                delay: i * 0.08
              }}
              className="rounded-xl p-5 border border-white/10"
              style={{
                backgroundColor: 'rgba(255,255,255,0.1)'
              }}>

                  <div className="flex items-center justify-between mb-3">
                    <stat.icon className="w-5 h-5 text-white/60" />
                    <span className="font-mono text-xs text-green-400">
                      {stat.change}
                    </span>
                  </div>
                  <p className="font-anton text-3xl text-white mb-1">
                    {stat.value}
                  </p>
                  <p className="font-mono text-xs text-white/50 uppercase tracking-widest">
                    {stat.label}
                  </p>
                </motion.div>
            )}
            </div>

            {/* Chart */}
            <div
            className="rounded-xl p-6 border border-white/10 mb-6"
            style={{
              backgroundColor: 'rgba(255,255,255,0.08)'
            }}>

              <div className="flex items-center justify-between mb-4">
                <p className="font-anton text-lg text-white">SALES ANALYTICS</p>
                <BarChart2Icon className="w-5 h-5 text-white/40" />
              </div>
              <div className="flex items-end gap-2 h-32">
                {[40, 65, 45, 80, 55, 90, 70, 85, 60, 95, 75, 100].map(
                (h, i) =>
                <motion.div
                  key={i}
                  initial={{
                    height: 0
                  }}
                  animate={{
                    height: `${h}%`
                  }}
                  transition={{
                    delay: i * 0.05,
                    duration: 0.5,
                    ease: [0.22, 1, 0.36, 1]
                  }}
                  className="flex-1 rounded-t-sm"
                  style={{
                    backgroundColor:
                    i === 11 ? '#FF0000' : 'rgba(255,255,255,0.25)'
                  }} />


              )}
              </div>
              <div className="flex justify-between mt-2">
                {[
              'Jan',
              'Feb',
              'Mar',
              'Apr',
              'May',
              'Jun',
              'Jul',
              'Aug',
              'Sep',
              'Oct',
              'Nov',
              'Dec'].
              map((m) =>
              <span key={m} className="font-mono text-xs text-white/30">
                    {m}
                  </span>
              )}
              </div>
            </div>

            {/* Quick Actions */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-8">
              {[
            {
              label: 'Browse Shop',
              href: '/shop',
              icon: ShoppingBagIcon
            },
            {
              label: 'Join & Sell',
              href: '/join',
              icon: TrendingUpIcon
            },
            {
              label: 'View Wishlist',
              href: '/',
              icon: HeartIcon
            }].
            map(({ label, href, icon: Icon }) =>
            <Link
              key={label}
              to={href}
              className="flex items-center justify-between p-4 rounded-xl border border-white/10 hover:bg-white/10 transition-colors group"
              style={{
                backgroundColor: 'rgba(255,255,255,0.05)'
              }}>

                  <div className="flex items-center gap-3">
                    <Icon className="w-5 h-5 text-white/60" />
                    <span className="font-mono text-xs text-white uppercase tracking-widest">
                      {label}
                    </span>
                  </div>
                  <ArrowRightIcon className="w-4 h-4 text-white/30 group-hover:text-white transition-colors" />
                </Link>
            )}
            </div>

            {/* ── REFERRAL PROGRAM ── */}
            <div
            className="rounded-2xl p-6 border border-white/10"
            style={{
              backgroundColor: 'rgba(255,255,255,0.08)'
            }}>

              <div className="flex items-center gap-3 mb-5">
                <div
                className="w-10 h-10 rounded-full flex items-center justify-center"
                style={{
                  backgroundColor: 'rgba(255,0,0,0.2)'
                }}>

                  <GiftIcon className="w-5 h-5 text-red-400" />
                </div>
                <div>
                  <h3 className="font-anton text-xl text-white uppercase">
                    REFERRAL PROGRAM
                  </h3>
                  <p className="font-mono text-xs text-white/50">
                    Earn 10% commission on every referral sale
                  </p>
                </div>
              </div>

              <p className="font-mono text-sm text-white/70 leading-relaxed mb-5">
                Share your referral link and earn 10% commission on every sale
                your referrals make. The more you share, the more you earn!
              </p>

              {/* Referral Link */}
              <div className="flex gap-2 mb-6">
                <div
                className="flex-1 rounded-xl border border-white/20 px-4 py-3 font-mono text-xs text-white/70 truncate"
                style={{
                  backgroundColor: 'rgba(255,255,255,0.06)'
                }}>

                  {referralLink}
                </div>
                <motion.button
                onClick={handleCopyLink}
                whileTap={{
                  scale: 0.97
                }}
                className="flex items-center gap-2 px-4 py-3 rounded-xl font-mono text-xs uppercase tracking-widest text-white font-bold transition-all flex-shrink-0"
                style={{
                  backgroundColor: copied ? '#22c55e' : '#FF0000'
                }}>

                  {copied ?
                <CheckIcon className="w-4 h-4" /> :

                <CopyIcon className="w-4 h-4" />
                }
                  {copied ? 'COPIED!' : 'COPY LINK'}
                </motion.button>
              </div>

              {/* Referral Stats */}
              <div className="grid grid-cols-3 gap-4">
                <div
                className="rounded-xl p-4 border border-white/10 text-center"
                style={{
                  backgroundColor: 'rgba(255,255,255,0.06)'
                }}>

                  <UsersIcon className="w-5 h-5 text-white/50 mx-auto mb-2" />
                  <p className="font-anton text-2xl text-white">12</p>
                  <p className="font-mono text-xs text-white/50 uppercase tracking-widest mt-1">
                    Total Referrals
                  </p>
                </div>
                <div
                className="rounded-xl p-4 border border-white/10 text-center"
                style={{
                  backgroundColor: 'rgba(255,255,255,0.06)'
                }}>

                  <DollarSignIcon className="w-5 h-5 text-white/50 mx-auto mb-2" />
                  <p className="font-anton text-2xl text-white">Rp450K</p>
                  <p className="font-mono text-xs text-white/50 uppercase tracking-widest mt-1">
                    Commission Earned
                  </p>
                </div>
                <div
                className="rounded-xl p-4 border border-white/10 text-center"
                style={{
                  backgroundColor: 'rgba(255,255,255,0.06)'
                }}>

                  <GiftIcon className="w-5 h-5 text-white/50 mx-auto mb-2" />
                  <p className="font-anton text-2xl text-white">Rp120K</p>
                  <p className="font-mono text-xs text-white/50 uppercase tracking-widest mt-1">
                    Pending
                  </p>
                </div>
              </div>
            </div>
          </motion.div>
        }

        {/* ── ORDERS ── */}
        {activeSection === 'orders' &&
        <motion.div
          initial={{
            opacity: 0,
            y: 20
          }}
          animate={{
            opacity: 1,
            y: 0
          }}
          transition={{
            duration: 0.4
          }}>

            <p className="font-anton text-xl text-white mb-4">MY ORDERS</p>
            <div className="space-y-3">
              {RECENT_ORDERS.map((order, i) =>
            <motion.div
              key={order.id}
              initial={{
                opacity: 0,
                x: -20
              }}
              animate={{
                opacity: 1,
                x: 0
              }}
              transition={{
                delay: i * 0.08
              }}
              className="flex items-center gap-4 p-4 rounded-xl border border-white/10"
              style={{
                backgroundColor: 'rgba(255,255,255,0.08)'
              }}>

                  <img
                src={order.image}
                alt={order.name}
                className="w-14 h-14 object-cover rounded-lg flex-shrink-0" />

                  <div className="flex-1 min-w-0">
                    <p className="font-mono text-xs text-white font-bold truncate">
                      {order.name}
                    </p>
                    <p className="font-mono text-xs text-white/50">
                      {order.id} · {order.date}
                    </p>
                  </div>
                  <div className="text-right flex-shrink-0">
                    <p className="font-mono text-sm font-bold text-white">
                      {order.price}
                    </p>
                    <span
                  className="font-mono text-xs px-2 py-0.5 rounded-full"
                  style={{
                    backgroundColor:
                    order.status === 'Delivered' ?
                    'rgba(34,197,94,0.2)' :
                    'rgba(251,191,36,0.2)',
                    color:
                    order.status === 'Delivered' ? '#4ade80' : '#fbbf24'
                  }}>

                      {order.status}
                    </span>
                  </div>
                </motion.div>
            )}
            </div>
          </motion.div>
        }

        {/* ── SELLING ── */}
        {activeSection === 'selling' &&
        <motion.div
          initial={{
            opacity: 0,
            y: 20
          }}
          animate={{
            opacity: 1,
            y: 0
          }}
          transition={{
            duration: 0.4
          }}>

            <div className="flex items-center justify-between mb-4">
              <p className="font-anton text-xl text-white">MY SALES</p>
              <div
              className="rounded-lg px-4 py-2 border border-white/20"
              style={{
                backgroundColor: 'rgba(255,255,255,0.1)'
              }}>

                <p className="font-mono text-xs text-white/50">Total Revenue</p>
                <p className="font-anton text-lg text-white">Rp9.825.000</p>
              </div>
            </div>
            <div className="space-y-3">
              {SOLD_ITEMS.map((item, i) =>
            <motion.div
              key={item.name}
              initial={{
                opacity: 0,
                x: -20
              }}
              animate={{
                opacity: 1,
                x: 0
              }}
              transition={{
                delay: i * 0.08
              }}
              className="flex items-center gap-4 p-4 rounded-xl border border-white/10"
              style={{
                backgroundColor: 'rgba(255,255,255,0.08)'
              }}>

                  <img
                src={item.image}
                alt={item.name}
                className="w-14 h-14 object-cover rounded-lg flex-shrink-0" />

                  <div className="flex-1 min-w-0">
                    <p className="font-mono text-xs text-white font-bold">
                      {item.name}
                    </p>
                    <p className="font-mono text-xs text-white/50">
                      {item.sold} units sold
                    </p>
                    <div className="mt-1.5 h-1.5 bg-white/10 rounded-full overflow-hidden">
                      <div
                    className="h-full rounded-full"
                    style={{
                      width: `${item.sold / 50 * 100}%`,
                      backgroundColor: '#FF0000'
                    }} />

                    </div>
                  </div>
                  <p className="font-mono text-sm font-bold text-white flex-shrink-0">
                    {item.revenue}
                  </p>
                </motion.div>
            )}
            </div>
          </motion.div>
        }

        {/* ── CART ── */}
        {activeSection === 'cart' &&
        <motion.div
          initial={{
            opacity: 0,
            y: 20
          }}
          animate={{
            opacity: 1,
            y: 0
          }}
          transition={{
            duration: 0.4
          }}>

            <p className="font-anton text-xl text-white mb-4">MY CART</p>
            {cartItems.length === 0 ?
          <div className="text-center py-16">
                <ShoppingBagIcon className="w-12 h-12 text-white/20 mx-auto mb-4" />
                <p className="font-mono text-sm text-white/50 uppercase">
                  Your cart is empty
                </p>
                <Link
              to="/shop"
              className="inline-block mt-4 font-mono text-xs text-white uppercase tracking-widest px-6 py-2.5 rounded-lg"
              style={{
                backgroundColor: '#FF0000'
              }}>

                  BROWSE SHOP
                </Link>
              </div> :

          <div className="space-y-3">
                {cartItems.map((item, i) =>
            <motion.div
              key={item.id}
              initial={{
                opacity: 0,
                x: -20
              }}
              animate={{
                opacity: 1,
                x: 0
              }}
              transition={{
                delay: i * 0.06
              }}
              className="flex items-center gap-4 p-4 rounded-xl border border-white/10"
              style={{
                backgroundColor: 'rgba(255,255,255,0.08)'
              }}>

                    <img
                src={item.image}
                alt={item.name}
                className="w-14 h-14 object-cover rounded-lg flex-shrink-0" />

                    <div className="flex-1 min-w-0">
                      <p className="font-mono text-xs text-white font-bold truncate">
                        {item.name}
                      </p>
                      <p className="font-mono text-xs text-white/50">
                        {item.size} · Qty: {item.quantity}
                      </p>
                    </div>
                    <p className="font-mono text-sm font-bold text-white">
                      {item.price}
                    </p>
                  </motion.div>
            )}
                <div className="pt-4 border-t border-white/10">
                  <Link
                to="/cart"
                className="block w-full font-mono text-sm uppercase tracking-widest text-white py-4 rounded-xl font-bold text-center transition-opacity hover:opacity-90"
                style={{
                  backgroundColor: '#FF0000'
                }}>

                    VIEW FULL CART →
                  </Link>
                </div>
              </div>
          }
          </motion.div>
        }
      </div>
    </div>);

}