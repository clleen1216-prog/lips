import { useEffect, useState } from "react";
import { ArrowRight, Check } from "lucide-react";
import { fabForDate, lifeForDate, stories, type Story } from "@/data/stories";
import { useProgress, ymd } from "@/lib/progress";
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

export function Today({
  onRead,
  onPractice,
  onOpenPhrase,
}: {
  onRead: (storyId: string) => void;
  onPractice: (storyId: string) => void;
  onOpenPhrase: (phraseId: string) => void;
}) {
  const now = useClock();
  const { progress, ready, dismissIntro } = useProgress();
  const floor = now ? fabForDate(now) : null;
  const life = now ? lifeForDate(now) : null;
  const walked = (story: Story | null) =>
    Boolean(story && now && progress.lastActive === ymd(now) && progress.daily.includes(story.id));
  const others = life ? stories.filter((story) => story.category !== "Fab" && story.id !== life.id).slice(0, 2) : [];

  return (
    <div className="rise">
      <p className="text-sm text-muted">
        {now ? now.toLocaleDateString(undefined, { weekday: "long", month: "long", day: "numeric" }) : "Today"}
      </p>
      <h1 className="mt-1 font-display text-4xl leading-tight">{now ? greeting(now) : "Welcome back"}</h1>
      <p className="mt-3 max-w-sm text-base leading-relaxed text-muted">
        English for a semiconductor quality floor — intros, meetings, the tool, the customer — and for the rest of the day. Lines people say. Almost no grammar.
      </p>

      {ready && !progress.introDismissed && (
        <div className="mt-5 rounded-3xl bg-wash px-4 py-4">
          <ol className="space-y-2 text-sm leading-relaxed text-fg">
            <li>1. Walk the scene. Read it like you are in the room.</li>
            <li>2. Tap a colored line. Hear it. Keep it.</li>
            <li>3. Speak it. They talk first. You answer out loud.</li>
          </ol>
          <button type="button" onClick={dismissIntro} className="press mt-3 text-sm font-medium text-primary">
            Got the idea
          </button>
        </div>
      )}

      {floor ? (
        <SceneCard
          eyebrow={`On the floor · ${floor.topic}`}
          story={floor}
          walked={walked(floor)}
          known={progress.known}
          onRead={onRead}
          onPractice={onPractice}
          onOpenPhrase={onOpenPhrase}
          primary
        />
      ) : (
        <div className="mt-6 h-52 rounded-3xl bg-surface shadow-border" />
      )}

      {life && (
        <SceneCard
          eyebrow={`After hours · ${life.topic}`}
          story={life}
          walked={walked(life)}
          known={progress.known}
          onRead={onRead}
          onPractice={onPractice}
          onOpenPhrase={onOpenPhrase}
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
