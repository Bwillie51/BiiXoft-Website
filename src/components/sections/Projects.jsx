import React, { useState, useEffect, useRef } from 'react';
import ppfcCover from '../../imgs/BiixoftCover.jpeg'; 

export default function Projects() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const timerRef = useRef(null);

  // Drag tracking state variables
  const isDragging = useRef(false);
  const startX = useRef(0);
  const currentTranslate = useRef(0);
  const prevTranslate = useRef(0);
  const containerRef = useRef(null);

  const projectsList = [
    {
      title: "Personal Website - Brian WILLIE",
      category: "Personal Website",
      tags: ["Next.js", "Sanity CMS", "Vercel"],
      liveUrl: "https://my-personal-website-sooty-two.vercel.app",
      imageUrl: ppfcCover,
      hasLiveSite: true
    },
    {
      title: "Porea Potato Farmers Cooperative System",
      category: "Agricultural Ecosystem Platform",
      tags: ["React", "Tailwind CSS", "Vercel Deploy"],
      liveUrl: "https://ppfc-society-website-psi.vercel.app/",
      imageUrl: ppfcCover,
      hasLiveSite: true
    },
    {
      title: "High-Conversion Commerce Hub",
      category: "Performance Optimizations",
      tags: ["Formik", "Formspree", "PostCSS"],
      liveUrl: "#contact", // Placeholder: Will hide the button natively
      imageUrl: ppfcCover,
      hasLiveSite: false
    }
  ];

  // ⏱️ Auto-Scroll Timer Function (Set exactly to 5 Seconds / 5000ms)
  const startAutoScroll = () => {
    stopAutoScroll();
    timerRef.current = setInterval(() => {
      setCurrentIndex((prevIndex) => 
        prevIndex === projectsList.length - 1 ? 0 : prevIndex + 1
      );
    }, 3500); 
  };

  const stopAutoScroll = () => {
    if (timerRef.current) clearInterval(timerRef.current);
  };

  useEffect(() => {
    startAutoScroll();
    return () => stopAutoScroll();
  }, [projectsList.length]);

  // 🖱️ Manual Slide Gestures: Touch & Drag Start
  const handleDragStart = (e) => {
    stopAutoScroll();
    isDragging.current = true;
    startX.current = e.type.includes('touch') ? e.touches[0].clientX : e.clientX;
    if (containerRef.current) {
      containerRef.current.style.transition = 'none';
    }
  };

  // 🖱️ Touch & Drag Movement
  const handleDragMove = (e) => {
    if (!isDragging.current) return;
    const currentX = e.type.includes('touch') ? e.touches[0].clientX : e.clientX;
    const diffX = currentX - startX.current;
    
    // Boundary friction drag math
    const width = containerRef.current?.offsetWidth || 1;
    currentTranslate.current = (-currentIndex * width) + diffX;
    
    if (containerRef.current) {
      containerRef.current.style.transform = `translateX(${currentTranslate.current}px)`;
    }
  };

  // 🖱️ Touch & Drag Release Evaluation
  const handleDragEnd = () => {
    if (!isDragging.current) return;
    isDragging.current = false;
    
    const width = containerRef.current?.offsetWidth || 1;
    const movedBy = currentTranslate.current - (-currentIndex * width);

    // If swiped more than 50px horizontally, trigger layout card flip action
    if (movedBy < -50 && currentIndex < projectsList.length - 1) {
      setCurrentIndex(currentIndex + 1);
    } else if (movedBy > 50 && currentIndex > 0) {
      setCurrentIndex(currentIndex - 0.5 ? currentIndex - 1 : 0);
    }

    if (containerRef.current) {
      containerRef.current.style.transition = 'transform 0.5s ease-in-out';
      containerRef.current.style.transform = `translateX(-${currentIndex * 100}%)`;
    }
    
    startAutoScroll(); // Safely resumes the 5-second ticker cycle
  };

  return (
    <section id="projects" className="py-24 bg-white border-t border-slate-100 w-full overflow-hidden select-none">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Heading */}
        <div className="text-center max-w-3xl mx-auto mb-12">
          <span className="text-xs font-bold uppercase tracking-widest text-blue-600 block">
            Portfolio Showcase
          </span>
          <h2 className="text-3xl md:text-4xl font-black tracking-tight text-slate-900 mt-2 mb-4">
            Recent Projects
          </h2>
          <div className="w-12 h-1 bg-blue-600 mx-auto rounded-full" />
        </div>

        {/* 🚀 DRAG-READY SLIDER CAROUSEL VIEWPOT BOX CONTAINER */}
        <div 
          className="relative w-full max-w-4xl mx-auto overflow-hidden rounded-3xl shadow-xl shadow-slate-100 border border-slate-100 cursor-grab active:cursor-grabbing"
          onTouchStart={handleDragStart}
          onTouchMove={handleDragMove}
          onTouchEnd={handleDragEnd}
          onMouseDown={handleDragStart}
          onMouseMove={handleDragMove}
          onMouseUp={handleDragEnd}
          onMouseLeave={handleDragEnd}
        >
          
          <div 
            ref={containerRef}
            className="flex transition-transform duration-500 ease-in-out w-full"
            style={{ transform: `translateX(-${currentIndex * 100}%)` }}
          >
            {projectsList.map((project, index) => (
              <div 
                key={index} 
                className="w-full shrink-0 relative h-[320px] sm:h-[420px] md:h-[480px] bg-slate-100 flex flex-col justify-end pointer-events-none"
                style={{ minWidth: '100%' }}
              >
                {/* 🖼️ BACKGROUND SHOWCASE IMAGE */}
                <img 
                  src={project.imageUrl} 
                  alt={project.title} 
                  className="absolute inset-0 w-full h-full object-cover object-center z-0"
                />
                
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950/90 via-slate-950/40 to-slate-950/10 z-10" />

                {/* 📝 FRONT BOTTOM DESCRIPTION LAYER */}
                <div className="relative z-20 p-6 sm:p-10 w-full flex flex-col sm:flex-row sm:items-end sm:justify-between gap-6">
                  <div className="max-w-xl text-left">
                    <span className="text-xs font-bold text-blue-400 uppercase tracking-widest block mb-2">
                      {project.category}
                    </span>
                    <h3 className="text-xl sm:text-2xl lg:text-3xl font-black text-white leading-tight">
                      {project.title}
                    </h3>
                    
                    <div className="flex flex-wrap gap-1.5 mt-4">
                      {project.tags.map((tag, idx) => (
                        <span key={idx} className="bg-white/10 text-white backdrop-blur-md text-[10px] sm:text-xs px-2.5 py-1 rounded-md border border-white/10 font-medium">
                          {tag}
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* 🔗 DYNAMICALLY GUARDED REDIRECT BUTTON LINK */}
                  {project.hasLiveSite && (
                    <a 
                      href={project.liveUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="shrink-0 bg-blue-600 hover:bg-blue-500 text-white text-xs font-bold px-6 py-3.5 rounded-xl text-center shadow-lg pointer-events-auto transition-colors border-none"
                    >
                      Launch Live Site
                    </a>
                  )}
                </div>

              </div>
            ))}
          </div>

          {/* 🔘 Slide Navigation Buttons Dots */}
          <div className="absolute bottom-4 left-1/2 -translate-x-1/2 z-30 flex space-x-2 bg-slate-950/30 backdrop-blur-md px-3 py-2 rounded-full border border-white/10 pointer-events-auto">
            {projectsList.map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrentIndex(index)}
                className={`w-2 h-2 rounded-full transition-all duration-300 focus:outline-none ${
                  currentIndex === index ? 'bg-blue-500 w-5' : 'bg-white/50 hover:bg-white'
                }`}
                aria-label={`Jump to slide element ${index + 1}`}
              />
            ))}
          </div>

        </div>

      </div>
    </section>
  );
}
