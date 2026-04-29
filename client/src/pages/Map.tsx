import { FaSearchLocation } from "react-icons/fa";

const Map = () => {
  return (
    <div className="mt-20">
      <div className="flex flex-col justify-center items-center">
        <h1 className="flex flex-row font-bold text-xl text-greensage items-center mb-5"><FaSearchLocation className="mx-2" /> BAMBOO JAPANESE LANGUAGE SCHOOL</h1>
        <h1 className="text-center mb-10">Address: No(47)Thayaphi Street,Thapyaekonequarter,Zabthiri Township, Naypyidaw, Myanmar, 15011Phone: +95 9 44244 3388</h1>
        <iframe
          src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3755.3150982631455!2d96.11697077607408!3d19.741762830733368!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x30c8bd41f82af8e3%3A0xf1aeaf6f2fd0e6d9!2sBAMBOO%20Japanese%20Language%20School!5e0!3m2!1sen!2smm!4v1752730754915!5m2!1sen!2smm"
          className="w-10/12 h-[500px] rounded-3xl shadow-2xl mt-7 mb-30"
          style={{ border: 0 }}
          allowFullScreen={true}
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
          title="Shop Location"
        ></iframe>
      </div>
    </div>
  );
};

export default Map;
