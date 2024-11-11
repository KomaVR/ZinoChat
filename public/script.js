// script.js
import { auth } from './firebase-config.js';
import { startVoiceChat, stopVoiceChat } from './agora.js';

const googleSignInButton = document.getElementById('google-signin-button');
const chatContainer = document.getElementById('chat-container');
const authContainer = document.getElementById('auth-container');
const messageInput = document.getElementById('message-input');
const sendMessageButton = document.getElementById('send-message-button');
const messagesContainer = document.getElementById('messages-container');
const startVoiceChatButton = document.getElementById('start-voice-chat');
const stopVoiceChatButton = document.getElementById('stop-voice-chat');

// Google Sign-In Handler
googleSignInButton.addEventListener('click', async () => {
  const provider = new firebase.auth.GoogleAuthProvider();
  try {
    const result = await auth.signInWithPopup(provider);
    console.log('User logged in:', result.user);
    authContainer.style.display = 'none';
    chatContainer.style.display = 'block';
  } catch (error) {
    console.error('Google Sign-In Error:', error);
    alert('Google Sign-In failed. Please try again.');
  }
});

// Send Message Handler
sendMessageButton.addEventListener('click', async () => {
  const message = messageInput.value;
  if (message.trim()) {
    const messageRef = firestore.collection('messages').doc();
    await messageRef.set({
      text: message,
      timestamp: firebase.firestore.FieldValue.serverTimestamp(),
    });

    messageInput.value = ''; // Clear input field
  }
});

// Fetch messages from Firestore
firestore.collection('messages').orderBy('timestamp', 'asc').onSnapshot(snapshot => {
  messagesContainer.innerHTML = ''; // Clear previous messages
  snapshot.forEach(doc => {
    const message = doc.data();
    const messageDiv = document.createElement('div');
    messageDiv.textContent = message.text;
    messagesContainer.appendChild(messageDiv);
  });
});

// Voice Chat Handlers
startVoiceChatButton.addEventListener('click', startVoiceChat);
stopVoiceChatButton.addEventListener('click', stopVoiceChat);

