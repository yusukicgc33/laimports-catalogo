const floatingButton = document.querySelector('.floating-button')
const sideBar = document.querySelector('.side-bar')
const display = ['block', 'none']

let dCount = 0
function changeDisplay (element) {
    element.style.display = display[dCount]
    dCount++
    if(dCount > 1) dCount = 0
}
document.addEventListener('click', (e) => {
    console.log(e.target.className);
    if(e.target.className === 'floating-button') changeDisplay(sideBar)
    if(e.target.className !== 'floating-button') {
        dCount = 1
        changeDisplay(sideBar)
    }
})