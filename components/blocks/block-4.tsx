'use client'

import { useMemo, useState } from 'react'
import { Activity, CheckCircle2, RotateCcw, TrendingUp, Users2 } from 'lucide-react'
import { Badge, Bar, Card, Section, Stat } from '@/components/kit'
import { cn } from '@/lib/utils'

/* 18 — Organigrama y RACI */
const ROLES = [
  { id: 'sponsor', n: 'Sponsor Ejecutivo', p: 'CIO NovaBank Global', d: 'Aprueba presupuesto, resuelve escalamientos y preside el steering committee mensual.' },
  { id: 'pm', n: 'Project Manager', p: 'Jorvan Camargo', d: 'Gestiona alcance, cronograma, riesgos y comunicación con stakeholders.' },
  { id: 'arch', n: 'Arquitecto de Soluciones', p: 'Elkin Carrasco', d: 'Define la arquitectura cloud-native, estándares técnicos y decisiones ADR.' },
  { id: 'sec', n: 'Líder de Ciberseguridad', p: 'Joel Cerrud', d: 'Diseña el modelo Zero Trust, matriz de riesgos y cumplimiento normativo.' },
  { id: 'ux', n: 'Líder UX/UI y Datos', p: 'Yorlenis Gaitán', d: 'Sistema de diseño, investigación de usuarios y gobierno de datos e IA.' },
]
const RACI_TASKS = [
  { t: 'Definición de arquitectura', r: ['C', 'A', 'R', 'C', 'I'] },
  { t: 'Diseño de red y VLSM', r: ['I', 'A', 'R', 'C', 'I'] },
  { t: 'Modelo Zero Trust', r: ['I', 'A', 'C', 'R', 'I'] },
  { t: 'Sistema de diseño UX/UI', r: ['I', 'A', 'C', 'I', 'R'] },
  { t: 'Modelo de scoring IA', r: ['C', 'A', 'C', 'C', 'R'] },
  { t: 'Presupuesto y ROI', r: ['A', 'R', 'C', 'I', 'I'] },
  { t: 'Plan DRP/BCP', r: ['A', 'C', 'R', 'R', 'I'] },
]
const RACI_TONE: Record<string, string> = {
  R: 'bg-primary/20 text-primary border-primary/40',
  A: 'bg-[color:var(--warning)]/15 text-[color:var(--warning)] border-[color:var(--warning)]/40',
  C: 'bg-[color:var(--success)]/15 text-[color:var(--success)] border-[color:var(--success)]/40',
  I: 'bg-muted text-muted-foreground border-input',
}

