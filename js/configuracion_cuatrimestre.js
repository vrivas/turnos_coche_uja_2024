// Se define un objeto literal llamado "cuatrimestre" que almacena toda la información
// referente al periodo académico actual o visible en el calendario de turnos.
let cuatrimestre = {
  numero: 2,
  curso: 2025 + "-" + 2026,

  // Se usa una función llamada 'fecha(día, mes, año)' (definida en el archivo utils.js)
  // para crear objetos de tipo fecha fácilmente.
  inicio: fecha(2, 2, 2026),
  fin: fecha(22, 5, 2026),

  // Array con los días festivos o periodos no lectivos dentro del cuatrimestre
  /*festivos: [
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
      inicio: fecha(8, 12, 2025), 
    },
    { nombre: "Inauguración curso", inicio: fecha(18, 9, 2025) },
  ],*/

  /* Dias festivos del segundo cuatrimestre, comentado para cuando haga falta */

  festivos: [
    {
      nombre: "Semana Santa",
      inicio: fecha(30, 3, 2026),
      fin: fecha(5, 4, 2026),
    },
    { nombre: "Día de Andalucía", inicio: fecha(28, 2, 2026) },
    { nombre: "Día del (NO) Trabajo", inicio: fecha(1, 5, 2026) },
  ],

  // Método que devuelve el título del cuatrimestre en formato HTML.
  // Ejemplo de salida: "1<sup>er</sup> Cuatrimestre, 2025-2026"
  getTitulo: function () {
    return (
      this.numero +
      "<sup>" +
      (this.numero == 1 ? "er" : "o") + // Si es 1 → “1er”; si no → “2o”, etc.
      "</sup> Cuatrimestre, " +
      this.curso
    );
  },
};
