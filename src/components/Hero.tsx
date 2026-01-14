import React from "react"
import Typewriter from "typewriter-effect"

export default function Hero() {
  return (
    <div className="py-16 text-center">
      <h1 className="text-3xl md:text-5xl font-bold">极简主义动态个人主页</h1>
      <div className="mt-4 text-lg md:text-2xl text-brand">
        <Typewriter
          options={{
            strings: ["Hi, I'm 云栖", "A Vibe Coder", "A React Developer"],
            autoStart: true,
            loop: true
          }}
        />
      </div>

      <div className="mt-6 flex items-center justify-center gap-6 text-sm">
        <a href="#projects" className="px-3 py-1 rounded border hover:bg-neutral-100 dark:hover:bg-neutral-800">Projects</a>
        <a href="#about" className="px-3 py-1 rounded border hover:bg-neutral-100 dark:hover:bg-neutral-800">About</a>
        <a href="#contact" className="px-3 py-1 rounded border hover:bg-neutral-100 dark:hover:bg-neutral-800">Contact</a>
      </div>

      <div className="mt-8 flex items-center justify-center gap-5">
        <a className="opacity-80 hover:opacity-100" href="https://github.com/" target="_blank" rel="noreferrer">GitHub</a>
        <a className="opacity-80 hover:opacity-100" href="https://www.bilibili.com/" target="_blank" rel="noreferrer">Bilibili</a>
        <a className="opacity-80 hover:opacity-100" href="mailto:your@email.com">Email</a>
        <a className="opacity-80 hover:opacity-100" href="/resume.pdf" download>下载简历</a>
      </div>
    </div>
  )
}
