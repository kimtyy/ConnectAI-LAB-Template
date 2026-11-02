/**
 * PlanPulse Landing Page Interactive Logic
 * Handles interactive mockup project switching, FAQ toggles, and scroll effects
 */

document.addEventListener("DOMContentLoaded", () => {
  // 1. FAQ Accordion Logic
  const faqItems = document.querySelectorAll(".faq-item");
  faqItems.forEach((item) => {
    item.addEventListener("click", () => {
      const answer = item.querySelector(".faq-answer");
      const icon = item.querySelector(".faq-toggle-icon");
      const isVisible = answer && answer.style.display === "block";

      // Close all other answers
      faqItems.forEach((other) => {
        const otherAnswer = other.querySelector(".faq-answer");
        const otherIcon = other.querySelector(".faq-toggle-icon");
        if (otherAnswer) otherAnswer.style.display = "none";
        if (otherIcon) otherIcon.textContent = "+";
      });

      if (!isVisible && answer) {
        answer.style.display = "block";
        if (icon) icon.textContent = "−";
      } else if (answer) {
        answer.style.display = "none";
        if (icon) icon.textContent = "+";
      }
    });
  });

  // 2. Interactive Mockup Preset Switcher Demo
  const demoProjects = {
    "cult-market": {
      title: "문화관광형시장 육성사업",
      category: "소상공인시장진흥공단 · 3개년 20억 지원",
      spec: "[붙임2] HWPX / DOCX",
      specDesc: "공고 표준 개조식 77P 서식",
      gatekeeper: "PASS (4/4 완료)",
      gatekeeperDesc: "상인회·온누리·화재·자부담 검증",
      budget: "20.0 억원",
      budgetDesc: "국비 50% : 지방비 50% 100% 일치",
      dossierStatus: "📑 <strong>PSST Blueprint Ready:</strong> 4대 핵심분야 10대 특화과업 + 3개년 회계 세목 자동 산출 완료"
    },
    "startup-pkg": {
      title: "초기창업패키지 지원사업",
      category: "창업진흥원 · 1개년 1.0억 지원",
      spec: "PSST 표준 DOCX / PDF",
      specDesc: "창진원 표준 25P 조판",
      gatekeeper: "PASS (3/3 완료)",
      gatekeeperDesc: "3년이내 창업·대표자 지분 적격",
      budget: "1.00 억원",
      budgetDesc: "정부지원금 7천만 + 대응자금 3천만",
      dossierStatus: "📑 <strong>PSST Blueprint Ready:</strong> 문제인식(P)·실현방안(S)·성장전략(S)·팀구성(T) 초안 빌드 완료"
    },
    "smart-store": {
      title: "스마트상점 기술보급사업",
      category: "중소벤처기업부 · 단년도 0.5억",
      spec: "스마트상점 표준 HWP",
      specDesc: "공식 심사규격 15P 서식",
      gatekeeper: "PASS (선정 적격)",
      gatekeeperDesc: "스마트기술 2종 이상 도입요건 충족",
      budget: "5,000 만원",
      budgetDesc: "국비 70% : 자부담 30% 한도 준수",
      dossierStatus: "📑 <strong>PSST Blueprint Ready:</strong> 키오스크·AI사이니지 기술도입계획서 및 비교견적서 산출 완료"
    }
  };

  const projectBtns = document.querySelectorAll(".demo-target-pill");
  const projectTitleEl = document.getElementById("mockup-project-title");
  const projectCategoryEl = document.getElementById("mockup-project-category");
  const projectSpecEl = document.getElementById("mockup-project-spec");
  const projectSpecDescEl = document.getElementById("mockup-project-spec-desc");
  const projectGatekeeperEl = document.getElementById("mockup-project-gatekeeper");
  const projectGatekeeperDescEl = document.getElementById("mockup-project-gatekeeper-desc");
  const projectBudgetEl = document.getElementById("mockup-project-budget");
  const projectBudgetDescEl = document.getElementById("mockup-project-budget-desc");
  const projectStatusEl = document.getElementById("mockup-project-status");

  projectBtns.forEach((btn) => {
    btn.addEventListener("click", () => {
      projectBtns.forEach((b) => b.classList.remove("active"));
      btn.classList.add("active");

      const key = btn.getAttribute("data-target");
      const data = demoProjects[key];
      if (!data) return;

      if (projectTitleEl) projectTitleEl.textContent = data.title;
      if (projectCategoryEl) projectCategoryEl.textContent = data.category;
      if (projectSpecEl) projectSpecEl.textContent = data.spec;
      if (projectSpecDescEl) projectSpecDescEl.textContent = data.specDesc;
      if (projectGatekeeperEl) projectGatekeeperEl.textContent = data.gatekeeper;
      if (projectGatekeeperDescEl) projectGatekeeperDescEl.textContent = data.gatekeeperDesc;
      if (projectBudgetEl) projectBudgetEl.textContent = data.budget;
      if (projectBudgetDescEl) projectBudgetDescEl.textContent = data.budgetDesc;
      if (projectStatusEl) projectStatusEl.innerHTML = data.dossierStatus;
    });
  });
});
