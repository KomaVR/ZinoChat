// agora.js
import AgoraRTC from 'agora-rtc-sdk-ng';

const client = AgoraRTC.createClient({ mode: 'rtc', codec: 'vp8' });
const appId = 'YOUR_AGORA_APP_ID';  // Replace with your Agora App ID
const token = null;  // Optional: if using a token, generate it from the Agora console
const channel = 'test_channel';  // Replace with the desired channel

let localAudioTrack = null;
let localVideoTrack = null;

const startVoiceChat = async () => {
  try {
    await client.join(appId, channel, token, null);

    localAudioTrack = await AgoraRTC.createMicrophoneAudioTrack();
    localVideoTrack = await AgoraRTC.createCameraVideoTrack();

    const localPlayerContainer = document.createElement('div');
    localPlayerContainer.id = 'local-player';
    document.getElementById('voice-chat-container').appendChild(localPlayerContainer);

    localAudioTrack.play(localPlayerContainer);
    localVideoTrack.play(localPlayerContainer);

    await client.publish([localAudioTrack, localVideoTrack]);
    console.log('Voice chat started!');
  } catch (error) {
    console.error('Error starting voice chat:', error);
  }
};

const stopVoiceChat = async () => {
  try {
    if (localAudioTrack) {
      localAudioTrack.stop();
      localAudioTrack.close();
    }
    if (localVideoTrack) {
      localVideoTrack.stop();
      localVideoTrack.close();
    }
    await client.leave();
    console.log('Voice chat stopped!');
  } catch (error) {
    console.error('Error stopping voice chat:', error);
  }
};

export { startVoiceChat, stopVoiceChat };
