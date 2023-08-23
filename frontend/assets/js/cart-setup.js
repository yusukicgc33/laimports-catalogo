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

const deleteFromSession = (chave, valor) => {
    if (chave && valor) {
        let itemsList = getFromSession()

        itemsList = itemsList.filter((jsonObject) => {
            return jsonObject[chave] != valor
        })

        sessionStorage.setItem('itemsList', JSON.stringify(itemsList))

        console.log(itemsList)
        return
    }
    return 'informe o index'
}

const sendOrder = (itemsList, clientData, misc) => {
    const telOwner = String('5581994911766') //55819...
    if(!clientData.name) clientData.name = 'Cliente'
    let msg = ` *NOVO PEDIDO* \n\nOlá! Sou *${clientData.name}* \nSegue meu pedido: \n\n`

    for (item of itemsList){
        msg = msg + `*ID:* *${item.id}* \n`
        msg = msg + `*SELEÇÃO:* _${item.selecao}_ \n`
        msg = msg + `*DESCRIÇÃO:* _${item.descricao}_ \n`
        msg = msg + `*CUSTO:* *${item.custo}* \n\n`
    }

    msg = msg + `\n_*Resumo*_\n\n`
    msg = msg + `_*Total:*_ R$ ${misc.custoTotal}\n`
    msg = msg + `_*Qtd:*_ ${misc.qtdTotal} unidade(s)\n\n`

    msg = msg + `_*Pedido feito em:*_\n`
    msg = msg + `${misc.data} às ${misc.hora}`
    

    msg = encodeURIComponent(msg.trim())
    let wppPop = window.open(`https://wa.me/${telOwner}?text=${msg}`, '__blank')
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

    let tdRemover = document.createElement('td')
    let bntRemover = document.createElement('div')
    bntRemover.classList.add('bntRemoverCartList')
    bntRemover.style.width = '25px'
    bntRemover.style.height = '25px'
    bntRemover.style.backgroundColor = 'red'
    bntRemover.style.cursor = 'pointer'
    bntRemover.addEventListener('click', () => {
        deleteFromSession('id', `${id}`)
        window.location.reload()
    })
    tdRemover.appendChild(bntRemover)
    item.appendChild(tdRemover)

    return item
}