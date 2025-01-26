/**
 * @file configuracion_usuario.js
 * @description Archivo de configuración de la vista de configuración de usuario.
 * @requires js/cookies.js
 * @author Víctor Rivas <vrivas@ujaen.es>
 * @date 26-ene-2025
 */

const PREFERENCIAS_COOKIE = "turnos_uja_preferencias";
let PREFERENCIAS_USUARIO_POR_DEFECTO = {
  nombre: "",
  correo: "",
  vistaPorDefecto: "cuatrimestre",
};
let PREFERENCIAS_USUARIO = PREFERENCIAS_USUARIO_POR_DEFECTO;

function guardarPreferencias() {
  setCookie(
    PREFERENCIAS_COOKIE,
    JSON.stringify(PREFERENCIAS_USUARIO),
    365 * 30
  );
}

function cargarPreferencias() {
  const preferencias = getCookie(PREFERENCIAS_COOKIE);
  if (preferencias != "") {
    PREFERENCIAS_USUARIO = JSON.parse(preferencias);
  }
}
