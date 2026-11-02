import { createContext, useContext, useEffect, useMemo, useState, type ReactNode } from "react";

export type Progress = {
  pocket: string[];
  known: string[];
  walked: string[];
  daily: string[];
  lastActive: string | null;
  streak: number;
  installDismissed: boolean;
  introDismissed: boolean;
  lastStoryId: string | null;
};

const EMPTY: Progress = {
  pocket: [],
  known: [],
  walked: [],
  daily: [],
  lastActive: null,
  streak: 0,
  installDismissed: false,
  introDismissed: false,
  lastStoryId: null,
};

const KEY = "phrasewalk.v1";

export function ymd(date = new Date()) {
  const y = date.getFullYear();
  const m = String(date.getMonth() + 1).padStart(2, "0");
  const d = String(date.getDate()).padStart(2, "0");
  return `${y}-${m}-${d}`;
}

function shiftDays(days: number) {
  const date = new Date();
  date.setDate(date.getDate() + days);
  return ymd(date);
}

function sanitize(parsed: Partial<Progress>): Progress {
  return {
    ...EMPTY,
    ...parsed,
    pocket: Array.isArray(parsed.pocket) ? parsed.pocket.filter((id) => typeof id === "string") : [],
    known: Array.isArray(parsed.known) ? parsed.known.filter((id) => typeof id === "string") : [],
    walked: Array.isArray(parsed.walked) ? parsed.walked.filter((id) => typeof id === "string") : [],
    daily: Array.isArray(parsed.daily) ? parsed.daily.filter((id) => typeof id === "string") : [],
    streak: typeof parsed.streak === "number" ? parsed.streak : 0,
    lastActive: typeof parsed.lastActive === "string" ? parsed.lastActive : null,
    lastStoryId: typeof parsed.lastStoryId === "string" ? parsed.lastStoryId : null,
    installDismissed: Boolean(parsed.installDismissed),
    introDismissed: Boolean(parsed.introDismissed),
  };
}

type Api = {
  progress: Progress;
  ready: boolean;
  togglePocket: (id: string) => void;
  toggleKnown: (id: string) => void;
  markWalked: (storyId: string) => void;
  rememberStory: (storyId: string) => void;
  dismissInstall: () => void;
  dismissIntro: () => void;
};

const Ctx = createContext<Api | null>(null);

export function ProgressProvider({ children }: { children: ReactNode }) {
  const [progress, setProgress] = useState<Progress>(EMPTY);
  const [ready, setReady] = useState(false);

  useEffect(() => {
    try {
      const raw = localStorage.getItem(KEY);
      if (raw) setProgress(sanitize(JSON.parse(raw) as Partial<Progress>));
    } catch {
      /* keep the empty pocket */
    }
    setReady(true);
  }, []);

  useEffect(() => {
    if (!ready) return;
    localStorage.setItem(KEY, JSON.stringify(progress));
  }, [progress, ready]);

  const api = useMemo<Api>(() => {
    const update = (fn: (current: Progress) => Progress) => setProgress((current) => fn(current));
    return {
      progress,
      ready,
      togglePocket(id) {
        update((current) => ({
          ...current,
          pocket: current.pocket.includes(id)
            ? current.pocket.filter((item) => item !== id)
            : [...current.pocket, id],
        }));
      },
      toggleKnown(id) {
        update((current) => ({
          ...current,
          known: current.known.includes(id)
            ? current.known.filter((item) => item !== id)
            : [...current.known, id],
        }));
      },
      markWalked(storyId) {
        update((current) => {
          const today = ymd();
          const walked = current.walked.includes(storyId) ? current.walked : [...current.walked, storyId];
          const sameDay = current.lastActive === today;
          const dailyBase = sameDay ? current.daily : [];
          const daily = dailyBase.includes(storyId) ? dailyBase : [...dailyBase, storyId];
          if (sameDay) return { ...current, walked, daily, lastStoryId: storyId };
          const streak = current.lastActive === shiftDays(-1) ? current.streak + 1 : 1;
          return { ...current, walked, daily, streak, lastActive: today, lastStoryId: storyId };
        });
      },
      rememberStory(storyId) {
        update((current) => ({ ...current, lastStoryId: storyId }));
      },
      dismissInstall() {
        update((current) => ({ ...current, installDismissed: true }));
      },
      dismissIntro() {
        update((current) => ({ ...current, introDismissed: true }));
      },
    };
  }, [progress, ready]);

  return <Ctx.Provider value={api}>{children}</Ctx.Provider>;
}

export function useProgress() {
  const ctx = useContext(Ctx);
  if (!ctx) throw new Error("useProgress must sit inside ProgressProvider");
  return ctx;
}
