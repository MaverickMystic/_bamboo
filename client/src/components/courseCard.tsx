
type courseProps = {
    num: string,
    title: string,
    time: string,
    des: string,
    className: string,
    yu?: string
}

const CourseCard = ({des,num,time,title,className="",yu=""}: courseProps) => {
  return (
    <div className={`${yu}`}>
        <div className={`mt-15 flex flex-col justify-center items-center `}>
            <h1 className="text-[10em] text-greensage font-extrabold">{num}</h1>
            <h1 className={`${className} bg-darkgreen text-greensage mx-2 px-8 rounded-full font-bold -mt-7 mb-3 text-md`}>{title}</h1>
            <h1 className={`text-darkgreen font-semibold text-sm flex flex-row ${className}`}>{time}</h1> 
            <h1 className={`text-darkgreen font-semibold text-center text-sm ${className}`}>{des}</h1>
        </div>
    </div>
  )
}

export default CourseCard