gsap.registerPlugin(ScrollTrigger, ScrollSmoother, SplitText);

ScrollSmoother.create({
  smooth: 1.5,
  effects: true,
});

function animarPagina() {

  // CURSOR PERSONALIZADO
  const cursor      = document.createElement("div");
  const cursorAnel  = document.createElement("div");
  const cursorTrail = document.createElement("div");
  cursor.classList.add("cursor");
  cursorAnel.classList.add("cursorAnel");
  cursorTrail.classList.add("cursorTrail");
  document.body.appendChild(cursorTrail);
  document.body.appendChild(cursorAnel);
  document.body.appendChild(cursor);

  document.addEventListener("mousemove", (e) => {
    cursor.style.left = e.clientX + "px";
    cursor.style.top  = e.clientY + "px";
    cursorAnel.style.left  = e.clientX + "px";
    cursorAnel.style.top   = e.clientY + "px";
    cursorTrail.style.left    = e.clientX + "px";
    cursorTrail.style.top     = e.clientY + "px";
    cursorTrail.style.opacity = "1";
  });

  document.querySelectorAll("a, button").forEach((el) => {
    el.addEventListener("mouseenter", () => {
      cursor.style.width           = "12px";
      cursor.style.height          = "12px";
      cursor.style.backgroundColor = "white";
      cursorAnel.style.width       = "48px";
      cursorAnel.style.height      = "48px";
      cursorAnel.style.borderColor = "#7B4FFF";
      cursorAnel.style.opacity     = "1";
    });
    el.addEventListener("mouseleave", () => {
      cursor.style.width           = "8px";
      cursor.style.height          = "8px";
      cursor.style.backgroundColor = "#7B4FFF";
      cursorAnel.style.width       = "32px";
      cursorAnel.style.height      = "32px";
      cursorAnel.style.borderColor = "#7B4FFF";
      cursorAnel.style.opacity     = "0.5";
    });
  });

  document.addEventListener("mouseleave", () => {
    cursor.style.opacity      = "0";
    cursorAnel.style.opacity  = "0";
    cursorTrail.style.opacity = "0";
  });

  document.addEventListener("mouseenter", () => {
    cursor.style.opacity     = "1";
    cursorAnel.style.opacity = "0.5";
  });

  document.addEventListener("mousedown", () => {
    cursor.style.width       = "14px";
    cursor.style.height      = "14px";
    cursorAnel.style.width   = "20px";
    cursorAnel.style.height  = "20px";
    cursorAnel.style.opacity = "1";
  });

  document.addEventListener("mouseup", () => {
    cursor.style.width       = "8px";
    cursor.style.height      = "8px";
    cursorAnel.style.width   = "32px";
    cursorAnel.style.height  = "32px";
    cursorAnel.style.opacity = "0.5";
  });

  // HERO
  gsap.from(".hero", {
    opacity: 0,
    duration: 1,
  });

  gsap.from("picture:nth-child(2)", {
    y: 60,
    duration: 1,
  });

  gsap.from("picture:nth-child(1)", {
    y: -60,
    duration: 1,
  });

  // CARDS SERVIÇOS
  gsap.from(".card", {
    opacity: 0,
    filter: "blur(10px)",
    y: 30,
    stagger: 0.2,
    scrollTrigger: {
      trigger: ".cards",
      start: "0% 85%",
      end: "100% 70%",
      scrub: true,
    },
  });

  // ATLETAS
  gsap.from(".atletaFoto", {
    opacity: 0,
    scale: 0.92,
    filter: "blur(8px)",
    stagger: 0.2,
    duration: 0.6,
    scrollTrigger: {
      trigger: ".depoimentos",
      start: "0% 85%",
      end: "60% 60%",
      scrub: true,
    },
  });

  // FOOTER
  gsap.from("footer", {
    y: "-30%",
    immediateRender: false,
    scrollTrigger: {
      trigger: "footer",
      scrub: true,
      invalidateOnRefresh: true,
      end: "100% 100%",
    },
  });

  // SPLIT TEXT
  const grupoTextoSplit = document.querySelectorAll(".textoSplit");

  grupoTextoSplit.forEach((textoUnicoSplit) => {
    const split = SplitText.create(textoUnicoSplit, {
      type: "lines, words, chars",
      mask: "lines",
    });

    gsap.from(split.chars, {
      y: 40,
      opacity: 0,
      duration: 0.3,
      stagger: 0.03,
      scrollTrigger: {
        trigger: textoUnicoSplit,
      },
    });
  });

  // NAV SCROLL SUAVE
  document.querySelectorAll('.headerNav a[href^="#"]').forEach((link) => {
    link.addEventListener("click", (e) => {
      e.preventDefault();
      const alvo = document.querySelector(link.getAttribute("href"));
      if (alvo) {
        const smoother = ScrollSmoother.get();
        smoother
          ? smoother.scrollTo(alvo, true, "top 80px")
          : alvo.scrollIntoView({ behavior: "smooth" });
      }
    });
  });
}

// PRELOADER
const tl = gsap.timeline({
  onComplete() {
    animarPagina();
    gsap.to("#preloader", {
      opacity: 0,
      duration: 0.5,
      onComplete: () => {
        document.getElementById("preloader").style.display = "none";
      }
    });
  },
});

tl.to("#preloaderTexto", {
  attr: { "stroke-dashoffset": 0 },
  duration: 1,
  ease: "power2.out",
})
.to("#preloaderSub", {
  attr: { "stroke-dashoffset": 0 },
  duration: 0.7,
  ease: "power2.out",
}, "-=0.4")
.to("#preloaderTexto", {
  attr: { fill: "#7B4FFF" },
  duration: 0.4,
}, "-=0.1")
.to("#preloaderSub", {
  attr: { fill: "rgba(123,79,255,0.45)" },
  duration: 0.4,
}, "-=0.4");