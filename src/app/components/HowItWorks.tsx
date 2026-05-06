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
        <div className="max-w-2xl mb-16">
          <h2 className="font-playfair text-5xl font-semibold text-neutral-950 mb-6">
            Get started in minutes
          </h2>
          <p className="text-lg text-neutral-600 leading-relaxed">
            No complex setup or training required
          </p>
        </div>

        <div className="grid lg:grid-cols-3 gap-12">
          {steps.map((step, index) => (
            <div key={index}>
              <div className="text-6xl font-playfair font-semibold text-neutral-200 mb-6">
                {step.number}
              </div>
              <div className="w-12 h-12 bg-neutral-900 rounded flex items-center justify-center mb-6">
                <step.icon className="w-6 h-6 text-white" />
              </div>
              <h3 className="text-2xl font-semibold text-neutral-950 mb-4">
                {step.title}
              </h3>
              <p className="text-neutral-600 leading-relaxed">
                {step.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}