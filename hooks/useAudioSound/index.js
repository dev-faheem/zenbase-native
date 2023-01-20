import { Audio } from "expo-av";

let audio = new Audio.Sound();

export default function useAudioSound(audioUrl) {
  const playAudio = async (data) => {
    try {
      await audio.unloadAsync();
      await audio.loadAsync({
        uri: audioUrl,
      });
      await audio.playAsync();

      console.log({ audioUrl });

      // alert("***qwererwr" + audioUrl);

      // await audio.setVolumeAsync(previousVolumeRef.current);
      // await audio.setVolumeAsync(1.0);
    } catch (e) {
      console.log({ e });
      // alert("Something went wrong!");
      // navigation.goBack();
    }
  };
  const resumeAudio = async () => {
    await audio.playAsync();
    // alert("Resume");
  };

  const pauseAudio = async (data) => {
    await audio.pauseAsync();
    // alert("Pause");
  };

  const exitAudio = async (data) => {
    await audio.stopAsync();
    await audio.unloadAsync();

    // alert("exit");
  };

  return { playAudio, pauseAudio, resumeAudio, exitAudio };
}
