'use strict'

const cases = () => {
    const seeAll = () => {
        const seeBtn = document.querySelector('.cases__button')
        const casesWrapper = document.querySelector('.cases__inner')

        seeBtn.addEventListener('click', () => {
            casesWrapper.querySelectorAll('.cases-item').forEach(item => {
                item.classList.remove('cases-item_hide')
                seeBtn.style.display = 'none'
            })
        })
    }

    seeAll()
}

cases()