import { IoLocation } from "react-icons/io5";

type SchoolProps = {
  image: string;
  name: string;
  location?: string;
  link: string;
  className?: string;
};

const SchoolCard = ({
  image,
  name,
  link,
  location,
  className = "",
}: SchoolProps) => {
  const isReversed = className.includes("flex-row-reverse");

  return (
    <div className={`${className}`}>
      <div className={`flex items-center ${className}`}>
        <img
          className={`w-[300px] h-[200px] md:w-[600px] md:h-[350px] object-cover ${
            isReversed ? "rounded-l-full" : "rounded-r-full"
          }`}
          src={image}
        />
        <div className="m-5">
          <h1 className="font-extrabold justify-center text-center md:text-2xl text-xl text-greensage mb-3">
            {name}
          </h1>
          <h1 className="flex flex-row text-md justify-center mb-7 ">
            <IoLocation className="text-red-700 text-lg" />
            {location}
          </h1>
          <div className="flex justify-center items-center">
            <a
            href={link}
            className="border-2 text-sm md:text-lg lg:text-lg hover:bg-greensage ms-8 text-center hover:text-white cursor-pointer px-3 border-greensage md:m-3 p-2 w-full rounded-full"
          >
            Link To School
          </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SchoolCard;
