// app.js

const messageForm = document.getElementById('messageForm');
const messagesList = document.getElementById('messagesList');

// Simple sentiment analyzer (keyword-based)
function analyzeSentiment(message) {
  const negativeWords = ['bad', 'terrible', 'worst', 'angry', 'upset', 'hate', 'slow'];
  const positiveWords = ['good', 'great', 'excellent', 'happy', 'love', 'fast', 'awesome'];

  const msg = message.toLowerCase();
  let score = 0;

  positiveWords.forEach(word => {
    if (msg.includes(word)) score++;
  });

  negativeWords.forEach(word => {
    if (msg.includes(word)) score--;
  });

  if (score > 0) return 'positive';
  if (score < 0) return 'negative';
  return 'neutral';
}

// Add message to Firestore
messageForm.addEventListener('submit', async (e) => {
  e.preventDefault();
  const message = document.getElementById('customerMessage').value.trim();
  if (!message) return;

  const sentiment = analyzeSentiment(message);

  await db.collection('messages').add({
    text: message,
    sentiment: sentiment,
    timestamp: firebase.firestore.FieldValue.serverTimestamp()
  });

  messageForm.reset();
});

// Listen to new messages in Firestore
db.collection('messages')
  .orderBy('timestamp', 'desc')
  .onSnapshot(snapshot => {
    messagesList.innerHTML = '';
    snapshot.forEach(doc => {
      const data = doc.data();
      const div = document.createElement('div');
      div.className = `message ${data.sentiment}`;
      div.innerHTML = `
        <p>${data.text}</p>
        <small>Sentiment: <strong>${data.sentiment.toUpperCase()}</strong></small>
      `;
      messagesList.appendChild(div);
    });
  });
