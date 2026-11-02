import { useEffect, useState } from "react";
import { Bookmark, Compass, Library, MessageCircle } from "lucide-react";
import { fabForDate, findPhrase } from "@/data/stories";
import { ProgressProvider, useProgress } from "@/lib/progress";
import { Library as StoryLibrary } from "./library";
import { PhraseSheet } from "./sheet";
import { Pocket } from "./pocket";
import { Practice } from "./practice";
import { Reader } from "./reader";
import { Today } from "./today";

type Tab = "today" | "library" | "practice" | "pocket";

type View =
  | { name: "today" }
  | { name: "library" }
  | { name: "pocket" }
  | { name: "read"; storyId: string; from: Tab }
  | { name: "practice"; storyId: string; from: Tab };

const nav: { id: Tab; label: string; icon: typeof Compass }[] = [
  { id: "today", label: "Today", icon: Compass },
  { id: "library", label: "Stories", icon: Library },
  { id: "practice", label: "Say it", icon: MessageCircle },
  { id: "pocket", label: "Pocket", icon: Bookmark },
];

function activeTab(view: View): Tab {
  if (view.name === "practice") return "practice";
  if (view.name === "read") return view.from === "practice" ? "today" : view.from;
  return view.name;
}

export function PhrasewalkApp() {
  return (
    <ProgressProvider>
      <Shell />
    </ProgressProvider>
  );
}

function Shell() {
  const { progress, ready, rememberStory } = useProgress();
  const [view, setView] = useState<View>({ name: "today" });
  const [phraseId, setPhraseId] = useState<string | null>(null);
  const [todayId, setTodayId] = useState<string | null>(null);

  useEffect(() => {
    setTodayId(fabForDate(new Date()).id);
  }, []);

  const openStory = (storyId: string, from: Tab) => {
    if (!storyId) {
      setView({ name: "today" });
      window.scrollTo({ top: 0 });
      return;
    }
    rememberStory(storyId);
    setView({ name: "read", storyId, from });
    window.scrollTo({ top: 0 });
  };

  const openPractice = (storyId: string, from: Tab) => {
    rememberStory(storyId);
    setView({ name: "practice", storyId, from });
    window.scrollTo({ top: 0 });
  };

  const goTab = (tab: Tab) => {
    if (tab === "practice") {
      const storyId = progress.lastStoryId ?? todayId;
      if (!storyId) return;
      openPractice(storyId, "today");
      return;
    }
    if (tab === "today") setView({ name: "today" });
    else if (tab === "library") setView({ name: "library" });
    else setView({ name: "pocket" });
    window.scrollTo({ top: 0 });
  };

  const phrase = phraseId ? findPhrase(phraseId) : undefined;
  const streakLabel = !ready
    ? "Your walk"
    : progress.streak === 0
      ? "Start a streak"
      : progress.streak === 1
        ? "1-day walk"
        : `${progress.streak}-day walk`;
  const active = activeTab(view);

  return (
    <div className="min-h-dvh bg-bg text-fg">
      <div className="mx-auto flex min-h-dvh w-full max-w-lg flex-col">
        <header className="flex items-baseline justify-between px-5 pt-6">
          <p className="font-display text-xl tracking-tight">Phrasewalk</p>
          <p className="text-sm tabular-nums text-muted">{streakLabel}</p>
        </header>
        <main className="dock-clear flex-1 px-5 pt-6">
          {view.name === "today" && (
            <Today
              onRead={(id) => openStory(id, "today")}
              onPractice={(id) => openPractice(id, "today")}
              onOpenPhrase={setPhraseId}
            />
          )}
          {view.name === "library" && <StoryLibrary todayId={todayId} onRead={(id) => openStory(id, "library")} />}
          {view.name === "pocket" && <Pocket onOpen={setPhraseId} onStory={(id) => openStory(id, "pocket")} />}
          {view.name === "read" && (
            <Reader
              storyId={view.storyId}
              onBack={() => {
                const dest = view.from === "practice" ? "today" : view.from;
                if (dest === "library") setView({ name: "library" });
                else if (dest === "pocket") setView({ name: "pocket" });
                else setView({ name: "today" });
              }}
              onPhrase={setPhraseId}
              onPractice={() => openPractice(view.storyId, view.from)}
            />
          )}
          {view.name === "practice" && (
            <Practice
              storyId={view.storyId}
              onBack={() => setView({ name: "today" })}
              onRead={() => openStory(view.storyId, view.from)}
              onPocket={setPhraseId}
            />
          )}
        </main>
      </div>
      <nav className="nav-pad fixed inset-x-0 bottom-0 z-30">
        <div className="mx-auto grid max-w-lg grid-cols-4 border-t border-line bg-surface/95 backdrop-blur-md">
          {nav.map((item) => {
            const Icon = item.icon;
            const on = active === item.id;
            return (
              <button
                key={item.id}
                type="button"
                onClick={() => goTab(item.id)}
                className={`press flex min-h-16 flex-col items-center justify-center gap-1 text-xs font-medium ${on ? "text-primary" : "text-muted"}`}
                aria-current={on ? "page" : undefined}
              >
                <Icon className="size-5" strokeWidth={on ? 2.4 : 2} />
                {item.label}
              </button>
            );
          })}
        </div>
      </nav>
      {phrase && <PhraseSheet phrase={phrase.phrase} story={phrase.story} onClose={() => setPhraseId(null)} />}
    </div>
  );
}
