import { createContext, useContext, useEffect, useMemo, useState, type ReactNode } from "react";
import type { Help } from "./scaffold";
import { configureSpeech } from "./speech";
import { grade, sanitizeReview, seedCard, type ReviewMap } from "./srs";

export type Focus = "mixed" | "fab" | "life";
export type ThemeChoice = "system" | "light" | "dark";

export type Settings = {
  focus: Focus;
  level: 0 | 1 | 2 | 3; // 0 = any level
  theme: ThemeChoice;
  textSize: 0 | 1 | 2;
  slow: boolean;
  showZh: boolean;
  voiceURI: string | null;
  /** How much support to show for your lines while speaking. */
  help: Help;
};

export type Progress = {
  version: 2;
  pocket: string[];
  known: string[];
  walked: string[];
  daily: string[];
  lastActive: string | null;
  streak: number;
  installDismissed: boolean;
  introDismissed: boolean;
  lastStoryId: string | null;
  review: ReviewMap;
  reviewDay: string | null;
  activity: string[];
  settings: Settings;
};

export const DEFAULT_SETTINGS: Settings = {
  focus: "mixed",
  level: 0,
  theme: "system",
  textSize: 0,
  slow: false,
  showZh: true,
  voiceURI: null,
  help: "gaps",
};

const EMPTY: Progress = {
  version: 2,
  pocket: [],
  known: [],
  walked: [],
  daily: [],
  lastActive: null,
  streak: 0,
  installDismissed: false,
  introDismissed: false,
  lastStoryId: null,
  review: {},
  reviewDay: null,
  activity: [],
  settings: DEFAULT_SETTINGS,
};

// Keep the v1 key so people who already use the app keep their progress.
export const STORAGE_KEY = "phrasewalk.v1";

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

function strings(value: unknown): string[] {
  return Array.isArray(value) ? value.filter((id): id is string => typeof id === "string") : [];
}

function pick<T extends string | number>(value: unknown, allowed: readonly T[], fallback: T): T {
  return allowed.includes(value as T) ? (value as T) : fallback;
}

function sanitizeSettings(value: unknown): Settings {
  const raw = (value && typeof value === "object" ? value : {}) as Partial<Record<keyof Settings, unknown>>;
  return {
    focus: pick(raw.focus, ["mixed", "fab", "life"] as const, DEFAULT_SETTINGS.focus),
    level: pick(raw.level, [0, 1, 2, 3] as const, DEFAULT_SETTINGS.level),
    theme: pick(raw.theme, ["system", "light", "dark"] as const, DEFAULT_SETTINGS.theme),
    textSize: pick(raw.textSize, [0, 1, 2] as const, DEFAULT_SETTINGS.textSize),
    slow: typeof raw.slow === "boolean" ? raw.slow : DEFAULT_SETTINGS.slow,
    showZh: typeof raw.showZh === "boolean" ? raw.showZh : DEFAULT_SETTINGS.showZh,
    voiceURI: typeof raw.voiceURI === "string" ? raw.voiceURI : null,
    help: pick(raw.help, ["script", "gaps", "starter", "none"] as const, DEFAULT_SETTINGS.help),
  };
}

function sanitize(parsed: Partial<Record<keyof Progress, unknown>>): Progress {
  return {
    version: 2,
    pocket: strings(parsed.pocket),
    known: strings(parsed.known),
    walked: strings(parsed.walked),
    daily: strings(parsed.daily),
    activity: strings(parsed.activity).slice(-120),
    streak: typeof parsed.streak === "number" ? parsed.streak : 0,
    lastActive: typeof parsed.lastActive === "string" ? parsed.lastActive : null,
    lastStoryId: typeof parsed.lastStoryId === "string" ? parsed.lastStoryId : null,
    installDismissed: Boolean(parsed.installDismissed),
    introDismissed: Boolean(parsed.introDismissed),
    review: sanitizeReview(parsed.review),
    reviewDay: typeof parsed.reviewDay === "string" ? parsed.reviewDay : null,
    settings: sanitizeSettings(parsed.settings),
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
  /** Put phrases into the review schedule if they are not there yet. */
  seedReview: (ids: string[], delayDays?: number) => void;
  /** Record right/wrong answers from a practice or quiz round. */
  gradeReview: (results: { id: string; ok: boolean }[]) => void;
  finishReviewSession: () => void;
  setSetting: <K extends keyof Settings>(key: K, value: Settings[K]) => void;
  resetProgress: () => void;
};

const Ctx = createContext<Api | null>(null);

function withActivity(current: Progress, today: string): Progress {
  if (current.activity.includes(today)) return current;
  return { ...current, activity: [...current.activity, today].slice(-120) };
}

function withStreak(current: Progress, today: string): Progress {
  if (current.lastActive === today) return current;
  const streak = current.lastActive === shiftDays(-1) ? current.streak + 1 : 1;
  return { ...current, streak, lastActive: today, daily: [] };
}

export function ProgressProvider({ children }: { children: ReactNode }) {
  const [progress, setProgress] = useState<Progress>(EMPTY);
  const [ready, setReady] = useState(false);

  useEffect(() => {
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      if (raw) setProgress(sanitize(JSON.parse(raw) as Partial<Record<keyof Progress, unknown>>));
    } catch {
      /* keep the empty pocket */
    }
    setReady(true);
  }, []);

  useEffect(() => {
    if (!ready) return;
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(progress));
    } catch {
      /* storage can be full or blocked; the session still works */
    }
  }, [progress, ready]);

  // Apply theme, text size and speech settings.
  const { theme, textSize, slow, voiceURI } = progress.settings;
  useEffect(() => {
    const root = document.documentElement;
    if (theme === "system") root.removeAttribute("data-theme");
    else root.setAttribute("data-theme", theme);
    root.setAttribute("data-text", String(textSize));
    configureSpeech({ slow, voiceURI });
    try {
      localStorage.setItem("phrasewalk.theme", theme);
    } catch {
      /* ignore */
    }
  }, [theme, textSize, slow, voiceURI]);

  const api = useMemo<Api>(() => {
    const update = (fn: (current: Progress) => Progress) => setProgress((current) => fn(current));
    return {
      progress,
      ready,
      togglePocket(id) {
        update((current) => {
          const has = current.pocket.includes(id);
          const review = has || current.review[id] ? current.review : { ...current.review, [id]: seedCard(ymd(), 0) };
          return {
            ...current,
            review,
            pocket: has ? current.pocket.filter((item) => item !== id) : [...current.pocket, id],
          };
        });
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
          const base = withStreak(current, today);
          const daily = base.daily.includes(storyId) ? base.daily : [...base.daily, storyId];
          return withActivity({ ...base, walked, daily, lastStoryId: storyId }, today);
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
      seedReview(ids, delayDays = 1) {
        update((current) => {
          const today = ymd();
          const review = { ...current.review };
          let changed = false;
          for (const id of ids) {
            if (review[id]) continue;
            review[id] = seedCard(today, delayDays);
            changed = true;
          }
          return changed ? { ...current, review } : current;
        });
      },
      gradeReview(results) {
        update((current) => {
          const today = ymd();
          const review = { ...current.review };
          for (const { id, ok } of results) review[id] = grade(review[id], ok, today);
          return withActivity({ ...withStreak(current, today), review }, today);
        });
      },
      finishReviewSession() {
        update((current) => ({ ...current, reviewDay: ymd() }));
      },
      setSetting(key, value) {
        update((current) => ({ ...current, settings: { ...current.settings, [key]: value } }));
      },
      resetProgress() {
        setProgress({ ...EMPTY, settings: progress.settings });
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
