// Ajuste esta data para o dia em que vocês começaram a namorar
const RELATIONSHIP_START = new Date("2024-06-14T00:00:00"); // AAAA-MM-DD

// Itens da linha do tempo: personalize à vontade
const timelineItems = [
  {
    date: "26 maio 2024",
    title: "O começo de tudo",
    description:
      "Nosso primeiro encontro. Um filme horrível no cinema… mas a melhor história da minha vida começando ali. Duas horas em frente ao portão, conversando como se o mundo tivesse parado. Foi naquela noite que eu soube: era você.",
    image: "images/1.jpg",
  },
  {
    date: "01 jun 2024",
    title: "Nosso primeiro passeio",
    description:
      "Um dia simples no parque, conversas sem pressa, risadas, besteiras e jogos bobos. Mas por trás da leveza, algo grande estava acontecendo: eu estava entrando na sua vida… e você na minha. Conhecer sua família e te apresentar aos meus foi quando eu percebi que aquilo já era muito mais do que só um começo.",
    image: "images/2.jpg",
  },
  {
    date: "15 jun 2024",
    title: "O Pedido",
    description:
      "Um dia depois de te pedir em namoro, eu acordei com a maior certeza da minha vida: eu tinha feito a escolha certa. O jantar japonês foi só a comemoração, porque o momento mais importante já tinha acontecido. Na noite anterior, quando eu te pedi em namoro, eu soube que queria você pra tudo.",
    image: "images/3.jpg",
  },
  {
    date: "27 jul 2024",
    title: "O primeiro buque de flores",
    description:
      "O primeiro buquê de flores que eu te dei… mas longe de ser o último gesto. Nada no mundo paga o sorriso que você deu naquele dia. Eu amo te ver feliz, e prometo nunca poupar esforços para ser parte dessa felicidade.",
    image: "images/4.jpg",
  },

  {
    date: "31 dez 2024",
    title: "Primeiro final de ano juntos",
    description:
      "A primeira virada de ano juntos. Entre abraços, promessas e fogos no céu, eu fiz um pedido silencioso: que todos os próximos anos fossem com você. E ali eu tive ainda mais certeza de que era ao seu lado que eu queria viver cada novo começo.",
    image: "images/6.jpg",
  },
  {
    date: "20 jun 2025",
    title: "Mais um passeio",
    description:
      "Uma tarde de sol no zoológico e o seu sorriso iluminando tudo ainda mais. Não era só sobre os animais ou o passeio… era sobre te ver feliz daquele jeito. Dias simples, mas que ficaram gigantes na minha memória.",
    image: "images/7.jpg",
  },
  {
    date: "06 fev 2026",
    title: "Começo de um sonho",
    description:
      "Compramos nosso apartamento. Pode até demorar, mas ali começou algo muito maior que paredes e concreto. É o início do nosso lar, um lugar que vai ser preenchido com amor, carinho e todos os sonhos que estamos construindo juntos.",
    image: "images/8.jfif",
  },

];

const counterContainer = document.getElementById("relationship-counter");
const relationshipStartText = document.getElementById("relationship-start");

const imageEl = document.getElementById("timeline-image");
const dateEl = document.getElementById("timeline-date");
const titleEl = document.getElementById("timeline-title");
const descriptionEl = document.getElementById("timeline-description");
const indicatorsEl = document.getElementById("timeline-indicators");
const readMoreBtn = document.getElementById("timeline-read-more");

const prevBtn = document.getElementById("prev-item");
const nextBtn = document.getElementById("next-item");
const openStoryBtn = document.querySelector("#open-story");
const storyOverlay = document.getElementById("story-overlay");
const storyClose = document.getElementById("story-close");

let currentIndex = 0;
let isDescriptionExpanded = false;

function isMobileViewport() {
  return window.innerWidth <= 640;
}

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

  isDescriptionExpanded = false;
  descriptionEl.classList.remove("clamped");
  readMoreBtn.classList.remove("visible");

  // Aguarda o layout para decidir se precisa do "ver mais"
  requestAnimationFrame(() => {
    if (!isMobileViewport()) {
      readMoreBtn.classList.remove("visible");
      descriptionEl.classList.remove("clamped");
      return;
    }

    const needsClamp = descriptionEl.scrollHeight > descriptionEl.clientHeight * 1.4;

    if (needsClamp) {
      descriptionEl.classList.add("clamped");
      readMoreBtn.classList.add("visible");
      readMoreBtn.textContent = "Ver mais";
    } else {
      descriptionEl.classList.remove("clamped");
      readMoreBtn.classList.remove("visible");
    }
  });

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

function openStory() {
  storyOverlay.classList.add("is-open");
  storyOverlay.setAttribute("aria-hidden", "false");
  document.body.classList.add("story-open");
  currentIndex = 0;
  renderTimelineItem(currentIndex);
}

function closeStory() {
  storyOverlay.classList.remove("is-open");
  storyOverlay.setAttribute("aria-hidden", "true");
  document.body.classList.remove("story-open");
}

function init() {
  relationshipStartText.textContent = `Desde ${formatStartDate(RELATIONSHIP_START)}`;

  updateCounter();
  setInterval(updateCounter, 1000);

  renderTimelineItem(currentIndex);

  openStoryBtn.addEventListener("click", (e) => {
    e.preventDefault();
    openStory();
  });

  storyClose.addEventListener("click", closeStory);

  document.addEventListener("keydown", (event) => {
    if (storyOverlay.classList.contains("is-open") && event.key === "Escape") {
      closeStory();
    }
  });

  prevBtn.addEventListener("click", showPrev);
  nextBtn.addEventListener("click", showNext);

  readMoreBtn.addEventListener("click", () => {
    if (!isMobileViewport()) return;

    isDescriptionExpanded = !isDescriptionExpanded;

    if (isDescriptionExpanded) {
      descriptionEl.classList.remove("clamped");
      readMoreBtn.textContent = "Ver menos";
    } else {
      descriptionEl.classList.add("clamped");
      readMoreBtn.textContent = "Ver mais";
    }
  });

  window.addEventListener("resize", () => {
    renderTimelineItem(currentIndex);
  });

  document.addEventListener("keydown", (event) => {
    if (!storyOverlay.classList.contains("is-open")) return;
    if (event.key === "ArrowRight") showNext();
    if (event.key === "ArrowLeft") showPrev();
  });
}

document.addEventListener("DOMContentLoaded", init);

