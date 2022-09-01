const fs = require('fs')
const pathToFile = './users.json'
class Contenedor {
    save = async (user) => {
        if(!user.first_name || !user.username || !user.email) return {status: "error", message: "missing fields"}
        try{
            if(fs.existsSync(pathToFile)){
                
                 let data = await fs.promises.readFile(pathToFile, 'utf-8')
                 let users = JSON.parse(data)
                 let id = users[users.length-1].id+1
                 user.id = id
                 users.push(user)
                 await fs.promises.writeFile(pathToFile,JSON.stringify(users,null,2))
                 return {status: "success", message: "User created"}
            } else{
                user.id = 1
                await fs.promises.writeFile(pathToFile, JSON.stringify([user],null,2))
                return {status: "success", message: "User created"}
            }
        }catch(err){
            return {status: "error",message: err.message}
        }
    }

    getAll = async () => {
        if(fs.existsSync(pathToFile)){
            let data = await fs.promises.readFile(pathToFile, 'utf-8')
            let users = JSON.parse(data)
            return { status: "success", message: users}
        }
        else{
            return { status: "error", message: err.message}
        }
    }

    getById = async (id) => {
        if(!id) return { status: "success", message: "Id is requerid"}
        if(fs.existsSync(pathToFile)){
            let data = await fs.promises.readFile(pathToFile, 'utf-8')
            let users = JSON.parse(data)
            let user = users.find(user => user.id === id)
            if(user)return { status: "success", message: user}
            return { status: "success", message: "User not found"}
        }
        else{
            return { status: "error", message: err.message}
        }
    }

    deleteById = async(id) =>{
        if(!id) return { status: "success", message: "Id is requerid"}
        if(fs.existsSync(pathToFile)){
            let data = await fs.promises.readFile(pathToFile, 'utf-8')
            let users = JSON.parse(data)
            let newUsers = users.filter(user => user.id !== id)
            await fs.promises.writeFile(pathToFile, JSON.stringify(newUsers,null,2))
            return {status: "success", message: "User deleted"}
        }
        else{
            return { status: "error", message: err.message}
        }
    }

    deleteAll = async () => {
        try {
        if(fs.existsSync(pathToFile)){
          let data = JSON.stringify([],null,2);
          fs.writeFileSync(pathToFile, data);
          return {status: "success", message: "file deleted"}
        }
        else{
            return {status: "success", message: "file not found"}
        }
        } catch (err) {
            return {status: "success", message: err.message}
        }
      }
}

module.exports = Contenedor
