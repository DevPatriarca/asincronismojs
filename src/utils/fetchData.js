//Aquí se crea la función para utilizarla en promesas.
// Se crea una nueva carpeta (utils) y se convierte el código a ES6 para poder utilizar la función fetchData dentro de challenge.js
let XMLHttpRequest = require('xmlhttprequest').XMLHttpRequest; // Instanciar la dependencia XMLHttpRequest. Se usa el ".XMLHttpRequest" para utilizar la propiedad de hacer llamados a una API desde JS

const fetchData = (url_api) => { // La función fetchData se vuelve una arrow function
    return new Promise ((resolve, reject) => {
        const xhttp = new XMLHttpRequest(); // Se genera la instancia/referencia al objeto que se necesita (XMLHttpRequest)
        xhttp.open('GET', url_api, true) // Hace el llamado a una URL, se pasa la petición (GET), después la URL de donde se obtiene la data (url_api) y por último (true) para que se maneje de forma asíncrona, aunque por defecto es true, por buena práctica se pone.
        xhttp.onreadystatechange = (() => { // Se escucha lo que va hacer la conexión (si este cambio sucede, se ejecuta la función)
            if(xhttp.readyState === 4) { // Se hace la validación, el valor 4 se refiere a que la petición ha sido completada. Se valida el status del llamado
                (xhttp.status === 200) // Se utiliza el operador ternario (? :)
                ? resolve(JSON.parse(xhttp.responseText)) // Se parsea la respuesta
                : reject(new Error('Error ', url_api)) // Se manda el error (arroja info del error)
            }
        });
        xhttp.send(); // Se envía la solicitud
    });
}

module.exports = fetchData; // Node aún no utiliza module export/import default