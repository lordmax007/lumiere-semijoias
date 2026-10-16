import { Outlet } from 'react-router-dom'
import AnnouncementBar from './AnnouncementBar'
import Header from './Header'
import Footer from './Footer'
import CartDrawer from '../cart/CartDrawer'
import WhatsAppButton from '../WhatsAppButton'
import CookieConsent from '../CookieConsent'

export default function Layout() {
  return (
    <CookieConsent>
      <div className="flex flex-col min-h-screen">
        <AnnouncementBar />
        <Header />
        <main className="flex-1">
          <Outlet />
        </main>
        <Footer />
        <CartDrawer />
        <WhatsAppButton />
      </div>
    </CookieConsent>
  )
}
