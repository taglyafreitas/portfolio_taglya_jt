document.addEventListener('DOMContentLoaded', () => {
    // Funções para o menu hambúrguer
    const menuHamburguer = document.getElementById('menu-hamburger');
    const menu = document.getElementById('menu');

    // Verifica se o botão do hambúrguer e o menu existem
    if (menuHamburguer && menu) {
        menuHamburguer.addEventListener('click', () => {
            menu.classList.toggle('ativo');
            menuHamburguer.classList.toggle('ativo'); // Isso deve ativar o efeito de "X"
        });
    }

    // Fecha o menu ao clicar em um link
    const links = document.querySelectorAll('.cabecalho__menu__link');
    links.forEach(link => {
        link.addEventListener('click', () => {
            menu.classList.remove('ativo');
            menuHamburguer.classList.remove('ativo');
        });
    });
});
