// ============================================================
// Site Content Configuration — 텍스트/데이터 관리
// ============================================================
// 사이트에 표시되는 모든 텍스트를 여기서 수정할 수 있습니다.
// ============================================================

export const SITE_CONFIG = {
  // 브랜드
  brandName: 'Connect AI LAB',
  copyright: '© 2026 AI CITY BUILDERS. All rights reserved.',

  // 히어로 섹션
  hero: {
    titleLeft: ['Brain', 'And Body'],
    titleRight: ['One', 'Network'],
    watermark: 'TRANSCENDENCE',
    description:
      'Built at the intersection of neuroscience and artificial intelligence. Connect AI LAB continuously maps neural pathways, cognitive load, and physiological states into a single adaptive intelligence layer.',
  },

  // 시네마틱 텍스트 섹션
  cinematic: {
    text: 'A neural-AI interface built on the architecture of the human nervous system. Connect AI LAB translates synaptic activity into computational intelligence. Every signal becomes measurable, structured, and visible. It continuously reconstructs internal state as a dynamic neural map. Biological noise is filtered into actionable cognitive patterns.',
  },

  // 성능 지표 섹션
  metrics: {
    subtitle: 'Performance Metrics',
    items: [
      { value: '2.4ms', label: 'Synaptic Latency' },
      { value: '99.7%', label: 'Signal Accuracy' },
      { value: '140B', label: 'Neural Parameters' },
    ],
  },

  // 기술 섹션
  technology: {
    title: ['Adaptive', 'Intelligence'],
    description:
      'The system learns your neural baseline within 72 hours. From there, every cognitive state is mapped, predicted, and optimized in real time.',
    features: [
      {
        title: 'Cortical Mapping',
        desc: 'Real-time spatial reconstruction of active neural regions.',
      },
      {
        title: 'Signal Isolation',
        desc: 'Separates cognitive intent from biological noise.',
      },
      {
        title: 'State Prediction',
        desc: 'Anticipates cognitive transitions before they occur.',
      },
      {
        title: 'Loop Feedback',
        desc: 'Closed-loop adjustment based on outcome correlation.',
      },
    ],
  },

  // 아키텍처 섹션
  architecture: {
    subtitle: 'Architecture',
    heading: 'Three layers. Zero friction.',
    description:
      'Sensor layer captures raw bioelectric signals. Processing layer isolates intent. Interface layer delivers structured output to any connected system.',
    layers: [
      { num: 1, name: 'Capture' },
      { num: 2, name: 'Process' },
      { num: 3, name: 'Interface' },
    ],
  },

  // 푸터
  footer: {
    tagline:
      'The next evolution of human-machine interaction. Built for those who refuse to be limited by biology alone.',
  },

  // 네비게이션
  nav: {
    links: [
      { label: 'About', scrollMultiplier: 1 },
      { label: 'Metrics', scrollMultiplier: 2 },
    ],
    downloadLabel: 'Download',
  },
};
