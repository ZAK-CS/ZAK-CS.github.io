import { useRef, useLayoutEffect } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ExternalLink } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

export default function ExperienceSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const labelRef = useRef<HTMLSpanElement>(null);
  const headlineRef = useRef<HTMLHeadingElement>(null);
  const roleCardRef = useRef<HTMLDivElement>(null);
  const ctaRef = useRef<HTMLAnchorElement>(null);
  const lineRef = useRef<HTMLDivElement>(null);

  useLayoutEffect(() => {
    const section = sectionRef.current;
    const label = labelRef.current;
    const headline = headlineRef.current;
    const roleCard = roleCardRef.current;
    const cta = ctaRef.current;
    const line = lineRef.current;

    if (!section || !label || !headline || !roleCard || !cta || !line) return;

    const ctx = gsap.context(() => {
      const scrollTl = gsap.timeline({
        scrollTrigger: {
          trigger: section,
          start: 'top top',
          end: '+=130%',
          pin: true,
          scrub: 0.6,
        }
      });

      // ENTRANCE (0% - 30%)
      scrollTl
        // Label enters from left
        .fromTo(label, 
          { x: '-45vw', opacity: 0 }, 
          { x: 0, opacity: 1, ease: 'none' }, 
          0
        )
        // Headline enters from left
        .fromTo(headline, 
          { x: '-45vw', opacity: 0 }, 
          { x: 0, opacity: 1, ease: 'none' }, 
          0.02
        )
        // Role card enters from bottom
        .fromTo(roleCard, 
          { y: '22vh', opacity: 0 }, 
          { y: 0, opacity: 1, ease: 'none' }, 
          0.08
        )
        // CTA enters
        .fromTo(cta, 
          { opacity: 0, y: 12 }, 
          { opacity: 1, y: 0, ease: 'none' }, 
          0.12
        )
        // Line grows
        .fromTo(line, 
          { scaleY: 0 }, 
          { scaleY: 1, ease: 'none' }, 
          0
        );

      // EXIT (70% - 100%)
      scrollTl
        .fromTo([label, headline], 
          { x: 0, opacity: 1 }, 
          { x: '-18vw', opacity: 0, ease: 'power2.in' }, 
          0.7
        )
        .fromTo(roleCard, 
          { y: 0, opacity: 1 }, 
          { y: '10vh', opacity: 0, ease: 'power2.in' }, 
          0.72
        )
        .fromTo(cta, 
          { opacity: 1 }, 
          { opacity: 0, ease: 'power2.in' }, 
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

  return (
    <section 
      ref={sectionRef} 
      id="experience"
      className="section-pinned z-30"
    >
      {/* Accent line */}
      <div 
        ref={lineRef}
        className="accent-line absolute left-[7vw] top-[14vh] h-[72vh] w-[1px]"
      />

      {/* Content - Centered */}
      <div className="absolute left-[8vw] md:left-[12vw] top-1/2 -translate-y-1/2 w-[84vw] md:max-w-[700px]">
        <span ref={labelRef} className="label-mono block mb-6">EXPERIENCE</span>
        
        <h2 
          ref={headlineRef}
          className="text-[clamp(28px,3.6vw,52px)] font-semibold text-[#F4F6FA] leading-[1.05] mb-8"
        >
          Built backend systems that stayed stable through real-world load.
        </h2>
        
        <div 
          ref={roleCardRef}
          className="bg-[#14161B] border border-[#1E2128] rounded-lg p-6 md:p-8 mb-8"
        >
          <h3 className="text-[18px] md:text-[22px] font-semibold text-[#F4F6FA] mb-1">
            Software Engineer Intern — Fratello Innotech
          </h3>
          <p className="text-[14px] text-[#A7ACB8] mb-5">
            Hyderabad • Aug 2023 – Sep 2023
          </p>
          <ul className="space-y-3">
            <li className="text-[14px] md:text-[16px] text-[#A7ACB8] flex items-start gap-3">
              <span className="text-[#B6FDB6] mt-1.5">•</span>
              Developed and maintained Java + MySQL backend modules.
            </li>
            <li className="text-[14px] md:text-[16px] text-[#A7ACB8] flex items-start gap-3">
              <span className="text-[#B6FDB6] mt-1.5">•</span>
              Designed and tested REST API endpoints with proper error handling.
            </li>
            <li className="text-[14px] md:text-[16px] text-[#A7ACB8] flex items-start gap-3">
              <span className="text-[#B6FDB6] mt-1.5">•</span>
              Practiced Agile workflows (Jira), Git flow, and unit testing.
            </li>
          </ul>
        </div>
        
        <a 
          ref={ctaRef}
          href="/Zakir__Resume.pdf"
          download
          className="link-accent text-[15px]"
        >
          View full resume
          <ExternalLink size={16} />
        </a>
      </div>
    </section>
  );
}
