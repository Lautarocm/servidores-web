const fs = require("fs")

class Contenedor {

    constructor(nombre){
        this.nombre = nombre
        this.products = []
    }
    
    save(obj){
        const products = this.products
        let productId = products.length + 1
        obj.id = productId  
        products.push(obj)
        fs.readFile(`./${this.nombre}`, "utf-8", (err, data)=>{
            if(err){
                console.log("el archivo no se encuentra")
                fs.writeFile(`./${this.nombre}`, JSON.stringify(products), "utf-8", (err)=>{
                    if(err){
                        console.log("No se pudo crear la carpeta " + err)
                    }
                    else{
                        console.log("Producto añadido con el id " + productId)
                    }
                })
            }
            else{
                fs.writeFile(`./${this.nombre}`, JSON.stringify(products), "utf-8", (err)=>{
                    if(err){
                        console.log("No se pudo cargar el producto")
                    }
                    else{
                        console.log("se agregó el producto ", obj)
                    }
                })
            }
        })
    }
    
    getById(number){

        fs.readFile(`./${this.nombre}`, "utf-8", (err, data)=>{
            if(err){
                console.log("no se encontró el archivo")
            }
            else{
                if(data){
                    let prod = JSON.parse(data).filter(product => product.id == number)
                    if(prod.length>0){
                        console.log(`producto ${number}`, prod)
                        return prod
                    }
                    else{
                        console.log("no existe el producto " + number)
                        return null
                    }
                }
                else{
                    console.log("No se encontraron productos")
                    return null
                }
            }
        })
    }

    getAll(){
        fs.readFile(`./${this.nombre}`, "utf-8", (err, data)=>{
            if(err){
                console.log("no se encontró el archivo")
            }
            else{
                if(data){
                    let productos = JSON.parse(data)
                    if(productos.length>0){
                        console.log("Trayendo productos")
                        return productos
                    }
                    else{
                        console.log("no hay productos")
                        return null
                    }
                }
                else{
                    console.log("No se encontraron productos")
                    return null
                }
            }
        })
    }

    deleteById(number){
        fs.readFile(`./${this.nombre}`, "utf-8", (err, data)=>{
            if(err){
                console.log("no se pudo leer el archivo")
            }
            else{
                let dataTraida = JSON.parse(data)
                let dataModificada = dataTraida.filter(prod => prod.id !== number)
                fs.writeFile(`./${this.nombre}`, JSON.stringify(dataModificada), "utf-8", (err)=>{
                    if(err){
                        console.log("No se pudo eliminar el producto")
                    }
                    else{
                        console.log(`Producto ${number} eliminado`)
                    }
                })
            }
        })
    }

    deleteAll(){
        fs.writeFile(`./${this.nombre}`, JSON.stringify([]), "utf-8", (err)=>{
            if(err){
                console.log("No se pudieron eliminar los productos")
            }
            else{
                console.log("Productos eliminados correctamente")
            }
        })
    }

}

module.exports = Contenedor

// let contenedor1 = new Contenedor("productos.json")

// contenedor1.save({title:"reloj", price:8000, thumbnail:"www.asdasd.com"})

// contenedor1.save({title:"collar", price:7500, thumbnail:"www.asdasd.com"})

// contenedor1.save({title:"anillo", price:6000, thumbnail:"www.asdasd.com"})

// setTimeout(()=>{
//     contenedor1.getById(1)

//     contenedor1.getById(2)

//     contenedor1.getById(3)

//     contenedor1.getById(4)
// }, 2000)

// setTimeout(()=>{contenedor1.getAll()}, 3000)

// setTimeout(()=>{contenedor1.deleteById(1)},4000)

// setTimeout(()=>{contenedor1.deleteAll()}, 5000) 