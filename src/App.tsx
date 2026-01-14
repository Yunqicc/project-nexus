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
    <div className="min-h-screen relative">
      <SEO 
        title="Project Nexus | AI & Creative Coding Showcase"
        description="Explore my portfolio of AI experiments, creative coding projects, and technical demos. Built with React, Tailwind CSS, and Supabase."
        keywords="AI showcase, creative coding, React portfolio, TypeScript, Supabase, Vibe Wall"
      />
      <header className="sticky top-0 z-30 backdrop-blur bg-white/60 dark:bg-neutral-900/60 border-b border-neutral-200 dark:border-neutral-800">
        <div className="max-w-4xl mx-auto px-4 py-3 flex items-center justify-between">
          <a href="#" className="font-semibold text-lg">Project Nexus</a>
          
          {/* Desktop Nav */}
          <nav className="hidden md:flex items-center gap-6 text-sm">
            <a href="#projects" className="hover:text-brand transition-colors">Projects</a>
            <a href="#about" className="hover:text-brand transition-colors">About</a>
            <a href="#contact" className="hover:text-brand transition-colors">Contact</a>
            <ThemeToggle />
          </nav>

          {/* Mobile Menu Button */}
          <div className="flex items-center gap-4 md:hidden">
            <ThemeToggle />
            <button 
              onClick={toggleMenu}
              className="p-1 rounded-md hover:bg-neutral-100 dark:hover:bg-neutral-800 transition-colors"
              aria-label="Toggle menu"
            >
              {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>

        {/* Mobile Nav Dropdown */}
        {isMenuOpen && (
          <div className="md:hidden absolute top-full left-0 right-0 bg-white/95 dark:bg-neutral-900/95 border-b border-neutral-200 dark:border-neutral-800 backdrop-blur-sm animate-in slide-in-from-top-2">
            <nav className="flex flex-col p-4 gap-4 text-center">
              <a 
                href="#projects" 
                className="py-2 hover:text-brand hover:bg-neutral-50 dark:hover:bg-neutral-800 rounded-lg transition-colors"
                onClick={() => setIsMenuOpen(false)}
              >
                Projects
              </a>
              <a 
                href="#about" 
                className="py-2 hover:text-brand hover:bg-neutral-50 dark:hover:bg-neutral-800 rounded-lg transition-colors"
                onClick={() => setIsMenuOpen(false)}
              >
                About
              </a>
              <a 
                href="#contact" 
                className="py-2 hover:text-brand hover:bg-neutral-50 dark:hover:bg-neutral-800 rounded-lg transition-colors"
                onClick={() => setIsMenuOpen(false)}
              >
                Contact
              </a>
            </nav>
          </div>
        )}
      </header>

      <main>
        <section className="max-w-4xl mx-auto px-4">
          <Hero />
        </section>

        <section id="projects" className="max-w-4xl mx-auto px-4 mt-16">
          <ProjectGallery />
        </section>

        <section id="contact" className="max-w-4xl mx-auto px-4 mt-16">
          <VibeWall />
        </section>
      </main>

      <footer className="mt-24 py-12 text-center text-sm text-neutral-500">
        © {new Date().getFullYear()} Project Nexus • Built with React + Supabase
      </footer>
    </div>
  )
}
