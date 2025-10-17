$(document).ready(function () {
    const mobileBtn = $('#mobile_btn');
    const mobileMenu = $('#mobile_menu');
    const header = $('header');
    const navItems = $('.nav-item');
    const sections = $('section');

    // --- 1. Lógica do Menu Mobile ---
    mobileBtn.on('click', function () {
        mobileMenu.toggleClass('active');
        $(this).find('i').toggleClass('fa-bars fa-x');
    });

    // Função para fechar o menu mobile
    function closeMobileMenu() {
        if (mobileMenu.hasClass('active')) {
            mobileMenu.removeClass('active');
            mobileBtn.find('i').removeClass('fa-x').addClass('fa-bars');
        }
    }

    // --- 2. Scroll Suave ao Clicar nos Links ---
    $('a[href^="#"]').on('click', function (event) {
        event.preventDefault();

        const targetId = $(this).attr('href');
        if ($(targetId).length) {
            const targetOffset = $(targetId).offset().top;
            $('html, body').animate(
                {
                    scrollTop: targetOffset - header.outerHeight()
                },
                800
            );
        }

        // Fecha o menu mobile após clicar em um item
        closeMobileMenu();
    });

    // --- 3. Fechar o menu ao rolar a página ---
    $(window).on('scroll', function () {
        const scrollPosition = $(window).scrollTop();

        // Fecha o menu se estiver aberto
        closeMobileMenu();

        // a) Efeito de sombra no header
        if (scrollPosition <= 10) {
            header.css('box-shadow', 'none');
        } else {
            header.css('box-shadow', '5px 1px 5px rgba(0, 0, 0, 0.1)');
        }

        // b) Destaque do link ativo (Scroll Spy)
        let activeSectionId = null;
        sections.each(function () {
            const section = $(this);
            const sectionTop = section.offset().top - header.outerHeight() - 60;
            if (scrollPosition >= sectionTop) {
                activeSectionId = section.attr('id');
            }
        });

        navItems.removeClass('active');
        if (activeSectionId) {
            $(`a[href="#${activeSectionId}"]`).closest('.nav-item').addClass('active');
        }
    });

    // --- 4. ScrollReveal ---
    const scrollRevealConfig = {
        duration: 2000,
        distance: '20%',
        origin: 'left'
    };

    ScrollReveal().reveal('#cta', scrollRevealConfig);
    ScrollReveal().reveal('.dish', scrollRevealConfig);
    ScrollReveal().reveal('#testimonial_chef', { ...scrollRevealConfig, duration: 1000 });
    ScrollReveal().reveal('.feedback', { ...scrollRevealConfig, origin: 'right', duration: 1000 });
});
