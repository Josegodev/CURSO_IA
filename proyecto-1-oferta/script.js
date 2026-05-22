const summary = {
  coste: 5941.23,
  venta: 7825.02,
  margen: 1408.52,
  partidas: 12
};

const chapters = [
  { nombre: "Canalizaciones", venta: 3591.37 },
  { nombre: "Cableado", venta: 2267.82 },
  { nombre: "Cuadros", venta: 962.9 },
  { nombre: "Telecomunicaciones", venta: 659.19 },
  { nombre: "Seguridad y PRL", venta: 122.49 },
  { nombre: "Documentacion", venta: 221.27 }
];

const partidas = [
  { codigo: "P-001", capitulo: "Canalizaciones", descripcion: "Bandeja perforada acero galvanizado 60x200", cantidad: "60 m", venta: 2191.95, riesgo: "Medio" },
  { codigo: "P-002", capitulo: "Canalizaciones", descripcion: "Tubo rigido PVC M32", cantidad: "120 m", venta: 803.27, riesgo: "Bajo" },
  { codigo: "P-003", capitulo: "Cableado", descripcion: "Cable RZ1-K 3G2,5", cantidad: "450 m", venta: 1146.3, riesgo: "Medio" },
  { codigo: "P-004", capitulo: "Cableado", descripcion: "Cable UTP Cat 6 LSZH", cantidad: "180 m", venta: 363.81, riesgo: "Alto" },
  { codigo: "P-005", capitulo: "Cuadros", descripcion: "Cuadro secundario 24 modulos", cantidad: "2 ud", venta: 872.24, riesgo: "Alto" },
  { codigo: "P-006", capitulo: "Cuadros", descripcion: "Diferencial 4P 40A 30mA", cantidad: "1 ud", venta: 90.65, riesgo: "Bajo" },
  { codigo: "P-007", capitulo: "Telecomunicaciones", descripcion: "Base RJ45 Cat 6", cantidad: "18 ud", venta: 345.3, riesgo: "Medio" },
  { codigo: "P-008", capitulo: "Telecomunicaciones", descripcion: "Rack mural 12U", cantidad: "1 ud", venta: 313.88, riesgo: "Bajo" },
  { codigo: "P-009", capitulo: "Seguridad y PRL", descripcion: "Medios auxiliares y PRL", cantidad: "1 ud", venta: 122.49, riesgo: "Medio" },
  { codigo: "P-010", capitulo: "Documentacion", descripcion: "Documentacion final y as-built", cantidad: "1 ud", venta: 221.27, riesgo: "Alto" },
  { codigo: "P-011", capitulo: "Canalizaciones", descripcion: "Bandeja rejiband 100x60", cantidad: "35 m", venta: 596.15, riesgo: "Medio" },
  { codigo: "P-012", capitulo: "Cableado", descripcion: "Cable manguera 5G6", cantidad: "90 m", venta: 757.7, riesgo: "Medio" }
];

const questions = [
  { id: "RFI-001", titulo: "Altura de montaje", texto: "Definir altura de instalacion y tipo de paramento para soportacion de bandejas.", prioridad: "Media", responsable: "Comercial/Tecnico" },
  { id: "RFI-002", titulo: "Certificacion de red", texto: "Confirmar si cada enlace Cat 6 debe entregarse con informe de medicion.", prioridad: "Alta", responsable: "Tecnico" },
  { id: "RFI-003", titulo: "Legalizacion", texto: "Aclarar si el cuadro incluye solo montaje o tambien legalizacion y esquema.", prioridad: "Alta", responsable: "Direccion tecnica" },
  { id: "RFI-004", titulo: "Electronica activa", texto: "Confirmar si switches, router o SAI quedan fuera del alcance.", prioridad: "Media", responsable: "Comercial" },
  { id: "RFI-005", titulo: "Medios auxiliares", texto: "Validar si existen trabajos en altura con necesidad de plataforma elevadora.", prioridad: "Media", responsable: "Produccion" },
  { id: "RFI-006", titulo: "Dossier final", texto: "Definir el contenido minimo del cierre documental y pruebas finales.", prioridad: "Alta", responsable: "Calidad" }
];

