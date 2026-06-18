"use client";

import { useState } from "react";
import { Mail, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { AnimatedSection } from "@/components/ui/AnimatedSection";
import { useToast } from "@/store/toast-context";
import { useSiteContent } from "@/store/content-context";

export function Newsletter() {
  const [email, setEmail] = useState("");
  const { showToast } = useToast();
  const { content } = useSiteContent();
  const nl = content.home.newsletter;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;
    showToast(nl.successMessage);
    setEmail("");
  };

  return (
    <section className="py-24 pb-32">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <AnimatedSection>
          <div className="relative overflow-hidden rounded-[2rem] border border-white/[0.08] p-8 sm:p-14 lg:p-20">
            <div className="absolute inset-0 bg-gradient-to-br from-cyan-500/10 via-dark-elevated to-purple-500/10" />
            <div className="absolute -left-20 -top-20 h-64 w-64 rounded-full bg-cyan-500/20 blur-[80px] animate-float" />
            <div className="absolute -bottom-20 -right-20 h-64 w-64 rounded-full bg-purple-500/20 blur-[80px] animate-float" style={{ animationDelay: "-3s" }} />
            <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_0%,rgba(5,5,8,0.4)_100%)]" />

            <div className="relative mx-auto max-w-2xl text-center">
              <p className="eyebrow mb-6 mx-auto w-fit">
                <Sparkles className="h-3 w-3" />
                {nl.eyebrow}
              </p>

              <h2 className="text-3xl font-bold text-white sm:text-4xl lg:text-5xl tracking-tight">
                {nl.title} <span className="text-gradient">{nl.highlight}</span>
              </h2>
              <p className="mt-4 text-zinc-400 text-lg leading-relaxed">{nl.description}</p>

              <form onSubmit={handleSubmit} className="mt-10 flex flex-col gap-3 sm:flex-row sm:max-w-md sm:mx-auto">
                <div className="relative flex-1">
                  <Mail className="absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-zinc-500 z-10" />
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder={nl.placeholder}
                    required
                    className="w-full rounded-none border border-white/10 bg-white/[0.06] py-3.5 pl-11 pr-4 text-white placeholder:text-zinc-600 backdrop-blur-md focus:border-white/20 focus:outline-none focus:ring-2 focus:ring-white/10 transition-all"
                    aria-label="Email"
                  />
                </div>
                <Button type="submit" size="md" className="shrink-0">
                  {nl.buttonText}
                </Button>
              </form>

              <p className="mt-4 text-xs text-zinc-600">{nl.disclaimer}</p>
            </div>
          </div>
        </AnimatedSection>
      </div>
    </section>
  );
}
