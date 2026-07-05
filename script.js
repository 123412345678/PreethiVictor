/* ============================================================
   AML ANALYST PORTFOLIO — SCRIPT
   ============================================================ */

document.addEventListener('DOMContentLoaded', () => {

  /* ---------- Footer year ---------- */
  const yearEl = document.getElementById('year');
  if (yearEl) yearEl.textContent = new Date().getFullYear();

  /* ---------- Loader ---------- */
  const loader = document.getElementById('loader');
  window.addEventListener('load', () => {
    setTimeout(() => loader && loader.classList.add('is-hidden'), 400);
  });
  // Fallback in case 'load' already fired
  setTimeout(() => loader && loader.classList.add('is-hidden'), 2200);

  /* ---------- Scroll progress bar ---------- */
  const scrollBar = document.getElementById('scrollBar');
  function updateScrollProgress(){
    const scrollTop = window.scrollY;
    const docHeight = document.documentElement.scrollHeight - window.innerHeight;
    const pct = docHeight > 0 ? (scrollTop / docHeight) * 100 : 0;
    if (scrollBar) scrollBar.style.width = pct + '%';
  }
  window.addEventListener('scroll', updateScrollProgress, { passive: true });
  updateScrollProgress();

  /* ---------- Header shrink on scroll ---------- */
  const siteHeader = document.getElementById('siteHeader');
  function onScrollHeader(){
    if (window.scrollY > 20) siteHeader.style.boxShadow = '0 8px 30px -12px rgba(0,0,0,0.5)';
    else siteHeader.style.boxShadow = 'none';
  }
  window.addEventListener('scroll', onScrollHeader, { passive: true });

  /* ---------- Mobile nav toggle ---------- */
  const navToggle = document.getElementById('navToggle');
  const navMenu = document.getElementById('navMenu');
  navToggle.addEventListener('click', () => {
    const isOpen = navMenu.classList.toggle('is-open');
    navToggle.classList.toggle('is-open', isOpen);
    navToggle.setAttribute('aria-expanded', isOpen);
    document.body.classList.toggle('no-scroll', isOpen);
  });
  navMenu.querySelectorAll('.nav__link').forEach(link => {
    link.addEventListener('click', () => {
      navMenu.classList.remove('is-open');
      navToggle.classList.remove('is-open');
      navToggle.setAttribute('aria-expanded', 'false');
      document.body.classList.remove('no-scroll');
    });
  });

  /* ---------- Active nav link on scroll ---------- */
  const sections = document.querySelectorAll('main section[id]');
  const navLinks = document.querySelectorAll('.nav__link');
  function setActiveLink(){
    let current = sections[0] ? sections[0].id : '';
    const offset = 140;
    sections.forEach(sec => {
      if (window.scrollY >= sec.offsetTop - offset) current = sec.id;
    });
    navLinks.forEach(link => {
      link.classList.toggle('is-active', link.getAttribute('href') === '#' + current);
    });
  }
  window.addEventListener('scroll', setActiveLink, { passive: true });
  setActiveLink();

  /* ---------- Typing effect ---------- */
  const typingTarget = document.getElementById('typingTarget');
  const phrases = [
    'Senior AML Transaction Monitoring Analyst',
    'Financial Crime Compliance Professional',
    'KYC · CDD · EDD Specialist',
    'Correspondent Banking Surveillance Expert'
  ];
  let phraseIndex = 0, charIndex = 0, isDeleting = false;

  function typeLoop(){
    const current = phrases[phraseIndex];
    if (!isDeleting){
      charIndex++;
      typingTarget.textContent = current.slice(0, charIndex);
      if (charIndex === current.length){
        isDeleting = true;
        setTimeout(typeLoop, 1800);
        return;
      }
    } else {
      charIndex--;
      typingTarget.textContent = current.slice(0, charIndex);
      if (charIndex === 0){
        isDeleting = false;
        phraseIndex = (phraseIndex + 1) % phrases.length;
      }
    }
    setTimeout(typeLoop, isDeleting ? 35 : 60);
  }
  if (typingTarget) typeLoop();

  /* ---------- Animated stat counters ---------- */
  const statNums = document.querySelectorAll('.hero__stat-num');
  function animateCount(el){
    const target = parseInt(el.getAttribute('data-count'), 10) || 0;
    const duration = 1400;
    const start = performance.now();
    function tick(now){
      const progress = Math.min((now - start) / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      el.textContent = Math.round(eased * target).toLocaleString();
      if (progress < 1) requestAnimationFrame(tick);
      else el.textContent = target.toLocaleString();
    }
    requestAnimationFrame(tick);
  }
  const statObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting){
        animateCount(entry.target);
        statObserver.unobserve(entry.target);
      }
    });
  }, { threshold: 0.5 });
  statNums.forEach(el => statObserver.observe(el));

  /* ---------- Scroll reveal ---------- */
  const revealTargets = document.querySelectorAll(
    '.about__grid, .timeline__item, .skills__grid, .project, .learning__item, .contact__card, .section__title, .section__eyebrow'
  );
  revealTargets.forEach(el => el.classList.add('reveal'));
  const revealObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting){
        entry.target.classList.add('is-visible');
        revealObserver.unobserve(entry.target);
      }
    });
  }, { threshold: 0.12 });
  revealTargets.forEach(el => revealObserver.observe(el));

  /* ---------- Scroll to top button ---------- */
  const scrollTopBtn = document.getElementById('scrollTop');
  window.addEventListener('scroll', () => {
    scrollTopBtn.classList.toggle('is-visible', window.scrollY > 600);
  }, { passive: true });
  scrollTopBtn.addEventListener('click', () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  });

  /* ---------- Skills data ---------- */
  const technicalSkills = [
    'AML Transaction Monitoring', 'Financial Crime Surveillance', 'KYC', 'CDD',
    'Enhanced Due Diligence', 'Customer Risk Assessment', 'Transaction Analysis',
    'Alert Investigation', 'Suspicious Activity Identification', 'Correspondent Banking',
    'Non-Correspondent Banking', 'Sanctions Screening', 'Source of Funds Review',
    'Source of Wealth Review', 'Regulatory Compliance', 'Quality Assurance',
    'Investigation Documentation', 'Case Management', 'Risk Assessment',
    'Financial Crime Typologies'
  ];
  const professionalSkills = [
    'Analytical Thinking', 'Decision Making', 'Attention to Detail', 'Critical Thinking',
    'Communication', 'Mentoring', 'Stakeholder Collaboration', 'Problem Solving', 'Time Management'
  ];

  function renderSkills(list, containerId, softClass){
    const container = document.getElementById(containerId);
    if (!container) return;
    container.innerHTML = list.map(skill => `
      <div class="glass-card skill-card${softClass ? ' skill-card--soft' : ''}">${skill}</div>
    `).join('');
  }
  renderSkills(technicalSkills, 'technicalSkills', false);
  renderSkills(professionalSkills, 'professionalSkills', true);

  /* ---------- Hero network diagram (signature element) ---------- */
  const svgNS = 'http://www.w3.org/2000/svg';
  const networkSvg = document.getElementById('networkSvg');
  if (networkSvg){
    const W = 1200, H = 800;
    const nodeCount = 22;
    const nodes = [];
    for (let i = 0; i < nodeCount; i++){
      nodes.push({
        x: Math.random() * W,
        y: Math.random() * H,
        r: 2 + Math.random() * 2.4
      });
    }

    // Connect each node to its nearest neighbors for a plausible "transaction network"
    function dist(a, b){ return Math.hypot(a.x - b.x, a.y - b.y); }
    const edges = [];
    nodes.forEach((node, i) => {
      const distances = nodes
        .map((other, j) => ({ j, d: dist(node, other) }))
        .filter(o => o.j !== i)
        .sort((a, b) => a.d - b.d)
        .slice(0, 2);
      distances.forEach(o => {
        const key = [i, o.j].sort().join('-');
        if (!edges.find(e => e.key === key)) edges.push({ key, a: i, b: o.j });
      });
    });

    const frag = document.createDocumentFragment();
    edges.forEach(edge => {
      const a = nodes[edge.a], b = nodes[edge.b];
      const line = document.createElementNS(svgNS, 'line');
      line.setAttribute('x1', a.x); line.setAttribute('y1', a.y);
      line.setAttribute('x2', b.x); line.setAttribute('y2', b.y);
      line.setAttribute('stroke', 'rgba(201,162,39,0.16)');
      line.setAttribute('stroke-width', '1');
      frag.appendChild(line);
    });
    nodes.forEach((node, i) => {
      const circle = document.createElementNS(svgNS, 'circle');
      circle.setAttribute('cx', node.x);
      circle.setAttribute('cy', node.y);
      circle.setAttribute('r', node.r);
      circle.setAttribute('fill', i % 5 === 0 ? 'rgba(228,193,87,0.85)' : 'rgba(170,180,196,0.45)');
      frag.appendChild(circle);

      // subtle pulse for a few "flagged" nodes
      if (i % 5 === 0){
        const pulse = document.createElementNS(svgNS, 'circle');
        pulse.setAttribute('cx', node.x);
        pulse.setAttribute('cy', node.y);
        pulse.setAttribute('r', node.r);
        pulse.setAttribute('fill', 'none');
        pulse.setAttribute('stroke', 'rgba(228,193,87,0.6)');
        pulse.setAttribute('stroke-width', '1');
        const animR = document.createElementNS(svgNS, 'animate');
        animR.setAttribute('attributeName', 'r');
        animR.setAttribute('values', `${node.r};${node.r + 12};${node.r}`);
        animR.setAttribute('dur', (3 + Math.random() * 2).toFixed(1) + 's');
        animR.setAttribute('repeatCount', 'indefinite');
        const animO = document.createElementNS(svgNS, 'animate');
        animO.setAttribute('attributeName', 'opacity');
        animO.setAttribute('values', '0.6;0;0.6');
        animO.setAttribute('dur', (3 + Math.random() * 2).toFixed(1) + 's');
        animO.setAttribute('repeatCount', 'indefinite');
        pulse.appendChild(animR);
        pulse.appendChild(animO);
        frag.appendChild(pulse);
      }
    });
    networkSvg.appendChild(frag);
  }

});
