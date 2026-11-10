import { useEffect, useMemo, useState } from "react";
import { ArrowLeft, ChevronDown, ChevronUp, Eye, Mic, Volume2 } from "lucide-react";
import { findPhrase, partnerOf, storyById, turnsFor } from "@/data/stories";
import { zhFor } from "@/data/zh";
import { useProgress } from "@/lib/progress";
import { backchannel, HELP_LABEL, HELP_ORDER, maskLine, starterLine, type Help } from "@/lib/scaffold";
import { canListen, canSpeak, listen, saidIt, speak, stopSpeaking } from "@/lib/speech";
import { Celebrate } from "./celebrate";

type Outcome = { id: string; ok: boolean };

function HelpPicker({ value, onChange }: { value: Help; onChange: (help: Help) => void }) {
  return (
    <div className="mt-4" role="group" aria-label="How much help do you want?">
      <p className="text-xs font-medium text-muted">Help for your line</p>
      <div className="mt-1.5 flex flex-wrap gap-2">
        {HELP_ORDER.map((id) => (
          <button
            key={id}
            type="button"
            aria-pressed={value === id}
            onClick={() => onChange(id)}
            className={`press min-h-10 rounded-full px-3.5 text-xs font-medium ${
              value === id ? "bg-fg text-bg" : "bg-surface text-muted shadow-border"
            }`}
          >
            {HELP_LABEL[id]}
          </button>
        ))}
      </div>
    </div>
  );
}

/** Your line, shown with the amount of support the learner picked. */
function Scaffold({
  help,
  line,
  phraseText,
  zh,
  showZh,
}: {
  help: Help;
  line: string;
  phraseText: string;
  zh?: string;
  showZh: boolean;
}) {
  const [revealed, setRevealed] = useState<number[]>([]);
  const segments = useMemo(() => maskLine(line, phraseText), [line, phraseText]);

  if (help === "none") return null;

  if (help === "starter") {
    return (
      <div className="mt-3 rounded-2xl bg-wash px-4 py-3">
        <p className="text-xs font-medium text-muted">Start like this</p>
        <p className="mt-1 font-display text-2xl leading-snug">{starterLine(line)}</p>
      </div>
    );
  }

  if (help === "gaps") {
    return (
      <div className="mt-3 rounded-2xl bg-wash px-4 py-3">
        <p className="text-xs font-medium text-muted">Fill the gaps. Tap a gap to see the word.</p>
        <p className="mt-1 font-display text-2xl leading-snug">
          {segments.map((segment, index) =>
            segment.hidden && !revealed.includes(index) ? (
              <button
                key={index}
                type="button"
                onClick={() => setRevealed((current) => [...current, index])}
                className="press mr-1.5 inline rounded-md bg-surface px-1 text-primary shadow-border"
                aria-label="Hidden word. Tap to reveal."
              >
                {segment.text}
              </button>
            ) : (
              <span key={index} className={`mr-1.5 ${segment.hidden ? "text-primary" : ""}`}>
                {segment.full}
              </span>
            ),
          )}
        </p>
        {showZh && zh && <p className="mt-2 text-sm text-muted">{zh}</p>}
      </div>
    );
  }

  return (
    <div className="mt-3 rounded-2xl bg-wash px-4 py-3">
      <p className="text-xs font-medium text-muted">Say this</p>
      <p className="mt-1 font-display text-2xl leading-snug">{line}</p>
      {showZh && zh && <p className="mt-2 text-sm text-muted">{zh}</p>}
    </div>
  );
}

