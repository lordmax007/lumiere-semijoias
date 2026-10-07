import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import { CartProvider } from './context/CartContext'
import Layout from './components/layout/Layout'
import Search from './pages/Search'
import Checkout from './pages/Checkout'
import Login from './pages/Login'
import Register from './pages/Register'
import Configuracoes from './pages/Configuracoes'
import PerollaCatalogo from './pages/PerollaCatalogo'
import PerolaCategoria from './pages/PerolaCategoria'
import AdminLayout from './pages/admin/AdminLayout'
import Dashboard from './pages/admin/Dashboard'
import AdminProducts from './pages/admin/AdminProducts'
import AdminOrders from './pages/admin/AdminOrders'
import AdminColecoes from './pages/admin/AdminColecoes'
import ProductForm from './pages/admin/ProductForm'

export default function App() {
  return (
    <CartProvider>
      <BrowserRouter>
        <Routes>
          <Route element={<Layout />}>
            <Route path="/" element={<Navigate to="/perolla" replace />} />
            <Route path="/produtos" element={<Navigate to="/perolla" replace />} />
            <Route path="/colecao/:slug" element={<Navigate to="/perolla" replace />} />
            <Route path="/busca" element={<Search />} />
            <Route path="/checkout" element={<Checkout />} />
            <Route path="/login" element={<Login />} />
            <Route path="/cadastro" element={<Register />} />
            <Route path="/configuracoes" element={<Configuracoes />} />
            <Route path="/perolla" element={<PerollaCatalogo />} />
            <Route path="/perolla/:categoria" element={<PerolaCategoria />} />
          </Route>
          <Route path="/admin" element={<AdminLayout />}>
            <Route index element={<Dashboard />} />
            <Route path="produtos" element={<AdminProducts />} />
            <Route path="produtos/novo" element={<ProductForm />} />
            <Route path="produtos/:id" element={<ProductForm />} />
            <Route path="colecoes" element={<AdminColecoes />} />
            <Route path="pedidos" element={<AdminOrders />} />
          </Route>
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </BrowserRouter>
    </CartProvider>
  )
}
