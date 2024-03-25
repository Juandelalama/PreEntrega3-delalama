//Productos
const productos = [
    // Audi
    {
        id: "Audi 01",
        titulo: "Audi 01",
        imagen: "./img/Audi/01.jpg",
        categoria: {
            nombre: "Audi",
            id: "audi"
        },
        precio: 1000
    },
    {
        id: "Audi-02",
        titulo: "Audi 02",
        imagen: "./img/Audi/02.webp",
        categoria: {
            nombre: "Audi",
            id: "audi"
        },
        precio: 1000
    },
    {
        id: "Audi-03",
        titulo: "Audi 03",
        imagen: "./img/Audi/03.jpg",
        categoria: {
            nombre: "Audi",
            id: "audi"
        },
        precio: 1000
    },
    {
        id: "Audi-04",
        titulo: "Audi 04",
        imagen: "./img/Audi/04.jpg",
        categoria: {
            nombre: "Audi",
            id: "audi"
        },
        precio: 1000
    },
    // Ferrari
    {
        id: "Ferrari-01",
        titulo: "Ferrari 01",
        imagen: "./img/Ferrari/01.avif",
        categoria: {
            nombre: "Ferrari",
            id: "ferrari"
        },
        precio: 1000
    },
    {
        id: "Ferrari-02",
        titulo: "Ferrari 02",
        imagen: "./img/Ferrari/02.webp",
        categoria: {
            nombre: "Ferrari",
            id: "ferrari"
        },
        precio: 1000
    },
    {
        id: "Ferrari-03",
        titulo: "Ferrari 03",
        imagen: "./img/Ferrari/03.jpg",
        categoria: {
            nombre: "Ferrari",
            id: "ferrari"
        },
        precio: 1000
    },
    {
        id: "Ferrari-04",
        titulo: "Ferrari 04",
        imagen: "./img/Ferrari/04.webp",
        categoria: {
            nombre: "Ferrari",
            id: "ferrari"
        },
        precio: 1000
    },
    // Pagani
    {
        id: "pagani-01",
        titulo: "Pagani 01",
        imagen: "./img/Pagani/01.jpg",
        categoria: {
            nombre: "Pagani",
            id: "pagani"
        },
        precio: 1000
    },
    {
        id: "pagani-02",
        titulo: "Pagani 02",
        imagen: "./img/Pagani/02.jpg",
        categoria: {
            nombre: "Pagani",
            id: "pagani"
        },
        precio: 1000
    },
    {
        id: "pagani-03",
        titulo: "Pagani 03",
        imagen: "./img/Pagani/03.jpg",
        categoria: {
            nombre: "Pagani",
            id: "pagani"
        },
        precio: 1000
    },
    {
        id: "pagani-04",
        titulo: "Pagani 04",
        imagen: "./img/Pagani/04.jpg",
        categoria: {
            nombre: "Pagani",
            id: "pagani"
        },
        precio: 1000
    },
];

const contenedorProductos = document.querySelector('#contenedor-productos')
const botonesCategorias = document.querySelectorAll('.button-select')
const tituloPrincipal = document.querySelector('#titulo-principal')
let botonesAgregar = document.querySelectorAll(".sumar-carrito")
const numero = document.querySelector('#numero')

function cargarProductos(productosElegidos) {

    contenedorProductos.innerHTML = "";

    productosElegidos.forEach(producto => {

        const div = document.createElement('div');
        div.classList.add('producto');
        div.innerHTML = `
            <img class="imagen-producto" src="${producto.imagen}" alt="${producto.titulo}">
            <div class="producto-detalles">
                <h3 class="producto-titulo">${producto.titulo}</h3>
                <p class="producto-precio">${producto.precio}</p>
                <button class="sumar-carrito" id='${producto.id}'>Sumar</button>
            </div> 
        `;

        contenedorProductos.append(div);

    })

    actualizarBotonesAgregar();

}

cargarProductos(productos);

botonesCategorias.forEach(boton => {
    boton.addEventListener("click", (e) => {
        
        botonesCategorias.forEach(boton => boton.classList.remove("active"));
        e.currentTarget.classList.add("active");

        if (e.currentTarget.id != 'todos') {

            const productoCategoria = productos.find(producto => producto.categoria.id === e.currentTarget.id)
            tituloPrincipal.innerText = productoCategoria.categoria.nombre;


            const productosBoton = productos.filter(producto => producto.categoria.id === e.currentTarget.id);
            cargarProductos(productosBoton);

        } else {
            tituloPrincipal.innerText = "Todos los motores"
            cargarProductos(productos)
        }
    })
});

function actualizarBotonesAgregar() {
    botonesAgregar = document.querySelectorAll(".sumar-carrito")

    botonesAgregar.forEach(boton => {
        boton.addEventListener("click", agregarAlCarrito);
    });
}

let productosEnCarrito;

let productosEnCarritoLS = localStorage.getItem('productos-en-carrito');


if (productosEnCarritoLS) {
    productosEnCarrito = JSON.parse(productosEnCarritoLS);
    actualizarNumero();
} else {
    productosEnCarritos = [];
}

function agregarAlCarrito(e) {

    const idBoton = e.currentTarget.id;
    const productoAgregado = productos.find(producto => producto.id === idBoton);

    if(productosEnCarrito.some(producto => producto.id === idBoton)) {
        const index = productosEnCarrito.findIndex(producto => producto.id === idBoton)
        productosEnCarrito[index].cantidad++;
    } else {
        productoAgregado.cantidad = 1;
        productosEnCarrito.push(productoAgregado)
    }
    
    actualizarNumero();

    localStorage.setItem('productos-en-carrito', JSON.stringify(productosEnCarrito));
}

function actualizarNumero(){
    let nuevoNumero = productosEnCarrito.reduce((acc, producto) => acc + producto.cantidad, 0);
    numero.innerText = nuevoNumero
}