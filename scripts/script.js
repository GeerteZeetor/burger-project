const mainBtn = document.getElementById('main-action-button')
const productsBlock = document.getElementById('products')
const links = document.querySelectorAll('.menu-item > a')
const btns = document.getElementsByClassName('product-button')
const burgerInput = document.getElementById('burger')
const nameInput = document.getElementById('name')
const phoneInput = document.getElementById('phone')
const btnOrder = document.getElementById('order-action')
const inputsArr = [phoneInput, burgerInput, nameInput]
const prices = document.querySelectorAll('.products-item-price')
const changePriceBtn = document.getElementById('change-currency')

mainBtn.addEventListener('click', () => {
    productsBlock.scrollIntoView({behavior: 'smooth'})
})

for (const link of links) {
    link.addEventListener('click', () => {
        document.getElementById(link.getAttribute('data-link')).scrollIntoView({behavior: 'smooth'})
    })
}
for (const btn of btns) {
    btn.addEventListener('click', () => {
        document.getElementById('order').scrollIntoView({behavior: 'smooth'})
    })
}

btnOrder.addEventListener('click', () => {
    let hasError = false

    inputsArr.forEach((item) => {
        const validationMaskPhone = /^(\+7|7|8)?[\s\-]?\(?[489][0-9]{2}\)?[\s\-]?[0-9]{3}[\s\-]?[0-9]{2}[\s\-]?[0-9]{2}$/
        const validationMaskName = /[А-яЁё a-zA-Z]/g

        if (item.attributes.item(2).value === 'phone' && !validationMaskPhone.test(item.value)) {
                item.parentElement.style.background = 'red'
                hasError = true
        } else if (item.attributes.item(2).value === 'name' && !validationMaskName.test(item.value)) {
                item.parentElement.style.background = 'red'
                hasError = true
        } else  if (!item.value) {
            item.parentElement.style.background = 'red'
            hasError = true
        } else {
            item.parentElement.style.background = ''
        }
    })

    if (!hasError) {
        inputsArr.forEach((item) => {
            item.value = ''
        })
        setTimeout(() => {
            alert('Спасибо за заказ! Мы скоро свяжемся с вами')
        }, 0)
    }
})

changePriceBtn.addEventListener('click', (ev) => {
    let currentCurrency = ev.target.innerText
    let newCurrency = '$'
    let coefficient = 1

    switch (currentCurrency) {
        case '$' :
            newCurrency = '₽'
            coefficient = 80
            break
        case '₽' :
            newCurrency = 'BYN'
            coefficient = 3
            break
        case 'BYN' :
            newCurrency = '€'
            coefficient = 0.9
            break
        case '€' :
            newCurrency = '¥'
            coefficient = 6.9
            break
    }

    ev.target.innerText = newCurrency

    prices.forEach((price) => {
        price.innerText = Math.round((price.getAttribute('data-base-price') * coefficient)) + ` ${newCurrency}`
    })
})

