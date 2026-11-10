import { useEffect, useState } from "react";
import { ArrowLeft } from "lucide-react";
import { levelNames } from "@/data/levels";
import { useProgress, type Focus, type Settings, type ThemeChoice } from "@/lib/progress";
import { HELP_LABEL, HELP_ORDER, type Help } from "@/lib/scaffold";
import { canSpeak, englishVoices, speak } from "@/lib/speech";

function Segment<T extends string | number>({
  label,
  value,
  options,
  onChange,
}: {
  label: string;
  value: T;
  options: readonly (readonly [T, string])[];
  onChange: (value: T) => void;
}) {
  return (
    <fieldset className="mt-6">
      <legend className="text-sm font-medium text-muted">{label}</legend>
      <div className="mt-2 flex flex-wrap gap-2">
        {options.map(([id, text]) => {
          const on = id === value;
          return (
            <button
              key={String(id)}
              type="button"
              aria-pressed={on}
              onClick={() => onChange(id)}
              className={`press min-h-11 rounded-full px-4 text-sm font-medium ${
                on ? "bg-primary text-primary-fg" : "bg-surface text-fg shadow-border"
              }`}
            >
              {text}
            </button>
          );
        })}
      </div>
    </fieldset>
  );
}

function Toggle({
  label,
  hint,
  on,
  onChange,
}: {
  label: string;
  hint: string;
  on: boolean;
  onChange: (value: boolean) => void;
}) {
  return (
    <button
      type="button"
      role="switch"
      aria-checked={on}
      onClick={() => onChange(!on)}
      className="press mt-4 flex w-full items-center justify-between gap-4 rounded-2xl bg-surface px-4 py-3 text-left shadow-border"
    >
      <span>
        <span className="block font-medium">{label}</span>
        <span className="mt-0.5 block text-sm text-muted">{hint}</span>
      </span>
      <span
        aria-hidden="true"
        className={`relative h-7 w-12 shrink-0 rounded-full transition-colors ${on ? "bg-primary" : "bg-line"}`}
      >
        <span
          className={`absolute top-0.5 size-6 rounded-full bg-surface shadow-border transition-all ${on ? "left-[1.4rem]" : "left-0.5"}`}
        />
      </span>
    </button>
  );
}

export function SettingsView({ onBack }: { onBack: () => void }) {
  const { progress, setSetting, resetProgress } = useProgress();
  const s = progress.settings;
  const [voices, setVoices] = useState<SpeechSynthesisVoice[]>([]);
  const [confirmReset, setConfirmReset] = useState(false);

  useEffect(() => {
    if (!canSpeak()) return;
    const load = () => setVoices(englishVoices());
    load();
    window.speechSynthesis.addEventListener("voiceschanged", load);
    return () => window.speechSynthesis.removeEventListener("voiceschanged", load);
  }, []);

  return (
    <div className="rise">
      <button type="button" onClick={onBack} className="press inline-flex min-h-11 items-center gap-1 text-sm font-medium text-muted">
        <ArrowLeft className="size-4" />
        Back
      </button>
      <h1 className="mt-2 font-display text-4xl leading-tight">Settings</h1>
      <p className="mt-2 text-base leading-relaxed text-muted">Make the walk fit you. Everything stays on this phone.</p>

      <Segment<Focus>
        label="What should Today show?"
        value={s.focus}
        onChange={(value) => setSetting("focus", value)}
        options={[
          ["mixed", "Fab and life"],
          ["fab", "Fab only"],
          ["life", "Life only"],
        ]}
      />

      <Segment<Settings["level"]>
        label="Your level"
        value={s.level}
        onChange={(value) => setSetting("level", value)}
        options={[
          [0, "Any"],
          [1, levelNames[1]],
          [2, levelNames[2]],
          [3, levelNames[3]],
        ]}
      />

      <Segment<Help>
        label="Help while you speak"
        value={s.help}
        onChange={(value) => setSetting("help", value)}
        options={HELP_ORDER.map((id) => [id, HELP_LABEL[id]] as const)}
      />
      <p className="mt-2 text-sm text-muted">
        Script shows your whole line. Gaps hides the key words. Starter gives the first words. No help is the real thing.
      </p>

      <Segment<ThemeChoice>
        label="Look"
        value={s.theme}
        onChange={(value) => setSetting("theme", value)}
        options={[
          ["system", "Match my phone"],
          ["light", "Light"],
          ["dark", "Dark"],
        ]}
      />

      <Segment<Settings["textSize"]>
        label="Text size"
        value={s.textSize}
        onChange={(value) => setSetting("textSize", value)}
        options={[
          [0, "Normal"],
          [1, "Large"],
          [2, "Extra large"],
        ]}
      />

      <Toggle
        label="Chinese hints"
        hint="Show 繁體中文 under each phrase."
        on={s.showZh}
        onChange={(value) => setSetting("showZh", value)}
      />
      <Toggle
        label="Slower voice"
        hint="Every spoken line is played more slowly."
        on={s.slow}
        onChange={(value) => setSetting("slow", value)}
      />

      {voices.length > 1 && (
        <div className="mt-4 rounded-2xl bg-surface px-4 py-3 shadow-border">
          <label htmlFor="voice" className="block font-medium">
            Voice
          </label>
          <select
            id="voice"
            value={s.voiceURI ?? ""}
            onChange={(event) => {
              setSetting("voiceURI", event.target.value || null);
              window.setTimeout(() => speak("Let's play it by ear."), 60);
            }}
            className="mt-2 min-h-11 w-full rounded-xl bg-bg px-3 text-base"
          >
            <option value="">Automatic</option>
            {voices.map((voice) => (
              <option key={voice.voiceURI} value={voice.voiceURI}>
                {voice.name} ({voice.lang})
              </option>
            ))}
          </select>
        </div>
      )}

      <section className="mt-10 border-t border-line pt-6">
        <h2 className="font-display text-xl">Your data</h2>
        <p className="mt-1 text-sm text-muted">
          {progress.walked.length} scenes walked · {progress.pocket.length} saved lines · {Object.keys(progress.review).length} in review
        </p>
        {!confirmReset ? (
          <button type="button" onClick={() => setConfirmReset(true)} className="press mt-3 min-h-11 text-sm font-medium text-muted">
            Reset my progress…
          </button>
        ) : (
          <div className="mt-3 rounded-2xl bg-wash p-4">
            <p className="text-sm">This clears your streak, pocket and review schedule on this phone. Settings stay.</p>
            <div className="mt-3 flex gap-2">
              <button
                type="button"
                onClick={() => {
                  resetProgress();
                  setConfirmReset(false);
                }}
                className="press min-h-11 rounded-full bg-primary px-4 text-sm font-medium text-primary-fg"
              >
                Yes, reset
              </button>
              <button
                type="button"
                onClick={() => setConfirmReset(false)}
                className="press min-h-11 rounded-full bg-surface px-4 text-sm font-medium shadow-border"
              >
                Keep it
              </button>
            </div>
          </div>
        )}
      </section>
    </div>
  );
}
