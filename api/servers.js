import { firestore } from '../firebase-config'; // import your Firebase config here

export default async function handler(req, res) {
  if (req.method === 'GET') {
    try {
      const snapshot = await firestore.collection('servers').get();
      const servers = snapshot.docs.map(doc => doc.data());
      res.status(200).json(servers);
    } catch (error) {
      res.status(500).json({ error: 'Error fetching servers' });
    }
  } else if (req.method === 'POST') {
    try {
      const { serverName, createdBy } = req.body;
      const newServer = {
        name: serverName,
        createdBy: createdBy,
        timestamp: new Date().toISOString(),
      };

      const serverRef = await firestore.collection('servers').add(newServer);
      res.status(200).json({ id: serverRef.id, ...newServer });
    } catch (error) {
      res.status(500).json({ error: 'Error creating server' });
    }
  } else {
    res.status(405).json({ error: 'Method Not Allowed' });
  }
}
