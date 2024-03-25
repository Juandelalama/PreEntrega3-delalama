let productosEnCarrito = localStorage.getItem('productos-en-carrito');
productosEnCarrito = JSON.parse(productosEnCarrito);

const contenedorCarroVacio = document.querySelector('#carro-vacio');
const contenedorCarroProductos = document.querySelector('#carro-productos');
const contenedorCarroAcciones = document.querySelector('#carro-acciones');
let botonesEliminar = document.querySelectorAll('.carro-producto-eliminar');
const botonVaciar = document.querySelector('#carrito-acciones-vaciar')
const contenedorTotal = document.querySelector('#total')
const botonComprar = document.querySelector('#carrito-acciones-comprar')

function cargarProductosCarrito(){

    if (productosEnCarrito && productosEnCarrito.length > 0) {

        contenedorCarroVacio.classList.add('disabled')
        contenedorCarroProductos.classList.remove('disabled')
        contenedorCarroAcciones.classList.remove('disabled')
        
        contenedorCarroProductos.innerHTML = '';
    
        productosEnCarrito.forEach(producto => {
    
            const div = document.createElement('div');
            div.classList.add('carro-producto')
            div.innerHTML = `
            <img class="carro-producto-imagen" src="${producto.imagen}" alt="${producto.titulo}">
                            <div class="carro-titulo">
                                <small>titulo</small>
                                <h3>${producto.titulo}</h3>
                            </div>
                            <div class="carro-producto-cantidad">
                                <small>Cantidad</small>
                                <p>${producto.cantidad}</p>
                            </div>
                            <div class="carro-producto-precio">
                                <small>Precio</small>
                                <p>${producto.precio}</p>
                            </div>
                            <div class="carro-producto-subtotal">
                                <small>Subtotal</small>
                                <p>${producto.precio * producto.cantidad}</p>
                            </div>
                            <button class="carro-producto-eliminar" id=${producto.id}><i class="bi bi-trash"></i></button>
            `;
            contenedorCarroProductos.append(div);
        })
    
    } else {
    
        contenedorCarroVacio.classList.remove('disabled')
        contenedorCarroProductos.classList.add('disabled')
        contenedorCarroAcciones.classList.add('disabled')
    }

    actualizarBotonesEliminar();
}

cargarProductosCarrito();


function actualizarBotonesEliminar() {
    botonesEliminar = document.querySelectorAll(".carro-producto-eliminar");

    botonesEliminar.forEach(boton => {
        boton.addEventListener("click", eliminarDelCarrito);
    });
}

function eliminarDelCarro(){
    const idBoton = e.currentTarget.id;
    const productoEliminado = productosEnCarrito.find(producto => producto.id === idBoton);
    const index = productosEnCarrito.findeIndex(producto = producto.id === idBoton);
    productosEnCarrito.splice(index, 1);

    cargarProductosCarrito();

    localStorage.setItem('productos-en-carrito', JSON.stringify(productosEnCarrito)) ;   
}

botonVaciar.addEventListener('click', vaciarCarrito);
function vaciarCarrito() {
    productosEnCarrito.length = 0;
    localStorage.setItem('productos-en-carrito', JSON.stringify(productosEnCarrito));
    cargarProductosCarrito();
}

function actualizarTotal() {
    const totalCalculado =  productosEnCarrito.reduce ((acc,producto) => acc + (producto.precio * producto.cantidad), 0);
    total.innerText = `$${totalCalculado}`;
}

botonComprar.addEventListener('click', comprarCarrito);
function vaciarCarrito() {

    productosEnCarrito.length = 0;
    localStorage.setItem('productos-en-carrito', JSON.stringify(productosEnCarrito));
    
    contenedorCarroVacio.classList.add('disabled')
    contenedorCarroProductos.classList.add('disabled')
    contenedorCarroAcciones.classList.add('disabled')
}



