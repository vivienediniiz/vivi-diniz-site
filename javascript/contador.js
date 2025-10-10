// A função animateCounter permanece a mesma.

// ---------------------------------------------------------------------

// Cria uma instância do Intersection Observer
const observer = new IntersectionObserver((entries) => {
    // Itera sobre todos os elementos que o observer está monitorando
    entries.forEach(entry => {
        const el = entry.target; // O elemento DOM (.contador-item)
        
        // Verifica se o elemento está visível na tela (entrando)
        if (entry.isIntersecting) {
            // Evita reiniciar a animação se ela já estiver rodando ou concluída
            if (el.getAttribute('data-animated') === 'false') {
                const end = +el.getAttribute('data-max');
                const suffix = el.getAttribute('data-suffix') || '';
                
                // Inicia a animação a partir do zero
                animateCounter(el, end, suffix);
                
                // Marca o elemento como animado para esta "sessão" de visibilidade
                el.setAttribute('data-animated', 'true');
            }
        } else {
            // O elemento não está mais visível (saindo da tela)
            // Reseta o texto para o valor inicial
            const suffix = el.getAttribute('data-suffix') || '';
            if (el.firstChild) {
                el.firstChild.textContent = '0' + suffix;
            }
            // Reseta a marcação para que a animação possa rodar novamente na próxima vez
            el.setAttribute('data-animated', 'false');
        }
    });
}, { 
    // Opções do Observer:
    // A animação dispara quando 50% do elemento estiver visível
    threshold: 0.5 
});

// ---------------------------------------------------------------------

// Seleciona todos os elementos com a classe '.contador-item' e inicia a observação
document.querySelectorAll('.contador-item').forEach(el => {
    // Define o texto e o estado inicial antes da animação começar
    const suffix = el.getAttribute('data-suffix') || '';
    if(el.firstChild){
       el.firstChild.textContent = '0' + suffix;
    }
    // Adiciona um atributo para controlar o estado da animação
    el.setAttribute('data-animated', 'false');
    observer.observe(el);
});