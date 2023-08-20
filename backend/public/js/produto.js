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

async function visualizarImg(id) {
    const imgVisu = document.querySelector('.visualizarImg-modal')
    const display2 = ['flex', 'none']
    let dCount4 = 0
    function changeDisplay2(element) {
        element.style.display = display2[dCount4]
        dCount4++
        if (dCount4 > 1) dCount4 = 0
    }

    document.addEventListener('click', (e) => {
        if (
            e.target.className === 'bntCloseImg' ||
            e.target.className === 'visualizarImg'
        ) {
            changeDisplay2(imgVisu)
        }
    })
    await fetch(`/camisa/${id}`, {
        method: 'GET',
    })
        .then(res => { return res.json() })
        .then(res => {
            const imgee = String(res.result.imagem).replace(/^data:image\/[a-z]+;base64./, "").trim()
            imgVisu.children[0].children[0]
                .src = `data:image/png;base64,${imgee}`.trim()
        })
}

function baixarImg(id) {
    fetch(`/camisa/${id}`, {
        method: 'GET',
    })
        .then(res => { return res.json() })
        .then(res => {
            const imgee = String(res.result.imagem).replace(/^data:image\/[a-z]+;base64./, "")
            let a = document.createElement('a')
            a.href = `data:image/png;base64,${imgee}`
            a.download = `img-${res.result.liga}_${res.result.selecao}_${id}_${Date.now()}.png`
            a.click()
        })
}