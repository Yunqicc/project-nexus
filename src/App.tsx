import React from "react"
import Hero from "./components/Hero"
import ProjectGallery from "./components/ProjectGallery"
import VibeWall from "./components/VibeWall"
import ThemeToggle from "./components/ThemeToggle"
import SEO from "./components/SEO"

export default function App() {
  return (
    <div className="min-h-screen">
      <SEO 
        title="Project Nexus | AI & Creative Coding Showcase"
        description="Explore my portfolio of AI experiments, creative coding projects, and technical demos. Built with React, Tailwind CSS, and Supabase."
        keywords="AI showcase, creative coding, React portfolio, TypeScript, Supabase, Vibe Wall"
      />
      <header className="sticky top-0 z-30 backdrop-blur bg-white/60 dark:bg-neutral-900/60 border-b border-neutral-200 dark:border-neutral-800">
        <div className="max-w-4xl mx-auto px-4 py-3 flex items-center justify-between">
          <a href="#" className="font-semibold">Project Nexus</a>
          <nav className="flex items-center gap-4 text-sm">
            <a href="#projects" className="hover:text-brand">Projects</a>
            <a href="#about" className="hover:text-brand">About</a>
            <a href="#contact" className="hover:text-brand">Contact</a>
            <ThemeToggle />
          </nav>
        </div>
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
