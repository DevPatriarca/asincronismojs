let XMLHttpRequest = require('xmlhttprequest').XMLHttpRequest; // Instanciar la dependencia XMLHttpRequest. Se usa el ".XMLHttpRequest" para utilizar la propiedad de hacer llamados a una API desde JS
let API = 'https://rickandmortyapi.com/api/character/'; // El primer argumento que toma mi función fetchData

function fetchData(url_api, callback) {
    let xhttp = new XMLHttpRequest(); // Se genera la instancia/referencia al objeto que se necesita (XMLHttpRequest)
    xhttp.open('GET', url_api, true) // Hace el llamado a una URL, se pasa la petición (GET), después la URL de donde se obtiene la data (url_api) y por último (true) para que se maneje de forma asíncrona, aunque por defecto es true, por buena práctica se pone.
    xhttp.onreadystatechange = function (event) { // Se escucha lo que va hacer la conexión (si este cambio sucede, se ejecuta la función)
        if(xhttp.readyState === 4) { // Se hace la validación, el valor 4 se refiere a que la petición ha sido completada. Se valida el status del llamado
            if(xhttp.status === 200) { // Queremos saber si la petición se completó con éxito, el status 200 es petición exitosa. Se valida el status de la conexión
                callback(null, JSON.parse(xhttp.responseText)) // El callback utiliza un standard dentro de Node que dice que el primer valor de callback es el error y el segundo es la información que se desencadena (en este caso el resultado del llamado a la API). Aquí se manda error, por esa razón se pone null. El resultado del llamado es un JSON, es necesario parsearlo para recibir un objeto y no un string, de esa forma se pueden iterar sus valores o trabajar sobre ellos.
            } else {
                const error = new Error('Error' + url_api); // Como buena práctica, se debe mandar un error en caso de que la petición no esté sucediendo correctamente.
                return callback(error, null); // Nuevamente se utiliza el standard, primero se manda el error, después el resultado, en este caso es null.
            }
        }
    }
    xhttp.send(); // Se envía la solicitud
}

// Se hace el llamado a la API (PRIMERA PETICIÓN)
fetchData(API, function(error1, data1) { // Se crea la función callback la cual es el segundo argumento de mi función fetchData, recibe 2 parámetros: error y la data (los datos resultantes de la petición). La función se utilizará varias veces de forma anidada para hacer las 3 peticiones que se necesitan.
    if(error1) return console.error(error1); // Si hay error, entonces manda el error1
    // Se obtiene los datos de la API y se consulta el ID del primer personaje (SEGUNDA PETICIÓN)
    fetchData(API + data1.results[0].id, function (error2, data2) {
        if(error2) return console.error(error2);
        // Se obtiene el origen (dimensión) del personaje (TERCERA PETICIÓN)
        fetchData(data2.origin.url, function (error3, data3) {
            if(error3) return console.error(error3);
            console.log(data1.info.count); // Imprime el total de los personajes
            console.log(data2.name); // Imprime el nombre del personaje
            console.log(data3.dimension); // Imprime la dimensión del personaje
        });
    });
});