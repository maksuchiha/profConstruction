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
        document.querySelector('.modal').style.display = 'none'
        document.querySelector('.thanks').style.display = 'flex'
    })
}

if (document.getElementById('modal-form')) {
    sendFile()
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