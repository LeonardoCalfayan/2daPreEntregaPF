

const cantidadMáxima = 100

const listaPrecios = [
    {
    nombre: "tartaFrutillas",
    precio: 800
    },
    {
    nombre: "tartaChocolate",
    precio: 1000
    },
    {
    nombre: "tartaDurazno",
    precio: 900
    },
    {
    nombre: "galetasDecoradas",
    precio: 300
    },
    {
    nombre: "galletasCraqueladas",
    precio: 350
    },
    {
    nombre: "galetasFlores",
    precio: 325
    }
]

let carrito = JSON.parse(localStorage.getItem("carritoDB")) || [] //levanto el carrito del Local Storage si está, sino el carrito = arreglo vacío

let formPasteleriaTradicional = document.getElementById("formPasteleríaTradicional")

class productoPasteleríaTradicional{
    constructor(nombre, cantidad, aptoCeliaco, comentarios, precio){
        this.nombre = nombre
        this.cantidad = cantidad
        this.aptoCeliaco = aptoCeliaco
        this.comentarios = comentarios
        this.precio = precio
        this.subTotal = 0
    }

    subTotalProducto(){
        this.subTotal = this.precio * this.cantidad
    }
    
}


formPasteleriaTradicional.addEventListener('submit',(e) => {
    e.preventDefault()

    let nombre = document.getElementById("seleccionarPasteleríaTradicional").value
    let aptoCeliaco = document.getElementById("sinTaccPasteleríaTradicional").checked
    let cantidad = document.getElementById("cantidadPasteleríaTradicional").value
    validarCantidad(cantidad) ? cantidad=Number(cantidad) : formPasteleriaTradicional.reset()
    let comentarios = document.getElementById("comentariosPasteleríaTradicional")

//    find


    nuevoProducto = new productoPasteleríaTradicional(nombre, cantidad, aptoCeliaco, comentarios, precio)

    console.log(producto)
    console.log(aptoCeliaco)

})


function validarCantidad(cantidad){

    console.log(cantidad)
    if(cantidad < 1 || cantidad > cantidadMáxima){
        swal({
            title: `La cantidad debe estar entre 1 y ${cantidadMáxima}`
        })
        return false
    
    }else{
        return true
    }
}