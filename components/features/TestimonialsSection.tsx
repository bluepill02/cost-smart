'use client';

import { Star, Users, Quote } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';

const TESTIMONIALS = [
  {
    name: 'Priya S.',
    role: 'Freelance Designer',
    initials: 'PS',
    color: 'bg-rose-500',
    rating: 5,
    quote:
      'CostSmart made separating my business and personal expenses so simple. The profit margin calculator alone saved me hours every month.',
  },
  {
    name: 'Rahul M.',
    role: 'Software Engineer',
    initials: 'RM',
    color: 'bg-blue-500',
    rating: 5,
    quote:
      'I finally know where my salary goes. The SIP calculator helped me start investing, and Pro analytics showed me I was overspending on subscriptions by 40%.',
  },
  {
    name: 'Anita K.',
    role: 'Recent Graduate',
    initials: 'AK',
    color: 'bg-violet-500',
    rating: 5,
    quote:
      "As a fresh grad on a tight budget, CostSmart's free tools were a lifesaver. I upgraded to Pro for the advanced reports and it's worth every rupee.",
  },
  {
    name: 'Vikram T.',
    role: 'Small Business Owner',
    initials: 'VT',
    color: 'bg-amber-500',
    rating: 5,
    quote:
      "The invoice generator and GST calculator are brilliant. Pro's PDF exports mean I can share professional reports with my accountant instantly.",
  },
];

export default function TestimonialsSection() {
  return (
    <section className="py-16 px-4 bg-white">
      <div className="container mx-auto max-w-6xl">
        {/* Header */}
        <div className="text-center mb-10">
          <div className="inline-flex items-center gap-2 text-emerald-600 mb-3">
            <Users className="w-5 h-5" />
            <span className="text-sm font-bold uppercase tracking-wide">Social Proof</span>
          </div>
          <h2 className="text-2xl md:text-3xl font-black text-slate-900 tracking-tight">
            Join 10,000+ users managing their finances smarter
          </h2>
        </div>

        {/* Testimonial Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5">
          {TESTIMONIALS.map((testimonial) => (
            <Card
              key={testimonial.name}
              className="border-slate-200 hover:border-emerald-200 hover:shadow-lg transition-all duration-200"
            >
              <CardContent className="pt-2">
                {/* Avatar and Info */}
                <div className="flex items-center gap-3 mb-3">
                  <div
                    className={`w-10 h-10 ${testimonial.color} rounded-full flex items-center justify-center text-white font-bold text-sm flex-shrink-0`}
                  >
                    {testimonial.initials}
                  </div>
                  <div>
                    <div className="font-semibold text-slate-900 text-sm">
                      {testimonial.name}
                    </div>
                    <div className="text-xs text-slate-500">{testimonial.role}</div>
                  </div>
                </div>

                {/* Star Rating */}
                <div className="flex items-center gap-0.5 mb-3">
                  {Array.from({ length: testimonial.rating }).map((_, i) => (
                    <Star
                      key={i}
                      className="w-4 h-4 text-emerald-500 fill-emerald-500"
                    />
                  ))}
                </div>

                {/* Quote */}
                <div className="relative">
                  <Quote className="w-4 h-4 text-emerald-200 absolute -top-1 -left-1" />
                  <p className="text-sm text-slate-600 leading-relaxed pl-4">
                    {testimonial.quote}
                  </p>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}
