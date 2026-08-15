// ======================================================
// TIENDA HERMANAS E&Y
// ======================================================


// ======================================================
// CONFIGURACIÓN
// ======================================================

// IMPORTANTE:
// Colocar aquí el número de WhatsApp de la tienda.
//
// Argentina:
// Código país = 54
//
// Ejemplo:
// 5493871234567
//
// NO colocar +, espacios ni guiones.

const WHATSAPP = "5493878304999";


// ======================================================
// PRODUCTOS
// ======================================================

const productos = [

    {
        id: 1,
        nombre: "Manzana Roja",
        precio: 1800,
        unidad: "kg",
        categoria: "frutas",
        icono: "🍎"
    },

    {
        id: 2,
        nombre: "Banana",
        precio: 1600,
        unidad: "kg",
        categoria: "frutas",
        icono: "🍌"
    },

    {
        id: 3,
        nombre: "Naranja",
        precio: 1400,
        unidad: "kg",
        categoria: "frutas",
        icono: "🍊"
    },

    {
        id: 4,
        nombre: "Frutilla",
        precio: 3500,
        unidad: "kg",
        categoria: "frutas",
        icono: "🍓"
    },

    {
        id: 5,
        nombre: "Palta",
        precio: 4200,
        unidad: "kg",
        categoria: "frutas",
        icono: "🥑"
    },

    {
        id: 6,
        nombre: "Tomate",
        precio: 2200,
        unidad: "kg",
        categoria: "verduras",
        icono: "🍅"
    },

    {
        id: 7,
        nombre: "Zanahoria",
        precio: 1200,
        unidad: "kg",
        categoria: "verduras",
        icono: "🥕"
    },

    {
        id: 8,
        nombre: "Lechuga",
        precio: 1000,
        unidad: "unidad",
        categoria: "verduras",
        icono: "🥬"
    },

    {
        id: 9,
        nombre: "Papa",
        precio: 1300,
        unidad: "kg",
        categoria: "verduras",
        icono: "🥔"
    },

    {
        id: 10,
        nombre: "Cebolla",
        precio: 1200,
        unidad: "kg",
        categoria: "verduras",
        icono: "🧅"
    },

    {
        id: 11,
        nombre: "Morron",
        precio: 2800,
        unidad: "kg",
        categoria: "verduras",
        icono: "🫑"
    },

    {
        id: 12,
        nombre: "Ajo",
        precio: 900,
        unidad: "unidad",
        categoria: "verduras",
        icono: "🧄"
    }

];


// ======================================================
// CARRITO
// ======================================================

let carrito = [];


// ======================================================
// MOSTRAR PRODUCTOS
// ======================================================

function mostrarProductos(lista = productos) {

    const catalogo = document.getElementById("catalogo");

    catalogo.innerHTML = "";

    lista.forEach(producto => {

        const tarjeta = document.createElement("article");

        tarjeta.className = "producto";

        tarjeta.innerHTML = `

            <div class="producto-imagen">
                ${producto.icono}
            </div>

            <div class="producto-info">

                <span class="categoria-producto">
                    ${producto.categoria}
                </span>

                <h3>
                    ${producto.nombre}
                </h3>

                <div class="precio">
                    $${formatearPrecio(producto.precio)}
                </div>

                <div class="unidad">
                    Precio por ${producto.unidad}
                </div>

                <br>

                <button
                    class="agregar"
                    onclick="agregarAlCarrito(${producto.id})"
                >
                    🛒 Agregar
                </button>

            </div>

        `;

        catalogo.appendChild(tarjeta);

    });

}


// ======================================================
// AGREGAR PRODUCTO
// ======================================================

function agregarAlCarrito(id) {

    const producto = productos.find(p => p.id === id);

    const existente = carrito.find(p => p.id === id);

    if (existente) {

        existente.cantidad++;

    } else {

        carrito.push({
            ...producto,
            cantidad: 1
        });

    }

    actualizarCarrito();

    abrirCarrito();

}


// ======================================================
// ACTUALIZAR CARRITO
// ======================================================

