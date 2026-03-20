// VEctor de Turnos
var T = [];
// Devuelve un turno por su número.
T.get = function (num) {
  return T[num - 1];
};
// Clase Turno
function Turno(
  _dia,
  _numTurno,
  _hora_gr,
  _hora_j,
  _personas,
  _lugar,
  _fechaInicio,
  _fechaFin,
) {
  this.dia = _dia;
  this.numTurno = _numTurno;
  this.hora_gr = _hora_gr;
  this.hora_j = _hora_j;
  this.lugar = _lugar || "";
  this.comentarios = [];
  this.personas = _personas || [];
  this.personas.forEach((p) => (p.activo = true));
  this.correos = this.personas.map((p) => p.correo).join(", ");
  this.fechaInicio = _fechaInicio || cuatrimestre.inicio;
  this.fechaFin = _fechaFin || cuatrimestre.fin;
  this.contador =
    this.personas.length > 0 ? this.numTurno % this.personas.length : 0;
  this.desdoblarSi5 = false;
  this._primeraMuestra = false;
  this.nuevo = true;
  this.cambio = false;
  this.activo = true;
  this.diasNoVa = [];
  this.addProfesor = function (_profesor, _pos, _fecha, _com = "") {
    this.personas = this.personas
      .slice(0, _pos)
      .concat([_profesor])
      .concat(this.personas.slice(_pos));
    this.addComentarios(
      _fecha + ": se añade a " + _profesor.nombre + " " + _com,
    );
    return this;
  };
  this.addComentarios = function (_comentario) {
    this.comentarios.push(_comentario);
    return this;
  };
  this.setContador = function (_contador) {
    this.contador = _contador;
    return this;
  };
  this.incrementaContador = function () {
    this.contador++;
    this.contador = this.contador % this.personas.length;
    return this;
  };

  //Funcion cancelar cambiada para que aparezca los participantes originales en los comentarios del turno
  this.cancelar = function (_fecha, _comentario = "") {
    // Guardamos los nombres de las personas antes de cancelar
    const participantesOriginales = this.personas
      .map((p) => p.nombre)
      .join(", ");
    //this.addComentarios("Participantes originales: " + participantesOriginales);
    this.comentarios.push(_fecha + ": se cancela el turno " + _comentario);
    this.activo = false;
    this.personas = [C_CANCELADO];

    return this;
  };

  this.hayCambios = function () {
    this.cambio = true;
  };
  this.comienza = function (_fecha) {
    this.fechaInicio = _fecha;
    return this;
  };
  this.finaliza = function (_fecha) {
    this.fechaFin = _fecha;
    return this;
  };

  // Devuelve la información del turno para un día concreto
  // Actualiza el contador
  // Actualiza si el conductor ha conducido o no
  // Actualiza si hay cambios o no
  // @param motivoDiaQueNova Si es un día que este turno no va, aquí se guarda el motivo.
  this.getInfoParaDia = function (motivoDiaQueNoVa = null) {
    if (!this.activo) return null;
    let noVa = motivoDiaQueNoVa != null;
    let info = {
      diaSemana: NOMBRE_DIAS[this.dia],
      numTurno: this.numTurno,
      // APROVECHO LA HORA IDA Y VENIDA PARA EXPLICAR POR QUÉ NO VA
      hora_gr: this.hora_gr,
      hora_j: this.hora_j,
      conductor: this.personas[this.contador].nombre,
      correo_conductor: this.personas[this.contador].correo,
      acompanantes: this.personas
        .slice(0, this.contador)
        .concat(this.personas.slice(this.contador + 1))
        .map((p) => p.nombre),
      correos_acompanantes: this.personas
        .slice(0, this.contador)
        .concat(this.personas.slice(this.contador + 1))
        .map((p) => p.correo)
        .join(","),
      lugar: this.lugar,
      comentarios: this.comentarios,
      desdoblarSi5: this.desdoblarSi5,
      nuevo: this.nuevo,
      cambio: this.cambio,
      contador: this.contador,
      correos: this.correos,
      no_va: false, // indica si este día este turno va o no va, por algún motivo excepcional
    };

    this.nuevo = false;
    this.cambio = false;
    if (noVa) {
      info.conductor = motivoDiaQueNoVa;
      info.correo_conductor = "";
      info.acompanantes = this.personas.map((p) => p.nombre);
      info.correos_acompanantes == this.personas.map((p) => p.correo);
      info.no_va = true;
    } else {
      this.incrementaContador();
    }

    return info;
  };
} // Fin clase Turno

