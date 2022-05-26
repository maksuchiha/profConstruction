'use strict'

const script = () => {
    const form = () => {
        const form = document.querySelector('.feedback')
        const steps = form.querySelectorAll('.feedback__step')

        form.addEventListener('click', (e) => {
            if (e.target.closest('button') && e.target.getAttribute('data-button')) {
                steps[+e.target.getAttribute('data-button')].classList.remove('feedback__step_active')
                steps[+e.target.getAttribute('data-button') + 1].classList.add('feedback__step_active')
            }
        })
    }

    const accordion = (list, item, itemActive) => {
        const listItem = document.querySelector(`.${list}`)

        listItem.addEventListener('click', (e) => {
            if (e.target.closest(`.${item}`)) {
                e.target.closest(`.${item}`).classList.toggle(`${itemActive}`)
            }
        })
    }


    form()
    accordion('faq__list', 'faq__item', 'faq__item_active')
}

script()