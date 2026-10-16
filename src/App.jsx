import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import { CartProvider } from './context/CartContext'
import Layout from './components/layout/Layout'
import ErrorBoundary from './components/ErrorBoundary'
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
import PerolaAdmin from './pages/admin/PerolaAdmin'
import ProductForm from './pages/admin/ProductForm'
import NotFound from './pages/NotFound'
import ErrorPage from './pages/ErrorPage'
import { MAINTENANCE_MODE } from './pages/Maintenance'
import Maintenance from './pages/Maintenance'
import Sobre from './pages/Sobre'
import Contato from './pages/Contato'
import FAQ from './pages/FAQ'
import ComoComprar from './pages/ComoComprar'
import Privacidade from './pages/Privacidade'
import PoliticaCookies from './pages/PoliticaCookies'
import Termos from './pages/Termos'
import Trocas from './pages/Trocas'
import Entrega from './pages/Entrega'
import FormasPagamento from './pages/FormasPagamento'
import EsqueciSenha from './pages/EsqueciSenha'
import RedefinirSenha from './pages/RedefinirSenha'

export default function App() {
  if (MAINTENANCE_MODE) return <Maintenance />

  return (
    <ErrorBoundary fallback={<ErrorPage />}>
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
              <Route path="/esqueci-senha" element={<EsqueciSenha />} />
              <Route path="/redefinir-senha" element={<RedefinirSenha />} />
              <Route path="/configuracoes" element={<Configuracoes />} />
              <Route path="/perolla" element={<PerollaCatalogo />} />
              <Route path="/perolla/:categoria" element={<PerolaCategoria />} />
              <Route path="/sobre" element={<Sobre />} />
              <Route path="/contato" element={<Contato />} />
              <Route path="/faq" element={<FAQ />} />
              <Route path="/como-comprar" element={<ComoComprar />} />
              <Route path="/privacidade" element={<Privacidade />} />
              <Route path="/cookies" element={<PoliticaCookies />} />
              <Route path="/termos" element={<Termos />} />
              <Route path="/trocas" element={<Trocas />} />
              <Route path="/entrega" element={<Entrega />} />
              <Route path="/formas-pagamento" element={<FormasPagamento />} />
            </Route>
            {/* URL do painel — não compartilhe publicamente */}
            <Route path="/gp-8f3a2k7m" element={<AdminLayout />}>
              <Route index element={<Dashboard />} />
              <Route path="produtos" element={<AdminProducts />} />
              <Route path="produtos/novo" element={<ProductForm />} />
              <Route path="produtos/:id" element={<ProductForm />} />
              <Route path="perolla" element={<PerolaAdmin />} />
              <Route path="colecoes" element={<AdminColecoes />} />
              <Route path="pedidos" element={<AdminOrders />} />
            </Route>
            {/* Redirecionar tentativas óbvias para home */}
            <Route path="/admin" element={<Navigate to="/" replace />} />
            <Route path="/admin/*" element={<Navigate to="/" replace />} />
            <Route path="/painel" element={<Navigate to="/" replace />} />
            <Route path="/painel/*" element={<Navigate to="/" replace />} />
            <Route path="/dashboard" element={<Navigate to="/" replace />} />
            <Route path="/wp-admin" element={<Navigate to="/" replace />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </CartProvider>
    </ErrorBoundary>
  )
}
