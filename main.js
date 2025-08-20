document.addEventListener('DOMContentLoaded', () => {

    // Funções para o menu hambúrguer
    const menuHamburguer = document.getElementById('menu-hamburger');
    const menu = document.getElementById('menu');

    // Abre e fecha o menu e adiciona a classe ao botão para o efeito "X"
    if (menuHamburguer && menu) {
        menuHamburguer.addEventListener('click', () => {
            menu.classList.toggle('ativo');
            menuHamburguer.classList.toggle('ativo');
        });
    }

    // Fecha o menu ao clicar em um link
    const links = document.querySelectorAll('.cabecalho__menu__link');
    links.forEach(link => {
        link.addEventListener('click', () => {
            menu.classList.remove('ativo');
            menuHamburguer.classList.remove('ativo'); // Remove a classe do botão também
        });
    });


    // --- Funções de Contato, Partículas e Animações ---
    
    // Configuração do EmailJS (substitua pelos seus IDs)
    const EMAILJS_CONFIG = {
        serviceId: 'SEU_SERVICE_ID',
        templateId: 'SEU_TEMPLATE_ID',
        publicKey: 'SUA_PUBLIC_KEY'
    };

    // Inicializa EmailJS
    (function () {
        if (typeof emailjs !== 'undefined' && EMAILJS_CONFIG.publicKey !== 'SUA_PUBLIC_KEY') {
            emailjs.init(EMAILJS_CONFIG.publicKey);
        }
    })();

    // Mostra a mensagem de status do formulário
    function showStatusMessage(message, type) {
        const statusDiv = document.getElementById('statusMessage');
        if (statusDiv) {
            statusDiv.textContent = message;
            statusDiv.className = `status-message ${type}`;
            statusDiv.style.display = 'block';

            if (type === 'success') {
                setTimeout(() => {
                    statusDiv.style.display = 'none';
                }, 5000);
            }
        }
    }

    // Lida com o envio do formulário
    async function handleSubmit(event) {
        event.preventDefault();

        const submitBtn = document.querySelector('.form__button');
        const form = document.getElementById('contactForm');
        const statusMessage = document.getElementById('statusMessage');

        if (!submitBtn || !form || !statusMessage) {
            console.error('Um ou mais elementos do formulário não foram encontrados.');
            return;
        }
        
        submitBtn.disabled = true;
        submitBtn.innerHTML = '<div class="spinner"></div> Enviando...';
        statusMessage.style.display = 'none';

        try {
            const response = await fetch('https://formspree.io/f/xrblwrov', {
                method: 'POST',
                body: new FormData(form),
                headers: {
                    'Accept': 'application/json'
                }
            });

            if (response.ok) {
                showStatusMessage('✅ Mensagem enviada com sucesso! Retornarei em breve.', 'success');
                form.reset();
            } else {
                const data = await response.json();
                if (data.errors) {
                    throw new Error(data.errors.map(error => error.message).join(', '));
                } else {
                    throw new Error('Falha no envio');
                }
            }
        } catch (error) {
            console.error('Erro ao enviar:', error);
            showStatusMessage('❌ Erro ao enviar mensagem. Tente novamente mais tarde.', 'error');
        } finally {
            submitBtn.disabled = false;
            submitBtn.innerHTML = '<i class="fas fa-paper-plane"></i> Enviar Mensagem';
        }
    }

    // Cria partículas animadas para a seção de contato
    function createParticles() {
        const particlesContainer = document.getElementById('particles');
        if (!particlesContainer) return;
        
        const particleCount = 20;

        for (let i = 0; i < particleCount; i++) {
            const particle = document.createElement('div');
            particle.className = 'particle';
            particle.style.left = Math.random() * 100 + '%';
            particle.style.top = Math.random() * 100 + '%';
            particle.style.animationDelay = Math.random() * 6 + 's';
            particle.style.animationDuration = (Math.random() * 3 + 3) + 's';
            particlesContainer.appendChild(particle);
        }
    }

    // Animação de entrada dos elementos
    function animateOnScroll() {
        const elements = document.querySelectorAll('.fade-in');
        elements.forEach((element, index) => {
            element.style.animationDelay = (index * 0.2) + 's';
        });
    }

    // Efeito de digitação nos placeholders
    function typewriterEffect() {
        const inputs = document.querySelectorAll('.form__input, .form__textarea');
        inputs.forEach(input => {
            const originalPlaceholder = input.placeholder;
            let isTyping = false;

            input.addEventListener('focus', () => {
                if (!isTyping && input.value === '') {
                    isTyping = true;
                    input.placeholder = '';
                    let i = 0;
                    const typeInterval = setInterval(() => {
                        input.placeholder += originalPlaceholder.charAt(i);
                        i++;
                        if (i === originalPlaceholder.length) {
                            clearInterval(typeInterval);
                            isTyping = false;
                        }
                    }, 50);
                }
            });

            input.addEventListener('blur', () => {
                if (input.value === '') {
                    input.placeholder = originalPlaceholder;
                }
            });
        });
    }

    // Adiciona event listener para o formulário
    const contactForm = document.getElementById('contactForm');
    if (contactForm) {
        contactForm.addEventListener('submit', handleSubmit);
    }
    
    // Inicializa todas as funcionalidades ao carregar a página
    createParticles();
    animateOnScroll();
    typewriterEffect();

});