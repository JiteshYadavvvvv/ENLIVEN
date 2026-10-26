import Button from "@/components/ui/Button";
import Divider from "@/components/ui/Divider";
import SectionLabel from "@/components/ui/SectionLabel";

export default function Home() {
  return (
    <main className="relative flex min-h-screen items-center justify-center gradient-atmosphere">
      <div aria-hidden className="grain-overlay" />
      <div className="container-enliven relative z-[var(--layer-content)] flex flex-col items-center gap-6 py-24 text-center">
        <SectionLabel>Edition 04 · GDG AIT Pune</SectionLabel>
        <h1 className="text-display text-glow-magenta">Enliven</h1>
        <p className="max-w-md text-sm text-paper/70 sm:text-base">
          The visual foundation is live. Missions, timeline, and the full city
          are still in development.
        </p>
        <Divider />
        <div className="flex flex-wrap items-center justify-center gap-4">
          <Button variant="primary">Notify Me</Button>
          <Button variant="secondary">Explore Tracks</Button>
          <Button variant="ghost">Learn More</Button>
        </div>
      </div>
    </main>
  );
}
