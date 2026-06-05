
import { Phone, Mail, MapPin } from "lucide-react";
import { useState } from "react";

const Inquiry = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
    website:""
  });

  const [loading, setLoading] = useState(false);
  const [status, setStatus] = useState("");

  const handleChange = (e:any) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e:any) => {
    e.preventDefault();
    setLoading(true);
    setStatus("");

    try {
      const res = await fetch("http://localhost:3000/contact", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name: formData.name,
          email: formData.email,
          message:`${formData.subject}\n\n${formData.message}`,
         website: formData.website,
        }),
      });

      const data = await res.json();

      if (res.ok) {
        setStatus("Message sent successfully ");
        setFormData({ name: "", email: "", subject: "", message: "",website:"" });
      } else {
        setStatus(data.message || "Failed to send ");
      }
    } catch (err) {
      setStatus("Server error ");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-bg w-full min-h-screen">
      <div className="min-h-screen flex flex-col items-center py-16 px-4">

        {/* Header */}
        <div className="text-center mb-12">
          <p className="text-sm text-darkgreen tracking-widest">CONTACT US</p>
          <h1 className="text-3xl md:text-4xl font-semibold text-greensage mt-2">
            We’d love to talk to you
          </h1>
        </div>

        {/* Contact Cards */}
        <div className="grid md:grid-cols-3 gap-6 mb-12 w-full max-w-5xl">

          <div className="bg-darkgreen p-4 rounded-xl flex items-center gap-4">
            <Phone className="text-white" />
            <div>
              <p className="text-sm text-white">CALL US</p>
              <p className="text-greensage">+95 9 44244 3388</p>
            </div>
          </div>

          <div className="bg-darkgreen p-4 rounded-xl flex items-center gap-4">
            <Mail className="text-white" />
            <div>
              <p className="text-sm text-white">EMAIL</p>
              <p className="text-greensage">info@bamboo.com</p>
            </div>
          </div>

          <div className="bg-darkgreen p-4 rounded-xl flex items-center gap-4">
            <MapPin className="text-white" />
            <div>
              <p className="text-sm text-white">ADDRESS</p>
              <p className="text-greensage text-sm">
                Naypyidaw, Myanmar
              </p>
            </div>
          </div>
        </div>

        {/* Main */}
        <div className="grid md:grid-cols-2 gap-10 w-full max-w-5xl">

          {/* Left text */}
          <div>
            <h2 className="text-2xl font-semibold text-darkgreen mb-4">
              Let’s Work Together
            </h2>
            <p className="text-greensage">
              Share your vision and we’ll respond quickly.
            </p>
          </div>

          {/* FORM */}
          <form
            onSubmit={handleSubmit}
            className="bg-darkgreen p-8 rounded-xl space-y-4"
          >

            <input
              name="name"
              value={formData.name}
              onChange={handleChange}
              type="text"
              placeholder="Name"
              className="w-full h-10 px-3 rounded bg-white outline-none"
              required
            />
<input
  name="website"
  value={formData.website}
  onChange={handleChange}
  type="text"
  autoComplete="off"
  tabIndex={-1}
  aria-hidden="true"
  style={{ opacity: 0, position: "absolute", pointerEvents: "none" }}
/>
            <input
              name="email"
              value={formData.email}
              onChange={handleChange}
              type="email"
              placeholder="Email"
              className="w-full h-10 px-3 rounded bg-white outline-none"
              required
            />
     <input
              name="subject"
              value={formData.subject}
              onChange={handleChange}
              type="text"
              placeholder="Subject"
              className="w-full h-10 px-3 rounded bg-white outline-none"
              required
            />

            <textarea
              name="message"
              value={formData.message}
              onChange={handleChange}
              placeholder="Message"
              className="w-full h-32 px-3 py-2 rounded bg-white outline-none resize-none"
              required
            />

            <button
              type="submit"
              disabled={loading}
              className="w-full bg-bg text-greensage py-3 rounded hover:bg-greensage hover:text-white transition"
            >
              {loading ? "Sending..." : "Submit"}
            </button>

            {status && (
              <p className="text-center text-sm text-white mt-2">
                {status}
              </p>
            )}
          </form>
        </div>
      </div>
    </div>
  );
};

export default Inquiry;