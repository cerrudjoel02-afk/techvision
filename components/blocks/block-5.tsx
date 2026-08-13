'use client'

import Image from 'next/image'
import { useState } from 'react'
import { Play, QrCode, Sparkles } from 'lucide-react'
import { Badge, Card, Modal, Section } from '@/components/kit'
import { CONSULTORES } from '@/lib/nav'
import { cn } from '@/lib/utils'

/* 23 — Roadmap */
const ROADMAP = [
  {
    v: 'v1.0',
    y: '2026',
    t: 'Fundación digital',
    d: 'Onboarding KYC remoto, transferencias SPI, API Gateway Kong y primeros ocho microservicios en producción.',
    hitos: ['Onboarding < 3 min', 'CI/CD diario', 'Zero Trust fase 1', 'Uptime 99.9%'],
    estado: 'En ejecución',
    tone: 'default' as const,
  },
  {
    v: 'v2.0',
    y: '2027',
    t: 'Banco inteligente',
    d: 'Scoring XGBoost en producción, open banking con APIs públicas, hiperpersonalización y expansión regional.',
    hitos: ['Scoring XAI en línea', 'APIs open banking', 'Uptime 99.99%', 'Multi-región activa'],
    estado: 'Planificado',
    tone: 'warning' as const,
  },
  {
    v: 'v3.0',
    y: '2028+',
    t: 'Resiliencia post-cuántica',
    d: 'Migración a criptografía post-cuántica (ML-KEM/ML-DSA), agentes autónomos de operación y banca embebida.',
    hitos: ['Cripto post-cuántica', 'AIOps autónomo', 'Banking-as-a-Service', 'Cero downtime planificado'],
    estado: 'Visión',
    tone: 'muted' as const,
  },
]

export function Roadmap() {
  const [sel, setSel] = useState(0)
  const r = ROADMAP[sel]
  return (
    <Section
      id="roadmap"
      n={23}
      eyebrow="Bloque 5"
      title="Roadmap tecnológico 2026 — 2028+"
      description="Evolución en tres versiones mayores del ecosistema NovaBank. Selecciona un hito de la línea de tiempo."
    >
      <div className="relative">
        <div className="absolute left-0 right-0 top-5 hidden h-px bg-gradient-to-r from-primary via-primary/40 to-transparent md:block" />
        <div className="grid gap-4 md:grid-cols-3">
          {ROADMAP.map((x, i) => (
            <button key={x.v} onClick={() => setSel(i)} className="relative text-left">
              <span
                className={cn(
                  'relative z-10 mb-4 hidden h-3 w-3 rounded-full border-2 md:block',
                  sel === i ? 'border-primary bg-primary glow' : 'border-primary/50 bg-background',
                )}
                style={{ marginTop: '0.85rem' }}
              />
              <Card interactive className={cn('h-full', sel === i && 'border-primary/70 glow')}>
                <div className="flex items-center justify-between">
                  <span className="font-mono text-2xl font-semibold text-primary">{x.v}</span>
                  <Badge tone={x.tone}>{x.y}</Badge>
                </div>
                <h3 className="mt-3 text-sm font-semibold">{x.t}</h3>
                <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{x.d}</p>
              </Card>
            </button>
          ))}
        </div>
      </div>
      <Card className="mt-4">
        <div className="flex flex-wrap items-center gap-2">
          <Badge>{r.v} · {r.y}</Badge>
          <Badge tone={r.tone}>{r.estado}</Badge>
        </div>
        <div className="mt-4 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
          {r.hitos.map((h) => (
            <div key={h} className="rounded-xl border border-border bg-[#16253f] px-4 py-3">
              <Sparkles className="h-4 w-4 text-primary" />
              <p className="mt-2 text-sm">{h}</p>
            </div>
          ))}
        </div>
      </Card>
    </Section>
  )
}

