const swiper = new Swiper('.swiper', {
    slidesPerView: 3, // сколько элементов показывать одновременно
    spaceBetween: 3, // отступ между слайдами (в пикселях)
    loop: true, // зацикливание
    navigation: {
        nextEl: '.swiper-button-next', // кнопка "следующий"
        prevEl: '.swiper-button-prev', // кнопка "предыдущий"
    },
});
