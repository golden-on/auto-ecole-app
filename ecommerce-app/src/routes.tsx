import {Route, Routes } from 'react-router-dom';
import HomePage from './pages/HomePage';
import ProductDetails from './pages/ProductPage';
import CartPage from './pages/CartPage';
import LoginPage from './pages/LoginPage';
import SignInPage from './pages/SignInPage';
import CheckoutPage from './pages/checkoutPage';

function RouteContainer() {
  return (
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/cart" element={<CartPage />} />
        <Route path="/signIn" element={<SignInPage />} />
        <Route path="/logIn" element={<LoginPage />} />
        <Route path="/checkout" element={<CheckoutPage />} />
        {/* <Route path="/product/:id" element={<ProductDetails product={{ name: '', description: '', price: 0, category: '', availability: '' }} />} /> */}
        {/* <Route path="/product/:id" element={<ProductPage />} />
        <Route path="/cart" element={<CartPage />} />
        <Route path="/checkout" element={<CheckoutPage />} /> */}
      </Routes>
  );
}

export default RouteContainer;
