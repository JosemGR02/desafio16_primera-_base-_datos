
const socket = io('http://localhost:8080')

let usuarios = []
let mensajes = []
let productos = []


// formularios
const productosForm = document.getElementById('formularioProds')
const mensajesForm = document.getElementById('formularioTxt')
const usuariosForm = document.getElementById('formularioAlias')

// contenedores
const contenedorProds = document.getElementById('contenedorProductos')
const contenedorChat = document.getElementById('contenedorMensajes')



// RENDERS

// render productos
const limpiarProds = () => {
    contenedorProds.innerHTML = ""
}
const ProductosRenderizados = async (productos) => {
    let respuesta = await fetch('/assets/templates/productoTemplate.hbs');
    const template = await respuesta.text()
    const templateCompilado = Handlebars.compile(template)
    const html = templateCompilado({productos})
    contenedorProds.innerHTML = html
}

// render mensajeria
const limpiarChat = () => {
    contenedorChat.innerHTML = ""
}

const mensajesRenderizados = async (mensajes, alias) => {
    let respuesta = await fetch('/assets/templates/mensajeriaTemplate.hbs');
    const template = await respuesta.text()
    const templateCompilado = Handlebars.compile(template)
    const html = templateCompilado({mensajes, alias})
    contenedorChat.innerHTML = html
}


// LISTENERS

// Listeners Productos
productosForm.addEventListener('submit', (evento) => {
    evento.preventDefault()
    const datosFormulario = new FormData(productosForm)
    const valoresFormulario = Object.fromEntries(datosFormulario)
    productosForm.reset();
    socket.emit('nuevo producto', valoresFormulario);
})


// Listeners Mensajeria
mensajesForm.addEventListener('submit', (evento) => {
    evento.preventDefault()
    const datosFormulario = new FormData(mensajesForm)
    const valoresformulario = Object.fromEntries(datosFormulario)
    mensajesForm.reset();
    socket.emit('nuevo mensaje', valoresformulario.msjForm);
})


// Listeners usuarios
usuariosForm.addEventListener('submit', (evento) => {
    evento.preventDefault()
    const datosFormulario = new FormData(usuariosForm)
    const valoresformulario = Object.fromEntries(datosFormulario)
    usuariosForm.reset();
    socket.emit('nuevo alias', String(valoresformulario.aliasForm))
}) 

// EVENTOS

// Eventos Productos
socket.on('todos los productos', todosProds => {
    productos = todosProds
    limpiarProds()
    ProductosRenderizados(todosProds)
})


// Eventos mensajeria
socket.on('todos los mensajes', todosMsgs => {
    mensajes = todosMsgs
    limpiarChat()
    mensajesRenderizados(todosMsgs)
})


// Eventos usuarios
socket.on('todos los usuarios', todosUsers => {
    usuarios = todosUsers
    limpiarUser()
    mensajesRenderizados(todosUsers)
})




////////////////////////////////////////////////////////


/*

const socket = io.connect();

function enviarMensaje(e) {
  e.preventDefault();
  const email = document.getElementById("email");
  const mensaje = document.getElementById("mensaje");

  if (!email.value || !mensaje.value) {
    alert("Debe completar los campos");
    return false;
  }

  socket.emit("mensajeNuevo", { email: email.value, text: mensaje.value });
  mensaje.value = "";
  return false;
}

document
  .getElementById("messagesFormBtn")
  .addEventListener("click", enviarMensaje);

socket.on("mensajes", (mensajes) => {
  let mensajesHtml = mensajes
    .map(
      (mensaje) =>
        `<span>${mensaje.timestamp}<b> ${mensaje.email}: </b>${mensaje.text}</span>`
    )
    .join("<br>");

  document.getElementById("listaMensajes").innerHTML = mensajesHtml;
});

const createProductTable = async (products) => {
  const template = await fetch("views/products-table.hbs");
  const templateText = await template.text();
  const templateCompiled = Handlebars.compile(templateText);
  return templateCompiled({ products });
};

const addProduct = () => {
  const title = document.getElementById("title");
  const price = document.getElementById("price");
  const thumbnail = document.getElementById("thumbnail");

  if (!title.value || !price.value) {
    alert("Debe completar los campos");
  }

  socket.emit("add-product", {
    title: title.value,
    price: price.value,
    thumbnail: thumbnail.value,
  });
  title.value = "";
  price.value = "";
  thumbnail.value = "";
};

document.getElementById("add-product").addEventListener("click", addProduct);

socket.on("products", async (products) => {
  const template = await createProductTable(products);
  document.getElementById("products").innerHTML = template;
});
*/