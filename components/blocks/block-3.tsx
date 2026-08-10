'use client'

import { useMemo, useState } from 'react'
import { Brain, Fingerprint, KeyRound, Lock, ScanFace, ShieldAlert } from 'lucide-react'
import { Badge, Bar, Card, Section } from '@/components/kit'
import { cn } from '@/lib/utils'

/* 14 — Zero Trust */
const CAPAS_ZT = [
  {
    id: 'edge',
    icon: ShieldAlert,
    t: 'Borde — AWS WAF + Shield Advanced',
    d: 'Reglas administradas OWASP Top 10, rate limiting por IP, bot control y mitigación de DDoS volumétrico hasta capa 7.',
    m: ['Bloqueo de 1.2 M req/mes maliciosas', 'Reglas geo-fencing', 'Protección L3/L4/L7'],
  },
  {
    id: 'identity',
    icon: ScanFace,
    t: 'Identidad — MFA FIDO2 + OIDC',
    d: 'Autenticación sin contraseña con llaves de seguridad y passkeys, verificación continua de contexto y acceso de mínimo privilegio.',
    m: ['Passkeys WebAuthn', 'Step-up por riesgo', 'Sesiones de 15 min'],
  },
  {
    id: 'network',
    icon: Lock,
    t: 'Red — Microsegmentación mTLS',
    d: 'Service mesh Istio con mTLS obligatorio entre microservicios, políticas de autorización por namespace y deny-by-default.',
    m: ['mTLS 100% este-oeste', 'Deny by default', 'Políticas por servicio'],
  },
  {
    id: 'data',
    icon: KeyRound,
    t: 'Datos — HSM Thales Luna + KMS',
    d: 'Llaves maestras custodiadas en HSM certificado FIPS 140-2 Nivel 3, rotación trimestral y tokenización de PAN.',
    m: ['FIPS 140-2 Nivel 3', 'AES-256 en reposo', 'Tokenización PCI DSS'],
  },
  {
    id: 'monitor',
    icon: Fingerprint,
    t: 'Monitoreo — SIEM + UEBA 24/7',
    d: 'Correlación de eventos en SIEM, analítica de comportamiento de usuarios y respuesta automatizada mediante playbooks SOAR.',
    m: ['MTTD < 5 min', 'MTTR < 30 min', 'SOC 24/7'],
  },
]

export function ZeroTrust() {
  const [active, setActive] = useState('identity')
  const c = CAPAS_ZT.find((x) => x.id === active)!
  const Icon = c.icon
  return (
    <Section
      id="zero-trust"
      n={14}
      eyebrow="Bloque 3"
      title="Ciberseguridad Zero Trust"
      description="Never trust, always verify. Cinco anillos de defensa en profundidad donde cada solicitud se autentica, autoriza y cifra."
    >
      <div className="grid gap-4 lg:grid-cols-[1fr_1fr]">
        <div className="flex flex-col gap-2">
          {CAPAS_ZT.map((x, i) => {
            const I = x.icon
            const on = active === x.id
            return (
              <button
                key={x.id}
                onClick={() => setActive(x.id)}
                style={{ marginLeft: `${i * 12}px` }}
                className={cn(
                  'flex items-center gap-3 rounded-xl border px-4 py-3 text-left transition-all duration-300',
                  on ? 'border-primary bg-primary/10 glow' : 'border-border bg-card hover:border-primary/50',
                )}
              >
                <I className={cn('h-4 w-4 shrink-0', on ? 'text-primary' : 'text-muted-foreground')} />
                <span className="text-sm font-medium">{x.t}</span>
              </button>
            )
          })}
        </div>
        <Card className="h-fit">
          <Icon className="h-6 w-6 text-primary" />
          <h3 className="mt-3 text-base font-semibold">{c.t}</h3>
          <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{c.d}</p>
          <div className="mt-5 flex flex-wrap gap-2 border-t border-border pt-4">
            {c.m.map((m) => (
              <Badge key={m} tone="muted">
                {m}
              </Badge>
            ))}
          </div>
        </Card>
      </div>
    </Section>
  )
}

