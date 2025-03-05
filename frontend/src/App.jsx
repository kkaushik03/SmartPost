import './App.css'
import NavBar from './components/LandingPage/Navbar/Navbar'
import About from './components/LandingPage/About/About'
import Hero from './components/LandingPage/Hero/Hero'
import Features from './components/LandingPage/Features/Features'
import Faq from './components/LandingPage/FAQ/Faq'
import Container from './components/LandingPage/Container/Container'
import Footer from './components/LandingPage/Footer/Footer'
import { BrowserRouter as Router, Route, Routes, useLocation } from "react-router-dom";
import Login from './components/Login/Login'
import Signup from './components/Signup/Signup'
import Chatbot from './components/Chatbot/Chatbot'
import FileUpload from './components/File/FileUpload'

function App() {
  return (
    <Router>
      <MainLayout />
    </Router>
  );
}

function MainLayout() {
  const location = useLocation(); 
  const hideOnPages = ["/login", "/signup", "/fileupload"];

  return (
    <div className="app-wrapper">
      {!hideOnPages.includes(location.pathname) && <NavBar />}

      <div className="main-content">
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
          <Route path="/fileupload" element={<FileUpload/>}/>
        </Routes>
      </div>

      {!hideOnPages.includes(location.pathname) && <Footer />}
    </div>
  );
}

export default App;
