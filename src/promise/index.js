const somethingWillHappen = () => {
    return new Promise((resolve, reject) => { // Recibe una función anónima con dos parámetros: resolve y reject
        if (true) { // Se hace una validación, si resuelve la promesa entonces es true (resolve)
            resolve('Hey!');
        } else {
            reject('Whoops!'); // Si la promesa no se resuelve es reject. 
        };
    });
}

somethingWillHappen() // Se ejecuta la función 
    .then(response => console.log(response)) // Se pasa método then, es dcir, se tiene una respuesta y con ella se hace algo , en este caso mostrarlo en la consola.
    .catch(err => console.log(err)); // En caso de error, se hace algo con ese error, en este caso mostrarlo en la consola.

const somethingWillHappen2 = () => {
    return new Promise((resolve, reject) => {
        if (true) {
            setTimeout(() => {
                resolve('Todo ok!')
            }, 500)
        } else {
            const error = new Error('Algo anda mal'); // new Error va permitir debugear mejor ya que arroja información del error.
            reject(error);
        }
    });
}

somethingWillHappen2()
    .then(response => console.log(response))
    // .then(response => console.log('oli xd')) // También podemos poner más valores
    // .then(response => console.log('oli2 xxxxd'))
    .catch(err => console.log(err));

// Corriendo varias promesas o promesas encadenadas. 
Promise.all([somethingWillHappen(),somethingWillHappen2()])
    .then(response => console.log('Array of results', response)) // Da un array con el resultado de las dos promesas.
    .catch(err => console.log(err));