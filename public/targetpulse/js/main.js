/**
 * TargetPulse Landing Page Interactive Logic
 * Handles interactive mockup target switching, FAQ toggles, and scroll effects
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

  // 2. Interactive Mockup Target Switcher Demo
  const demoTargets = {
    EGFR: {
      symbol: "EGFR",
      name: "Epidermal growth factor receptor",
      uniprot: "P00533",
      len: "1,210 aa",
      plddt: "82.4 / 100",
      ic50: "0.500 nM (Osimertinib derivative)",
      disease: "Non-small cell lung carcinoma (0.841)",
      pmid: "PMID: 38472911 (Nature Medicine 2026)",
    },
    KRAS: {
      symbol: "KRAS",
      name: "GTPase KRas (Homo sapiens)",
      uniprot: "P01116",
      len: "189 aa",
      plddt: "91.8 / 100",
      ic50: "1.200 nM (Sotorasib analog)",
      disease: "Pancreatic ductal adenocarcinoma (0.892)",
      pmid: "PMID: 38291044 (Cell Discovery 2026)",
    },
    BRAF: {
      symbol: "BRAF",
      name: "Serine/threonine-protein kinase B-raf",
      uniprot: "P15056",
      len: "766 aa",
      plddt: "86.1 / 100",
      ic50: "0.800 nM (Dabrafenib series)",
      disease: "Malignant melanoma (0.875)",
      pmid: "PMID: 38102988 (Cancer Cell 2026)",
    },
  };

  const targetBtns = document.querySelectorAll(".demo-target-pill");
  const targetSymbolEl = document.getElementById("mockup-target-symbol");
  const targetNameEl = document.getElementById("mockup-target-name");
  const targetUniprotEl = document.getElementById("mockup-target-uniprot");
  const targetLenEl = document.getElementById("mockup-target-len");
  const targetPlddtEl = document.getElementById("mockup-target-plddt");
  const targetIc50El = document.getElementById("mockup-target-ic50");
  const targetDiseaseEl = document.getElementById("mockup-target-disease");

  targetBtns.forEach((btn) => {
    btn.addEventListener("click", () => {
      targetBtns.forEach((b) => b.classList.remove("active"));
      btn.classList.add("active");

      const key = btn.getAttribute("data-target");
      const data = demoTargets[key];
      if (!data) return;

      if (targetSymbolEl) targetSymbolEl.textContent = data.symbol;
      if (targetNameEl) targetNameEl.textContent = data.name;
      if (targetUniprotEl) targetUniprotEl.textContent = data.uniprot;
      if (targetLenEl) targetLenEl.textContent = data.len;
      if (targetPlddtEl) targetPlddtEl.textContent = data.plddt;
      if (targetIc50El) targetIc50El.textContent = data.ic50;
      if (targetDiseaseEl) targetDiseaseEl.textContent = data.disease;
    });
  });
});
