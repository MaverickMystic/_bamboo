// src/pages/JapaneseCompany.tsx


export default function Agency() {
  return (
    <div className=" text-gray-900 px-4 sm:px-8 md:px-16 lg:px-24 py-10 space-y-12">
      <section>
        <h1 className="font-extrabold border-l-4 border-greensage text-2xl pl-3">To those related to Japanese companies</h1>
        <p className="mt-4 leading-relaxed">
          Thank you for visiting the BAMBOO Japanese Language School website. We are very pleased that you are interested in our school.
        </p>
        <p className="mt-2 leading-relaxed">
          In addition to the Japanese language school, we have established a recruitment agency called SHWE YIN MON, which introduces students from BAMBOO Japanese Language School who wish to come to Japan to work under the "Specified Skills" visa.
        </p>
      </section>

      <section>
        <h2 className="text-white text-lg font-semibold bg-darkgreen px-4 py-2 rounded">About SHWE YIN MON Recruitment Agency</h2>
        <p className="mt-4 leading-relaxed">
          Naypyidaw, where our school is located, became the new capital of Myanmar in 2006, replacing the former capital Yangon. Although it has been more than 17 years since the capital was relocated, the former capital Yangon still has a larger population and is thriving as an economic city.
        </p>
        <p className="mt-2 leading-relaxed">
          For this reason, there are many Japanese language schools in Yangon. People from other regions who want to learn Japanese move to Yangon and study Japanese.
        </p>
        <p className="mt-2 leading-relaxed">
          However, even in rural areas of Myanmar, there are many young people who want to study Japanese and work in Japan. Naypyidaw is the capital, so young people such as government officials working in government offices and university students in the surrounding area study Japanese at our school.
        </p>
        <p className="mt-2 leading-relaxed font-bold  text-greensage text-xl">
          Some young people have improved their Japanese to a level where they would have no trouble living in Japan (JLPT N2 or N3 level).
        </p>
        <p className="mt-2 leading-relaxed">
          In order to meet the needs of these students, we established SHWE YIN MON recruitment agency separately from our Japanese language school (BAMBOO Japanese Language School).
        </p>
        <p className="mt-2 leading-relaxed">
          In March 2023, we were approved as a sending organization by the Myanmar government (Licence No. 081/2023).
        </p>

        <p className="mt-5 leading-relaxed  text-xl underline">
          List of Foreign Government-Certified Sending Organizations | Organization for Technical Intern Training (otit.go.jp)
        </p>
        <div className="flex flex-col justify-center items-center">
          <img src="https://bamboo-myanmar.com/wp-content/uploads/2023/11/c078f994cddb4d11ca0b42c1b0bc3b35.png" alt="Organization list" className="mt-4 rounded shadow w-[550px] h-[500px]" />
          <img src="https://bamboo-myanmar.com/wp-content/uploads/2023/11/72d89a6e6f9d76500209a55f8d13c661.png" alt="Organization list" className="mt-4 rounded shadow w-[1000px]" />
        </div>
        <p className="mt-4  text-xl underline">
          231023_MMR.pdf (bamboo-myanmar.com) <span className="text-black">*Our company name is listed in No. 326</span>
        </p>
      </section>

      <section>
        <h2 className="text-white text-lg font-semibold bg-darkgreen px-4 py-2 rounded">Students we can introduce</h2>
        <p className="mt-4 leading-relaxed">
          Currently (as of November 2023), there are several students who have acquired the Japanese Language Proficiency Test N3 and wish to work in Japan. They are planning to take the “Food Service Industry Specified Skills No. 1 Assessment Test” to be held in Myanmar.
        </p>
        <p className="mt-2 leading-relaxed">
          In the future, we plan to post information on students who have passed the “Japanese Language Proficiency Test N3” and the “Food Service Industry Specified Skills No. 1 Assessment Test” on this website. We can also arrange a phone call or web conference before posting the information, if you wish.
        </p>
        <p className="mt-2 leading-relaxed">
          If you are interested, please contact us.
        </p>
      </section>

      <section>
        <h2 className="text-white text-lg font-semibold bg-darkgreen px-4 py-2 rounded">Our Services (SHWE YIN MON)</h2>
        <p className="mt-4 leading-relaxed">
          In Myanmar, for “Specified Skilled Worker” visas, it takes about 4 to 6 months from hiring to coming to Japan. During the preparation period before coming to Japan, we provide various services according to the requests of the host company.
        </p>
        <p className="mt-2 italic text-sm">
          *This assumes that the host company will directly employ the worker.
        </p>

        <div className="border p-4 rounded bg-gray-50 mt-4">
          <ul className="list-disc list-inside space-y-1">
            <li>Interpretation available for pre-event guidance</li>
            <li>Provision of on-site interview location</li>
            <li>Pre-arrival orientation, etc.</li>
          </ul>
        </div>

        <p className="mt-4 leading-relaxed">
          These students have been studying Japanese at our school for many years and are very important to us. Therefore, we would like to provide as much support as possible so that both the host company and the students who wish to find employment in Japan can be satisfied with the conditions.
        </p>

        <p className="mt-2 leading-relaxed">
          If you have any questions, please feel free to contact us. Thank you for your cooperation.
        </p>

        <button className="mt-6 border-1 hover:text-white border-darkgreen text-darkgreen font-semibold px-6 py-2 rounded hover:bg-darkgreen">
          Contact Us
        </button>
      </section>
    </div>
  );
}
