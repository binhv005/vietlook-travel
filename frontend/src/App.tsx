import { lazy } from 'react'
import { createBrowserRouter, Navigate, RouterProvider } from 'react-router-dom'
import Layout from '@/components/layout/Layout'
import RouteError from '@/pages/RouteError'

const Home = lazy(() => import('@/pages/Home'))
const Tours = lazy(() => import('@/pages/Tours'))
const TourDetail = lazy(() => import('@/pages/TourDetail'))
const Destinations = lazy(() => import('@/pages/Destinations'))
const DestinationDetail = lazy(() => import('@/pages/DestinationDetail'))
const Themes = lazy(() => import('@/pages/Themes'))
const ThemeDetail = lazy(() => import('@/pages/ThemeDetail'))
const Booking = lazy(() => import('@/pages/Booking'))
const TailorMade = lazy(() => import('@/pages/TailorMade'))
const PrivateCar = lazy(() => import('@/pages/PrivateCar'))
const CarQuote = lazy(() => import('@/pages/CarQuote'))
const Visa = lazy(() => import('@/pages/Visa'))
const TravelGuide = lazy(() => import('@/pages/TravelGuide'))
const GuideSlug = lazy(() => import('@/pages/GuideSlug'))
const About = lazy(() => import('@/pages/About'))
const Contact = lazy(() => import('@/pages/Contact'))
const Partners = lazy(() => import('@/pages/Partners'))
const Confirmation = lazy(() => import('@/pages/Confirmation'))
const Legal = lazy(() => import('@/pages/Legal'))
const NotFound = lazy(() => import('@/pages/NotFound'))
const GroupTours = lazy(() => import('@/pages/GroupTours'))

const router = createBrowserRouter([
  { path: '/', element: <Navigate to="/en" replace /> },
  {
    path: '/:lang',
    element: <Layout />,
    errorElement: <RouteError />,
    children: [
      { index: true, element: <Home /> },
      { path: 'tours', element: <Tours /> },
      { path: 'tours/:slug', element: <TourDetail /> },
      { path: 'destinations', element: <Destinations /> },
      { path: 'destinations/:slug', element: <DestinationDetail /> },
      { path: 'tour-themes', element: <Themes /> },
      { path: 'tour-themes/:slug', element: <ThemeDetail /> },
      { path: 'booking', element: <Booking /> },
      { path: 'booking/:tourSlug', element: <Booking /> },
      { path: 'tailor-made-tour', element: <TailorMade /> },
      { path: 'private-car', element: <PrivateCar /> },
      { path: 'private-car/quote', element: <CarQuote /> },
      { path: 'visa-fast-track', element: <Visa /> },
      { path: 'travel-guide', element: <TravelGuide /> },
      { path: 'travel-guide/:slug', element: <GuideSlug /> },
      { path: 'about-us', element: <About /> },
      { path: 'contact', element: <Contact /> },
      { path: 'travel-trade-partners', element: <Partners /> },
      { path: 'request-received/:reference', element: <Confirmation /> },
      { path: 'privacy-policy', element: <Legal kind="privacy" /> },
      { path: 'terms', element: <Legal kind="terms" /> },
      { path: 'payment-policy', element: <Legal kind="payment" /> },
      { path: 'cancellation-policy', element: <Legal kind="cancellation" /> },
      { path: 'group-tailor-made-tours', element: <GroupTours /> },
      { path: '*', element: <NotFound /> },
    ],
  },
])

export default function App() {
  return <RouterProvider router={router} />
}
