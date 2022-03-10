

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
let botonCarrito = document.querySelector(".botonCarrito")
const panelCarrito = document.querySelector(".panelCarrito") 

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

botonCarrito.addEventListener("click",() => {
    panelCarrito.classList.toggle("activo")
    mostrarCarrito()
})
formPasteleriaTradicional.addEventListener('submit',(e) => {
    e.preventDefault()

    let nombre = document.getElementById("seleccionarPasteleríaTradicional").value
    let aptoCeliaco = document.getElementById("sinTaccPasteleríaTradicional").checked
    let cantidad = document.getElementById("cantidadPasteleríaTradicional").value
    let comentarios = document.getElementById("comentariosPasteleríaTradicional").value

    if(validarCantidad(cantidad)) //? cantidad=Number(cantidad) : formPasteleriaTradicional.reset() //Operador Ternario
    {
        cantidad=Number(cantidad)
        //Verificación de existencia del producto en carrito
        let productoEncontrado = carrito.find((producto) => producto.nombre === nombre)
        if(productoEncontrado){
            productoEncontrado.cantidad += cantidad
        }else{
            let {precio} = (listaPrecios.find((producto) => producto.nombre === nombre)) //Desestructuración
            nuevoProducto = new productoPasteleríaTradicional(nombre, cantidad, aptoCeliaco, comentarios, precio)
            nuevoProducto.subTotalProducto()
            carrito.push(nuevoProducto)
        }
    }else{
        formPasteleriaTradicional.reset()
    }
    console.log(carrito)
    mostrarCarrito();
})

function validarCantidad(cantidad){

    if(cantidad < 1 || cantidad > cantidadMáxima || cantidad === ""){
        swal({
            title: `La cantidad debe estar entre 1 y ${cantidadMáxima}`
        })
        return false    
    }else{
        return true
    }
}

const mostrarCarrito = () => {
    panelCarrito.innerHTML = "";
    carrito.forEach((item) => {
      let {nombre, cantidad, precio, subTotal } = item;
      panelCarrito.innerHTML += `
          <div class="caja--carrito" >
           
            <div class="caja--carrito--datos">
              <p class="nombre">${nombre}</p>
              <p class="cantidad">CANTIDAD: ${cantidad}</p>
              <p class="subtotal">Subtotal: $${subTotal}</p>
              <p class="precio"> $ <span>${precio}</span> </p>
            
            </div>
  
          </div>`;
    });
    localStorage.setItem("carritoDB", JSON.stringify(carrito));
 
  };