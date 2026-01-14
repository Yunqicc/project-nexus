import React from "react"
import Typewriter from "typewriter-effect"
import { Github, Mail, Youtube, FileDown, Code2, User, Send } from "lucide-react"

export default function Hero() {
  const handleDownloadResume = () => {
    if (typeof window.gtag === 'function') {
      window.gtag('event', 'download_resume', {
        event_category: 'engagement',
        event_label: 'resume_pdf',
        file_name: 'resume.pdf'
      });
    }
  };

  return (
    <div className="py-20 md:py-32 text-center relative">
      {/* 装饰性光晕 */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[200px] h-[200px] bg-brand/30 rounded-full blur-[100px] animate-pulse-slow"></div>

      <div className="relative z-10 space-y-8">
        <h1 className="text-4xl md:text-7xl font-bold px-4 tracking-tight leading-tight">
          <span className="bg-clip-text text-transparent bg-gradient-to-r from-white via-white to-white/50 text-glow">
            极简主义动态个人主页
          </span>
        </h1>
        
        <div className="text-xl md:text-3xl text-brand-glow h-12 flex items-center justify-center font-mono">
          <span className="text-blue-400 mr-2">{'>'}</span>
          <Typewriter
            options={{
              strings: ["Hi, I'm 云栖", "A Vibe Coder", "A React Developer", "Building the Future"],
              autoStart: true,
              loop: true,
              delay: 50,
              deleteSpeed: 30,
            }}
          />
        </div>

        <div className="flex flex-wrap items-center justify-center gap-4 mt-12">
          <a href="#projects" className="group glass-card px-6 py-3 flex items-center gap-2 hover:bg-white/10 hover:border-white/20 transition-all hover:-translate-y-1">
            <Code2 size={18} className="text-blue-400 group-hover:text-blue-300 transition-colors" />
            <span>Projects</span>
          </a>
          <a href="#about" className="group glass-card px-6 py-3 flex items-center gap-2 hover:bg-white/10 hover:border-white/20 transition-all hover:-translate-y-1">
            <User size={18} className="text-purple-400 group-hover:text-purple-300 transition-colors" />
            <span>About</span>
          </a>
          <a href="#contact" className="group glass-card px-6 py-3 flex items-center gap-2 hover:bg-white/10 hover:border-white/20 transition-all hover:-translate-y-1">
            <Send size={18} className="text-pink-400 group-hover:text-pink-300 transition-colors" />
            <span>Contact</span>
          </a>
        </div>

        <div className="flex flex-wrap items-center justify-center gap-6 mt-8">
          <a className="p-3 rounded-full hover:bg-white/10 transition-all hover:scale-110 text-white/70 hover:text-white" href="https://github.com/" target="_blank" rel="noreferrer" aria-label="GitHub">
            <Github size={24} />
          </a>
          <a className="p-3 rounded-full hover:bg-white/10 transition-all hover:scale-110 text-white/70 hover:text-white" href="https://www.bilibili.com/" target="_blank" rel="noreferrer" aria-label="Bilibili">
            <Youtube size={24} />
          </a>
          <a className="p-3 rounded-full hover:bg-white/10 transition-all hover:scale-110 text-white/70 hover:text-white" href="mailto:your@email.com" aria-label="Email">
            <Mail size={24} />
          </a>
          <a 
            className="flex items-center gap-2 px-6 py-2.5 bg-brand/80 hover:bg-brand text-white rounded-full transition-all hover:shadow-[0_0_20px_rgba(59,130,246,0.5)] hover:-translate-y-1 font-medium" 
            href="/resume.pdf" 
            download 
            onClick={handleDownloadResume}
          >
            <FileDown size={18} />
            下载简历
          </a>
        </div>
      </div>
    </div>
  )
}
