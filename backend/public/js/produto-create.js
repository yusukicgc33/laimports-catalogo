const bntCreateProduct = document.querySelector('.bntCreateProduct')
bntCreateProduct.addEventListener('click', encodeBase64CreateCamisa)

const createCamisa = async (src) => {
    let imagem = src
    const liga = document.getElementById('liga').value
    const sel = document.getElementById('selecao').value
    const desc = document.getElementById('descricao').value
    const cust = document.getElementById('custo').value

    if(
        liga.length > 0 && 
        sel.length > 0 &&
        desc.length > 0 &&
        cust.length > 0 &&
        imagem !== 'sem imagem'
        ){
        await fetch('/camisa', {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                liga: liga,
                selecao: sel,
                descricao: desc,
                custo: cust,
                imagem: imagem
            })
        })
        .then(res => {return res.json()})
        .then((res) => {
            setSent(bntCreateProduct, true)
        })
        .catch((e) => {
            alert(e)
        })
    }else{
        alert('Preencha todos os campos')
    }
}

function encodeBase64CreateCamisa (){
    const img = document.getElementById("imagem").files;
    if (img.length > 0) {
        const file = img[0];
        const fileReader = new FileReader();

        fileReader.onload = (fileLoadedEvent) => {
            const src = fileLoadedEvent.target.result; // <--- data: base64
            createCamisa(src)
        }
        fileReader.readAsDataURL(file);
    }
}