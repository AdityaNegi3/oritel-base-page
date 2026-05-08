import { Building2, Settings, Rocket } from "lucide-react";

const steps = [
  {
    icon: Building2,
    number: "1",
    title: "Register your hotel",
    description: "Sign up in 2 minutes with basic hotel details and start your free trial."
  },
  {
    icon: Settings,
    number: "2",
    title: "Set up rooms & staff",
    description: "Add your rooms, pricing, staff members, and customize settings to match your operations."
  },
  {
    icon: Rocket,
    number: "3",
    title: "Go live",
    description: "Start accepting bookings and managing your hotel right away—no technical skills needed."
  }
];

export function HowItWorks() {
  return (
    <section id="how-it-works" className="py-24 px-6">
      <div className="max-w-6xl mx-auto">
        <div className="max-w-2xl mb-14">
          <div className="inline-block rounded-full border border-neutral-200/80 bg-neutral-100/60 px-4 py-1 text-xs uppercase tracking-[0.4em] text-neutral-500 mb-6">
            How It Works
          </div>
          <h2 className="font-playfair text-3xl sm:text-5xl font-semibold text-neutral-950 mb-5 leading-tight">
            Get started in minutes
          </h2>
          <p className="text-lg text-neutral-500 leading-relaxed">
            No complex setup or training required
          </p>
        </div>

        <div className="grid sm:grid-cols-3 gap-8 sm:gap-10">
          {steps.map((step, index) => (
            <div key={index} className="group">
              <div className="text-5xl sm:text-7xl font-playfair font-semibold text-neutral-950 mb-4 select-none leading-none">
                {step.number}
              </div>
              <div className="w-10 h-10 bg-neutral-950 rounded-xl flex items-center justify-center mb-5 transition duration-300 group-hover:scale-110">
                <step.icon className="w-5 h-5 text-white" />
              </div>
              <h3 className="text-xl font-semibold text-neutral-950 mb-3 tracking-tight">
                {step.title}
              </h3>
              <p className="text-sm text-neutral-500 leading-relaxed">
                {step.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}