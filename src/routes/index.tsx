import { createFileRoute } from "@tanstack/react-router";
import { PhrasewalkApp } from "@/components/phrasewalk/app";

export const Route = createFileRoute("/")({ component: Home });

function Home() {
  return <PhrasewalkApp />;
}
