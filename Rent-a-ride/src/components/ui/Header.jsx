import { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { useSelector } from "react-redux";

export default function Header() {
  const [menuOpen, setMenuOpen] = useState(false);
  const { pathname } = useLocation();

  const { currentUser } = useSelector((state) => state.user);

  const user = currentUser.isUser
  console.log(user)


  const navLinks = [
    { name: "Home", path: "/" },
    { name: "Vehicles", path: "/vehicles" },
    { name: "Enterprise", path: "/enterprise" },
    { name: "Contact", path: "/contact" },
  ];

  return (
    <>
     <header className="w-full bg-white border-b border-gray-100 sticky top-0 z-50 shadow-sm">
      <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">

        {/* Logo */}
        <Link to="/" className="text-gray-900 font-bold text-xl tracking-tight select-none">
          Rent a <span className="text-[#22c55e]">Ride</span>
        </Link>

        {/* Desktop Nav */}
        <nav className="hidden md:flex items-center gap-8">
          {navLinks.map((link) => (
            <Link
              key={link.name}
              to={link.path}
              className={`text-sm font-medium transition-colors duration-200 relative group
                ${pathname === link.path ? "text-gray-900" : "text-gray-500 hover:text-gray-900"}`}
            >
              {link.name}
              <span
                className={`absolute -bottom-1 left-0 h-0.5 bg-[#22c55e] transition-all duration-300
                  ${pathname === link.path ? "w-full" : "w-0 group-hover:w-full"}`}
              />
            </Link>
          ))}
        </nav>

        {/* Auth Buttons */}
        { user === false 
          ?
        <div className="hidden md:flex items-center gap-3">
          <Link
            to="/signin"
            className="text-sm font-medium text-gray-700 border border-gray-300 rounded-md px-5 py-2 
              hover:bg-gray-50 hover:border-gray-400 transition-all duration-200"
          >
            Sign In
          </Link>
          <Link
            to="/signup"
            className="text-sm font-semibold text-white bg-[#22c55e] rounded-md px-5 py-2 
              hover:bg-[#16a34a] active:scale-95 transition-all duration-200 shadow-sm shadow-green-200"
          >
            Sign Up
          </Link>
        </div>
           :
          ""
        }

        {/* Mobile Hamburger */}
        <button
          className="md:hidden flex flex-col gap-1.5 p-1"
          onClick={() => setMenuOpen(!menuOpen)}
          aria-label="Toggle menu"
        >
          <span className={`block w-6 h-0.5 bg-gray-700 transition-all duration-300 ${menuOpen ? "rotate-45 translate-y-2" : ""}`} />
          <span className={`block w-6 h-0.5 bg-gray-700 transition-all duration-300 ${menuOpen ? "opacity-0" : ""}`} />
          <span className={`block w-6 h-0.5 bg-gray-700 transition-all duration-300 ${menuOpen ? "-rotate-45 -translate-y-2" : ""}`} />
        </button>
      </div>

      {/* Mobile Menu */}
      <div className={`md:hidden overflow-hidden transition-all duration-300 ${menuOpen ? "max-h-80" : "max-h-0"}`}>
        <div className="px-6 pb-5 flex flex-col gap-4 border-t border-gray-100 pt-4">
          {navLinks.map((link) => (
            <Link
              key={link.name}
              to={link.path}
              onClick={() => setMenuOpen(false)}
              className={`text-sm font-medium ${pathname === link.path ? "text-[#22c55e]" : "text-gray-600"}`}
            >
              {link.name}
            </Link>
          ))}
          {
            user == true
            ?
            (<div className="flex gap-3 pt-2">
              <Link to="/signin" className="flex-1 text-center text-sm font-medium border border-gray-300 rounded-md py-2 text-gray-700 hover:bg-gray-50">
                Sign In
              </Link>
              <Link to="/signup" className="flex-1 text-center text-sm font-semibold bg-[#22c55e] text-white rounded-md py-2 hover:bg-[#16a34a]">
                Sign Up
              </Link>
            </div>)
            :
            ""
          }
        </div>
      </div>

    </header>

  </>
  ); 
}