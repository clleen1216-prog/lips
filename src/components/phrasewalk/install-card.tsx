import { useEffect, useState } from "react";
import { Smartphone, X } from "lucide-react";
import { useProgress } from "@/lib/progress";

type InstallPrompt = Event & {
  prompt: () => Promise<void>;
  userChoice: Promise<{ outcome: "accepted" | "dismissed" }>;
};

function standalone() {
  const nav = navigator as Navigator & { standalone?: boolean };
  return window.matchMedia("(display-mode: standalone)").matches || Boolean(nav.standalone);
}

export function InstallCard() {
  const { progress, ready, dismissInstall } = useProgress();
  const [prompt, setPrompt] = useState<InstallPrompt | null>(null);
  const [hidden, setHidden] = useState(false);
  const [android, setAndroid] = useState(false);

  useEffect(() => {
    setAndroid(/Android/i.test(navigator.userAgent));
    if (standalone()) setHidden(true);
    const onPrompt = (event: Event) => {
      event.preventDefault();
      setPrompt(event as InstallPrompt);
    };
    window.addEventListener("beforeinstallprompt", onPrompt);
    return () => window.removeEventListener("beforeinstallprompt", onPrompt);
  }, []);

  if (!ready || hidden || progress.installDismissed) return null;

  return (
    <section className="mt-6 rounded-3xl bg-surface p-4 shadow-border">
      <div className="flex items-start gap-3">
        <span className="grid size-11 shrink-0 place-items-center rounded-2xl bg-wash text-primary">
          <Smartphone className="size-5" />
        </span>
        <div className="min-w-0 flex-1">
          <div className="flex items-start justify-between gap-2">
            <h2 className="font-display text-lg leading-tight">Keep it on your phone</h2>
            <button
              type="button"
              onClick={dismissInstall}
              className="press grid size-10 shrink-0 place-items-center rounded-full text-muted"
              aria-label="Dismiss install tip"
            >
              <X className="size-4" />
            </button>
          </div>
          <p className="mt-1 text-sm leading-relaxed text-muted">
            {android
              ? "No app store. In Chrome, open the browser menu and tap Install app or Add to Home screen. It opens like any other app."
              : "No app store. Use your browser menu and choose Install app or Add to Home screen. On Android, that lives in the Chrome menu."}
          </p>
          {prompt && (
            <button
              type="button"
              className="press mt-3 inline-flex min-h-11 items-center rounded-full bg-primary px-4 text-sm font-medium text-primary-fg"
              onClick={async () => {
                await prompt.prompt();
                const choice = await prompt.userChoice;
                if (choice.outcome === "accepted") setHidden(true);
                setPrompt(null);
              }}
            >
              Install Phrasewalk
            </button>
          )}
        </div>
      </div>
    </section>
  );
}