/* 24 — Video */
export function Video() {
  const [playing, setPlaying] = useState(false)
  return (
    <Section
      id="video"
      n={24}
      eyebrow="Bloque 5"
      title="Reproductor de video promocional"
      description="Repositorio multimedia del proyecto: pieza audiovisual de 3 minutos que resume la propuesta Tech Vision 2030."
    >
      <div className="grid gap-4 lg:grid-cols-[1.6fr_1fr]">
        <Card className="overflow-hidden p-0">
          <div className="relative aspect-video w-full bg-[#0d1e38]">
            {playing ? (
              <iframe
                className="h-full w-full"
                src="https://www.youtube.com/embed/o_2YDYoBH4Q?autoplay=1&rel=0"
                title="TECH VISION 2030"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              />
            ) : (
              <button
                onClick={() => setPlaying(true)}
                className="grid-bg group absolute inset-0 flex flex-col items-center justify-center gap-4"
                aria-label="Reproducir video promocional"
              >
                <span className="flex h-16 w-16 items-center justify-center rounded-full border border-primary/50 bg-primary/15 text-primary transition-all group-hover:scale-110 group-hover:glow">
                  <Play className="ml-1 h-7 w-7" />
                </span>
                <span className="text-sm font-semibold">TECH VISION 2030</span>
                <span className="font-mono text-[10px] uppercase tracking-[0.2em] text-muted-foreground">
                  YouTube · NovaBank Global S.A.
                </span>
              </button>
            )}
          </div>
        </Card>
        <Card>
          <p className="font-mono text-[10px] uppercase tracking-wider text-primary">
            Ficha del contenido
          </p>
          <dl className="mt-4 flex flex-col gap-3 text-sm">
            {[
              ['Título', 'Tech Vision 2030: el futuro de NovaBank'],
              ['Duración', '3 minutos 12 segundos'],
              ['Formato', 'MP4 1080p · subtítulos ES/EN'],
              ['Producción', 'Equipo consultor ITSE'],
              ['Uso', 'Presentación ejecutiva y comité directivo'],
            ].map(([k, v]) => (
              <div key={k} className="flex flex-col border-b border-border pb-2 last:border-0">
                <dt className="font-mono text-[10px] uppercase tracking-wider text-muted-foreground">
                  {k}
                </dt>
                <dd className="mt-0.5">{v}</dd>
              </div>
            ))}
          </dl>
        </Card>
      </div>
    </Section>
  )
}

/* 25 — Conclusiones y QR */
const CONCLUSIONES = [
  'La migración del monolito COBOL a una arquitectura cloud-native de microservicios es la palanca central para reducir el onboarding de 72 horas a menos de 3 minutos.',
  'El diseño VLSM sobre 10.150.0.0/16 y la topología jerárquica de tres capas permiten microsegmentar el tráfico y habilitar el modelo Zero Trust sin rediseñar la red en el futuro.',
  'La matriz ISO 27005 identificó DDoS, SQLi y spoofing como riesgos críticos; sus controles ya están presupuestados dentro del CAPEX del programa.',
  'El caso financiero es sólido: $1,391,500 USD de inversión con 276.57% de ROI y recuperación en 14 meses, sostenido por la reducción del costo por transacción.',
  'La gobernanza de IA explicable y el cumplimiento GDPR posicionan a NovaBank para auditorías regulatorias sin deuda ética ni técnica.',
]
const REFERENCIAS = [
  'Amazon Web Services. (2025). AWS Well-Architected Framework. https://aws.amazon.com/architecture/well-architected/',
  'International Organization for Standardization. (2022). ISO/IEC 27005: Information security risk management. ISO.',
  'Kong Inc. (2025). Kong Gateway documentation. https://docs.konghq.com/',
  'National Institute of Standards and Technology. (2020). Zero Trust Architecture (NIST SP 800-207). U.S. Department of Commerce.',
  'National Institute of Standards and Technology. (2024). Post-quantum cryptography standards (FIPS 203, 204, 205). U.S. Department of Commerce.',
  'World Wide Web Consortium. (2018). Web Content Accessibility Guidelines (WCAG) 2.1. https://www.w3.org/TR/WCAG21/',
]

