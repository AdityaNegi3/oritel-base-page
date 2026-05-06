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
        <div className="max-w-2xl mb-16">
          <h2 className="font-playfair text-5xl font-semibold text-neutral-950 mb-6">
            Everything you need to run your hotel
          </h2>
          <p className="text-lg text-neutral-600 leading-relaxed">
            Built specifically for hotels and resorts in India, from boutique properties to large chains.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <div key={index} className="rounded border border-neutral-200/80 bg-white/70 backdrop-blur p-8">
              <div className="w-12 h-12 bg-neutral-900 rounded flex items-center justify-center mb-6">
                <feature.icon className="w-6 h-6 text-white" />
              </div>
              <h3 className="text-xl font-semibold text-neutral-950 mb-3">
                {feature.title}
              </h3>
              <p className="text-neutral-600 leading-relaxed">
                {feature.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}