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
// Por defecto, mostramos los días del cuatrimestre
mostrarDiasCuatrimestre();
