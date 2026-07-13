"use client";

import { useState } from "react";
import { MessageSquare } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";
import { AnimatedSection } from "@/components/ui/AnimatedSection";
import { useToast } from "@/store/toast-context";
import { useSiteContent } from "@/store/content-context";
import { getIcon } from "@/lib/cms/icons";

export default function ContactPage() {
  const { showToast } = useToast();
  const { content } = useSiteContent();
  const { contact } = content;
  const formCopy = contact.form;
  const [formValues, setFormValues] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    showToast(contact.successMessage);
    setFormValues({ name: "", email: "", subject: "", message: "" });
  };

  return (
    <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
      <AnimatedSection className="text-center mb-12">
        <p className="eyebrow mb-4 mx-auto w-fit">
          {contact.eyebrow}
        </p>
        <h1 className="mt-4 text-4xl font-bold text-white">
          {contact.title} <span className="text-gradient">{contact.titleHighlight}</span>
        </h1>
        <p className="mx-auto mt-4 max-w-xl text-zinc-400">{contact.intro}</p>
      </AnimatedSection>

      <div className="grid gap-8 lg:grid-cols-3">
        <div className="space-y-4">
          {contact.info.map((info, i) => {
            const Icon = getIcon(info.icon);
            return (
              <AnimatedSection key={info.title} delay={i * 80}>
                <div className="glass-card p-5 flex items-start gap-4">
                  <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-cyan-500/10 text-cyan-400">
                    <Icon className="h-5 w-5" />
                  </div>
                  <div>
                    <p className="text-sm font-medium text-zinc-500">{info.title}</p>
                    <p className="text-white font-medium">{info.value}</p>
                    <p className="text-xs text-zinc-500 mt-0.5">{info.description}</p>
                  </div>
                </div>
              </AnimatedSection>
            );
          })}
        </div>

        <AnimatedSection delay={200} className="lg:col-span-2">
          <form onSubmit={handleSubmit} className="glass-card p-6 sm:p-8">
            <div className="mb-6 flex items-center justify-center gap-2">
              <MessageSquare className="h-5 w-5 text-cyan-400" />
              <h2 className="text-center text-xl font-semibold text-white">{contact.formTitle}</h2>
            </div>
            <div className="grid gap-4 sm:grid-cols-2">
              <Input
                label={formCopy.nameLabel}
                value={formValues.name}
                onChange={(e) => setFormValues({ ...formValues, name: e.target.value })}
                required
              />
              <Input
                label={formCopy.emailLabel}
                type="email"
                value={formValues.email}
                onChange={(e) => setFormValues({ ...formValues, email: e.target.value })}
                required
              />
              <Input
                label={formCopy.subjectLabel}
                className="sm:col-span-2"
                value={formValues.subject}
                onChange={(e) => setFormValues({ ...formValues, subject: e.target.value })}
                required
              />
              <div className="sm:col-span-2 space-y-2">
                <label htmlFor="message" className="block text-sm font-medium text-zinc-300">
                  {formCopy.messageLabel}
                </label>
                <textarea
                  id="message"
                  rows={5}
                  value={formValues.message}
                  onChange={(e) => setFormValues({ ...formValues, message: e.target.value })}
                  required
                  className="w-full rounded-xl border border-white/10 bg-white/5 px-4 py-3 text-white placeholder:text-zinc-500 backdrop-blur-sm focus:border-cyan-500/50 focus:outline-none focus:ring-2 focus:ring-cyan-500/20 resize-none"
                  placeholder={formCopy.messagePlaceholder}
                />
              </div>
            </div>
            <Button type="submit" className="mt-6" size="lg">
              {formCopy.submitLabel}
            </Button>
          </form>
        </AnimatedSection>
      </div>
    </div>
  );
}
