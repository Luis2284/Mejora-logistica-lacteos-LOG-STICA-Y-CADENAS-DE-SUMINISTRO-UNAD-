/**
 * LÁCTEOS EN MOVIMIENTO - FASE 1: ARQUITECTURA VISUAL Y NAVEGACIÓN
 * Proyecto Académico: Logística y Cadenas de Suministro (UNAD)
 * Vanilla JavaScript - Compatible con GitHub Pages y navegadores modernos.
 */

document.addEventListener('DOMContentLoaded', () => {
  // --- Elementos de Navegación ---
  const navLinks = document.querySelectorAll('.nav-link');
  const sections = document.querySelectorAll('.page-section');
  const menuToggleBtn = document.querySelector('.menu-toggle-btn');
  const navMenu = document.querySelector('.nav-menu');

  // --- Mapeo de Secciones Disponibles ---
  const validSections = [
    'inicio',
    'diagnostico',
    'estrategias',
    'implementacion',
    'evaluacion',
    'referencias'
  ];

  /**
   * Cambia activamente la sección visible y actualiza el menú superior
   * @param {string} targetId - ID de la sección (ej. 'inicio', 'diagnostico')
   * @param {boolean} updateHistory - Si debe actualizar el hash en la URL
   */
  function navigateToSection(targetId, updateHistory = true) {
    if (!validSections.includes(targetId)) {
      targetId = 'inicio';
    }

    // 1. Ocultar todas las secciones
    sections.forEach(sec => {
      sec.classList.remove('active-section');
    });

    // 2. Mostrar la sección seleccionada
    const targetSection = document.getElementById(targetId);
    if (targetSection) {
      targetSection.classList.add('active-section');
    }

    // 3. Actualizar estado activo en los enlaces del menú
    navLinks.forEach(link => {
      const linkTarget = link.getAttribute('data-target') || link.getAttribute('href').replace('#', '');
      if (linkTarget === targetId) {
        link.classList.add('active');
      } else {
        link.classList.remove('active');
      }
    });

    // 4. Cerrar menú móvil si está desplegado
    closeMobileMenu();

    // 5. Actualizar URL sin salto brusco
    if (updateHistory) {
      history.pushState(null, null, `#${targetId}`);
    }

    // 6. Desplazar suavemente hacia la vista principal
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  }

  // --- Listeners para Enlaces del Menú ---
  navLinks.forEach(link => {
    link.addEventListener('click', (e) => {
      e.preventDefault();
      const targetId = link.getAttribute('data-target') || link.getAttribute('href').replace('#', '');
      navigateToSection(targetId);
    });
  });

  // --- Listeners para Botones de Acción Rápida (Hero y Bento) ---
  const btnExplore = document.querySelector('.btn-explore-cta');
  if (btnExplore) {
    btnExplore.addEventListener('click', (e) => {
      e.preventDefault();
      navigateToSection('diagnostico');
    });
  }

  // Tarjetas Bento de la Portada con Enlace a Secciones
  const bentoCards = document.querySelectorAll('[data-bento-link]');
  bentoCards.forEach(card => {
    card.addEventListener('click', () => {
      const target = card.getAttribute('data-bento-link');
      if (target) {
        navigateToSection(target);
      }
    });
  });

  // Botones de "Siguiente Sección" y "Sección Anterior" en pies de sección
  const navStepBtns = document.querySelectorAll('[data-step-target]');
  navStepBtns.forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.preventDefault();
      const stepTarget = btn.getAttribute('data-step-target');
      if (stepTarget) {
        navigateToSection(stepTarget);
      }
    });
  });

  // --- Soporte para el Menú Hamburguesa en Móviles ---
  function closeMobileMenu() {
    if (navMenu && navMenu.classList.contains('mobile-open')) {
      navMenu.classList.remove('mobile-open');
      if (menuToggleBtn) {
        menuToggleBtn.classList.remove('is-active');
        menuToggleBtn.setAttribute('aria-expanded', 'false');
      }
    }
  }

  function toggleMobileMenu() {
    if (!navMenu || !menuToggleBtn) return;
    const isOpen = navMenu.classList.toggle('mobile-open');
    menuToggleBtn.classList.toggle('is-active', isOpen);
    menuToggleBtn.setAttribute('aria-expanded', isOpen ? 'true' : 'false');
  }

  if (menuToggleBtn && navMenu) {
    menuToggleBtn.addEventListener('click', (e) => {
      e.stopPropagation();
      toggleMobileMenu();
    });

    // Cerrar menú al hacer clic fuera
    document.addEventListener('click', (e) => {
      if (!navMenu.contains(e.target) && !menuToggleBtn.contains(e.target)) {
        closeMobileMenu();
      }
    });

    // Cerrar menú móvil con tecla Escape
    window.addEventListener('keydown', (e) => {
      if (e.key === 'Escape' && navMenu.classList.contains('mobile-open')) {
        closeMobileMenu();
      }
    });
  }

  // --- Modal: Conocer el Proyecto ---
  const modalOpenBtn = document.querySelector('.btn-open-modal');
  const modalOverlay = document.getElementById('projectModal');
  const modalCloseBtn = document.querySelector('.modal-close-btn');

  function openModal() {
    if (modalOverlay) {
      modalOverlay.classList.add('active');
      document.body.style.overflow = 'hidden';
    }
  }

  function closeModal() {
    if (modalOverlay) {
      modalOverlay.classList.remove('active');
      document.body.style.overflow = '';
    }
  }

  if (modalOpenBtn) {
    modalOpenBtn.addEventListener('click', (e) => {
      e.preventDefault();
      openModal();
    });
  }

  if (modalCloseBtn) {
    modalCloseBtn.addEventListener('click', closeModal);
  }

  if (modalOverlay) {
    modalOverlay.addEventListener('click', (e) => {
      if (e.target === modalOverlay) {
        closeModal();
      }
    });

    // Tecla Escape para cerrar
    window.addEventListener('keydown', (e) => {
      if (e.key === 'Escape' && modalOverlay.classList.contains('active')) {
        closeModal();
      }
    });
  }

  // --- Lightbox: Vista Ampliada de Ishikawa ---
  const ishikawaTrigger = document.getElementById('ishikawaTrigger');
  const ishikawaLightbox = document.getElementById('ishikawaLightbox');
  const lightboxCloseBtn = ishikawaLightbox ? ishikawaLightbox.querySelector('.lightbox-close-btn') : null;

  function openLightbox() {
    if (ishikawaLightbox) {
      ishikawaLightbox.classList.add('active');
      if (ishikawaTrigger) {
        ishikawaTrigger.setAttribute('aria-expanded', 'true');
      }
      document.body.style.overflow = 'hidden';
      if (lightboxCloseBtn) {
        lightboxCloseBtn.focus();
      }
    }
  }

  function closeLightbox() {
    if (ishikawaLightbox) {
      ishikawaLightbox.classList.remove('active');
      if (ishikawaTrigger) {
        ishikawaTrigger.setAttribute('aria-expanded', 'false');
        ishikawaTrigger.focus();
      }
      document.body.style.overflow = '';
    }
  }

  if (ishikawaTrigger) {
    // Abrir con clic
    ishikawaTrigger.addEventListener('click', (e) => {
      e.preventDefault();
      openLightbox();
    });

    // Abrir con teclado (Enter o Espacio)
    ishikawaTrigger.addEventListener('keydown', (e) => {
      if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault();
        openLightbox();
      }
    });
  }

  if (lightboxCloseBtn) {
    lightboxCloseBtn.addEventListener('click', (e) => {
      e.preventDefault();
      closeLightbox();
    });
  }

  if (ishikawaLightbox) {
    // Cerrar al hacer clic en el fondo oscuro fuera de la imagen
    ishikawaLightbox.addEventListener('click', (e) => {
      if (e.target === ishikawaLightbox || e.target.classList.contains('lightbox-content')) {
        closeLightbox();
      }
    });

    // Cerrar con la tecla Escape
    window.addEventListener('keydown', (e) => {
      if (e.key === 'Escape' && ishikawaLightbox.classList.contains('active')) {
        closeLightbox();
      }
    });
  }

  // --- Módulo Financiero: Fuente Única de Datos Presupuestales y Sincronización Automática ---
  const BUDGET_DATA = {
    tech: {
      key: 'tech',
      name: 'Estrategia Tecnológica',
      capex: 359900,
      opexMonthly: 50000,
      get opexAnnual() { return this.opexMonthly * 12; },
      get yearOneTotal() { return this.capex + this.opexAnnual; },
      get capexPercent() { return Number(((this.capex / this.yearOneTotal) * 100).toFixed(1)); },
      get opexPercent() { return Number(((this.opexAnnual / this.yearOneTotal) * 100).toFixed(1)); }
    },
    env: {
      key: 'env',
      name: 'Estrategia Ambiental',
      capex: 469800,
      opexMonthly: 39900,
      get opexAnnual() { return this.opexMonthly * 12; },
      get yearOneTotal() { return this.capex + this.opexAnnual; },
      get capexPercent() { return Number(((this.capex / this.yearOneTotal) * 100).toFixed(1)); },
      get opexPercent() { return Number(((this.opexAnnual / this.yearOneTotal) * 100).toFixed(1)); }
    },
    ops: {
      key: 'ops',
      name: 'Estrategia Operacional',
      capex: 65800,
      opexMonthly: 40000,
      get opexAnnual() { return this.opexMonthly * 12; },
      get yearOneTotal() { return this.capex + this.opexAnnual; },
      get capexPercent() { return Number(((this.capex / this.yearOneTotal) * 100).toFixed(1)); },
      get opexPercent() { return Number(((this.opexAnnual / this.yearOneTotal) * 100).toFixed(1)); }
    },
    get totalCapex() {
      return this.tech.capex + this.env.capex + this.ops.capex;
    },
    get totalOpexMonthly() {
      return this.tech.opexMonthly + this.env.opexMonthly + this.ops.opexMonthly;
    },
    get totalOpexAnnual() {
      return this.totalOpexMonthly * 12;
    },
    get totalYearOne() {
      return this.totalCapex + this.totalOpexAnnual;
    }
  };

  function calculateBudgetSummary() {
    const formatCOP = (val) => '$ ' + val.toLocaleString('es-CO');
    const formatCOPFull = (val) => '$ ' + val.toLocaleString('es-CO') + ' COP';

    // 1. Tarjetas Superiores (Panel Ejecutivo Financiero)
    const capexDisplay = document.getElementById('capexTotalDisplay');
    const opexDisplay = document.getElementById('opexMonthlyDisplay');
    const yearOneDisplay = document.getElementById('yearOneTotalDisplay');

    if (capexDisplay) {
      capexDisplay.textContent = formatCOP(BUDGET_DATA.totalCapex);
      capexDisplay.classList.remove('value-pending');
    }
    if (opexDisplay) {
      opexDisplay.textContent = formatCOP(BUDGET_DATA.totalOpexMonthly);
      opexDisplay.classList.remove('value-pending');
    }
    if (yearOneDisplay) {
      yearOneDisplay.textContent = formatCOP(BUDGET_DATA.totalYearOne);
      yearOneDisplay.classList.remove('value-pending');
    }

    // 2. Resumen Consolidado debajo de la Tabla
    const summaryTechTotal = document.getElementById('summaryTechTotal');
    const summaryTechSub = document.getElementById('summaryTechSub');
    if (summaryTechTotal) summaryTechTotal.textContent = formatCOPFull(BUDGET_DATA.tech.yearOneTotal);
    if (summaryTechSub) {
      summaryTechSub.textContent = `CAPEX: ${formatCOP(BUDGET_DATA.tech.capex)} · OPEX anual: ${formatCOP(BUDGET_DATA.tech.opexAnnual)}`;
    }

    const summaryEnvTotal = document.getElementById('summaryEnvTotal');
    const summaryEnvSub = document.getElementById('summaryEnvSub');
    if (summaryEnvTotal) summaryEnvTotal.textContent = formatCOPFull(BUDGET_DATA.env.yearOneTotal);
    if (summaryEnvSub) {
      summaryEnvSub.textContent = `CAPEX: ${formatCOP(BUDGET_DATA.env.capex)} · OPEX anual: ${formatCOP(BUDGET_DATA.env.opexAnnual)}`;
    }

    const summaryOpsTotal = document.getElementById('summaryOpsTotal');
    const summaryOpsSub = document.getElementById('summaryOpsSub');
    if (summaryOpsTotal) summaryOpsTotal.textContent = formatCOPFull(BUDGET_DATA.ops.yearOneTotal);
    if (summaryOpsSub) {
      summaryOpsSub.textContent = `CAPEX: ${formatCOP(BUDGET_DATA.ops.capex)} · OPEX anual: ${formatCOP(BUDGET_DATA.ops.opexAnnual)}`;
    }

    const summaryCapexTotal = document.getElementById('summaryCapexTotal');
    if (summaryCapexTotal) summaryCapexTotal.textContent = formatCOPFull(BUDGET_DATA.totalCapex);

    const summaryYearOneTotal = document.getElementById('summaryYearOneTotal');
    const summaryYearOneSub = document.getElementById('summaryYearOneSub');
    if (summaryYearOneTotal) summaryYearOneTotal.textContent = formatCOPFull(BUDGET_DATA.totalYearOne);
    if (summaryYearOneSub) {
      summaryYearOneSub.textContent = `CAPEX (${formatCOP(BUDGET_DATA.totalCapex)}) + OPEX anual (${formatCOP(BUDGET_DATA.totalOpexAnnual)})`;
    }

    // 3. Gráfico de Barras Horizontales Comparativas (CAPEX vs OPEX anual)
    ['tech', 'env', 'ops'].forEach(stratKey => {
      const strat = BUDGET_DATA[stratKey];
      const barItem = document.querySelector(`.hbar-item[data-strategy="${stratKey}"]`);
      if (!barItem) return;

      const capexBar = barItem.querySelector('.capex-bar');
      const opexBar = barItem.querySelector('.opex-bar');
      const badge = barItem.querySelector('.hbar-status-badge span');
      const subtext = barItem.querySelector('.hbar-subtext');

      if (capexBar) {
        capexBar.style.width = `${strat.capexPercent}%`;
        capexBar.setAttribute('title', `CAPEX: ${formatCOPFull(strat.capex)} (${strat.capexPercent}%)`);
      }
      if (opexBar) {
        opexBar.style.width = `${strat.opexPercent}%`;
        opexBar.setAttribute('title', `OPEX Anual: ${formatCOPFull(strat.opexAnnual)} (${strat.opexPercent}%)`);
      }
      if (badge) {
        badge.textContent = `${strat.capexPercent}% / ${strat.opexPercent}%`;
      }
      if (subtext) {
        subtext.textContent = `${formatCOP(strat.capex)} (CAPEX) / ${formatCOP(strat.opexAnnual)} (OPEX anual)`;
      }
    });

    // 4. Conexión del valor CAPEX en el Tablero de KPIs
    const kpiCapexVal = document.getElementById('kpiCapexVal');
    if (kpiCapexVal) {
      kpiCapexVal.textContent = formatCOP(BUDGET_DATA.totalCapex);
    }
  }

  // Inicializar sincronización del módulo presupuestal
  calculateBudgetSummary();

  // --- Módulo de KPIs: Sistema Dinámico de Registro y Cálculo del Piloto ---
  function initKpiDynamicSystem() {
    const toggleBtn = document.getElementById('toggleKpiLoggerBtn');
    const drawer = document.getElementById('kpiLoggerDrawer');
    if (toggleBtn && drawer) {
      toggleBtn.addEventListener('click', () => {
        const isHidden = drawer.style.display === 'none' || drawer.style.display === '';
        drawer.style.display = isHidden ? 'block' : 'none';
        toggleBtn.setAttribute('aria-expanded', isHidden ? 'true' : 'false');
      });
    }

    const fefoValid = document.getElementById('fefoValidCount');
    const fefoTotal = document.getElementById('fefoTotalCount');
    const fefoCalcDisplay = document.getElementById('fefoCalculatedVal');

    const invValid = document.getElementById('invValidUnits');
    const invTotal = document.getElementById('invTotalUnits');
    const invCalcDisplay = document.getElementById('invCalculatedVal');

    const stayRecorded = document.getElementById('stayRecordedMin');

    function computeFefo() {
      if (!fefoValid || !fefoTotal || !fefoCalcDisplay) return null;
      const valid = parseFloat(fefoValid.value);
      const total = parseFloat(fefoTotal.value);
      if (!isNaN(valid) && !isNaN(total) && total > 0 && valid <= total) {
        const pct = (valid / total) * 100;
        fefoCalcDisplay.textContent = `${pct.toFixed(1)} %`;
        return pct;
      }
      fefoCalcDisplay.textContent = 'Sin calcular';
      return null;
    }

    function computeInv() {
      if (!invValid || !invTotal || !invCalcDisplay) return null;
      const valid = parseFloat(invValid.value);
      const total = parseFloat(invTotal.value);
      if (!isNaN(valid) && !isNaN(total) && total > 0 && valid <= total) {
        const pct = (valid / total) * 100;
        invCalcDisplay.textContent = `${pct.toFixed(1)} %`;
        return pct;
      }
      invCalcDisplay.textContent = 'Sin calcular';
      return null;
    }

    if (fefoValid && fefoTotal) {
      fefoValid.addEventListener('input', computeFefo);
      fefoTotal.addEventListener('input', computeFefo);
    }

    if (invValid && invTotal) {
      invValid.addEventListener('input', computeInv);
      invTotal.addEventListener('input', computeInv);
    }

    const applyBtn = document.getElementById('applyKpiDataBtn');
    const resetBtn = document.getElementById('resetKpiDataBtn');

    if (applyBtn) {
      applyBtn.addEventListener('click', () => {
        const fefoPct = computeFefo();
        const invPct = computeInv();

        const kpiFefoVal = document.getElementById('kpiFefoVal');
        const kpiFefoDesc = document.getElementById('kpiFefoDesc');
        const badgeFefo = document.getElementById('badgeFefo');
        if (fefoPct !== null && kpiFefoVal && badgeFefo) {
          kpiFefoVal.textContent = `${fefoPct.toFixed(1)} %`;
          kpiFefoVal.classList.remove('val-pending');
          if (kpiFefoDesc) {
            kpiFefoDesc.textContent = 'Resultado real (Meta: 100 %)';
          }
          badgeFefo.textContent = `Medido (${fefoPct.toFixed(1)} %)`;
          badgeFefo.className = 'status-pill pill-measured';
        }

        const kpiInvVal = document.getElementById('kpiInventoryAccuracyVal');
        const kpiInvDesc = document.getElementById('kpiInventoryAccuracyDesc');
        const badgeInv = document.getElementById('badgeInventoryAccuracy');
        if (invPct !== null && kpiInvVal && badgeInv) {
          kpiInvVal.textContent = `${invPct.toFixed(1)} %`;
          kpiInvVal.classList.remove('val-pending');
          if (kpiInvDesc) {
            kpiInvDesc.textContent = 'Resultado real (Meta: ≥98 %)';
          }
          badgeInv.textContent = `Medido (${invPct.toFixed(1)} %)`;
          badgeInv.className = 'status-pill pill-measured';
        }

        const kpiStayAvg = document.getElementById('kpiStayAvgVal');
        if (stayRecorded && stayRecorded.value.trim() !== '' && kpiStayAvg) {
          const stayVal = parseFloat(stayRecorded.value);
          if (!isNaN(stayVal) && stayVal > 0) {
            kpiStayAvg.textContent = `${stayVal.toFixed(2).replace('.', ',')} min`;
          }
        }
      });
    }

    if (resetBtn) {
      resetBtn.addEventListener('click', () => {
        if (fefoValid) fefoValid.value = '';
        if (fefoTotal) fefoTotal.value = '';
        if (fefoCalcDisplay) fefoCalcDisplay.textContent = 'Sin calcular';

        if (invValid) invValid.value = '';
        if (invTotal) invTotal.value = '';
        if (invCalcDisplay) invCalcDisplay.textContent = 'Sin calcular';

        if (stayRecorded) stayRecorded.value = '';

        const kpiFefoVal = document.getElementById('kpiFefoVal');
        const kpiFefoDesc = document.getElementById('kpiFefoDesc');
        const badgeFefo = document.getElementById('badgeFefo');
        if (kpiFefoVal && badgeFefo) {
          kpiFefoVal.textContent = '100 %';
          kpiFefoVal.classList.add('val-pending');
          if (kpiFefoDesc) kpiFefoDesc.textContent = 'Meta propuesta';
          badgeFefo.textContent = 'Resultado por medir';
          badgeFefo.className = 'status-pill pill-pending';
        }

        const kpiInvVal = document.getElementById('kpiInventoryAccuracyVal');
        const kpiInvDesc = document.getElementById('kpiInventoryAccuracyDesc');
        const badgeInv = document.getElementById('badgeInventoryAccuracy');
        if (kpiInvVal && badgeInv) {
          kpiInvVal.textContent = '≥98 %';
          kpiInvVal.classList.add('val-pending');
          if (kpiInvDesc) kpiInvDesc.textContent = 'Meta propuesta';
          badgeInv.textContent = 'Resultado por medir';
          badgeInv.className = 'status-pill pill-pending';
        }

        const kpiStayAvg = document.getElementById('kpiStayAvgVal');
        if (kpiStayAvg) {
          kpiStayAvg.textContent = '5,14 min';
        }
      });
    }
  }

  initKpiDynamicSystem();

  // --- Módulo: Matriz Dinámica de Riesgos Operacionales ---
  function initRiskMatrixDynamicSystem() {
    const risks = {
      R1: { prob: 4, impact: 5, name: 'Acumulación prolongada y deterioro del producto' },
      R2: { prob: 3, impact: 4, name: 'Saturación de capacidad de los racks' },
      R3: { prob: 3, impact: 3, name: 'Errores de ubicación e identificación' }
    };

    function getLevelInfo(score) {
      if (score >= 17) {
        return { key: 'critico', label: 'Crítico', pillClass: 'badge-critico', idClass: 'id-critico' };
      } else if (score >= 10) {
        return { key: 'alto', label: 'Alto', pillClass: 'badge-alto', idClass: 'id-alto' };
      } else if (score >= 6) {
        return { key: 'moderado', label: 'Moderado', pillClass: 'badge-moderado', idClass: 'id-moderado' };
      } else if (score >= 3) {
        return { key: 'bajo', label: 'Bajo', pillClass: 'badge-bajo', idClass: 'id-bajo' };
      } else {
        return { key: 'muy-bajo', label: 'Muy bajo', pillClass: 'badge-muy-bajo', idClass: 'id-muy-bajo' };
      }
    }

    function updateRiskUI(riskId) {
      const risk = risks[riskId];
      if (!risk) return;

      const score = risk.prob * risk.impact;
      const levelInfo = getLevelInfo(score);

      // 1. Actualizar Badge de Nivel en la tabla
      const badge = document.getElementById(`riskBadge-${riskId}`);
      if (badge) {
        badge.textContent = `${levelInfo.label} (${score})`;
        badge.className = `risk-level-badge ${levelInfo.pillClass}`;
      }

      // 2. Actualizar ID Pill en la tabla
      const idPill = document.getElementById(`riskIdPill-${riskId}`);
      if (idPill) {
        idPill.className = `risk-id-pill ${levelInfo.idClass}`;
      }

      // 3. Mover Pin en el Mapa de Calor
      let pin = document.getElementById(`pin-${riskId}`);
      if (!pin) {
        pin = document.createElement('span');
        pin.id = `pin-${riskId}`;
        pin.className = 'hm-risk-pin';
        pin.textContent = riskId;
      }
      pin.setAttribute('title', `${riskId}: ${risk.name} (P=${risk.prob}, I=${risk.impact}, Score=${score})`);

      const targetCell = document.querySelector(`.hm-cell[data-row="${risk.prob}"][data-col="${risk.impact}"]`);
      if (targetCell) {
        targetCell.appendChild(pin);
      }

      // 4. Actualizar Resumen Numérico por Categoría
      updateSummaryCounts();
    }

    function updateSummaryCounts() {
      const counts = {
        critico: 0,
        alto: 0,
        moderado: 0,
        bajo: 0,
        'muy-bajo': 0
      };

      Object.keys(risks).forEach(id => {
        const r = risks[id];
        const score = r.prob * r.impact;
        const info = getLevelInfo(score);
        counts[info.key]++;
      });

      const countCrit = document.getElementById('summaryCountCritico');
      const countAlt = document.getElementById('summaryCountAlto');
      const countMod = document.getElementById('summaryCountModerado');
      const countBaj = document.getElementById('summaryCountBajo');
      const countMuyBaj = document.getElementById('summaryCountMuyBajo');
      const totalDisplay = document.getElementById('summaryTotalRisks');

      if (countCrit) countCrit.textContent = counts.critico;
      if (countAlt) countAlt.textContent = counts.alto;
      if (countMod) countMod.textContent = counts.moderado;
      if (countBaj) countBaj.textContent = counts.bajo;
      if (countMuyBaj) countMuyBaj.textContent = counts['muy-bajo'];
      if (totalDisplay) totalDisplay.textContent = Object.keys(risks).length;
    }

    // Escuchar cambios en los selectores de la tabla
    const selects = document.querySelectorAll('.risk-select-score');
    selects.forEach(sel => {
      sel.addEventListener('change', (e) => {
        const riskId = e.target.getAttribute('data-risk-id');
        const param = e.target.getAttribute('data-param');
        const val = parseInt(e.target.value, 10);

        if (risks[riskId] && (param === 'prob' || param === 'impact')) {
          risks[riskId][param] = val;
          updateRiskUI(riskId);
        }
      });
    });

    // Botón de restablecimiento
    const resetBtn = document.getElementById('resetRiskMatrixBtn');
    if (resetBtn) {
      resetBtn.addEventListener('click', () => {
        risks.R1.prob = 4;
        risks.R1.impact = 5;

        risks.R2.prob = 3;
        risks.R2.impact = 4;

        risks.R3.prob = 3;
        risks.R3.impact = 3;

        document.querySelectorAll('.risk-select-score').forEach(sel => {
          const rId = sel.getAttribute('data-risk-id');
          const p = sel.getAttribute('data-param');
          if (risks[rId] && risks[rId][p]) {
            sel.value = String(risks[rId][p]);
          }
        });

        Object.keys(risks).forEach(updateRiskUI);
      });
    }

    // Inicializar visualización de riesgos
    Object.keys(risks).forEach(updateRiskUI);
  }

  initRiskMatrixDynamicSystem();

  // --- Manejo del Hash Inicial y Botones Atrás/Adelante del Navegador ---
  function handleUrlHash() {
    const hash = window.location.hash.replace('#', '');
    if (hash && validSections.includes(hash)) {
      navigateToSection(hash, false);
    } else {
      navigateToSection('inicio', false);
    }
  }

  window.addEventListener('popstate', handleUrlHash);
  // Ejecución en la carga inicial
  handleUrlHash();

  // =============================================================================
  // ASISTENTE VIRTUAL INTERACTIVO CON VAQUITA 3D Y WHATSAPP
  // =============================================================================
  /**
   * DATOS PENDIENTES DE CONFIGURACIÓN PERSONALIZADA:
   * 
   * 1. NÚMERO DE WHATSAPP:
   *    Ingresa el número con código de país sin el signo '+', espacios ni guiones.
   *    Ejemplo Colombia: '573001234567'
   *    Si se deja vacío (''), WhatsApp abrirá el selector de contactos con el mensaje ya listo.
   */
  const ASISTENTE_WHATSAPP_NUMERO = '573208403326';

  /**
   * 2. RUTAS DE LAS IMÁGENES DE LA MASCOTA 3D:
   *    - ASISTENTE_IMG_RUTA_IDLE: Postura original en reposo (asistente cerrado).
   *    - ASISTENTE_IMG_RUTA_FRONTAL: Postura frontal de bienvenida (asistente abierto).
   *    Se precarga la segunda imagen para garantizar una transición suave e instantánea.
   */
  const ASISTENTE_IMG_RUTA_IDLE = 'assets/img/asistente-vaca.png';
  const ASISTENTE_IMG_RUTA_FRONTAL = 'assets/img/asistente-vaca-frontal.png'; // <-- [PENDIENTE]: Incorporar render 3D frontal

  // Elementos del Asistente
  const cowAssistantContainer = document.getElementById('cowAssistantContainer');
  const cowMascotTrigger = document.getElementById('cowMascotTrigger');
  const cowAssistantChat = document.getElementById('cowAssistantChat');
  const assistantCloseBtn = document.getElementById('assistantCloseBtn');
  const assistantSuggestionForm = document.getElementById('assistantSuggestionForm');
  const assistantSuggestionInput = document.getElementById('assistantSuggestionInput');
  const assistantValidationMsg = document.getElementById('assistantValidationMsg');
  const cowMascotImgIdle = document.getElementById('cowMascotImgIdle');
  const cowMascotImgActive = document.getElementById('cowMascotImgActive');
  const avatarImg = document.querySelector('.assistant-avatar-img');

  // Sincronizar ruta de imagen original si difiere
  if (avatarImg && avatarImg.getAttribute('src') !== ASISTENTE_IMG_RUTA_IDLE) {
    avatarImg.src = ASISTENTE_IMG_RUTA_IDLE;
  }
  if (cowMascotImgIdle && cowMascotImgIdle.getAttribute('src') !== ASISTENTE_IMG_RUTA_IDLE) {
    cowMascotImgIdle.src = ASISTENTE_IMG_RUTA_IDLE;
  }

  // Precarga asíncrona de la postura frontal para transición inmediata
  let isFrontalImgReady = false;
  if (ASISTENTE_IMG_RUTA_FRONTAL) {
    const frontalPreloader = new Image();
    frontalPreloader.onload = () => {
      isFrontalImgReady = true;
      if (cowAssistantContainer) {
        cowAssistantContainer.classList.add('has-frontal-img');
      }
      if (cowMascotImgActive && cowMascotImgActive.getAttribute('src') !== ASISTENTE_IMG_RUTA_FRONTAL) {
        cowMascotImgActive.src = ASISTENTE_IMG_RUTA_FRONTAL;
      }
    };
    frontalPreloader.onerror = () => {
      isFrontalImgReady = false;
      if (cowAssistantContainer) {
        cowAssistantContainer.classList.remove('has-frontal-img');
      }
      console.info(
        '[Lácteos en Movimiento] Asistente virtual: la imagen frontal "' +
        ASISTENTE_IMG_RUTA_FRONTAL +
        '" no se encuentra en el repositorio aún. Se conserva la mascota original en ambos estados.'
      );
    };
    frontalPreloader.src = ASISTENTE_IMG_RUTA_FRONTAL;
  }

  /**
   * Abre la ventana de chat del asistente y activa la postura frontal
   */
  function openAssistantChat() {
    if (!cowAssistantChat) return;

    // Activar estado abierto en el contenedor de la mascota
    if (cowAssistantContainer) {
      cowAssistantContainer.classList.add('is-chat-open');
    }

    cowAssistantChat.removeAttribute('hidden');
    // Forzar reflow para que la animación CSS se active suavemente
    void cowAssistantChat.offsetWidth;
    cowAssistantChat.classList.add('is-active');

    if (cowMascotTrigger) {
      cowMascotTrigger.setAttribute('aria-expanded', 'true');
    }
    if (assistantSuggestionInput) {
      assistantSuggestionInput.focus();
    }
  }

  /**
   * Cierra la ventana de chat del asistente y restaura la postura original
   */
  function closeAssistantChat() {
    if (!cowAssistantChat) return;

    // Restaurar postura original de reposo y reactivar flotación
    if (cowAssistantContainer) {
      cowAssistantContainer.classList.remove('is-chat-open');
    }

    cowAssistantChat.classList.remove('is-active');
    if (cowMascotTrigger) {
      cowMascotTrigger.setAttribute('aria-expanded', 'false');
    }
    if (assistantValidationMsg) {
      assistantValidationMsg.setAttribute('hidden', '');
    }
    if (assistantSuggestionInput) {
      assistantSuggestionInput.classList.remove('has-error');
    }
    setTimeout(() => {
      if (!cowAssistantChat.classList.contains('is-active')) {
        cowAssistantChat.setAttribute('hidden', '');
      }
    }, 300);
  }

  // Toggle al hacer clic en la mascota
  if (cowMascotTrigger) {
    cowMascotTrigger.addEventListener('click', (e) => {
      e.stopPropagation();
      const isOpen = cowAssistantChat && cowAssistantChat.classList.contains('is-active');
      if (isOpen) {
        closeAssistantChat();
      } else {
        openAssistantChat();
      }
    });
  }

  // Cerrar al hacer clic en el botón de cerrar
  if (assistantCloseBtn) {
    assistantCloseBtn.addEventListener('click', (e) => {
      e.stopPropagation();
      closeAssistantChat();
    });
  }

  // Evitar que clics dentro de la ventana la cierren
  if (cowAssistantChat) {
    cowAssistantChat.addEventListener('click', (e) => {
      e.stopPropagation();
    });
  }

  // Cerrar al hacer clic fuera de la ventana
  document.addEventListener('click', (e) => {
    if (cowAssistantChat && cowAssistantChat.classList.contains('is-active')) {
      if (!cowAssistantChat.contains(e.target) && !cowMascotTrigger.contains(e.target)) {
        closeAssistantChat();
      }
    }
  });

  // Cerrar con la tecla Escape
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && cowAssistantChat && cowAssistantChat.classList.contains('is-active')) {
      closeAssistantChat();
      if (cowMascotTrigger) {
        cowMascotTrigger.focus();
      }
    }
  });

  // Limpiar error al escribir en el campo y permitir envío con Enter
  if (assistantSuggestionInput) {
    assistantSuggestionInput.addEventListener('input', () => {
      if (assistantSuggestionInput.value.trim().length > 0) {
        if (assistantValidationMsg) assistantValidationMsg.setAttribute('hidden', '');
        assistantSuggestionInput.classList.remove('has-error');
      }
    });

    assistantSuggestionInput.addEventListener('keydown', (e) => {
      if (e.key === 'Enter' && !e.shiftKey) {
        e.preventDefault();
        if (assistantSuggestionForm) {
          if (typeof assistantSuggestionForm.requestSubmit === 'function') {
            assistantSuggestionForm.requestSubmit();
          } else {
            assistantSuggestionForm.dispatchEvent(new Event('submit', { cancelable: true }));
          }
        }
      }
    });
  }

  // Envío de la sugerencia por WhatsApp
  if (assistantSuggestionForm) {
    assistantSuggestionForm.addEventListener('submit', (e) => {
      e.preventDefault();
      const rawText = assistantSuggestionInput ? assistantSuggestionInput.value.trim() : '';

      // Validación de campo vacío
      if (!rawText) {
        if (assistantValidationMsg) assistantValidationMsg.removeAttribute('hidden');
        if (assistantSuggestionInput) {
          assistantSuggestionInput.classList.add('has-error');
          assistantSuggestionInput.focus();
        }
        return;
      }

      // Estructuración del mensaje con el encabezado solicitado
      const headerPrefix = 'Sugerencia para Lácteos en Movimiento – Tarea 4 UNAD:';
      const fullMessage = `${headerPrefix}\n\n«${rawText}»\n\n(Enviado desde el portal web académico Lácteos en Movimiento)`;

      // Construcción del enlace seguro con encodeURIComponent()
      const encodedMsg = encodeURIComponent(fullMessage);
      const cleanPhone = (ASISTENTE_WHATSAPP_NUMERO || '').replace(/[^\d]/g, '');
      const waUrl = cleanPhone 
        ? `https://wa.me/${cleanPhone}?text=${encodedMsg}`
        : `https://wa.me/?text=${encodedMsg}`;

      // Abrir WhatsApp en pestaña nueva para confirmación del usuario
      window.open(waUrl, '_blank', 'noopener,noreferrer');

      // Limpiar y cerrar ventana
      assistantSuggestionInput.value = '';
      closeAssistantChat();
    });
  }
});

