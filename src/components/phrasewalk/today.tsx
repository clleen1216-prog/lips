import { useEffect, useState } from "react";
import { ArrowRight, Check } from "lucide-react";
import { levelNames, levelOf } from "@/data/levels";
import { fabForDate, lifeForDate, stories, type Story } from "@/data/stories";
import { useProgress, ymd } from "@/lib/progress";
import { dueIds, weekDots } from "@/lib/srs";
import { InstallCard } from "./install-card";

function useClock() {
  const [now, setNow] = useState<Date | null>(null);
  useEffect(() => {
    setNow(new Date());
  }, []);
  return now;
}

function greeting(date: Date) {
  const hour = date.getHours();
  if (hour < 12) return "Good morning";
  if (hour < 17) return "Good afternoon";
  return "Good evening";
}

function Ring({ done, total }: { done: number; total: number }) {
  const radius = 34;
  const circumference = 2 * Math.PI * radius;
  const share = total === 0 ? 0 : Math.min(done / total, 1);
  return (
    <div className="relative size-20 shrink-0" role="img" aria-label={`${done} of ${total} goals done today`}>
      <svg viewBox="0 0 80 80" className="size-full -rotate-90">
        <circle cx="40" cy="40" r={radius} fill="none" stroke="var(--color-line)" strokeWidth="8" />
        <circle
          className="ring-arc"
          cx="40"
          cy="40"
          r={radius}
          fill="none"
          stroke="var(--color-primary)"
          strokeWidth="8"
          strokeLinecap="round"
          strokeDasharray={circumference}
          strokeDashoffset={circumference * (1 - share)}
        />
      </svg>
      <span className="absolute inset-0 grid place-items-center font-display text-xl tabular-nums">
        {done}/{total}
      </span>
    </div>
  );
}

function WeekStrip({ now, activity }: { now: Date; activity: string[] }) {
  const dots = weekDots(activity, now);
  return (
    <ol className="flex gap-1.5" aria-label="This week">
      {dots.map((dot) => (
        <li key={dot.day} className="flex flex-col items-center gap-1">
          <span
            className={`grid size-7 place-items-center rounded-full text-xs font-medium ${
              dot.active ? "bg-primary text-primary-fg" : dot.today ? "ring-2 ring-primary text-fg" : "bg-bg text-faint"
            }`}
            aria-label={`${dot.day}${dot.active ? ", practiced" : ""}`}
          >
            {dot.active ? <Check className="size-3.5" /> : ""}
          </span>
          <span className={`text-[0.65rem] ${dot.today ? "font-medium text-fg" : "text-faint"}`}>{dot.label}</span>
        </li>
      ))}
    </ol>
  );
}

