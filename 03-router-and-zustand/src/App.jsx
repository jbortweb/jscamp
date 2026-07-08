import { lazy, Suspense } from 'react'
import { Route, Routes } from 'react-router'
import Header from './components/Header'
import Footer from './components/Footer'

const HomePage = lazy(() => import('./pages/HomePage'))
const SearchPage = lazy(() => import('./pages/SearchPage'))
const Details = lazy(() => import('./pages/Details/Details'))
const Page404 = lazy(() => import('./pages/Page404'))

function App() {
  return (
    <>
      <Header />
      <Suspense fallback={<div>Cargando...</div>}>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/search" element={<SearchPage />} />
          <Route path="/jobs/:jobId" element={<Details />} />
          <Route path="*" element={<Page404 />} />
        </Routes>
      </Suspense>
      <Footer />
    </>
  )
}

export default App
