'use strict'

const accordion = (list, item, itemActive) => {
    const listItem = document.querySelector(`.${list}`)

    listItem.addEventListener('click', (e) => {
        if (e.target.closest(`.${item}`)) {
            e.target.closest(`.${item}`).classList.toggle(`${itemActive}`)
        }
    })
}

const swiper = new Swiper('.gallery-image', {
    // Optional parameters
    loop: false,
    navigation: {
        nextEl: '.gallery-image__button_right',
        prevEl: '.gallery-image__button_left',
    },

    pagination: {
        el: ".swiper-pagination",
        clickable: true,
        renderBullet: function (index, className) {
            return '<img class="swiper-slide gallery-image__miniature ' + className + '" src="./img/gallery/saf/'+ (index + 1) +'.jpg">';

        },
    },
});

const swiperLent = new Swiper('.gallery-image__miniatures', {
    cssMode: true,
    loop: false,
    navigation: {
        nextEl: ".gallery-image__button_r",
        prevEl: ".gallery-image__button_l",
    },
    mousewheel: true,
    keyboard: true,
    slidesPerView: 'auto',
});




accordion('specification__list', 'faq__item', 'faq__item_active')