function infoTurnoToInfoDiv(turno) {
  if (turno == null) return "A";
  let msj = "";
  let clasesInfoTurno = ["info-turno"];

  let divNumTurno = `<div class='num-turno'>${cerear(turno.numTurno)}</div>`;
  let divNuevo = null; //info.nuevo ? "<div class='etiqueta-nuevo'>N</div>" : "";
  let divCambio = null; //info.cambio ? "<div class='etiqueta-cambio'>M</div>" : "";
  let spanLugar = turno.lugar
    ? `<span class="lugar">${turno.lugar}</span><br/>`
    : "";
  let dia_semana = NOMBRE_DIAS[turno.dia];
  let divHorario = `<div class='horario'>${dia_semana} ${spanLugar}${turno.hora_gr}↔${turno.hora_j}</div>`;

  let nombrePersonas = "";
  if (turno.personas.length > 0) {
    nombrePersonas += turno.personas[0].nombre;
  }
  for (let i = 1; i < turno.personas.length; i++) {
    nombrePersonas += i < turno.personas.length - 1 ? ", " : " y ";
    nombrePersonas += turno.personas[i].nombre;
  }
  let divPersonas = `<div class='personas'>
              ${nombrePersonas}.
          </div>`;
  let divComentarios = "";
  if (turno.comentarios.length > 0) {
    divComentarios = `<div class='info-comentarios'>
                ${turno.comentarios.map((c) => " - " + c).join("<br/>")}
            </div>`;
  }
  // clases aplicables al día
  clasesInfoTurno = clasesInfoTurno.join(" ");
  return `<div class='${clasesInfoTurno}'>
          <div class='numero-y-cambios'>
              ${divNumTurno}
          </div>
          <div class='horas-y-personas'>
              ${divHorario}
              ${divPersonas}
              ${divComentarios}
          </div>
      </div>`;
}

function infoTurnoToDiv(info) {
  if (info == null) return "";
  let msj = "";
  let clasesInfoTurno = ["info-turno"];
  if (info.correo_conductor == PREFERENCIAS_USUARIO.correo)
    clasesInfoTurno.push("soy-conductor");
  if (info.correos_acompanantes.includes(PREFERENCIAS_USUARIO.correo))
    clasesInfoTurno.push("soy-acompanante");

  if (
    PREFERENCIAS_USUARIO.correo != "" &&
    PREFERENCIAS_USUARIO.correo != null &&
    !info.correos.includes(PREFERENCIAS_USUARIO.correo)
  ) {
    clasesInfoTurno.push("no-mi-turno");
    clasesInfoTurno.push("fade-out");
  }
  if (info.no_va) {
    clasesInfoTurno.push("turno-no-va");
  }
  const clasesNumTurno = "num-turno " + (info.no_va ? "turno-no-va " : "");
  let divNumTurno = `<div class='${clasesNumTurno}'>${cerear(info.numTurno)}</div>`;
  let divNuevo = info.nuevo ? "<div class='etiqueta-nuevo'>Nuevo</div>" : "";
  let divCambio = info.cambio
    ? "<div class='etiqueta-cambio'>Modificado</div>"
    : "";
  let spanLugar = info.lugar
    ? `<span class="lugar">${info.lugar}</span><br/>`
    : "";
  let divHorario = `<div class='horario'>${spanLugar}${info.hora_gr}↔${info.hora_j}</div>`;
  // Compruebo si conduce o si es acompañante
  const clasesConductor =
    "nombre-conductor " + (info.no_va ? "turno-no-va " : ""); /*+
    (info.correo_conductor == PREFERENCIAS_USUARIO.correo
      ? "soy-conductor"
      : "");*/
  const clasesAcompanantes =
    "nombres-acompanantes " + (info.no_va ? "turno-no-va " : ""); /*+
    (info.correos_acompanantes.includes(PREFERENCIAS_USUARIO.correo)
      ? "soy-acompanante"
      : "");*/

  let spanConductor = `<span class="${clasesConductor}">${info.conductor}</span>`;
  let spanAcompanantes =
    info.acompanantes.length > 0
      ? `<span class="${clasesAcompanantes}">(${info.acompanantes.join(
          ", ",
        )})</span>`
      : "";
  let divPersonas = `<div class='personas'>
            ${spanConductor}
            ${spanAcompanantes}
        </div>`;
  // clases aplicables al día
  clasesInfoTurno = clasesInfoTurno.join(" ");
  let alertTxt = infoToAlert(info);
  return `<div class='${clasesInfoTurno}' onClick='alert("${alertTxt}")'>
        <div class='numero-y-cambios'>
            ${divNumTurno}
        </div>
        <div class='horas-y-personas'>
            ${divNuevo}
            ${divCambio}
            ${divHorario}
            ${divPersonas}
        </div>
    </div>`;
}

