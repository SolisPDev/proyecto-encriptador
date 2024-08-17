///////  Definicion de Variables  /////////
let texto = "";
let textoCodificado = "";
let textoCopiado = "";

//////////////////////////////////////
////// Definicion de funciones  //////
//////////////////////////////////////
function iniciaControles(){
    visualizarElemento('msgError', 'none');
    visualizarElemento('resultadoCopiar', 'none');
    visualizarElemento('textoResultado', 'none');
}

function visualizarElemento(idElemento, valor) {
    var elemento = document.getElementById(idElemento);
    if (elemento) {
        elemento.style.display = valor;
    } else {
        console.log('Elemento no encontrado');
    }
}

function replaceWithVowel(inputString, targetString, vocal) {
    if (!/[aeiouAEIOU]/.test(vocal)) {
      throw new Error("El reemplazo debe ser una vocal.");
    }
  
    return inputString.split(targetString).join(vocal);
  }
   
function evaluaCadena(cadena) {
    // Expresion regular que solo permite letras minúsculas y espacios
    const regex = /^[a-z\s]+$/; 
    return regex.test(cadena);
  }

function asignarTextoPorId(elemento, texto) {
    let elementoHTML = document.getElementById(elemento);
    elementoHTML.innerHTML = texto;
    return;
}

function limpiarTextarea(elemento) {
    document.getElementById(elemento).value = '';
}

function copiarTexto() {
    let texto = document.getElementById('textoResultado').innerHTML;

    navigator.clipboard.writeText(texto)
    .then(() => {
        console.log('Contenido copiado al portapapeles');
        /* Resuelto - texto copiado al portapapeles con éxito */
    },() => {
        console.error('Error al copiar');
        /* Rechazado - fallo al copiar el texto al portapapeles */
    });
}

/////////////////////////////////////////
////// Funcionalidad de los botones /////
/////////////////////////////////////////
function encriptar(){
    let textoCodificado = "";
    let texto = document.getElementById('textoEntrada').value;
    visualizarElemento('msgError', 'none');
    if(evaluaCadena(texto) == false){
        /* El TEXTO contiene numeros o caracteres especiales no cumple el requisito.*/
        console.log('La cadena tiene numeros');
        visualizarElemento('msgError', 'block');
    } else {
        console.log('la cadena cumple el primer requisito');
        visualizarElemento('resultadoTextoMsg', 'none');
        visualizarElemento('resultadoImagen', 'none');
        visualizarElemento('textoResultado', 'block');
        visualizarElemento('resultadoCopiar', 'block');

        /*** ***reglas para encriptar ****/
        // La letra "a" es convertida para "ai"
        // La letra "e" es convertida para "enter"
        // La letra "i" es convertida para "imes"
        // La letra "o" es convertida para "ober"
        // La letra "u" es convertida para "ufat"

        for (let letra of texto) {
            console.log(letra);

            switch (letra.toLowerCase()) {
                case 'a':
                    console.log("Vocal 'a' encontrada");
                    textoCodificado = textoCodificado + "ai";
                    break;
                case 'e':
                    console.log("Vocal 'e' encontrada");
                    textoCodificado = textoCodificado + "enter";
                    break;
                case 'i':
                    console.log("Vocal 'i' encontrada");
                    textoCodificado = textoCodificado + "imes";
                    break;
                case 'o':
                    console.log("Vocal 'o' encontrada");
                    textoCodificado = textoCodificado + "ober";
                    break;
                case 'u':
                    console.log("Vocal 'u' encontrada");
                    textoCodificado = textoCodificado + "ufat";
                    break;
                default:
                    textoCodificado = textoCodificado + letra.toLowerCase();
                    break;
            }
        }

        console.log(textoCodificado);
        asignarTextoPorId('textoResultado',`${textoCodificado}`);
    }
}

function desencriptar(){
    // inicia proceso de desencriptar
    let texto = document.getElementById('textoEntrada').value;
    let textoDesencriptado = replaceWithVowel(texto, "ai", "a");
    textoDesencriptado = replaceWithVowel(textoDesencriptado, "enter", "e");
    textoDesencriptado = replaceWithVowel(textoDesencriptado, "imes", "i");
    textoDesencriptado = replaceWithVowel(textoDesencriptado, "ober", "o");
    textoDesencriptado = replaceWithVowel(textoDesencriptado, "ufat", "u");
    // Salida: resultadoPrueba es la cadenas desencriptada
    console.log(textoDesencriptado);
    // Muestrando los resultados en pantalla
    visualizarElemento('resultadoTextoMsg', 'none');
    visualizarElemento('resultadoImagen', 'none');
    visualizarElemento('textoResultado', 'block');
    visualizarElemento('resultadoCopiar', 'block');
    asignarTextoPorId('textoResultado',`${textoDesencriptado}`);
}

function copiar(){
    // llama la funcion que copia el texto al portapapeles
    copiarTexto();
    //reorganiza la pantalla para iniciar nuevo proceso
    limpiarTextarea('textoEntrada');
    visualizarElemento('resultadoTextoMsg', 'block');
    visualizarElemento('resultadoImagen', 'block');
    visualizarElemento('textoResultado', 'none');
    visualizarElemento('resultadoCopiar', 'none');
   
}

//////// INICIO /////////
iniciaControles();