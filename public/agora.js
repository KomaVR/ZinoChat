// agora.js
import AgoraRTC from 'agora-rtc-sdk-ng';

// Your Agora App ID and Token (you must replace these with your real values)
const appId = 'YOUR_AGORA_APP_ID';
const token = 'YOUR_AGORA_TOKEN';
let client, localAudioTrack, remoteAudioTrack, remoteUid;

async function startVoiceChat() {
  client = AgoraRTC.createClient({ mode: "rtc", codec: "vp8" });
  await client.join(appId, 'main-channel', token, null);  // Replace 'main-channel' with the actual channel name

  localAudioTrack = await AgoraRTC.createMicrophoneAudioTrack();
  await client.publish([localAudioTrack]);

  client.on('user-published', (user, mediaType) => {
    if (mediaType === 'audio') {
      remoteUid = user.uid;
      client.subscribe(user, mediaType);
    }
  });

  client.on('user-unpublished', (user) => {
    if (user.uid === remoteUid) {
      remoteAudioTrack.stop();
      remoteAudioTrack = null;
    }
  });
}

async function stopVoiceChat() {
  if (localAudioTrack) {
    localAudioTrack.stop();
    localAudioTrack.close();
  }

  if (remoteAudioTrack) {
    remoteAudioTrack.stop();
    remoteAudioTrack.close();
  }

  if (client) {
    await client.leave();
  }
}

export { startVoiceChat, stopVoiceChat };
