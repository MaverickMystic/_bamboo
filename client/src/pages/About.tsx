const timeline = [
  {
    image:"https://bamboo-myanmar.com/wp-content/uploads/2023/06/IMG_5673.jpg",
    header: "December 2017: School Establishment",
    text: "We established our school in Naypyidaw, the capital of Myanmar.Many Japanese language schools had been established in Yangon, the economic center of the country, but there were few Japanese language schools in the capital, Naypyidaw.",
  },
  {
    image:
      "https://bamboo-myanmar.com/wp-content/uploads/2023/06/IMG_5671.jpg",
    header: "September 2018: School building renovation and",
    text: "establishment: Soon after, we received many inquiries from people who wanted to take classes.We started the Japanese language school with a small one-class classroom, but we received many inquiries from people who wanted to take classes. Since the small classroom at the beginning was not able to accommodate everyone, we immediately renovated the classroom and expanded the classroom area",
  },
  {
    image:
      "https://bamboo-myanmar.com/wp-content/uploads/2023/06/IMG_9930.jpg",
    header: "November 2019: The school building",
    text: "was renovated (for the second time) and the number of classrooms was increased.As a result, we were able to hold two classes at the same time instead of the original one. We also hired Japanese language teachers and staff, and established a system to become a Japanese language school that can meet more needs. We also held various events, such as Japanese cooking classes, where students could experience Japanese culture.",
  },
  {
    image:
      "https://bamboo-myanmar.com/wp-content/uploads/2023/06/IMG_9926.jpg",
    header: "January 2023: Establishment of a recruitment agency ",
    text: "We established a recruitment agency, Shwe Yin Mon, next to Bamboo Japanese Language School.In addition to wanting to study abroad in Japan, many of our students are studying Japanese with the goal of working in Japan. In order to fulfill the hopes of our students, we have obtained a license as a technical intern trainee sending organization approved by the Myanmar government.If you are a company considering hiring Myanmar people, please contact us.",
  },
  {
    image:
      "https://bamboo-myanmar.com/wp-content/uploads/2023/06/74d5d004bf00e8f80d6d9b4980257c60.jpg",
    header: "May 2023: New school building",
    text: "established a recruitment constructed A new three-story school building was constructed, the number of classrooms was increased, and a variety of courses were established.Currently, our school offers five main courses (① Hiragana course, ② N5 course, ③ N4 course, ④ N3 course, ⑤ N2 course).The N2 course was first implemented in 2023, and students who have studied the N5, N4, and N3 courses at our school are continuing to study. Therefore, we are considering implementing the N1 course in the near future.Nay Pyi Taw is the administrative center and many government officials and people working in government agencies live and study Japanese at our school., Shwe Yin Mon, next to Bamboo Japanese Language School.In addition to wanting to study abroad in Japan, many of our students are studying Japanese with the goal of working in Japan. In order to fulfill the hopes of our students, we have obtained a license as a technical intern trainee sending organization approved by the Myanmar government.If you are a company considering hiring Myanmar people, please contact us.",
  },
];
function About() {
  return (
    <div className="relative w-full flex mt-20 justify-center">
      {/* vertical line */}
      <div className="absolute h-full border-l-2 border-gray-300 left-1/2 transform -translate-x-1/2"></div>
      <div className="space-y-12 py-10 w-full max-w-4xl">
        {timeline.map((item, index) => (
          <div
            key={index}
            className={`flex ${
              index % 2 === 0 ? "flex-row" : "flex-row-reverse"
            } items-center`}
          >
            {/* image card */}
            <div className="w-1/2 p-4">
              <img
                src={item.image}
                alt="Timeline"
                className="rounded-xl shadow-lg w-full"
              />
            </div>

            {/* dot and connector */}
            <div className="relative w-0.5 flex items-center bg-green-300 justify-center">
              <div className="flex items-center">
                {/* <div className={`w-14 flex items-center absolute  border-t-1 h-1 bg-red ${index%2 == 0 ? "left-1/2" : "right-1/2"}`}></div> */}
                <div className="w-4 h-4 bg-darkgreen rounded-full z-10"></div>
              </div>
            </div>

            {/* optional content */}
            <div className={`w-[45%] min-w-0 p-4 bg-red flex items-end text-sm text-gray-700`}>
              <div className="flex flex-col justify-center">
                <h1 className="text-lg md:text-xl font-bold">{item.header}</h1>
                <p className="break-words text-sm md:text-md mt-3 w-full">{item.text}</p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default About;
