import { useRef, useLayoutEffect } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ExternalLink, Database, Smartphone, BarChart3 } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

const projects = [
  {
    name: 'Stadium Seat Booking System',
    tech: 'Java • MySQL • Auth & CRUD',
    icon: Database,
  },
  {
    name: 'Library Management App',
    tech: 'Android • Java • SQLite • 40% faster ops',
    icon: Smartphone,
  },
  {
    name: 'Cricket Player Analysis',
    tech: 'Python • Clustering • Pandas + Seaborn',
    icon: BarChart3,
  },
];

export default function ProjectsSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const labelRef = useRef<HTMLSpanElement>(null);
  const headlineRef = useRef<HTMLHeadingElement>(null);
  const projectListRef = useRef<HTMLDivElement>(null);
  const ctaRef = useRef<HTMLAnchorElement>(null);
  const lineRef = useRef<HTMLDivElement>(null);

  useLayoutEffect(() => {
    const section = sectionRef.current;
    const label = labelRef.current;
    const headline = headlineRef.current;
    const projectList = projectListRef.current;
    const cta = ctaRef.current;
    const line = lineRef.current;

    if (!section || !label || !headline || !projectList || !cta || !line) return;

    const projectItems = projectList.querySelectorAll('.project-item');

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
        // Project items enter with stagger
        .fromTo(projectItems, 
          { x: '-18vw', opacity: 0 }, 
          { x: 0, opacity: 1, stagger: 0.02, ease: 'none' }, 
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
          { y: 0, opacity: 1 }, 
          { y: '-10vh', opacity: 0, ease: 'power2.in' }, 
          0.7
        )
        .fromTo(projectItems, 
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
      id="projects"
      className="section-pinned z-40"
    >
      {/* Accent line */}
      <div 
        ref={lineRef}
        className="accent-line absolute left-[7vw] top-[14vh] h-[72vh] w-[1px]"
      />

      {/* Content - Centered */}
      <div className="absolute left-[8vw] md:left-[12vw] top-1/2 -translate-y-1/2 w-[84vw] md:max-w-[700px]">
        <span ref={labelRef} className="label-mono block mb-6">PROJECTS</span>
        
        <h2 
          ref={headlineRef}
          className="text-[clamp(28px,3.6vw,52px)] font-semibold text-[#F4F6FA] leading-[1.05] mb-8"
        >
          Systems I designed, built, and shipped.
        </h2>
        
        <div ref={projectListRef} className="space-y-4 mb-8">
          {projects.map((project, index) => (
            <div 
              key={index}
              className="project-item bg-[#14161B] border border-[#1E2128] rounded-lg p-5 flex items-center gap-4 hover:border-[#B6FDB6]/30 transition-colors duration-300"
            >
              <div className="w-12 h-12 rounded-lg bg-[#B6FDB6]/10 flex items-center justify-center flex-shrink-0">
                <project.icon size={22} className="text-[#B6FDB6]" />
              </div>
              <div>
                <h3 className="text-[17px] md:text-[19px] font-medium text-[#F4F6FA]">
                  {project.name}
                </h3>
                <p className="text-[13px] md:text-[14px] text-[#A7ACB8]">
                  {project.tech}
                </p>
              </div>
            </div>
          ))}
        </div>
        
        <a 
          ref={ctaRef}
          href="https://github.com"
          target="_blank"
          rel="noopener noreferrer"
          className="link-accent text-[15px]"
        >
          Explore code on GitHub
          <ExternalLink size={16} />
        </a>
      </div>
    </section>
  );
}
