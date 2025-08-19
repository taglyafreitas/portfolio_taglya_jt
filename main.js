// Elementos
        const menuHamburguer = document.getElementById('menu-hamburguer');
        const menuMobile = document.getElementById('menu-mobile');
        const menuOverlay = document.getElementById('menu-overlay');
        const menuClose = document.getElementById('menu-close');
        const menuLinks = document.querySelectorAll('.menu-mobile__link');

        // Função para abrir menu
        function openMenu() {
            menuMobile.classList.add('active');
            menuOverlay.classList.add('active');
            document.body.style.overflow = 'hidden';
        }

        // Função para fechar menu
        function closeMenu() {
            menuMobile.classList.remove('active');
            menuOverlay.classList.remove('active');
            document.body.style.overflow = 'auto';
        }

        // Event listeners
        menuHamburguer.addEventListener('click', openMenu);
        menuClose.addEventListener('click', closeMenu);
        menuOverlay.addEventListener('click', closeMenu);

        // Fechar menu ao clicar em um link
        menuLinks.forEach(link => {
            link.addEventListener('click', () => {
                closeMenu();
                // Scroll suave para a seção
                const targetId = link.getAttribute('href');
                if (targetId.startsWith('#')) {
                    const targetElement = document.querySelector(targetId);
                    if (targetElement) {
                        setTimeout(() => {
                            targetElement.scrollIntoView({ behavior: 'smooth' });
                        }, 300);
                    }
                }
            });
        });

        // Fechar menu com tecla ESC
        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape') {
                closeMenu();
            }
        });

        // Scroll suave para links do menu desktop também
        document.querySelectorAll('.cabecalho__menu__link').forEach(link => {
            link.addEventListener('click', (e) => {
                const targetId = link.getAttribute('href');
                if (targetId.startsWith('#')) {
                    e.preventDefault();
                    const targetElement = document.querySelector(targetId);
                    if (targetElement) {
                        targetElement.scrollIntoView({ behavior: 'smooth' });
                    }
                }
            });
        });