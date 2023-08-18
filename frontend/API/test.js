const create = fetch('https://localhost:5555/nova-camisa', {
    method: 'POST',
})
.then(res => {return res.json()})
.then(res => console.log)