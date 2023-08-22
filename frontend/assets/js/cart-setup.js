const saveToSession = (
    id, 
    liga,
    selecao,
    descricao,
    custo,
    imagem
    ) => {
    let itemsList = JSON.parse(sessionStorage.getItem('itemsList')) || []
    
    itemsList.push({
        id: id,
        liga: liga,
        selecao: selecao,
        descricao: descricao,
        custo: custo,
        imagem: imagem
    })

    sessionStorage.setItem('itemsList', JSON.stringify(itemsList))
}

const getFromSession = () => {
    let itemsList = JSON.parse(sessionStorage.getItem('itemsList')) || []
    return itemsList
}

const createItem = (id, imgSrc, selecao, decricao, custo) => {
    let item = document.createElement('tr')

    let tdId = document.createElement('td')
    tdId.innerHTML = id
    tdId.classList.add('tdId')
    item.appendChild(tdId)

    let tdImagem = document.createElement('td')
    let img = document.createElement('img')
    img.alt = 'camisa'
    img.src = imgSrc
    tdImagem.appendChild(img)
    tdImagem.classList.add('tdImagem')
    item.appendChild(tdImagem)


    let tdSelecao = document.createElement('td')
    tdSelecao.innerHTML = selecao
    tdSelecao.classList.add('tdSelecao')
    item.appendChild(tdSelecao)

    let tdDesc = document.createElement('td')
    tdDesc.innerHTML = decricao
    tdDesc.classList.add('tdDesc')
    item.appendChild(tdDesc)

    let tdCusto = document.createElement('td')
    tdCusto.innerHTML = custo
    tdCusto.classList.add('tdCusto')
    item.appendChild(tdCusto)

    return item
}