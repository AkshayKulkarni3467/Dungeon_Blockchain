import { Route, Routes } from "react-router-dom";
import { useSmoothScroll } from "./Hooks/useSmoothScroll";
import Navbar from "./components/landingPage/Navbar";
import Home from "./components/landingPage/Home";
import Featured from "./components/landingPage/Featured";
import About from "./components/landingPage/About";
import Gallery from "./components/landingPage/Gallery";
import Favourites from "./components/landingPage/Favourites";
import NotFound from "./components/landingPage/NotFound";
import Footer from "./components/landingPage/Footer";
import SignupForm from './components/Login/Signup.jsx'
import LoginForm from './components/Login/Login.jsx'
import HomePage from "./components/homePage/HomePage.jsx";

const App = () => {
  const minHeight = true;
  useSmoothScroll();

  return (
    <>
      <Navbar className='navbar'/>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="homepage" element={<HomePage />} />
        <Route path="login" element={<LoginForm/>} />
        <Route path="signup" element={<SignupForm/>} />
        <Route path="featured" element={<Featured minHeight={minHeight} />} />
        <Route path="about" element={<About minHeight={minHeight} />} />
        <Route path="gallery" element={<Gallery />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
      {/* <Footer /> */}
    </>
  );
};

export default App;
