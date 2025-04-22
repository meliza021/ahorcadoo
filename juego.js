
const palabras = ["casa", "perro", "gato", "manzana", "coche", "escuela", "computadora", "televisor", "libro", "pelota"];

let palabraActual = "";
let palabraOculta = [];
let intentos = 0;
const maxIntentos = 6;

const imagen = document.getElementById("imagen");
const palabraAdivinar = document.getElementById("palabra_a_adivinar");
const botonJugar = document.getElementById("jugar");
const botones = document.querySelectorAll("button:not(#jugar)");

botonJugar.addEventListener("click", iniciarJuego);

botones.forEach(boton => {
    boton.addEventListener("click", function() {
        comprobarLetra(this.textContent);
        this.disabled = true;
    });
});


function iniciarJuego() {

    intentos = 0;
    imagen.src = "img/hangman-0.svg";
    

    botones.forEach(boton => {
        boton.disabled = false;
    });

    palabraActual = palabras[Math.floor(Math.random() * palabras.length)];
    

    palabraOculta = Array(palabraActual.length).fill("_");
    

    mostrarPalabra();
}


function mostrarPalabra() {
    palabraAdivinar.innerHTML = "";
    palabraOculta.forEach(letra => {
        const span = document.createElement("span");
        span.textContent = letra;
        palabraAdivinar.appendChild(span);
    });
}


function comprobarLetra(letra) {
    letra = letra.toLowerCase();
    let acierto = false;
    
 
    for (let i = 0; i < palabraActual.length; i++) {
        if (palabraActual[i] === letra) {
            palabraOculta[i] = letra;
            acierto = true;
        }
    }
    
 
    if (acierto) {
        mostrarPalabra();
        

        if (!palabraOculta.includes("_")) {
            setTimeout(() => {
                alert("¡Ganaste! La palabra era: " + palabraActual);
                iniciarJuego();
            }, 500);
        }
    } else {

        intentos++;
        imagen.src = `img/hangman-${intentos}.svg`;
        
 
        if (intentos >= maxIntentos) {
            setTimeout(() => {
                alert("¡Perdiste! La palabra era: " + palabraActual);
                iniciarJuego();
            }, 500);
        }
    }
}

window.onload = iniciarJuego;