'use client'

import { useState } from 'react'
import {
  ArrowRight,
  Briefcase,
  ChevronDown,
  Clock,
  GraduationCap,
  Network,
  Rocket,
  Shield,
  Stethoscope,
  Users,
  Zap,
} from 'lucide-react'
import { Badge, Bar, Card, Modal, Section, Stat } from '@/components/kit'
import { BLOCKS, CONSULTORES } from '@/lib/nav'
import { cn } from '@/lib/utils'

/* 01 — Portada */
export function Hero() {
  return (
    <section id="portada" className="scroll-mt-28 relative overflow-hidden pt-10 md:pt-16">
      <div className="grid-bg pointer-events-none absolute inset-0 opacity-70" aria-hidden="true" />
      <div className="relative rounded-xl border border-border bg-gradient-to-b from-card to-[#0f2038] p-8 md:p-14">
        <div className="flex flex-wrap items-center gap-2">
          <Badge>Consultoría estratégica</Badge>
          <Badge tone="muted">
            <GraduationCap className="h-3 w-3" /> ITSE
          </Badge>
          <Badge tone="muted">Agosto 2026</Badge>
        </div>

        <h1 className="mt-6 text-balance text-4xl font-semibold leading-[1.05] tracking-tight md:text-6xl">
          Tech Vision <span className="text-primary glow-text">2030</span>
        </h1>
        <p className="mt-3 text-lg font-medium text-muted-foreground md:text-xl">
          Transformación digital integral para NovaBank Global S.A.
        </p>
        <p className="mt-5 max-w-2xl text-pretty leading-relaxed text-muted-foreground">
          Propuesta técnica de modernización core-banking: arquitectura cloud-native, red
          segmentada VLSM, seguridad Zero Trust, scoring crediticio con IA y un plan financiero de
          $1,391,500 USD con ROI proyectado de 276.57%.
        </p>

        <div className="mt-8 flex flex-wrap items-center gap-3">
          <a
            href="#matriz"
            className="group inline-flex items-center gap-2 rounded-xl bg-primary px-6 py-3 text-sm font-semibold text-primary-foreground transition-all hover:glow"
          >
            Explorar Propuesta
            <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
          </a>
          <a
            href="#conclusiones"
            className="inline-flex items-center gap-2 rounded-xl border border-border px-6 py-3 text-sm font-semibold text-foreground transition-all hover:border-primary hover:text-primary"
          >
            Ver conclusiones y QR
          </a>
        </div>

        <dl className="mt-10 grid gap-6 border-t border-border pt-8 md:grid-cols-3">
          <div>
            <dt className="font-mono text-[10px] uppercase tracking-[0.2em] text-primary">
              Institución
            </dt>
            <dd className="mt-2 text-sm leading-relaxed">
              Instituto Técnico Superior Especializado (ITSE)
              <br />
              <span className="text-muted-foreground">
                Técnico Superior en Desarrollo de Software · Asignatura TIC&apos;s
              </span>
            </dd>
          </div>
          <div>
            <dt className="font-mono text-[10px] uppercase tracking-[0.2em] text-primary">
              Docente
            </dt>
            <dd className="mt-2 text-sm leading-relaxed">
              Mgtr. Aarón Smith
              <br />
              <span className="text-muted-foreground">Agosto de 2026</span>
            </dd>
          </div>
          <div>
            <dt className="font-mono text-[10px] uppercase tracking-[0.2em] text-primary">
              Equipo consultor
            </dt>
            <dd className="mt-2 flex flex-wrap gap-1.5">
              {CONSULTORES.map((c) => (
                <span
                  key={c}
                  className="rounded-lg border border-input bg-muted px-2 py-1 text-xs text-foreground"
                >
                  {c}
                </span>
              ))}
            </dd>
          </div>
        </dl>
      </div>
    </section>
  )
}

/* 02 — Dashboard de Navegación Matriz */
const BLOCK_META: Record<string, { icon: React.ComponentType<{ className?: string }>; desc: string }> = {
  'bloque-1': { icon: Stethoscope, desc: 'Situación actual, KPIs, requerimientos, personas y casos de uso.' },
  'bloque-2': { icon: Network, desc: 'Cloud-native en AWS, VLSM, topología, DevSecOps y prototipo.' },
  'bloque-3': { icon: Shield, desc: 'Zero Trust, ISO 27005, gobierno de datos e IA de scoring.' },
  'bloque-4': { icon: Briefcase, desc: 'RACI, Gantt, CAPEX/OPEX, ROI y continuidad operativa.' },
  'bloque-5': { icon: Rocket, desc: 'Roadmap 2026-2028, video promocional y centro de recursos QR.' },
}