/* 15 — Matriz de riesgos ISO 27005 */
type Riesgo = {
  id: string
  t: string
  p: 1 | 2 | 3
  i: 1 | 2 | 3
  cat: string
  mit: string
}
const RIESGOS: Riesgo[] = [
  { id: 'R-01', t: 'Spoofing de identidad', p: 2, i: 3, cat: 'STRIDE · Spoofing', mit: 'MFA FIDO2 obligatorio, verificación biométrica en operaciones sensibles y detección de dispositivos no confiables.' },
  { id: 'R-02', t: 'Ataque DDoS al canal digital', p: 3, i: 3, cat: 'STRIDE · DoS', mit: 'AWS Shield Advanced, WAF con rate limiting, autoescalado y CDN con absorción en el borde.' },
  { id: 'R-03', t: 'Inyección SQL en APIs', p: 2, i: 3, cat: 'OWASP A03', mit: 'Consultas parametrizadas, ORM con validación, WAF con reglas SQLi y pruebas SAST/DAST en cada release.' },
  { id: 'R-04', t: 'Fuga de datos por insider', p: 2, i: 2, cat: 'STRIDE · Info Disclosure', mit: 'DLP, acceso de mínimo privilegio, revisión trimestral de permisos y registro inmutable de accesos.' },
  { id: 'R-05', t: 'Ransomware en estaciones', p: 1, i: 3, cat: 'Malware', mit: 'EDR gestionado, segmentación, respaldos inmutables y simulacros de restauración semestrales.' },
  { id: 'R-06', t: 'Fallo de proveedor cloud (AZ)', p: 1, i: 2, cat: 'Continuidad', mit: 'Despliegue multi-AZ, réplicas Aurora y plan de failover con RTO menor a 15 minutos.' },
  { id: 'R-07', t: 'Error de configuración IaC', p: 3, i: 2, cat: 'Cloud misconfig', mit: 'Policy-as-code con OPA, escaneo de plantillas Terraform y aprobación obligatoria por PR.' },
  { id: 'R-08', t: 'Phishing a clientes', p: 3, i: 1, cat: 'Ingeniería social', mit: 'Passkeys sin contraseña, monitoreo de dominios similares y campañas de educación al cliente.' },
  { id: 'R-09', t: 'Dependencia vulnerable', p: 2, i: 1, cat: 'Supply chain', mit: 'SCA en el pipeline, SBOM firmado y parcheo con SLA de 72 horas para severidad crítica.' },
]
const LABEL = { 1: 'Baja', 2: 'Media', 3: 'Alta' } as const

function nivel(r: Riesgo) {
  const v = r.p * r.i
  if (v >= 6) return { t: 'Crítico', tone: 'danger' as const, bg: 'bg-destructive/20 border-destructive/50' }
  if (v >= 3) return { t: 'Moderado', tone: 'warning' as const, bg: 'bg-[color:var(--warning)]/15 border-[color:var(--warning)]/40' }
  return { t: 'Bajo', tone: 'success' as const, bg: 'bg-[color:var(--success)]/15 border-[color:var(--success)]/40' }
}

