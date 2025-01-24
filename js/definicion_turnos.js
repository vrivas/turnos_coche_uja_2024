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
