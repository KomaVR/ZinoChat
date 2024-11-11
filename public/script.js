// script.js

import { auth, firestore } from './firebase-config'; // Import Firebase services

// DOM Elements
const authContainer = document.getElementById('auth-container');
const chatContainer = document.getElementById('chat-container');
const messageForm = document.getElementById('message-form');
const messagesContainer = document.getElementById('messages');
const logoutButton = document.getElementById('logout-button');
const startVoiceChatButton = document.getElementById('start-voice-chat');
const endVoiceChatButton = document.getElementById('end-voice-chat');
const emailInput = document.getElementById('email');
const passwordInput = document.getElementById('password');
const googleSignInButton = document.getElementById('google-signin-button');

// Function to toggle visibility between auth and chat
function toggleVisibility() {
  authContainer.style.display = 'none';
  chatContainer.style.display = 'block';
}

// Function to show auth page
function showAuthPage() {
  authContainer.style.display = 'block';
  chatContainer.style.display = 'none';
}

// Google Sign-In handler
async function handleGoogleSignIn() {
  const provider = new firebase.auth.GoogleAuthProvider();
  try {
    const result = await auth.signInWithPopup(provider);
    const user = result.user;
    console.log('User logged in: ', user);
    toggleVisibility();
  } catch (error) {
    console.error('Google Sign-In Error:', error.message);
    alert('Google Sign-In failed. Please try again.');
  }
}

// Sign-up/Sign-in handler
async function handleAuthSubmit(event) {
  event.preventDefault();
  const email = emailInput.value;
  const password = passwordInput.value;

  try {
    const user = auth.currentUser;
    if (user) {
      toggleVisibility();
    } else {
      await auth.signInWithEmailAndPassword(email, password);
      toggleVisibility();
    }
  } catch (error) {
    console.error('Authentication Error:', error.message);
    alert('Authentication failed. Please try again.');
  }
}

// Logout handler
async function handleLogout() {
  try {
    await auth.signOut();
    showAuthPage();
  } catch (error) {
    console.error('Logout Error:', error.message);
    alert('Failed to log out. Please try again.');
  }
}

// Fetch messages from Firestore
async function fetchMessages() {
  const snapshot = await firestore.collection('messages').orderBy('timestamp', 'asc').get();
  const messages = snapshot.docs.map(doc => doc.data());
  displayMessages(messages);
}

// Display messages in the UI
function displayMessages(messages) {
  messagesContainer.innerHTML = '';
  messages.forEach(msg => {
    const messageElement = document.createElement('div');
    messageElement.textContent = `${msg.text} - ${msg.userId}`;
    messagesContainer.appendChild(messageElement);
  });
}

// Send message to Firestore
async function sendMessage(event) {
  event.preventDefault();
  const message = document.getElementById('message').value;
  const userId = auth.currentUser ? auth.currentUser.uid : 'guest';

  try {
    const newMessage = {
      text: message,
      userId: userId,
      timestamp: new Date().toISOString(),
    };

    await firestore.collection('messages').add(newMessage);
    displayMessages([newMessage]);
  } catch (error) {
    console.error('Error sending message:', error);
  }
}

// Event listener for sending messages
messageForm.addEventListener('submit', sendMessage);

// Auth state change listener
auth.onAuthStateChanged(user => {
  if (user) {
    toggleVisibility();
    fetchMessages(); // Fetch and display messages after login
  } else {
    showAuthPage();
  }
});

// Start Voice Chat (Placeholder for Photon Voice integration)
startVoiceChatButton.addEventListener('click', () => {
  console.log('Starting Voice Chat...');
  // Photon Voice setup would go here
});

// End Voice Chat (Placeholder for Photon Voice integration)
endVoiceChatButton.addEventListener('click', () => {
  console.log('Ending Voice Chat...');
  // Photon Voice cleanup would go here
});

// Event listener for logout
logoutButton.addEventListener('click', handleLogout);

// Google sign-in button event
googleSignInButton.addEventListener('click', handleGoogleSignIn);
