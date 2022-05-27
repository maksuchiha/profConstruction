'use strict'

const accordion = (list, item, itemActive) => {
    const listItem = document.querySelector(`.${list}`)

    listItem.addEventListener('click', (e) => {
        if (e.target.closest(`.${item}`)) {
            e.target.closest(`.${item}`).classList.toggle(`${itemActive}`)
        }
    })
}

const getImagePath = () => {
    const img = document.querySelector('.gallery-image__slide img')
    const arr = img.getAttribute('src').split('/')
    arr.pop()
    return arr.join('/')

}

const swiper = new Swiper('.gallery-image', {
    // Optional parameters
    loop: false,
    navigation: {
        nextEl: '.gallery-image__button_right',
        prevEl: '.gallery-image__button_left',
    },
    autoHeight: true,
    pagination: {
        el: ".swiper-pagination",
        clickable: true,
        renderBullet: function (index, className) {
            return '<img class="swiper-slide gallery-image__miniature ' + className + '" src="'+ getImagePath() +'/'+ (index + 1) +'.jpg">';

        },
    },
});

const swiperLent = new Swiper('.gallery-image__miniatures', {
    cssMode: true,
    loop: false,
    slidesPerView: 'auto',
    navigation: {
        nextEl: ".gallery-image__button_r",
        prevEl: ".gallery-image__button_l",
    },
});

if (innerWidth < 1230) {
    swiperLent.destroy()
}




accordion('specification__list', 'faq__item', 'faq__item_active')
