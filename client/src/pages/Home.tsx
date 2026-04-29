import Card from "../components/card";
import { FaSchool } from "react-icons/fa6";
import { GiShakingHands } from "react-icons/gi";
import { FaGlobeAsia } from "react-icons/fa";
import MyCarousel from "../components/carousel";
import Banner from "../components/banner";
import Welcome from "../components/welcome";
import { Link } from "react-router";
import shiratorizawaImg from "../assets/yu.jpg";

const Home = () => {
  function getDeviceType(): string {
    if (typeof window === "undefined") return "desktop";
    const width = window.innerWidth;
    if (width < 464) return "mobile";
    if (width < 1024) return "tablet";
    return "desktop";
  }
  const deviceType = getDeviceType();
  return (
    <div>
      <div className=" flex justify-center ">
        <img
          className="w-screen z-0 relative rounded-4xl p-2 object-cover h:[300px] md:h-[700px] object-middle"
          src="https://i.pinimg.com/1200x/e7/6d/41/e76d415280adfed7daf9d53996aaa772.jpg"
        />
        <div className="absolute top-2/12">
          <h1 className=" font-extrabold  text-black text-2xl text-center  md:text-7xl">
            LEARN JAPANESE WITH US
          </h1>
          <h3 className="bg-bg text-center m-2 p-1 rounded-full">
            さあ、日本語を始めよう。
          </h3>
        </div>
      </div>
      <div className="justify-center text-center items-center flex flex-col">
        <Welcome />
      </div>
      <div className="mt-10">
        <h1 className="text-center font-extrabold text-2xl md:text-3xl text-black mb-3 m-2">
          INFO
        </h1>
        <div className="flex justify-evenly">
          <div className=" md:gap-30  grid grid-cols-3  gap-5">
            <Link to={"/school"}><Card title="Partner Language School" icon={<GiShakingHands />} /></Link>
            <Card title="School OverView" icon={<FaSchool />} />
            <Card title="Agency Services" icon={<FaGlobeAsia />} />
          </div>
        </div>
      </div>
      <div className="m-5 mt-15">
        <Banner />
      </div>

      <div>
        <h1 className="text-black font-bold text-center text-2xl -mb-8 mt-15">Latest Articles</h1>
        <MyCarousel deviceType={deviceType} />
      </div>

      <div className=" w-full ">
      <div className="justify-center items-center flex flex-row-reverse">
        <img
          className="md:w-120 md:h-120 w-60 h-60"
          src={shiratorizawaImg}
        />
        <div className=" text-greensage justify-center font-bold">
          <h1 className="text-2xl text-center md:text-4xl m-2 p-2">日本語学校の運営</h1>
          <a className="border-2 text-sm md:text-lg lg:text-lg hover:bg-greensage ms-8 text-center hover:text-white cursor-pointer px-3 border-greensage md:m-3 p-2 w-full rounded-full" href={"/school"}>Click to See More</a>
        </div>
      </div>
    </div>


      </div>
  );
};

export default Home;
