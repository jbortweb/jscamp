import { Route, Routes } from 'react-router'
import Header from './components/Header'
import Footer from './components/Footer'
import HomePage from './pages/HomePage'
import SearchPage from './pages/SearchPage'
import Details from './pages/Details/Details'
import Page404 from './pages/Page404'

function App() {
  return (
    <>
      <Header />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/search" element={<SearchPage />} />
        <Route path="/jobs/:jobId" element={<Details />} />
        <Route path="*" element={<Page404 />} />
      </Routes>
      <Footer />
    </>
  )
}

export default App
