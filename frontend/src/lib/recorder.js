import { useRef, useState } from "react";

export function useRecorder() {
  const [recording, setRecording] = useState(false);
  const mrRef = useRef(null);
  const chunksRef = useRef([]);
  const streamRef = useRef(null);

  const start = async () => {
    const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
    streamRef.current = stream;
    const mr = new MediaRecorder(stream);
    chunksRef.current = [];
    mr.ondataavailable = (e) => {
      if (e.data.size > 0) chunksRef.current.push(e.data);
    };
    mr.start();
    mrRef.current = mr;
    setRecording(true);
  };

  const stop = () =>
    new Promise((resolve) => {
      const mr = mrRef.current;
      if (!mr) return resolve(null);
      mr.onstop = () => {
        const blob = new Blob(chunksRef.current, { type: "audio/webm" });
        streamRef.current?.getTracks().forEach((t) => t.stop());
        setRecording(false);
        resolve(blob);
      };
      mr.stop();
    });

  return { recording, start, stop };
}

export function playAudioB64(b64) {
  if (!b64) return;
  const audio = new Audio(`data:audio/mp3;base64,${b64}`);
  audio.play().catch(() => {});
  return audio;
}