export function MatrixDashboard() {
  return (
    <Section
      id="matriz"
      n={2}
      eyebrow="Navegación"
      title="Dashboard de navegación matriz"
      description="Cinco bloques temáticos que agrupan las 25 secciones del entregable. Selecciona un bloque para saltar directamente a su contenido."
    >
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {BLOCKS.map((b, i) => {
          const meta = BLOCK_META[b.id]
          const Icon = meta.icon
          return (
            <a key={b.id} href={`#${b.sections[0].id}`} className="block">
              <Card interactive className="group h-full">
                <div className="flex items-start justify-between">
                  <div className="rounded-xl border border-primary/30 bg-primary/10 p-2.5 text-primary transition-colors group-hover:bg-primary group-hover:text-primary-foreground">
                    <Icon className="h-5 w-5" />
                  </div>
                  <span className="font-mono text-xs text-muted-foreground">
                    BLOQUE 0{i + 1}
                  </span>
                </div>
                <h3 className="mt-4 text-base font-semibold leading-snug">{b.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{meta.desc}</p>
                <div className="mt-4 flex items-center justify-between border-t border-border pt-3">
                  <span className="font-mono text-[10px] uppercase tracking-wider text-muted-foreground">
                    {b.sections.length} secciones
                  </span>
                  <ArrowRight className="h-4 w-4 text-primary transition-transform group-hover:translate-x-1" />
                </div>
              </Card>
            </a>
          )
        })}
        <Card className="flex flex-col justify-center bg-primary/5">
          <p className="font-mono text-4xl font-semibold text-primary">25</p>
          <p className="mt-1 text-sm">secciones interactivas documentadas</p>
          <p className="mt-3 text-xs leading-relaxed text-muted-foreground">
            Cada bloque incluye componentes navegables: tabs, modales, mapas de calor, simuladores y
            timelines.
          </p>
        </Card>
      </div>
    </Section>
  )
}

/* 03 — Diagnóstico Empresarial */
const DIAG = [
  { k: 'Apertura de cuenta', now: '72 horas', goal: '< 3 minutos', pct: 98 },
  { k: 'Core bancario', now: 'Monolito COBOL on-premise', goal: 'Microservicios en AWS EKS', pct: 90 },
  { k: 'Disponibilidad', now: '97.2% con ventanas nocturnas', goal: '99.99% multi-AZ', pct: 85 },
  { k: 'Despliegues', now: '2 por trimestre', goal: 'CI/CD diario', pct: 95 },
  { k: 'Canal digital', now: '31% de transacciones', goal: '85% de transacciones', pct: 74 },
]

export function Diagnostico() {
  const [view, setView] = useState<'actual' | 'meta'>('actual')
  return (
    <Section
      id="diagnostico"
      n={3}
      eyebrow="Bloque 1"
      title="Diagnóstico empresarial"
      description="NovaBank Global opera un core monolítico que tarda 72 horas en onboarding. Tech Vision 2030 reduce ese ciclo a menos de 3 minutos."
    >
      <div className="mb-6 inline-flex rounded-xl border border-border bg-card p-1">
        {(['actual', 'meta'] as const).map((v) => (
          <button
            key={v}
            onClick={() => setView(v)}
            className={cn(
              'rounded-lg px-4 py-2 text-sm font-medium transition-all',
              view === v
                ? 'bg-primary text-primary-foreground glow'
                : 'text-muted-foreground hover:text-foreground',
            )}
          >
            {v === 'actual' ? 'Situación actual' : 'Meta 2030'}
          </button>
        ))}
      </div>

      <div className="grid gap-4 lg:grid-cols-3">
        <Card className="lg:col-span-1">
          <Clock className={cn('h-6 w-6', view === 'actual' ? 'text-destructive' : 'text-primary')} />
          <p className="mt-4 font-mono text-4xl font-semibold">
            {view === 'actual' ? '72 hrs' : '< 3 min'}
          </p>
          <p className="mt-2 text-sm text-muted-foreground">
            {view === 'actual'
              ? 'Tiempo actual de apertura de cuenta con verificación manual y sucursal física.'
              : 'Onboarding digital KYC automatizado con OCR, biometría y validación en línea.'}
          </p>
          <div className="mt-5">
            <Badge tone={view === 'actual' ? 'danger' : 'success'}>
              {view === 'actual' ? 'Cuello de botella crítico' : 'Objetivo Tech Vision 2030'}
            </Badge>
          </div>
        </Card>

        <Card className="lg:col-span-2">
          <ul className="flex flex-col gap-5">
            {DIAG.map((d) => (
              <li key={d.k}>
                <div className="flex flex-wrap items-baseline justify-between gap-2">
                  <span className="text-sm font-medium">{d.k}</span>
                  <span
                    className={cn(
                      'font-mono text-xs',
                      view === 'actual' ? 'text-muted-foreground' : 'text-primary',
                    )}
                  >
                    {view === 'actual' ? d.now : d.goal}
                  </span>
                </div>
                <div className="mt-2">
                  <Bar value={view === 'actual' ? 100 - d.pct : d.pct} />
                </div>
              </li>
            ))}
          </ul>
        </Card>
      </div>
    </Section>
  )
}

/* 04 — Objetivos y KPIs */
export function Objetivos() {
  return (
    <Section
      id="objetivos"
      n={4}
      eyebrow="Bloque 1"
      title="Objetivos estratégicos y KPIs"
      description="Indicadores medibles que definen el éxito del programa en un horizonte de 36 meses."
    >
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <Stat value="99.99%" label="Uptime anual" hint="Multi-AZ con failover automático (52 min/año máx.)" />
        <Stat value="> 5000" label="TPS sostenidos" hint="Transacciones por segundo en horas pico" />
        <Stat value="< 200 ms" label="Latencia p95" hint="Respuesta de API Gateway a microservicio" />
        <Stat value="85%" label="Adopción digital" hint="Transacciones fuera de sucursal física" />
      </div>
      <div className="mt-4 grid gap-4 md:grid-cols-3">
        {[
          {
            t: 'OE-01 Modernizar el core',
            d: 'Migrar 100% de los módulos críticos del monolito COBOL a microservicios contenedorizados antes de Q4 2027.',
          },
          {
            t: 'OE-02 Elevar la experiencia',
            d: 'Onboarding digital 100% remoto con NPS ≥ 65 y tasa de abandono menor al 12%.',
          },
          {
            t: 'OE-03 Blindar la operación',
            d: 'Cero hallazgos críticos en auditoría ISO 27001 y cumplimiento PCI DSS 4.0.',
          },
        ].map((o) => (
          <Card key={o.t} interactive>
            <Zap className="h-5 w-5 text-primary" />
            <h3 className="mt-3 text-sm font-semibold">{o.t}</h3>
            <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{o.d}</p>
          </Card>
        ))}
      </div>
    </Section>
  )
}

/* 05 — Requerimientos */
const RF = [
  {
    id: 'RF-01',
    t: 'Onboarding digital KYC',
    d: 'El sistema debe permitir la apertura de cuenta 100% remota con lectura OCR de documento, prueba de vida biométrica y validación contra listas restrictivas OFAC/PEP en menos de 3 minutos.',
  },
  {
    id: 'RF-02',
    t: 'Transferencias SPI en tiempo real',
    d: 'El sistema debe procesar transferencias interbancarias 24/7 con confirmación push y conciliación automática contra el sistema de pagos inmediatos.',
  },
  {
    id: 'RF-03',
    t: 'Scoring crediticio automatizado',
    d: 'El sistema debe calcular un score de riesgo con modelo XGBoost y devolver decisión explicable (XAI) en menos de 1 segundo.',
  },
]
const RNF = [
  {
    id: 'RNF-01',
    t: 'Disponibilidad y rendimiento',
    d: 'Disponibilidad de 99.99% mensual, latencia p95 menor a 200 ms y capacidad sostenida superior a 5000 TPS con autoescalado horizontal.',
  },
  {
    id: 'RNF-02',
    t: 'Seguridad y cifrado',
    d: 'Cifrado TLS 1.3 en tránsito, AES-256 en reposo con llaves en HSM Thales Luna, MFA FIDO2 obligatorio y arquitectura Zero Trust.',
  },
  {
    id: 'RNF-03',
    t: 'Usabilidad y accesibilidad',
    d: 'Cumplimiento WCAG 2.1 nivel AA, contraste mínimo 4.5:1, navegación completa por teclado y soporte para lectores de pantalla.',
  },
]

export function Requerimientos() {
  const [tab, setTab] = useState<'rf' | 'rnf'>('rf')
  const items = tab === 'rf' ? RF : RNF
  return (
    <Section
      id="requerimientos"
      n={5}
      eyebrow="Bloque 1"
      title="Levantamiento de requerimientos"
      description="Requerimientos priorizados mediante entrevistas con negocio, talleres con TI y análisis documental del core actual."
    >
      <div
        role="tablist"
        aria-label="Tipos de requerimiento"
        className="mb-6 inline-flex rounded-xl border border-border bg-card p-1"
      >
        {([
          ['rf', 'Funcionales'],
          ['rnf', 'No funcionales'],
        ] as const).map(([key, label]) => (
          <button
            key={key}
            role="tab"
            aria-selected={tab === key}
            onClick={() => setTab(key)}
            className={cn(
              'rounded-lg px-5 py-2 text-sm font-medium transition-all',
              tab === key
                ? 'bg-primary text-primary-foreground glow'
                : 'text-muted-foreground hover:text-foreground',
            )}
          >
            {label}
          </button>
        ))}
      </div>
      <div className="grid gap-4 md:grid-cols-3">
        {items.map((r) => (
          <Card key={r.id} interactive>
            <Badge>{r.id}</Badge>
            <h3 className="mt-3 text-sm font-semibold">{r.t}</h3>
            <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{r.d}</p>
          </Card>
        ))}
      </div>
    </Section>
  )
}

/* 06 — Análisis de Usuarios */
const PERSONAS = [
  {
    name: 'Mariela Ortega',
    role: 'Cliente retail · 34 años',
    goal: 'Abrir su cuenta desde el celular sin ir a sucursal.',
    pains: ['Filas y horarios limitados', 'Documentación repetida', 'App lenta con datos móviles'],
    needs: ['Onboarding menor a 3 minutos', 'Notificaciones en tiempo real', 'Modo bajo consumo'],
  },
  {
    name: 'Rodrigo Salas',
    role: 'PyME · Ferretería, 47 años',
    goal: 'Cobrar y conciliar pagos de proveedores el mismo día.',
    pains: ['Transferencias que tardan 24h', 'Sin API de conciliación', 'Comisiones opacas'],
    needs: ['Transferencias SPI 24/7', 'Exportación contable', 'Panel multiusuario'],
  },
  {
    name: 'Ana Lucía Pérez',
    role: 'Analista de riesgo · Back office',
    goal: 'Evaluar solicitudes de crédito con criterios trazables.',
    pains: ['Scoring manual en hojas de cálculo', 'Decisiones no auditables'],
    needs: ['Score XGBoost explicable', 'Trazabilidad de decisiones', 'Alertas de fraude'],
  },
  {
    name: 'Iván Moreno',
    role: 'SRE · Plataforma',
    goal: 'Mantener 99.99% de disponibilidad con despliegues diarios.',
    pains: ['Ventanas de mantenimiento nocturnas', 'Rollbacks manuales'],
    needs: ['CI/CD con canary', 'Observabilidad end-to-end', 'Runbooks de failover'],
  },
]

export function Usuarios() {
  const [open, setOpen] = useState<number | null>(null)
  const p = open !== null ? PERSONAS[open] : null
  return (
    <Section
      id="usuarios"
      n={6}
      eyebrow="Bloque 1"
      title="Análisis de usuarios"
      description="Cuatro user personas construidas a partir de 42 entrevistas y analítica del canal digital actual. Haz clic en una tarjeta para ver el detalle."
    >
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {PERSONAS.map((persona, i) => (
          <button key={persona.name} onClick={() => setOpen(i)} className="text-left">
            <Card interactive className="h-full">
              <div className="flex h-11 w-11 items-center justify-center rounded-full border border-primary/40 bg-primary/10 font-mono text-sm text-primary">
                {persona.name
                  .split(' ')
                  .map((w) => w[0])
                  .slice(0, 2)
                  .join('')}
              </div>
              <h3 className="mt-3 text-sm font-semibold">{persona.name}</h3>
              <p className="text-xs text-muted-foreground">{persona.role}</p>
              <p className="mt-3 text-sm leading-relaxed text-muted-foreground">{persona.goal}</p>
              <span className="mt-4 inline-flex items-center gap-1 font-mono text-[10px] uppercase tracking-wider text-primary">
                Ver perfil <ArrowRight className="h-3 w-3" />
              </span>
            </Card>
          </button>
        ))}
      </div>

      <Modal open={p !== null} onClose={() => setOpen(null)} title={p?.name ?? ''}>
        {p ? (
          <div className="flex flex-col gap-5">
            <p className="text-sm text-muted-foreground">{p.role}</p>
            <div>
              <p className="font-mono text-[10px] uppercase tracking-wider text-primary">Objetivo</p>
              <p className="mt-1 text-sm leading-relaxed">{p.goal}</p>
            </div>
            <div>
              <p className="font-mono text-[10px] uppercase tracking-wider text-primary">
                Puntos de dolor
              </p>
              <ul className="mt-2 flex flex-col gap-1.5">
                {p.pains.map((x) => (
                  <li key={x} className="flex gap-2 text-sm text-muted-foreground">
                    <span className="text-destructive">▪</span> {x}
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <p className="font-mono text-[10px] uppercase tracking-wider text-primary">
                Necesidades cubiertas
              </p>
              <ul className="mt-2 flex flex-col gap-1.5">
                {p.needs.map((x) => (
                  <li key={x} className="flex gap-2 text-sm text-muted-foreground">
                    <span className="text-[color:var(--success)]">▪</span> {x}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        ) : null}
      </Modal>
    </Section>
  )
}

/* 07 — Casos de Uso */
const CASOS = [
  {
    id: 'CU-01',
    t: 'Onboarding con verificación KYC',
    actor: 'Cliente retail / Motor KYC',
    pre: 'El usuario cuenta con documento vigente y dispositivo con cámara.',
    steps: [
      'El usuario descarga la app e inicia el registro con correo y teléfono.',
      'Captura el documento de identidad; el OCR extrae y valida los campos.',
      'Realiza prueba de vida (liveness) y comparación biométrica 1:1.',
      'El motor consulta listas OFAC/PEP y buró de crédito.',
      'Se crea la cuenta, se emite tarjeta virtual y se notifica por push.',
    ],
    post: 'Cuenta activa en menos de 3 minutos con expediente digital firmado.',
  },
  {
    id: 'CU-02',
    t: 'Transferencia inmediata SPI',
    actor: 'Cliente / Servicio de pagos / Red SPI',
    pre: 'Cuenta activa con saldo disponible y MFA registrado.',
    steps: [
      'El usuario selecciona destinatario y monto en la app.',
      'El servicio valida saldo, límites y reglas antifraude en tiempo real.',
      'Se solicita confirmación MFA FIDO2 según el nivel de riesgo.',
      'Se publica el evento en Kafka y se envía la orden a la red SPI.',
      'Se recibe el acuse, se concilia y se notifica a ambas partes.',
    ],
    post: 'Transferencia liquidada en segundos con trazabilidad completa.',
  },
]

export function CasosUso() {
  const [open, setOpen] = useState<string | null>('CU-01')
  return (
    <Section
      id="casos-uso"
      n={7}
      eyebrow="Bloque 1"
      title="Casos de uso principales"
      description="Flujos críticos modelados en notación textual con actores, precondiciones y postcondiciones."
    >
      <div className="flex flex-col gap-4">
        {CASOS.map((c) => {
          const isOpen = open === c.id
          return (
            <Card key={c.id} className={cn('p-0 overflow-hidden', isOpen && 'border-primary/60')}>
              <button
                onClick={() => setOpen(isOpen ? null : c.id)}
                aria-expanded={isOpen}
                className="flex w-full items-center gap-4 px-5 py-4 text-left transition-colors hover:bg-primary/5"
              >
                <Badge>{c.id}</Badge>
                <span className="flex-1 text-sm font-semibold">{c.t}</span>
                <ChevronDown
                  className={cn('h-4 w-4 text-primary transition-transform', isOpen && 'rotate-180')}
                />
              </button>
              {isOpen ? (
                <div className="border-t border-border px-5 py-5">
                  <div className="grid gap-4 md:grid-cols-2">
                    <div>
                      <p className="font-mono text-[10px] uppercase tracking-wider text-primary">
                        Actores
                      </p>
                      <p className="mt-1 text-sm text-muted-foreground">{c.actor}</p>
                    </div>
                    <div>
                      <p className="font-mono text-[10px] uppercase tracking-wider text-primary">
                        Precondición
                      </p>
                      <p className="mt-1 text-sm text-muted-foreground">{c.pre}</p>
                    </div>
                  </div>
                  <ol className="mt-6 flex flex-col gap-3">
                    {c.steps.map((s, i) => (
                      <li key={s} className="flex gap-3">
                        <span className="mt-0.5 flex h-6 w-6 shrink-0 items-center justify-center rounded-full border border-primary/40 bg-primary/10 font-mono text-[10px] text-primary">
                          {i + 1}
                        </span>
                        <span className="text-sm leading-relaxed text-muted-foreground">{s}</span>
                      </li>
                    ))}
                  </ol>
                  <p className="mt-5 rounded-lg border border-[color:var(--success)]/30 bg-[color:var(--success)]/5 px-4 py-3 text-sm text-[color:var(--success)]">
                    Postcondición: {c.post}
                  </p>
                </div>
              ) : null}
            </Card>
          )
        })}
      </div>
      <div className="mt-4 flex items-center gap-2 text-xs text-muted-foreground">
        <Users className="h-4 w-4 text-primary" /> Flujos validados con el equipo de producto de
        NovaBank Global.
      </div>
    </Section>
  )
}
