import './App.css'
import NavBar from './components/LandingPage/Navbar/Navbar'
import About from './components/LandingPage/About/About'
import Hero from './components/LandingPage/Hero/Hero'
import Features from './components/LandingPage/Features/Features'
import Faq from './components/LandingPage/FAQ/Faq'
import Container from './components/LandingPage/Container/Container'
import Footer from './components/LandingPage/Footer/Footer'
import { BrowserRouter as Router, Route, Routes} from "react-router-dom";


function App() {
  return (
    <Router>
      <NavBar />
      <Hero />
      <About />
      <Features />
      <Faq />
      <Container />
      <div className="App"> 
        <Routes>
          {/* <Route path="/login" element={<Login />} />
          <Route path="/about" element={<Signup />} /> */}
        </Routes>
      </div>
      <Footer />
    </Router>
  );
}

export default App;