export function Riesgos() {
  const [sel, setSel] = useState<Riesgo | null>(RIESGOS[1])
  const grid = useMemo(() => {
    const cells: Record<string, Riesgo[]> = {}
    RIESGOS.forEach((r) => {
      const k = `${r.p}-${r.i}`
      cells[k] = [...(cells[k] ?? []), r]
    })
    return cells
  }, [])

  return (
    <Section
      id="riesgos"
      n={15}
      eyebrow="Bloque 3"
      title="Matriz de riesgos ISO 27005"
      description="Mapa de calor probabilidad × impacto con nueve riesgos identificados mediante modelado STRIDE. Selecciona un badge para ver su mitigación."
    >
      <div className="grid gap-4 lg:grid-cols-[1.2fr_1fr]">
        <Card>
          <div className="flex gap-3">
            <div className="flex w-6 items-center justify-center">
              <span className="rotate-180 font-mono text-[10px] uppercase tracking-[0.2em] text-muted-foreground [writing-mode:vertical-rl]">
                Probabilidad
              </span>
            </div>
            <div className="flex-1">
              <div className="grid grid-cols-3 gap-2">
                {([3, 2, 1] as const).map((p) =>
                  ([1, 2, 3] as const).map((i) => {
                    const items = grid[`${p}-${i}`] ?? []
                    const lvl = nivel({ p, i } as Riesgo)
                    return (
                      <div
                        key={`${p}-${i}`}
                        className={cn(
                          'flex min-h-24 flex-col gap-1.5 rounded-xl border p-2 transition-colors',
                          lvl.bg,
                        )}
                      >
                        <span className="font-mono text-[9px] uppercase tracking-wider text-muted-foreground">
                          {LABEL[p]}/{LABEL[i]}
                        </span>
                        {items.map((r) => (
                          <button
                            key={r.id}
                            onClick={() => setSel(r)}
                            className={cn(
                              'rounded-md border border-foreground/15 bg-[#0a192f]/60 px-1.5 py-1 font-mono text-[10px] transition-all hover:scale-105',
                              sel?.id === r.id && 'border-primary text-primary glow',
                            )}
                          >
                            {r.id}
                          </button>
                        ))}
                      </div>
                    )
                  }),
                )}
              </div>
              <div className="mt-2 grid grid-cols-3 gap-2 text-center">
                {(['Bajo', 'Medio', 'Alto'] as const).map((x) => (
                  <span key={x} className="font-mono text-[10px] uppercase tracking-wider text-muted-foreground">
                    {x}
                  </span>
                ))}
              </div>
              <p className="mt-1 text-center font-mono text-[10px] uppercase tracking-[0.2em] text-muted-foreground">
                Impacto
              </p>
            </div>
          </div>
          <div className="mt-5 flex flex-wrap gap-2 border-t border-border pt-4">
            <Badge tone="danger">Crítico ≥ 6</Badge>
            <Badge tone="warning">Moderado 3–4</Badge>
            <Badge tone="success">Bajo ≤ 2</Badge>
          </div>
        </Card>

        <Card className="h-fit">
          {sel ? (
            <>
              <div className="flex flex-wrap items-center gap-2">
                <Badge>{sel.id}</Badge>
                <Badge tone={nivel(sel).tone}>{nivel(sel).t}</Badge>
                <Badge tone="muted">{sel.cat}</Badge>
              </div>
              <h3 className="mt-4 text-base font-semibold">{sel.t}</h3>
              <div className="mt-4 grid grid-cols-2 gap-4">
                <div>
                  <p className="font-mono text-[10px] uppercase tracking-wider text-muted-foreground">
                    Probabilidad
                  </p>
                  <p className="mt-1 text-sm">{LABEL[sel.p]}</p>
                  <div className="mt-2">
                    <Bar value={sel.p} max={3} />
                  </div>
                </div>
                <div>
                  <p className="font-mono text-[10px] uppercase tracking-wider text-muted-foreground">
                    Impacto
                  </p>
                  <p className="mt-1 text-sm">{LABEL[sel.i]}</p>
                  <div className="mt-2">
                    <Bar value={sel.i} max={3} />
                  </div>
                </div>
              </div>
              <div className="mt-5 border-t border-border pt-4">
                <p className="font-mono text-[10px] uppercase tracking-wider text-primary">
                  Control de mitigación
                </p>
                <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{sel.mit}</p>
              </div>
            </>
          ) : null}
        </Card>
      </div>
    </Section>
  )
}

/* 16 — Gobierno de datos y ética */
const POLITICAS = [
  {
    id: 'gdpr',
    n: 'GDPR / Ley 81 de Protección de Datos',
    d: 'Tratamiento lícito con base legal documentada, minimización de datos y retención de 10 años para registros financieros regulados.',
    puntos: [
      'Derecho de acceso, rectificación y portabilidad en menos de 30 días',
      'Consentimiento granular y revocable desde la app',
      'Registro de actividades de tratamiento (ROPA) actualizado',
      'Evaluación de impacto (DPIA) para el modelo de scoring',
    ],
  },
  {
    id: 'xai',
    n: 'IA Ética y Explicable (XAI)',
    d: 'Todo modelo con impacto en clientes debe ser auditable, explicable y evaluado contra sesgos por grupo demográfico.',
    puntos: [
      'Explicaciones SHAP por cada decisión de crédito',
      'Prueba de equidad trimestral (disparate impact < 0.8 prohibido)',
      'Supervisión humana obligatoria en rechazos',
      'Versionado y trazabilidad del modelo en registry',
    ],
  },
  {
    id: 'licencia',
    n: 'Licenciamiento Apache 2.0',
    d: 'Componentes internos liberados bajo Apache 2.0 con cláusula de patentes; inventario SBOM de todas las dependencias de terceros.',
    puntos: [
      'Prohibido el uso de licencias copyleft fuertes (GPL/AGPL)',
      'SBOM firmado en cada release',
      'Revisión legal de licencias en el pipeline',
      'Atribución de terceros publicada',
    ],
  },
]

