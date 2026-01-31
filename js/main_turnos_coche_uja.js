// ----------------------------------------------------------
// Muestra una lista de días (por ejemplo, el cuatrimestre, la semana, o el día de hoy)
// ----------------------------------------------------------
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

  setTimeout(ocultarNoMiTurno, 5 * 1000);
}

// ----------------------------------------------------------
// Oculta los turnos que no pertenecen al usuario conectado
// ----------------------------------------------------------
function ocultarNoMiTurno() {
  if (
    PREFERENCIAS_USUARIO.correo != "" &&
    PREFERENCIAS_USUARIO.correo != null
  ) {
    document
      .querySelectorAll(".no-mi-turno")
      .forEach((e) => (e.style.display = "none"));
  }
}

// ----------------------------------------------------------
// Muestra bloques de información genérica (como personas, ubicaciones, preferencias...)
// ----------------------------------------------------------
function mostrarInfo(titulo, divs = [], clases = []) {
  let divTitulo = document.getElementById("titulo");
  let divContenido = document.getElementById("contenido");

  divTitulo.innerHTML = titulo;
  divContenido.innerHTML = "";

  divs.forEach((d) => {
    divContenido.innerHTML += d;
  });
}

// ----------------------------------------------------------
// Cierra el menú lateral si está abierto (botón de cierre “X”)
// ----------------------------------------------------------
function cerrarBotonX() {
  if (document.getElementsByName("close-outline")[0].style.display == "block") {
    document.getElementsByName("close-outline")[0].click();
  }
}

// ----------------------------------------------------------
// Muestra todos los días del cuatrimestre completo
// ----------------------------------------------------------
function mostrarDiasCuatrimestre() {
  mostrarDias(cuatrimestre.getTitulo(), D);
  cerrarBotonX();
}

// ----------------------------------------------------------
// Muestra únicamente el día actual
// ----------------------------------------------------------
function mostrarDiaHoy() {
  //let hoy = new Date();
  mostrarDias(
    HOY.toDW_DD_MMM_YYYY(),
    D.filter((d) => d.fecha.toComparableString() == HOY.toComparableString()),
    ["dia-pantalla-completa"],
  );
  cerrarBotonX();
}

// ----------------------------------------------------------
// Muestra los días de la semana actual
// ----------------------------------------------------------
function mostrarDiasSemana() {
  //let hoy = new Date();
  let diaSemana = HOY.getDay();
  diaSemana = diaSemana == 0 ? 7 : diaSemana;
  let posicion = D.findIndex(
    (d) => d.fecha.toComparableString() == HOY.toComparableString(),
  );
  mostrarDias(
    "Semana, " + HOY.toDD_MMM_YYYY(),
    D.slice(posicion - diaSemana + 1, posicion - diaSemana + 8),
  );
  cerrarBotonX();
}

// ----------------------------------------------------------
// Muestra la información de todos los turnos (por día de la semana)
// ----------------------------------------------------------
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

// ----------------------------------------------------------
// Muestra la información de todas las personas activas
// ----------------------------------------------------------
function mostrarPersonas() {
  let divs = [];

  P.filter((p) => p.activo).forEach((p) => {
    divs.push(personaToDiv(p));
  });

  mostrarInfo("Info Turnos", divs);
  cerrarBotonX();
}

// ----------------------------------------------------------
// Autocompleta el correo en el panel de preferencias del usuario
// ----------------------------------------------------------
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

// ----------------------------------------------------------
// Actualiza el nombre y correo del usuario mostrado en pantalla
// ----------------------------------------------------------
function actualizaDatosMostradosUsuario() {
  if (
    PREFERENCIAS_USUARIO.correo != null &&
    PREFERENCIAS_USUARIO.correo != ""
  ) {
    document.getElementById("nombreUsuarioMostrado").innerHTML =
      PREFERENCIAS_USUARIO.nombre;

    document.getElementById("emailUsuarioMostrado").innerHTML =
      PREFERENCIAS_USUARIO.correo;
  }
}

// ----------------------------------------------------------
// Guarda las preferencias introducidas y actualiza la vista
// ----------------------------------------------------------
function aceptarPreferencias() {
  PREFERENCIAS_USUARIO.correo = document.getElementById("emailSettings").value;
  PREFERENCIAS_USUARIO.nombre =
    document.getElementById("nombreSettings").innerHTML;
  guardarPreferencias(); // Se guardan en cookies/localStorage
  actualizaDatosMostradosUsuario();
  mostrarDiasCuatrimestre();
}

// ----------------------------------------------------------
// Muestra el panel de preferencias del usuario
// ----------------------------------------------------------
function mostrarPreferencias() {
  let divs = [];
  divs.push(
    `<div class='aceptaCookies'>Al establecer tus preferencias, estás aceptando las cookies que usa esta web.</div>`,
  );

  divs.push(
    `<div class='preferencias-correo'><b>Indica tu correo:</b> <input id='emailSettings' type='text' size='20' value='${PREFERENCIAS_USUARIO.correo}' nombreAntiguo='${PREFERENCIAS_USUARIO.nombre}'></div>`,
  );
  divs.push(
    `<div class='preferencias-nombre'><b>Nombre: </b><span  id='nombreSettings'>${PREFERENCIAS_USUARIO.nombre}</span></div>`,
  );
  divs.push(
    `<div class='preferencias-aceptar'><button id='aceptarSettings'>Aceptar</button></div>`,
  );

  mostrarInfo("Preferencias", divs);

  document
    .getElementById("emailSettings")
    .addEventListener("keyup", rellenarPreferenciasCorreo);
  document
    .getElementById("aceptarSettings")
    .addEventListener("click", aceptarPreferencias);
  cerrarBotonX();
}

// ----------------------------------------------------------
// Muestra la sección de ubicaciones con enlace a Google Maps
// ----------------------------------------------------------
function mostrarUbicaciones() {
  let divs = [];
  divs.push(
    `<div>Accede a la  <a target="new" href="https://maps.app.goo.gl/CQgTMidJJmatrsEk6">lista de puntos de encuentro</a>.<br>Se abre en una ventana nueva.</div>`,
  );
  mostrarInfo("Ubicaciones", divs);
  cerrarBotonX();
}

// ----------------------------------------------------------
// Al cargar la página: se inicializan preferencias y vista principal
// ----------------------------------------------------------
cargarPreferencias();
actualizaDatosMostradosUsuario();
mostrarDiasCuatrimestre();
