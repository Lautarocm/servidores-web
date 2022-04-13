const fs = require("fs")
const express = require("express")
const app = express()
const Contenedor = require("./fs.js")


// let contenedor1 = new Contenedor("productos.json")
// contenedor1.save({title:"reloj", price:8000, thumbnail:"www.asdasd.com"})
// contenedor1.save({title:"collar", price:7500, thumbnail:"www.asdasd.com"})
// contenedor1.save({title:"anillo", price:6000, thumbnail:"www.asdasd.com"})

app.get("/", (req, res) => {
    res.send("<h1>HOME</h1>")
})

app.get("/productos", (req, res) => {
    fs.readFile("productos.json", "utf-8", (err, data)=>{
        if(err){
            console.log("error al obtener productos")
        }
        else{
            res.send(JSON.parse(data))
        }
    })
})

app.get("/productoRandom", (req, res) => {
    fs.readFile("productos.json", "utf-8", (err, data)=>{
        if(err){
            console.log("error al obtener producto")
        }
        else{
            let productos = JSON.parse(data)
            let randomProduct = productos[Math.floor(Math.random()*productos.length)]
            res.send(randomProduct)
        }
    })
    
})

app.listen(8080, () => {
    console.log("corriendo 8080")
})