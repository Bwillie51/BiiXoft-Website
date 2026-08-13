import React, { useState, useEffect, useRef } from 'react';
import { sanityClient } from '@/lib/sanityClient'; // 🔗 Import your connection instance
import imageUrlBuilder from '@sanity/image-url';

// 📷 Configure the Image URL Builder tool to process your Sanity image assets cleanly
const builder = imageUrlBuilder(sanityClient);
function urlFor(source) {
  return builder.image(source);
}

export default function Projects() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [projectsList, setProjectsList] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const timerRef = useRef(null);

  // Drag tracking state variables
  const isDragging = useRef(false);
  const startX = useRef(0);
  const currentTranslate = useRef(0);
  const containerRef = useRef(null);

  // 🔄 Fetch published projects from Sanity CMS using a GROQ API query string
  useEffect(() => {
    const fetchProjects = async () => {
      try {
        // Pulls all documents matching the 'projectItem' type schema we created
        const query = `*[_type == "projectItem"] | order(_createdAt desc)`;
        const data = await sanityClient.fetch(query);
        
        if (data && data.length > 0) {
          setProjectsList(data);
        }
      } catch (error) {
        console.error("Sanity Project data fetch failed:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchProjects();
  }, []);

  // ⏱️ Auto-Scroll Timer Function (Triggers every 5 Seconds)
  const startAutoScroll = () => {
    stopAutoScroll();
    if (projectsList.length <= 1) return; // Don't scroll if there is only 1 project
    timerRef.current = setInterval(() => {
      setCurrentIndex((prevIndex) => 
        prevIndex === projectsList.length - 1 ? 0 : prevIndex + 1
      );
    }, 5000);
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
    if (projectsList.length <= 1) return;
    stopAutoScroll();
    isDragging.current = true;
    startX.current = e.type.includes('touch') ? e.touches.clientX : e.clientX;
    if (containerRef.current) {
      containerRef.current.style.transition = 'none';
    }
  };

  // 🖱️ Touch & Drag Movement
  const handleDragMove = (e) => {
    if (!isDragging.current) return;
    const currentX = e.type.includes('touch') ? e.touches.clientX : e.clientX;
    const diffX = currentX - startX.current;
    
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

    if (movedBy < -50 && currentIndex < projectsList.length - 1) {
      setCurrentIndex(currentIndex + 1);
    } else if (movedBy > 50 && currentIndex > 0) {
      setCurrentIndex(currentIndex - 1);
    }

    if (containerRef.current) {
      containerRef.current.style.transition = 'transform 0.5s ease-in-out';
      containerRef.current.style.transform = `translateX(-${currentIndex * 100}%)`;
    }
    
    startAutoScroll(); 
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

        {/* Loading/Empty State Matrix Handler */}
        {isLoading ? (
          <div className="text-center py-20 text-slate-400 font-bold tracking-wide animate-pulse">
            Syncing Portfolio Records...
          </div>
        ) : projectsList.length === 0 ? (
          <div className="text-center py-16 text-slate-400 font-medium text-sm bg-slate-50 rounded-3xl border border-dashed border-slate-200">
            No published projects found inside your Sanity Studio database yet.
          </div>
        ) : (
          /* 🚀 MANUAL-SWIPE CAROUSEL VIEWPOT BOX */
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
                  {/* 🖼️ LIVE BACKGROUND IMAGE GENERATION VIA URL BUILDER */}
                  {project.imageUrl && (
                    <img 
                      src={urlFor(project.imageUrl).url()} 
                      alt={project.title} 
                      className="absolute inset-0 w-full h-full object-cover object-center z-0"
                    />
                  )}
                  
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
                        {project.tags?.map((tag, idx) => (
                          <span key={idx} className="bg-white/10 text-white backdrop-blur-md text-[10px] sm:text-xs px-2.5 py-1 rounded-md border border-white/10 font-medium">
                            {tag}
                          </span>
                        ))}
                      </div>
                    </div>

                    {/* 🔗 DYNAMIC LIVE LINK ACCORDING TO CMS PARAMETERS */}
                    {project.hasLiveSite && project.liveUrl && (
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

            {/* 🔘 Navigation Dots (Only displays if multiple records exist) */}
            {projectsList.length > 1 && (
              <div className="absolute bottom-4 left-1/2 -translate-x-1/2 z-30 flex space-x-2 bg-slate-950/30 backdrop-blur-md px-3 py-2 rounded-full border border-white/10 pointer-events-auto">
                {projectsList.map((_, index) => (
                  <button
                    key={index}
                    onClick={() => setCurrentIndex(index)}
                    className={`w-2 h-2 rounded-full transition-all duration-300 focus:outline-none ${
                      currentIndex === index ? 'bg-blue-500 w-5' : 'bg-white/50 hover:bg-white'
                    }`}
                    aria-label={`Jump to slide ${index + 1}`}
                  />
                ))}
              </div>
            )}

          </div>
        )}

      </div>
    </section>
  );
}
