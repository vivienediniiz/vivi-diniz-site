// O código JS que você forneceu, com um pequeno ajuste no escopo para clareza:

document.addEventListener("DOMContentLoaded", () => {
    // 1. Seleciona o contêiner com o ID 'carousel'
    const scrollContainer = document.getElementById("carousel-design");

    // Verifica se o elemento existe
    if (!scrollContainer) {
        console.error("Elemento #carousel-design não encontrado.");
        return;
    }

    // 2. Clona os itens para criar o efeito de loop infinito
    // ESSENCIAL: O loop funciona porque temos os itens originais e suas cópias.
    // Quando o scroll chega no primeiro item clonado (metade do total), ele reseta para 0
    // (o primeiro item original), mas como o conteúdo é idêntico, o olho humano não percebe o salto.
    const originalItems = Array.from(scrollContainer.children);
    originalItems.forEach(item => {
        // Clona o nó e todos os seus descendentes (imagens)
        scrollContainer.appendChild(item.cloneNode(true)); 
    });

    let speed = 0.8; // Velocidade do scroll em pixels por frame. Ajuste para mais rápido ou mais lento.
    let isPaused = false; // Flag para controlar a pausa

    function autoScroll() {
        // Só executa o scroll se não estiver pausado
        if (!isPaused) {
            // Move o scroll para a direita pela quantidade de 'speed'
            scrollContainer.scrollLeft += speed;

            // 3. Lógica do Reset (Loop Infinito)
            // Se a posição do scroll (scrollLeft) for maior ou igual à metade da largura total (scrollWidth),
            // significa que chegamos no primeiro conjunto de itens clonados.
            if (scrollContainer.scrollLeft >= scrollContainer.scrollWidth / 2) {
                // Reseta a posição do scroll para 0 instantaneamente.
                scrollContainer.scrollLeft = 0;
            }
        }

        // Continua a animação no próximo quadro de renderização do navegador (performático)
        requestAnimationFrame(autoScroll);
    }

    // --- Melhorias de Experiência do Usuário (Pausa ao Interagir) ---

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