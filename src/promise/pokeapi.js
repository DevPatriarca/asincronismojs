const fetchData = require('../utils/fetchData');
const API = 'https://pokeapi.co/api/v2/pokemon/';


fetchData(API) // 1era petición
    .then(data => {
        console.log(data.count);
        console.log(data.results[0].name);
        return fetchData(data.results[0].url) // 2da petición
    })
    .then(data => {
        console.log(data.order); 
        return fetchData(data.location_area_encounters) // 3ra petición
    })
    .then(data => {
        console.log(data[0].location_area.name);
        console.log(data[1].location_area.name);
        console.log(data[1].version_details[2].encounter_details[0].max_level);
        // console.log(data[2].version_details[1].version.name);
        return fetchData(data[2].version_details[1].version.url) // 4ta petición
    })
    .then(data => {
        console.log(data.names[1].language.name);
    })
    .catch(err => console.error(err));