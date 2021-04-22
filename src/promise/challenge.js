const fetchData = require('../utils/fetchData'); // Importamos fetchData.js para poder utilizar la función
const API = 'https://rickandmortyapi.com/api/character/'; // Referenciamos la API

// Se hacen 3 peticiones: 1) Count total personajes, 2) Traer el primer elemento (nombre del personaje), 3) Del resultante del personaje se debe traer la dimensión del personaje
fetchData(API)
    .then(data => { // 1) Count total personajes
        console.log(data.info.count);
        return fetchData(`${API}${data.results[0].id}`)
    })
    .then(data => { // 2) Traer el primer elemento (nombre del personaje)
        console.log(data.name);
        return fetchData(data.origin.url)
    })
    .then(data => { //3) Del resultante del personaje se debe traer la dimensión del personaje
        console.log(data.dimension);
    })
    .catch(err => console.error(err));