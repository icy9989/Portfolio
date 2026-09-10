"use client";

import Image from "next/image";
import { useEffect, useState } from "react";
import { Menu, Moon, Sun } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Dialog, DialogClose, DialogContent, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { navigationLinks } from "@/lib/navigation";

export function Navbar() {
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const desktop = window.matchMedia("(min-width: 1024px)");
    const closeOnDesktop = () => { if (desktop.matches) setOpen(false); };
    desktop.addEventListener("change", closeOnDesktop);
    return () => desktop.removeEventListener("change", closeOnDesktop);
  }, []);

  function toggleTheme() {
    document.documentElement.classList.toggle("dark");
  }

  const linkClass = "rounded-xl px-3 py-2 text-sm text-copy-secondary transition-colors hover:bg-brand/10 hover:text-brand focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-brand";

  return (
    <header className="sticky top-0 z-40 border-brand/15 bg-base/75 lg:border-b backdrop-blur-md">
      <div className="mx-auto grid h-20 max-w-7xl grid-cols-[1fr_auto] items-center gap-4 px-4 sm:px-6 lg:grid-cols-[1fr_auto_1fr]">
        <a href="#home" aria-label="Home — back to top" className="w-fit rounded-xl focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-brand">
          <Image src="/logo.png" alt="Portfolio logo" width={44} height={44} className="size-11 object-contain motion-safe:animate-[spin_20s_linear_infinite]" />
        </a>
        <nav aria-label="Main navigation" className="hidden items-center gap-1 lg:flex">
          {navigationLinks.map(({ id, label }) => <a key={id} href={`#${id}`} className={linkClass}>{label}</a>)}
        </nav>
        <div className="flex items-center justify-end gap-2">
          <Button variant="ghost" size="icon" onClick={toggleTheme} className="size-11 rounded-xl border-brand/20 bg-brand/10 p-3 text-brand shadow-sm hover:border-brand/40 hover:bg-brand/20 hover:text-brand" aria-label="Toggle light and dark theme">
            <Sun className="hidden size-5 dark:block" />
            <Moon className="size-5 dark:hidden" />
          </Button>
          <Dialog open={open} onOpenChange={setOpen}>
            <DialogTrigger asChild>
              <Button variant="ghost" size="icon" className="size-11 rounded-xl border-brand/20 bg-brand/10 p-3 text-brand shadow-sm hover:border-brand/40 hover:bg-brand/20 hover:text-brand lg:hidden" aria-label="Open navigation">
                <Menu className="size-5" />
              </Button>
            </DialogTrigger>
            <DialogContent aria-describedby={undefined} className="mobile-navigation top-0 right-0 left-auto h-dvh w-80 max-w-[calc(100%-2rem)] translate-x-0 translate-y-0 content-start gap-8 overflow-y-auto rounded-none rounded-l-3xl border-l border-brand/25 bg-surface p-6 sm:max-w-80 [&>button]:top-4 [&>button]:right-4 [&>button]:size-11 [&>button]:rounded-xl [&>button]:border-brand/20 [&>button]:bg-brand/10 [&>button]:text-brand">
              <DialogTitle className="sr-only">Navigation</DialogTitle>
              <nav aria-label="Mobile navigation" className="mt-12 flex flex-col gap-2">
                {navigationLinks.map(({ id, label }) => <DialogClose asChild key={id}><a href={`#${id}`} className={`${linkClass} py-3`}>{label}</a></DialogClose>)}
              </nav>
            </DialogContent>
          </Dialog>
        </div>
      </div>
    </header>
  );
}
