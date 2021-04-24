const fetchData = require('../utils/fetchData'); // Importamos fetchData.js para poder utilizar la función
const API = 'https://rickandmortyapi.com/api/character/'; // Referenciamos la API

// Se hacen 3 peticiones: 1) Count total personajes, 2) Traer el primer elemento (nombre del personaje), 3) Del resultante del personaje se debe traer la dimensión del personaje
fetchData(API)
    .then(data => { // 1) Count total personajes
        console.log(data.info.count); // Imprime el total de personajes
        return fetchData(`${API}${data.results[0].id}`) // Se hace la petición para obtener el primer personaje
    })
    .then(data => { // 2) Traer el primer elemento (nombre del personaje)
        console.log(data.name); // Muestra el primer personaje
        return fetchData(data.origin.url) // Se hace la petición para traer la dimensión del personaje
    })
    .then(data => { //3) Del resultante del personaje se debe traer la dimensión del personaje
        console.log(data.dimension); // Muestra la dimensión del personaje
    })
    .catch(err => console.error(err)); // En caso de error, muestra el error