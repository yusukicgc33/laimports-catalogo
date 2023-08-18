const data = fetch('https://api-laimports-catalogo.onrender.com/camisa', {
    method: 'GET',
})
.then(res => {return res.json()})
.then(res => console.log(res))