export function Gobierno() {
  const [sel, setSel] = useState('gdpr')
  const p = POLITICAS.find((x) => x.id === sel)!
  return (
    <Section
      id="gobierno"
      n={16}
      eyebrow="Bloque 3"
      title="Gobierno de datos y ética"
      description="Marco normativo que rige el uso de datos personales, algoritmos de decisión y propiedad intelectual del programa."
    >
      <div className="flex flex-wrap gap-2">
        {POLITICAS.map((x) => (
          <button
            key={x.id}
            onClick={() => setSel(x.id)}
            className={cn(
              'rounded-xl border px-4 py-2 text-sm font-medium transition-all',
              sel === x.id
                ? 'border-primary bg-primary/10 text-primary glow'
                : 'border-border bg-card text-muted-foreground hover:border-primary/50 hover:text-foreground',
            )}
          >
            {x.n}
          </button>
        ))}
      </div>
      <Card className="mt-4">
        <h3 className="text-base font-semibold">{p.n}</h3>
        <p className="mt-2 max-w-3xl text-sm leading-relaxed text-muted-foreground">{p.d}</p>
        <ul className="mt-5 grid gap-3 border-t border-border pt-4 md:grid-cols-2">
          {p.puntos.map((x) => (
            <li key={x} className="flex gap-2 text-sm leading-relaxed text-muted-foreground">
              <span className="mt-1 h-1.5 w-1.5 shrink-0 rounded-full bg-primary" />
              {x}
            </li>
          ))}
        </ul>
      </Card>
    </Section>
  )
}

