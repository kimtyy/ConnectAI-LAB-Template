/**
 * PlanPulse Landing Page Interactive Logic
 * Handles interactive mockup blueprint switching, sample modal, and FAQ accordions
 */

document.addEventListener("DOMContentLoaded", () => {
  // 1. FAQ Accordion Logic
  const faqItems = document.querySelectorAll(".faq-item");
  faqItems.forEach((item) => {
    item.addEventListener("click", () => {
      const answer = item.querySelector(".faq-answer");
      const icon = item.querySelector(".faq-toggle-icon");
      const isVisible = answer.style.display === "block";

      // Close all other answers
      faqItems.forEach((other) => {
        const otherAnswer = other.querySelector(".faq-answer");
        const otherIcon = other.querySelector(".faq-toggle-icon");
        if (otherAnswer) otherAnswer.style.display = "none";
        if (otherIcon) otherIcon.textContent = "+";
      });

      if (!isVisible) {
        answer.style.display = "block";
        if (icon) icon.textContent = "−";
      } else {
        answer.style.display = "none";
        if (icon) icon.textContent = "+";
      }
    });
  });

  // 2. Interactive Mockup Blueprint Module Switcher
  const blueprintModules = {
    WP01: {
      code: "WP-01 [H/W 특성화]",
      title: "조종 달빛 캠핑 야시장 특화 매대(SUS-304 20개소) 시공",
      badge: "예산: 250,000,000원",
      badgeColor: "#10B981",
      val1: "친환경 올스테인리스 규격 매대 20개소",
      val2: "원터치 급배수·전기 인입 함체 지중 매설",
      val3: "식품위생법·중기부 화재안전기준 100% 충족",
      val4: "야간 매출 +42% 신장 및 청년창업 20개팀 육성",
      status: "● OPENXML TABLE RENDER: 100% (Row Split Protected)",
      footerNote: "📑 [WP-01 실행설계서] 추진배경-스펙-4단계 공정도-원단위 예산-KPI 5대 체계 완비"
    },
    WP03: {
      code: "WP-03 [H/W 경관조명]",
      title: "야간 조종천 낭만 조명거리 & 밀리터리 인터랙티브 파사드",
      badge: "예산: 200,000,000원",
      badgeColor: "#38BDF8",
      val1: "친환경 고효율 LED 루미나리에 450m",
      val2: "맹호부대 상징 밀리터리 미디어 파사드 1식",
      val3: "야간 보행 안전도 및 범죄예방 CPTED 설계",
      val4: "체류 시간 3.2시간 연장 & 인스타 성지화",
      status: "● HARDWARE SPEC: IP67 방수/방진 조달인증 완료",
      footerNote: "📑 [WP-03 실행설계서] 조종천 수변 공간 연계 야간 킬러 관광 명소화 3개년 로드맵"
    },
    WP06: {
      code: "WP-06 [S/W 특화PB]",
      title: "가평 조종면 특화 킬러 PB 5종(포도 뱅쇼·밀키트) 개발",
      badge: "예산: 200,000,000원",
      badgeColor: "#F59E0B",
      val1: "운악산 포도 뱅쇼 키트 & 조종 잣간장 닭갈비",
      val2: "캠핑용 원스톱 바비큐 패키지 및 진공 패키징",
      val3: "상표권·디자인 출원 5건 & HACCP 가공 연계",
      val4: "온·오프라인 옴니채널 연간 매출 3.5억원 목표",
      status: "● PRODUCT ARCHITECTURE: 5종 레시피 및 패키징 완료",
      footerNote: "📑 [WP-06 실행설계서] 조종시장 고유 브랜드 IP 자산화 및 전국 판로 개척 방안"
    },
    BUDGET: {
      code: "원단위 회계장부",
      title: "46개 세목 원단위 [단가 × 수량 × 횟수 = 20억원] 정산서",
      badge: "총액: 2,000,000,000원 (오차 0원)",
      badgeColor: "#8B5CF6",
      val1: "국비 10.0억 : 지방비 10.0억 (1:1 매칭 무결)",
      val2: "특성화 기반조성(H/W): 8.5억원 (42.5%)",
      val3: "문화관광 콘텐츠(S/W): 9.5억원 (47.5%)",
      val4: "사업단 운영비: 2.0억원 (법정한도 10.0% 엄수)",
      status: "● 46-ITEM LEDGER AUDIT: 1원 단위 정합성 무결 통과",
      footerNote: "📑 [회계 산출내역서] 조달청 MAS 및 기재부 예산편성 기준 단가 100% 매칭"
    },
    SCORE: {
      code: "모의 심사 평가",
      title: "중기부·소진공 공모전 공식 심사위원 평가 리포트",
      badge: "종합 채점: 100.6점 (S등급)",
      badgeColor: "#EC4899",
      val1: "기본 배점: 95.6점 / 100점 (서면심사 압도적 1위)",
      val2: "법정 4대 기초역량 적격성: ALL PASS 적격",
      val3: "정책 가점: +5.0점 (온누리 가맹률 83.3% 초과 달성)",
      val4: "심사위원 예상 압박 질의 3선 및 방어 모범답변 수록",
      status: "● EVALUATION ENGINE: 전국 82개 상권 대비 상위 0.1% 판정",
      footerNote: "📑 [심사 방어 리포트] 대면 발표평가용 15분 프레젠테이션 방어 전략 완비"
    }
  };

  const moduleBtns = document.querySelectorAll(".demo-target-pill");
  const moduleCodeEl = document.getElementById("mockup-module-code");
  const moduleTitleEl = document.getElementById("mockup-module-title");
  const moduleBadgeEl = document.getElementById("mockup-module-badge");
  const val1El = document.getElementById("mockup-val-1");
  const val2El = document.getElementById("mockup-val-2");
  const val3El = document.getElementById("mockup-val-3");
  const val4El = document.getElementById("mockup-val-4");
  const statusEl = document.getElementById("mockup-status-text");
  const footerNoteEl = document.getElementById("mockup-footer-note");

  moduleBtns.forEach((btn) => {
    btn.addEventListener("click", () => {
      moduleBtns.forEach((b) => {
        b.classList.remove("active");
        b.style.background = "rgba(255,255,255,0.08)";
        b.style.color = "#CBD5E1";
        b.style.borderColor = "rgba(255,255,255,0.15)";
      });
      btn.classList.add("active");
      btn.style.background = "#2563EB";
      btn.style.color = "#FFFFFF";
      btn.style.borderColor = "#60A5FA";

      const key = btn.getAttribute("data-module");
      const data = blueprintModules[key];
      if (!data) return;

      if (moduleCodeEl) moduleCodeEl.textContent = data.code;
      if (moduleTitleEl) moduleTitleEl.textContent = data.title;
      if (moduleBadgeEl) {
        moduleBadgeEl.textContent = data.badge;
        moduleBadgeEl.style.color = data.badgeColor;
      }
      if (val1El) val1El.textContent = data.val1;
      if (val2El) val2El.textContent = data.val2;
      if (val3El) val3El.textContent = data.val3;
      if (val4El) val4El.textContent = data.val4;
      if (statusEl) statusEl.textContent = data.status;
      if (footerNoteEl) footerNoteEl.textContent = data.footerNote;
    });
  });

  // 3. Sample Modal Logic
  const modalOverlay = document.getElementById("sampleModalOverlay");
  const openModalBtns = document.querySelectorAll(".btn-open-sample");
  const closeModalBtn = document.getElementById("closeSampleModal");

  openModalBtns.forEach((btn) => {
    btn.addEventListener("click", (e) => {
      e.preventDefault();
      if (modalOverlay) {
        modalOverlay.style.display = "flex";
        document.body.style.overflow = "hidden";
      }
    });
  });

  if (closeModalBtn) {
    closeModalBtn.addEventListener("click", () => {
      if (modalOverlay) {
        modalOverlay.style.display = "none";
        document.body.style.overflow = "auto";
      }
    });
  }

  if (modalOverlay) {
    modalOverlay.addEventListener("click", (e) => {
      if (e.target === modalOverlay) {
        modalOverlay.style.display = "none";
        document.body.style.overflow = "auto";
      }
    });
  }

  // Escape key to close modal
  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape" && modalOverlay && modalOverlay.style.display === "flex") {
      modalOverlay.style.display = "none";
      document.body.style.overflow = "auto";
    }
  });
});