export function Organizacion() {
  const [sel, setSel] = useState('pm')
  const rol = ROLES.find((r) => r.id === sel)!
  return (
    <Section
      id="organizacion"
      n={18}
      eyebrow="Bloque 4"
      title="Estructura organizacional y matriz RACI"
      description="Equipo consultor de cinco roles con responsabilidades asignadas por entregable."
    >
      <div className="grid gap-4 lg:grid-cols-[1fr_1.4fr]">
        <Card>
          <div className="flex items-center gap-2">
            <Users2 className="h-4 w-4 text-primary" />
            <p className="font-mono text-[10px] uppercase tracking-wider text-primary">Organigrama</p>
          </div>
          <div className="mt-5 flex flex-col items-center gap-2">
            <button
              onClick={() => setSel('sponsor')}
              className={cn(
                'w-full rounded-xl border px-4 py-3 text-center transition-all',
                sel === 'sponsor' ? 'border-primary bg-primary/10 glow' : 'border-border bg-[#16253f] hover:border-primary/50',
              )}
            >
              <p className="text-sm font-semibold">{ROLES[0].n}</p>
              <p className="text-xs text-muted-foreground">{ROLES[0].p}</p>
            </button>
            <div className="h-5 w-px bg-primary/50" />
            <button
              onClick={() => setSel('pm')}
              className={cn(
                'w-full rounded-xl border px-4 py-3 text-center transition-all',
                sel === 'pm' ? 'border-primary bg-primary/10 glow' : 'border-border bg-[#16253f] hover:border-primary/50',
              )}
            >
              <p className="text-sm font-semibold">{ROLES[1].n}</p>
              <p className="text-xs text-muted-foreground">{ROLES[1].p}</p>
            </button>
            <div className="h-5 w-px bg-primary/50" />
            <div className="grid w-full grid-cols-3 gap-2">
              {ROLES.slice(2).map((r) => (
                <button
                  key={r.id}
                  onClick={() => setSel(r.id)}
                  className={cn(
                    'rounded-xl border px-2 py-3 text-center transition-all',
                    sel === r.id ? 'border-primary bg-primary/10 glow' : 'border-border bg-[#16253f] hover:border-primary/50',
                  )}
                >
                  <p className="text-xs font-semibold leading-tight">{r.n}</p>
                  <p className="mt-1 text-[10px] text-muted-foreground">{r.p}</p>
                </button>
              ))}
            </div>
          </div>
          <div className="mt-5 rounded-xl border border-border bg-[#16253f] p-4">
            <p className="text-sm font-semibold">{rol.n}</p>
            <p className="font-mono text-[10px] uppercase tracking-wider text-primary">{rol.p}</p>
            <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{rol.d}</p>
          </div>
        </Card>

        <Card className="overflow-hidden p-0">
          <div className="border-b border-border px-5 py-4">
            <p className="font-mono text-[10px] uppercase tracking-wider text-primary">Matriz RACI</p>
          </div>
          <div className="scrollbar-thin overflow-x-auto">
            <table className="w-full min-w-[600px] text-left text-sm">
              <thead>
                <tr className="border-b border-border bg-[#16253f]">
                  <th className="px-4 py-3 font-mono text-[10px] uppercase tracking-wider text-muted-foreground">
                    Entregable
                  </th>
                  {ROLES.map((r) => (
                    <th
                      key={r.id}
                      className="px-2 py-3 text-center font-mono text-[10px] uppercase tracking-wider text-muted-foreground"
                    >
                      {r.p.split(' ')[0]}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {RACI_TASKS.map((t) => (
                  <tr key={t.t} className="border-b border-border/60 last:border-0 hover:bg-primary/5">
                    <td className="px-4 py-3 text-sm">{t.t}</td>
                    {t.r.map((v, i) => (
                      <td key={i} className="px-2 py-3 text-center">
                        <span
                          className={cn(
                            'inline-flex h-6 w-6 items-center justify-center rounded-md border font-mono text-[10px]',
                            RACI_TONE[v],
                          )}
                        >
                          {v}
                        </span>
                      </td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <div className="flex flex-wrap gap-2 border-t border-border px-5 py-3">
            <Badge>R · Responsable</Badge>
            <Badge tone="warning">A · Aprobador</Badge>
            <Badge tone="success">C · Consultado</Badge>
            <Badge tone="muted">I · Informado</Badge>
          </div>
        </Card>
      </div>
    </Section>
  )
}

/* 19 — Gantt */
const FASES = [
  { f: 'Fase 1', n: 'Descubrimiento y diseño', start: 0, len: 4, color: 'bg-primary', d: 'Levantamiento, arquitectura objetivo, diseño de red y sistema de diseño UX/UI.' },
  { f: 'Fase 2', n: 'Construcción del core', start: 4, len: 8, color: 'bg-[color:var(--success)]', d: 'Microservicios de cuentas y pagos, Kafka, Aurora, pipelines CI/CD y prototipo funcional.' },
  { f: 'Fase 3', n: 'Seguridad e IA', start: 10, len: 6, color: 'bg-[color:var(--warning)]', d: 'Zero Trust, hardening, modelo de scoring XGBoost y pruebas de penetración.' },
  { f: 'Fase 4', n: 'Migración y estabilización', start: 14, len: 6, color: 'bg-destructive', d: 'Migración por olas, DRP/BCP, hipercare de 8 semanas y transferencia de conocimiento.' },
]
const MESES = ['M1', 'M2', 'M3', 'M4', 'M5', 'M6', 'M7', 'M8', 'M9', 'M10', 'M11', 'M12', 'M13', 'M14', 'M15', 'M16', 'M17', 'M18', 'M19', 'M20']

export function Gantt() {
  const [sel, setSel] = useState(0)
  return (
    <Section
      id="cronograma"
      n={19}
      eyebrow="Bloque 4"
      title="Cronograma general (Gantt)"
      description="Programa de 20 meses en cuatro fases con solapamientos controlados. Selecciona una barra para ver el detalle de la fase."
    >
      <Card className="overflow-hidden p-0">
        <div className="scrollbar-thin overflow-x-auto p-5">
          <div className="min-w-[760px]">
            <div className="grid grid-cols-20 gap-1 pl-40">
              {MESES.map((m) => (
                <span key={m} className="text-center font-mono text-[9px] text-muted-foreground">
                  {m}
                </span>
              ))}
            </div>
            <div className="mt-3 flex flex-col gap-3">
              {FASES.map((f, i) => (
                <div key={f.f} className="flex items-center gap-3">
                  <div className="w-40 shrink-0">
                    <p className="font-mono text-[10px] uppercase tracking-wider text-primary">{f.f}</p>
                    <p className="text-xs leading-tight text-muted-foreground">{f.n}</p>
                  </div>
                  <div className="grid flex-1 grid-cols-20 gap-1">
                    <button
                      onClick={() => setSel(i)}
                      style={{ gridColumn: `${f.start + 1} / span ${f.len}` }}
                      className={cn(
                        'h-8 rounded-lg text-left transition-all hover:opacity-100',
                        f.color,
                        sel === i ? 'opacity-100 glow' : 'opacity-70',
                      )}
                      aria-label={`${f.f}: ${f.n}`}
                    >
                      <span className="px-2 font-mono text-[10px] text-[#05121f]">
                        {f.len} meses
                      </span>
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
        <div className="border-t border-border bg-[#16253f] px-5 py-4">
          <p className="text-sm font-semibold">
            {FASES[sel].f} — {FASES[sel].n}
          </p>
          <p className="mt-1 text-sm leading-relaxed text-muted-foreground">{FASES[sel].d}</p>
          <p className="mt-2 font-mono text-xs text-primary">
            Meses {FASES[sel].start + 1} a {FASES[sel].start + FASES[sel].len}
          </p>
        </div>
      </Card>
    </Section>
  )
}

/* 20 — Presupuesto */
const CAPEX = [
  { c: 'Infraestructura cloud (reservas 3 años)', m: 285000 },
  { c: 'Licenciamiento (Kong, Fortinet, HSM Thales)', m: 212000 },
  { c: 'Hardware de red (Catalyst, FortiGate, APs)', m: 168500 },
  { c: 'Desarrollo e integración del core', m: 246000 },
]
const OPEX = [
  { c: 'Consumo AWS y observabilidad (anual)', m: 168000 },
  { c: 'Equipo de operación y SOC 24/7', m: 154000 },
  { c: 'Soporte, mantenimiento y auditorías', m: 88000 },
  { c: 'Capacitación y gestión del cambio', m: 70000 },
]

export function Presupuesto() {
  const [tab, setTab] = useState<'capex' | 'opex'>('capex')
  const rows = tab === 'capex' ? CAPEX : OPEX
  const totalCapex = CAPEX.reduce((a, b) => a + b.m, 0)
  const totalOpex = OPEX.reduce((a, b) => a + b.m, 0)
  const total = totalCapex + totalOpex
  const subtotal = rows.reduce((a, b) => a + b.m, 0)
  const fmt = (n: number) => `$${n.toLocaleString('en-US')}`

  return (
    <Section
      id="presupuesto"
      n={20}
      eyebrow="Bloque 4"
      title="Presupuesto CAPEX / OPEX"
      description={`Inversión total del programa: ${fmt(total)} USD distribuidos entre gasto de capital y gasto operativo del primer ciclo.`}
    >
      <div className="grid gap-4 lg:grid-cols-[1.4fr_1fr]">
        <Card className="p-0">
          <div className="flex gap-1 border-b border-border p-2">
            {([
              ['capex', 'CAPEX', totalCapex],
              ['opex', 'OPEX', totalOpex],
            ] as const).map(([k, l, v]) => (
              <button
                key={k}
                onClick={() => setTab(k)}
                className={cn(
                  'flex-1 rounded-lg px-4 py-2.5 text-sm font-medium transition-all',
                  tab === k ? 'bg-primary text-primary-foreground' : 'text-muted-foreground hover:text-foreground',
                )}
              >
                {l} · {fmt(v)}
              </button>
            ))}
          </div>
          <ul className="flex flex-col">
            {rows.map((r) => (
              <li key={r.c} className="border-b border-border/60 px-5 py-4 last:border-0 hover:bg-primary/5">
                <div className="flex flex-wrap items-baseline justify-between gap-2">
                  <span className="text-sm">{r.c}</span>
                  <span className="font-mono text-sm text-primary">{fmt(r.m)}</span>
                </div>
                <div className="mt-2">
                  <Bar value={(r.m / subtotal) * 100} />
                </div>
                <span className="mt-1 inline-block font-mono text-[10px] text-muted-foreground">
                  {((r.m / total) * 100).toFixed(1)}% del programa
                </span>
              </li>
            ))}
          </ul>
          <div className="flex items-center justify-between border-t border-border bg-[#16253f] px-5 py-4">
            <span className="text-sm font-semibold">Total {tab.toUpperCase()}</span>
            <span className="font-mono text-lg text-primary">{fmt(subtotal)}</span>
          </div>
        </Card>

        <div className="flex flex-col gap-4">
          <Card>
            <p className="font-mono text-[10px] uppercase tracking-wider text-primary">
              Inversión total
            </p>
            <p className="mt-2 font-mono text-4xl font-semibold glow-text">{fmt(total)}</p>
            <p className="mt-1 text-xs text-muted-foreground">USD · horizonte de 20 meses</p>
            <div className="mt-6 flex flex-col gap-4">
              <div>
                <div className="flex justify-between text-xs">
                  <span className="text-muted-foreground">CAPEX</span>
                  <span className="font-mono">{((totalCapex / total) * 100).toFixed(1)}%</span>
                </div>
                <div className="mt-1.5">
                  <Bar value={(totalCapex / total) * 100} />
                </div>
              </div>
              <div>
                <div className="flex justify-between text-xs">
                  <span className="text-muted-foreground">OPEX</span>
                  <span className="font-mono">{((totalOpex / total) * 100).toFixed(1)}%</span>
                </div>
                <div className="mt-1.5">
                  <Bar value={(totalOpex / total) * 100} />
                </div>
              </div>
            </div>
          </Card>
          <Card>
            <p className="text-sm leading-relaxed text-muted-foreground">
              El 62% del CAPEX se ejecuta en las fases 1 y 2; el OPEX se estabiliza a partir del mes
              14 con la salida a producción de la primera ola de migración.
            </p>
          </Card>
        </div>
      </div>
    </Section>
  )
}

/* 21 — ROI */
export function Roi() {
  const [inversion, setInversion] = useState(1391500)
  const [beneficio, setBeneficio] = useState(5240000)
  const roi = useMemo(
    () => ((beneficio - inversion) / inversion) * 100,
    [beneficio, inversion],
  )
  const payback = useMemo(() => (inversion / (beneficio / 36)) * 1, [beneficio, inversion])
  const reset = () => {
    setInversion(1391500)
    setBeneficio(5240000)
  }
  const fmt = (n: number) => `$${Math.round(n).toLocaleString('en-US')}`

  return (
    <Section
      id="roi"
      n={21}
      eyebrow="Bloque 4"
      title="Calculadora de retorno de inversión"
      description="Modelo financiero base a 36 meses. Ajusta los valores para simular escenarios alternativos."
    >
      <div className="grid gap-4 lg:grid-cols-[1fr_1.2fr]">
        <Card>
          <div className="flex items-center justify-between">
            <p className="font-mono text-[10px] uppercase tracking-wider text-primary">Variables</p>
            <button
              onClick={reset}
              className="inline-flex items-center gap-1 rounded-lg border border-input px-2 py-1 font-mono text-[10px] uppercase text-muted-foreground transition-colors hover:border-primary hover:text-primary"
            >
              <RotateCcw className="h-3 w-3" /> Base
            </button>
          </div>
          <label className="mt-5 flex flex-col gap-2 text-sm">
            <span className="flex justify-between">
              <span className="text-muted-foreground">Inversión total</span>
              <span className="font-mono text-primary">{fmt(inversion)}</span>
            </span>
            <input
              type="range"
              min={800000}
              max={2500000}
              step={10000}
              value={inversion}
              onChange={(e) => setInversion(+e.target.value)}
              className="accent-[#00E5FF]"
            />
          </label>
          <label className="mt-5 flex flex-col gap-2 text-sm">
            <span className="flex justify-between">
              <span className="text-muted-foreground">Beneficio a 36 meses</span>
              <span className="font-mono text-primary">{fmt(beneficio)}</span>
            </span>
            <input
              type="range"
              min={1000000}
              max={9000000}
              step={20000}
              value={beneficio}
              onChange={(e) => setBeneficio(+e.target.value)}
              className="accent-[#00E5FF]"
            />
          </label>
          <div className="mt-6 rounded-xl border border-border bg-[#16253f] p-4">
            <p className="font-mono text-[10px] uppercase tracking-wider text-muted-foreground">
              Fórmula aplicada
            </p>
            <p className="mt-2 font-mono text-sm leading-relaxed text-primary">
              ROI = ((Beneficio − Inversión) / Inversión) × 100
            </p>
            <p className="mt-1 font-mono text-xs text-muted-foreground">
              Payback = Inversión / (Beneficio mensual promedio)
            </p>
          </div>
        </Card>

        <div className="grid gap-4 sm:grid-cols-2">
          <Card className="sm:col-span-2">
            <TrendingUp className="h-6 w-6 text-primary" />
            <p className="mt-4 font-mono text-5xl font-semibold text-primary glow-text">
              {roi.toFixed(2)}%
            </p>
            <p className="mt-1 text-sm text-muted-foreground">Retorno sobre la inversión a 36 meses</p>
            <div className="mt-4">
              <Bar value={Math.min(roi, 400)} max={400} />
            </div>
          </Card>
          <Stat value={`${payback.toFixed(0)} meses`} label="Periodo de recuperación" hint="Payback simple sin descuento" />
          <Stat value={fmt(beneficio - inversion)} label="Beneficio neto" hint="Ahorro operativo + ingreso incremental" />
          <Card className="sm:col-span-2">
            <p className="font-mono text-[10px] uppercase tracking-wider text-primary">
              Fuentes del beneficio
            </p>
            <ul className="mt-3 grid gap-2 sm:grid-cols-2">
              {[
                'Reducción de 68% en costo por transacción',
                'Cierre de 40% de operaciones en sucursal',
                'Incremento de 22% en colocación de crédito',
                'Ahorro de $310K anuales en mantenimiento del core',
              ].map((x) => (
                <li key={x} className="flex gap-2 text-sm text-muted-foreground">
                  <CheckCircle2 className="h-4 w-4 shrink-0 text-primary" /> {x}
                </li>
              ))}
            </ul>
          </Card>
        </div>
      </div>
      <p className="mt-4 text-xs text-muted-foreground">
        Escenario base del entregable: inversión de $1,391,500 USD, ROI de 276.57% y payback de 14
        meses considerando la curva de adopción proyectada.
      </p>
    </Section>
  )
}

/* 22 — DRP / BCP */
export function Drp() {
  const [region, setRegion] = useState<'primaria' | 'secundaria'>('primaria')
  const [running, setRunning] = useState(false)
  const [log, setLog] = useState<string[]>([])

  const failover = () => {
    if (running) return
    const target = region === 'primaria' ? 'secundaria' : 'primaria'
    setRunning(true)
    setLog([])
    const steps = [
      'Detectando indisponibilidad de la región activa…',
      'Promoviendo réplica Aurora a writer (RPO < 1 s)…',
      'Actualizando Route 53 health checks y failover DNS…',
      'Escalando nodos EKS en la región destino…',
      'Rebalanceando consumidores Kafka…',
      `Tráfico conmutado a región ${target}. RTO alcanzado: 11 min 42 s.`,
    ]
    steps.forEach((s, i) => {
      setTimeout(() => {
        setLog((l) => [...l, s])
        if (i === steps.length - 1) {
          setRegion(target)
          setRunning(false)
        }
      }, 500 * (i + 1))
    })
  }

  return (
    <Section
      id="drp"
      n={22}
      eyebrow="Bloque 4"
      title="Continuidad del negocio — DRP / BCP"
      description="Estrategia activa-pasiva entre dos regiones AWS con conmutación por error automatizada. Ejecuta la simulación para observar la secuencia."
    >
      <div className="grid gap-4 lg:grid-cols-[1.2fr_1fr]">
        <Card>
          <div className="grid gap-3 sm:grid-cols-2">
            {(['primaria', 'secundaria'] as const).map((r) => (
              <div
                key={r}
                className={cn(
                  'rounded-xl border p-4 transition-all duration-500',
                  region === r ? 'border-primary bg-primary/10 glow' : 'border-border bg-[#16253f] opacity-70',
                )}
              >
                <div className="flex items-center justify-between">
                  <p className="font-mono text-[10px] uppercase tracking-wider text-muted-foreground">
                    Región {r}
                  </p>
                  <span
                    className={cn(
                      'h-2 w-2 rounded-full',
                      region === r ? 'animate-pulse bg-[color:var(--success)]' : 'bg-muted-foreground',
                    )}
                  />
                </div>
                <p className="mt-2 text-sm font-semibold">
                  {r === 'primaria' ? 'us-east-1 · N. Virginia' : 'us-west-2 · Oregón'}
                </p>
                <p className="mt-1 text-xs text-muted-foreground">
                  {region === r ? 'ACTIVA — recibiendo tráfico productivo' : 'EN ESPERA — réplica sincronizada'}
                </p>
              </div>
            ))}
          </div>

          <button
            onClick={failover}
            disabled={running}
            className="mt-5 inline-flex w-full items-center justify-center gap-2 rounded-xl bg-primary py-3 text-sm font-semibold text-primary-foreground transition-all hover:glow disabled:opacity-60"
          >
            <Activity className="h-4 w-4" />
            {running ? 'Ejecutando failover…' : 'Simular conmutación por error'}
          </button>

          <div className="scrollbar-thin mt-4 min-h-36 rounded-xl border border-border bg-[#0a192f] p-4 font-mono text-xs">
            {log.length === 0 ? (
              <span className="text-muted-foreground">$ esperando ejecución del runbook DR-01…</span>
            ) : (
              <ul className="flex flex-col gap-1.5">
                {log.map((l, i) => (
                  <li key={i} className="text-[color:var(--success)]">
                    <span className="text-muted-foreground">[{String(i + 1).padStart(2, '0')}]</span> {l}
                  </li>
                ))}
              </ul>
            )}
          </div>
        </Card>

        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-1">
          <Stat value="< 15 min" label="RTO objetivo" hint="Tiempo máximo tolerable de recuperación" />
          <Stat value="< 1 seg" label="RPO objetivo" hint="Pérdida máxima de datos admisible" />
          <Card className="sm:col-span-2 lg:col-span-1">
            <p className="font-mono text-[10px] uppercase tracking-wider text-primary">
              Prácticas de continuidad
            </p>
            <ul className="mt-3 flex flex-col gap-2 text-sm text-muted-foreground">
              <li>Pruebas de DR trimestrales con evidencia auditable</li>
              <li>Respaldos inmutables con retención de 35 días</li>
              <li>Runbooks versionados y automatizados con Ansible</li>
              <li>Comité de crisis con activación en menos de 10 minutos</li>
            </ul>
          </Card>
        </div>
      </div>
    </Section>
  )
}
