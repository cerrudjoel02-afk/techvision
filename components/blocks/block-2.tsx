'use client'

import { useMemo, useState } from 'react'
import {
  Check,
  Database,
  Globe,
  Layers,
  MonitorSmartphone,
  Radio,
  Route,
  Server,
  ShieldCheck,
  Wifi,
} from 'lucide-react'
import { Badge, Card, Section } from '@/components/kit'
import { cn } from '@/lib/utils'

/* 08 — Arquitectura Cloud-Native */
const CAPAS = [
  {
    id: 'frontend',
    icon: MonitorSmartphone,
    t: 'Capa de Presentación',
    tech: 'Next.js · React Native · CloudFront',
    d: 'Aplicación web SSR y app móvil híbrida distribuidas por CDN global con edge caching y WAF en el borde.',
    detail: ['Next.js 16 + TypeScript', 'React Native (iOS/Android)', 'Amazon CloudFront + S3', 'Design System compartido'],
  },
  {
    id: 'gateway',
    icon: Globe,
    t: 'API Gateway',
    tech: 'Kong Gateway',
    d: 'Punto único de entrada: enrutamiento, rate limiting, autenticación OAuth 2.0 / OIDC y observabilidad de tráfico norte-sur.',
    detail: ['Kong 3.x en modo DB-less', 'Rate limit 5000 rps', 'JWT + mTLS interno', 'Plugins de auditoría'],
  },
  {
    id: 'micro',
    icon: Server,
    t: 'Microservicios',
    tech: 'Spring Boot · Amazon EKS',
    d: '18 microservicios de dominio (cuentas, pagos, KYC, crédito, notificaciones) desplegados en Kubernetes con autoescalado HPA.',
    detail: ['Spring Boot 3 / Java 21', 'Amazon EKS multi-AZ', 'HPA + Karpenter', 'Istio service mesh'],
  },
  {
    id: 'eventos',
    icon: Radio,
    t: 'Capa de Eventos',
    tech: 'Apache Kafka (MSK)',
    d: 'Backbone asíncrono con event sourcing y patrón SAGA para consistencia distribuida entre dominios transaccionales.',
    detail: ['Amazon MSK 3 brokers', 'Event sourcing + CQRS', 'SAGA orquestada', 'Retención 7 días'],
  },
  {
    id: 'datos',
    icon: Database,
    t: 'Capa de Datos',
    tech: 'Amazon Aurora PostgreSQL',
    d: 'Clúster Aurora multi-AZ con réplicas de lectura, cifrado AES-256 y respaldos PITR de 35 días.',
    detail: ['Aurora PostgreSQL 16', '1 writer + 2 readers', 'PITR 35 días', 'KMS + HSM'],
  },
]

export function Arquitectura() {
  const [active, setActive] = useState('gateway')
  const capa = CAPAS.find((c) => c.id === active)!
  return (
    <Section
      id="arquitectura"
      n={8}
      eyebrow="Bloque 2"
      title="Arquitectura cloud-native"
      description="Modelo de cinco capas desacopladas sobre AWS. Selecciona una capa para inspeccionar su stack tecnológico."
    >
      <div className="grid gap-4 lg:grid-cols-[1.4fr_1fr]">
        <div className="flex flex-col gap-3">
          {CAPAS.map((c) => {
            const Icon = c.icon
            const isActive = active === c.id
            return (
              <button key={c.id} onClick={() => setActive(c.id)} className="text-left">
                <div
                  className={cn(
                    'flex items-center gap-4 rounded-xl border p-4 transition-all duration-300',
                    isActive
                      ? 'border-primary bg-primary/10 glow'
                      : 'border-border bg-card hover:border-primary/50',
                  )}
                >
                  <Icon className={cn('h-5 w-5 shrink-0', isActive ? 'text-primary' : 'text-muted-foreground')} />
                  <div className="min-w-0 flex-1">
                    <p className="text-sm font-semibold">{c.t}</p>
                    <p className="truncate font-mono text-xs text-muted-foreground">{c.tech}</p>
                  </div>
                  <Layers className={cn('h-4 w-4', isActive ? 'text-primary' : 'text-transparent')} />
                </div>
              </button>
            )
          })}
        </div>
        <Card className="h-fit lg:sticky lg:top-24">
          <Badge>{capa.tech}</Badge>
          <h3 className="mt-3 text-lg font-semibold">{capa.t}</h3>
          <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{capa.d}</p>
          <ul className="mt-5 flex flex-col gap-2 border-t border-border pt-4">
            {capa.detail.map((d) => (
              <li key={d} className="flex items-center gap-2 text-sm text-muted-foreground">
                <Check className="h-4 w-4 text-primary" /> {d}
              </li>
            ))}
          </ul>
        </Card>
      </div>
    </Section>
  )
}

