import { useState } from "react";
import { motion } from "framer-motion";
import emailjs from "@emailjs/browser";

export default function Contact() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });
  const [isSending, setIsSending] = useState(false);
  const [isSent, setIsSent] = useState(false);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsSending(true);

    // EmailJS Credentials - Replace with your own values
    const SERVICE_ID = "service_c7wa754";
    const TEMPLATE_ID = "template_gaco9g1";
    const PUBLIC_KEY = "N9wzBHW8ilOpMf-ji";

    const templateParams = {
      name: formData.name,
      email: formData.email,
      message: formData.message,
    };

    emailjs
      .send(SERVICE_ID, TEMPLATE_ID, templateParams, PUBLIC_KEY)
      .then(() => {
        setIsSent(true);
        setFormData({ name: "", email: "", message: "" });
        setTimeout(() => setIsSent(false), 5000);
      })
      .catch((error) => {
        console.error("FAILED...", error);
        alert("메시지 전송에 실패했습니다. 나중에 다시 시도해 주세요.");
      })
      .finally(() => {
        setIsSending(false);
      });
  };

  return (
    <section
      className="py-24 bg-background-light dark:bg-background-dark"
      id="contact"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section header */}
        <div className="text-center mb-16">
          <h2 className="text-3xl font-bold tracking-tight text-slate-900 dark:text-white sm:text-4xl">
            Contact
          </h2>
          <div className="w-12 h-1 bg-gradient-to-r from-primary to-[var(--color-violet-accent)] rounded-full mx-auto mt-4"></div>
          <p className="mt-4 text-lg text-slate-600 dark:text-slate-400">
            Get in touch!
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 max-w-5xl mx-auto">
          {/* Left: Contact Info */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ duration: 0.6 }}
          >
            <h3 className="text-2xl font-bold text-slate-900 dark:text-white mb-3">
              Send a Message
            </h3>
            <p className="text-slate-600 dark:text-slate-400 mb-10 leading-relaxed">
              프로젝트 협업이나 문의 사항이 있으시면 언제든지 연락 주세요.
              최대한 빠르게 답변드리겠습니다.
            </p>

            <div className="space-y-6">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-primary/10 to-[var(--color-violet-accent)]/10 dark:from-primary/20 dark:to-[var(--color-violet-accent)]/20 flex items-center justify-center shrink-0">
                  <span className="material-symbols-outlined text-primary text-xl">
                    mail
                  </span>
                </div>
                <div>
                  <div className="font-semibold text-slate-900 dark:text-white text-sm">
                    Email
                  </div>
                  <a
                    href="mailto:ppssjj020222@gmail.com"
                    className="text-slate-500 dark:text-slate-400 text-sm hover:text-primary transition-colors"
                  >
                    ppssjj020222@gmail.com
                  </a>
                </div>
              </div>

              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-primary/10 to-[var(--color-violet-accent)]/10 dark:from-primary/20 dark:to-[var(--color-violet-accent)]/20 flex items-center justify-center shrink-0">
                  <span className="material-symbols-outlined text-pink-500 text-xl">
                    location_on
                  </span>
                </div>
                <div>
                  <div className="font-semibold text-slate-900 dark:text-white text-sm">
                    Location
                  </div>
                  <span className="text-slate-500 dark:text-slate-400 text-sm">
                    Suwon, South Korea
                  </span>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Right: Contact Form */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ duration: 0.6, delay: 0.1 }}
          >
            <form onSubmit={handleSubmit} className="space-y-5">
              <div>
                <label
                  htmlFor="contact-name"
                  className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1.5"
                >
                  Name
                </label>
                <input
                  id="contact-name"
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  required
                  placeholder="홍길동"
                  className="w-full h-12 px-4 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-surface-dark text-slate-900 dark:text-white placeholder-slate-400 dark:placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary transition-all text-sm"
                />
              </div>
              <div>
                <label
                  htmlFor="contact-email"
                  className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1.5"
                >
                  Email
                </label>
                <input
                  id="contact-email"
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                  placeholder="email@example.com"
                  className="w-full h-12 px-4 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-surface-dark text-slate-900 dark:text-white placeholder-slate-400 dark:placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary transition-all text-sm"
                />
              </div>
              <div>
                <label
                  htmlFor="contact-message"
                  className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1.5"
                >
                  Message
                </label>
                <textarea
                  id="contact-message"
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  required
                  rows={5}
                  placeholder="Write your message here..."
                  className="w-full px-4 py-3 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-surface-dark text-slate-900 dark:text-white placeholder-slate-400 dark:placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary transition-all text-sm resize-none"
                />
              </div>
              <button
                type="submit"
                className="w-full h-12 rounded-xl bg-gradient-to-r from-primary to-[var(--color-violet-accent)] text-white font-bold text-sm shadow-lg shadow-primary/20 hover:shadow-xl hover:shadow-primary/30 hover:translate-y-[-1px] transition-all flex items-center justify-center gap-2"
              >
                <span className="material-symbols-outlined text-lg">send</span>
                {isSending ? "Sending..." : isSent ? "Sent!" : "Send Message"}
              </button>
            </form>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
