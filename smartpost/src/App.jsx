import './App.css'
import NavBar from './components/LandingPage/Navbar/Navbar'
import About from './components/LandingPage/About/About'
import Hero from './components/LandingPage/Hero/Hero'
import Features from './components/LandingPage/Features/Features'
import Faq from './components/LandingPage/FAQ/Faq'
import Container from './components/LandingPage/Container/Container'
import Footer from './components/LandingPage/Footer/Footer'
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Login from './components/Login/Login'
import Signup from './components/Signup/Signup'

function App() {
  return (
    <Router>
      <NavBar />
      <Routes>
        <Route path="/" element={
          <>
            <Hero />
            <About />
            <Features />
            <Faq />
            <Container />
          </>
        } />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
      </Routes>
      <Footer />
    </Router>
  );
}

export default App;
