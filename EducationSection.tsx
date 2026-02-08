import { useRef, useLayoutEffect } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { GraduationCap, School } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

const education = [
  {
    degree: 'B.E. in Computer Science & Engineering',
    institution: 'Yenepoya Institute of Technology',
    period: '2020–2024',
    icon: GraduationCap,
  },
  {
    degree: 'Pre-University Course',
    institution: 'M.G.M P.U College',
    period: '2018–2020',
    icon: School,
  },
];

export default function EducationSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const labelRef = useRef<HTMLSpanElement>(null);
  const headlineRef = useRef<HTMLHeadingElement>(null);
  const degreeListRef = useRef<HTMLDivElement>(null);
  const closingRef = useRef<HTMLParagraphElement>(null);
  const lineRef = useRef<HTMLDivElement>(null);

  useLayoutEffect(() => {
    const section = sectionRef.current;
    const label = labelRef.current;
    const headline = headlineRef.current;
    const degreeList = degreeListRef.current;
    const closing = closingRef.current;
    const line = lineRef.current;

    if (!section || !label || !headline || !degreeList || !closing || !line) return;

    const degreeItems = degreeList.querySelectorAll('.degree-item');

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
        // Degree items enter
        .fromTo(degreeItems, 
          { y: '20vh', opacity: 0 }, 
          { y: 0, opacity: 1, stagger: 0.02, ease: 'none' }, 
          0.1
        )
        // Closing line enters
        .fromTo(closing, 
          { opacity: 0, y: 12 }, 
          { opacity: 1, y: 0, ease: 'none' }, 
          0.15
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
        .fromTo(degreeItems, 
          { y: 0, opacity: 1 }, 
          { y: '10vh', opacity: 0, stagger: 0.01, ease: 'power2.in' }, 
          0.72
        )
        .fromTo(closing, 
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
      id="education"
      className="section-pinned z-[60]"
    >
      {/* Accent line */}
      <div 
        ref={lineRef}
        className="accent-line absolute left-[7vw] top-[14vh] h-[72vh] w-[1px]"
      />

      {/* Content - Centered */}
      <div className="absolute left-[8vw] md:left-[12vw] top-1/2 -translate-y-1/2 w-[84vw] md:max-w-[700px]">
        <span ref={labelRef} className="label-mono block mb-6">EDUCATION</span>
        
        <h2 
          ref={headlineRef}
          className="text-[clamp(28px,3.6vw,52px)] font-semibold text-[#F4F6FA] leading-[1.05] mb-8"
        >
          Strong foundations. Continuous learning.
        </h2>
        
        <div ref={degreeListRef} className="space-y-4 mb-8">
          {education.map((edu, index) => (
            <div 
              key={index}
              className="degree-item bg-[#14161B] border border-[#1E2128] rounded-lg p-5 flex items-start gap-4"
            >
              <div className="w-12 h-12 rounded-lg bg-[#B6FDB6]/10 flex items-center justify-center flex-shrink-0">
                <edu.icon size={22} className="text-[#B6FDB6]" />
              </div>
              <div>
                <h3 className="text-[17px] md:text-[19px] font-medium text-[#F4F6FA]">
                  {edu.degree}
                </h3>
                <p className="text-[14px] text-[#A7ACB8]">
                  {edu.institution} • {edu.period}
                </p>
              </div>
            </div>
          ))}
        </div>
        
        <p 
          ref={closingRef}
          className="text-[16px] md:text-[18px] text-[#B6FDB6]"
        >
          Open to software engineering roles and collaborative product teams.
        </p>
      </div>
    </section>
  );
}
