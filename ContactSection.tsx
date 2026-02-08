import { useRef, useLayoutEffect, useState } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Mail, Phone, MapPin, Linkedin, Github, Send, ArrowUp } from 'lucide-react';
import { toast } from 'sonner';

gsap.registerPlugin(ScrollTrigger);

export default function ContactSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const [formData, setFormData] = useState({ name: '', email: '', message: '' });

  useLayoutEffect(() => {
    const section = sectionRef.current;
    const content = contentRef.current;

    if (!section || !content) return;

    const elements = content.querySelectorAll('.animate-in');

    const ctx = gsap.context(() => {
      gsap.fromTo(elements, 
        { opacity: 0, y: 28, scale: 0.98 }, 
        { 
          opacity: 1, 
          y: 0, 
          scale: 1, 
          stagger: 0.1,
          duration: 0.6,
          ease: 'power2.out',
          scrollTrigger: {
            trigger: section,
            start: 'top 75%',
            toggleActions: 'play none none reverse',
          }
        }
      );
    }, section);

    return () => ctx.revert();
  }, []);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    toast.success('Message sent! I will get back to you within 1-2 days.');
    setFormData({ name: '', email: '', message: '' });
  };

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <section 
      ref={sectionRef} 
      id="contact"
      className="relative bg-[#14161B] border-t border-[#B6FDB6]/25 z-[70]"
    >
      <div ref={contentRef} className="py-16 md:py-24 px-[8vw] md:px-[12vw]">
        {/* Header */}
        <div className="mb-12">
          <span className="label-mono block mb-4 animate-in">CONTACT</span>
          <h2 className="text-[clamp(32px,4vw,56px)] font-semibold text-[#F4F6FA] leading-[1.05] mb-4 animate-in">
            Let's build something solid.
          </h2>
          <p className="text-[15px] md:text-[17px] text-[#A7ACB8] max-w-[500px] animate-in">
            If you have a role, a product idea, or a system that needs care—send a message. I reply within 1–2 days.
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-12">
          {/* Contact Info */}
          <div className="space-y-6">
            <div className="animate-in">
              <a 
                href="mailto:muhammedzakir123@gmail.com"
                className="flex items-center gap-4 p-4 bg-[#0B0C10] border border-[#1E2128] rounded-lg hover:border-[#B6FDB6]/30 transition-colors duration-300"
              >
                <div className="w-10 h-10 rounded-lg bg-[#B6FDB6]/10 flex items-center justify-center">
                  <Mail size={20} className="text-[#B6FDB6]" />
                </div>
                <div>
                  <p className="text-[12px] text-[#A7ACB8] mb-1">Email</p>
                  <p className="text-[14px] md:text-[15px] text-[#F4F6FA]">muhammedzakir123@gmail.com</p>
                </div>
              </a>
            </div>

            <div className="animate-in">
              <a 
                href="tel:+966558681576"
                className="flex items-center gap-4 p-4 bg-[#0B0C10] border border-[#1E2128] rounded-lg hover:border-[#B6FDB6]/30 transition-colors duration-300"
              >
                <div className="w-10 h-10 rounded-lg bg-[#B6FDB6]/10 flex items-center justify-center">
                  <Phone size={20} className="text-[#B6FDB6]" />
                </div>
                <div>
                  <p className="text-[12px] text-[#A7ACB8] mb-1">Phone</p>
                  <p className="text-[14px] md:text-[15px] text-[#F4F6FA]">+966 55 868 1576</p>
                </div>
              </a>
            </div>

            <div className="animate-in">
              <div className="flex items-center gap-4 p-4 bg-[#0B0C10] border border-[#1E2128] rounded-lg">
                <div className="w-10 h-10 rounded-lg bg-[#B6FDB6]/10 flex items-center justify-center">
                  <MapPin size={20} className="text-[#B6FDB6]" />
                </div>
                <div>
                  <p className="text-[12px] text-[#A7ACB8] mb-1">Location</p>
                  <p className="text-[14px] md:text-[15px] text-[#F4F6FA]">Madinah Al Munawwara, Saudi Arabia</p>
                </div>
              </div>
            </div>

            <div className="flex gap-4 animate-in">
              <a 
                href="https://www.linkedin.com/in/zakir-mohammed-1b7b0535a"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 px-4 py-3 bg-[#0B0C10] border border-[#1E2128] rounded-lg hover:border-[#B6FDB6]/30 transition-colors duration-300"
              >
                <Linkedin size={18} className="text-[#B6FDB6]" />
                <span className="text-[14px] text-[#F4F6FA]">LinkedIn</span>
              </a>
              <a 
                href="https://github.com"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 px-4 py-3 bg-[#0B0C10] border border-[#1E2128] rounded-lg hover:border-[#B6FDB6]/30 transition-colors duration-300"
              >
                <Github size={18} className="text-[#B6FDB6]" />
                <span className="text-[14px] text-[#F4F6FA]">GitHub</span>
              </a>
            </div>
          </div>

          {/* Contact Form */}
          <form onSubmit={handleSubmit} className="space-y-4 animate-in">
            <div>
              <label className="block text-[12px] text-[#A7ACB8] mb-2">Name</label>
              <input 
                type="text"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                required
                className="w-full px-4 py-3 bg-[#0B0C10] border border-[#1E2128] rounded-lg text-[#F4F6FA] text-[14px] focus:border-[#B6FDB6]/50 focus:outline-none transition-colors duration-300"
                placeholder="Your name"
              />
            </div>
            <div>
              <label className="block text-[12px] text-[#A7ACB8] mb-2">Email</label>
              <input 
                type="email"
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                required
                className="w-full px-4 py-3 bg-[#0B0C10] border border-[#1E2128] rounded-lg text-[#F4F6FA] text-[14px] focus:border-[#B6FDB6]/50 focus:outline-none transition-colors duration-300"
                placeholder="your@email.com"
              />
            </div>
            <div>
              <label className="block text-[12px] text-[#A7ACB8] mb-2">Message</label>
              <textarea 
                value={formData.message}
                onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                required
                rows={4}
                className="w-full px-4 py-3 bg-[#0B0C10] border border-[#1E2128] rounded-lg text-[#F4F6FA] text-[14px] focus:border-[#B6FDB6]/50 focus:outline-none transition-colors duration-300 resize-none"
                placeholder="Tell me about your project..."
              />
            </div>
            <button 
              type="submit"
              className="btn-primary w-full flex items-center justify-center gap-2"
            >
              Send message
              <Send size={16} />
            </button>
          </form>
        </div>

        {/* Footer */}
        <div className="mt-16 pt-8 border-t border-[#1E2128] flex flex-col md:flex-row justify-between items-center gap-4 animate-in">
          <p className="text-[13px] text-[#A7ACB8]">
            © {new Date().getFullYear()} Zakir Mohammed. All rights reserved.
          </p>
          <button 
            onClick={scrollToTop}
            className="flex items-center gap-2 text-[13px] text-[#B6FDB6] hover:underline transition-all duration-300"
          >
            Back to top
            <ArrowUp size={14} />
          </button>
        </div>
      </div>
    </section>
  );
}
