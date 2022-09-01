const Contenedor = require('./contenedor.js')
const contenedor = new Contenedor()

let user = {
    first_name: "Leonel",
    last_name: "Hinojosa",
    username: "Emi",
    age: 17,
    email: "emilianomaldonado675@gmail.com"
}

//METODOS

contenedor.save(user).then(result => console.log(result))

// contenedor.getAll(user).then(result => console.log(result))

// contenedor.getById(2).then(result => console.log(result))

// contenedor.deleteById(2).then(result => console.log(result))

//  contenedor.deleteAll().then(result => console.log(result))