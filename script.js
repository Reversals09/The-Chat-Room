// Firebase configuration
var firebaseConfig = {
    apiKey: "YOUR_API_KEY",
    authDomain: "YOUR_AUTH_DOMAIN",
    projectId: "YOUR_PROJECT_ID",
    storageBucket: "YOUR_STORAGE_BUCKET",
    messagingSenderId: "YOUR_MESSAGING_SENDER_ID",
    appId: "YOUR_APP_ID"
};

// Initialize Firebase
firebase.initializeApp(firebaseConfig);
const db = firebase.firestore();

let password = "Reversals@09";
let username;

function checkPassword() {
    let enteredPassword = document.getElementById("passwordInput").value;
    if (enteredPassword === password) {
        document.getElementById("passwordPage").style.display = "none";
        document.getElementById("namePage").style.display = "block";
    } else {
        alert("Incorrect password!");
    }
}

function enterChat() {
    username = document.getElementById("nameInput").value;
    if (username) {
        document.getElementById("namePage").style.display = "none";
        document.getElementById("chatRoom").style.display = "block";
        loadMessages();
    } else {
        alert("Please enter your name!");
    }
}

function sendMessage() {
    let message = document.getElementById("messageInput").value;
    if (message) {
        db.collection("messages").add({
            name: username,
            message: message,
            timestamp: firebase.firestore.FieldValue.serverTimestamp()
        });
        document.getElementById("messageInput").value = "";
    }
}

function loadMessages() {
    db.collection("messages").orderBy("timestamp")
        .onSnapshot(function(snapshot) {
            let chatDisplay = document.getElementById("chatDisplay");
            chatDisplay.innerHTML = "";
            snapshot.forEach(function(doc) {
                let messageData = doc.data();
                chatDisplay.innerHTML += `<div><strong>${messageData.name}:</strong> ${messageData.message}</div>`;
            });
            chatDisplay.scrollTop = chatDisplay.scrollHeight;
        });
}
