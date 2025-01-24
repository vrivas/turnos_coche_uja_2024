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

// Por defecto, mostramos los días del cuatrimestre
mostrarDiasCuatrimestre();
