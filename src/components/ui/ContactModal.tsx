import { useEffect, useState } from "react";
import { motion, AnimatePresence, type Variants } from "framer-motion";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Magnetic } from "./Magnetic";
import { FloatingField } from "./FloatingField";
import { SuccessCheck } from "./SuccessCheck";
import { OnMark } from "./OnMark";

const schema = z.object({
  name: z.string().min(2, "Enter your name."),
  phone: z.string().min(6, "Enter a valid phone number."),
  email: z.string().email("Enter a valid email address."),
});

type FormValues = z.infer<typeof schema>;

const CONTACT_ENDPOINT = import.meta.env.VITE_CONTACT_FORM_ENDPOINT as string | undefined;
const CONTACT_EMAIL = "bookings@parelon.com";

const containerVariants: Variants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.08, delayChildren: 0.15 } },
};

const fieldVariants: Variants = {
  hidden: { opacity: 0, y: 14 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: [0.16, 1, 0.3, 1] } },
};

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
    setTimeout(() => setStatus("idle"), 300);
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
            className="fixed inset-0 z-[150] bg-black/75 backdrop-blur-sm"
          />

          <div className="pointer-events-none fixed inset-0 z-[151] flex items-center justify-center px-5 py-10">
            <motion.div
              layoutId={layoutId}
              transition={{ type: "spring", damping: 28, stiffness: 300 }}
              className="pointer-events-auto w-full max-w-md sm:max-w-3xl"
            >
              <div className="relative overflow-hidden rounded-[28px] p-[1.5px] shadow-[0_0_140px_-30px_var(--color-accent)]">
                <div
                  aria-hidden
                  className="absolute inset-[-60%] animate-spin-slow"
                  style={{
                    background:
                      "conic-gradient(from 0deg, var(--color-accent), transparent 22%, var(--color-silver-bright), transparent 50%, var(--color-accent-bright), transparent 78%, var(--color-silver))",
                  }}
                />

                <div className="relative grid grid-cols-1 overflow-hidden rounded-[28px] bg-ink/95 backdrop-blur-xl sm:grid-cols-[1fr_1.25fr]">
                  <button
                    onClick={handleClose}
                    data-cursor
                    data-cursor-text="Close"
                    aria-label="Close"
                    className="absolute top-5 right-5 z-10 flex h-8 w-8 items-center justify-center rounded-full text-mist-dim transition-colors hover:text-accent"
                  >
                    ✕
                  </button>

                  <div className="hidden flex-col justify-between border-r border-line p-9 sm:flex">
                    <div>
                      <span className="font-mono text-[10px] tracking-[0.35em] text-accent uppercase">
                        Let&rsquo;s talk
                      </span>
                      <h2 className="mt-4 font-display text-3xl leading-[1.1] font-semibold tracking-tight text-paper">
                        Let&rsquo;s make something happen.
                      </h2>
                      <p className="mt-4 text-sm text-mist">
                        Booking, management or a brand collaboration — we&rsquo;ll route it to the
                        right person on the roster.
                      </p>
                    </div>

                    <div className="mt-10 flex items-center gap-3">
                      <div className="relative flex h-11 w-11 items-center justify-center rounded-full bg-gradient-to-br from-brand to-brand-lime">
                        <span className="absolute inset-0 animate-pulse-soft rounded-full bg-brand/40 blur-md" />
                        <OnMark className="relative h-5 w-5" color="var(--color-ink)" />
                      </div>
                      <a
                        href={`mailto:${CONTACT_EMAIL}`}
                        data-cursor
                        className="font-mono text-xs tracking-[0.05em] text-mist transition-colors hover:text-accent"
                      >
                        {CONTACT_EMAIL}
                      </a>
                    </div>
                  </div>

                  <div className="flex flex-col gap-1 px-7 pt-8 sm:hidden">
                    <span className="font-mono text-[10px] tracking-[0.35em] text-accent uppercase">
                      Let&rsquo;s talk
                    </span>
                    <h2 className="font-display text-2xl font-semibold tracking-tight text-paper">
                      Let&rsquo;s make something happen.
                    </h2>
                  </div>

                  <div className="relative p-7 sm:p-9">
                    <AnimatePresence mode="wait">
                      {status === "sent" ? (
                        <motion.div
                          key="success"
                          initial={{ opacity: 0 }}
                          animate={{ opacity: 1 }}
                          exit={{ opacity: 0 }}
                          className="flex min-h-[280px] flex-col items-center justify-center gap-5 text-center"
                        >
                          <SuccessCheck />
                          <div>
                            <h3 className="font-display text-xl font-semibold text-paper">
                              Message sent.
                            </h3>
                            <p className="mt-2 text-sm text-mist">
                              Thanks — we&rsquo;ll be in touch shortly.
                            </p>
                          </div>
                        </motion.div>
                      ) : (
                        <motion.form
                          key="form"
                          variants={containerVariants}
                          initial="hidden"
                          animate="visible"
                          exit={{ opacity: 0 }}
                          onSubmit={handleSubmit(onSubmit)}
                          noValidate
                          className="flex flex-col gap-6"
                        >
                          <motion.div variants={fieldVariants}>
                            <FloatingField
                              label="Name"
                              autoComplete="name"
                              error={errors.name?.message}
                              {...register("name")}
                            />
                          </motion.div>

                          <motion.div variants={fieldVariants}>
                            <FloatingField
                              label="Phone"
                              type="tel"
                              autoComplete="tel"
                              error={errors.phone?.message}
                              {...register("phone")}
                            />
                          </motion.div>

                          <motion.div variants={fieldVariants}>
                            <FloatingField
                              label="Email"
                              type="email"
                              autoComplete="email"
                              error={errors.email?.message}
                              {...register("email")}
                            />
                          </motion.div>

                          <motion.div variants={fieldVariants} className="mt-1 flex items-center gap-4">
                            <Magnetic>
                              <button
                                type="submit"
                                disabled={status === "sending"}
                                data-cursor
                                data-cursor-text="Send"
                                className="rounded-full bg-accent px-8 py-3.5 font-mono text-xs tracking-[0.2em] text-ink uppercase transition-transform hover:scale-[1.03] disabled:opacity-50"
                              >
                                {status === "sending" ? "Sending..." : "Send"}
                              </button>
                            </Magnetic>

                            {status === "error" && (
                              <motion.p
                                initial={{ opacity: 0, y: 6 }}
                                animate={{ opacity: 1, y: 0 }}
                                className="font-mono text-[11px] tracking-[0.1em] text-red-400 uppercase"
                              >
                                Something went wrong — email us directly.
                              </motion.p>
                            )}
                          </motion.div>
                        </motion.form>
                      )}
                    </AnimatePresence>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </>
      )}
    </AnimatePresence>
  );
}
