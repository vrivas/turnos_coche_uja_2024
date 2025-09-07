let cuatrimestre = {
  numero: 1,
  curso: 2025 + "-" + 2026,
  inicio: fecha(8, 9, 2025), // fecha( 2,2,2026),
  fin: fecha(19, 12, 2025), // fecha(22, 5, 2026),
  festivos: [
    {
      nombre: "Navidad",
      inicio: fecha(20, 12, 2025),
      fin: fecha(6, 1, 2026),
    },
    { nombre: "El Pilar", inicio: fecha(12 + 1, 10, 2025) },
    { nombre: "Festividad Jaén", inicio: fecha(18, 10, 2025) },
    { nombre: "Todos los Santos", inicio: fecha(1, 11, 2025) },
    {
      nombre: "Día de la Constitución",
      inicio: fecha(6, 12, 2025),
    },
    {
      nombre: "Día de la Inmaculada",
      inicio: fecha(8 + 1, 12, 2025),
    },
    { nombre: "Inauguración curso", inicio: fecha(18, 9, 2025) },
  ], // Festivos primer cuatrim
  /*festivos: [
    {
      nombre: "Semana Santa",
      inicio: fecha(28, 3, 2026),
      fin: fecha(5, 4, 2026),
    },
    { nombre: "Día de Andalucía", inicio: fecha(28, 2, 2025) },
    { nombre: "Día del (NO) Trabajo", inicio: fecha(1, 5, 2025) },
  ], // Festivos segundo cuatrim */

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
