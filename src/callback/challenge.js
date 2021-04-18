let XMLHttpRequest = require('xmlhttprequest').XMLHttpRequest; // Instanciar la dependencia XMLHttpRequest. Se usa el ".XMLHttpRequest" para utilizar la propiedad de hacer llamados a una API desde JS

function fetchData(url_api, callback) {
    let xhttp = new XMLHttpRequest(); // Se genera la instancia/referencia al objeto que se necesita (XMLHttpRequest)
    xhttp.open('GET', url_api, true) // Hace el llamado a una URL, se pasa la petición (GET), después la URL de donde se obtiene la data (url_api) y por último (true) para que se maneje de forma asíncrona, aunque por defecto es true, por buena práctica se pone.
    xhttp.onreadystatechange = function (event) { // Se escucha lo que va hacer la conexión (si este cambio sucede, se ejecuta la función)
        if(xhttp.readyState === 4) { // Se hace la validación, el valor 4 se refiere a que la petición ha sido completada
            if(xhttp.status === 200) { // Queremos saber si la petición se completó con éxito, el status 200 es petición exitosa
                callback(null, JSON.parse(xhttp.responseText)) // El callback utiliza un standard dentro de Node que dice que el primer valor de callback es el error y el segundo es la información que se desencadena (en este caso el resultado del llamado a la API). Aquí se manda error, por esa razón se pone null. El resultado del llamado es un JSON, es necesario parsearlo para recibir un objeto y no un string, de esa forma se pueden iterar sus valores o trabajar sobre ellos.
            } else {
                const error = new Error('Error' + url_api); // Como buena práctica, se debe mandar un error en caso de que la petición no esté sucediendo correctamente.
                return callback(error, null); // Nuevamente se utiliza el standard, primero se manda el error, después el resultado, en este caso es null.
            }
        }
    }
    xhttp.send(); // Se envía la solicitud
}