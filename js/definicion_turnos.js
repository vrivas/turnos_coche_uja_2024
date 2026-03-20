/*
Lunes: 
Nacho: 12:30 - 17:30 (Nacho: a partir del 23 de febrero)
Inma, Lidia, Asun, Alfonso, Ángel: 08:30 - 14:30
Janneth: 14:30 - 18:30 (hasta 23 de marzo)
Janneth 15:30 - 18:30 (a partir del 30 de marzo)
Miguel: 13:00 - 20:30 (Miguel: Hasta Semana Santa)
*/

// Se crean los turnos del lunes, con hora de inicio, fin y los conductores asignados.
// Se pueden añadir comentarios informativos con .addComentarios()

T.push(
  new Turno(C_LUNES, nTurno++, "08:30", "14:30", [
    C_INMA_BARROSO,
    C_LIDIA,
    C_ALFONSO,
    C_ANGEL,
  ]),
);
T.push(
  new Turno(C_LUNES, nTurno++, "14:30", "18:30", [C_JANNETH])
    .addComentarios("Desde las 14:30 hasta el 23/Mar/2026")
    .addComentarios("Desde las 15:30 a partir del 30/Mar/2026"),
);
T.push(
  new Turno(C_LUNES, nTurno++, "13:00", "20:30", [C_MIGUEL]).addComentarios(
    "Hasta Semana Santa",
  ),
);

/*
Martes:
Pilar Sánchez: 7:30-12:30
Gustavo, Inma, Jose Alberto, Lidia, Alfonso, Asun (nos partimos en 2 coches? -> (lidia) yo sugiero hacer uno porque si alguien falla se puede ir en un solo coche)
(Asun), somos 6 personas, no cojemos en un solo coche -> ya se hizo una vez, se van 2 coches habitualmente pero si alguien falla se puede ir en uno): 8:30-14:30
Paco Luis, José Manuel : 8:30 - 19:30
Janneth (provisional): 9:30 - 20:30 
Estefanía: 7:30-14:30 (hasta 29 abril) 
*/

// Cada línea crea un turno de martes con los conductores y horarios indicados.
// Se pueden añadir comentarios informativos con .addComentarios()
T.push(new Turno(C_MARTES, nTurno++, "08:30", "14:30", [C_GUSTAVO, C_ASUN]));
T.push(
  new Turno(C_MARTES, nTurno++, "08:30", "14:30", [
    C_INMA_BARROSO,
    C_JOSE_ALBERTO,
    C_LIDIA,
  ]),
);

T.push(new Turno(C_MARTES, nTurno++, "08:30", "19:30", [C_PACO_LUIS, C_JMF]));
T.push(new Turno(C_MARTES, nTurno++, "09:30", "20:30", [C_JANNETH]));
T.push(new Turno(C_MARTES, nTurno++, "07:30", "14:30", [C_ESTEFANIA]));

