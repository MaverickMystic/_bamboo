import type React from "react";

type CardProps = {
    title: string,
    icon: React.ReactNode
}

const Card = ({icon,title}: CardProps) => {
  return (
    <div className="flex justify-center items-center">
        
        <div className="bg-white flex flex-col items-center rounded-xl md:w-60 md:h-40 w-40 h-30 border border-yellowish shadow-sm shadow-yellowish">
          <h1 className="text-5xl md:text-8xl mt-5 text-greensage">{icon}</h1>
          <h1 className="text-[10px] md:text-md mt-3 font-bold text-black">{title}</h1>
        </div>
      </div>
  )
}

export default Card