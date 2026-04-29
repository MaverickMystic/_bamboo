import CourseCard from "../components/courseCard"

const Course = () => {
  return (
    <div>
      <div className="flex flex-col items-center justify-center">
        <h1 className="text-5xl text-darkgreen font-bold">Annual Schedule</h1>
        <h1 className="mt-3 text-greensage">Currently, we offer five courses.</h1>
      </div>
      <div className="grid items-center md:grid-cols-3 md:grid-rows-2 mb-30 grid-cols-1">
        <CourseCard className="break-words text-wrap flex flex-col flex-wrap mx-2 px-2" title="Hiragana Course" time="Classes held 6 times a year" num="01" des="Twice a week for 3 weeks (Saturday/Sunday course or 2-day weekday course)"/>
        <CourseCard yu="row-span-2" className="row-span-2 break-words text-wrap flex flex-col flex-wrap mx-2 px-2" title="N5 Course" time="Classes held 3 times a year (April, August, December)" num="02" des="Twice a week for 4 months"/>
        <CourseCard className="break-words text-wrap flex flex-col flex-wrap mx-2 px-2" title="N4 Course" time="Classes held 3 times a year (April, August, December)" num="03" des="Twice a week for 4 months"/>
        <CourseCard className="break-words text-wrap flex flex-col flex-wrap mx-2 px-2" title="N3 Course" time="Classes held twice a year (irregular)" num="04" des="Twice a week for 6 months"/>
        <CourseCard className="break-words text-wrap flex flex-col flex-wrap mx-2 px-2" title="N2 Course" time="First class in 2023" num="05" des="4 times a week for 7 months"/>
      </div>
    </div>
  )
}

export default Course