export function Today({
  onRead,
  onPractice,
  onOpenPhrase,
  onReview,
}: {
  onRead: (storyId: string) => void;
  onPractice: (storyId: string) => void;
  onOpenPhrase: (phraseId: string) => void;
  onReview: (phraseIds: string[]) => void;
}) {
  const now = useClock();
  const { progress, ready, dismissIntro, setSetting } = useProgress();
  const { focus, level } = progress.settings;
  const floor = now && focus !== "life" ? fabForDate(now, level) : null;
  const life = now && focus !== "fab" ? lifeForDate(now, level) : null;
  const today = now ? ymd(now) : "";
  const walked = (story: Story | null) =>
    Boolean(story && now && progress.lastActive === today && progress.daily.includes(story.id));
  const shown = [floor, life].filter((story): story is Story => story !== null);
  const picked = new Set(shown.map((story) => story.id));
  const others = now
    ? stories
        .filter((story) => !picked.has(story.id))
        .filter((story) => (focus === "fab" ? story.category === "Fab" : focus === "life" ? story.category !== "Fab" : true))
        .filter((story) => level === 0 || levelOf(story.id) === level)
        .filter((story) => !progress.walked.includes(story.id))
        .slice(0, 2)
    : [];

  const due = ready && now ? dueIds(progress.review, today) : [];
  const reviewDone = progress.reviewDay === today;
  const goals = shown.length + 1;
  const done = shown.filter((story) => walked(story)).length + (reviewDone ? 1 : 0);

  const quick = () => {
    if (due.length > 0) return onReview(due.slice(0, 5));
    const shortest = [...shown].sort((a, b) => a.minutes - b.minutes)[0] ?? shown[0];
    if (shortest) onRead(shortest.id);
  };

  return (
    <div className="rise">
      <p className="text-sm text-muted">
        {now ? now.toLocaleDateString(undefined, { weekday: "long", month: "long", day: "numeric" }) : "Today"}
      </p>
      <h1 className="mt-1 font-display text-4xl leading-tight">{now ? greeting(now) : "Welcome back"}</h1>
      <p className="mt-3 max-w-sm text-base leading-relaxed text-muted">
        English for a semiconductor quality floor: intros, meetings, the tool, the customer. And for the rest of the day. Lines people say. Almost no grammar.
      </p>

      {ready && !progress.introDismissed && (
        <div className="mt-5 rounded-3xl bg-wash px-4 py-4">
          <ol className="space-y-2 text-sm leading-relaxed text-fg">
            <li>1. Walk the scene. Read it like you are in the room.</li>
            <li>2. Tap a colored line. Hear it. Keep it.</li>
            <li>3. Speak it. They talk first. You answer out loud.</li>
            <li>4. Come back for review. Lines return just before you forget them.</li>
          </ol>
          <button type="button" onClick={dismissIntro} className="press mt-3 min-h-11 text-sm font-medium text-primary">
            Got the idea
          </button>
        </div>
      )}

      <section className="mt-6 rounded-3xl bg-surface p-5 shadow-border" aria-label="Today's goals">
        <div className="flex items-center gap-4">
          <Ring done={done} total={goals} />
          <div className="min-w-0">
            <p className="font-display text-xl leading-tight">
              {!ready ? "Your day" : done >= goals ? "All done for today" : `${goals - done} to go today`}
            </p>
            <p className="mt-1 text-sm text-muted">
              {progress.streak > 0 ? `${progress.streak}-day walk` : "Start your walk today"} · {progress.known.length} lines known
            </p>
          </div>
        </div>
        {now && (
          <div className="mt-4 flex justify-between border-t border-line pt-4">
            <WeekStrip now={now} activity={progress.activity} />
            <span className="self-center text-xs text-faint">{progress.walked.length} walked</span>
          </div>
        )}
      </section>

      {ready && (
        <section className="mt-4 rounded-3xl bg-wash p-5" aria-label="Review">
          <p className="text-sm font-medium text-primary">Review</p>
          {due.length > 0 ? (
            <>
              <h2 className="mt-1 font-display text-2xl leading-tight">
                {due.length} {due.length === 1 ? "line is" : "lines are"} ready to come back
              </h2>
              <p className="mt-1 text-sm text-muted">A short round keeps them from fading.</p>
              <button
                type="button"
                onClick={() => onReview(due.slice(0, 8))}
                className="press mt-4 inline-flex min-h-12 w-full items-center justify-center gap-2 rounded-full bg-primary px-5 font-medium text-primary-fg"
              >
                Review now
                <ArrowRight className="size-4" />
              </button>
            </>
          ) : (
            <>
              <h2 className="mt-1 font-display text-2xl leading-tight">
                {Object.keys(progress.review).length === 0 ? "Nothing to review yet" : "Nothing due. Nice."}
              </h2>
              <p className="mt-1 text-sm text-muted">
                {Object.keys(progress.review).length === 0
                  ? "Speak a scene or save a line, and it joins your review schedule."
                  : "Your lines will come back when it is time."}
              </p>
            </>
          )}
        </section>
      )}

      <div className="mt-5 flex flex-wrap items-center gap-2" role="group" aria-label="What to show today">
        {(
          [
            ["mixed", "Fab + life"],
            ["fab", "Fab"],
            ["life", "Life"],
          ] as const
        ).map(([id, label]) => (
          <button
            key={id}
            type="button"
            aria-pressed={focus === id}
            onClick={() => setSetting("focus", id)}
            className={`press min-h-11 rounded-full px-4 text-sm font-medium ${
              focus === id ? "bg-primary text-primary-fg" : "bg-surface text-fg shadow-border"
            }`}
          >
            {label}
          </button>
        ))}
        <button
          type="button"
          onClick={quick}
          disabled={!now || (due.length === 0 && shown.length === 0)}
          className="press ml-auto min-h-11 rounded-full bg-bg px-4 text-sm font-medium text-primary disabled:opacity-40"
        >
          I have 5 minutes
        </button>
      </div>

      {floor ? (
        <SceneCard
          eyebrow={`On the floor · ${floor.topic} · ${levelNames[levelOf(floor.id)]}`}
          story={floor}
          walked={walked(floor)}
          known={progress.known}
          onRead={onRead}
          onPractice={onPractice}
          onOpenPhrase={onOpenPhrase}
          primary
        />
      ) : focus === "life" ? null : (
        <div className="mt-6 h-52 rounded-3xl bg-surface shadow-border" />
      )}

      {life && (
        <SceneCard
          eyebrow={`After hours · ${life.topic} · ${levelNames[levelOf(life.id)]}`}
          story={life}
          walked={walked(life)}
          known={progress.known}
          onRead={onRead}
          onPractice={onPractice}
          onOpenPhrase={onOpenPhrase}
          primary={focus === "life"}
        />
      )}

      {others.length > 0 && (
        <section className="mt-8">
          <h2 className="font-display text-xl">Another life, if you want one</h2>
          <div className="mt-3 grid gap-3">
            {others.map((story) => (
              <StoryPeek key={story.id} story={story} walked={progress.walked.includes(story.id)} onOpen={() => onRead(story.id)} />
            ))}
          </div>
        </section>
      )}

      <InstallCard />
    </div>
  );
}

