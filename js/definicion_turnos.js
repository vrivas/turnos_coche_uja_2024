/*
Lunes: 
Nacho,Lidia: 08:30-13:30
David, Inma: 8:30-19:30
Víctor: 09:15-17:30
*/
T.push(new Turno(C_LUNES, nTurno++, "08:30", "13:30", [C_NACHO, C_LIDIA]));
T.push(
  new Turno(C_LUNES, nTurno++, "08:30", "19:30", [C_DAVID, C_INMA_BARROSO])
);
T.push(new Turno(C_LUNES, nTurno++, "09:15", "17:30", [C_VICTOR]));

/*
Martes:
Nacho, Inma: 9:30-16:30 (Nacho: a partir del 18 de febrero)
José Manuel, Paco Luis, Ángel, Antonio Rueda : 8:30-19:30

Susana: 8:15 - 13:30
Estefanía: 7:30-14:30
Jose Matas, Gustavo Reyes: 8:30-14:30 

*/
T.push(
  new Turno(C_MARTES, nTurno++, "09:30", "16:30", [
    C_INMA_BARROSO,
  ]).addComentarios("Nacho: a partir del 18 de febrero")
  //TODO: Añadir a Nacho 18 de febrero
);
T.push(
  new Turno(C_MARTES, nTurno++, "08:30", "19:30", [
    C_JMF,
    C_PACO_LUIS,
    C_ANTONIO,
  ])
);
T.push(new Turno(C_MARTES, nTurno++, "08:15", "13:30", [C_SUSANA]));
T.push(new Turno(C_MARTES, nTurno++, "07:30", "14:30", [C_ESTEFANIA]));
T.push(new Turno(C_MARTES, nTurno++, "08:30", "14:30", [C_J_MATAS, C_GUSTAVO]));

/*
Miércoles:
Susana: 8,15 - 13:30
Estefanía, Víctor: 7:30-14:00
Jose Matas, Gustavo Reyes: 8:30-14:30
José Manuel, Paco luis : 8:30-19:30
Lidia : 8:30-17:30

*/
T.push(new Turno(C_MIERCOLES, nTurno++, "08:15", "13:30", [C_SUSANA]));
T.push(
  new Turno(C_MIERCOLES, nTurno++, "07:30", "14:00", [C_ESTEFANIA, C_VICTOR])
);
T.push(
  new Turno(C_MIERCOLES, nTurno++, "08:30", "14:30", [C_J_MATAS, C_GUSTAVO])
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
    C_J_MATAS,
    C_GUSTAVO,
    C_DAVID,
  ])
);
// TODO: Añadir a Ángel 13 de febrero
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
  //Jose Alberto, Inma: 8:30 - 17:30 (Este turno dura hasta el 26 de febrero inclusive)

  if (fechaEs(fecha, 27, 2, 2024)) cancelarTurno(3, "27/feb");

  /* --- 
  Añadir conductor/a
  --- */
  if (fechaEs(fecha, 21, 11, 2024))
    aniadirConductor(15, C_MAYCA, 1, "el 21/nov", 1);

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
