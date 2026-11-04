import { useEffect, useState } from "react";
import { BookA, Bookmark, Compass, Library, MessageCircle, Settings as Gear } from "lucide-react";
import { fabForDate, findPhrase, storyById } from "@/data/stories";
import { ProgressProvider, useProgress } from "@/lib/progress";
import { Library as StoryLibrary } from "./library";
import { PhraseSheet } from "./sheet";
import { Pocket } from "./pocket";
import { Practice } from "./practice";
import { Reader } from "./reader";
import { SettingsView } from "./settings";
import { Today } from "./today";
import { Words } from "./words";
import { Write } from "./write";
import { Check } from "./check";

type Tab = "today" | "library" | "practice" | "words" | "pocket";

type View =
  | { name: "today" }
  | { name: "library" }
  | { name: "words" }
  | { name: "pocket" }
  | { name: "settings"; from: Tab }
  | { name: "read"; storyId: string; from: Tab }
  | { name: "practice"; storyId: string; from: Tab }
  | { name: "write"; storyId: string; from: Tab }
  | { name: "check"; title: string; phraseIds: string[]; review: boolean; from: Tab };

const nav: { id: Tab; label: string; icon: typeof Compass }[] = [
  { id: "today", label: "Today", icon: Compass },
  { id: "library", label: "Stories", icon: Library },
  { id: "practice", label: "Say it", icon: MessageCircle },
  { id: "words", label: "Words", icon: BookA },
  { id: "pocket", label: "Pocket", icon: Bookmark },
];

function activeTab(view: View): Tab {
  if (view.name === "practice") return "practice";
  if (view.name === "read" || view.name === "write" || view.name === "check" || view.name === "settings") {
    return view.from === "practice" ? "today" : view.from;
  }
  return view.name;
}

function viewForTab(tab: Tab): View {
  if (tab === "library") return { name: "library" };
  if (tab === "words") return { name: "words" };
  if (tab === "pocket") return { name: "pocket" };
  return { name: "today" };
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
    setTodayId(fabForDate(new Date(), progress.settings.level).id);
  }, [progress.settings.level]);

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
    setView(viewForTab(tab));
    window.scrollTo({ top: 0 });
  };

  const openCheck = (title: string, phraseIds: string[], review: boolean, from: Tab) => {
    if (phraseIds.length === 0) return;
    setView({ name: "check", title, phraseIds, review, from });
    window.scrollTo({ top: 0 });
  };

  const openWrite = (storyId: string, from: Tab) => {
    rememberStory(storyId);
    setView({ name: "write", storyId, from });
    window.scrollTo({ top: 0 });
  };

  const backTo = (from: Tab) => {
    setView(viewForTab(from === "practice" ? "today" : from));
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
        <header className="flex items-center justify-between px-5 pt-4">
          <p className="font-display text-xl tracking-tight">Phrasewalk</p>
          <div className="flex items-center gap-1">
            <p className="text-sm tabular-nums text-muted">{streakLabel}</p>
            <button
              type="button"
              onClick={() => {
                setView({ name: "settings", from: active });
                window.scrollTo({ top: 0 });
              }}
              className="press grid size-11 place-items-center rounded-full text-muted"
              aria-label="Settings"
            >
              <Gear className="size-5" />
            </button>
          </div>
        </header>
        <main className="dock-clear flex-1 px-5 pt-6">
          {view.name === "today" && (
            <Today
              onRead={(id) => openStory(id, "today")}
              onPractice={(id) => openPractice(id, "today")}
              onOpenPhrase={setPhraseId}
              onReview={(ids) => openCheck("Daily review", ids, true, "today")}
            />
          )}
          {view.name === "words" && <Words />}
          {view.name === "settings" && <SettingsView onBack={() => backTo(view.from)} />}
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
              onCheck={() => {
                const story = storyById(view.storyId);
                openCheck(story?.title ?? "Check yourself", story?.phrases.map((item) => item.id) ?? [], false, view.from);
              }}
              onWrite={() => openWrite(view.storyId, view.from)}
            />
          )}
          {view.name === "practice" && (
            <Practice
              storyId={view.storyId}
              onBack={() => setView({ name: "today" })}
              onRead={() => openStory(view.storyId, view.from)}
              onPocket={setPhraseId}
              onCheck={(ids) => openCheck(storyById(view.storyId)?.title ?? "Check the shaky lines", ids, false, "today")}
            />
          )}
          {view.name === "write" && (
            <Write storyId={view.storyId} onBack={() => backTo(view.from)} onPhrase={setPhraseId} />
          )}
          {view.name === "check" && (
            <Check
              key={view.title + view.phraseIds.join(",")}
              title={view.title}
              phraseIds={view.phraseIds}
              review={view.review}
              onClose={() => backTo(view.from)}
              onOpenPhrase={setPhraseId}
            />
          )}
        </main>
      </div>
      <nav className="nav-pad fixed inset-x-0 bottom-0 z-30">
        <div className="mx-auto grid max-w-lg grid-cols-5 border-t border-line bg-surface/95 backdrop-blur-md">
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