function SceneCard({
  eyebrow,
  story,
  walked,
  known,
  onRead,
  onPractice,
  onOpenPhrase,
  primary = false,
}: {
  eyebrow: string;
  story: Story;
  walked: boolean;
  known: string[];
  onRead: (id: string) => void;
  onPractice: (id: string) => void;
  onOpenPhrase: (id: string) => void;
  primary?: boolean;
}) {
  return (
    <article className={`rounded-3xl bg-surface p-5 shadow-border ${primary ? "mt-6" : "mt-4"}`}>
      <p className="text-sm font-medium text-primary">{eyebrow}</p>
      <h2 className="mt-2 font-display text-3xl leading-tight">{story.title}</h2>
      <p className="mt-2 text-base leading-relaxed text-muted">{story.scene}</p>
      <p className="mt-3 text-sm text-faint">
        {story.phrases.length} lines · about {story.minutes} min
        {walked ? " · walked today" : ""}
      </p>
      {walked && (
        <ul className="mt-4 flex flex-wrap gap-2">
          {story.phrases.map((phrase) => (
            <li key={phrase.id}>
              <button
                type="button"
                onClick={() => onOpenPhrase(phrase.id)}
                className="press rounded-full bg-wash px-3 py-2 text-sm text-primary"
              >
                {phrase.text}
                {known.includes(phrase.id) && <Check className="ml-1 inline size-3.5" />}
              </button>
            </li>
          ))}
        </ul>
      )}
      <button
        type="button"
        onClick={() => onRead(story.id)}
        className={`press mt-5 inline-flex min-h-12 w-full items-center justify-center gap-2 rounded-full px-5 text-base font-medium ${
          primary ? "bg-primary text-primary-fg" : "bg-bg text-fg"
        }`}
      >
        {walked ? "Walk it again" : "Start the walk"}
        <ArrowRight className="size-4" />
      </button>
      <button
        type="button"
        onClick={() => onPractice(story.id)}
        className="press mt-2 inline-flex min-h-12 w-full items-center justify-center rounded-full text-sm font-medium text-muted"
      >
        Speak the scene
      </button>
    </article>
  );
}

function StoryPeek({ story, walked, onOpen }: { story: Story; walked: boolean; onOpen: () => void }) {
  return (
    <button type="button" onClick={onOpen} className="press rounded-2xl bg-surface px-4 py-4 text-left shadow-border">
      <span className="text-sm text-primary">{story.category}</span>
      <span className="mt-1 block font-display text-xl leading-tight">{story.title}</span>
      <span className="mt-1 block text-sm leading-snug text-muted">{story.scene}</span>
      {walked && <span className="mt-2 block text-xs font-medium text-faint">Walked</span>}
    </button>
  );
}
