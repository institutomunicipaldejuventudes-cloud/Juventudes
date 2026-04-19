const chatBox = document.getElementById("chatBox");
const input = document.getElementById("messageInput");
const button = document.getElementById("sendBtn");

function sendMessage() {
  const text = input.value.trim();
  if (text === "") return;

  addMessage(text, "user");
  input.value = "";

  // Respuesta automática simulada
  setTimeout(() => {
    addMessage("Respuesta: " + text, "bot");
  }, 500);
}

function addMessage(text, sender) {
  const message = document.createElement("div");
  message.classList.add("message", sender);
  message.textContent = text;
  chatBox.appendChild(message);
  chatBox.scrollTop = chatBox.scrollHeight;
}

// Eventos
button.addEventListener("click", sendMessage);

input.addEventListener("keypress", function(e) {
  if (e.key === "Enter") {
    sendMessage();
  }
});