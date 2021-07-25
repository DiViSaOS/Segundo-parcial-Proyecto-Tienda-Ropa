const botones_añadir_canasta = document.querySelectorAll('.agregar_canasta');
botones_añadir_canasta.forEach((boton_agregar_canasta) => {
  boton_agregar_canasta.addEventListener('click', agregar_canasta--cliqueado);
});

const boton_comprar = document.querySelector('.boton_comprar');
boton_comprar.addEventListener('click', boton_comprar_cliqueado);

const contenedor_objetos_en_canasta = document.querySelector('.contenedor_de_objetos_en_la_canasta');

function agregar_canasta_cliqueado(event) {
  const button = event.target;
  const item = button.closest('.item');
  const descripcion_item = item.querySelector('.descripcion').textContent;
  const precio_item = item.querySelector('.precio').textContent;
  const imagen_item = item.querySelector('.imagen').src;

  añadir_item_a_la_canasta(descripcion_item, precio_item, imagen_item);
}

function añadir_item_a_la_canasta(descripcion_item, precio_item, imagen_item) {
  const objetos = contenedor_items_en_canasta.getElementsByClassName(
    'descripcion_del_item_canasta'
  );
  for (let i = 0; i < objetos.length; i++) {
    if (objetos[i].innerText === descripcion_item) {
      let cantidadobjeto = descripcion_item[
        i
      ].parentElement.parentElement.parentElement.querySelector(
        '.cantidad_objetos_canasta'
      );
      cantidadobjeto.value++;
      $('.toast').toast('show');
      actualizar_total_canasta();
      return;
    }
  }

  const fila_canasta = document.createElement('div');
  const contenido_en_canasta = `
  <div class="fila_objeto_en_canasta">
        <div class="col-6">
            <div class="objeto_en_canasta d-flex align-items-center h-100 border-bottom pb-2 pt-3">
                <img src=${imagen_item} class="imagen_canasta">
                <h6 class="descripcion_del_objeto_en_canasta descripcion_del_item_canasta text-truncate ml-3 mb-0">${descripcion_item}</h6>
            </div>
        </div>
        <div class="col-2">
            <div class="precio_de_canasta d-flex align-items-center h-100 border-bottom pb-2 pt-3">
                <p class="precio_item mb-0 precio_objeto_en_canasta">${itemPrice}</p>
            </div>
        </div>
        <div class="col-4">
            <div
                class="cantidad_de_canasta d-flex justify-content-between align-items-center h-100 border-bottom pb-2 pt-3">
                <input class="ingreso_cantidad-canasta cantidad_objetos_canasta" type="number"
                    value="1">
                <button class="btn btn-danger boton_borrar" type="button">X</button>
            </div>
        </div>
    </div>`;
  fila_canasta.innerHTML = contenido_en_canasta;
  contenedor_objetos_en_canasta.append(fila_canasta);

  fila_canasta
    .querySelector('.boton_borrar')
    .addEventListener('click', eliminar_objeto_canasta);

  fila_canasta
    .querySelector('.cantidad_objetos_canasta')
    .addEventListener('cambio', cantidad_cambiada);

  actualizar_total_canasta();
}

function actualizar_total_canasta() {
  let total = 0;
  const total_canasta = document.querySelector('.total_canasta');

  const objetos_en_canasta = document.querySelectorAll('.objeto_en_canasta');

  objetos_en_canasta.forEach((objeto_en_canasta) => {
    const eprecio_objeto_en_canasta = objeto_en_canasta.querySelector(
      '.precio_objeto_en_canasta'
    );
    const precio_objeto_en_canasta = Number(
      eprecio_objeto_en_canasta.textContent.replace('$', '')
    );
    const ecantidad_objetos_canasta = objeto_en_canasta.querySelector(
      '.cantidad_objetos_canasta'
    );
    const cantidad_objetos_canasta = Number(
      ecantidad_objetos_canasta.value
    );
    total = total + precio_objeto_en_canasta * cantidad_objetos_canasta;
  });
  total_canasta.innerHTML = `${total.toFixed(2)}$`;
}

function eliminar_objeto_canasta(event) {
  const boton_cliqueado = event.target;
  boton_cliqueado.closest('.objeto_en_canasta').remove();
  actualizar_total_canasta();
}

function cantidad_cambiada(event) {
  const ingreso = event.target;
  ingreso.value <= 0 ? (ingreso.value = 1) : null;
  actualizar_total_canasta();
}

function boton_comprar_cliqueado() {
  contenedor_objetos_en_canasta.innerHTML = '';
  actualizar_total_canasta();
}