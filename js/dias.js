let D = []; // Array global donde se guardan todos los días del cuatrimestre

// -------------------------------------------------------------
// Función que genera el HTML de un día del calendario
// -------------------------------------------------------------
function diaToDiv(clases = []) {
  let msj = "";
  let clasesDia = ["dia"].concat(clases);

  if (this.fecha.getDay() == 1) clasesDia.push("nueva-semana");

  if (this.fecha.getDate() == 1) clasesDia.push("nuevo-mes");

  if (this.fecha.getDay() == 0 || this.fecha.getDay() == 6)
    clasesDia.push("fin-de-semana");

  let idDia = "";

  if (this.festivo != null) clasesDia.push("no-lectivo");

  // Si la fecha coincide con la fecha actual del sistema, se marca como el día de hoy
  if (this.fecha.toComparableString() == HOY.toComparableString())
    idDia = "id='hoy'";

  clasesDia = clasesDia.join(" ");

  let divFecha = this.fecha.toDW_DD_MMM();
  let divEficiencia = "";
  let divTurnos = "";

  this.infoTurnos
    .filter((it) => !null)
    .forEach((it) => (divTurnos += infoTurnoToDiv(it)));

  if (
    clasesDia.includes("no-lectivo") &&
    !clasesDia.includes("fin-de-semana")
  ) {
    divTurnos = `<div>${this.festivo}</div>`;
  }

  // Se devuelve el HTML completo del día
  return `<div class='${clasesDia}' ${idDia}>
        <div class='fecha-dia'>
            ${divFecha}
        </div>
        <div class='eficiencia-dia'>
            ${divEficiencia}
        </div>
        <div class='contenido-turnos'>
            ${divTurnos}
        </div>
        <div class='separador'></div>
    </div>`;
}

// -------------------------------------------------------------
// Objeto Dia: representa cada día del calendario
// -------------------------------------------------------------
function Dia(fecha) {
  this.fecha = fecha;
  this.infoTurnos = [];

  // Método para añadir información de un turno al día
  this.addInfoTurno = function (info) {
    this.infoTurnos.push(info);
    return this;
  };

  this.festivo = null;
  this.toDiv = diaToDiv; // Cada objeto Dia puede generar su propio HTML usando diaToDiv
}

// -------------------------------------------------------------
// Función que determina si una fecha es festiva o no lectiva
// -------------------------------------------------------------
function esNoLectivo(unaFecha) {
  for (let f of cuatrimestre.festivos) {
    if (comparaFechas(f.inicio, unaFecha) == 0) {
      return f.nombre;
    }

    if (
      f.fin != null &&
      comparaFechas(f.inicio, unaFecha) <= 0 &&
      comparaFechas(f.fin, unaFecha) >= 0
    ) {
      return f.nombre;
    }
  }

  if (unaFecha.getDay() == 0 || unaFecha.getDay() == 6) {
    return "Fin de semana";
  }

  return null;
}

// -------------------------------------------------------------
// Función que rellena el array con todos los días del cuatrimestre
// -------------------------------------------------------------
function rellenaDias() {
  let d = new Date(cuatrimestre.inicio);

  while (d <= cuatrimestre.fin) {
    let dia = new Dia(new Date(d));

    modificaciones_posteriores(dia);

    dia.festivo = esNoLectivo(d);

    if (dia.festivo == null) {
      for (let t of T) {
        let esUnDiaQueNoVa = false;
        for (let i = 0; i < t.diasNoVa.length && !esUnDiaQueNoVa; ++i) {
          esUnDiaQueNoVa =
            t.diasNoVa[i].fecha.toComparableString() == d.toComparableString();
        }

        if (t.dia == d.getDay() && t.activo && !esUnDiaQueNoVa) {
          if (
            comparaFechas(t.fechaInicio, d) <= 0 &&
            comparaFechas(t.fechaFin, d) >= 0
          ) {
            let info = t.getInfoParaDia();

            P.find((p) => p.nombre == info.conductor).conducciones.push({
              fecha: new Date(d),
              turno: info.numTurno,
            });

            dia.addInfoTurno(info);
          }
        }
      }
    }

    D.push(dia);

    d.setDate(d.getDate() + 1);
  }
}

// -------------------------------------------------------------
// Función principal: ejecuta el proceso de generación del calendario
// -------------------------------------------------------------
rellenaDias();
