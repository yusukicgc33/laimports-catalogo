const campBrasil = document.getElementById('camp-brasil')
const selInter = document.getElementById('sel-inter')

//MUDAR urlDev PARA urlProd QUANDO FIZER O PUSH lá no fetch
const urlProd = 'https://api-laimports-catalogo.onrender.com/camisa?limit=99999'
const urlDev = 'http://localhost:5555/camisa?limit=99999'

const createCard = (
    id,
    imgPath,
    tituloLinkHref,
    tituloLinkText,
    descText,
    custoText,
    resLiga
) => {
    let card = document.createElement('div')
    card.classList.add('card')

    let camisa = document.createElement('div')
    camisa.classList.add('camisa')
    let imgCamisa = document.createElement('img')
    imgCamisa.src = imgPath
    imgCamisa.alt = 'camisa'
    camisa.appendChild(imgCamisa)

    card.appendChild(camisa)


    let info = document.createElement('div')
    info.classList.add('info')
    let titulo = document.createElement('span')
    titulo.classList.add('titulo')
    let tituloLink = document.createElement('a')
    tituloLink.href = tituloLinkHref
    tituloLink.innerText = tituloLinkText
    titulo.appendChild(tituloLink)
    info.appendChild(titulo)

    let desc = document.createElement('p')
    desc.classList.add('desc')
    desc.innerText = descText
    info.appendChild(desc)

    let custo = document.createElement('div')
    custo.classList.add('custo')
    let custoSpan = document.createElement('span')
    custoSpan.innerText = custoText
    custo.appendChild(custoSpan)
    info.appendChild(custo)

    let bnt = document.createElement('button')
    bnt.classList.add('add')
    bnt.innerText = 'ADICIONAR'
    bnt.addEventListener('click', (e) => {
        saveToSession(
            id, 
            resLiga,
            tituloLinkText,
            descText,
            custoText,
            imgPath
            )
        setCartQtd()
    })
    info.appendChild(bnt)
    card.appendChild(info)
    return card
}

const generateCardsBySection = (data) => {
    if (data.errors || Object.values(data.result).length === 0 || data.result < 1) {
        campBrasil.children[1].innerHTML = `<h1>SEM CAMISAS REGISTRADAS</h1>`
        selInter.children[1].innerHTML = `<h1>SEM CAMISAS REGISTRADAS</h1>`
    }
    let res = data
    let limit = 10
    let cBLimit = 5 // Quantidade de Cards = limit - cBLimit
    let sILimit = 5
    for (result of res.result) {
        let resLiga = String(result.liga)
        let
            id = result.id,
            imgPath = result.imagem //result.imagem,
            tituloLinkHref = '#',
            tituloLinkText = result.selecao,
            descText = result.descricao,
            custoText = result.custo
        if (resLiga.includes("campeonato brasileiro")) {
            if (cBLimit < limit) {
                campBrasil
                    .children[1] //é uma div da classe cards
                    .appendChild(createCard(
                        id,
                        imgPath,
                        tituloLinkHref,
                        tituloLinkText,
                        descText,
                        custoText,
                        resLiga
                    ))
            }
            cBLimit++
        } else {
            if (sILimit < limit) {
                console.log('sI');
                selInter
                    .children[1] //é uma div da classe cards
                    .appendChild(createCard(
                        imgPath,
                        tituloLinkHref,
                        tituloLinkText,
                        descText,
                        custoText,
                    ))
            }
            sILimit++
        }
        // console.log('Chamada a API (+1?)');
    }
}

const getCards = async (filter = '') => {
    if (filter) filter = '&filter=' + filter //Já existem um ?limit=99999

    const data = await fetch(urlProd + `${filter}`, { //MUDAR urlDev PARA urlProd QUANDO FIZER O PUSH
        method: 'GET',
    })
        .then(res => { return res.json() })
        .then(res => generateCardsBySection(res))
}

getCards()

