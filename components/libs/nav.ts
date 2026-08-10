export type NavSection = { id: string; n: number; label: string }
export type NavBlock = {
  id: string
  title: string
  short: string
  icon: string
  sections: NavSection[]
}

export const BLOCKS: NavBlock[] = [
  {
    id: 'bloque-1',
    title: 'Diagnóstico y Requerimientos',
    short: 'Diagnóstico',
    icon: 'stethoscope',
    sections: [
      { id: 'portada', n: 1, label: 'Portada' },
      { id: 'matriz', n: 2, label: 'Dashboard Matriz' },
      { id: 'diagnostico', n: 3, label: 'Diagnóstico Empresarial' },
      { id: 'objetivos', n: 4, label: 'Objetivos y KPIs' },
      { id: 'requerimientos', n: 5, label: 'Requerimientos' },
      { id: 'usuarios', n: 6, label: 'Análisis de Usuarios' },
      { id: 'casos-uso', n: 7, label: 'Casos de Uso' },
    ],
  },
  {
    id: 'bloque-2',
    title: 'Arquitectura, Redes y Prototipo',
    short: 'Arquitectura',
    icon: 'network',
    sections: [
      { id: 'arquitectura', n: 8, label: 'Arquitectura Cloud-Native' },
      { id: 'subnetting', n: 9, label: 'Subnetting e IPAM' },
      { id: 'topologia', n: 10, label: 'Topología de Red' },
      { id: 'devsecops', n: 11, label: 'Ecosistema DevSecOps' },
      { id: 'design-system', n: 12, label: 'Sistema de Diseño UX/UI' },
      { id: 'prototipo', n: 13, label: 'Prototipo Web' },
    ],
  },
  {
    id: 'bloque-3',
    title: 'Ciberseguridad, Ética y Gobierno',
    short: 'Seguridad',
    icon: 'shield',
    sections: [
      { id: 'zero-trust', n: 14, label: 'Zero Trust' },
      { id: 'riesgos', n: 15, label: 'Matriz ISO 27005' },
      { id: 'gobierno', n: 16, label: 'Gobierno y Ética' },
      { id: 'ia', n: 17, label: 'Módulo de IA' },
    ],
  },
  {
    id: 'bloque-4',
    title: 'Gestión de Proyecto y Finanzas',
    short: 'Gestión',
    icon: 'briefcase',
    sections: [
      { id: 'organizacion', n: 18, label: 'Organigrama y RACI' },
      { id: 'cronograma', n: 19, label: 'Cronograma Gantt' },
      { id: 'presupuesto', n: 20, label: 'Presupuesto CAPEX/OPEX' },
      { id: 'roi', n: 21, label: 'Calculadora de ROI' },
      { id: 'drp', n: 22, label: 'Continuidad DRP/BCP' },
    ],
  },
  {
    id: 'bloque-5',
    title: 'Roadmap, Video y QR',
    short: 'Roadmap',
    icon: 'rocket',
    sections: [
      { id: 'roadmap', n: 23, label: 'Roadmap Tecnológico' },
      { id: 'video', n: 24, label: 'Video Promocional' },
      { id: 'conclusiones', n: 25, label: 'Conclusiones y QR' },
    ],
  },
]

export const ALL_SECTIONS = BLOCKS.flatMap((b) =>
  b.sections.map((s) => ({ ...s, block: b.id, blockTitle: b.title })),
)

export const CONSULTORES = ['Jorvan Camargo', 'Elkin Carrasco', 'Joel Cerrud', 'Yorlenis Gaitán']
