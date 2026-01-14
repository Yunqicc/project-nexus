import React from "react"
import Typewriter from "typewriter-effect"

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
    <div className="py-12 md:py-16 text-center">
      <h1 className="text-2xl md:text-5xl font-bold px-4">极简主义动态个人主页</h1>
      <div className="mt-4 text-base md:text-2xl text-brand h-8">
        <Typewriter
          options={{
            strings: ["Hi, I'm 云栖", "A Vibe Coder", "A React Developer"],
            autoStart: true,
            loop: true
          }}
        />
      </div>

      <div className="mt-8 flex flex-wrap items-center justify-center gap-3 md:gap-6 text-sm">
        <a href="#projects" className="px-4 py-2 rounded border hover:bg-neutral-100 dark:hover:bg-neutral-800 transition-colors">Projects</a>
        <a href="#about" className="px-4 py-2 rounded border hover:bg-neutral-100 dark:hover:bg-neutral-800 transition-colors">About</a>
        <a href="#contact" className="px-4 py-2 rounded border hover:bg-neutral-100 dark:hover:bg-neutral-800 transition-colors">Contact</a>
      </div>

      <div className="mt-8 flex flex-wrap items-center justify-center gap-4 md:gap-5 px-4">
        <a className="opacity-80 hover:opacity-100 p-2" href="https://github.com/" target="_blank" rel="noreferrer">GitHub</a>
        <a className="opacity-80 hover:opacity-100 p-2" href="https://www.bilibili.com/" target="_blank" rel="noreferrer">Bilibili</a>
        <a className="opacity-80 hover:opacity-100 p-2" href="mailto:your@email.com">Email</a>
        <a 
          className="opacity-80 hover:opacity-100 p-2 text-brand font-medium" 
          href="/resume.pdf" 
          download 
          onClick={handleDownloadResume}
        >
          下载简历
        </a>
      </div>
    </div>
  )
}
