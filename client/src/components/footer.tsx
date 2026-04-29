import { FaRegCopyright } from "react-icons/fa";
import { CiFacebook } from "react-icons/ci";
import { FaTiktok } from "react-icons/fa";

const Footer = () => {
  return (
    <div>
      <div className="bg-darkgreen w-full ">
        <div className="w-11/12 m-7 p-7">
          <h3 className="text-white">Please feel free to contact us.</h3>
          <hr className="text-bg mt-4" />
        </div>
        <div className="max-w-6xl grid grid-cols-1 text-center text-white md:grid-cols-3 mx-auto">
          <div className="">
            <h3 className="font-extrabold mb-2 text-bg">Address</h3>
            <h3>
              Address: No(47)Thayaphi Street,Thapyaekonequarter,Zabthiri
              Township, Naypyidaw, Myanmar, 15011
            </h3>
            <h3>Phone: +95 9 44244 3388</h3>
          </div>
          <div className=" md:text-center mt-10 md:mt-0">
            <h3 className="font-extrabold mb-2 text-bg">Contact Us</h3>
            <h1>E-mail: info@bamboo-myanmar.com, bamboojls1618@gmail.com</h1>
            <div className="flex flex-row gap-5 text-2xl mt-3 justify-center">
                <h1><CiFacebook className="text-white" /> </h1>
                <h1><FaTiktok /></h1>
            </div>
            <h1></h1>
          </div>
          <div className="me-5 md:text-right ">
            <h3 className="font-extrabold mb-2 text-bg mt-10 md:mt-0">Quick Link</h3>
            <ul className="space-y-1 text-sm">
              <li>
                <a href="/">Home</a>
              </li>
              <li>
                <a href="/courses">Courses</a>
              </li>
              <li>
                <a href="/blogs">Blogs</a>
              </li>
              <li>
                <a href="/about">About</a>
              </li>
            </ul>
          </div>
        </div>

        <h1 className="text-greensage text-center font-extrabold text-7xl mt-5">BAMBOO</h1>
        <div className="flex flex-row gap-2 justify-center text-[10px] py-3">
            <FaRegCopyright className="text-white mt-0.5" />
            <h1 className="text-white"> All rights served to Bamboo Japnese Language School</h1>
        </div>
      </div>
    </div>
  );
};

export default Footer;
