// A função animateCounter permanece a mesma.
function animateCounter(element, end, suffix) {
    // 'element' aqui é o h3.contador-numero que você passou

    let current = 0;
    const duration = 2000; // 2 segundos
    const stepTime = 20;   // Atualiza a cada 20ms
    const steps = duration / stepTime;
    const increment = end / steps;

    const timer = setInterval(() => {
        current += increment;
        if (current >= end) {
            clearInterval(timer);
            element.textContent = end + suffix; // Usa 'element.textContent'
        } else {
            element.textContent = Math.ceil(current) + suffix; // Usa 'element.textContent'
        }
    }, stepTime);
}
// ---------------------------------------------------------------------

// Cria uma instância do Intersection Observer
const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
    const el = entry.target;
    const numberEl = el.querySelector('.contador-numero'); // <-- SELECIONA PELA CLASSE

    if (!numberEl) return; // Se não encontrar o número, não faz nada

    if (entry.isIntersecting) {
        if (el.getAttribute('data-animated') === 'false') {
            const end = +el.getAttribute('data-max');
            const suffix = el.getAttribute('data-suffix') || '';
            
            // IMPORTANTE: Passe o 'numberEl' para sua função de animar
            animateCounter(numberEl, end, suffix); // <-- PASSA O ELEMENTO CORRETO
            
            el.setAttribute('data-animated', 'true');
        }
    } else {
        const suffix = el.getAttribute('data-suffix') || '';
        numberEl.textContent = '0' + suffix; // <-- ATUALIZA O ELEMENTO CORRETO
        el.setAttribute('data-animated', 'false');
    }
});
}, { 
    // Opções do Observer:
    // A animação dispara quando 50% do elemento estiver visível
    threshold: 0.1 
});

// ---------------------------------------------------------------------

// Seleciona todos os elementos com a classe '.contador-item' e inicia a observação
// NO FINAL DO ARQUIVO, ONDE VOCÊ INICIA A OBSERVAÇÃO
document.querySelectorAll('.contador-item').forEach(el => {
    const numberEl = el.querySelector('.contador-numero'); // <-- SELECIONA PELA CLASSE

    if (!numberEl) return;

    const suffix = el.getAttribute('data-suffix') || '';
    numberEl.textContent = '0' + suffix; // <-- ATUALIZA O ELEMENTO CORRETO
    
    el.setAttribute('data-animated', 'false');
    observer.observe(el);
});