function infoToAlert(info) {
  let tmp = "";
  tmp += "Turno: " + cerear(info.numTurno) + "\\n";
  tmp +=
    " * " + info.diaSemana + ", " + info.hora_gr + " a " + info.hora_j + "\\n";
  tmp += " * Conduce: " + info.conductor + "\\n";
  if (info.acompanantes.length)
    tmp += " * Acompañantes: " + info.acompanantes.join(", ") + "\\n";
  if (info.comentarios.length)
    tmp +=
      " * Comentarios: " + "\\n     -" + info.comentarios.join("\\n     -");
  return tmp;
}

function aniadirConductor(numCoche, conductor, posicion, comentario, contador) {
  // Hay que restar uno porque lo que se ve en la interfaz es el número de coche, pero en el array es la posición
  var tmpCo = T[numCoche - 1];
  if (tmpCo)
    tmpCo
      .addProfesor(conductor, posicion, comentario)
      .setContador(contador)
      .hayCambios();
}

// Clase para cancelar un turno llamando a su método cancelar
function cancelarTurno(numCoche, _fecha, comentario = "") {
  var tmpCo = T[numCoche - 1];
  if (tmpCo) tmpCo.cancelar(_fecha, comentario);
}

// Un día un turno no va
function noVa(numCoche, _fecha, _motivo = "No se indicó motivo") {
  T.get(numCoche).diasNoVa.push({ fecha: _fecha, motivo: _motivo });
}

// Función para eliminar un conductor de un turno
function eliminarConductor(
  numCoche,
  conductor,
  _fecha,
  contador,
  comentario = "",
) {
  var tmpCo = T[numCoche - 1];
  if (tmpCo) {
    var pos = tmpCo.personas.indexOf(conductor);
    if (pos >= 0) {
      tmpCo.personas = tmpCo.personas
        .slice(0, pos)
        .concat(tmpCo.personas.slice(pos + 1));
      if (tmpCo.personas.length == 0) {
        tmpCo.personas = [C_CANCELADO];
      }
      tmpCo
        .setContador(contador)
        .addComentarios(
          _fecha + ": se elimina a " + conductor.nombre + " " + comentario,
        )
        .hayCambios();
    }
  }
}
// Constantes para los días de la semana
const C_LUNES = 1;
const C_MARTES = 2;
const C_MIERCOLES = 3;
const C_JUEVES = 4;
const C_VIERNES = 5;
const C_NO_DIA = -1; // Util para asignárselo a turnos que desaparecen al ppio del cuatrimestre pero cuando están ya todos los demás turnos asignados; es decir, evita renumerar todos los turnos cuando uno desaparece.

// Definición de los turnos
let nTurno = 1;
