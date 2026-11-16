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

  // --- Módulo Financiero: Cálculo Presupuestal Automático (Solo con valores sustentados) ---
  function calculateBudgetSummary() {
    const table = document.getElementById('budgetTable');
    if (!table) return;

    const rows = table.querySelectorAll('tbody tr');
    let totalCapex = 0;
    let totalOpexMonthly = 0;
    let hasCapexNumeric = false;
    let hasOpexNumeric = false;

    rows.forEach(row => {
      const capexVal = parseFloat(row.getAttribute('data-capex') || '0');
      const opexVal = parseFloat(row.getAttribute('data-opex') || '0');

      if (!isNaN(capexVal) && capexVal > 0) {
        totalCapex += capexVal;
        hasCapexNumeric = true;
      }
      if (!isNaN(opexVal) && opexVal > 0) {
        totalOpexMonthly += opexVal;
        hasOpexNumeric = true;
      }
    });

    const capexDisplay = document.getElementById('capexTotalDisplay');
    const opexDisplay = document.getElementById('opexMonthlyDisplay');
    const yearOneDisplay = document.getElementById('yearOneTotalDisplay');

    const formatCurrency = (val) => {
      return '$ ' + val.toLocaleString('es-CO') + ' COP';
    };

    if (hasCapexNumeric && capexDisplay) {
      capexDisplay.textContent = formatCurrency(totalCapex);
    }
    if (hasOpexNumeric && opexDisplay) {
      opexDisplay.textContent = formatCurrency(totalOpexMonthly) + ' / mes';
    }
    if ((hasCapexNumeric || hasOpexNumeric) && yearOneDisplay) {
      const yearOneTotal = totalCapex + (totalOpexMonthly * 12);
      yearOneDisplay.textContent = formatCurrency(yearOneTotal);
    }
  }

  // Inicializar cálculo si existen datos
  calculateBudgetSummary();

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

