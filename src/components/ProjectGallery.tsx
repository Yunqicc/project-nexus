import React from "react"
import { projects } from "../data/projects"
import { Github, ExternalLink } from "lucide-react"

export default function ProjectGallery() {
  return (
    <div>
      <div className="flex items-center gap-4 mb-8">
        <h2 className="text-3xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-white to-white/60">项目橱窗</h2>
        <div className="h-px flex-1 bg-gradient-to-r from-white/20 to-transparent"></div>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {projects.map((p, index) => (
          <article
            key={p.title}
            className="group glass-card p-6 hover:-translate-y-2 transition-all duration-300 hover:shadow-[0_0_30px_rgba(59,130,246,0.15)] flex flex-col h-full"
            style={{ animationDelay: `${index * 100}ms` }}
          >
            <div className="flex items-start justify-between mb-4">
              <h3 className="text-xl font-bold group-hover:text-brand transition-colors">{p.title}</h3>
              <div className="flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                {p.source && (
                  <a href={p.source} target="_blank" rel="noreferrer" className="p-1.5 rounded-full hover:bg-white/10 text-white/70 hover:text-white transition-colors" title="View Source">
                    <Github size={16} />
                  </a>
                )}
                {p.demo && (
                  <a href={p.demo} target="_blank" rel="noreferrer" className="p-1.5 rounded-full hover:bg-white/10 text-white/70 hover:text-white transition-colors" title="Live Demo">
                    <ExternalLink size={16} />
                  </a>
                )}
              </div>
            </div>
            
            <p className="text-sm text-neutral-400 mb-6 flex-1 leading-relaxed">
              {p.description}
            </p>
            
            <div className="flex flex-wrap gap-2 mt-auto pt-4 border-t border-white/5">
              {p.tags.map((t) => (
                <span
                  key={t}
                  className="px-2.5 py-1 text-xs font-medium rounded-md bg-white/5 text-white/70 border border-white/5"
                >
                  {t}
                </span>
              ))}
            </div>
          </article>
        ))}
      </div>
    </div>
  )
}
