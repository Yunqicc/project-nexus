import React from "react"
import { projects } from "../data/projects"

export default function ProjectGallery() {
  return (
    <div>
      <h2 className="text-2xl font-semibold">项目橱窗</h2>
      <p className="mt-2 text-sm text-neutral-600 dark:text-neutral-400">一些我做过的有趣作品</p>
      <div className="mt-6 grid grid-cols-1 sm:grid-cols-2 gap-6">
        {projects.map((p) => (
          <article
            key={p.title}
            className="border rounded-lg p-4 hover:shadow transition-transform hover:-translate-y-0.5"
          >
            <h3 className="font-semibold">{p.title}</h3>
            <p className="mt-2 text-sm">{p.description}</p>
            <div className="mt-3 flex flex-wrap gap-2">
              {p.tags.map((t) => (
                <span
                  key={t}
                  className="px-2 py-0.5 text-xs rounded-full border bg-neutral-50 dark:bg-neutral-800"
                >
                  {t}
                </span>
              ))}
            </div>
            <div className="mt-4 flex gap-3 text-sm">
              {p.source && (
                <a className="text-brand hover:underline" href={p.source} target="_blank" rel="noreferrer">
                  查看源码
                </a>
              )}
              {p.demo && (
                <a className="text-brand hover:underline" href={p.demo} target="_blank" rel="noreferrer">
                  在线体验
                </a>
              )}
            </div>
          </article>
        ))}
      </div>
    </div>
  )
}