/* 09 — Subnetting e IPAM */
type Subnet = {
  zona: string
  tipo: string
  cidr: string
  mask: string
  rango: string
  gw: string
  hosts: number
  vlan: string
}
const SUBNETS: Subnet[] = [
  { zona: 'DMZ', tipo: 'Perímetro', cidr: '10.150.0.0/23', mask: '255.255.254.0', rango: '10.150.0.1 – 10.150.1.254', gw: '10.150.0.1', hosts: 510, vlan: 'VLAN 10' },
  { zona: 'App Subnet A', tipo: 'Aplicación', cidr: '10.150.4.0/22', mask: '255.255.252.0', rango: '10.150.4.1 – 10.150.7.254', gw: '10.150.4.1', hosts: 1022, vlan: 'VLAN 20' },
  { zona: 'App Subnet B', tipo: 'Aplicación', cidr: '10.150.8.0/22', mask: '255.255.252.0', rango: '10.150.8.1 – 10.150.11.254', gw: '10.150.8.1', hosts: 1022, vlan: 'VLAN 21' },
  { zona: 'DB Subnet', tipo: 'Datos', cidr: '10.150.16.0/24', mask: '255.255.255.0', rango: '10.150.16.1 – 10.150.16.254', gw: '10.150.16.1', hosts: 254, vlan: 'VLAN 30' },
  { zona: 'Servicios internos', tipo: 'Aplicación', cidr: '10.150.17.0/24', mask: '255.255.255.0', rango: '10.150.17.1 – 10.150.17.254', gw: '10.150.17.1', hosts: 254, vlan: 'VLAN 31' },
  { zona: 'VPN Corporativa', tipo: 'Acceso remoto', cidr: '10.150.32.0/25', mask: '255.255.255.128', rango: '10.150.32.1 – 10.150.32.126', gw: '10.150.32.1', hosts: 126, vlan: 'VLAN 40' },
  { zona: 'Gestión / OOB', tipo: 'Perímetro', cidr: '10.150.33.0/26', mask: '255.255.255.192', rango: '10.150.33.1 – 10.150.33.62', gw: '10.150.33.1', hosts: 62, vlan: 'VLAN 41' },
  { zona: 'Enlaces P2P (BGP)', tipo: 'Acceso remoto', cidr: '10.150.33.64/30', mask: '255.255.255.252', rango: '10.150.33.65 – 10.150.33.66', gw: '10.150.33.65', hosts: 2, vlan: '—' },
]
const TIPOS = ['Todos', 'Perímetro', 'Aplicación', 'Datos', 'Acceso remoto']

