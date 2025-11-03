/*
Lunes: 
Nacho, Víctor: 9:30 - 17:30
Estefanía: 8:30 - 14:30
Alfonso: 7:30-13:30
*/

// Se crean los turnos del lunes, con hora de inicio, fin y los conductores asignados.
T.push(new Turno(C_LUNES, nTurno++, "09:30", "17:30", [C_NACHO, C_VICTOR]));
T.push(new Turno(C_LUNES, nTurno++, "08:30", "14:30", [C_ESTEFANIA]));
T.push(new Turno(C_LUNES, nTurno++, "07:30", "13:30", [C_ALFONSO]));

/*
Martes:
Susana: 8:20 - 13:30 (hasta el 4 de noviembre)
Joaquín: 7:30 - 14:30
Inma, Estefanía, Lidia, Ángel : 8:30 - 14:30 (Ángel: hasta primeros de noviembre)
Jose Alberto: 8:30 - 17:30 (vuelta flexible)
Alfonso: 7:30-13:30
Gustavo, David: 8,30-14,30 h
*/

// Cada línea crea un turno de martes con los conductores y horarios indicados.
// Se pueden añadir comentarios informativos con .addComentarios()
T.push(
  new Turno(C_MARTES, nTurno++, "08:20", "13:30", [C_SUSANA]).addComentarios(
    "hasta el 4 de noviembre"
  )
);
T.push(new Turno(C_MARTES, nTurno++, "07:30", "14:30", [C_JOAQUIN]));
T.push(
  new Turno(C_MARTES, nTurno++, "08:30", "14:30", [
    C_INMA_BARROSO,
    C_ESTEFANIA,
    C_LIDIA,
    C_ANGEL,
  ]).addComentarios("Ángel: en principio hasta primeros de noviembre")
);
T.push(
  new Turno(C_MARTES, nTurno++, "08:30", "17:30", [C_JOSE_ALBERTO]).addComentarios(
    "vuelta flexible"
  )
);
T.push(new Turno(C_MARTES, nTurno++, "07:30", "13:30", [C_ALFONSO]));
T.push(
  new Turno(C_MARTES, nTurno++, "08:30", "14:30", [C_GUSTAVO, C_DAVID]).addComentarios(
    "quizás somos muchos para ir en el turno de Inma, ¿cómo lo veis?"
  )
);

/*
Miércoles:
Se definen varios turnos con sus respectivos conductores y comentarios.
*/
T.push(
  new Turno(C_MIERCOLES, nTurno++, "08:20", "14:30", [C_SUSANA, C_MIGUEL]).addComentarios(
    "Mayca: hasta el 30 de noviembre, aunque aún no sabemos cuándo empezará"
  )
);
T.push(new Turno(C_MIERCOLES, nTurno++, "14:30", "18:30", [C_JOAQUIN]));
T.push(
  new Turno(C_MIERCOLES, nTurno++, "08:30", "14:30", [
    C_INMA_BARROSO,
    C_ESTEFANIA,
    C_GUSTAVO,
  ])
);
T.push(new Turno(C_MIERCOLES, nTurno++, "12:30", "17:30", [C_NACHO, C_LIDIA]));
T.push(new Turno(C_MIERCOLES, nTurno++, "07:15", "14:00", [C_GEMA]).addComentarios("14 o 14:30, flexible"));
T.push(
  new Turno(C_MIERCOLES, nTurno++, "08:30", "19:30", [C_JMF, C_ANTONIO, C_PACO_LUIS])
);

