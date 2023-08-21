const modalContainer = document.querySelector('.modal-container')

let modalUpdate = document.querySelector('.modal-update')
let modalUpdateInputs = document.querySelector('.inputs-modal-update')

let bntUpdateProduct = document.querySelector('.bntUpdateProduct')

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

    const display5 = ['flex', 'none']
    let dCount5 = 0
    function changeDisplay5(element) {
        element.style.display = display5[dCount5]
        dCount5++
        if (dCount5 > 1) dCount5 = 0
    }

    document.addEventListener('click', (e) => {
        if (
            e.target.className === 'bntCloseUpdate' ||
            e.target.className === 'editar'
        ) {
            changeDisplay5(modalUpdate)
        }
    })

    await fetch(`/camisa/${id}`, {
        method: 'GET',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        }
    })
        .then(res => { return res.json() })
        .then(res => {

            let inImagem = document.createElement('input')
            inImagem.required
            inImagem.type = 'file'
            inImagem.name = 'imagem'
            inImagem.id = 'imagem'
            inImagem.classList.add('input-imagem')
            // inImagem.files = res.result.imagem || NÃO FUNCIONA
            modalUpdateInputs.appendChild(inImagem)

            let inImagemSrc = encodeBase64UpdateCamisa(inImagem)

            function createInput(nameId, length) {
                let inputy = document.createElement('input')
                inputy.required
                inputy.type = 'text'
                inputy.name = nameId
                inputy.id = nameId
                inputy.classList.add(`input-${nameId}`)
                inputy.placeholder = `${nameId.toUpperCase()}: ${res.result[`${nameId}`]}`
                inputy.value = `${res.result[`${nameId}`]}`
                inputy.maxLength = length
                modalUpdateInputs.appendChild(inputy)
            }

            let id = res.result.id

            createInput('liga', '30')
            createInput('selecao', '30')
            createInput('descricao', '30')
            createInput('custo', '20')

            document.addEventListener('click', (e) => {
                if (e.target.className === 'bntUpdateProduct') {
                    encodeBase64UpdateCamisa(id)
                }
            })
        })
        .catch(e => { console.log(e) })

    function encodeBase64UpdateCamisa(id) {
        const img = document.getElementsByClassName('input-imagem')[0].files;
        if (img.length > 0) {
            const file = img[0];
            const fileReader = new FileReader();

            fileReader.onload = (fileLoadedEvent) => {
                const src = fileLoadedEvent.target.result; // <--- data: base64
                updateProduct(id, src)

            }
            fileReader.readAsDataURL(file);
        }
    }
}

const updateProduct = async (id, srcImg) => {
    const liga = document.getElementsByClassName('input-liga')[0].value
    const sel = document.getElementsByClassName('input-selecao')[0].value
    const desc = document.getElementsByClassName('input-descricao')[0].value
    const cust = document.getElementsByClassName('input-custo')[0].value
    let inImagem = 'sem imagem'
    inImagem = srcImg
    if (
        liga.length > 0 &&
        sel.length > 0 &&
        desc.length > 0 &&
        cust.length > 0 &&
        inImagem !== 'sem imagem'
    ) {
        await fetch(`/camisa/${id}`, {
            method: 'PUT',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                liga: `${liga}`,
                selecao: `${sel}`,
                descricao: `${desc}`,
                custo: `${cust}`,
                imagem: `${inImagem}`
            })
        })
            .then(res => { return res.json })
            .then(() => {
                setSent(bntUpdateProduct, true)
            })
    } else {
        alert('Preencha todos os campos')
    }
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
        .catch((e) => {
            alert(e)
        })
}


function setSent(el, refresh) {
    el.addEventListener('click', (e) => {
        e.preventDefault()
        el.innerHTML = 'ENVIADO!'
        el.style.color = 'green'
        el.style.opacity = 0.3
        el.style.cursor = 'default'
    })
    refresh ? window.location.reload() : null
}