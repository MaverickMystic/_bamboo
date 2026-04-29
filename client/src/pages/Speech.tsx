import sensei from "../assets/sensei.png";

const Speech = () => {
  return (
    <div className="flex justify-center p-6 mt-20">
      <div className="flex flex-row gap-6 items-center max-w-6xl w-full">
        {/* Gradient background section */}
        <div className="relative w-[200px] h-[700px] bg-gradient-to-t from-[#4EA65F] via-[#D8EFD3] to-[#FFFFFF] rounded-2xl shadow-md flex items-end justify-center overflow-hidden">
          <img
            src={sensei}
            alt="Sensei"
            className="w-[200px] h-auto object-contain z-10"
          />
        </div>

        {/* Speech content section */}
        <div className="bg-white flex flex-col w-[500px] overflow-auto items-stretch text-ellipsis h-[700px] flex-1 p-6 rounded-2xl shadow-md">
          <h2 className="text-xl text-darkgreen md:text-3xl font-semibold mb-5">
            Message from the Founder
          </h2>
          <p className="text-greensage text-justify md:text-xl text-sm leading-relaxed h-full">
            My name is Tin Zar Win, the representative of BAMBOO Japanese
            Language School. I studied abroad in Japan for four years from 2009
            to 2013. I attended a Japanese language school for the first two
            years, and then studied Auto CAD at an engineering vocational school
            for two years.After graduating from a vocational school, I
            returned to Myanmar and established a Japanese language school in
            Myanmar's capital, Naypyidaw, in 2017. That school is now ours.Thanks to your support, the number of students at our school has
            steadily increased, and we have expanded our school building three
            times. In addition to studying in Japan, many students also wanted
            to work in Japan, so in 2023 we established a recruitment agency,
            SHWE YIN MON Overseas Employment Agency. We are also licensed as a
            sending agency by the Myanmar government (Lincence No. 081/2023).The reason I established a Japanese language school in Myanmar is
            because I wanted the people of Myanmar to study Japanese and improve
            their lives by working in Japan or in a job using Japanese in
            Myanmar. I was fortunate enough to have lived in Japan for four
            years, so I thought I could be a bridge between Japan and Myanmar
            for young people.Although our school has only recently been
            established, we hope that with your support we can help bring
            happiness to many people in Myanmar.
          </p>
        </div>
      </div>
    </div>
  );
};

export default Speech;
