import { SiteNav } from '@/components/site-nav'
import {
  Arquitectura,
  CasosUso,
  Conclusiones,
  DesignSystem,
  Diagnostico,
  DevSecOps,
  Drp,
  Gantt,
  Gobierno,
  Hero,
  MatrixDashboard,
  Objetivos,
  Organizacion,
  Presupuesto,
  Prototipo,
  Requerimientos,
  Riesgos,
  Roadmap,
  Roi,
  ScoringIA,
  Subnetting,
  Topologia,
  Usuarios,
  Video,
  ZeroTrust,
} from '@/components/blocks'

export default function HomePage() {
  return (
    <>
      <SiteNav />
      <main className="lg:pl-72">
        <div className="mx-auto max-w-6xl px-4 py-6 md:px-8">
          <Hero />
          <MatrixDashboard />
          <Diagnostico />
          <Objetivos />
          <Requerimientos />
          <Usuarios />
          <CasosUso />
          <Arquitectura />
          <Subnetting />
          <Topologia />
          <DevSecOps />
          <DesignSystem />
          <Prototipo />
          <ZeroTrust />
          <Riesgos />
          <Gobierno />
          <ScoringIA />
          <Organizacion />
          <Gantt />
          <Presupuesto />
          <Roi />
          <Drp />
          <Roadmap />
          <Video />
          <Conclusiones />
        </div>
      </main>
    </>
  )
}