function actualizarCarrito() {

    const contenedor =
        document.getElementById("itemsCarrito");

    const contador =
        document.getElementById("contadorCarrito");

    const total =
        document.getElementById("totalCarrito");


    contenedor.innerHTML = "";


    let cantidadTotal = 0;
    let precioTotal = 0;


    carrito.forEach(item => {

        cantidadTotal += item.cantidad;

        precioTotal += item.precio * item.cantidad;


        const elemento = document.createElement("div");

        elemento.className = "item-carrito";


        elemento.innerHTML = `

            <div class="item-icon">
                ${item.icono}
            </div>

            <div class="item-info">

                <h4>
                    ${item.nombre}
                </h4>

                <span class="item-precio">
                    $${formatearPrecio(item.precio)}
                </span>

            </div>


            <div class="cantidad">

                <button
                    onclick="cambiarCantidad(${item.id}, -1)"
                >
                    −
                </button>

                <strong>
                    ${item.cantidad}
                </strong>

                <button
                    onclick="cambiarCantidad(${item.id}, 1)"
                >
                    +
                </button>

            </div>

        `;


        contenedor.appendChild(elemento);

    });


    contador.textContent = cantidadTotal;

    total.textContent =
        "$" + formatearPrecio(precioTotal);


    if (carrito.length === 0) {

        contenedor.innerHTML = `
            <div style="
                text-align:center;
                padding:40px 10px;
                color:#78909c;
            ">
                <div style="font-size:60px;">
                    🛒
                </div>

                <h3>
                    Tu carrito está vacío
                </h3>

                <p>
                    Agregá productos para comenzar.
                </p>
            </div>
        `;

    }

}


// ======================================================
// CAMBIAR CANTIDAD
// ======================================================

function cambiarCantidad(id, cambio) {

    const producto = carrito.find(p => p.id === id);

    if (!producto) return;


    producto.cantidad += cambio;


    if (producto.cantidad <= 0) {

        carrito =
            carrito.filter(p => p.id !== id);

    }


    actualizarCarrito();

}


// ======================================================
// FILTRAR PRODUCTOS
// ======================================================

function filtrarProductos(categoria) {

    const botones =
        document.querySelectorAll(".categoria");


    botones.forEach(btn => {

        btn.classList.remove("activa");

    });


    event.target.classList.add("activa");


    if (categoria === "todos") {

        mostrarProductos(productos);

    } else {

        const filtrados =
            productos.filter(
                p => p.categoria === categoria
            );

        mostrarProductos(filtrados);

    }

}


// ======================================================
// ABRIR CARRITO
// ======================================================

function abrirCarrito() {

    document
        .getElementById("carritoModal")
        .classList.add("mostrar");

}


// ======================================================
// CERRAR CARRITO
// ======================================================

function cerrarCarrito() {

    document
        .getElementById("carritoModal")
        .classList.remove("mostrar");

}


// ======================================================
// FORMATEAR PRECIO
// ======================================================

function formatearPrecio(numero) {

    return new Intl.NumberFormat("es-AR")
        .format(numero);

}


// ======================================================
// ENVIAR PEDIDO A WHATSAPP
// ======================================================

function enviarWhatsApp() {


    if (carrito.length === 0) {

        alert("El carrito está vacío.");

        return;

    }


    const nombre =
        document.getElementById("nombreCliente").value.trim();


    const telefono =
        document.getElementById("telefonoCliente").value.trim();


    const direccion =
        document.getElementById("direccionCliente").value.trim();


    const observaciones =
        document.getElementById("observaciones").value.trim();


    if (!nombre) {

        alert("Por favor ingresá tu nombre.");

        return;

    }


    if (!telefono) {

        alert("Por favor ingresá tu teléfono.");

        return;

    }


    if (!direccion) {

        alert("Por favor ingresá la dirección de entrega.");

        return;

    }


    let total = 0;


    let mensaje =
        "🍎 *NUEVO PEDIDO - TIENDA HERMANAS E&Y*%0A%0A";


    mensaje +=
        "👤 *Cliente:* " +
        encodeURIComponent(nombre) +
        "%0A";


    mensaje +=
        "📞 *Teléfono:* " +
        encodeURIComponent(telefono) +
        "%0A";


    mensaje +=
        "📍 *Dirección:* " +
        encodeURIComponent(direccion) +
        "%0A%0A";


    mensaje +=
        "🛒 *PRODUCTOS:*%0A%0A";


    carrito.forEach(item => {

        const subtotal =
            item.precio * item.cantidad;


        total += subtotal;


        mensaje +=
            "• " +
            encodeURIComponent(item.nombre) +
            " x" +
            item.cantidad +
            " = $" +
            formatearPrecio(subtotal) +
            "%0A";

    });


    mensaje += "%0A";


    mensaje +=
        "💰 *TOTAL: $" +
        formatearPrecio(total) +
        "*%0A%0A";


    if (observaciones) {

        mensaje +=
            "📝 *Observaciones:*%0A" +
            encodeURIComponent(observaciones) +
            "%0A%0A";

    }


    mensaje +=
        "✅ Pedido realizado desde la tienda online.";


    const url =
        "https://wa.me/" +
        WHATSAPP +
        "?text=" +
        mensaje;


    window.open(url, "_blank");

}


// ======================================================
// CARGAR TIENDA
// ======================================================

document.addEventListener(
    "DOMContentLoaded",
    function () {

        mostrarProductos();

        actualizarCarrito();

    }
);