import Header from './components/Header'
import Footer from './components/Footer'
import HomePage from './pages/HomePage'
import SearchPage from './pages/SearchPage'
import Page404 from './pages/Page404'
import { Route } from './components/Route.jsx'

function App() {
  return (
    <>
      <Header />
      <Route path="/" component={HomePage} />
      <Route path="/search" component={SearchPage} />
      <Footer />
    </>
  )
}

export default App
