import { useRef, useState } from "react";
import { motion, useScroll, useTransform, transform, AnimatePresence } from "framer-motion";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Magnetic } from "../ui/Magnetic";
import logoWordmark from "../../assets/logo-wordmark.svg";

const schema = z.object({
  name: z.string().min(2, "Enter your name."),
  phone: z.string().min(6, "Enter a valid phone number."),
  email: z.string().email("Enter a valid email address."),
});

type FormValues = z.infer<typeof schema>;

const CONTACT_ENDPOINT = import.meta.env.VITE_CONTACT_FORM_ENDPOINT as string | undefined;
const CONTACT_EMAIL = "bookings@parelon.com";

export function HeroContact() {
  const wrapperRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: wrapperRef, offset: ["start start", "end end"] });

  const logoScale = useTransform(scrollYProgress, (v) => transform(v, [0, 0.5], [1, 0.42]));
  const logoY = useTransform(scrollYProgress, (v) => transform(v, [0, 0.5], [0, -220]));
  const formOpacity = useTransform(scrollYProgress, (v) => transform(v, [0.25, 0.55], [0, 1]));
  const formY = useTransform(scrollYProgress, (v) => transform(v, [0.25, 0.6], [40, 0]));
  const formPointerEvents = useTransform(scrollYProgress, (v) => (v > 0.3 ? "auto" : "none"));
  const hintOpacity = useTransform(scrollYProgress, (v) => transform(v, [0, 0.05], [1, 0]));

  const [status, setStatus] = useState<"idle" | "sending" | "sent" | "error">("idle");
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<FormValues>({ resolver: zodResolver(schema) });

  async function onSubmit(values: FormValues) {
    setStatus("sending");

    if (!CONTACT_ENDPOINT) {
      window.location.assign(
        `mailto:${CONTACT_EMAIL}?subject=${encodeURIComponent(
          `Booking enquiry — ${values.name}`,
        )}&body=${encodeURIComponent(`Phone: ${values.phone}`)}`,
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
    <section ref={wrapperRef} id="top" className="relative h-[200vh]">
      <div className="sticky top-0 flex h-[100svh] flex-col items-center justify-center overflow-hidden px-6">
        <motion.div
          style={{ scale: logoScale, y: logoY }}
          className="flex flex-col items-center gap-5"
        >
          <img src={logoWordmark} alt="Parel On" className="h-24 w-24 sm:h-32 sm:w-32" />
          <div className="flex flex-col items-center gap-1.5">
            <span className="font-display text-2xl font-medium tracking-tight text-paper sm:text-3xl">
              Parel On
            </span>
            <span className="font-mono text-[11px] tracking-[0.4em] text-mist-dim uppercase">
              Artist management
            </span>
          </div>
        </motion.div>

        <div className="relative mt-12 min-h-[260px] w-full max-w-md sm:min-h-[300px]">
          <motion.div
            style={{ opacity: formOpacity, y: formY, pointerEvents: formPointerEvents }}
            className="absolute inset-x-0 top-0"
          >
            <div className="rounded-3xl bg-gradient-to-br from-brand/40 via-white/10 to-transparent p-[1px]">
              <form
                onSubmit={handleSubmit(onSubmit)}
                noValidate
                className="flex flex-col gap-5 rounded-3xl bg-black/40 p-7 backdrop-blur-xl sm:p-8"
              >
                <div className="flex flex-col gap-1.5">
                  <input
                    aria-label="Name"
                    {...register("name")}
                    className="border-b border-line bg-transparent py-2.5 text-paper outline-none transition-colors placeholder:text-mist-dim focus:border-brand"
                    placeholder="Name"
                  />
                  {errors.name && <p className="text-xs text-brand-lime">{errors.name.message}</p>}
                </div>

                <div className="flex flex-col gap-1.5">
                  <input
                    aria-label="Phone"
                    type="tel"
                    {...register("phone")}
                    className="border-b border-line bg-transparent py-2.5 text-paper outline-none transition-colors placeholder:text-mist-dim focus:border-brand"
                    placeholder="Phone"
                  />
                  {errors.phone && <p className="text-xs text-brand-lime">{errors.phone.message}</p>}
                </div>

                <div className="flex flex-col gap-1.5">
                  <input
                    aria-label="Email"
                    type="email"
                    {...register("email")}
                    className="border-b border-line bg-transparent py-2.5 text-paper outline-none transition-colors placeholder:text-mist-dim focus:border-brand"
                    placeholder="Email"
                  />
                  {errors.email && <p className="text-xs text-brand-lime">{errors.email.message}</p>}
                </div>

                <div className="mt-1 flex items-center gap-4">
                  <Magnetic>
                    <button
                      type="submit"
                      disabled={status === "sending"}
                      data-cursor
                      data-cursor-text="Send"
                      className="rounded-full bg-brand px-7 py-3 font-mono text-xs tracking-[0.2em] text-ink uppercase transition-transform hover:scale-[1.03] disabled:opacity-50"
                    >
                      {status === "sending" ? "Sending..." : "Send"}
                    </button>
                  </Magnetic>

                  <AnimatePresence mode="wait">
                    {status === "sent" && (
                      <motion.p
                        initial={{ opacity: 0, y: 6 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0 }}
                        className="font-mono text-[11px] tracking-[0.1em] text-brand uppercase"
                      >
                        Thanks — we&rsquo;ll be in touch.
                      </motion.p>
                    )}
                    {status === "error" && (
                      <motion.p
                        initial={{ opacity: 0, y: 6 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0 }}
                        className="font-mono text-[11px] tracking-[0.1em] text-red-400 uppercase"
                      >
                        Something went wrong — email us directly.
                      </motion.p>
                    )}
                  </AnimatePresence>
                </div>
              </form>
            </div>
          </motion.div>
        </div>

        <motion.div
          style={{ opacity: hintOpacity }}
          className="absolute bottom-9 flex flex-col items-center gap-2"
        >
          <span className="font-mono text-[10px] tracking-[0.35em] text-mist-dim uppercase">
            Scroll
          </span>
          <motion.span aria-hidden className="h-2 w-2 animate-bounce-soft rounded-full bg-brand" />
        </motion.div>
      </div>
    </section>
  );
}