/* 17 — Módulo de IA: scoring XGBoost simulado */
export function ScoringIA() {
  const [ingreso, setIngreso] = useState(2500)
  const [deuda, setDeuda] = useState(600)
  const [antiguedad, setAntiguedad] = useState(36)
  const [historial, setHistorial] = useState<'excelente' | 'bueno' | 'regular' | 'malo'>('bueno')
  const [edad, setEdad] = useState(34)
  const [result, setResult] = useState<null | {
    score: number
    riesgo: string
    tone: 'success' | 'warning' | 'danger'
    limite: number
    factores: { n: string; v: number }[]
  }>(null)
  const [loading, setLoading] = useState(false)

  const calcular = () => {
    setLoading(true)
    setTimeout(() => {
      const dti = deuda / Math.max(ingreso, 1)
      const hist = { excelente: 1, bueno: 0.72, regular: 0.42, malo: 0.12 }[historial]
      const fIngreso = Math.min(ingreso / 6000, 1)
      const fDti = Math.max(0, 1 - dti / 0.6)
      const fAnt = Math.min(antiguedad / 72, 1)
      const fEdad = edad >= 25 && edad <= 60 ? 1 : 0.7

      const norm = 0.3 * hist + 0.24 * fDti + 0.2 * fIngreso + 0.16 * fAnt + 0.1 * fEdad
      const score = Math.round(300 + norm * 550)
      const riesgo = score >= 720 ? 'Riesgo bajo — Aprobado' : score >= 600 ? 'Riesgo medio — Revisión' : 'Riesgo alto — Rechazado'
      const tone = score >= 720 ? 'success' : score >= 600 ? 'warning' : 'danger'
      const limite = Math.round((score >= 600 ? ingreso * (score / 300) * 0.6 : 0) / 50) * 50

      setResult({
        score,
        riesgo,
        tone: tone as 'success' | 'warning' | 'danger',
        limite,
        factores: [
          { n: 'Historial crediticio', v: Math.round(hist * 100) },
          { n: 'Relación deuda/ingreso', v: Math.round(fDti * 100) },
          { n: 'Nivel de ingreso', v: Math.round(fIngreso * 100) },
          { n: 'Antigüedad laboral', v: Math.round(fAnt * 100) },
          { n: 'Rango etario', v: Math.round(fEdad * 100) },
        ],
      })
      setLoading(false)
    }, 700)
  }

  const field =
    'w-full rounded-lg border border-input bg-[#16253f] px-3 py-2 text-sm text-foreground outline-none transition-colors focus:border-primary'

  return (
    <Section
      id="ia"
      n={17}
      eyebrow="Bloque 3"
      title="Módulo de inteligencia artificial — Scoring XGBoost"
      description="Simulador del motor de decisión crediticia. Los datos son ficticios y se procesan localmente en el navegador con fines demostrativos."
    >
      <div className="grid gap-4 lg:grid-cols-2">
        <Card>
          <div className="flex items-center gap-2">
            <Brain className="h-5 w-5 text-primary" />
            <p className="font-mono text-[10px] uppercase tracking-wider text-primary">
              Datos del solicitante
            </p>
          </div>
          <div className="mt-5 grid gap-4 sm:grid-cols-2">
            <label className="flex flex-col gap-1.5 text-sm">
              <span className="text-muted-foreground">Ingreso mensual (USD)</span>
              <input type="number" min={0} value={ingreso} onChange={(e) => setIngreso(+e.target.value)} className={field} />
            </label>
            <label className="flex flex-col gap-1.5 text-sm">
              <span className="text-muted-foreground">Deuda mensual (USD)</span>
              <input type="number" min={0} value={deuda} onChange={(e) => setDeuda(+e.target.value)} className={field} />
            </label>
            <label className="flex flex-col gap-1.5 text-sm">
              <span className="text-muted-foreground">Antigüedad laboral (meses)</span>
              <input type="number" min={0} value={antiguedad} onChange={(e) => setAntiguedad(+e.target.value)} className={field} />
            </label>
            <label className="flex flex-col gap-1.5 text-sm">
              <span className="text-muted-foreground">Edad</span>
              <input type="number" min={18} value={edad} onChange={(e) => setEdad(+e.target.value)} className={field} />
            </label>
            <label className="flex flex-col gap-1.5 text-sm sm:col-span-2">
              <span className="text-muted-foreground">Historial crediticio</span>
              <select value={historial} onChange={(e) => setHistorial(e.target.value as typeof historial)} className={field}>
                <option value="excelente">Excelente — sin atrasos</option>
                <option value="bueno">Bueno — atrasos menores</option>
                <option value="regular">Regular — atrasos recurrentes</option>
                <option value="malo">Malo — cartera castigada</option>
              </select>
            </label>
          </div>
          <button
            onClick={calcular}
            className="mt-6 w-full rounded-xl bg-primary py-3 text-sm font-semibold text-primary-foreground transition-all hover:glow disabled:opacity-60"
            disabled={loading}
          >
            {loading ? 'Ejecutando modelo XGBoost…' : 'Calcular scoring crediticio'}
          </button>
        </Card>

        <Card className="flex flex-col">
          <p className="font-mono text-[10px] uppercase tracking-wider text-primary">
            Resultado del modelo
          </p>
          {result ? (
            <div className="mt-5 flex flex-1 flex-col">
              <div className="flex items-end gap-3">
                <span className="font-mono text-5xl font-semibold text-primary glow-text">
                  {result.score}
                </span>
                <span className="pb-2 font-mono text-xs text-muted-foreground">/ 850</span>
              </div>
              <div className="mt-3">
                <Bar value={result.score - 300} max={550} />
              </div>
              <div className="mt-4 flex flex-wrap items-center gap-2">
                <Badge tone={result.tone}>{result.riesgo}</Badge>
                <Badge tone="muted">
                  Límite sugerido: ${result.limite.toLocaleString('en-US')}
                </Badge>
              </div>
              <p className="mt-5 font-mono text-[10px] uppercase tracking-wider text-primary">
                Explicabilidad (SHAP)
              </p>
              <ul className="mt-3 flex flex-col gap-3">
                {result.factores.map((f) => (
                  <li key={f.n}>
                    <div className="flex justify-between text-xs">
                      <span className="text-muted-foreground">{f.n}</span>
                      <span className="font-mono">{f.v}%</span>
                    </div>
                    <div className="mt-1.5">
                      <Bar value={f.v} />
                    </div>
                  </li>
                ))}
              </ul>
              <p className="mt-auto pt-5 text-xs leading-relaxed text-muted-foreground">
                Decisión sujeta a supervisión humana según la política de IA Ética. Latencia objetivo
                del modelo en producción: menor a 1 segundo.
              </p>
            </div>
          ) : (
            <div className="flex flex-1 flex-col items-center justify-center py-12 text-center">
              <Brain className="h-10 w-10 text-muted-foreground/50" />
              <p className="mt-4 max-w-xs text-sm leading-relaxed text-muted-foreground">
                Ingresa los datos del solicitante y ejecuta el modelo para obtener el score, la
                decisión y la explicación de los factores.
              </p>
            </div>
          )}
        </Card>
      </div>
    </Section>
  )
}
