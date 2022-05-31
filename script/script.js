'use strict'

const script = () => {
    const thanksMessage = document.querySelector(`.thanks`)

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

    const sendFile = () => {
        const form = document.getElementById('modal-form')

        const serializeForm = (formNode) => new FormData(formNode)

        async function sendData(data) {
            return await fetch('./script/fileMailer.php', {
                method: 'POST',
                // headers: { 'Content-Type': 'multipart/form-data' },
                body: serializeForm(data),
            })
        }
        form.querySelector('button').addEventListener('click', () => {
            sendData(form)
        })
    }

    sendFile()
    form()
    accordion('faq__list', 'faq__item', 'faq__item_active')

}

script()