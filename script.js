// Lista de imágenes y sus marcas correspondientes
const motos = [
  { imagen: './img/1.png', marca: 'Honda' },
  { imagen: './img/2.png', marca: 'Yamaha' },
  { imagen: './img/3.png', marca: 'Honda' },
  { imagen: './img/4.png', marca: 'Honda' },
  { imagen: './img/5.png', marca: 'Honda' },
  { imagen: './img/6.png', marca: 'Kawasaki' },
  { imagen: './img/7.png', marca: 'Kawasaki' },
  { imagen: './img/8.png', marca: 'Kawasaki' },
  { imagen: './img/9.png', marca: 'Suzuki' },
  { imagen: './img/10.png', marca: 'Suzuki' },
  { imagen: './img/11.png', marca: 'Suzuki' },
  { imagen: './img/12.png', marca: 'Suzuki' },
  { imagen: './img/13.png', marca: 'Suzuki' },
  { imagen: './img/14.png', marca: 'Yamaha' },
  { imagen: './img/15.png', marca: 'Yamaha' },
  { imagen: './img/16.png', marca: 'Yamaha' },
  { imagen: './img/17.png', marca: 'Kawasaki' },
  { imagen: './img/18.png', marca: 'Kawasaki' },
  { imagen: './img/19.png', marca: 'Yamaha' },
];

//Variables
let motosRestantes = [...motos];
let respuestaCorrecta;
let contadorImagenes = 0;
let puntos = 0;
const maxImagenes = 14;
let contadorBloqueado = false;

//Elementos del DOM
const imgElement = document.getElementById('motoImg');
const barraProgreso = document.getElementById('barraProgreso');
const alertContainer = document.getElementById('alertContainer');
const alertSound = document.getElementById('alertSound');
const contadorPuntos = document.getElementById('contadorPuntos');
const botones = document.querySelectorAll('#botones button');

// Función para mostrar una imagen de moto aleatoria
function mostrarMotoAleatoria() {
  // Si el contador de imágenes alcanzó el máximo o los puntos son 10
  if (contadorImagenes >= maxImagenes || puntos === 10) {
    if (contadorImagenes >= maxImagenes) {
      mostrarAlerta3();
    } else {
      mostrarAlerta4(); 
    }
    deshabilitarBotones();
    return;
  }

  // Si no hay motos restantes, se restablece la lista de motos
  if (motosRestantes.length === 0) {
    motosRestantes = [...motos];
  }

  // Seleccionar una moto aleatoria de la lista de motos restantes
  const indexAleatorio = Math.floor(Math.random() * motosRestantes.length);
  const motoSeleccionada = motosRestantes.splice(indexAleatorio, 1)[0];

  // Actualizar el elemento de imagen con la imagen de la moto seleccionada
  imgElement.src = motoSeleccionada.imagen;
  imgElement.dataset.marca = motoSeleccionada.marca;

  // Establecer la respuesta correcta
  respuestaCorrecta = motoSeleccionada.marca;

  // Incrementar el contador de imágenes y actualizar la barra de progreso
  contadorImagenes++;
  barraProgreso.value = contadorImagenes;
}

// Función para deshabilitar los botones
function deshabilitarBotones() {
  botones.forEach((boton) => {
    boton.disabled = true;
  });
}

// Función para verificar la respuesta del jugador
function verificarRespuesta(btn) {
  const respuesta = btn.textContent;
  if (respuesta === respuestaCorrecta) {
    mostrarAlerta('¡Respuesta Correcta!', 'success');
    puntos++;
    contadorPuntos.value = puntos;
    // Mostrar una nueva imagen después de acertar la respuesta
    mostrarMotoAleatoria();
  } else {
    mostrarAlerta('Respuesta Incorrecta. Inténtalo de Nuevo.', 'error');
    mostrarMotoAleatoria();
  }
}

// Función para mostrar alerta tipo 1
function mostrarAlerta(mensaje, tipo) {
  const alerta = document.createElement('div');
  alerta.className = `alert alert-${tipo} shadow-lg`;
  alerta.innerHTML = `
        <div>
            
            <span>${mensaje}</span>
        </div>
    `;
  alertContainer.appendChild(alerta);
  setTimeout(() => {
    alerta.remove();
  }, 300);
}

// Función para mostrar alerta tipo 2
function mostrarAlerta2(mensaje, tipo) {
  const alerta = document.createElement('div');
  alerta.className = `alert alert-${tipo} shadow-lg`;
  alerta.innerHTML = `
        <div class="alerta">
            
            <span>${mensaje}</span>
        </div>
    `;
  alertContainer.appendChild(alerta);
}

//Función para mostrar alerta tipo 3
function mostrarAlerta3(mensaje, tipo) {
  const alerta = document.createElement('div');
  alerta.innerHTML = `
    <div role="alert" class="alerta alert shadow-lg">
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" class="stroke-info shrink-0 w-6 h-6"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>
    <div>
      <h3 class="font-bold">Nuevo Mensaje!</h3>
      <div class="text-xs">Mejor que vayas a pata, porque no tienes ni idea de motos :) </div>
    </div>
    <button class="btn btn-sm">Ver</button>
  </div>
    `;
  alertSound.play();
  alertContainer.appendChild(alerta);
}

//Función para mostrar alerta tipo 4
function mostrarAlerta4(mensaje, tipo) {
  const alerta = document.createElement('div');
  alerta.innerHTML = `
    <div role="alert" class="alert">
  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" class="stroke-info shrink-0 w-6 h-6"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>
  <span>Veo que sabes de motos, me das una vueltecita? 🙄</span>
  <div>
    <button class="btn btn-sm">Denegar</button>
    <button class="btn btn-sm btn-primary">Aceptar</button>
  </div>
</div>
    `;
  alertSound.play();
  alertContainer.appendChild(alerta);
}

// Mostrar la primera imagen al cargar la página
mostrarMotoAleatoria();
