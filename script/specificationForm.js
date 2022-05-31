'use strict'

const specificationForm = () => {
    const formWrapper = document.querySelector(`.feedback`)
    const thanksMessage = document.querySelector(`.thanks`)
    const inputs = formWrapper.querySelectorAll('input')

    const sendData = (data) => {
        fetch('./script/specificationMailer.php', {
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
    
    formWrapper.querySelector('.feedback__send').addEventListener('click', () => {
        const obj = {}
        inputs.forEach(item => {
            if (item.checked || item.type !== 'radio') {
                obj[item.name] = item.value
            }
            item.value = ''
        })
        formWrapper.querySelector('.feedback__send').setAttribute('disabled', '')
        sendData(obj)
    })
}

specificationForm()