export function Conclusiones() {
  const [qr, setQr] = useState(false)
  const githubRepoUrl = 'https://github.com/cerrudjoel02-afk/techvision'
  const githubQrImage = '/github-techvision-qr.png'

  return (
    <Section
      id="conclusiones"
      n={25}
      eyebrow="Bloque 5"
      title="Conclusiones ejecutivas y centro de recursos"
      description="Síntesis del entregable, referencias en formato APA 7 y acceso unificado a todos los materiales del proyecto."
    >
      <div className="grid gap-4 lg:grid-cols-[1.5fr_1fr]">
        <Card>
          <p className="font-mono text-[10px] uppercase tracking-wider text-primary">Conclusiones</p>
          <ol className="mt-4 flex flex-col gap-4">
            {CONCLUSIONES.map((c, i) => (
              <li key={c} className="flex gap-3">
                <span className="mt-0.5 flex h-6 w-6 shrink-0 items-center justify-center rounded-full border border-primary/40 bg-primary/10 font-mono text-[10px] text-primary">
                  {i + 1}
                </span>
                <p className="text-sm leading-relaxed text-muted-foreground">{c}</p>
              </li>
            ))}
          </ol>
        </Card>

        <Card className="flex flex-col items-center text-center">
          <QrCode className="h-6 w-6 text-primary" />
          <p className="mt-3 font-mono text-[10px] uppercase tracking-wider text-primary">
            Repositorio GitHub
          </p>
          <a
            href={githubRepoUrl}
            target="_blank"
            rel="noreferrer"
            className="mt-5 rounded-xl border border-border bg-[#FFFFFF] p-3 transition-all hover:glow"
            aria-label="Abrir repositorio GitHub del proyecto"
          >
            <Image
              src={githubQrImage}
              alt="Código QR del repositorio GitHub del proyecto Tech Vision 2030"
              width={180}
              height={180}
              className="h-40 w-40"
            />
          </a>
          <p className="mt-4 text-sm leading-relaxed text-muted-foreground">
            Escanea el código o abre el repositorio para revisar el proyecto, el código y los recursos.
          </p>
          <a
            href={githubRepoUrl}
            target="_blank"
            rel="noreferrer"
            className="mt-4 rounded-xl bg-primary px-5 py-2.5 text-sm font-semibold text-primary-foreground transition-all hover:glow"
          >
            Abrir repositorio GitHub
          </a>
        </Card>
      </div>

      <Card className="mt-4">
        <p className="font-mono text-[10px] uppercase tracking-wider text-primary">
          Referencias — APA 7ª edición
        </p>
        <ul className="mt-4 flex flex-col gap-3">
          {REFERENCIAS.map((r) => (
            <li
              key={r}
              className="pl-6 -indent-6 text-sm leading-relaxed text-muted-foreground [text-indent:-1.5rem]"
            >
              {r}
            </li>
          ))}
        </ul>
      </Card>

      <footer className="mt-10 rounded-xl border border-border bg-card px-6 py-6">
        <div className="flex flex-wrap items-start justify-between gap-6">
          <div>
            <p className="text-sm font-semibold">Tech Vision 2030 · NovaBank Global S.A.</p>
            <p className="mt-1 text-xs leading-relaxed text-muted-foreground">
              Instituto Técnico Superior Especializado (ITSE) · Técnico Superior en Desarrollo de
              Software · Asignatura TIC&apos;s
              <br />
              Docente: Mgtr. Aarón Smith · Agosto de 2026
            </p>
          </div>
          <div className="flex flex-wrap gap-1.5">
            {CONSULTORES.map((c) => (
              <span
                key={c}
                className="rounded-lg border border-input bg-muted px-2 py-1 text-xs text-foreground"
              >
                {c}
              </span>
            ))}
          </div>
        </div>
      </footer>

      <Modal open={qr} onClose={() => setQr(false)} title="Repositorio GitHub — Tech Vision 2030">
        <div className="flex flex-col items-center gap-5">
          <div className="rounded-xl bg-[#FFFFFF] p-4">
            <Image
              src={githubQrImage}
              alt="Código QR del repositorio GitHub del proyecto Tech Vision 2030"
              width={260}
              height={260}
              className="h-56 w-56"
            />
          </div>
          <a
            href={githubRepoUrl}
            target="_blank"
            rel="noreferrer"
            className="rounded-xl bg-primary px-5 py-2.5 text-sm font-semibold text-primary-foreground transition-all hover:glow"
          >
            Abrir repositorio
          </a>
          <ul className="grid w-full gap-2 sm:grid-cols-2">
            {['Documento técnico (PDF)', 'Prototipo interactivo', 'Video promocional', 'Código del proyecto'].map(
              (x) => (
                <li
                  key={x}
                  className="rounded-lg border border-border bg-[#16253f] px-3 py-2 text-center text-xs text-muted-foreground"
                >
                  {x}
                </li>
              ),
            )}
          </ul>
          <p className="font-mono text-[10px] uppercase tracking-wider text-muted-foreground">
            github.com/cerrudjoel02-afk/techvision
          </p>
        </div>
      </Modal>
    </Section>
  )
}
