'use client'

import type React from 'react'
import { cn } from '@/lib/utils'

export function Section({
  id,
  n,
  eyebrow,
  title,
  description,
  children,
  className,
}: {
  id: string
  n: number
  eyebrow?: string
  title: string
  description?: string
  children?: React.ReactNode
  className?: string
}) {
  return (
    <section id={id} className={cn('scroll-mt-28 py-14 md:py-20', className)}>
      <header className="mb-8 flex flex-col gap-3">
        <div className="flex items-center gap-3">
          <span className="font-mono text-xs tracking-[0.2em] text-primary">
            {String(n).padStart(2, '0')}
          </span>
          <span className="h-px flex-1 bg-gradient-to-r from-primary/60 to-transparent" />
          {eyebrow ? (
            <span className="font-mono text-[10px] uppercase tracking-[0.2em] text-muted-foreground">
              {eyebrow}
            </span>
          ) : null}
        </div>
        <h2 className="text-balance text-2xl font-semibold tracking-tight md:text-3xl">{title}</h2>
        {description ? (
          <p className="max-w-3xl text-pretty leading-relaxed text-muted-foreground">
            {description}
          </p>
        ) : null}
      </header>
      {children}
    </section>
  )
}

export function Card({
  className,
  children,
  interactive = false,
  ...props
}: React.ComponentProps<'div'> & { interactive?: boolean }) {
  return (
    <div
      className={cn(
        'rounded-xl border border-border bg-card p-5 transition-all duration-300',
        interactive && 'hover:-translate-y-1 hover:border-primary/70 hover:glow',
        className,
      )}
      {...props}
    >
      {children}
    </div>
  )
}

export function Badge({
  children,
  tone = 'default',
  className,
}: {
  children: React.ReactNode
  tone?: 'default' | 'success' | 'warning' | 'danger' | 'muted'
  className?: string
}) {
  const tones: Record<string, string> = {
    default: 'border-primary/40 bg-primary/10 text-primary',
    success: 'border-[color:var(--success)]/40 bg-[color:var(--success)]/10 text-[color:var(--success)]',
    warning: 'border-[color:var(--warning)]/40 bg-[color:var(--warning)]/10 text-[color:var(--warning)]',
    danger: 'border-destructive/40 bg-destructive/10 text-destructive',
    muted: 'border-input bg-muted text-muted-foreground',
  }
  return (
    <span
      className={cn(
        'inline-flex items-center gap-1 rounded-full border px-2.5 py-0.5 font-mono text-[10px] uppercase tracking-wider',
        tones[tone],
        className,
      )}
    >
      {children}
    </span>
  )
}

export function Stat({
  value,
  label,
  hint,
}: {
  value: string
  label: string
  hint?: string
}) {
  return (
    <Card interactive className="group">
      <p className="font-mono text-3xl font-semibold text-primary group-hover:glow-text">{value}</p>
      <p className="mt-2 text-sm font-medium">{label}</p>
      {hint ? <p className="mt-1 text-xs leading-relaxed text-muted-foreground">{hint}</p> : null}
    </Card>
  )
}

export function Bar({ value, max = 100 }: { value: number; max?: number }) {
  const pct = Math.min(100, (value / max) * 100)
  return (
    <div className="h-2 w-full overflow-hidden rounded-full bg-muted">
      <div
        className="h-full rounded-full bg-primary transition-[width] duration-700"
        style={{ width: `${pct}%`, boxShadow: '0 0 12px rgba(0,229,255,0.6)' }}
      />
    </div>
  )
}

export function Modal({
  open,
  onClose,
  title,
  children,
}: {
  open: boolean
  onClose: () => void
  title: string
  children: React.ReactNode
}) {
  if (!open) return null
  return (
    <div
      className="fixed inset-0 z-100 flex items-end justify-center bg-[#020814]/80 p-4 backdrop-blur-sm md:items-center"
      role="dialog"
      aria-modal="true"
      aria-label={title}
      onClick={onClose}
    >
      <div
        className="scrollbar-thin max-h-[85vh] w-full max-w-lg overflow-y-auto rounded-xl border border-primary/40 bg-card p-6 glow"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="mb-4 flex items-start justify-between gap-4">
          <h3 className="text-lg font-semibold">{title}</h3>
          <button
            onClick={onClose}
            className="rounded-md border border-input px-2 py-1 font-mono text-xs text-muted-foreground transition-colors hover:border-primary hover:text-primary"
            aria-label="Cerrar"
          >
            ESC
          </button>
        </div>
        {children}
      </div>
    </div>
  )
}
