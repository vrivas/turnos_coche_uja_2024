/*
Lunes: 
Nacho: 9:30 - 16:30
Alfonso, Jose Alberto, Estefanía: 8:30-13:30

*/

// Se crean los turnos del lunes, con hora de inicio, fin y los conductores asignados.
// Se pueden añadir comentarios informativos con .addComentarios()

T.push(new Turno(C_LUNES, nTurno++, "09:30", "16:30", [C_NACHO]));
T.push(
  new Turno(C_LUNES, nTurno++, "08:30", "13:30", [
    C_ALFONSO,
    C_JOSE_ALBERTO,
    C_ESTEFANIA,
  ]),
);

/*
Martes:
Susana: 8:30-13:30 (a partir del 12 de octubre) 
Alfonso, Inma, Jose Alberto, Susana,Estefanía:  8:30-14:30    (Susana hasta el 6 de octubre, inclusive)
Joaquín: 7:30 - 14:30
Paco luis, Ángel, Asun:8:30-19:30 (Asun a partir del 6 de octubre)
Asun: 14:30-19:30 (Asun: desde el 15 al 29 de septiembre)

*/

// Cada línea crea un turno de martes con los conductores y horarios indicados.
// Se pueden añadir comentarios informativos con .addComentarios()
T.push(
  new Turno(C_MARTES, nTurno++, "08:30", "14:30", [
    C_ALFONSO,
    C_INMA_BARROSO,
    C_JOSE_ALBERTO,
    C_SUSANA,
    C_ESTEFANIA,
  ]).addComentarios("Suana hasta el 6 de octubre inclusive"),
);
T.push(new Turno(C_MARTES, nTurno++, "07:30", "14:30", [C_JOAQUIN]));

T.push(
  new Turno(C_MARTES, nTurno++, "08:30", "19:30", [
    C_PACO_LUIS,
    C_ANGEL,
  ]).addComentarios("Asun a partir del 6 de octubre"),
);
T.push(
  new Turno(C_MARTES, nTurno++, "14:30", "19:30", [C_ASUN]).addComentarios(
    "Del 15 al 29 de septiembre",
  ),
);

/*
Miércoles:
???? Inma, Lidia, Susana, Asun, Estefanía, Alfonso: 8:30 - 14:30 (Asun a partir del 28 de octubre)(Estefanía a partir de 7 de octubre), (Alfonso también después de la feria el 21 de octubre). Gustavo. Me cambio cuando estéis ya los 5.
Asun: 7:30-14:30 (hasta el 21 de octubre)
José Manuel, Antonio, Paco luis : 8:30-19:30
Joaquín: 14:30 - 20:30
*/
T.push(
  new Turno(C_MIERCOLES, nTurno++, "07:30", "14:30", [C_ASUN]).addComentarios(
    "hasta el 21 de octubre",
  ),
);

T.push(
  new Turno(C_MIERCOLES, nTurno++, "08:30", "19:30", [
    C_PACO_LUIS,
    C_ANTONIO,
    C_JMF,
  ]),
);
T.push(new Turno(C_MIERCOLES, nTurno++, "14:30", "20:30", [C_JOAQUIN]));

/*
Jueves: creación de turnos similares con comentarios de flexibilidad y límites temporales
Nacho: 9:30 - 16:30
Susana, Gustavo, Silvia, Lidia: 8:15 - 14:30 (lo dejamos a las 8,30? Yo tengo la prisa de que empiezo las clases a las 9,30 pero creo que llegamos → si yo creo que podemos dejarlo a las 8:30h) 
Antonio: ida flexible - 21:30
José Manuel, Ángel: 8:30-19:30
Joaquín: 7:30 - 17:30


*/
T.push(new Turno(C_JUEVES, nTurno++, "09:30", "16:30", [C_NACHO]));
T.push(
  new Turno(C_JUEVES, nTurno++, "08:30", "14:30", [
    C_SUSANA,
    C_GUSTAVO,
    C_SILVIA,
    C_LIDIA,
  ]),
);
T.push(new Turno(C_JUEVES, nTurno++, "Ida flexible", "21:30", [C_ANTONIO]));
T.push(new Turno(C_JUEVES, nTurno++, "08:30", "19:30", [C_JMF, C_ANGEL]));
T.push(new Turno(C_JUEVES, nTurno++, "07:30", "21:30", [C_JOAQUIN]));

/*
Viernes:
Jose Alberto:  11:30-18:30  (Jose Alberto: salida flexible. Ángel: José Alberto si puedes salir a las 9:30 y volver a las 19:30 podríamos compartir coche)
Ángel: 9:30 - 19:30
Asun: 8:30-14:30


*/
T.push(new Turno(C_VIERNES, nTurno++, "11:30", "18:30", [C_JOSE_ALBERTO]));
T.push(new Turno(C_VIERNES, nTurno++, "09:30", "19:30", [C_ANGEL]));
T.push(new Turno(C_VIERNES, nTurno++, "08:30", "14:30", [C_ASUN]));

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
    noVa(13, fecha, "Festivo en EPSJ");
    // Adicionalmente, intercambio los turnos de Nacho y Victor:
    T.get(13).personas[1] = C_NACHO;
    T.get(13).personas[0] = C_VICTOR;
  }

  /* ----
   Añadir nuevos coches o turnos a partir de una fecha concreta
   --- */

  if (fechaEs(fecha, 13, 10, 2026)) {
    T.push(
      new Turno(C_MARTES, nTurno++, "08:30", "13:30", [
        C_SUSANA,
      ]).addComentarios("Nuevo turno a partir del 13 de octubre."),
    );
  }

  /* ---
   Modificar la hora de salida o de llegada de un turno ya existente
   --- */
  if (fechaEs(fecha, 30, 3, 2026)) {
    T.get(2).hora_gr = "15:30"; // Cambia la hora de llegada
    T.get(2).hayCambios(); // Se marca el turno como modificado
  }

  /* ----
   Eliminar un turno 
   --- */
  if (fechaEs(fecha, 30, 9, 2026)) cancelarTurno(6, fecha.toDD_MMM());
  if (fechaEs(fecha, 22, 10, 2026)) cancelarTurno(7, fecha.toDD_MMM());

  /* --- 
   Añadir un conductor extra en una fecha concreta
   --- */

  if (fechaEs(fecha, 6, 10, 2026))
    aniadirConductor(5, C_ASUN, 2, fecha.toDD_MMM(), 1);
  if (fechaEs(fecha, 1, 12, 2026))
    aniadirConductor(18, C_ASUN, 1, fecha.toDD_MMM(), 1);

  /* ----
   Eliminar a un conductor de un turno en una fecha concreta
   --- */
  if (fechaEs(fecha, 13, 10, 2026))
    eliminarConductor(3, C_SUSANA, fecha.toDD_MMM(), 3);
  if (fechaEs(fecha, 1, 12, 2026))
    eliminarConductor(5, C_ASUN, fecha.toDD_MMM(), 1);

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
    T.get(5).setContador(0);
    cancelarTurno(4, fecha.toDD_MMM() + " por fusión con turno 5");
  }
}