/*
Jueves: creación de turnos similares con comentarios de flexibilidad y límites temporales
*/
T.push(new Turno(C_JUEVES, nTurno++, "08:20", "13:30", [C_SUSANA]));
T.push(new Turno(C_JUEVES, nTurno++, "07:30", "20:30", [C_JOAQUIN]));
T.push(
  new Turno(C_JUEVES, nTurno++, "14:20", "19:30", [C_MAYCA]).addComentarios(
    "o 20:30, hasta 30 noviembre"
  )
);
T.push(new Turno(C_JUEVES, nTurno++, "08:30", "19:30", [C_JMF]));
T.push(
  new Turno(C_JUEVES, nTurno++, "09:00", "17:30", [C_LIDIA]).addComentarios(
    "flexible la salida a las 09:00"
  )
);
T.push(new Turno(C_JUEVES, nTurno++, "13:30", "19:30", [C_ASUN]));

/*
Viernes:
Mayca: 8:20-13,30  (hasta el 30 de noviembre)
Ángel: 9:30 - 17:30
*/
T.push(
  new Turno(C_VIERNES, nTurno++, "08:20", "13:30", [C_MAYCA]).addComentarios(
    "hasta el 30 de noviembre"
  )
);
T.push(new Turno(C_VIERNES, nTurno++, "08:30", "17:30", [C_ANGEL]));

/* ==========================================================
   FUNCIÓN PARA APLICAR CAMBIOS Y EXCEPCIONES EN DÍAS CONCRETOS
   ========================================================== */
function modificaciones_posteriores(dia) {
  var fecha = dia.fecha; // Se obtiene la fecha del día actual mostrado en el calendario.

  /* ----
   Añadir nuevos coches o turnos a partir de una fecha concreta
   --- */
  if (fechaEs(fecha, 16, 9, 2024)) {
    aniadeCoche(C_LUNES, "08:30", "14:30", "", "", [
      C_ESTEFANIA,
      C_ALFONSO,
      C_LIDIA,
    ]).addComentarios("a partir del 16 de septiembre");
  }

  /* ---
   Modificar la hora de salida o de llegada de un turno ya existente
   --- */
  if (fechaEs(fecha, 13, 11, 2024)) {
    coches[4].hora_j = "12:30"; // Cambia la hora de llegada
    coches[4].hayCambios(); // Se marca el turno como modificado
  }

  /* ----
   Eliminar un turno en días específicos (por festivo o ausencia)
   --- */
  if (fechaEs(fecha, 5, 11, 2025)) cancelarTurno(4, "5/nov");
  if (fechaEs(fecha, 1, 12, 2025)) cancelarTurno(18, "1/dic");
  if (fechaEs(fecha, 1, 12, 2025)) cancelarTurno(22, "1/dic");

  /* --- 
   Añadir un conductor extra en una fecha concreta
   --- */
  if (fechaEs(fecha, 18, 2, 2025))
    aniadirConductor(4, C_NACHO, 1, "el 18/feb", 1);
  if (fechaEs(fecha, 13, 2, 2025))
    aniadirConductor(15, C_ANGEL, 2, "el 13/feb", 2);
  if (fechaEs(fecha, 15, 9, 2025)) {
    aniadirConductor(2, C_MIGUEL, 1, "el 15/sep", 1);
    aniadirConductor(9, C_MIGUEL, 1, "el 15/sep", 0);
  }
  if (fechaEs(fecha, 3, 10, 2025))
    aniadirConductor(12, C_ASUN, 1, "el 3/oct", 1);  
  if (fechaEs(fecha, 10, 10, 2025))
    aniadirConductor(23, C_ASUN, 1, "el 10/oct", 1);

  /* ----
   Eliminar a un conductor de un turno en una fecha concreta
   --- */
  if (fechaEs(fecha, 5, 11, 2025)) eliminarConductor(6, C_ANGEL, "el 5/nov", 0);
  if (fechaEs(fecha, 1, 12, 2025))
    eliminarConductor(10, C_MAYCA, "el 30/nov", 0);

  /* -----
   Indicar que un día concreto no habrá turno (por ejemplo, huelga)
   --- */
  if (fechaEs(fecha, 14, 2, 2024)) sinTurno(11, 3, "Huelga de agricultores", 3);
}
