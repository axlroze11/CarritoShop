const carrito = document.querySelector("#carrito");
const listaCursos = document.querySelector("#lista-cursos");
const contenedorCarrito = document.querySelector("#lista-carrito tbody");
const vaciarCarritoBtn = document.querySelector("#vaciar-carrito");
let articulosCarrito = [];

cargarEventsListeners();



function cargarEventsListeners() {
    //CUANDO AGREGAS UN CURSO PRESIONANDO "AGREGAR AL CARRITO"
    listaCursos.addEventListener("click", agregarCurso);

    //ELIMINAR CURSO
    carrito.addEventListener("click", eliminarCurso);

    //VACIAR CARRITO
    vaciarCarritoBtn.addEventListener("click", () => {
        articulosCarrito = [];
        limpiarHTML();
    });
}

//FUNCIONES

function agregarCurso(e) {
    e.preventDefault();

    if (e.target.classList.contains("agregar-carrito")) {
        const cursoSeleccionado = e.target.parentElement.parentElement;
        leerDatosCurso(cursoSeleccionado);
    }
}

function eliminarCurso(e) {
    e.preventDefault();
    if (e.target.classList.contains("borrar-curso")) {
        const cursoID = e.target.getAttribute("data-id");

        //ELIMINAR DEL ARREGLO articuloCarrito TOMANDO EN CUENTA SU DATA-ID - con .FILTER

        articulosCarrito = articulosCarrito.filter(curso => cursoID !== curso.id);


        console.log(articulosCarrito);
        carritoHTML(); //iterar y mostrar su html
    }
}

// LEER EL CONTENIDO DEL HTML AL QUE LE DIMOS CLICK Y EXTRAE INFORMACION DEL CURSO

function leerDatosCurso(curso) {
    //console.log(curso);

    //CREAR OBJETO CON EL CONTENIDO DEL CURSO ACTUAL

    const infoCurso = {
        imagen: curso.querySelector("img").src,
        titulo: curso.querySelector("h4").textContent,
        precio: curso.querySelector(".precio span").textContent,
        id: curso.querySelector("a").getAttribute("data-id"),
        cantidad: 1,
    };

    //console.log(infoCurso);

    //REVISAR SI UN ELEMENTO YA EXISTE EN EL CARRITO
    // .some (Sirve para iterar en un arreglo buscando y verificar si un elemento existe )

    const existe = articulosCarrito.some(curso => curso.id === infoCurso.id);

    if (existe) {

        //Actualizamos cantidad
        const cursos = articulosCarrito.map(curso => {
            if (curso.id === infoCurso.id) {

                curso.cantidad++;
                return curso; // RETORNA LOS REPETIDOS, AÑADIENDO 1 A CANTIDAD

            } else {

                return curso; // RETORNA EL CURSO NORMAL, QUE NO SE REPITE, IMPORTANTE!  

            }
        });
        articulosCarrito = [...cursos];

    } else {

        //AGREGAR ELEMENTOS AL ARREGLO DEL CARRITO
        articulosCarrito = [...articulosCarrito, infoCurso];

    }





    console.log(articulosCarrito);

    carritoHTML();
}

// MOSTRAR CARRITO DE COMPRAS EN EL HTML

function carritoHTML() {
    //LIMPIAR EL HTML
    limpiarHTML();

    articulosCarrito.forEach((curso) => {

        const { imagen, titulo, precio, cantidad, id } = curso; // EL OBJETO LO REPARTIMOS A CONST
        const row = document.createElement("tr");
        row.innerHTML = `
        <td>
            <img src= "${imagen}" width="100"> 
        </td>
        <td>
            ${titulo}
        </td>
        <td>
            ${precio}
        </td>
        <td>
            ${cantidad}
        </td>
        <td>
            <a href="#" class="borrar-curso" data-id="${id}" > X </a>
        </td>
        `;

        //AGREGAR EL HTML DEL CARRITO EN EL TABLE BODY
        contenedorCarrito.appendChild(row);
    });
}

//LIMPIAR EL HTML DEL TBODY

function limpiarHTML() {
    //FORMA LENTA
    //contenedorCarrito.innerHTML='';

    //FORMA RAPIDA

    while (contenedorCarrito.firstChild) {
        contenedorCarrito.removeChild(contenedorCarrito.firstChild);
    }
}