import Header from './components/Header'
import Resultados from './components/Resultados'
import Search from './components/Search'
import Footer from './components/Footer'

function App() {
  return (
    <>
      <Header />
      <main>
        <Search />

        <Resultados />
      </main>
      <Footer />
    </>
  )
}

export default App
