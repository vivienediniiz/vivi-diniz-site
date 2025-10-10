/**
 * A função principal que executa a animação de contagem de um número.
 * @param {HTMLElement} el - O elemento DOM que contém o contador.
 * @param {number} end - O número final para a contagem.
 * @param {string} suffix - O texto a ser exibido após o número (ex: '+').
 */
function animateCounter(el, end, suffix) {
    const duration = 2000; // Duração total da animação em milissegundos
    const startTime = performance.now(); // Marca o tempo de início da animação

    // Função interna que será chamada repetidamente para cada frame da animação
    function update(time) {
        // Calcula o progresso da animação (um valor entre 0 e 1)
        const progress = Math.min((time - startTime) / duration, 1);
        
        // Calcula o valor atual do contador baseado no progresso
        const value = Math.floor(progress * end);
        
        // Atualiza o conteúdo de texto do primeiro nó filho do elemento
        // ATENÇÃO: Isso assume que o número é o primeiro filho.
        // Se houver um ícone ou outro elemento antes, isso pode falhar.
        if (el.firstChild) {
            el.firstChild.textContent = value + suffix;
        }

        // Se a animação não terminou, solicita o próximo frame
        if (progress < 1) {
            requestAnimationFrame(update);
        }
    }

    // Inicia o loop da animação
    requestAnimationFrame(update);
}

// ---------------------------------------------------------------------

// Cria uma instância do Intersection Observer para monitorar a visibilidade dos elementos
const observer = new IntersectionObserver((entries) => {
    // Itera sobre todos os elementos que o observer está monitorando
    entries.forEach(entry => {
        const el = entry.target; // O elemento DOM (.contador-item)
        
        // Obtém o valor final do atributo 'data-max' e converte para número
        const end = +el.getAttribute('data-max');
        
        // Obtém o sufixo do atributo 'data-suffix'
        const suffix = el.getAttribute('data-suffix') || '';

        // Verifica se o elemento está visível na tela
        if (entry.isIntersecting) {
            // Reinicia a animação a partir do zero
            animateCounter(el, end, suffix);
            // Para de observar este elemento para não reiniciar a animação ao rolar a página
            observer.unobserve(el); 
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
    // Define o texto inicial como '0' antes da animação começar
    const suffix = el.getAttribute('data-suffix') || '';
    if(el.firstChild){
       el.firstChild.textContent = '0' + suffix;
    }
    observer.observe(el);
});