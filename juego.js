// juego.js
// Lista de palabras para adivinar
const palabras = ["casa", "perro", "gato", "manzana", "coche", "escuela", "computadora", "televisor", "libro", "pelota"];

// Variables globales
let palabraActual = "";
let palabraOculta = [];
let intentos = 0;
const maxIntentos = 6;

// Elementos del DOM
const imagen = document.getElementById("imagen");
const palabraAdivinar = document.getElementById("palabra_a_adivinar");
const botonJugar = document.getElementById("jugar");
const botones = document.querySelectorAll("button:not(#jugar)");

// Iniciar juego al hacer clic en el botón
botonJugar.addEventListener("click", iniciarJuego);

// Configurar botones de letras
botones.forEach(boton => {
    boton.addEventListener("click", function() {
        comprobarLetra(this.textContent);
        this.disabled = true;
    });
});

// Función para iniciar el juego
function iniciarJuego() {
    // Reiniciar variables
    intentos = 0;
    imagen.src = "img/hangman-0.svg";
    
    // Habilitar todos los botones
    botones.forEach(boton => {
        boton.disabled = false;
    });
    
    // Elegir palabra aleatoria
    palabraActual = palabras[Math.floor(Math.random() * palabras.length)];
    
    // Crear palabra oculta con guiones
    palabraOculta = Array(palabraActual.length).fill("_");
    
    // Mostrar palabra oculta
    mostrarPalabra();
}

// Función para mostrar la palabra con guiones y letras adivinadas
function mostrarPalabra() {
    palabraAdivinar.innerHTML = "";
    palabraOculta.forEach(letra => {
        const span = document.createElement("span");
        span.textContent = letra;
        palabraAdivinar.appendChild(span);
    });
}

// Función para comprobar la letra seleccionada
function comprobarLetra(letra) {
    letra = letra.toLowerCase();
    let acierto = false;
    
    // Comprobar si la letra está en la palabra
    for (let i = 0; i < palabraActual.length; i++) {
        if (palabraActual[i] === letra) {
            palabraOculta[i] = letra;
            acierto = true;
        }
    }
    
    // Actualizar el juego según el resultado
    if (acierto) {
        mostrarPalabra();
        
        // Comprobar si ha ganado
        if (!palabraOculta.includes("_")) {
            setTimeout(() => {
                alert("¡Ganaste! La palabra era: " + palabraActual);
                iniciarJuego();
            }, 500);
        }
    } else {
        // Aumentar intentos y actualizar imagen
        intentos++;
        imagen.src = `img/hangman-${intentos}.svg`;
        
        // Comprobar si ha perdido
        if (intentos >= maxIntentos) {
            setTimeout(() => {
                alert("¡Perdiste! La palabra era: " + palabraActual);
                iniciarJuego();
            }, 500);
        }
    }
}

// Iniciar juego al cargar la página
window.onload = iniciarJuego;