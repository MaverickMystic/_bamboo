import { useState } from "react";
import { NavLink, useLocation, useMatch } from "react-router";
import { TiThMenuOutline } from "react-icons/ti";
import { IoCloseCircleOutline } from "react-icons/io5";

const Nav = () => {
  const [cartopen, iscartopen] = useState(false);
  const location = useLocation();

  const pill = ({ isActive }: { isActive: boolean }) =>
    [
      "px-4 py-2 rounded-full transition-colors duration-200 font-medium",
      isActive ? "bg-[#D1E7D1] text-greensage" : "text-gray-700 hover:text-greensage",
    ].join(" ");

  const aboutMatch = useMatch({ path: "about/*", end: false });
  const aboutActive = Boolean(aboutMatch);

  return (
    <>
      <div className="fixed z-10  mb-10 flex w-full justify-between md:justify-evenlyx">
        <div className="flex flex-row items-center">
          <a
            href="/"
            className="text-greensage m-3 items-center justify-center rounded-full bg-white p-3 font-bold md:text-lg xl:text-2xl gap-1"
          >
            B A M B O O
          </a>
        </div>

        <div className="m-3 hidden flex-row items-center gap-10 rounded-full bg-white p-3 px-5 md:flex md:visible">
          <NavLink to="/" end className={pill}>
            Home
          </NavLink>

          <NavLink to="/blog" className={pill}>
            Blog
          </NavLink>

          <NavLink to="/course" className={pill}>
            Course
          </NavLink>

          <NavLink to="/agency" className={pill}>
            Agency
          </NavLink>

          <div
            className={`relative group flex justify-center rounded-full px-4 py-2 transition-colors duration-200 ${
              aboutActive ? "bg-[#D1E7D1] text-greensage" : "text-gray-700 hover:text-greensage"
            }`}
          >
            <div className="cursor-pointer font-medium">About</div>

            <div className="invisible absolute top-full z-10 w-50 rounded-2xl bg-white p-2 text-white opacity-0 shadow-md transition-all duration-150 group-hover:visible group-hover:opacity-100">
              <hr className="text-greensage shadow-white" />
              <NavLink
                to="/about/speech"
                className={({ isActive }) =>
                  `block px-4 h-full ${isActive ? "bg-greensage text-white" : "text-greensage hover:bg-greensage hover:text-white"}`
                }
              >
                <h1 className="m-3">Speech</h1>
              </NavLink>
              <hr className="text-greensage shadow-white" />
              <NavLink
                to="/about/schooloverview"
                className={({ isActive }) =>
                  `block px-4 h-full ${isActive ? "bg-greensage text-white" : "text-greensage hover:bg-greensage hover:text-white"}`
                }
              >
                <h1 className="m-3">School Overview</h1>
              </NavLink>
              <hr className="text-greensage shadow-white" />
              <NavLink
                to="/about/inquiry"
                className={({ isActive }) =>
                  `block px-4 h-full ${isActive ? "bg-greensage text-white" : "text-greensage hover:bg-greensage hover:text-white"}`
                }
              >
                <h1 className="m-3">Inquiry</h1>
              </NavLink>
              <hr className="text-greensage shadow-white" />
            </div>
          </div>

          <NavLink to="/map" className={pill}>
            Map
          </NavLink>
        </div>

        <div className="m-5 flex cursor-pointer items-center text-3xl md:hidden">
          <TiThMenuOutline
            className="text-greensage"
            onClick={() => iscartopen(true)}
          />
        </div>
      </div>

      <div
        className={`bg-darkgreen fixed top-0 right-0 z-1 h-full w-6/12 border-l-2 border-side ${
          cartopen ? "translate-x-0" : "translate-x-full"
        }`}
      >
        <div className="m-7 ms-10 mt-10 flex justify-end text-4xl">
          <IoCloseCircleOutline
            className="text-bg"
            onClick={() => iscartopen(false)}
          />
        </div>

        {/* Optional: mirror links in mobile drawer with NavLink */}
        <nav className="flex flex-col gap-2 px-6 pb-8 text-greensage">
          <NavLink to="/" end className={pill} onClick={() => iscartopen(false)}>
            Home
          </NavLink>
          <NavLink to="/blog" className={pill} onClick={() => iscartopen(false)}>
            Blog
          </NavLink>
          <NavLink to="/course" className={pill} onClick={() => iscartopen(false)}>
            Course
          </NavLink>
          <NavLink to="/agency" className={pill} onClick={() => iscartopen(false)}>
            Agency
          </NavLink>
          <NavLink
            to="/about/speech"
            className={pill}
            onClick={() => iscartopen(false)}
          >
            About — Speech
          </NavLink>
          <NavLink
            to="/about/schooloverview"
            className={pill}
            onClick={() => iscartopen(false)}
          >
            About — School overview
          </NavLink>
          <NavLink
            to="/about/inquiry"
            className={pill}
            onClick={() => iscartopen(false)}
          >
            About — Inquiry
          </NavLink>
          <NavLink to="/map" className={pill} onClick={() => iscartopen(false)}>
            Map
          </NavLink>
        </nav>
      </div>


      {false && <pre>{location.pathname}</pre>}
    </>
  );
};

export default Nav;