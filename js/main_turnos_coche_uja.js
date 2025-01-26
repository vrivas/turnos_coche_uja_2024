function mostrarDias(titulo, dias = [], clases = []) {
  let divTitulo = document.getElementById("titulo");
  let divContenido = document.getElementById("contenido");
  divTitulo.innerHTML = titulo;
  let msj = "";
  dias.forEach((d) => {
    msj += d.toDiv(clases) + "\n";
  });

  msj =
    msj == ""
      ? "No se ha encontrado ningún turno operativo en este periodo"
      : msj;
  divContenido.innerHTML = msj;
}

function mostrarInfo(titulo, divs = [], clases = []) {
  let divTitulo = document.getElementById("titulo");
  let divContenido = document.getElementById("contenido");
  divTitulo.innerHTML = titulo;
  divContenido.innerHTML = "";
  divs.forEach((d) => {
    divContenido.innerHTML += d;
  });
}

function cerrarBotonX() {
  if (document.getElementsByName("close-outline")[0].style.display == "block") {
    document.getElementsByName("close-outline")[0].click();
  }
}

function mostrarDiasCuatrimestre() {
  mostrarDias(cuatrimestre.getTitulo(), D);
  cerrarBotonX();
}

function mostrarDiaHoy() {
  let hoy = new Date();

  mostrarDias(
    hoy.toDW_DD_MMM_YYYY(),
    D.filter((d) => d.fecha.toComparableString() == hoy.toComparableString()),
    ["dia-pantalla-completa"]
  );
  cerrarBotonX();
}
function mostrarDiasSemana() {
  let hoy = new Date();
  let diaSemana = hoy.getDay();
  diaSemana = diaSemana == 0 ? 7 : diaSemana;
  let posicion = D.findIndex(
    (d) => d.fecha.toComparableString() == hoy.toComparableString()
  );
  mostrarDias(
    "Semana, " + hoy.toDD_MMM_YYYY(),
    D.slice(posicion - diaSemana + 1, posicion - diaSemana + 8)
  );
  cerrarBotonX();
}

// Mostramos la información de todos los turnos
function mostrarTurnos() {
  let divs = [];
  for (i = C_LUNES; i <= C_VIERNES; i++) {
    divs.push(`<div class='info-dia'>${NOMBRE_DIAS[i]}</div>`);
    T.filter((t) => t.dia == i).forEach((t) => {
      divs.push(infoTurnoToInfoDiv(t));
    });
    mostrarInfo("Info Turnos", divs);
  }
  cerrarBotonX();
}

// Mostramos la información de todas las personas
function mostrarPersonas() {
  let divs = [];

  P.filter((p) => p.activo).forEach((p) => {
    divs.push(personaToDiv(p));
  });
  mostrarInfo("Info Turnos", divs);
  cerrarBotonX();
}

function rellenarPreferenciasCorreo(evt) {
  const texto = evt.target.value;
  let coinciden = P.filter((p) => p.correo.substr(0, texto.length) == texto);
  if (coinciden.length == 1) {
    evt.target.value = coinciden[0].correo;
    document.getElementById("nombreSettings").innerHTML = coinciden[0].nombre;
  } else {
    evt.target.value = texto;
    document.getElementById("nombreSettings").innerHTML =
      evt.target.getAttribute("nombreAntiguo");
  }
}

function aceptarPreferencias() {
  PREFERENCIAS_USUARIO.correo = document.getElementById("emailSettings").value;
  PREFERENCIAS_USUARIO.nombre =
    document.getElementById("nombreSettings").innerHTML;
  setCookie("preferencias", JSON.stringify(PREFERENCIAS_USUARIO), 365 * 10);
}

function cargarPreferencias() {
  let preferencias = getCookie("preferencias");
  if (preferencias != "") {
    PREFERENCIAS_USUARIO = JSON.parse(preferencias);
  }
}

function mostrarPreferencias() {
  let divs = [];
  divs.push(
    `<div class='aceptaCookies'>Al establecer tus preferencias, estás aceptando las cookies que usa esta web.</div>`
  );

  divs.push(
    `<div class='preferencias-correo'><b>Indica tu correo:</b> <input id='emailSettings' type='text' size='20' value='${PREFERENCIAS.correo}' nombreAntiguo='${PREFERENCIAS.nombre}'></div>`
  );
  divs.push(
    `<div class='preferencias-nombre'><b>Nombre: </b><span  id='nombreSettings'>${PREFERENCIAS.nombre}</span></div>`
  );

  divs.push(
    `<div class='preferencias-aceptar'><button id='aceptarSettings'>Aceptar</button></div>`
  );
  /*divs.push(
    `<div class='vistaPorDefecto'>${PREFERENCIAS.vistaPorDefecto}</div>`
  );*/
  /*divs.push(`<div class='aceptaCookies'>${PREFERENCIAS.aceptaCookies}</div>`);*/

  mostrarInfo("Preferencias", divs);
  document
    .getElementById("emailSettings")
    .addEventListener("keyup", rellenarPreferenciasCorreo);
  document
    .getElementById("aceeptarSettings")
    .addEventListener("click", aceptarPreferencias);
}

// Por defecto, mostramos los días del cuatrimestre
mostrarDiasCuatrimestre();
