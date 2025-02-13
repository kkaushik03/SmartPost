import './App.css'
import NavBar from './components/Navbar/Navbar'
import About from './components/About/About'
import Hero from './components/Hero/Hero'
import Features from './components/Features/Features'
import Faq from './components/FAQ/Faq'
import Container from './components/Container/Container'
import Footer from './components/Footer/Footer'

function App() {
  return (
    <div>
      <NavBar />
      <Hero />
      <About />
      <Features />
      <Faq />
      <Container />
      <Footer />
    </div>
  )
}

export default App;
