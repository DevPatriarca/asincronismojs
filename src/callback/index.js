// Es mi función que será usada como callback
function suma(num1, num2) {
    return num1 + num2;
}

// Esta función recibe una función callback (suma) la cual se ejecuta cuando es llamada
function calc(num1, num2, callback) {
    return callback(num1, num2);
}

console.log(calc(6,2, suma));
// ------------------------------------- // 
function date(callback) {
    console.log(new Date(1990,12,31)); // Imprime la fecha 31/12/1990 (primer resultado)
    setTimeout(function () { // Después de 3s, se ejecuta la función callback que en este caso es printDate
        let date = 'new Date';
        callback(date);
    }, 3000)
}

function printDate(dateNow) { // Recibe un parametro, en este caso hace referencia a let date = new Date (la fecha actual) del setTimeout. Nota que la función y el console.log debe tener el mismo nombre de parámetro
    console.log(dateNow);
}

date(printDate);