import React from 'react';
import Logo from '../../imgs/PlainLogo.jpeg';

export default function Footer() {
  const currentYear = new Date().getFullYear();

  const platformLinks = [
    { label: 'Home Base', href: '#home' },
    { label: 'Who We Are', href: '#who-we-are' },
    { label: 'Why BiiXoft', href: '#why-us' },
    { label: 'Projects Showcase', href: '#projects' },
  ];

  const ecosystemServices = [
    { label: 'Custom Development', href: '#pricing' },
    { label: 'Fluid Web Design', href: '#pricing' },
    { label: 'Domain Reselling', href: '#pricing' },
    { label: 'Cloud Hosting Systems', href: '#pricing' },
  ];

  // 🌐 Scalable social links array structure matching your corporate handles
  const socialProfiles = [
    {
      platform: "Facebook",
      // Simply paste your exact BiiXoft Facebook page URL string here
      href: "https://www.facebook.com/profile.php?id=61592779726191", 
      iconPath: "M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12z"
    },
    {
      platform: "LinkedIn",
      href: "https://linkedin.com",
      iconPath: "M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"
    },
    {
      platform: "X / Twitter",
      href: "https://x.com",
      iconPath: "M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"
    }
  ];

  return (
    <footer className="bg-slate-50 border-t border-slate-200/60 w-full pt-16 pb-8 font-sans z-10 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* 📊 Top Column Matrix Grid Setup */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-10 md:gap-8 lg:gap-12 pb-12 border-b border-slate-200/60">
          
          {/* Column 1: Core Corporate Identity Info */}
          <div className="md:col-span-5 flex flex-col items-center md:items-start text-center md:text-left">
            <div className="flex items-center space-x-3.5 mb-5 group cursor-pointer" onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}>
              <div className="w-10 h-10 rounded-xl overflow-hidden shadow-sm border border-slate-200/80 bg-white">
                <img 
                  src={Logo} 
                  alt="BiiXoft Official Branding Resource" 
                  className="w-full h-full object-cover select-none"
                />
              </div>
              <span className="text-xl font-black tracking-tight text-slate-900 select-none">
                Bii<span className="text-blue-600">X</span>oft
              </span>
            </div>
            
            <p className="text-slate-500 text-sm leading-relaxed font-medium max-w-sm mb-6">
              Engineering modern, high-performing websites and fluid system architectures designed to lock down speed, scalability, and conversion growth for today's digital world.
            </p>

            {/* 🔗 BRAND SOCIALS INTERACTIVE TICKER */}
            <div className="flex items-center space-x-3 mb-6 select-none">
              {socialProfiles.map((social, idx) => (
                <a
                  key={idx}
                  href={social.href}
                  target="_blank" // ✅ Opens safely in a standalone window tab
                  rel="noopener noreferrer"
                  aria-label={`Visit BiiXoft on ${social.platform}`}
                  className="w-9 h-9 rounded-xl bg-white border border-slate-200 text-slate-500 flex items-center justify-center transition-all duration-300 hover:bg-blue-600 hover:text-white hover:border-blue-600 hover:-translate-y-0.5 shadow-sm active:translate-y-0"
                >
                  <svg className="w-4 h-4 fill-currentColor" viewBox="0 0 24 24" aria-hidden="true">
                    <path d={social.iconPath} />
                  </svg>
                </a>
              ))}
            </div>

            {/* Status light footprint badge duplicate */}
            <div className="inline-flex items-center space-x-2 bg-emerald-50 text-emerald-700 border border-emerald-100 px-3 py-1 rounded-full text-xs font-bold shadow-sm select-none">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse"></span>
              <span>All Cloud Nodes Operational</span>
            </div>
          </div>

          {/* Column 2: Structural Navigation Links */}
          <div className="md:col-span-3 text-center md:text-left">
            <h4 className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-4">
              Navigation Map
            </h4>
            <ul className="space-y-3">
              {platformLinks.map((link, idx) => (
                <li key={idx}>
                  <a href={link.href} className="text-slate-600 hover:text-blue-600 text-sm font-semibold transition-colors duration-200">
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 3: Value Operations List */}
          <div className="md:col-span-4 text-center md:text-left">
            <h4 className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-4">
              Ecosystem Features
            </h4>
            <ul className="space-y-3">
              {ecosystemServices.map((service, idx) => (
                <li key={idx}>
                  <a href={service.href} className="text-slate-600 hover:text-blue-600 text-sm font-semibold transition-colors duration-200 block">
                    {service.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

        </div>

        {/* 🔒 Bottom Sub-Layer Row: Intellectual Footprint & Legal Disclaimers */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs font-semibold text-slate-400">
          <div className="text-center sm:text-left">
            &copy; {currentYear} BiiXoft Engine Labs. All rights reserved.
          </div>
          
          {/* Strategy Statement Tag matching your brand values */}
          {/* <div className="flex items-center space-x-1.5 select-none text-[11px] bg-white border border-slate-200/50 px-3 py-1.5 rounded-lg text-slate-500 shadow-sm">
            <span>Built Fluid with React & Tailwind Architecture</span>
            <span className="text-blue-600 font-bold">⚡</span>
          </div> */}
        </div>

      </div>
    </footer>
  );
}