export function Subnetting() {
  const [tipo, setTipo] = useState('Todos')
  const [q, setQ] = useState('')
  const rows = useMemo(
    () =>
      SUBNETS.filter((s) => (tipo === 'Todos' || s.tipo === tipo) && (s.zona + s.cidr).toLowerCase().includes(q.toLowerCase())),
    [tipo, q],
  )
  const totalHosts = rows.reduce((a, b) => a + b.hosts, 0)

  return (
    <Section
      id="subnetting"
      n={9}
      eyebrow="Bloque 2"
      title="Subnetting e IPAM — VLSM 10.150.0.0/16"
      description="Direccionamiento de longitud variable diseñado para segmentar el tráfico por zona de confianza y facilitar el microsegmentado Zero Trust."
    >
      <div className="mb-4 flex flex-wrap items-center gap-3">
        <div className="flex flex-wrap gap-2">
          {TIPOS.map((t) => (
            <button
              key={t}
              onClick={() => setTipo(t)}
              className={cn(
                'rounded-full border px-3 py-1.5 text-xs font-medium transition-all',
                tipo === t
                  ? 'border-primary bg-primary text-primary-foreground'
                  : 'border-border bg-card text-muted-foreground hover:border-primary/60 hover:text-foreground',
              )}
            >
              {t}
            </button>
          ))}
        </div>
        <input
          value={q}
          onChange={(e) => setQ(e.target.value)}
          placeholder="Buscar zona o CIDR…"
          aria-label="Buscar subred"
          className="ml-auto w-full rounded-lg border border-input bg-card px-3 py-2 font-mono text-xs text-foreground outline-none transition-colors placeholder:text-muted-foreground focus:border-primary sm:w-64"
        />
      </div>

      <Card className="overflow-hidden p-0">
        <div className="scrollbar-thin overflow-x-auto">
          <table className="w-full min-w-[860px] text-left text-sm">
            <thead>
              <tr className="border-b border-border bg-[#16253f]">
                {['Zona', 'VLAN', 'CIDR', 'Máscara', 'Rango utilizable', 'Gateway', 'Hosts'].map((h) => (
                  <th
                    key={h}
                    className="px-4 py-3 font-mono text-[10px] uppercase tracking-wider text-primary"
                  >
                    {h}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {rows.map((s) => (
                <tr
                  key={s.cidr}
                  className="border-b border-border/60 transition-colors last:border-0 hover:bg-primary/5"
                >
                  <td className="px-4 py-3 font-medium">{s.zona}</td>
                  <td className="px-4 py-3 font-mono text-xs text-muted-foreground">{s.vlan}</td>
                  <td className="px-4 py-3 font-mono text-xs text-primary">{s.cidr}</td>
                  <td className="px-4 py-3 font-mono text-xs text-muted-foreground">{s.mask}</td>
                  <td className="px-4 py-3 font-mono text-xs text-muted-foreground">{s.rango}</td>
                  <td className="px-4 py-3 font-mono text-xs text-muted-foreground">{s.gw}</td>
                  <td className="px-4 py-3 font-mono text-xs">{s.hosts.toLocaleString('es-PA')}</td>
                </tr>
              ))}
              {rows.length === 0 ? (
                <tr>
                  <td colSpan={7} className="px-4 py-8 text-center text-sm text-muted-foreground">
                    Sin resultados para el filtro aplicado.
                  </td>
                </tr>
              ) : null}
            </tbody>
          </table>
        </div>
        <div className="flex flex-wrap items-center justify-between gap-3 border-t border-border bg-[#16253f] px-4 py-3">
          <span className="font-mono text-xs text-muted-foreground">
            {rows.length} subredes · {totalHosts.toLocaleString('es-PA')} hosts utilizables
          </span>
          <Badge tone="muted">Supernet 10.150.0.0/16 · 65,534 direcciones</Badge>
        </div>
      </Card>
    </Section>
  )
}

/* 10 — Topología de Red */
const HOTSPOTS = [
  {
    id: 'fw',
    layer: 'Capa 1 — Perímetro',
    t: 'Fortinet FortiGate 600F (HA activo/pasivo)',
    d: 'Inspección profunda de paquetes, IPS, filtrado de aplicaciones y terminación de túneles IPsec hacia sucursales. Publica únicamente la DMZ.',
    icon: ShieldCheck,
  },
  {
    id: 'core',
    layer: 'Capa 2 — Núcleo/Distribución',
    t: 'Cisco Catalyst 9500 (stack redundante)',
    d: 'Conmutación L3 a 40 Gbps, enrutamiento inter-VLAN, HSRP para gateway redundante y QoS priorizando tráfico transaccional.',
    icon: Route,
  },
  {
    id: 'bgp',
    layer: 'Capa 1 — WAN',
    t: 'BGP multihoming (dos ISP) + AWS Direct Connect',
    d: 'Anuncio del bloque público con AS propio, balanceo por AS-path prepending y failover automático menor a 30 segundos.',
    icon: Globe,
  },
  {
    id: 'access',
    layer: 'Capa 3 — Acceso',
    t: 'Cisco Catalyst 9200 + APs Wi-Fi 6E',
    d: 'Puertos de acceso con 802.1X, port-security, VLAN dinámica por perfil de usuario y PoE+ para telefonía IP.',
    icon: Wifi,
  },
]

export function Topologia() {
  const [active, setActive] = useState('fw')
  const spot = HOTSPOTS.find((h) => h.id === active)!
  const Icon = spot.icon
  return (
    <Section
      id="topologia"
      n={10}
      eyebrow="Bloque 2"
      title="Topología de red jerárquica de 3 capas"
      description="Modelo núcleo–distribución–acceso con redundancia total. Haz clic sobre un componente del diagrama para ver su especificación."
    >
      <div className="grid gap-4 lg:grid-cols-[1.3fr_1fr]">
        <Card className="grid-bg relative p-6">
          <div className="flex flex-col gap-4">
            {[
              { label: 'INTERNET / ISP-A · ISP-B', id: 'bgp', sub: 'BGP AS 64512 · Direct Connect' },
              { label: 'PERÍMETRO · FortiGate 600F HA', id: 'fw', sub: 'DMZ 10.150.0.0/23' },
              { label: 'NÚCLEO · Catalyst 9500', id: 'core', sub: 'Inter-VLAN · HSRP · 40 Gbps' },
              { label: 'ACCESO · Catalyst 9200 + Wi-Fi 6E', id: 'access', sub: '802.1X · VLAN dinámica' },
            ].map((n, i, arr) => (
              <div key={n.id}>
                <button
                  onClick={() => setActive(n.id)}
                  className={cn(
                    'w-full rounded-xl border px-5 py-4 text-left transition-all duration-300',
                    active === n.id
                      ? 'border-primary bg-primary/15 glow'
                      : 'border-border bg-[#16253f] hover:border-primary/60',
                  )}
                >
                  <p className="font-mono text-xs tracking-wide text-primary">{n.label}</p>
                  <p className="mt-1 text-xs text-muted-foreground">{n.sub}</p>
                </button>
                {i < arr.length - 1 ? (
                  <div className="mx-auto h-6 w-px bg-gradient-to-b from-primary/70 to-primary/10" />
                ) : null}
              </div>
            ))}
            <div className="grid grid-cols-3 gap-3 border-t border-border pt-4">
              {['App Subnet VLAN 20/21', 'DB Subnet VLAN 30', 'VPN VLAN 40'].map((z) => (
                <div
                  key={z}
                  className="rounded-lg border border-border bg-card px-3 py-3 text-center font-mono text-[10px] leading-tight text-muted-foreground"
                >
                  {z}
                </div>
              ))}
            </div>
          </div>
        </Card>

        <Card className="h-fit lg:sticky lg:top-24">
          <Badge>{spot.layer}</Badge>
          <Icon className="mt-4 h-6 w-6 text-primary" />
          <h3 className="mt-3 text-base font-semibold leading-snug">{spot.t}</h3>
          <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{spot.d}</p>
          <div className="mt-5 flex flex-wrap gap-2 border-t border-border pt-4">
            {HOTSPOTS.map((h) => (
              <button
                key={h.id}
                onClick={() => setActive(h.id)}
                className={cn(
                  'rounded-full border px-3 py-1 font-mono text-[10px] uppercase tracking-wider transition-colors',
                  active === h.id
                    ? 'border-primary bg-primary/15 text-primary'
                    : 'border-input text-muted-foreground hover:text-foreground',
                )}
              >
                {h.id}
              </button>
            ))}
          </div>
        </Card>
      </div>
    </Section>
  )
}

/* 11 — Ecosistema DevSecOps */
const TOOLS = [
  { n: 'GitHub', c: 'Código y CI/CD', d: 'Repositorios con branch protection, GitHub Actions para build/test/deploy y CodeQL para SAST en cada pull request.' },
  { n: 'Jira', c: 'Gestión ágil', d: 'Backlog, sprints de 2 semanas, épicas por dominio y trazabilidad requerimiento → commit → release.' },
  { n: 'Slack', c: 'Comunicación', d: 'Canales por squad, alertas de pipeline y notificaciones de incidentes desde PagerDuty.' },
  { n: 'Microsoft Teams', c: 'Comité y stakeholders', d: 'Reuniones de steering committee, demos quincenales y repositorio documental SharePoint.' },
  { n: 'SonarQube', c: 'Calidad de código', d: 'Quality gate con cobertura mínima 80% y cero vulnerabilidades bloqueantes.' },
  { n: 'Terraform', c: 'IaC', d: 'Infraestructura versionada, planes revisados por PR y estado remoto cifrado en S3 con bloqueo DynamoDB.' },
  { n: 'ArgoCD', c: 'GitOps', d: 'Sincronización declarativa hacia EKS con despliegues canary y rollback automático.' },
  { n: 'Grafana + Prometheus', c: 'Observabilidad', d: 'Métricas, trazas OpenTelemetry y SLOs con error budget por microservicio.' },
]

export function DevSecOps() {
  const [hover, setHover] = useState<string | null>(null)
  return (
    <Section
      id="devsecops"
      n={11}
      eyebrow="Bloque 2"
      title="Ecosistema DevSecOps y colaboración"
      description="Cadena de herramientas integrada que traslada la seguridad al inicio del ciclo (shift-left). Pasa el cursor o toca una tarjeta para ver su rol."
    >
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {TOOLS.map((t) => (
          <div
            key={t.n}
            onMouseEnter={() => setHover(t.n)}
            onMouseLeave={() => setHover(null)}
            onClick={() => setHover(hover === t.n ? null : t.n)}
            className="relative"
          >
            <Card interactive className="h-full cursor-pointer">
              <p className="text-sm font-semibold">{t.n}</p>
              <p className="mt-1 font-mono text-[10px] uppercase tracking-wider text-primary">{t.c}</p>
              <p
                className={cn(
                  'mt-3 text-sm leading-relaxed text-muted-foreground transition-opacity duration-300',
                  hover === t.n ? 'opacity-100' : 'opacity-60',
                )}
              >
                {t.d}
              </p>
            </Card>
          </div>
        ))}
      </div>
    </Section>
  )
}

/* 12 — Sistema de Diseño */
const SWATCHES = [
  { n: 'Deep Navy', hex: '#0A192F', use: 'Fondo principal' },
  { n: 'Slate Surface', hex: '#1E293B', use: 'Tarjetas y superficies' },
  { n: 'Neon Cyan', hex: '#00E5FF', use: 'Acento e interacción' },
  { n: 'Pure White', hex: '#FFFFFF', use: 'Texto primario' },
  { n: 'Cool Gray', hex: '#94A3B8', use: 'Texto secundario' },
]

export function DesignSystem() {
  const [state, setState] = useState<'default' | 'hover' | 'focus' | 'disabled'>('default')
  return (
    <Section
      id="design-system"
      n={12}
      eyebrow="Bloque 2"
      title="Sistema de diseño UX/UI"
      description="Tokens, tipografía y componentes verificados contra WCAG 2.1 nivel AA."
    >
      <div className="grid gap-4 lg:grid-cols-3">
        <Card className="lg:col-span-2">
          <p className="font-mono text-[10px] uppercase tracking-wider text-primary">Paleta</p>
          <div className="mt-4 grid gap-3 sm:grid-cols-5">
            {SWATCHES.map((s) => (
              <div key={s.hex} className="group">
                <div
                  className="h-16 rounded-xl border border-border transition-transform group-hover:scale-105"
                  style={{ background: s.hex }}
                />
                <p className="mt-2 text-xs font-medium">{s.n}</p>
                <p className="font-mono text-[10px] text-muted-foreground">{s.hex}</p>
                <p className="text-[10px] text-muted-foreground">{s.use}</p>
              </div>
            ))}
          </div>

          <div className="mt-8 border-t border-border pt-6">
            <p className="font-mono text-[10px] uppercase tracking-wider text-primary">
              Contraste WCAG 2.1 AA
            </p>
            <ul className="mt-3 flex flex-col gap-2">
              {[
                { p: 'Blanco #FFFFFF sobre #0A192F', r: '16.1:1', ok: true },
                { p: 'Gris #94A3B8 sobre #0A192F', r: '7.4:1', ok: true },
                { p: 'Cian #00E5FF sobre #0A192F', r: '10.9:1', ok: true },
                { p: 'Blanco #FFFFFF sobre #1E293B', r: '13.2:1', ok: true },
              ].map((c) => (
                <li
                  key={c.p}
                  className="flex flex-wrap items-center justify-between gap-2 rounded-lg border border-border bg-[#16253f] px-3 py-2"
                >
                  <span className="text-sm text-muted-foreground">{c.p}</span>
                  <span className="flex items-center gap-2">
                    <span className="font-mono text-xs text-foreground">{c.r}</span>
                    <Badge tone="success">
                      <Check className="h-3 w-3" /> AA
                    </Badge>
                  </span>
                </li>
              ))}
            </ul>
          </div>
        </Card>

        <Card>
          <p className="font-mono text-[10px] uppercase tracking-wider text-primary">
            Estados de botón
          </p>
          <div className="mt-4 flex flex-wrap gap-2">
            {(['default', 'hover', 'focus', 'disabled'] as const).map((s) => (
              <button
                key={s}
                onClick={() => setState(s)}
                className={cn(
                  'rounded-lg border px-3 py-1.5 font-mono text-[10px] uppercase tracking-wider transition-colors',
                  state === s
                    ? 'border-primary bg-primary/15 text-primary'
                    : 'border-input text-muted-foreground hover:text-foreground',
                )}
              >
                {s}
              </button>
            ))}
          </div>
          <div className="mt-6 flex min-h-32 items-center justify-center rounded-xl border border-dashed border-input bg-[#16253f]">
            <span
              className={cn(
                'rounded-xl px-6 py-3 text-sm font-semibold transition-all',
                state === 'default' && 'bg-primary text-primary-foreground',
                state === 'hover' && 'bg-primary text-primary-foreground glow scale-105',
                state === 'focus' &&
                  'bg-primary text-primary-foreground ring-2 ring-primary ring-offset-2 ring-offset-[#16253f]',
                state === 'disabled' && 'bg-muted text-muted-foreground opacity-50',
              )}
            >
              Transferir fondos
            </span>
          </div>
          <ul className="mt-6 flex flex-col gap-2 border-t border-border pt-4 text-sm text-muted-foreground">
            <li className="flex gap-2"><Check className="h-4 w-4 text-primary" /> Área táctil mínima 44×44 px</li>
            <li className="flex gap-2"><Check className="h-4 w-4 text-primary" /> Foco visible en todos los controles</li>
            <li className="flex gap-2"><Check className="h-4 w-4 text-primary" /> Tipografía base 16 px, interlineado 1.5</li>
          </ul>
        </Card>
      </div>
    </Section>
  )
}

/* 13 — Prototipo */
const PROTO_STEPS = [
  { t: 'Bienvenida', d: 'Ingresa tu correo y número celular para comenzar.', cta: 'Comenzar registro' },
  { t: 'Documento de identidad', d: 'Captura el anverso y reverso de tu cédula. El OCR valida los datos.', cta: 'Escanear documento' },
  { t: 'Prueba de vida', d: 'Gira lentamente el rostro dentro del marco para validar tu identidad.', cta: 'Verificar biometría' },
  { t: 'Validación regulatoria', d: 'Consultando listas OFAC/PEP y buró de crédito…', cta: 'Continuar' },
  { t: 'Cuenta activa', d: 'Tu cuenta NovaBank está lista y tu tarjeta virtual fue emitida.', cta: 'Ir al inicio' },
]

export function Prototipo() {
  const [step, setStep] = useState(0)
  const s = PROTO_STEPS[step]
  return (
    <Section
      id="prototipo"
      n={13}
      eyebrow="Bloque 2"
      title="Contenedor de prototipo web"
      description="Simulador del flujo de onboarding en un marco de dispositivo móvil. Avanza por los cinco pasos del recorrido KYC."
    >
      <div className="grid gap-6 lg:grid-cols-[auto_1fr] lg:items-start">
        <div className="mx-auto w-full max-w-[320px]">
          <div className="rounded-[2.2rem] border-4 border-[#243b5e] bg-[#0d1e38] p-3 glow">
            <div className="mx-auto mb-3 h-1.5 w-16 rounded-full bg-[#243b5e]" />
            <div className="flex min-h-[460px] flex-col rounded-2xl border border-border bg-card p-5">
              <div className="flex items-center justify-between">
                <span className="font-mono text-[10px] uppercase tracking-[0.2em] text-primary">
                  NovaBank
                </span>
                <span className="font-mono text-[10px] text-muted-foreground">
                  {step + 1}/{PROTO_STEPS.length}
                </span>
              </div>
              <div className="mt-3 flex gap-1">
                {PROTO_STEPS.map((_, i) => (
                  <span
                    key={i}
                    className={cn(
                      'h-1 flex-1 rounded-full transition-colors',
                      i <= step ? 'bg-primary' : 'bg-muted',
                    )}
                  />
                ))}
              </div>

              <div className="mt-8 flex flex-1 flex-col">
                <div
                  className={cn(
                    'flex h-32 items-center justify-center rounded-xl border border-dashed border-primary/40 bg-primary/5 font-mono text-xs text-primary',
                    step === 4 && 'border-solid border-[color:var(--success)]/50 bg-[color:var(--success)]/10 text-[color:var(--success)]',
                  )}
                >
                  {['@', 'ID', '☺', '⟳', '✓'][step]}
                </div>
                <h3 className="mt-6 text-lg font-semibold">{s.t}</h3>
                <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{s.d}</p>
              </div>

              <button
                onClick={() => setStep((step + 1) % PROTO_STEPS.length)}
                className="mt-6 w-full rounded-xl bg-primary py-3 text-sm font-semibold text-primary-foreground transition-all hover:glow"
              >
                {s.cta}
              </button>
            </div>
          </div>
        </div>

        <Card>
          <p className="font-mono text-[10px] uppercase tracking-wider text-primary">
            Notas del prototipo
          </p>
          <ul className="mt-4 flex flex-col gap-3 text-sm leading-relaxed text-muted-foreground">
            <li>
              <span className="text-foreground">Tiempo objetivo:</span> el recorrido completo debe
              resolverse en menos de 3 minutos, con reintentos de captura sin perder el progreso.
            </li>
            <li>
              <span className="text-foreground">Estados de error:</span> documento ilegible, rostro
              no coincidente y coincidencia en lista restrictiva derivan a revisión manual.
            </li>
            <li>
              <span className="text-foreground">Accesibilidad:</span> instrucciones por voz,
              contraste AA y controles operables con una sola mano.
            </li>
            <li>
              <span className="text-foreground">Métrica:</span> tasa de finalización objetivo ≥ 88%
              medida con analítica de embudo por paso.
            </li>
          </ul>
          <div className="mt-6 flex flex-wrap gap-2 border-t border-border pt-4">
            {PROTO_STEPS.map((p, i) => (
              <button
                key={p.t}
                onClick={() => setStep(i)}
                className={cn(
                  'rounded-full border px-3 py-1 text-xs transition-colors',
                  step === i
                    ? 'border-primary bg-primary/15 text-primary'
                    : 'border-input text-muted-foreground hover:text-foreground',
                )}
              >
                {p.t}
              </button>
            ))}
          </div>
        </Card>
      </div>
    </Section>
  )
}
