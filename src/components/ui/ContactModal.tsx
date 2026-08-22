import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Magnetic } from "./Magnetic";

const schema = z.object({
  name: z.string().min(2, "Enter your name."),
  phone: z.string().min(6, "Enter a valid phone number."),
  email: z.string().email("Enter a valid email address."),
});

type FormValues = z.infer<typeof schema>;

const CONTACT_ENDPOINT = import.meta.env.VITE_CONTACT_FORM_ENDPOINT as string | undefined;
const CONTACT_EMAIL = "bookings@parelon.com";

export function ContactModal({
  open,
  onClose,
  layoutId,
}: {
  open: boolean;
  onClose: () => void;
  layoutId: string;
}) {
  const [status, setStatus] = useState<"idle" | "sending" | "sent" | "error">("idle");
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<FormValues>({ resolver: zodResolver(schema) });

  function handleClose() {
    onClose();
    setStatus("idle");
  }

  useEffect(() => {
    if (!open) return;

    document.documentElement.style.overflow = "hidden";
    function onKeyDown(e: KeyboardEvent) {
      if (e.key === "Escape") handleClose();
    }
    window.addEventListener("keydown", onKeyDown);

    return () => {
      document.documentElement.style.overflow = "";
      window.removeEventListener("keydown", onKeyDown);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [open]);

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
    <AnimatePresence>
      {open && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            onClick={handleClose}
            className="fixed inset-0 z-[150] bg-black/70 backdrop-blur-sm"
          />

          <div className="pointer-events-none fixed inset-0 z-[151] flex items-center justify-center px-6">
            <motion.div
              layoutId={layoutId}
              transition={{ type: "spring", damping: 28, stiffness: 300 }}
              className="pointer-events-auto w-full max-w-md rounded-3xl bg-gradient-to-br from-brand/40 via-white/10 to-transparent p-[1px] shadow-[0_0_120px_-20px_var(--color-brand)]"
            >
              <div className="relative rounded-3xl bg-ink/95 p-7 backdrop-blur-xl sm:p-8">
                <button
                  onClick={handleClose}
                  data-cursor
                  data-cursor-text="Close"
                  aria-label="Close"
                  className="absolute top-5 right-5 flex h-8 w-8 items-center justify-center rounded-full text-mist-dim transition-colors hover:text-brand"
                >
                  ✕
                </button>

                <h2 className="font-display text-2xl font-medium tracking-tight text-paper">
                  Get in touch
                </h2>

                <form onSubmit={handleSubmit(onSubmit)} noValidate className="mt-6 flex flex-col gap-5">
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
        </>
      )}
    </AnimatePresence>
  );
}
