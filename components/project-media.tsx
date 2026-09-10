"use client";

import Image from "next/image";
import { useCallback, useEffect, useState, useSyncExternalStore } from "react";
import { ChevronLeft, ChevronRight, Pause, Play } from "lucide-react";
import type { Project, ProjectPhoto } from "@/lib/projects";

const motionQuery = "(prefers-reduced-motion: reduce)";
function subscribeMotion(callback: () => void) {
  const query = window.matchMedia(motionQuery);
  query.addEventListener("change", callback);
  return () => query.removeEventListener("change", callback);
}
const getReducedMotion = () => window.matchMedia(motionQuery).matches;
const getServerMotion = () => true;
const controlClass = "inline-flex size-11 shrink-0 items-center justify-center rounded-xl border border-brand/20 bg-surface text-brand transition-colors hover:bg-brand/10 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand";

function PhotoGallery({ photos }: { photos: readonly ProjectPhoto[] }) {
  const [index, setIndex] = useState(0);
  const [failed, setFailed] = useState<readonly string[]>([]);
  const [paused, setPaused] = useState(false);
  const [loaded, setLoaded] = useState<readonly string[]>([]);
  const [visibleSrc, setVisibleSrc] = useState(photos[0]?.src);
  const reducedMotion = useSyncExternalStore(subscribeMotion, getReducedMotion, getServerMotion);
  const available = photos.filter((photo) => photo.src.trim() && !failed.includes(photo.src));
  const count = available.length;
  const current = count ? index % count : 0;
  const photo = available[current];
  const automatic = count > 1 && !paused && !reducedMotion;

  const navigate = useCallback((direction: number) => {
    const next = (current + direction + count) % count;
    setIndex(next);
    const nextSrc = available[next]?.src;
    if (loaded.includes(nextSrc)) setVisibleSrc(nextSrc);
  }, [available, count, current, loaded]);

  useEffect(() => {
    if (!automatic) return;
    const timer = window.setTimeout(() => navigate(1), 6000);
    return () => window.clearTimeout(timer);
  }, [automatic, navigate]);

  if (!photo) return null;
  const displayed = available.some((item) => item.src === visibleSrc) ? visibleSrc : photo.src;

  return (
    <section aria-label="Project photos" aria-roledescription={count > 1 ? "carousel" : undefined} className="min-w-0 space-y-3" onFocusCapture={(event) => { if (!event.currentTarget.contains(event.relatedTarget)) setPaused(true); }}>
      <div className="relative aspect-video overflow-hidden rounded-2xl bg-surface-elevated">
        {available.map((item) => (
          <Image key={item.src} src={item.src} alt={item.src === displayed ? item.alt : ""} aria-hidden={item.src !== displayed} fill sizes="(min-width: 1024px) 960px, 100vw" loading="eager" className={`project-photo object-contain ${item.src === displayed ? "opacity-100" : "opacity-0"}`} onLoad={() => {
            setLoaded((previous) => previous.includes(item.src) ? previous : [...previous, item.src]);
            if (item.src === photo.src) setVisibleSrc(item.src);
          }} onError={() => setFailed((previous) => [...previous, item.src])} />
        ))}
      </div>
      {count > 1 && <div className="flex flex-wrap items-center justify-center gap-3">
        <button type="button" className={controlClass} onClick={() => navigate(-1)} aria-label="Previous project photo"><ChevronLeft aria-hidden="true" className="size-5" /></button>
        <p aria-live={automatic ? "off" : "polite"} aria-atomic="true" className="text-sm text-copy-secondary">{current + 1} / {count}</p>
        <button type="button" className={controlClass} onClick={() => navigate(1)} aria-label="Next project photo"><ChevronRight aria-hidden="true" className="size-5" /></button>
        {!reducedMotion && <button type="button" className={controlClass} onClick={() => setPaused((value) => !value)} aria-label={paused ? "Resume automatic slideshow" : "Pause automatic slideshow"}>{paused ? <Play aria-hidden="true" className="size-5" /> : <Pause aria-hidden="true" className="size-5" />}</button>}
      </div>}
    </section>
  );
}

function ProjectVideo({ src, title }: { src: string; title: string }) {
  const [failed, setFailed] = useState(false);
  if (failed) return null;
  return <video src={src} controls playsInline preload="metadata" aria-label={`${title} project video`} className="aspect-video w-full rounded-2xl bg-surface-elevated object-contain" onError={() => setFailed(true)} />;
}

export function ProjectMedia({ project }: { project: Project }) {
  if (project.video?.trim()) return <ProjectVideo key={project.video} src={project.video} title={project.title} />;
  if (!project.photos?.length) return null;
  return <PhotoGallery key={project.id} photos={project.photos} />;
}
