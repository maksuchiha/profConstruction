'use strict'

const sendMail = (modal, form, thanks) => {
    const modalWindow = document.querySelector(`.${modal}`)
    const getForm = modalWindow.querySelector(`.${form}`)
    const thanksMessage = document.querySelector(`.${thanks}`)

    const sendData = (data) => {
        fetch('./script/mailer.php', {
            method: 'POST',
            body: JSON.stringify(data),
            headers: {
                "Content-Type": "application/json; charset=utf-8"
            }
        }).then(res => res.json())
            .then(btn => {
                thanksMessage.style.display = 'flex'
            })
            .catch(err => {
                console.log(err)
            })
    }

    getForm.querySelector('button').addEventListener('click', (e) => {

        const obj = {}
        getForm.querySelectorAll('input').forEach(item => {
            obj[item.name] = item.value
            item.value = ''
        })
        getForm.querySelector('button').setAttribute('disabled', '')
        sendData(obj)
    })
}

const thanksClose = () => {
    const thanks = document.querySelector('.thanks')
    const thanksClose = thanks.querySelector('.thanks__close')

    thanksClose.addEventListener('click', () => {
        thanks.style.display = 'none'
    })
}

if (document.querySelector('.application__right')) {
    sendMail('application__right', 'application__form', 'thanks')
    sendMail('footer__info', 'footer-application', 'thanks')
    sendMail('header__items', 'header__form', 'thanks')
} else {
    sendMail('footer__info', 'footer-application', 'thanks')
    sendMail('header__items', 'header__form', 'thanks')
}

thanksClose()