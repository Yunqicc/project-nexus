import React, { useState } from "react"
import { Menu, X } from "lucide-react"
import Hero from "./components/Hero"
import ProjectGallery from "./components/ProjectGallery"
import VibeWall from "./components/VibeWall"
import ThemeToggle from "./components/ThemeToggle"
import SEO from "./components/SEO"

export default function App() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)

  const toggleMenu = () => setIsMenuOpen(!isMenuOpen)

  return (
    <div className="min-h-screen relative text-neutral-100">
      <SEO 
        title="Project Nexus | AI & Creative Coding Showcase"
        description="Explore my portfolio of AI experiments, creative coding projects, and technical demos. Built with React, Tailwind CSS, and Supabase."
        keywords="AI showcase, creative coding, React portfolio, TypeScript, Supabase, Vibe Wall"
      />
      
      {/* 极光背景层 */}
      <div className="aurora-bg">
        <div className="aurora-blob aurora-1"></div>
        <div className="aurora-blob aurora-2"></div>
        <div className="aurora-blob aurora-3"></div>
      </div>

      <header className="sticky top-0 z-30 backdrop-blur-md bg-black/10 border-b border-white/5">
        <div className="max-w-6xl mx-auto px-4 py-4 flex items-center justify-between">
          <a href="#" className="font-bold text-xl tracking-tight bg-clip-text text-transparent bg-gradient-to-r from-white to-white/70">
            Project Nexus
          </a>
          
          {/* Desktop Nav */}
          <nav className="hidden md:flex items-center gap-8 text-sm font-medium">
            <a href="#projects" className="text-white/70 hover:text-white transition-colors hover:drop-shadow-[0_0_8px_rgba(255,255,255,0.5)]">Projects</a>
            <a href="#about" className="text-white/70 hover:text-white transition-colors hover:drop-shadow-[0_0_8px_rgba(255,255,255,0.5)]">About</a>
            <a href="#contact" className="text-white/70 hover:text-white transition-colors hover:drop-shadow-[0_0_8px_rgba(255,255,255,0.5)]">Contact</a>
            <div className="pl-4 border-l border-white/10">
              <ThemeToggle />
            </div>
          </nav>

          {/* Mobile Menu Button */}
          <div className="flex items-center gap-4 md:hidden">
            <ThemeToggle />
            <button 
              onClick={toggleMenu}
              className="p-2 rounded-full hover:bg-white/10 transition-colors"
              aria-label="Toggle menu"
            >
              {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>

        {/* Mobile Nav Dropdown */}
        {isMenuOpen && (
          <div className="md:hidden absolute top-full left-0 right-0 bg-black/90 backdrop-blur-xl border-b border-white/10 animate-in slide-in-from-top-2">
            <nav className="flex flex-col p-6 gap-4 text-center">
              <a 
                href="#projects" 
                className="py-3 text-lg font-medium text-white/80 hover:text-white hover:bg-white/5 rounded-xl transition-all"
                onClick={() => setIsMenuOpen(false)}
              >
                Projects
              </a>
              <a 
                href="#about" 
                className="py-3 text-lg font-medium text-white/80 hover:text-white hover:bg-white/5 rounded-xl transition-all"
                onClick={() => setIsMenuOpen(false)}
              >
                About
              </a>
              <a 
                href="#contact" 
                className="py-3 text-lg font-medium text-white/80 hover:text-white hover:bg-white/5 rounded-xl transition-all"
                onClick={() => setIsMenuOpen(false)}
              >
                Contact
              </a>
            </nav>
          </div>
        )}
      </header>

      <main className="relative z-10">
        <section className="max-w-6xl mx-auto px-4 pt-12 pb-20">
          <Hero />
        </section>

        <section id="projects" className="max-w-6xl mx-auto px-4 py-20">
          <ProjectGallery />
        </section>

        <section id="contact" className="max-w-4xl mx-auto px-4 py-20">
          <VibeWall />
        </section>
      </main>

      <footer className="mt-12 py-12 text-center text-sm text-white/40 border-t border-white/5 backdrop-blur-sm bg-black/20">
        <p>© {new Date().getFullYear()} Project Nexus • Built with React + Supabase</p>
      </footer>
    </div>
  )
}
