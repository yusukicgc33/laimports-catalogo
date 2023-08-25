const bntNavMobile = document.querySelector('.bntNavMobile')
const navMenu = document.querySelector('.nav-menu')
const clientCart = document.querySelector('.client-cart')

const display = ['block', 'none']

let dCount = 0
function changeDisplay(element) {
    element.style.display = display[dCount]
    clientCart.style.display = display[dCount]
    dCount++
    if (dCount > 1) dCount = 0
}
document.addEventListener('click', (e) => {
    if (e.target.className === 'bntNavMobile') changeDisplay(navMenu)
    if (e.target.className !== 'bntNavMobile') {
        dCount = 1
        changeDisplay(navMenu)
    }
})
