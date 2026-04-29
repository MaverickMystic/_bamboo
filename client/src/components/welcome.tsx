const Welcome = () => {
  return (
    <div className="text-center m-3 p-3 mt-6">
      <h1 className="font-bold md:text-4xl text-xl mb-5 text-black">Welcome From Our School</h1>
      <div className="md:w-250  flex flex-col">
        <h1 className="text-sm md:text-xl font-medium text-darkgreen">
        We are dedicated to empowering Myanmar students with the Japanese
        language and cultural understanding.{" "}
      </h1>
      <h1 className="text-sm md:text-xl font-medium text-darkgreen">
        Whether you're preparing for study in Japan, seeking better career
        opportunities, or simply passionate about learning, our school offers
        structured courses, native and certified instructors, and personalized
        support to help you succeed.
      </h1>
      </div>
    </div>
  );
};

export default Welcome;
