import { motion, useReducedMotion } from "motion/react";

export function About() {
  const reduceMotion = useReducedMotion();

  return (
    <section id="about" className="relative w-full max-w-6xl mx-auto px-6 py-20 lg:py-28">
      <div className="grid gap-10 lg:grid-cols-12 lg:gap-12">
        <motion.div
          initial={reduceMotion ? undefined : { opacity: 0, y: 10, filter: "blur(6px)" }}
          whileInView={
            reduceMotion ? undefined : { opacity: 1, y: 0, filter: "blur(0px)" }
          }
          viewport={{ once: true, amount: 0.25 }}
          transition={{ duration: 0.8 }}
          className="lg:col-span-5"
        >
          <p className="text-xs font-semibold uppercase tracking-wider text-neutral-500">
            About Oritel
          </p>
          <h2 className="mt-3 text-3xl font-semibold tracking-tight text-neutral-900 sm:text-4xl">
            Hotel operations, simplified for India.
          </h2>
          <p className="mt-5 text-base leading-relaxed text-neutral-600">
            Oritel is a hotel management SaaS platform built for modern hotels, resorts,
            and boutique properties across India.
          </p>

          <div className="mt-8 rounded-2xl border border-neutral-200 bg-white/40 p-5 backdrop-blur-md">
            <p className="text-sm leading-relaxed text-neutral-600">
              One clean dashboard for front desk, housekeeping, staff management,
              inventory, and guest bookings — without training, contracts, or
              complicated setup.
            </p>
          </div>
        </motion.div>

        <motion.div
          initial={reduceMotion ? undefined : { opacity: 0, y: 10, filter: "blur(6px)" }}
          whileInView={
            reduceMotion ? undefined : { opacity: 1, y: 0, filter: "blur(0px)" }
          }
          viewport={{ once: true, amount: 0.25 }}
          transition={{ duration: 0.8, delay: 0.1 }}
          className="lg:col-span-7"
        >
          <div className="rounded-3xl border border-neutral-200 bg-white/50 p-6 sm:p-8 backdrop-blur-md">
            <div className="space-y-5 text-neutral-600 leading-relaxed">
              <p>
                We started Oritel because hotel software was either too expensive,
                too complicated, or too outdated. Most properties were still
                managing bookings on spreadsheets and coordinating housekeeping
                over WhatsApp. We knew there was a better way.
              </p>
              <p>
                Oritel gives hotels a single platform to run their entire
                operations — front desk, housekeeping, staff management, inventory,
                and guest bookings — all from one clean dashboard. No training
                required. No enterprise contracts. Just software that works.
              </p>
              <p>
                Every hotel that signs up gets their own branded guest portal — a
                public booking website where guests can browse rooms and book
                directly, without any third-party fees.
              </p>
              <p>
                We're building Oritel in public, one phase at a time. If you run a
                hotel and want to be among our first customers, we'd love to hear
                from you.
              </p>
            </div>

            <div className="mt-8 flex flex-wrap items-center gap-3">
              <a
                href="#pricing"
                className="inline-flex items-center justify-center rounded-xl bg-neutral-900 px-5 py-3 text-sm font-semibold text-white shadow-sm transition hover:bg-neutral-800"
              >
                See pricing
              </a>
              <a
                href="#contact"
                className="inline-flex items-center justify-center rounded-xl border border-neutral-300 bg-white/60 px-5 py-3 text-sm font-semibold text-neutral-900 backdrop-blur-md transition hover:bg-white"
              >
                Talk to us
              </a>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
