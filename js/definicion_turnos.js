/*
Lunes: 
Nacho, Víctor: 9:30 - 17:30
Estefanía: 8:30 - 14:30
Alfonso: 7:30-13:30
*/

T.push(new Turno(C_LUNES, nTurno++, "09:30", "17:30", [C_NACHO, C_VICTOR]));
T.push(new Turno(C_LUNES, nTurno++, "08:30", "14:30", [C_ESTEFANIA]));
T.push(new Turno(C_LUNES, nTurno++, "07:30", "13:30", [C_ALFONSO]));

/*
Martes:
Martes:
Susana: 8:20 - 13:30 (hasta el 4 de noviembre)
Joaquín: 7:30 - 14:30
Inma, Estefanía, Lidia, Ángel : 8:30 - 14:30 (Angel: en principio hasta primeros de noviembre)
Jose Alberto: 8:30 - 17:30 (vuelta flexible)
Alfonso: 7:30-13:30
Gustavo, David: 8,30-14,30 h (quizás somos muchos para ir en el turno de Inma, ¿cómo lo veis?)
*/
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
  ]).addComentarios("Angel: en principio hasta primeros de noviembre")
);
T.push(
  new Turno(C_MARTES, nTurno++, "08:30", "17:30", [
    C_JOSE_ALBERTO,
  ]).addComentarios("vuelta flexible")
);
T.push(new Turno(C_MARTES, nTurno++, "07:30", "13:30", [C_ALFONSO]));
T.push(
  new Turno(C_MARTES, nTurno++, "08:30", "14:30", [
    C_GUSTAVO,
    C_DAVID,
  ]).addComentarios(
    "quizás somos muchos para ir en el turno de Inma, ¿cómo lo veis?"
  )
);

/*
Miércoles:


*/
T.push(new Turno(C_MIERCOLES, nTurno++, "08:15", "13:30", [C_SUSANA]));
T.push(
  new Turno(C_MIERCOLES, nTurno++, "07:30", "14:00", [C_ESTEFANIA, C_VICTOR])
);
T.push(
  new Turno(C_MIERCOLES, nTurno++, "08:30", "14:30", [C_JOSE_MATAS, C_GUSTAVO])
);
T.push(
  new Turno(C_MIERCOLES, nTurno++, "08:30", "19:30", [C_JMF, C_PACO_LUIS])
);
T.push(new Turno(C_MIERCOLES, nTurno++, "08:30", "17:30", [C_LIDIA]));
/*
Jueves:
Nacho,Lidia (pendiente de cambio de horario): 8:30-17:30
Jose Matas, Gustavo Reyes, David, Ángel (Ángel: a partir del 13 de febrero): 8:30-14:30
Pilar Sánchez: 15:30-20:30

*/
T.push(new Turno(C_JUEVES, nTurno++, "08:30", "17:30", [C_NACHO, C_LIDIA]));
T.push(
  new Turno(C_JUEVES, nTurno++, "08:30", "14:30", [
    C_JOSE_MATAS,
    C_GUSTAVO,
    C_DAVID,
  ])
);
T.push(new Turno(C_JUEVES, nTurno++, "15:30", "20:30", [C_PILAR]));

/*
Viernes:
Víctor: 09:15-13:30
*/
T.push(new Turno(C_VIERNES, nTurno++, "09:15", "13:30", [C_VICTOR]));

// Función donde añadimos las modificaciones que se van produciendo en los turnos.

function modificaciones_posteriores(dia) {
  var fecha = dia.fecha;

  var tmpCo;
  /* ----
   Comienzo de un turno más tarde
   --- */

  if (fechaEs(fecha, 16, 9, 2024)) {
    aniadeCoche(C_LUNES, "08:30", "14:30", "", "", [
      C_ESTEFANIA,
      C_ALFONSO,
      C_LIDIA,
    ]).addComentarios("a partir del 16 de septiembre");
  }
  /* ---
  Cambio de hora salida y/o vuelta de un coche
 --- */
  if (fechaEs(fecha, 13, 11, 2024)) {
    coches[4].hora_j = "12:30";
    coches[4].hayCambios();
  }

  /* ----
   Eliminación de un turno
   --- */
  if (fechaEs(fecha, 5, 11, 2025)) cancelarTurno(4, "4/nov");

  /* --- 
  Añadir conductor/a
  --- */
  if (fechaEs(fecha, 18, 2, 2025))
    aniadirConductor(4, C_NACHO, 1, "el 18/feb", 1);
  if (fechaEs(fecha, 13, 2, 2025))
    aniadirConductor(15, C_ANGEL, 2, "el 13/feb", 2);

  // Los lunes siempre Victor, los jueves siempre Angel
  //coches[2].setContador(0);
  //coches[17].setContador(1);

  /* ----
  Una persona se sale del turno
  --- */

  if (fechaEs(fecha, 19, 3, 2024))
    eliminarConductor(7, C_ALFONSO, "el 18/mar", 1);

  /* ----
   Alteración de turnos para que NO coincida el mismo conductor cada semana
   --- */
  //if (fechaEs(i, 4, 10, 2022)) coches[6].setContador(1);

  /* -----
  | Un día concreto no va un turno
  --- */
  if (fechaEs(fecha, 14, 2, 2024)) sinTurno(11, 3, "Huelga de agricultores", 3);
  //if( fechaEs(dia, 15, 2, 2024) ) eliminarConductor(11, C_SIN_TURNO, "",2)
}
