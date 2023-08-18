const data = fetch('http://localhost:5555/camisa', {
    method: 'GET',
})
.then(res => {return res.json()})
.then(res => console.log(res))