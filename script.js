// Ajuste esta data para o dia em que vocês começaram a namorar
const RELATIONSHIP_START = new Date("2022-06-15T00:00:00"); // AAAA-MM-DD

// Itens da linha do tempo: personalize à vontade
const timelineItems = [
  {
    date: "15 jun 2022",
    title: "O começo de tudo",
    description:
      "O dia em que dissemos o primeiro 'sim' e tudo começou a fazer mais sentido. Um misto de frio na barriga com paz no coração.",
    image: "images/1.jpg",
  },
  {
    date: "30 ago 2022",
    title: "Nosso primeiro passeio",
    description:
      "Nos perdemos pela cidade, rimos de coisas bobas e voltamos pra casa com a certeza de que queremos nos perder juntos muitas vezes.",
    image: "images/2.jpg",
  },
  {
    date: "24 dez 2022",
    title: "Primeiro Natal juntos",
    description:
      "Família, comida boa, fotos estranhas e aquele abraço que faz qualquer lugar parecer casa.",
    image: "images/3.jpg",
  },
  {
    date: "10 mar 2023",
    title: "Nossa viagem inesquecível",
    description:
      "Entre fotos, paisagens e brincadeiras internas, a melhor parte sempre foi dividir tudo com você.",
    image: "images/4.jpg",
  },
];

const counterContainer = document.getElementById("relationship-counter");
const relationshipStartText = document.getElementById("relationship-start");

const imageEl = document.getElementById("timeline-image");
const dateEl = document.getElementById("timeline-date");
const titleEl = document.getElementById("timeline-title");
const descriptionEl = document.getElementById("timeline-description");
const indicatorsEl = document.getElementById("timeline-indicators");

const prevBtn = document.getElementById("prev-item");
const nextBtn = document.getElementById("next-item");

let currentIndex = 0;

function pad(value) {
  return String(value).padStart(2, "0");
}

function updateCounter() {
  const now = new Date();
  const diffMs = now.getTime() - RELATIONSHIP_START.getTime();

  if (diffMs <= 0) {
    counterContainer.innerHTML =
      '<p style="font-size:0.95rem;color:#e5e7eb;">A data de início ainda não chegou. Ajuste a data no código.</p>';
    return;
  }

  const totalSeconds = Math.floor(diffMs / 1000);
  const days = Math.floor(totalSeconds / (60 * 60 * 24));
  const hours = Math.floor((totalSeconds % (60 * 60 * 24)) / (60 * 60));
  const minutes = Math.floor((totalSeconds % (60 * 60)) / 60);
  const seconds = totalSeconds % 60;

  counterContainer.innerHTML = `
    <div class="counter-chip">
      <span class="value">${days}</span>
      <span class="label">dias</span>
    </div>
    <div class="counter-chip">
      <span class="value">${pad(hours)}</span>
      <span class="label">horas</span>
    </div>
    <div class="counter-chip">
      <span class="value">${pad(minutes)}</span>
      <span class="label">minutos</span>
    </div>
    <div class="counter-chip">
      <span class="value">${pad(seconds)}</span>
      <span class="label">segundos</span>
    </div>
  `;
}

function formatStartDate(date) {
  const day = pad(date.getDate());
  const month = pad(date.getMonth() + 1);
  const year = date.getFullYear();
  return `${day}/${month}/${year}`;
}

function renderIndicators(activeIndex) {
  indicatorsEl.innerHTML = "";
  timelineItems.forEach((_, idx) => {
    const dot = document.createElement("span");
    if (idx === activeIndex) {
      dot.classList.add("active");
    }
    indicatorsEl.appendChild(dot);
  });
}

function renderTimelineItem(index) {
  const item = timelineItems[index];
  if (!item) return;

  imageEl.src = item.image;
  imageEl.alt = item.title;
  dateEl.textContent = item.date;
  titleEl.textContent = item.title;
  descriptionEl.textContent = item.description;

  renderIndicators(index);
}

function showNext() {
  currentIndex = (currentIndex + 1) % timelineItems.length;
  renderTimelineItem(currentIndex);
}

function showPrev() {
  currentIndex = (currentIndex - 1 + timelineItems.length) % timelineItems.length;
  renderTimelineItem(currentIndex);
}

function init() {
  relationshipStartText.textContent = `Desde ${formatStartDate(RELATIONSHIP_START)}`;

  updateCounter();
  setInterval(updateCounter, 1000);

  renderTimelineItem(currentIndex);

  prevBtn.addEventListener("click", showPrev);
  nextBtn.addEventListener("click", showNext);

  document.addEventListener("keydown", (event) => {
    if (event.key === "ArrowRight") showNext();
    if (event.key === "ArrowLeft") showPrev();
  });
}

document.addEventListener("DOMContentLoaded", init);