export function Practice({
  storyId,
  onBack,
  onRead,
  onPocket,
  onCheck,
}: {
  storyId: string;
  onBack: () => void;
  onRead: () => void;
  onPocket: (phraseId: string) => void;
  onCheck: (phraseIds: string[]) => void;
}) {
  const story = storyById(storyId);
  const turns = useMemo(() => (story ? turnsFor(story) : []), [story]);
  const [started, setStarted] = useState(false);
  const [preview, setPreview] = useState(false);
  const [peek, setPeek] = useState(false);
  const [index, setIndex] = useState(0);
  const [showLine, setShowLine] = useState(false);
  const [heard, setHeard] = useState("");
  const [listening, setListening] = useState(false);
  const [hit, setHit] = useState<boolean | null>(null);
  const [outcomes, setOutcomes] = useState<Outcome[]>([]);
  const [done, setDone] = useState(false);
  const [micOk, setMicOk] = useState(false);
  const [micChecked, setMicChecked] = useState(false);
  const { markWalked, togglePocket, progress, gradeReview, seedReview, setSetting } = useProgress();
  const help = progress.settings.help;

  const turn = turns[index];
  const lead = turn?.partner ? backchannel(index) : "";

  useEffect(() => {
    setMicOk(canListen());
    setMicChecked(true);
  }, []);

  useEffect(() => {
    if (!started || !turn?.partner) return;
    const spoken = `${lead} ${turn.partner}`.trim();
    const timer = window.setTimeout(() => speak(spoken), 280);
    return () => {
      window.clearTimeout(timer);
      stopSpeaking();
    };
  }, [started, turn, lead]);

  if (!story) return null;

  const partnerName = partnerOf(story);
  const hits = outcomes.filter((item) => item.ok).length;

  if (!started) {
    return (
      <div className="rise">
        <button type="button" onClick={onBack} className="press inline-flex min-h-11 items-center gap-1 text-sm font-medium text-muted">
          <ArrowLeft className="size-4" />
          {story.title}
        </button>
        <p className="mt-3 text-sm font-medium text-primary">Speak it</p>
        <h1 className="mt-1 font-display text-4xl leading-tight">{story.topic}</h1>
        <p className="mt-3 text-lg leading-relaxed text-muted">{story.scene}</p>
        <p className="mt-3 text-base text-muted">
          {partnerName ? `${partnerName} speaks first. ` : ""}
          {turns.length} turns. Your lines come with help you can turn up or down.
        </p>

        <HelpPicker value={help} onChange={(value) => setSetting("help", value)} />

        <button
          type="button"
          onClick={() => setPreview((value) => !value)}
          aria-expanded={preview}
          className="press mt-5 inline-flex min-h-11 items-center gap-2 text-sm font-medium text-primary"
        >
          <Eye className="size-4" />
          {preview ? "Hide the conversation" : "Read the whole conversation first"}
          {preview ? <ChevronUp className="size-4" /> : <ChevronDown className="size-4" />}
        </button>

        {preview && (
          <ol className="mt-2 space-y-2" aria-label="The whole conversation">
            {turns.map((item) => (
              <li key={item.id} className="space-y-1.5">
                {item.partner && (
                  <p className="max-w-[88%] rounded-2xl rounded-bl-md bg-surface px-4 py-2.5 text-base shadow-border">{item.partner}</p>
                )}
                <p className="ml-auto max-w-[88%] rounded-2xl rounded-br-md bg-primary px-4 py-2.5 text-base text-primary-fg">
                  {item.you}
                </p>
              </li>
            ))}
          </ol>
        )}

        <button
          type="button"
          onClick={() => setStarted(true)}
          className="press mt-6 inline-flex min-h-14 w-full items-center justify-center rounded-full bg-primary text-base font-medium text-primary-fg"
        >
          Start the conversation
        </button>
      </div>
    );
  }

  if (done || !turn) {
    return (
      <Result
        title={story.title}
        hits={hits}
        total={turns.length}
        usedMic={micOk}
        help={help}
        missed={outcomes.filter((item) => !item.ok).map((item) => item.id)}
        phraseIds={turns.map((item) => item.phraseId)}
        onAgain={(lessHelp) => {
          if (lessHelp) {
            const next = HELP_ORDER[Math.min(HELP_ORDER.indexOf(help) + 1, HELP_ORDER.length - 1)];
            if (next) setSetting("help", next);
          }
          setIndex(0);
          setShowLine(false);
          setHeard("");
          setHit(null);
          setOutcomes([]);
          setPeek(false);
          setDone(false);
        }}
        onRead={onRead}
        onBack={onBack}
        onPocket={onPocket}
        onCheck={onCheck}
        saved={progress.pocket}
        togglePocket={togglePocket}
      />
    );
  }

  const reveal = (matched: boolean | null) => {
    setShowLine(true);
    setListening(false);
    setHit(matched);
  };

  const startMic = () => {
    setHeard("");
    setHit(null);
    setListening(true);
    const handle = listen(
      (text) => setHeard(text),
      () => setListening(false),
    );
    if (!handle) {
      setListening(false);
      setMicOk(false);
      return;
    }
    window.setTimeout(() => {
      handle.stop();
    }, 7000);
  };

  const checkSpoken = () => {
    const phrase = story.phrases.find((item) => item.id === turn.phraseId);
    reveal(saidIt(heard, phrase?.text ?? turn.you));
  };

  const advance = (ok: boolean) => {
    stopSpeaking();
    const next = [...outcomes, { id: turn.phraseId, ok }];
    setOutcomes(next);
    if (index + 1 >= turns.length) {
      markWalked(story.id);
      seedReview(turns.map((item) => item.phraseId));
      gradeReview(next);
      setDone(true);
    } else {
      setIndex((value) => value + 1);
      setShowLine(false);
      setHeard("");
      setHit(null);
      setListening(false);
      setPeek(false);
    }
  };

  const phrase = story.phrases.find((item) => item.id === turn.phraseId);
  const zh = zhFor(turn.phraseId);
  const upcoming = turns[index + 1]?.partner;

  return (
    <div>
      <button type="button" onClick={onBack} className="press inline-flex min-h-11 items-center gap-1 text-sm font-medium text-muted">
        <ArrowLeft className="size-4" />
        {story.title}
      </button>
      <p className="mt-4 text-sm text-muted">
        Speak it · {index + 1} of {turns.length}
        {partnerName ? ` · with ${partnerName}` : ""}
      </p>
      <div className="mt-2 flex gap-1.5" aria-hidden="true">
        {turns.map((item, itemIndex) => (
          <span key={item.id} className={`h-1 flex-1 rounded-full ${itemIndex <= index ? "bg-primary" : "bg-line"}`} />
        ))}
      </div>

      {turn.partner ? (
        <div className="mt-6 rounded-3xl rounded-bl-md bg-surface p-5 shadow-border">
          <p className="text-sm font-medium text-muted">{partnerName ?? "Them"}</p>
          {lead && <p className="mt-2 text-base italic text-muted">{lead}</p>}
          <p className="mt-1 font-display text-2xl leading-snug">{turn.partner}</p>
          {canSpeak() && (
            <button
              type="button"
              onClick={() => speak(`${lead} ${turn.partner}`.trim())}
              className="press mt-3 inline-flex min-h-10 items-center gap-2 text-sm font-medium text-primary"
            >
              <Volume2 className="size-4" />
              Hear them again
            </button>
          )}
        </div>
      ) : (
        <p className="mt-6 rounded-2xl bg-wash px-4 py-3 text-sm text-muted">You speak first this time.</p>
      )}

      <p className="mt-6 text-sm font-medium text-primary">Your turn</p>
      <h1 className="mt-1 font-display text-3xl leading-tight">{turn.cue}</h1>

      {!showLine && (
        <>
          <Scaffold
            key={turn.id}
            help={help}
            line={turn.you}
            phraseText={phrase?.text ?? ""}
            zh={zh}
            showZh={progress.settings.showZh}
          />
          {help !== "none" && canSpeak() && (
            <button
              type="button"
              onClick={() => speak(turn.you)}
              className="press mt-2 inline-flex min-h-11 items-center gap-2 text-sm font-medium text-primary"
            >
              <Volume2 className="size-4" />
              Hear the model first
            </button>
          )}
          <HelpPicker value={help} onChange={(value) => setSetting("help", value)} />

          <div className="mt-5 grid gap-3">
            {micOk && (
              <>
                <button
                  type="button"
                  onClick={listening ? undefined : startMic}
                  className="press inline-flex min-h-14 w-full items-center justify-center gap-2 rounded-full bg-primary px-5 text-base font-medium text-primary-fg"
                >
                  <Mic className="size-5" />
                  {listening ? "Listening…" : "Say your line"}
                </button>
                {heard && <p className="rounded-2xl bg-wash px-4 py-3 text-base leading-snug text-fg">“{heard}”</p>}
                {heard && !listening && (
                  <button
                    type="button"
                    onClick={checkSpoken}
                    className="press inline-flex min-h-12 w-full items-center justify-center rounded-full bg-surface font-medium shadow-border"
                  >
                    Use what I said
                  </button>
                )}
              </>
            )}
            {micChecked && !micOk && (
              <p className="rounded-2xl bg-wash px-4 py-3 text-sm leading-snug text-fg">
                This browser can't listen, so you will check yourself. Say your line out loud first, then peek.
              </p>
            )}
            <button
              type="button"
              onClick={() => reveal(null)}
              className="press inline-flex min-h-12 w-full items-center justify-center rounded-full bg-surface text-sm font-medium text-fg shadow-border"
            >
              {micOk ? "Show me the line" : "I said it. Show me the line"}
            </button>
          </div>
        </>
      )}

      {upcoming && (
        <div className="mt-5">
          <button
            type="button"
            onClick={() => setPeek((value) => !value)}
            aria-expanded={peek}
            className="press inline-flex min-h-11 items-center gap-2 text-sm font-medium text-muted"
          >
            <Eye className="size-4" />
            {peek ? "Hide what's next" : "Peek at what they say next"}
          </button>
          {peek && (
            <p className="rise mt-1 rounded-2xl bg-wash px-4 py-3 text-base leading-snug text-fg">
              Next, {partnerName ? `${partnerName} might say` : "they might say"}: “{upcoming}”
            </p>
          )}
        </div>
      )}

      {showLine && (
        <div className="rise mt-5 rounded-3xl bg-surface p-5 shadow-border">
          <p className="text-sm font-medium text-primary">
            {hit === true ? "They'd follow you." : hit === false ? "Close. This is the shape people use." : "Say it like this."}
          </p>
          <p className="mt-2 font-display text-2xl leading-snug">{turn.you}</p>
          {progress.settings.showZh && zh && <p className="mt-2 text-sm text-muted">{zh}</p>}
          {canSpeak() && (
            <div className="mt-3 flex flex-wrap gap-2">
              <button
                type="button"
                onClick={() => speak(turn.you)}
                className="press inline-flex min-h-11 items-center gap-2 rounded-full bg-wash px-4 text-sm font-medium text-primary"
              >
                <Volume2 className="size-4" />
                Hear it
              </button>
              <button
                type="button"
                onClick={() => speak(turn.you, 0.78)}
                className="press inline-flex min-h-11 items-center rounded-full bg-wash px-4 text-sm font-medium text-primary"
              >
                Slower
              </button>
            </div>
          )}
          {micOk ? (
            <button
              type="button"
              onClick={() => advance(hit !== false)}
              className="press mt-4 inline-flex min-h-12 w-full items-center justify-center rounded-full bg-primary font-medium text-primary-fg"
            >
              {index + 1 >= turns.length ? "Finish the conversation" : "I said it"}
            </button>
          ) : (
            <div className="mt-4 grid grid-cols-2 gap-2">
              <button
                type="button"
                onClick={() => advance(true)}
                className="press inline-flex min-h-12 items-center justify-center rounded-full bg-primary text-sm font-medium text-primary-fg"
              >
                Nailed it
              </button>
              <button
                type="button"
                onClick={() => advance(false)}
                className="press inline-flex min-h-12 items-center justify-center rounded-full bg-bg text-sm font-medium text-fg"
              >
                Still shaky
              </button>
            </div>
          )}
        </div>
      )}
    </div>
  );
}

