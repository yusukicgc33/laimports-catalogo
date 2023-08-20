const modalContainer = document.querySelector('.modal-container')
const bntClose = document.querySelector('.bntClose')
const bntNovo = document.querySelector('.bnt-novo')

function makeImpar() {
    document.querySelector('tr')
        .classList
        .add('impar')
}

function delCamisa(id) {
    fetch(`/camisa/${id}`, {
        method: 'DELETE'
    })
        .then(() => {
            console.log(`Apagado id: ${id}`)
            window.location.reload()
        })

}

async function editCamisa(id) {
    alert('Update: ' + id)
}

const display2 = ['flex', 'none']
let dCount2 = 0
function changeDisplay2(element) {
    element.style.display = display2[dCount2]
    dCount2++
    if (dCount2 > 1) dCount2 = 0
}

document.addEventListener('click', (e) => {
    if (
        e.target.className === 'bntClose' ||
        e.target.className === 'bnt-novo'
    ) {
        changeDisplay2(modalContainer)
    }
})

function visualizarImg(id){
    const imgVisu = document.querySelector('.visualizarImg-modal')
    fetch(`/camisa/${id}`, {
        method: 'GET',
    })
    .then(res => {return res.json()})
    .then(res => {
        const imgee = String(res.result.imagem).replace(/^data:image\/[a-z]+;base64./, "")
        let imgEl = document.createElement('img')
        imgEl.src= `data:image/png;base64,${imgee}`
        imgVisu.appendChild(imgEl)
    })   
}

function baixarImg(id){
    fetch(`/camisa/${id}`, {
        method: 'GET',
    })
    .then(res => {return res.json()})
    .then(res => {
        const imgee = String(res.result.imagem).replace(/^data:image\/[a-z]+;base64./, "")
        let a = document.createElement('a')
        a.href= `data:image/png;base64,${imgee}`
        a.download = `imagem-${res.result.selecao}_${id}.png`
        a.click()
    }) 
}