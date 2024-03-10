import { useRef } from "react";
import { Link } from "react-router-dom";
import { useGsapDownStagger, useGsapUpward } from "../../Hooks/gsap";

const Navbar = () => {
  const li1 = useRef(null);
  const li2 = useRef(null);
  const li3 = useRef(null);
  const fav = useRef(null);
  const login = useRef(null);
  const signup = useRef(null);
  const logo = useRef(null);

  const liArr = [li1, li2, li3];
  const favArr = [fav];

  useGsapDownStagger(liArr, 1.5);
  useGsapDownStagger(favArr, 2.6);
  useGsapUpward(logo, 2.2);

  return (
    <div className="navbar wrapper">
      <ul className="links">
        <li ref={li1}>
          <Link to="/homepage">Home</Link>
        </li>
        <li ref={li2}>
          <Link to="about">About</Link>
        </li>
        <li ref={li3}>
          <Link to="gallery">FAQs</Link>
        </li>
        <li ref={li3}>
          <Link to="gallery">Privacy Policy</Link>
        </li>
      </ul>
      <div className="logo" ref={logo}>
        <Link to="/">
          <h2 className="font-semibold text-5xl mt-14">Dungeon</h2>
        </Link>
      </div>
      <div className="mt-5" ref={fav}>
        <div className="favourite-link" ref={login}>
          <Link to="login">Login</Link>
        </div>
        <div className="favourite-link" ref={signup}>
          <Link to="signup">Sign Up</Link>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
