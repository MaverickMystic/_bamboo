import { useState } from "react";
import { TiThMenuOutline } from "react-icons/ti";
import { IoCloseCircleOutline } from "react-icons/io5";
import { Link } from "react-router";

const Nav = () => {
  const [cartopen, iscartopen] = useState(false);

  return (
    <>
      <div className="flex md:justify-evenlyx w-full justify-between mb-10">
        <div className="flex flex-row items-center">
          {/* <img className="w-40 -ms-11 h-27" src="../assets/cloudy.png"/> */}
          <a
            href="/home"
            className="items-center justify-center md:text-lg bg-white m-3 p-3 rounded-full text-greensage xl:text-2xl font-bold gap-1"
          >
            B A M B OO
          </a>
        </div>
        <div className="bg-white m-3 p-3 rounded-full md:flex md:px-10 flex-row gap-10 items-center hidden md:visible">
          <Link className="font-medium" to={"/home"}>
            Home
          </Link>
          <Link to={"/blog"} className="font-medium">
            Blog
          </Link>
          <Link to={"/course"} className="font-medium">
            Course
          </Link>
          <Link className=" font-medium" to={"/agency"}>
            Agency
          </Link>
          {/* <Link to={"/about"} className="font-medium">About</Link> */}
          <div className="relative group flex justify-center">
            <div className="font-medium cursor-pointer">About</div>

            <div className="absolute z-10 top-full p-2 bg-white text-white invisible group-hover:visible group-hover:opacity-100 rounded-2xl opacity-0 transition-all duration-150 shadow-md w-50">
              <hr className="text-greensage shadow-white " />
              <Link
                to="/about/speech"
                className="block px-4 h-full hover:bg-greensage hover:text-white text-greensage"
              >
                <h1 className="m-3">Speech</h1>
              </Link>
              <hr className="text-greensage shadow-white " />
              <Link
                to="/about/schooloverview"
                className="block px-4 h-full hover:bg-greensage hover:text-white text-greensage"
              >
                <h1 className="m-3">School Overview</h1>
              </Link>
              <hr className="text-greensage shadow-white " />
              <Link
                to="/about/inquiry"
                className="block px-4 h-full hover:bg-greensage hover:text-white text-greensage"
              >
                <h1 className="m-3">Inquiry</h1>
              </Link>
              <hr className="text-greensage shadow-white " />
            </div>
          </div>

          <Link className="text-md font-medium" to={"/map"}>
            Map
          </Link>
        </div>
        <div className="flex items-center md:hidden cursor-pointer m-5 text-3xl">
          <TiThMenuOutline
            className="text-greensage"
            onClick={() => iscartopen(true)}
          />
        </div>
      </div>
      <div
        className={`bg-darkgreen w-6/12 top-0 z-1 fixed h-full border-l-2 border-side right-0 ${
          cartopen ? "translate-x-0" : "translate-x-full"
        }`}
      >
        <div className="flex justify-end m-7 ms-10 mt-10 text-4xl">
          <IoCloseCircleOutline
            className="text-bg"
            onClick={() => iscartopen(false)}
          />
        </div>
      </div>
    </>
  );
};

export default Nav;
