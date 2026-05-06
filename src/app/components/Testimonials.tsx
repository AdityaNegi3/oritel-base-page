import { Star } from "lucide-react";

const testimonials = [
  {
    name: "Rajesh Kumar",
    role: "Owner",
    hotel: "Serenity Resort, Goa",
    content: "HotelOS transformed our operations. What used to take hours of manual work now happens automatically. Our occupancy rates increased by 35% in just 3 months.",
    rating: 5
  },
  {
    name: "Priya Sharma",
    role: "General Manager",
    hotel: "Mountain View Hotel, Shimla",
    content: "The staff management and housekeeping features are incredible. Our team efficiency improved dramatically, and guests love the online booking portal.",
    rating: 5
  },
  {
    name: "Arjun Patel",
    role: "Director",
    hotel: "Heritage Palace Hotels, Rajasthan",
    content: "Managing 4 properties was a nightmare before HotelOS. The multi-hotel dashboard gives me complete visibility and control. Highly recommended.",
    rating: 5
  }
];

export function Testimonials() {
  return (
    <section id="testimonials" className="py-24 px-6">
      <div className="max-w-6xl mx-auto">
        <div className="max-w-2xl mb-16">
          <h2 className="font-playfair text-5xl font-semibold text-neutral-950 mb-6">
            Loved by hotel owners across India
          </h2>
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          {testimonials.map((testimonial, index) => (
            <div key={index} className="rounded border border-neutral-200/80 bg-white/70 backdrop-blur p-8">
              {/* Stars */}
              <div className="flex gap-1 mb-6">
                {[...Array(testimonial.rating)].map((_, i) => (
                  <Star key={i} className="w-5 h-5 fill-neutral-900 text-neutral-900" />
                ))}
              </div>

              {/* Content */}
              <p className="text-neutral-700 leading-relaxed mb-8">
                "{testimonial.content}"
              </p>

              {/* Author */}
              <div className="pt-6 border-t border-neutral-200">
                <div className="font-semibold text-neutral-950">{testimonial.name}</div>
                <div className="text-sm text-neutral-600 mt-1">{testimonial.role}, {testimonial.hotel}</div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}