/*
Miércoles:
Pilar Sánchez, Susana Ruiz, Jose Alberto, Alfonso, Gustavo: 8:30-13:30 
Paco Luis, Ángel, Antonio Rueda (comienzo el 18-02), José Manuel: 8:30 19:30
Estefanía (hasta 29 abril), David (sólo hasta 27 marzo, Semana Santa): 7:30-14:30
Miguel: 13:00 - 20:30 (Miguel: Hasta 12 de Marzo)

*/
T.push(
  new Turno(C_MIERCOLES, nTurno++, "08:30", "13:30", [
    C_SUSANA,
    C_JOSE_ALBERTO,
    C_GUSTAVO,
  ]).setContador(2),
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
Susana Ruiz, Gustavo, Antonio Rueda(comienzo el 19-02), Lidia: 8:20-14:00
Janneth: 14:30 - 18:30

*/
T.push(new Turno(C_JUEVES, nTurno++, "08:30", "17:30", [C_NACHO]));
T.push(
  new Turno(C_JUEVES, nTurno++, "08:20", "14:00", [
    C_SUSANA,
    C_GUSTAVO,
    C_LIDIA,
    C_PILAR,
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
  Cambiar quién conduce un día
  ----- */
  /* ----
  Un día no va un turno
  ----- */
  if (fechaEs(fecha, 19, 3, 2026)) {
    T.get(13).diasNoVa.push({ fecha: fecha, motivo: "Festivo en EPSJ" });
    // Adicionalmente, intercambio los turnos de Nacho y Victor:
    T.get(13).personas[1] = C_NACHO;
    T.get(13).personas[0] = C_VICTOR;
  }

  /* ----
   Añadir nuevos coches o turnos a partir de una fecha concreta
   --- */

  if (fechaEs(fecha, 23, 2, 2026)) {
    T.push(
      new Turno(C_LUNES, nTurno++, "12:30", "17:30", [C_NACHO]).addComentarios(
        "Nuevo turno a partir del 23 de febrero.",
      ),
    );
  }

  if (fechaEs(fecha, 3, 2, 2026)) {
    T.push(new Turno(C_MARTES, nTurno++, "07:30", "12:30", [C_PILAR]));
  }
  /* ---
   Modificar la hora de salida o de llegada de un turno ya existente
   --- */
  if (fechaEs(fecha, 30, 3, 2026)) {
    T[2 - 1].hora_gr = "15:30"; // Cambia la hora de llegada
    T[2 - 1].hayCambios(); // Se marca el turno como modificado
  }

  if (fechaEs(fecha, 13, 2, 2026)) {
    T[12 - 1].hora_gr = "14:20"; // Cambia la hora de llegada
    T[12 - 1].addComentarios(
      "13-feb: se modifica la hora de salida a las 14:20.",
    );
    T[12 - 1].hayCambios(); // Se marca el turno como modificado
  }
  if (fechaEs(fecha, 12, 3, 2026)) {
    T[12 - 1].hora_gr = "15:30"; // Cambia la hora de llegada
    T[12 - 1].hora_ja = "19:30"; // Cambia la hora de salida
    T[12 - 1].addComentarios(
      "12-mar: se modifica el horario de 15:30 a 19:30.",
    );
    T[12 - 1].hayCambios(); // Se marca el turno como modificado
  }
  /* ----
   Eliminar un turno 
   --- */
  if (fechaEs(fecha, 30, 3, 2026)) cancelarTurno(3, fecha.toDD_MMM());
  if (fechaEs(fecha, 29, 4, 2026)) cancelarTurno(8, fecha.toDD_MMM());
  if (fechaEs(fecha, 29, 4, 2026)) cancelarTurno(11, fecha.toDD_MMM());

  /* --- 
   Añadir un conductor extra en una fecha concreta
   --- */

  if (fechaEs(fecha, 9, 2, 2026))
    aniadirConductor(1, C_ASUN, 2, fecha.toDD_MMM(), 2);
  if (fechaEs(fecha, 18, 2, 2026))
    aniadirConductor(10, C_ANTONIO, 0, fecha.toDD_MMM(), 0);
  if (fechaEs(fecha, 19, 2, 2026))
    aniadirConductor(14, C_ANTONIO, 4, fecha.toDD_MMM(), 4);
  if (fechaEs(fecha, 10, 2, 2026))
    aniadirConductor(4, C_ALFONSO, 1, fecha.toDD_MMM(), 0);
  if (fechaEs(fecha, 11, 2, 2026))
    aniadirConductor(9, C_ALFONSO, 1, fecha.toDD_MMM(), 0);
  if (fechaEs(fecha, 13, 2, 2026))
    aniadirConductor(12, C_ASUN, 0, fecha.toDD_MMM(), 0);
  if (fechaEs(fecha, 26, 2, 2026))
    aniadirConductor(13, C_VICTOR, 1, fecha.toDD_MMM(), 0);
  if (fechaEs(fecha, 9, 3, 2026))
    aniadirConductor(13, C_SILVIA, 2, fecha.toDD_MMM(), 2);

  /* ----
   Eliminar a un conductor de un turno en una fecha concreta
   --- */
  if (fechaEs(fecha, 27, 3, 2026))
    eliminarConductor(11, C_DAVID, fecha.toDD_MMM(), 0);

  if (fechaEs(fecha, 13, 2, 2026))
    eliminarConductor(1, C_ASUN, fecha.toDD_MMM(), 2);
  if (fechaEs(fecha, 12, 3, 2026))
    eliminarConductor(12, C_MIGUEL, fecha.toDD_MMM(), 0);
  if (fechaEs(fecha, 7, 5, 2026))
    eliminarConductor(13, C_VICTOR, fecha.toDD_MMM(), 1);

  // Fusionamos dos turnos porque de 6 pasan a 5
  if (fechaEs(fecha, 13, 2, 2026)) {
    eliminarConductor(4, C_ASUN, fecha.toDD_MMM(), 0);
    aniadirConductor(5, C_ALFONSO, 1, fecha.toDD_MMM(), 0);
    aniadirConductor(5, C_GUSTAVO, 1, fecha.toDD_MMM(), 0);
    T[5 - 1].personas = [
      C_ALFONSO,
      C_LIDIA,
      C_GUSTAVO,
      C_INMA_BARROSO,
      C_JOSE_ALBERTO,
    ];
    T[5 - 1].setContador(0);
    cancelarTurno(4, fecha.toDD_MMM() + " por fusión con turno 5");
  }
}
