/**
 * Establece una cookie en el navegador del usuario.
 * @param {string} cname  → Nombre de la cookie.
 * @param {string} cvalue → Valor que se desea guardar.
 * @param {int} exdays   → Número de días que durará la cookie antes de expirar.
 */
function setCookie(cname, cvalue, exdays) {
  // Se crea un objeto Date con la fecha actual.
  const d = new Date();

  // Se calcula la fecha de expiración sumando los días indicados (exdays)
  d.setTime(d.getTime() + exdays * 24 * 60 * 60 * 1000);

  // Se convierte la fecha a formato UTC (requerido por las cookies)
  let expires = "expires=" + d.toUTCString();

  // Se construye la cadena completa de la cookie:
  //   nombre=valor;fecha de expiración;ruta del sitio;restricción de acceso
  document.cookie =
    cname + "=" + cvalue + ";" + expires + ";path=/" + ";SameSite=Strict";
  // - path=/  → la cookie es accesible desde toda la web.
  // - SameSite=Strict → aumenta la seguridad evitando que se envíe la cookie
  //                     en peticiones cruzadas (protege contra CSRF).
}

/**
 * Obtiene el valor de una cookie previamente guardada.
 * @param {string} cname → Nombre de la cookie que queremos leer.
 * @returns {string} → Devuelve el valor de la cookie si existe, o una cadena vacía si no.
 */
function getCookie(cname) {
  let name = cname + "=";

  // document.cookie devuelve todas las cookies en una sola cadena separadas por ';'
  // decodeURIComponent() decodifica los caracteres especiales (%, espacios, etc.)
  let decodedCookie = decodeURIComponent(document.cookie);

  // Se divide la cadena por cada punto y coma para obtener cada cookie individualmente
  let ca = decodedCookie.split(";");

  // Se recorre el array buscando la cookie con el nombre indicado
  for (let i = 0; i < ca.length; i++) {
    let c = ca[i];

    // Se eliminan posibles espacios en blanco al inicio
    while (c.charAt(0) == " ") {
      c = c.substring(1);
    }

    // Si la cookie empieza con el nombre buscado, se devuelve su valor
    if (c.indexOf(name) == 0) {
      return c.substring(name.length, c.length);
    }
  }

  // Si no se encuentra la cookie, se devuelve una cadena vacía
  return "";
}
