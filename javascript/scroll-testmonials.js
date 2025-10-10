
// Garante que o DOM existe (dispensável se o <script> estiver no final do body)
document.addEventListener("DOMContentLoaded", () => {
  const scrollContainer = document.getElementById("carousel");
  if (!scrollContainer) {
    console.error("Elemento #carousel não encontrado.");
    return;
  }

  // Duplicar de forma segura (sem innerHTML += ...)
  const originals = Array.from(scrollContainer.children);
  originals.forEach(node => {
    scrollContainer.appendChild(node.cloneNode(true));
  });

  let speed = 0.8; // px por frame (ajuste a gosto)

  function autoScroll() {
    scrollContainer.scrollLeft += speed;

    // Quando passar do fim da primeira metade, volta ao início
    if (scrollContainer.scrollLeft >= scrollContainer.scrollWidth / 2) {
      scrollContainer.scrollLeft = 0;
    }

    requestAnimationFrame(autoScroll);
  }

  autoScroll();
});


