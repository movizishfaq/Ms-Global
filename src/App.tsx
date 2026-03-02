import React, { useState, createContext, useContext } from 'react';
import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom';
import { AnimatePresence, motion } from 'framer-motion';
import { Header } from './components/Header';
import { CartNotification } from './components/CartNotification';
import { HomePage } from './pages/HomePage';
import { ShopPage } from './pages/ShopPage';
import { AboutPage } from './pages/AboutPage';
import { ContactPage } from './pages/ContactPage';
import { SignInPage } from './pages/SignInPage';
import { DashboardPage } from './pages/DashboardPage';
import { JoinPage } from './pages/JoinPage';
import { CartPage } from './pages/CartPage';
import { CheckoutPage } from './pages/CheckoutPage';
import { OrderConfirmationPage } from './pages/OrderConfirmationPage';
// ─── Types ────────────────────────────────────────────────────────────────────
export interface CartItem {
  id: string;
  name: string;
  size: string;
  price: string;
  image: string;
  quantity: number;
}
export interface User {
  name: string;
  email: string;
  avatar: string;
}
interface CartContextType {
  cartItems: CartItem[];
  cartCount: number;
  notification: CartItem | null;
  addToCart: (item: Omit<CartItem, 'quantity'>) => void;
  removeFromCart: (id: string) => void;
  updateQuantity: (id: string, qty: number) => void;
  clearCart: () => void;
}
interface AuthContextType {
  user: User | null;
  signIn: (user: User) => void;
  signOut: () => void;
}
// ─── Contexts ─────────────────────────────────────────────────────────────────
export const CartContext = createContext<CartContextType>({
  cartItems: [],
  cartCount: 0,
  notification: null,
  addToCart: () => {},
  removeFromCart: () => {},
  updateQuantity: () => {},
  clearCart: () => {}
});
export const AuthContext = createContext<AuthContextType>({
  user: null,
  signIn: () => {},
  signOut: () => {}
});
export function useCart() {
  return useContext(CartContext);
}
export function useAuth() {
  return useContext(AuthContext);
}
// ─── Page Transition ──────────────────────────────────────────────────────────
const pageVariants = {
  initial: {
    opacity: 0,
    y: 20
  },
  enter: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.4,
      ease: [0.22, 1, 0.36, 1]
    }
  },
  exit: {
    opacity: 0,
    y: -20,
    transition: {
      duration: 0.25,
      ease: [0.22, 1, 0.36, 1]
    }
  }
};
function AnimatedRoutes() {
  const location = useLocation();
  return (
    <AnimatePresence mode="wait">
      <motion.div
        key={location.pathname}
        variants={pageVariants}
        initial="initial"
        animate="enter"
        exit="exit">

        <Routes location={location}>
          <Route path="/" element={<HomePage />} />
          <Route path="/shop" element={<ShopPage />} />
          <Route path="/about" element={<AboutPage />} />
          <Route path="/contact" element={<ContactPage />} />
          <Route path="/signin" element={<SignInPage />} />
          <Route path="/dashboard" element={<DashboardPage />} />
          <Route path="/join" element={<JoinPage />} />
          <Route path="/cart" element={<CartPage />} />
          <Route path="/checkout" element={<CheckoutPage />} />
          <Route
            path="/order-confirmation"
            element={<OrderConfirmationPage />} />

        </Routes>
      </motion.div>
    </AnimatePresence>);

}
// ─── App ──────────────────────────────────────────────────────────────────────
export function App() {
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [notification, setNotification] = useState<CartItem | null>(null);
  const [user, setUser] = useState<User | null>(null);
  const addToCart = (item: Omit<CartItem, 'quantity'>) => {
    setCartItems((prev) => {
      const exists = prev.find((i) => i.id === item.id);
      if (exists) return prev;
      return [
      ...prev,
      {
        ...item,
        quantity: 1
      }];

    });
    const fullItem = {
      ...item,
      quantity: 1
    };
    setNotification(fullItem);
    setTimeout(() => setNotification(null), 3000);
  };
  const removeFromCart = (id: string) => {
    setCartItems((prev) => prev.filter((i) => i.id !== id));
  };
  const updateQuantity = (id: string, qty: number) => {
    if (qty <= 0) {
      removeFromCart(id);
      return;
    }
    setCartItems((prev) =>
    prev.map((i) =>
    i.id === id ?
    {
      ...i,
      quantity: qty
    } :
    i
    )
    );
  };
  const clearCart = () => setCartItems([]);
  const signIn = (u: User) => setUser(u);
  const signOut = () => setUser(null);
  return (
    <AuthContext.Provider
      value={{
        user,
        signIn,
        signOut
      }}>

      <CartContext.Provider
        value={{
          cartItems,
          cartCount: cartItems.reduce((sum, i) => sum + i.quantity, 0),
          notification,
          addToCart,
          removeFromCart,
          updateQuantity,
          clearCart
        }}>

        <BrowserRouter>
          <CartNotification />
          <Header />
          <main>
            <AnimatedRoutes />
          </main>
        </BrowserRouter>
      </CartContext.Provider>
    </AuthContext.Provider>);

}