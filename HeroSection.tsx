import { useRef, useLayoutEffect } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ChevronRight, Download } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

export default function HeroSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const portraitRef = useRef<HTMLImageElement>(null);
  const headlineRef = useRef<HTMLHeadingElement>(null);
  const subheadlineRef = useRef<HTMLParagraphElement>(null);
  const taglineRef = useRef<HTMLParagraphElement>(null);
  const ctaRef = useRef<HTMLDivElement>(null);
  const lineRef = useRef<HTMLDivElement>(null);

  useLayoutEffect(() => {
    const section = sectionRef.current;
    const portrait = portraitRef.current;
    const headline = headlineRef.current;
    const subheadline = subheadlineRef.current;
    const tagline = taglineRef.current;
    const cta = ctaRef.current;
    const line = lineRef.current;

    if (!section || !portrait || !headline || !subheadline || !tagline || !cta || !line) return;

    const ctx = gsap.context(() => {
      // Set initial states for entrance animation
      gsap.set(portrait, { opacity: 0, scale: 1.06, x: 60 });
      gsap.set(subheadline, { opacity: 0, y: 14 });
      gsap.set(tagline, { opacity: 0, y: 16 });
      gsap.set(cta.children, { opacity: 0, y: 16 });
      gsap.set(line, { scaleY: 0 });

      // Split headline into characters
      const chars = headline.innerText.split('');
      headline.innerHTML = chars.map(char => 
        char === ' ' ? '<span class="inline-block">&nbsp;</span>' : `<span class="inline-block">${char}</span>`
      ).join('');
      const charSpans = headline.querySelectorAll('span');
      gsap.set(charSpans, { opacity: 0, y: 24, rotateX: -25 });

      // Entrance animation timeline
      const entranceTl = gsap.timeline({ delay: 0.2 });

      entranceTl
        .to(portrait, { opacity: 1, scale: 1, x: 0, duration: 1, ease: 'power2.out' })
        .to(charSpans, { 
          opacity: 1, 
          y: 0, 
          rotateX: 0, 
          duration: 0.6, 
          stagger: 0.02, 
          ease: 'power2.out' 
        }, '-=0.7')
        .to(subheadline, { opacity: 1, y: 0, duration: 0.5, ease: 'power2.out' }, '-=0.3')
        .to(tagline, { opacity: 1, y: 0, duration: 0.5, ease: 'power2.out' }, '-=0.3')
        .to(cta.children, { opacity: 1, y: 0, duration: 0.4, stagger: 0.08, ease: 'power2.out' }, '-=0.3')
        .to(line, { scaleY: 1, duration: 0.8, ease: 'power2.out' }, '-=0.6');

      // Scroll-driven exit animation
      const scrollTl = gsap.timeline({
        scrollTrigger: {
          trigger: section,
          start: 'top top',
          end: '+=130%',
          pin: true,
          scrub: 0.6,
          onLeaveBack: () => {
            // Reset all elements to visible when scrolling back to top
            gsap.to(portrait, { opacity: 1, x: 0, scale: 1, duration: 0.3 });
            gsap.to(charSpans, { opacity: 1, x: 0, duration: 0.3 });
            gsap.to(subheadline, { opacity: 1, x: 0, duration: 0.3 });
            gsap.to(tagline, { opacity: 1, y: 0, duration: 0.3 });
            gsap.to(cta.children, { opacity: 1, y: 0, duration: 0.3 });
            gsap.to(line, { scaleY: 1, opacity: 0.45, duration: 0.3 });
          }
        }
      });

      // Exit animations (70% - 100%)
      scrollTl
        .fromTo(portrait, 
          { x: 0, opacity: 1 }, 
          { x: '18vw', opacity: 0, ease: 'power2.in' }, 
          0.7
        )
        .fromTo(charSpans, 
          { x: 0, opacity: 1 }, 
          { x: '-18vw', opacity: 0, ease: 'power2.in' }, 
          0.7
        )
        .fromTo(subheadline, 
          { x: 0, opacity: 1 }, 
          { x: '-18vw', opacity: 0, ease: 'power2.in' }, 
          0.72
        )
        .fromTo(tagline, 
          { y: 0, opacity: 1 }, 
          { y: '10vh', opacity: 0, ease: 'power2.in' }, 
          0.72
        )
        .fromTo(cta.children, 
          { y: 0, opacity: 1 }, 
          { y: '10vh', opacity: 0, ease: 'power2.in' }, 
          0.74
        )
        .fromTo(line, 
          { scaleY: 1, opacity: 0.45 }, 
          { scaleY: 0.2, opacity: 0, ease: 'power2.in' }, 
          0.7
        );

    }, section);

    return () => ctx.revert();
  }, []);

  const scrollToProjects = () => {
    const projectsSection = document.getElementById('projects');
    if (projectsSection) {
      projectsSection.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section 
      ref={sectionRef} 
      id="hero"
      className="section-pinned z-10"
    >
      {/* Accent line */}
      <div 
        ref={lineRef}
        className="accent-line absolute left-[7vw] top-[14vh] h-[72vh] w-[1px]"
      />

      {/* Portrait - Desktop */}
      <img 
        ref={portraitRef}
        src="/images/hero_portrait.jpg" 
        alt="Zakir Mohammed"
        className="hidden md:block absolute right-[6vw] top-1/2 -translate-y-1/2 h-[78vh] w-auto object-cover rounded-sm"
      />

      {/* Portrait - Mobile */}
      <img 
        src="/images/hero_portrait.jpg" 
        alt="Zakir Mohammed"
        className="md:hidden absolute top-[10vh] left-1/2 -translate-x-1/2 h-[42vh] w-auto object-cover rounded-sm"
      />

      {/* Content */}
      <div className="absolute left-[8vw] md:left-[12vw] top-[58vh] md:top-1/2 md:-translate-y-1/2 w-[84vw] md:w-auto">
        <h1 
          ref={headlineRef}
          className="text-[clamp(36px,5vw,76px)] font-bold text-[#F4F6FA] leading-[0.95] mb-4"
          style={{ perspective: '1000px' }}
        >
          Zakir Mohammed
        </h1>
        
        <p 
          ref={subheadlineRef}
          className="text-[clamp(18px,2vw,28px)] text-[#B6FDB6] font-medium mb-6"
        >
          Software Engineer
        </p>
        
        <p 
          ref={taglineRef}
          className="text-[15px] md:text-[17px] text-[#A7ACB8] max-w-[500px] leading-relaxed mb-8"
        >
          I build reliable systems and clean interfaces—focused on performance, clarity, and maintainable code.
        </p>
        
        <div ref={ctaRef} className="flex flex-wrap gap-4">
          <button 
            onClick={scrollToProjects}
            className="btn-primary flex items-center gap-2"
          >
            View Projects
            <ChevronRight size={18} />
          </button>
          <a 
            href="/Zakir__Resume.pdf"
            download
            className="btn-secondary flex items-center gap-2"
          >
            Download Resume
            <Download size={18} />
          </a>
        </div>
      </div>
    </section>
  );
}
