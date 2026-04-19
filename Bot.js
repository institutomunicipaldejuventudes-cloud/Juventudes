const ESPERANDO_SENTIMIENTO = 1;
const PREGUNTAS = 2;
const FINAL = 3;

let estado = ESPERANDO_SENTIMIENTO;
let indicePregunta = 0;
let respuestasSi = 0;

const preguntas = [
  "¿Te has sentido triste o desanimado?",
  "¿Sientes que la ansiedad o el estrés te sobrepasa a veces?",
  "¿Te cuesta dormir o descansar bien?",
  "¿Sientes que tus problemas afectan tu vida diaria?",
  "¿Te has sentido solo o incomprendido?",
  "¿Te cuesta controlar tus emociones?",
  "¿Sientes que necesitas hablar con alguien?",
  "¿Te gustaría sentirte mejor emocionalmente?"
];

// Lista de palabras negativas
const palabrasNegativas = [
  "mal", "triste", "deprimido", "deprimida", "ansioso", "ansiosa",
  "estresado", "estresada", "cansado", "cansada", "solo", "sola",
  "vacío", "vacía", "enojado", "enojada", "frustrado", "frustrada",
  "llorar", "llorando", "desanimado", "desanimada", "agotado", "agotada",
  "preocupado", "preocupada", "fatal", "horrible", "terrible","me quiero matar",
  "siento un vacio emocional","me queiro sucicidar","nada bien","emocionalmente negativamente",
  "emputado",
];

// Función para detectar sentimiento negativo
function esNegativo(mensaje) {
  return palabrasNegativas.some(palabra => mensaje.includes(palabra));
}

function siguientePregunta() {
  if (indicePregunta < preguntas.length) {
    return preguntas[indicePregunta++];
  }
  return null;
}

function responder(mensaje) {
  mensaje = mensaje.trim().toLowerCase();

  if (mensaje === "hola") {
    estado = ESPERANDO_SENTIMIENTO;
    indicePregunta = 0;
    respuestasSi = 0;
    return "Hola 😊, ¿cómo te sientes?";
  }

  if (estado === ESPERANDO_SENTIMIENTO) {
    if (esNegativo(mensaje)) {
      estado = PREGUNTAS;
      return "Te haré unas preguntas. Responde 'sí' o 'no'.\n" + siguientePregunta();
    } else {
      return "Me alegra 😊. Si necesitas hablar, aquí estoy.";
    }
  }

  else if (estado === PREGUNTAS) {
    if (mensaje === "si" || mensaje === "sí" || mensaje === "no") {

      if (mensaje === "si" || mensaje === "sí") {
        respuestasSi++;
      }

      const pregunta = siguientePregunta();

      if (pregunta !== null) {
        return "Gracias por responder 💙.\n" + pregunta;
      } else {
        estado = FINAL;

        if (respuestasSi >= 4) {
          return "Parece que estás pasando por un momento difícil.\n¿Te gustaría agendar una cita con un psicólogo?";
        } else {
          return "Gracias por responder.\n¿Te gustaría agendar una cita con un psicólogo?";
        }
      }

    } else {
      return "Por favor responde solo 'sí' o 'no'.";
    }
  }

  else if (estado === FINAL) {
    if (mensaje === "si" || mensaje === "sí") {
      return "Perfecto, puedes contactar al psicólogo al 📞 55 4176 2196";
    } else if (mensaje === "no") {
      return "Está bien, aquí estaré si lo necesitas 💙.";
    } else {
      return "Por favor responde 'sí' o 'no'.";
    }
  }

  return "No entendí tu respuesta.";
}

// UI
function agregarMensaje(texto, clase) {
  const chat = document.getElementById("chat");
  const div = document.createElement("div");
  div.className = "message " + clase;
  div.innerText = texto;
  chat.appendChild(div);
  chat.scrollTop = chat.scrollHeight;
}

function enviar() {
  const input = document.getElementById("input");
  const texto = input.value;

  if (texto === "") return;

  agregarMensaje(texto, "user");

  const respuesta = responder(texto);
  setTimeout(() => agregarMensaje(respuesta, "bot"), 500);

  input.value = "";
}

document.getElementById("input").addEventListener("keypress", function(e) {
  if (e.key === "Enter") {
    enviar();
  }
});

// Mensaje inicial
window.onload = () => {
  agregarMensaje("Este chat es informativo y no sustituye ayuda profesional.", "bot");
  agregarMensaje("Hola 😊, ¿cómo te sientes?", "bot");
};