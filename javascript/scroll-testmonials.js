document.addEventListener("DOMContentLoaded", () => {
  const scrollContainer = document.getElementById("carousel");

  // Verifica se o elemento existe
  if (!scrollContainer) {
    console.error("Elemento #carousel não encontrado.");
    return;
  }

  // Clona os itens para criar o efeito de loop infinito
  const originalItems = Array.from(scrollContainer.children);
  originalItems.forEach(item => {
    scrollContainer.appendChild(item.cloneNode(true));
  });

  let speed = 0.8; // Velocidade do scroll em pixels por frame
  let isPaused = false; // Flag para controlar a pausa

  function autoScroll() {
    // Só executa o scroll se não estiver pausado
    if (!isPaused) {
      scrollContainer.scrollLeft += speed;

      // Reseta o scroll para o início ao chegar na metade
      if (scrollContainer.scrollLeft >= scrollContainer.scrollWidth / 2) {
        scrollContainer.scrollLeft = 0;
      }
    }

    // Continua a animação
    requestAnimationFrame(autoScroll);
  }

  // --- Melhorias de Experiência do Usuário ---

  // Pausa ao passar o mouse em cima (desktop)
  scrollContainer.addEventListener("mouseenter", () => {
    isPaused = true;
  });

  // Retoma ao tirar o mouse (desktop)
  scrollContainer.addEventListener("mouseleave", () => {
    isPaused = false;
  });

  // Pausa ao tocar (mobile)
  scrollContainer.addEventListener("touchstart", () => {
    isPaused = true;
  }, { passive: true });

  // Retoma ao soltar o toque (mobile)
  scrollContainer.addEventListener("touchend", () => {
    isPaused = false;
  });

  // Inicia o scroll automático
  autoScroll();
});