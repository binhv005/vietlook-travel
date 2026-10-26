import { Suspense, useLayoutEffect } from 'react'
import { Navigate, Outlet, useLocation, useParams } from 'react-router-dom'
import { I18nProvider, isLang } from '@/i18n'
import Header from './Header'
import Footer from './Footer'
import FloatingContact from './FloatingContact'
import ScrollEffects from './ScrollEffects'
import NoOrphans from './NoOrphans'
import PageLoader from '../ui/PageLoader'

/** Locale shell for every public page: /en/... and /zh/... */
export default function Layout() {
  const { lang } = useParams()
  const { pathname, search, hash } = useLocation()

  // Every page change (links and back/forward alike) starts at the top; in-page #anchors are left to the browser.
  useLayoutEffect(() => {
    window.history.scrollRestoration = 'manual'
    if (!hash) window.scrollTo({ top: 0, left: 0, behavior: 'instant' })
  }, [pathname, hash])

  if (!isLang(lang)) return <Navigate to={`/en${pathname}${search}`} replace />
  return (
    <I18nProvider lang={lang}>
      {/* pb-14 keeps the footer clear of the mobile contact bar */}
      <div className={`flex min-h-screen flex-col pb-14 md:pb-0 ${lang === 'zh' ? 'lang-zh' : ''}`}>
        <Header />
        <main id="main" className="flex-1">
          <Suspense fallback={<PageLoader />}>
            <Outlet />
          </Suspense>
        </main>
        <Footer />
        <FloatingContact />
        <ScrollEffects />
        <NoOrphans />
      </div>
    </I18nProvider>
  )
}
