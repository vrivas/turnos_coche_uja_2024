let cuatrimestre = {
  numero: 2,
  curso: "2024-2025",
  inicio: fecha(27, 1, 2025),
  fin: fecha(16, 5, 2025),
  /*"festivos": 
    [ { "nombre": "Navidad", "inicio": fecha(21, 12, 2024), "fin": fecha(6, 1, 2025)}, 
        {"nombre": "El Pilar","inicio": fecha(12, 10, 2024)},
        {"nombre": "Festividad Jaén","inicio": fecha(18, 10, 2024)},
        {"nombre": "Todos los Santos","inicio": fecha(1, 11, 2024)},
        {"nombre": "Día de la Constitución","inicio": fecha(6, 12, 2024)},
        {"nombre": "Día de la Inmaculada","inicio": fecha(9, 12, 2024)}
    ], // Festivos primer cuatrim*/
  festivos: [
    {
      nombre: "Semana Santa",
      inicio: fecha(14, 4, 2025),
      fin: fecha(20, 4, 2025),
    },
    { nombre: "Día de Andalucía", inicio: fecha(28, 2, 2025) },
    { nombre: "Día del (NO) Trabajo", inicio: fecha(1, 5, 2024) },
  ], // Festivos segundo cuatrim*/

  getTitulo: function () {
    return (
      this.numero +
      "<sup>" +
      (this.numero == 1 ? "er" : "o") +
      "</sup> Cuatrimestre, " +
      this.curso
    );
  },
};
