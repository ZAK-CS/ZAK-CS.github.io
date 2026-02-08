import { useRef, useLayoutEffect } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ExternalLink, Code, Globe, Database, Wrench } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

const skillCategories = [
  {
    title: 'Languages',
    icon: Code,
    skills: ['Python', 'Java', 'C/C++', 'SQL'],
  },
  {
    title: 'Web / Mobile',
    icon: Globe,
    skills: ['HTML/CSS', 'Android (Java/Kotlin)'],
  },
  {
    title: 'Data & ML',
    icon: Database,
    skills: ['Pandas', 'NumPy', 'scikit-learn', 'TensorFlow'],
  },
  {
    title: 'Tools',
    icon: Wrench,
    skills: ['Git', 'VS Code', 'PyCharm', 'Jupyter', 'Postman'],
  },
];

export default function SkillsSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const labelRef = useRef<HTMLSpanElement>(null);
  const headlineRef = useRef<HTMLHeadingElement>(null);
  const columnsRef = useRef<HTMLDivElement>(null);
  const ctaRef = useRef<HTMLAnchorElement>(null);
  const lineRef = useRef<HTMLDivElement>(null);

  useLayoutEffect(() => {
    const section = sectionRef.current;
    const label = labelRef.current;
    const headline = headlineRef.current;
    const columns = columnsRef.current;
    const cta = ctaRef.current;
    const line = lineRef.current;

    if (!section || !label || !headline || !columns || !cta || !line) return;

    const columnItems = columns.querySelectorAll('.skill-column');

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
        // Columns enter with stagger
        .fromTo(columnItems, 
          { y: '18vh', opacity: 0 }, 
          { y: 0, opacity: 1, stagger: 0.02, ease: 'none' }, 
          0.1
        )
        // CTA enters
        .fromTo(cta, 
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
          { x: 0, opacity: 1 }, 
          { x: '-18vw', opacity: 0, ease: 'power2.in' }, 
          0.7
        )
        .fromTo(columnItems, 
          { y: 0, opacity: 1 }, 
          { y: '10vh', opacity: 0, stagger: 0.01, ease: 'power2.in' }, 
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
      id="skills"
      className="section-pinned z-50"
    >
      {/* Accent line */}
      <div 
        ref={lineRef}
        className="accent-line absolute left-[7vw] top-[14vh] h-[72vh] w-[1px]"
      />

      {/* Content - Centered */}
      <div className="absolute left-[8vw] md:left-[12vw] top-1/2 -translate-y-1/2 w-[84vw] md:max-w-[700px]">
        <span ref={labelRef} className="label-mono block mb-6">SKILLS</span>
        
        <h2 
          ref={headlineRef}
          className="text-[clamp(28px,3.6vw,52px)] font-semibold text-[#F4F6FA] leading-[1.05] mb-8"
        >
          Stack I use to ship stable, measurable outcomes.
        </h2>
        
        <div ref={columnsRef} className="grid grid-cols-2 gap-4 mb-8">
          {skillCategories.map((category, index) => (
            <div 
              key={index}
              className="skill-column bg-[#14161B] border border-[#1E2128] rounded-lg p-5"
            >
              <div className="flex items-center gap-2 mb-4">
                <category.icon size={18} className="text-[#B6FDB6]" />
                <h3 className="text-[14px] md:text-[16px] font-medium text-[#F4F6FA]">
                  {category.title}
                </h3>
              </div>
              <div className="flex flex-wrap gap-2">
                {category.skills.map((skill, skillIndex) => (
                  <span 
                    key={skillIndex}
                    className="text-[12px] md:text-[13px] px-3 py-1.5 bg-[#0B0C10] rounded text-[#A7ACB8]"
                  >
                    {skill}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>
        
        <a 
          ref={ctaRef}
          href="https://www.linkedin.com/in/zakir-mohammed-1b7b0535a"
          target="_blank"
          rel="noopener noreferrer"
          className="link-accent text-[15px]"
        >
          See details on LinkedIn
          <ExternalLink size={16} />
        </a>
      </div>
    </section>
  );
}
