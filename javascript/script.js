$(document).ready(function() {
    // --- 1. Lógica do Menu Mobile ---
    $('#mobile_btn').on('click', function () {
        $('#mobile_menu').toggleClass('active');
        $(this).find('i').toggleClass('fa-bars fa-x'); 
    });

    // --- 2. Scroll Suave ao Clicar nos Links de Navegação ---
    // Seleciona todos os links <a> que começam com '#'
    $('a[href^="#"]').on('click', function(event) {
        // Previne o comportamento padrão de "pulo" do link
        event.preventDefault();
        
        const targetId = $(this).attr('href');
        const header = $('header');
        
        // Verifica se o elemento alvo existe na página para evitar erros
        if ($(targetId).length) {
            const targetOffset = $(targetId).offset().top;
            
            // Anima a rolagem da página até o alvo, descontando a altura do header
            $('html, body').animate({
                scrollTop: targetOffset - header.outerHeight()
            }, 800); // Duração da animação: 800ms
        }

        // Fecha o menu mobile (caso esteja aberto) após clicar em um item
        if ($('#mobile_menu').hasClass('active')) {
            $('#mobile_menu').removeClass('active');
            $('#mobile_btn').find('i').removeClass('fa-x');
        }
    });

    // --- 3. Lógica de Rolagem da Página (Scroll Events) ---
    const sections = $('section');
    // Seleciona os itens de navegação tanto do menu desktop quanto do mobile
    const navItems = $('.nav-item'); 
    const header = $('header');

    $(window).on('scroll', function () {
        const scrollPosition = $(window).scrollTop();
        
        // a) Efeito de Sombra no Header
        if (scrollPosition <= 10) { // Uma pequena margem para garantir
            header.css('box-shadow', 'none');
        } else {
            // Adiciona uma sombra sutil para destacar o header durante a rolagem
            header.css('box-shadow', '5px 1px 5px rgba(0, 0, 0, 0.1)');
        }

        // b) Destaque do Link Ativo na Navegação (Scroll Spy)
        let activeSectionId = null;

        sections.each(function() {
            const section = $(this);
            // Adiciona um "offset" para ativar o link um pouco antes de chegar no topo da seção
            const sectionTop = section.offset().top - header.outerHeight() - 60; 

            // Verifica se a posição de rolagem atual está dentro da seção
            if (scrollPosition >= sectionTop) {
                activeSectionId = section.attr('id');
            }
        });
        
        // Atualiza a classe 'active' nos itens de navegação
        navItems.removeClass('active');
        if (activeSectionId) {
            // Adiciona a classe 'active' ao <li> (nav-item) que contém o link para a seção ativa
            $(`a[href="#${activeSectionId}"]`).closest('.nav-item').addClass('active');
        }
    });

    // --- 4. Animações com a Biblioteca ScrollReveal ---
    // Configuração padrão para evitar repetição
    const scrollRevealConfig = {
        duration: 2000,
        distance: '20%',
        origin: 'left' // Padrão será 'left'
    };
    
    ScrollReveal().reveal('#cta', scrollRevealConfig);
    ScrollReveal().reveal('.dish', scrollRevealConfig);
    ScrollReveal().reveal('#testimonial_chef', { ...scrollRevealConfig, duration: 1000 });
    // Sobrescreve apenas a origem para 'right'
    ScrollReveal().reveal('.feedback', { ...scrollRevealConfig, origin: 'right', duration: 1000 });
});