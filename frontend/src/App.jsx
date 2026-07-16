import { Route, Routes } from 'react-router-dom'
import Navbar from './components/Navbar'
import Footer from './components/Footer'
import Home from './pages/Home'
import Login from './pages/Login'
import Register from './pages/Register'
import Marketplace from './pages/Marketplace'
import PublishProduct from './pages/PublishProduct'
import MarketplaceDetail from './pages/MarketplaceDetail'
import PurchaseFlow from './pages/PurchaseFlow'
import Store from './pages/Store'
import StoreDetail from './pages/StoreDetail'
import CartPage from './pages/CartPage'
import Favorites from './pages/Favorites'
import Profile from './pages/Profile'
import Publications from './pages/Publications'
import NotFound from './pages/NotFound'
import Toast from './components/Toast'

export default function App() {
  return (
    <div className="min-h-screen bg-[#0f1111] text-slate-100">
      <Navbar />
      <main className="mx-auto w-full max-w-7xl px-4 py-6 sm:px-6 lg:px-8">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/marketplace" element={<Marketplace />} />
          <Route path="/marketplace/publish" element={<PublishProduct />} />
          <Route path="/marketplace/product/:id" element={<MarketplaceDetail />} />
          <Route path="/purchase-flow/:id" element={<PurchaseFlow />} />
          <Route path="/store" element={<Store />} />
          <Route path="/store/product/:id" element={<StoreDetail />} />
          <Route path="/cart" element={<CartPage />} />
          <Route path="/favorites" element={<Favorites />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/publications" element={<Publications />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </main>
      <Footer />
      <Toast />
    </div>
  )
}
