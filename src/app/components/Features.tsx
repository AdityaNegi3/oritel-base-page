import { Bed, Monitor, Sparkles, Users, Globe, Crown } from "lucide-react";

const features = [
  {
    icon: Bed,
    title: "Room & Booking Management",
    description: "Real-time room availability, online & offline bookings, pricing control, and reservation tracking."
  },
  {
    icon: Monitor,
    title: "Receptionist Dashboard",
    description: "Streamlined check-in/check-out, guest profiles, billing, and instant booking confirmations."
  },
  {
    icon: Sparkles,
    title: "Housekeeping & Inventory",
    description: "Track room status, assign cleaning tasks, manage supplies, and maintain quality standards."
  },
  {
    icon: Users,
    title: "Staff Management",
    description: "Employee scheduling, attendance tracking, role assignments, and performance monitoring."
  },
  {
    icon: Globe,
    title: "Guest Booking Portal",
    description: "Branded online booking website for your hotel with payment gateway integration."
  },
  {
    icon: Crown,
    title: "Multi-Hotel Panel",
    description: "Manage multiple properties from one dashboard with consolidated reporting and analytics."
  }
];

export function Features() {
  return (
    <section id="features" className="py-24 px-6">
      <div className="max-w-6xl mx-auto">
        <div className="max-w-2xl mb-14">
          <div className="inline-block rounded-full border border-neutral-200/80 bg-neutral-100/60 px-4 py-1 text-xs uppercase tracking-[0.4em] text-neutral-500 mb-6">
            Features
          </div>
          <h2 className="font-playfair text-3xl sm:text-5xl font-semibold text-neutral-950 mb-5 leading-tight">
            Everything you need to run your hotel
          </h2>
          <p className="text-lg text-neutral-500 leading-relaxed">
            Built specifically for hotels and resorts in India, from boutique properties to large chains.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5">
          {features.map((feature, index) => (
            <div
              key={index}
              className="group rounded-2xl border border-neutral-200/80 bg-white/60 backdrop-blur p-8 transition duration-300 hover:border-neutral-300 hover:bg-white/90 hover:shadow-[0_8px_40px_-12px_rgba(0,0,0,0.08)]"
            >
              <div className="w-10 h-10 bg-neutral-950 rounded-xl flex items-center justify-center mb-6 transition duration-300 group-hover:scale-110">
                <feature.icon className="w-5 h-5 text-white" />
              </div>
              <h3 className="text-lg font-semibold text-neutral-950 mb-2 tracking-tight">
                {feature.title}
              </h3>
              <p className="text-sm text-neutral-500 leading-relaxed">
                {feature.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}