const apiUrlMessages = '/api/messages'; // Adjust API URL
const apiUrlServers = '/api/servers';

// Function to fetch messages
async function fetchMessages() {
  const response = await fetch(apiUrlMessages);
  const messages = await response.json();
  displayMessages(messages);
}

// Function to display messages
function displayMessages(messages) {
  const messageContainer = document.getElementById('messages');
  messageContainer.innerHTML = '';
  messages.forEach(msg => {
    const msgElement = document.createElement('div');
    msgElement.textContent = `${msg.text} - ${msg.userId}`;
    messageContainer.appendChild(msgElement);
  });
}

// Send a new message
async function sendMessage(message, userId) {
  const response = await fetch(apiUrlMessages, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ message, userId }),
  });

  const newMessage = await response.json();
  displayMessages([newMessage]);
}

document.getElementById('message-form').addEventListener('submit', (e) => {
  e.preventDefault();
  const message = document.getElementById('message').value;
  const userId = 'user123'; // Replace with real user ID
  sendMessage(message, userId);
});

// Function to fetch servers
async function fetchServers() {
  const response = await fetch(apiUrlServers);
  const servers = await response.json();
  displayServers(servers);
}

// Function to display servers
function displayServers(servers) {
  const serverContainer = document.getElementById('servers');
  serverContainer.innerHTML = '';
  servers.forEach(server => {
    const serverElement = document.createElement('div');
    serverElement.textContent = server.name;
    serverContainer.appendChild(serverElement);
  });
}

fetchServers();