function Result({
  title,
  hits,
  total,
  usedMic,
  help,
  missed,
  onAgain,
  onRead,
  onBack,
  onPocket,
  onCheck,
  saved,
  togglePocket,
  phraseIds,
}: {
  title: string;
  hits: number;
  total: number;
  usedMic: boolean;
  help: Help;
  missed: string[];
  phraseIds: string[];
  onAgain: (lessHelp: boolean) => void;
  onRead: () => void;
  onBack: () => void;
  onPocket: (id: string) => void;
  onCheck: (ids: string[]) => void;
  saved: string[];
  togglePocket: (id: string) => void;
}) {
  const perfect = hits === total;
  const canStepDown = help !== "none";
  const next = HELP_ORDER[Math.min(HELP_ORDER.indexOf(help) + 1, HELP_ORDER.length - 1)];
  const line = perfect
    ? usedMic
      ? "You'd survive that room."
      : "Every line felt solid. Say them once more tomorrow. They get shorter in your mouth."
    : `${hits} of ${total} felt solid. You still said the rest out loud. That's the method. The shaky ones will come back in your review.`;

  return (
    <div className="rise relative">
      {perfect && <Celebrate />}
      <p className="text-sm font-medium text-primary">{title}</p>
      <h1 className="mt-2 font-display text-4xl leading-tight">
        {hits} of {total}
      </h1>
      <p className="mt-3 text-lg leading-relaxed text-muted">{line}</p>
      {missed.length > 0 && (
        <button
          type="button"
          onClick={() => onCheck(missed)}
          className="press mt-5 inline-flex min-h-12 w-full items-center justify-center rounded-full bg-primary font-medium text-primary-fg"
        >
          Check the {missed.length} shaky {missed.length === 1 ? "line" : "lines"}
        </button>
      )}
      {perfect && canStepDown && next && (
        <button
          type="button"
          onClick={() => onAgain(true)}
          className="press mt-5 inline-flex min-h-12 w-full items-center justify-center rounded-full bg-primary font-medium text-primary-fg"
        >
          Try it again with less help ({HELP_LABEL[next]})
        </button>
      )}
      <ul className="mt-6 space-y-2">
        {phraseIds.map((id) => {
          const found = findPhrase(id);
          if (!found) return null;
          const shaky = missed.includes(id);
          return (
            <li key={id} className="rounded-2xl bg-surface p-4 shadow-border">
              <button type="button" onClick={() => onPocket(id)} className="text-left">
                <span className="block font-medium text-primary">
                  {found.phrase.text}
                  {shaky && <span className="ml-2 text-xs font-medium text-muted">shaky</span>}
                </span>
                <span className="mt-1 block text-sm text-muted">{found.phrase.reply}</span>
              </button>
              <button type="button" onClick={() => togglePocket(id)} className="press mt-3 text-sm font-medium text-fg">
                {saved.includes(id) ? "In your pocket" : "Pocket this line"}
              </button>
            </li>
          );
        })}
      </ul>
      <button
        type="button"
        onClick={() => onAgain(false)}
        className={`press mt-6 inline-flex min-h-12 w-full items-center justify-center rounded-full font-medium ${
          missed.length > 0 ? "bg-surface text-fg shadow-border" : "bg-bg text-fg"
        }`}
      >
        Speak it again
      </button>
      <button
        type="button"
        onClick={onRead}
        className="press mt-2 inline-flex min-h-12 w-full items-center justify-center rounded-full text-sm font-medium text-fg"
      >
        Read the scene again
      </button>
      <button type="button" onClick={onBack} className="press mt-1 inline-flex min-h-11 w-full items-center justify-center text-sm text-muted">
        Back to today
      </button>
    </div>
  );
}
