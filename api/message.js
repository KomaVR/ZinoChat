import { firestore } from '../firebase-config'; // import your Firebase config here

export default async function handler(req, res) {
  if (req.method === 'GET') {
    try {
      const snapshot = await firestore.collection('messages').orderBy('timestamp', 'asc').get();
      const messages = snapshot.docs.map(doc => doc.data());
      res.status(200).json(messages);
    } catch (error) {
      res.status(500).json({ error: 'Error fetching messages' });
    }
  } else if (req.method === 'POST') {
    try {
      const { message, userId } = req.body;
      const newMessage = {
        text: message,
        userId: userId,
        timestamp: new Date().toISOString(),
      };

      await firestore.collection('messages').add(newMessage);
      res.status(200).json(newMessage);
    } catch (error) {
      res.status(500).json({ error: 'Error sending message' });
    }
  } else {
    res.status(405).json({ error: 'Method Not Allowed' });
  }
}
