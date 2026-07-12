import { useState, useEffect, useRef } from 'react';
import {
  motion,
  useScroll,
  useTransform,
  useSpring,
  useMotionTemplate,
  AnimatePresence,
} from 'framer-motion';
import { Navbar } from './components/Navbar';
import { ScrambleIn } from './components/ScrambleText';
import { ConnectAILabLogo } from './components/ConnectAILabLogo';
import { SITE_CONFIG } from './config/content';

export default function App() {
  const [entranceComplete, setEntranceComplete] = useState(false);

  /* ── Beta Modal & Code States ── */
  const [betaModalOpen, setBetaModalOpen] = useState(false);
  const [inviteCode, setInviteCode] = useState('');
  const [betaStatus, setBetaStatus] = useState<'idle' | 'success' | 'error'>('idle');

  const handleBetaSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (inviteCode.trim().toUpperCase() === 'BETA2026') {
      setBetaStatus('success');
    } else {
      setBetaStatus('error');
    }
  };

  const resetBetaModal = () => {
    setBetaModalOpen(false);
    setInviteCode('');
    setBetaStatus('idle');
  };

  /* ── Auto Redirect on Successful Beta code ── */
  useEffect(() => {
    if (betaStatus === 'success') {
      const timer = setTimeout(() => {
        window.location.href = "https://store-doctor-lilac.vercel.app";
      }, 2000);
      return () => clearTimeout(timer);
    }
  }, [betaStatus]);

  /* ── Entrance delay ── */
  useEffect(() => {
    const timer = setTimeout(() => setEntranceComplete(true), 800);
    return () => clearTimeout(timer);
  }, []);

  /* ── Section 2 scroll-driven 3D text ── */
  const section2Ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: section2Ref,
    offset: ['start end', 'end start'],
  });
  const smoothProgress = useSpring(scrollYProgress, {
    stiffness: 15,
    damping: 32,
    mass: 1.8,
  });
  const yScaleValue = useTransform(smoothProgress, [0, 1], [60, -120]);
  const textOpacity = useTransform(smoothProgress, [0.3, 0.5], [0, 1]);
  const transform3D = useMotionTemplate`rotateX(24deg) translateY(${yScaleValue}px) translateZ(15px)`;

  /* ── Destructure config for readability ── */
  const { hero, cinematic, metrics, technology, architecture, footer } = SITE_CONFIG;

  return (
    <div style={{ fontFamily: '"Space Mono", monospace' }} className="bg-black text-white min-h-screen">
      <Navbar entranceComplete={entranceComplete} onStartApp={() => setBetaModalOpen(true)} />

      {/* ════════════════ SECTION 1: HERO ════════════════ */}
      <section className="relative h-screen h-[100dvh] flex flex-col overflow-hidden">
        {/* Hero image background */}
        <img
          src="/hero-bg.png"
          className="absolute inset-0 w-full h-full object-cover"
          alt="Store Dashboard Background"
        />

        {/* Dark overlay for readability */}
        <div className="absolute inset-0 bg-black/60 z-10" />

        {/* Dot grid overlay */}
        <div
          className="absolute inset-0 pointer-events-none z-10"
          style={{
            backgroundImage: 'radial-gradient(#ffffff 1px, transparent 1px)',
            backgroundSize: '24px 24px',
            opacity: 0.03,
          }}
        />

        {/* Watermark text */}
        <div
          className="absolute inset-0 flex items-center justify-center pointer-events-none z-10"
          style={{ paddingTop: 50 }}
        >
          <span
            className="uppercase select-none"
            style={{
              fontFamily: '"Anton SC", sans-serif',
              fontSize: 'clamp(80px, 20vw, 360px)',
              letterSpacing: '-4px',
              opacity: 0.08,
              background:
                'radial-gradient(circle, rgba(142,127,148,0) 0%, #8E7F94 70%)',
              WebkitBackgroundClip: 'text',
              backgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              color: 'transparent',
              lineHeight: 1,
            }}
          >
            {hero.watermark}
          </span>
        </div>

        {/* Hero content */}
        <motion.div
          className="relative z-20 flex flex-col flex-1 px-4 sm:px-6 md:px-8 pt-20 sm:pt-24 pb-8 sm:pb-12"
          initial={{ opacity: 0 }}
          animate={{ opacity: entranceComplete ? 1 : 0 }}
          transition={{ duration: 1 }}
        >
          <div className="flex-1" />

          <div className="flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
            {/* Left column */}
            <div className="flex flex-col gap-4 items-start">
              <h1
                className="text-white font-light leading-[0.95] tracking-[-0.03em] drop-shadow-md"
                style={{ fontSize: 'clamp(40px, 8vw, 88px)' }}
              >
                <ScrambleIn text={hero.titleLeft[0]} delay={200} triggered={entranceComplete} />
                <br />
                <ScrambleIn text={hero.titleLeft[1]} delay={500} triggered={entranceComplete} />
              </h1>

              <motion.p
                className="max-w-sm text-[13px] sm:text-[15px] text-white/70 leading-relaxed drop-shadow-sm"
                initial={{ opacity: 0, y: 25 }}
                animate={entranceComplete ? { opacity: 1, y: 0 } : {}}
                transition={{
                  duration: 0.9,
                  ease: [0.215, 0.61, 0.355, 1.0],
                  delay: 0.2,
                }}
              >
                {hero.description}
              </motion.p>

              {/* Beta Register CTA button */}
              <motion.button
                className="mt-6 px-8 py-3.5 bg-[#0064FF] text-white font-semibold rounded-full hover:bg-blue-600 active:scale-95 transition-all text-[14px] cursor-pointer drop-shadow-lg"
                onClick={() => setBetaModalOpen(true)}
                initial={{ opacity: 0, y: 20 }}
                animate={entranceComplete ? { opacity: 1, y: 0 } : {}}
                transition={{
                  duration: 0.9,
                  ease: [0.215, 0.61, 0.355, 1.0],
                  delay: 0.4,
                }}
              >
                베타 무료로 시작하기
              </motion.button>
            </div>

            {/* Right heading */}
            <h1
              className="text-white font-light leading-[0.95] tracking-[-0.03em] text-left md:text-right drop-shadow-md"
              style={{ fontSize: 'clamp(40px, 8vw, 88px)' }}
            >
              <ScrambleIn text={hero.titleRight[0]} delay={700} triggered={entranceComplete} />
              <br />
              <ScrambleIn text={hero.titleRight[1]} delay={1000} triggered={entranceComplete} />
            </h1>
          </div>
        </motion.div>
      </section>

      {/* ════════════════ SECTION 2: CINEMATIC TEXT ════════════════ */}
      <section
        ref={section2Ref}
        className="relative h-screen h-[100dvh] flex items-center justify-center overflow-hidden"
      >
        {/* Image background */}
        <img
          src="/receipt-bg.png"
          className="absolute inset-0 w-full h-full object-cover"
          alt="Receipt Processing Background"
        />

        {/* Top gradient overlay */}
        <div
          className="absolute top-0 left-0 right-0 z-10"
          style={{
            height: 180,
            background: 'linear-gradient(to bottom, #010103, transparent)',
          }}
        />

        {/* Dark overlay for readability */}
        <div className="absolute inset-0 bg-black/75 z-10" />

        {/* 3D text content */}
        <div className="relative z-20 max-w-5xl mx-auto" style={{ perspective: 400 }}>
          <motion.p
            className="font-sans font-normal text-[22px] sm:text-[30px] md:text-[36px] lg:text-[42px] text-white leading-[1.35] tracking-[-0.02em] select-none px-6 sm:px-12 text-center drop-shadow-md"
            style={{
              transform: transform3D,
              opacity: textOpacity,
            }}
          >
            {cinematic.text}
          </motion.p>
        </div>
      </section>

      {/* ════════════════ SECTION 3: METRICS ════════════════ */}
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden bg-[#050505]">
        {/* Video background has been removed to keep high contrast text on clean dark theme */}
        <div className="relative z-20 pt-32 pb-32 px-6 max-w-6xl mx-auto w-full">
          <motion.p
            className="text-white/40 text-[13px] sm:text-[14px] tracking-[0.2em] uppercase mb-20 text-center"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 1.2 }}
            viewport={{ once: true, amount: 0.3 }}
          >
            {metrics.subtitle}
          </motion.p>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-16 md:gap-8 text-center">
            {metrics.items.map((m, i) => (
              <motion.div
                key={m.label}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: i * 0.15 }}
                viewport={{ once: true, amount: 0.3 }}
              >
                <div
                  className="text-white font-light tracking-[-0.04em] leading-none drop-shadow-md"
                  style={{ fontSize: 'clamp(48px, 10vw, 96px)' }}
                >
                  {m.value}
                </div>
                <div className="text-white/50 text-[13px] sm:text-[15px] mt-4 tracking-wide drop-shadow-sm">
                  {m.label}
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ════════════════ SECTION 4: TECHNOLOGY ════════════════ */}
      <section className="relative h-screen h-[100dvh] flex flex-col overflow-hidden">
        {/* Image background */}
        <img
          src="/receipt-bg.png"
          className="absolute inset-0 w-full h-full object-cover"
          alt="Receipt Database Processing Background"
        />

        {/* Dark overlay for readability */}
        <div className="absolute inset-0 bg-black/80 z-10" />

        <div className="relative z-20 flex flex-col flex-1 px-8 sm:px-12 md:px-16 py-12 sm:py-16">
          <div className="flex flex-col md:flex-row md:justify-between md:items-start gap-6">
            <motion.h2
              className="text-white font-light leading-[0.95] tracking-[-0.03em] drop-shadow-md"
              style={{ fontSize: 'clamp(36px, 8vw, 72px)' }}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 1.0 }}
              viewport={{ once: true, amount: 0.3 }}
            >
              {technology.title[0]}
              <br />
              {technology.title[1]}
            </motion.h2>

            <motion.p
              className="text-white/60 text-[13px] sm:text-[15px] leading-relaxed max-w-xs md:text-right md:pt-2 drop-shadow-sm"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 1.0, delay: 0.2 }}
              viewport={{ once: true, amount: 0.3 }}
            >
              {technology.description}
            </motion.p>
          </div>

          <div className="flex-1" />

          <motion.div
            className="grid grid-cols-2 md:grid-cols-4 gap-8 md:gap-6"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 1.0, delay: 0.3 }}
            viewport={{ once: true, amount: 0.3 }}
          >
            {technology.features.map((f, i) => (
              <motion.div
                key={f.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.7, delay: i * 0.1 }}
                viewport={{ once: true, amount: 0.3 }}
              >
                <h3 className="text-white text-[14px] sm:text-[16px] font-normal mb-2 drop-shadow-md">
                  {f.title}
                </h3>
                <p className="text-white/50 text-[12px] sm:text-[14px] leading-relaxed drop-shadow-sm">
                  {f.desc}
                </p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* ════════════════ SECTION 5: ARCHITECTURE ════════════════ */}
      <section className="min-h-screen flex items-center justify-center bg-black">
        <div className="max-w-3xl mx-auto px-6 py-32 text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 1.0 }}
            viewport={{ once: true, amount: 0.4 }}
          >
            <p className="text-white/40 text-[13px] sm:text-[14px] tracking-[0.2em] uppercase mb-8">
              {architecture.subtitle}
            </p>
            <h2
              className="text-white font-light leading-[1.15] tracking-[-0.02em] mb-10"
              style={{ fontSize: 'clamp(28px, 6vw, 56px)' }}
            >
              {architecture.heading}
            </h2>
            <p className="text-white/45 text-[15px] sm:text-[17px] leading-relaxed max-w-xl mx-auto">
              {architecture.description}
            </p>
          </motion.div>

          <motion.div
            className="mt-20 flex flex-col items-center gap-4"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 1.2, delay: 0.4 }}
            viewport={{ once: true, amount: 0.4 }}
          >
            {architecture.layers.map((l) => (
              <div
                key={l.num}
                className="w-full max-w-md h-[72px] border border-white/10 rounded-lg flex items-center justify-between px-6"
              >
                <span className="text-white/30 text-[12px] tracking-[0.15em] uppercase">
                  Layer {l.num}
                </span>
                <span className="text-white text-[16px] sm:text-[18px] font-light">
                  {l.name}
                </span>
              </div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* ════════════════ SECTION 6: PRICING ════════════════ */}
      <section className="min-h-screen bg-black py-32 px-6">
        <div className="max-w-6xl mx-auto">
          <motion.div
            className="text-center mb-20"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 1.0 }}
            viewport={{ once: true, amount: 0.3 }}
          >
            <p className="text-white/40 text-[13px] sm:text-[14px] tracking-[0.2em] uppercase mb-8">
              요금제 안내
            </p>
            <h2
              className="text-white font-light leading-[1.15] tracking-[-0.02em] mb-6"
              style={{ fontSize: 'clamp(28px, 6vw, 56px)' }}
            >
              매장닥터 플랜 선택
            </h2>
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#0064FF]/10 border border-[#0064FF]/30 text-[#0064FF] text-[12px] font-semibold mb-6">
              🎁 베타 테스트 기간 전체 무료 이용 가능
            </div>
            <p className="text-white/50 text-[15px] sm:text-[17px] leading-relaxed max-w-xl mx-auto">
              사장님의 매장 규모와 필요 기능에 맞춰 가장 효율적인 플랜을 선택하세요.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8">
            {/* ── Basic ── */}
            <motion.div
              className="border border-white/10 rounded-2xl p-8 flex flex-col relative"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0 }}
              viewport={{ once: true, amount: 0.3 }}
            >
              <div className="absolute top-4 right-4">
                <span className="text-[10px] text-emerald-400 bg-emerald-500/10 border border-emerald-500/30 px-2 py-0.5 rounded">베타 무료</span>
              </div>
              <p className="text-white/40 text-[12px] tracking-[0.15em] uppercase mb-3">Basic</p>
              <div className="flex items-baseline gap-1 mb-2">
                <span className="text-white text-[42px] font-light tracking-tight">9,900원</span>
                <span className="text-white/30 text-[14px]">/월</span>
              </div>
              <p className="text-white/50 text-[13px] leading-relaxed mb-8">
                매장 1개, OCR 월 100건
              </p>
              <ul className="flex flex-col gap-3 mb-10 flex-1">
                <li className="flex items-center gap-3 text-white/60 text-[13px]">
                  <span className="text-[#0064FF]">✓</span> 영수증/POS 사진 분석
                </li>
                <li className="flex items-center gap-3 text-white/60 text-[13px]">
                  <span className="text-[#0064FF]">✓</span> 기초 매출·매입 장부 자동화
                </li>
                <li className="flex items-center gap-3 text-white/60 text-[13px]">
                  <span className="text-[#0064FF]">✓</span> 월간 기본 정산서 제공
                </li>
              </ul>
              <button
                onClick={() => alert("베타 기간 동안은 모든 플랜을 무료로 이용하실 수 있습니다!")}
                className="w-full h-[50px] rounded-lg font-medium text-[15px] flex items-center justify-center gap-2 bg-[#0064FF] hover:bg-blue-600 text-white border-none active:scale-[0.98] transition-all cursor-pointer"
              >
                무료 체험 시작하기
              </button>
            </motion.div>

            {/* ── Pro (Featured) ── */}
            <motion.div
              className="border border-[#0064FF]/40 rounded-2xl p-8 flex flex-col relative bg-white/[0.02]"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.1 }}
              viewport={{ once: true, amount: 0.3 }}
            >
              <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2">
                <span className="bg-[#0064FF] text-white text-[11px] font-bold tracking-[0.1em] uppercase px-4 py-1.5 rounded-full">
                  Most Popular
                </span>
              </div>
              <div className="absolute top-4 right-4">
                <span className="text-[10px] text-emerald-400 bg-emerald-500/10 border border-emerald-500/30 px-2 py-0.5 rounded">베타 무료</span>
              </div>
              <p className="text-white/40 text-[12px] tracking-[0.15em] uppercase mb-3">Pro</p>
              <div className="flex items-baseline gap-1 mb-2">
                <span className="text-white text-[42px] font-light tracking-tight">19,900원</span>
                <span className="text-white/30 text-[14px]">/월</span>
              </div>
              <p className="text-white/50 text-[13px] leading-relaxed mb-8">
                매장 1개, OCR 월 300건 + AI 진단
              </p>
              <ul className="flex flex-col gap-3 mb-10 flex-1">
                <li className="flex items-center gap-3 text-white/60 text-[13px]">
                  <span className="text-[#0064FF]">✓</span> Basic의 모든 기능 제공
                </li>
                <li className="flex items-center gap-3 text-white/60 text-[13px]">
                  <span className="text-[#0064FF]">✓</span> AI 상권 및 영업 진단 분석
                </li>
                <li className="flex items-center gap-3 text-white/60 text-[13px]">
                  <span className="text-[#0064FF]">✓</span> 실시간 원가율 및 마진 추적
                </li>
                <li className="flex items-center gap-3 text-white/60 text-[13px]">
                  <span className="text-[#0064FF]">✓</span> 다음 달 예측 분석 보고서
                </li>
              </ul>
              <button
                onClick={() => alert("베타 기간 동안은 모든 플랜을 무료로 이용하실 수 있습니다!")}
                className="w-full h-[50px] rounded-lg font-medium text-[15px] flex items-center justify-center gap-2 bg-[#0064FF] hover:bg-blue-600 text-white border-none active:scale-[0.98] transition-all cursor-pointer shadow-lg shadow-blue-500/20"
              >
                무료 체험 시작하기
              </button>
            </motion.div>

            {/* ── Premium ── */}
            <motion.div
              className="border border-white/10 rounded-2xl p-8 flex flex-col relative"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              viewport={{ once: true, amount: 0.3 }}
            >
              <div className="absolute top-4 right-4">
                <span className="text-[10px] text-emerald-400 bg-emerald-500/10 border border-emerald-500/30 px-2 py-0.5 rounded">베타 무료</span>
              </div>
              <p className="text-white/40 text-[12px] tracking-[0.15em] uppercase mb-3">Premium</p>
              <div className="flex items-baseline gap-1 mb-2">
                <span className="text-white text-[42px] font-light tracking-tight">29,900원</span>
                <span className="text-white/30 text-[14px]">/월</span>
              </div>
              <p className="text-white/50 text-[13px] leading-relaxed mb-8">
                매장 1개, OCR 월 1,000건 + 전체 기능
              </p>
              <ul className="flex flex-col gap-3 mb-10 flex-1">
                <li className="flex items-center gap-3 text-white/60 text-[13px]">
                  <span className="text-[#0064FF]">✓</span> Pro의 모든 기능 제공
                </li>
                <li className="flex items-center gap-3 text-white/60 text-[13px]">
                  <span className="text-[#0064FF]">✓</span> 대용량 영수증 우선 파싱
                </li>
                <li className="flex items-center gap-3 text-white/60 text-[13px]">
                  <span className="text-[#0064FF]">✓</span> 무제한 데이터 보존 기능
                </li>
              </ul>
              <button
                onClick={() => alert("베타 기간 동안은 모든 플랜을 무료로 이용하실 수 있습니다!")}
                className="w-full h-[50px] rounded-lg font-medium text-[15px] flex items-center justify-center gap-2 bg-[#0064FF] hover:bg-blue-600 text-white border-none active:scale-[0.98] transition-all cursor-pointer"
              >
                무료 체험 시작하기
              </button>
            </motion.div>
          </div>
        </div>
      </section>

      {/* ════════════════ FOOTER ════════════════ */}
      <footer className="bg-black overflow-hidden border-t border-white/5">
        <div className="flex flex-col md:flex-row min-h-[400px]">
          {/* Left: Image */}
          <div className="md:w-1/2 h-[300px] md:h-auto relative">
            <img
              src="/footer-bg.png"
              className="absolute inset-0 w-full h-full object-cover opacity-55"
              alt="Warm Cozy Store Ambiance"
            />
            <div className="absolute inset-0 bg-black/40" />
          </div>

          {/* Right: Content */}
          <div className="md:w-1/2 flex flex-col justify-between p-10 sm:p-16">
            <div>
              <div className="flex items-center gap-2.5 mb-8">
                <ConnectAILabLogo size={18} className="text-white/70" />
                <span className="text-[15px] font-medium text-white/70 tracking-tight">
                  {SITE_CONFIG.brandName}
                </span>
              </div>
              <p className="text-white/40 text-[14px] sm:text-[15px] leading-relaxed max-w-sm">
                {footer.tagline}
              </p>
            </div>

            <p className="text-white/25 text-[12px] mt-12">
              {SITE_CONFIG.copyright}
            </p>
          </div>
        </div>
      </footer>

      {/* ── Beta Register Modal ── */}
      <AnimatePresence>
        {betaModalOpen && (
          <motion.div
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm px-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <motion.div
              className="w-full max-w-md bg-[#111] border border-white/10 rounded-2xl p-8 relative overflow-hidden"
              initial={{ scale: 0.95, y: 15 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.95, y: 15 }}
              transition={{ type: 'spring', duration: 0.5 }}
            >
              {/* Close button */}
              <button
                onClick={resetBetaModal}
                className="absolute top-4 right-4 text-white/40 hover:text-white transition-colors bg-transparent border-none text-[20px] cursor-pointer"
              >
                &times;
              </button>

              {betaStatus === 'idle' && (
                <form onSubmit={handleBetaSubmit} className="flex flex-col gap-5">
                  <div>
                    <h3 className="text-white text-[20px] font-medium mb-2">베타 테스터 신청</h3>
                    <p className="text-white/50 text-[13px] leading-relaxed">
                      매장닥터 베타 서비스 참여를 위해 발급받으신 초대코드를 입력해 주세요. (기본 코드: BETA2026)
                    </p>
                  </div>
                  <div className="flex flex-col gap-2">
                    <input
                      type="text"
                      placeholder="초대코드 입력"
                      value={inviteCode}
                      onChange={(e) => setInviteCode(e.target.value)}
                      className="w-full h-[48px] bg-white/5 border border-white/10 rounded-lg px-4 text-white text-[15px] focus:outline-none focus:border-[#0064FF] transition-colors"
                    />
                  </div>
                  <button
                    type="submit"
                    className="w-full h-[48px] bg-[#0064FF] hover:bg-blue-600 text-white rounded-lg font-medium text-[15px] cursor-pointer active:scale-[0.98] transition-all border-none"
                  >
                    코드 확인
                  </button>
                </form>
              )}

              {betaStatus === 'success' && (
                <div className="flex flex-col items-center text-center py-4 gap-4">
                  <div className="w-12 h-12 bg-emerald-500/10 border border-emerald-500/30 rounded-full flex items-center justify-center text-emerald-400 text-[24px]">
                    ✓
                  </div>
                  <div>
                    <h3 className="text-white text-[20px] font-medium mb-2">인증 성공!</h3>
                    <p className="text-white/50 text-[13px] leading-relaxed">
                      매장닥터 베타 테스터 인증이 완료되었습니다.<br />
                      잠시 후 회원가입 페이지로 자동으로 이동합니다...
                    </p>
                  </div>
                  <button
                    onClick={() => {
                      window.location.href = "https://store-doctor-lilac.vercel.app";
                    }}
                    className="w-full h-[48px] bg-white text-black hover:bg-white/90 rounded-lg font-medium text-[15px] cursor-pointer active:scale-[0.98] transition-all mt-2 border-none flex items-center justify-center gap-2"
                  >
                    <span>회원가입하러 이동하기</span>
                    <span>➔</span>
                  </button>
                </div>
              )}

              {betaStatus === 'error' && (
                <div className="flex flex-col items-center text-center py-4 gap-4">
                  <div className="w-12 h-12 bg-rose-500/10 border border-rose-500/30 rounded-full flex items-center justify-center text-rose-400 text-[24px]">
                    !
                  </div>
                  <div>
                    <h3 className="text-white text-[20px] font-medium mb-2">인증 실패</h3>
                    <p className="text-white/50 text-[13px] leading-relaxed">
                      초대코드가 올바르지 않습니다.<br />
                      정확한 코드를 다시 확인 후 입력해 주세요.
                    </p>
                  </div>
                  <button
                    onClick={() => setBetaStatus('idle')}
                    className="w-full h-[48px] bg-white/10 hover:bg-white/15 text-white rounded-lg font-medium text-[15px] cursor-pointer active:scale-[0.98] transition-all mt-2 border-none"
                  >
                    다시 입력하기
                  </button>
                </div>
              )}
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
