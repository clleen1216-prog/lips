export function canSpeak() {
  return typeof window !== "undefined" && "speechSynthesis" in window;
}

let slowMode = false;
let preferredVoice: string | null = null;

export function configureSpeech(options: { slow: boolean; voiceURI: string | null }) {
  slowMode = options.slow;
  preferredVoice = options.voiceURI;
}

export function englishVoices(): SpeechSynthesisVoice[] {
  if (!canSpeak()) return [];
  return window.speechSynthesis.getVoices().filter((item) => item.lang.toLowerCase().startsWith("en"));
}

export function speak(text: string, rate = 0.94) {
  if (!canSpeak()) return;
  const synth = window.speechSynthesis;
  synth.cancel();
  const utterance = new SpeechSynthesisUtterance(text);
  utterance.lang = "en-US";
  utterance.rate = slowMode ? Math.min(rate, 0.78) : rate;
  const voices = synth.getVoices();
  const voice =
    (preferredVoice ? voices.find((item) => item.voiceURI === preferredVoice) : undefined) ??
    voices.find((item) => item.lang === "en-US") ??
    voices.find((item) => item.lang.toLowerCase().startsWith("en"));
  if (voice) utterance.voice = voice;
  synth.speak(utterance);
}

export function stopSpeaking() {
  if (canSpeak()) window.speechSynthesis.cancel();
}

type Rec = {
  lang: string;
  interimResults: boolean;
  continuous: boolean;
  start: () => void;
  stop: () => void;
  onresult: ((event: { results: ArrayLike<ArrayLike<{ transcript: string }>> }) => void) | null;
  onerror: (() => void) | null;
  onend: (() => void) | null;
};

function recognitionCtor(): (new () => Rec) | null {
  if (typeof window === "undefined") return null;
  const host = window as Window & {
    SpeechRecognition?: new () => Rec;
    webkitSpeechRecognition?: new () => Rec;
  };
  return host.SpeechRecognition ?? host.webkitSpeechRecognition ?? null;
}

export function canListen() {
  return recognitionCtor() !== null;
}

export function listen(onText: (text: string) => void, onEnd: () => void) {
  const Ctor = recognitionCtor();
  if (!Ctor) return null;
  const rec = new Ctor();
  rec.lang = "en-US";
  rec.interimResults = true;
  rec.continuous = false;
  rec.onresult = (event) => {
    let text = "";
    for (let i = 0; i < event.results.length; i++) text += event.results[i]?.[0]?.transcript ?? "";
    onText(text.trim());
  };
  rec.onerror = () => onEnd();
  rec.onend = () => onEnd();
  try {
    rec.start();
  } catch {
    onEnd();
    return null;
  }
  return {
    stop() {
      try {
        rec.stop();
      } catch {
        /* already stopped */
      }
    },
  };
}

export function saidIt(heard: string, target: string) {
  const norm = (value: string) =>
    value
      .toLowerCase()
      .replace(/[^a-z0-9' ]/g, " ")
      .replace(/\s+/g, " ")
      .trim();
  const spoken = norm(heard);
  const words = norm(target)
    .split(" ")
    .filter((word) => word.length > 2);
  if (!spoken || words.length === 0) return false;
  const hits = words.filter((word) => spoken.includes(word)).length;
  return hits / words.length >= 0.55;
}