const euro = new Intl.NumberFormat("es-ES", {
  style: "currency",
  currency: "EUR",
  maximumFractionDigits: 2
});

function renderKpis() {
  const kpiGrid = document.getElementById("kpiGrid");
  const margenPct = (summary.margen / summary.venta) * 100;

  const items = [
    { label: "Venta total", value: euro.format(summary.venta) },
    { label: "Coste directo", value: euro.format(summary.coste) },
    { label: "Margen bruto", value: euro.format(summary.margen) },
    { label: "Margen bruto %", value: `${margenPct.toFixed(1)}%` }
  ];

  kpiGrid.innerHTML = items.map((item) => `
    <article class="kpi">
      <span class="kpi-label">${item.label}</span>
      <strong class="kpi-value">${item.value}</strong>
    </article>
  `).join("");
}

function renderChapters() {
  const chapterList = document.getElementById("chapterList");

  chapterList.innerHTML = chapters.map((chapter) => {
    const ratio = Math.max(6, (chapter.venta / summary.venta) * 100);
    return `
      <article class="chapter-item">
        <div>
          <strong>${chapter.nombre}</strong>
        </div>
        <div class="chapter-bar" aria-hidden="true">
          <span style="width: ${ratio}%;"></span>
        </div>
        <div class="chapter-amount">${euro.format(chapter.venta)}</div>
      </article>
    `;
  }).join("");
}

function badgeClass(riesgo) {
  return riesgo.toLowerCase();
}

function renderPartidas() {
  const partidasBody = document.getElementById("partidasBody");

  partidasBody.innerHTML = partidas.map((partida) => `
    <tr>
      <td>${partida.codigo}</td>
      <td>${partida.capitulo}</td>
      <td>${partida.descripcion}</td>
      <td>${partida.cantidad}</td>
      <td>${euro.format(partida.venta)}</td>
      <td><span class="badge ${badgeClass(partida.riesgo)}">${partida.riesgo}</span></td>
    </tr>
  `).join("");
}

function renderQuestions() {
  const questionGrid = document.getElementById("questionGrid");

  questionGrid.innerHTML = questions.map((question) => `
    <article class="question-card">
      <p class="eyebrow">${question.id}</p>
      <h3>${question.titulo}</h3>
      <p>${question.texto}</p>
      <div class="question-meta">
        <span>Prioridad: ${question.prioridad}</span>
        <span>${question.responsable}</span>
      </div>
    </article>
  `).join("");
}

// Navegacion movil y resaltado del enlace activo, alineado con el repo.
const navToggle = document.querySelector(".nav-toggle");
const navLinks = document.querySelector(".nav-links");
const menuLinks = document.querySelectorAll(".nav-links a");
const sections = document.querySelectorAll("main section[id]");

if (navToggle && navLinks) {
  navToggle.addEventListener("click", () => {
    const isOpen = navLinks.classList.toggle("open");
    navToggle.setAttribute("aria-expanded", String(isOpen));
  });
}

menuLinks.forEach((link) => {
  link.addEventListener("click", () => {
    if (!navLinks || !navToggle) {
      return;
    }

    navLinks.classList.remove("open");
    navToggle.setAttribute("aria-expanded", "false");
  });
});

const observer = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (!entry.isIntersecting) {
        return;
      }

      const activeLink = document.querySelector(`.nav-links a[href="#${entry.target.id}"]`);
      menuLinks.forEach((link) => link.classList.remove("active"));

      if (activeLink) {
        activeLink.classList.add("active");
      }
    });
  },
  {
    rootMargin: "-35% 0px -55% 0px",
    threshold: 0.01
  }
);

sections.forEach((section) => observer.observe(section));

renderKpis();
renderChapters();
renderPartidas();
renderQuestions();
