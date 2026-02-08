import { useRef, useLayoutEffect } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ExternalLink } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

export default function AboutSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const labelRef = useRef<HTMLSpanElement>(null);
  const headlineRef = useRef<HTMLHeadingElement>(null);
  const body1Ref = useRef<HTMLParagraphElement>(null);
  const body2Ref = useRef<HTMLParagraphElement>(null);
  const ctaRef = useRef<HTMLAnchorElement>(null);
  const lineRef = useRef<HTMLDivElement>(null);

  useLayoutEffect(() => {
    const section = sectionRef.current;
    const label = labelRef.current;
    const headline = headlineRef.current;
    const body1 = body1Ref.current;
    const body2 = body2Ref.current;
    const cta = ctaRef.current;
    const line = lineRef.current;

    if (!section || !label || !headline || !body1 || !body2 || !cta || !line) return;

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
          { x: '-40vw', opacity: 0 }, 
          { x: 0, opacity: 1, ease: 'none' }, 
          0
        )
        // Headline enters from left
        .fromTo(headline, 
          { x: '-40vw', opacity: 0 }, 
          { x: 0, opacity: 1, ease: 'none' }, 
          0.02
        )
        // Body text enters from bottom
        .fromTo(body1, 
          { y: '18vh', opacity: 0 }, 
          { y: 0, opacity: 1, ease: 'none' }, 
          0.05
        )
        .fromTo(body2, 
          { y: '18vh', opacity: 0 }, 
          { y: 0, opacity: 1, ease: 'none' }, 
          0.08
        )
        // CTA enters
        .fromTo(cta, 
          { opacity: 0, y: 12 }, 
          { opacity: 1, y: 0, ease: 'none' }, 
          0.1
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
          { y: 0, opacity: 1 }, 
          { y: '-10vh', opacity: 0, ease: 'power2.in' }, 
          0.7
        )
        .fromTo([body1, body2], 
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
      id="about"
      className="section-pinned z-20"
    >
      {/* Accent line */}
      <div 
        ref={lineRef}
        className="accent-line absolute left-[7vw] top-[14vh] h-[72vh] w-[1px]"
      />

      {/* Content - Centered */}
      <div className="absolute left-[8vw] md:left-[12vw] top-1/2 -translate-y-1/2 w-[84vw] md:max-w-[700px]">
        <span ref={labelRef} className="label-mono block mb-6">ABOUT</span>
        
        <h2 
          ref={headlineRef}
          className="text-[clamp(28px,3.6vw,52px)] font-semibold text-[#F4F6FA] leading-[1.05] mb-8"
        >
          I turn complex problems into calm, working systems.
        </h2>
        
        <p 
          ref={body1Ref}
          className="text-[15px] md:text-[18px] text-[#A7ACB8] leading-relaxed mb-5"
        >
          I'm a software engineer who cares about the details that survive production: clear architecture, readable code, and interfaces that stay responsive under load.
        </p>
        
        <p 
          ref={body2Ref}
          className="text-[15px] md:text-[18px] text-[#A7ACB8] leading-relaxed mb-10"
        >
          I've built backend services, data pipelines, and full-stack products—mostly in Python and Java, with a strong eye for performance and maintainability.
        </p>
        
        <a 
          ref={ctaRef}
          href="https://www.linkedin.com/in/zakir-mohammed-1b7b0535a"
          target="_blank"
          rel="noopener noreferrer"
          className="link-accent text-[15px]"
        >
          Read more on LinkedIn
          <ExternalLink size={16} />
        </a>
      </div>
    </section>
  );
}
