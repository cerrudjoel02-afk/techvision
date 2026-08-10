'use client'

import { useEffect, useState } from 'react'
import {
  Briefcase,
  ChevronDown,
  Menu,
  Network,
  Rocket,
  Shield,
  Stethoscope,
  X,
} from 'lucide-react'
import { BLOCKS, ALL_SECTIONS } from '@/lib/nav'
import { cn } from '@/lib/utils'

const ICONS: Record<string, React.ComponentType<{ className?: string }>> = {
  stethoscope: Stethoscope,
  network: Network,
  shield: Shield,
  briefcase: Briefcase,
  rocket: Rocket,
}

export function useActiveSection() {
  const [active, setActive] = useState('portada')
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((e) => e.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0]
        if (visible) setActive(visible.target.id)
      },
      { rootMargin: '-20% 0px -65% 0px', threshold: [0, 0.25, 0.5, 1] },
    )
    ALL_SECTIONS.forEach((s) => {
      const el = document.getElementById(s.id)
      if (el) observer.observe(el)
    })
    return () => observer.disconnect()
  }, [])
  return active
}

export function SiteNav() {
  const active = useActiveSection()
  const [mobileOpen, setMobileOpen] = useState(false)
  const [openBlocks, setOpenBlocks] = useState<string[]>(['bloque-1'])

  const activeBlock = BLOCKS.find((b) => b.sections.some((s) => s.id === active))?.id

  useEffect(() => {
    if (activeBlock) setOpenBlocks((prev) => (prev.includes(activeBlock) ? prev : [...prev, activeBlock]))
  }, [activeBlock])

  const toggle = (id: string) =>
    setOpenBlocks((prev) => (prev.includes(id) ? prev.filter((b) => b !== id) : [...prev, id]))

  const progress =
    ((ALL_SECTIONS.findIndex((s) => s.id === active) + 1) / ALL_SECTIONS.length) * 100

  const nav = (
    <nav aria-label="Navegación de secciones" className="flex h-full flex-col">
      <div className="border-b border-border px-5 py-5">
        <p className="font-mono text-[10px] uppercase tracking-[0.25em] text-primary">NovaBank Global</p>
        <p className="mt-1 text-lg font-semibold leading-tight">Tech Vision 2030</p>
        <p className="mt-1 text-xs text-muted-foreground">Consultoría ITSE · 25 secciones</p>
        <div className="mt-4 h-1 w-full overflow-hidden rounded-full bg-muted">
          <div
            className="h-full bg-primary transition-[width] duration-500"
            style={{ width: `${progress}%`, boxShadow: '0 0 10px rgba(0,229,255,0.7)' }}
          />
        </div>
      </div>

      <div className="scrollbar-thin flex-1 overflow-y-auto px-3 py-4">
        {BLOCKS.map((block, i) => {
          const Icon = ICONS[block.icon]
          const open = openBlocks.includes(block.id)
          return (
            <div key={block.id} className="mb-2">
              <button
                onClick={() => toggle(block.id)}
                aria-expanded={open}
                className={cn(
                  'flex w-full items-center gap-3 rounded-xl px-3 py-2.5 text-left transition-colors',
                  activeBlock === block.id
                    ? 'bg-primary/10 text-primary'
                    : 'text-muted-foreground hover:bg-card hover:text-foreground',
                )}
              >
                <Icon className="h-4 w-4 shrink-0" />
                <span className="flex-1 text-sm font-medium leading-tight">
                  <span className="font-mono text-[10px] opacity-60">B{i + 1} · </span>
                  {block.short}
                </span>
                <ChevronDown className={cn('h-4 w-4 transition-transform', open && 'rotate-180')} />
              </button>
              {open ? (
                <ul className="ml-6 mt-1 border-l border-border pl-3">
                  {block.sections.map((s) => (
                    <li key={s.id}>
                      <a
                        href={`#${s.id}`}
                        onClick={() => setMobileOpen(false)}
                        className={cn(
                          'flex items-center gap-2 rounded-md px-2 py-1.5 text-xs transition-all',
                          active === s.id
                            ? 'text-primary glow-text translate-x-1'
                            : 'text-muted-foreground hover:translate-x-1 hover:text-foreground',
                        )}
                      >
                        <span className="font-mono text-[10px] opacity-70">
                          {String(s.n).padStart(2, '0')}
                        </span>
                        <span className="leading-tight">{s.label}</span>
                      </a>
                    </li>
                  ))}
                </ul>
              ) : null}
            </div>
          )
        })}
      </div>

      <div className="border-t border-border px-5 py-4">
        <p className="font-mono text-[10px] uppercase tracking-wider text-muted-foreground">
          ITSE · TIC&apos;s · Ago 2026
        </p>
      </div>
    </nav>
  )

  return (
    <>
      <aside className="fixed inset-y-0 left-0 z-50 hidden w-72 border-r border-border bg-[#0d1e38] lg:block">
        {nav}
      </aside>

      <header className="sticky top-0 z-50 flex items-center justify-between border-b border-border bg-[#0a192f]/90 px-4 py-3 backdrop-blur-md lg:hidden">
        <div>
          <p className="font-mono text-[10px] uppercase tracking-[0.2em] text-primary">NovaBank</p>
          <p className="text-sm font-semibold">Tech Vision 2030</p>
        </div>
        <button
          onClick={() => setMobileOpen(true)}
          className="rounded-lg border border-border p-2 text-primary transition-colors hover:bg-primary/10"
          aria-label="Abrir navegación"
        >
          <Menu className="h-5 w-5" />
        </button>
      </header>

      {mobileOpen ? (
        <div className="fixed inset-0 z-100 lg:hidden">
          <div className="absolute inset-0 bg-[#020814]/80 backdrop-blur-sm" onClick={() => setMobileOpen(false)} />
          <div className="absolute inset-y-0 left-0 w-[85%] max-w-xs border-r border-primary/30 bg-[#0d1e38]">
            <button
              onClick={() => setMobileOpen(false)}
              className="absolute right-3 top-4 z-10 rounded-lg border border-border p-1.5 text-muted-foreground"
              aria-label="Cerrar navegación"
            >
              <X className="h-4 w-4" />
            </button>
            {nav}
          </div>
        </div>
      ) : null}
    </>
  )
}
