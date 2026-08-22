import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { motion, AnimatePresence } from "framer-motion";
import { Reveal } from "../ui/Reveal";
import { SectionLabel } from "../ui/SectionLabel";
import { Magnetic } from "../ui/Magnetic";

const schema = z.object({
  name: z.string().min(2, "Tell us your name."),
  email: z.string().email("Enter a valid email address."),
  eventType: z.enum(["Club night", "Festival", "Private / corporate", "Wedding", "Other"]),
  message: z.string().min(10, "A few more details would help."),
});

type FormValues = z.infer<typeof schema>;

const EVENT_TYPES: FormValues["eventType"][] = [
  "Club night",
  "Festival",
  "Private / corporate",
  "Wedding",
  "Other",
];

const CONTACT_ENDPOINT = import.meta.env.VITE_CONTACT_FORM_ENDPOINT as string | undefined;
const CONTACT_EMAIL = "bookings@on-management.com";

export function Contact() {
  const [status, setStatus] = useState<"idle" | "sending" | "sent" | "error">("idle");
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<FormValues>({
    resolver: zodResolver(schema),
    defaultValues: { eventType: "Club night" },
  });

  async function onSubmit(values: FormValues) {
    setStatus("sending");

    if (!CONTACT_ENDPOINT) {
      const body = `Name: ${values.name}%0AEvent type: ${values.eventType}%0A%0A${values.message}`;
      window.location.assign(
        `mailto:${CONTACT_EMAIL}?subject=Booking enquiry — ${encodeURIComponent(values.name)}&body=${body}`,
      );
      setStatus("sent");
      reset();
      return;
    }

    try {
      const res = await fetch(CONTACT_ENDPOINT, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(values),
      });
      if (!res.ok) throw new Error("Request failed");
      setStatus("sent");
      reset();
    } catch {
      setStatus("error");
    }
  }

  return (
    <section id="contact" className="relative border-t border-line px-6 py-28 lg:px-10 lg:py-40">
      <div className="mx-auto max-w-7xl">
        <Reveal>
          <SectionLabel index="04" label="Get in touch" />
        </Reveal>

        <div className="mt-10 grid grid-cols-1 gap-16 lg:grid-cols-12">
          <div className="lg:col-span-5">
            <Reveal index={1}>
              <h2 className="font-display text-3xl leading-[1.1] font-medium tracking-tight text-paper sm:text-5xl">
                Let&rsquo;s book something worth remembering.
              </h2>
            </Reveal>
            <Reveal index={2} className="mt-6 max-w-md">
              <p className="text-base text-mist sm:text-lg">
                Club night, festival slot, private event or a brand collaboration — tell us what
                you&rsquo;re planning and we&rsquo;ll route it to the right person on the roster.
              </p>
            </Reveal>
            <Reveal index={3} className="mt-10">
              <a
                href={`mailto:${CONTACT_EMAIL}`}
                data-cursor
                className="font-display text-xl text-brand transition-colors hover:text-brand-lime sm:text-2xl"
              >
                {CONTACT_EMAIL}
              </a>
            </Reveal>
          </div>

          <Reveal index={2} className="lg:col-span-7">
            <form onSubmit={handleSubmit(onSubmit)} noValidate className="grid grid-cols-1 gap-6 sm:grid-cols-2">
              <div className="flex flex-col gap-2 sm:col-span-1">
                <label htmlFor="name" className="font-mono text-xs tracking-[0.2em] text-mist-dim uppercase">
                  Name
                </label>
                <input
                  id="name"
                  {...register("name")}
                  className="border-b border-line bg-transparent py-3 text-paper outline-none transition-colors placeholder:text-mist-dim focus:border-brand"
                  placeholder="Your name"
                />
                {errors.name && <p className="text-xs text-brand-lime">{errors.name.message}</p>}
              </div>

              <div className="flex flex-col gap-2 sm:col-span-1">
                <label htmlFor="email" className="font-mono text-xs tracking-[0.2em] text-mist-dim uppercase">
                  Email
                </label>
                <input
                  id="email"
                  type="email"
                  {...register("email")}
                  className="border-b border-line bg-transparent py-3 text-paper outline-none transition-colors placeholder:text-mist-dim focus:border-brand"
                  placeholder="you@promoter.com"
                />
                {errors.email && <p className="text-xs text-brand-lime">{errors.email.message}</p>}
              </div>

              <div className="flex flex-col gap-2 sm:col-span-2">
                <label htmlFor="eventType" className="font-mono text-xs tracking-[0.2em] text-mist-dim uppercase">
                  Event type
                </label>
                <select
                  id="eventType"
                  {...register("eventType")}
                  className="border-b border-line bg-transparent py-3 text-paper outline-none transition-colors focus:border-brand"
                >
                  {EVENT_TYPES.map((type) => (
                    <option key={type} value={type} className="bg-ink text-paper">
                      {type}
                    </option>
                  ))}
                </select>
              </div>

              <div className="flex flex-col gap-2 sm:col-span-2">
                <label htmlFor="message" className="font-mono text-xs tracking-[0.2em] text-mist-dim uppercase">
                  Message
                </label>
                <textarea
                  id="message"
                  rows={4}
                  {...register("message")}
                  className="resize-none border-b border-line bg-transparent py-3 text-paper outline-none transition-colors placeholder:text-mist-dim focus:border-brand"
                  placeholder="Dates, venue, budget, capacity..."
                />
                {errors.message && <p className="text-xs text-brand-lime">{errors.message.message}</p>}
              </div>

              <div className="flex items-center gap-5 sm:col-span-2">
                <Magnetic>
                  <button
                    type="submit"
                    disabled={status === "sending"}
                    data-cursor
                    data-cursor-text="Send"
                    className="rounded-full bg-brand px-8 py-3.5 font-mono text-xs tracking-[0.2em] text-ink uppercase transition-transform hover:scale-[1.03] disabled:opacity-50"
                  >
                    {status === "sending" ? "Sending..." : "Send enquiry"}
                  </button>
                </Magnetic>

                <AnimatePresence mode="wait">
                  {status === "sent" && (
                    <motion.p
                      initial={{ opacity: 0, y: 6 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0 }}
                      className="font-mono text-xs tracking-[0.15em] text-brand uppercase"
                    >
                      Thanks — we&rsquo;ll be in touch.
                    </motion.p>
                  )}
                  {status === "error" && (
                    <motion.p
                      initial={{ opacity: 0, y: 6 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0 }}
                      className="font-mono text-xs tracking-[0.15em] text-red-400 uppercase"
                    >
                      Something went wrong — email us directly.
                    </motion.p>
                  )}
                </AnimatePresence>
              </div>
            </form>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
