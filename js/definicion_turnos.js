/*
Lunes: 
***Nacho: 12:30 - 17:30 (Nacho: a partir del 23 de febrero)
Inma, Lidia, Asun, Alfonso, Ángel: 08:30 - 14:30
Janneth: 14:30 - 18:30 ***(hasta 23 de marzo)
Janneth 15:30 - 18:30 (a partir del 30 de marzo)
Miguel: 13:00 - 20:30 (***Miguel: Hasta Semana Santa)
*/

// Se crean los turnos del lunes, con hora de inicio, fin y los conductores asignados.
// Se pueden añadir comentarios informativos con .addComentarios()

T.push(
  new Turno(C_LUNES, nTurno++, "09:30", "14:30", [
    C_INMA_BARROSO,
    C_LIDIA,
    C_ASUN,
    C_ALFONSO,
    C_ANGEL,
  ]),
);
T.push(
  new Turno(C_LUNES, nTurno++, "14:30", "18:30", [C_JANNETH]).addComentarios(
    "Desde las 15:30 a partir del 30/Mar/2026",
  ),
);
T.push(new Turno(C_LUNES, nTurno++, "13:00", "20:30", [C_MIGUEL]));

/*
Martes:
Pilar Sánchez: 7:30-12:30
Gustavo, Inma, Jose Alberto, Lidia, Alfonso, Asun (nos partimos en 2 coches? -> (lidia) yo sugiero hacer uno porque si alguien falla se puede ir en un solo coche)
(Asun), somos 6 personas, no cojemos en un solo coche -> ya se hizo una vez, se van 2 coches habitualmente pero si alguien falla se puede ir en uno): 8:30-14:30
Paco Luis, José Manuel : 8:30 - 19:30
Janneth (provisional): 9:30 - 20:30 
***Estefanía: 7:30-14:30 (hasta 29 abril) 
*/

// Cada línea crea un turno de martes con los conductores y horarios indicados.
// Se pueden añadir comentarios informativos con .addComentarios()
T.push(
  new Turno(C_MARTES, nTurno++, "08:30", "14:30", [
    C_GUSTAVO,
    C_ALFONSO,
    C_ASUN,
  ]),
);
T.push(
  new Turno(C_MARTES, nTurno++, "08:30", "14:30", [
    C_INMA_BARROSO,
    C_JOSE_ALBERTO,
    C_LIDIA,
  ]),
);

T.push(new Turno(C_MARTES, nTurno++, "08:30", "14:30", [C_PACO_LUIS, C_JMF]));
T.push(new Turno(C_MARTES, nTurno++, "09:30", "20:30", [C_JANNETH]));
T.push(new Turno(C_MARTES, nTurno++, "07:30", "14:30", [C_ESTEFANIA]));

/*
Miércoles:
Pilar Sánchez, Susana Ruiz, Jose Alberto, Alfonso, Gustavo: 8:30-13:30 
***Paco Luis, Ángel, Antonio Rueda (comienzo el 18-02), José Manuel: 8:30 19:30
***Estefanía (hasta 29 abril), David (sólo hasta 27 marzo, Semana Santa): 7:30-14:30
***Miguel: 13:00 - 20:30 (Miguel: Hasta 12 de Marzo)

*/
T.push(
  new Turno(C_MIERCOLES, nTurno++, "08:30", "13:30", [
    C_PILAR,
    C_SUSANA,
    C_JOSE_ALBERTO,
    C_ALFONSO,
    C_GUSTAVO,
  ]),
);

T.push(
  new Turno(C_MIERCOLES, nTurno++, "08:30", "19:30", [
    C_PACO_LUIS,
    C_ANGEL,
    C_JMF,
  ]),
);
T.push(
  new Turno(C_MIERCOLES, nTurno++, "07:30", "14:30", [C_ESTEFANIA, C_DAVID]),
);
T.push(new Turno(C_MIERCOLES, nTurno++, "13:00", "20:30", [C_MIGUEL]));

/*
Jueves: creación de turnos similares con comentarios de flexibilidad y límites temporales
Nacho: 8:30 - 17:30
***Susana Ruiz, Gustavo, Antonio Rueda(comienzo el 19-02), Lidia: 8:20-14:00
Janneth: 14:30 - 18:30

*/
T.push(new Turno(C_JUEVES, nTurno++, "08:30", "17:30", [C_NACHO]));
T.push(
  new Turno(C_JUEVES, nTurno++, "08:20", "14:00", [
    C_SUSANA,
    C_GUSTAVO,
    C_LIDIA,
  ]),
);
T.push(new Turno(C_JUEVES, nTurno++, "14:30", "18:30", [C_JANNETH]));
/*
Viernes:
Nacho: 8:30 - 13:30

*/
T.push(new Turno(C_VIERNES, nTurno++, "08:30", "13:30", [C_NACHO]));

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

  if (fechaEs(fecha, 4, 11, 2025)) {
    aniadirConductor(7, C_ANGEL, 2, "el 4/nov", 2);
    aniadirConductor(7, C_PACO_LUIS, 3, "el 4/nov", 2);
    aniadirConductor(7, C_MIGUEL, 1, "el 4/nov", 2);
  }

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
