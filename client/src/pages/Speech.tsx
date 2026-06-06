import sensei from "../assets/sensei.png";

const Speech = () => {
  return (
    <section className="min-h-screen bg-gradient-to-br from-white via-[#f0faf1] to-[#D8EFD3] flex items-center justify-center px-6 py-24">
      <div className="max-w-5xl w-full flex flex-col md:flex-row gap-12 items-center">

        {/* Left — Image */}
        <div className="relative flex-shrink-0">
          {/* Decorative ring */}
          <div className="absolute -inset-3 rounded-3xl bg-gradient-to-b from-[#4EA65F] to-[#D8EFD3] opacity-40 blur-xl" />
          <div className="relative w-56 md:w-72 rounded-3xl overflow-hidden shadow-2xl bg-gradient-to-t from-[#4EA65F] via-[#D8EFD3] to-white flex items-end justify-center pt-8">
            <img
              src={sensei}
              alt="Tin Zar Win — Founder"
              className="w-full object-contain"
            />
          </div>
          {/* Name tag */}
          <div className="absolute -bottom-5 left-1/2 -translate-x-1/2 bg-[#4EA65F] text-white text-xs font-semibold px-4 py-1.5 rounded-full shadow-md whitespace-nowrap">
            Tin Zar Win — Founder
          </div>
        </div>

        {/* Right — Content */}
        <div className="flex-1 flex flex-col gap-6">

          {/* Label */}
          <span className="text-xs tracking-widest text-[#4EA65F] font-semibold uppercase">
            Message from the Founder
          </span>

          {/* Heading */}
          <h2 className="text-3xl md:text-5xl font-bold text-darkgreen leading-tight">
            A Bridge Between <br />
            <span className="text-[#4EA65F]">Myanmar & Japan</span>
          </h2>

          {/* Divider */}
          <div className="w-16 h-1 bg-[#4EA65F] rounded-full" />

          {/* Quote */}
          <blockquote className="relative pl-5 border-l-4 border-[#4EA65F] text-greensage italic text-sm md:text-base leading-relaxed">
            "I wanted the people of Myanmar to improve their lives by working in Japan —
            and I thought I could be that bridge."
          </blockquote>

          {/* Body paragraphs */}
          <div className="text-greensage text-sm md:text-base leading-relaxed space-y-4">
            <p>
              I studied abroad in Japan for four years from 2009 to 2013 — two years
              at a Japanese language school, then two years at an engineering vocational
              school. After returning to Myanmar, I established Bamboo Japanese Language
              School in Naypyidaw in 2017.
            </p>
            <p>
              Thanks to your support, our student count has grown steadily and we have
              expanded our building three times. In 2023, we also established{" "}
              <span className="font-semibold text-darkgreen">
                SHWE YIN MON Overseas Employment Agency
              </span>{" "}
              (Licence No. 081/2023), licensed by the Myanmar government.
            </p>
            <p>
              Although our school is still young, we hope to bring happiness to many
              people in Myanmar — one student at a time.
            </p>
          </div>

          {/* Footer signature */}
          <div className="mt-2 flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-[#4EA65F] flex items-center justify-center text-white font-bold text-sm shadow">
              TZ
            </div>
            <div>
              <p className="text-darkgreen font-semibold text-sm">Tin Zar Win</p>
              <p className="text-greensage text-xs">Founder, Bamboo Japanese Language School</p>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
};

export default Speech;