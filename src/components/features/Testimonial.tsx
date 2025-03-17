
import React from 'react';
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { Card, CardContent } from "@/components/ui/card";
import { QuoteIcon, Star } from "lucide-react";

type TestimonialProps = {
  isIntersecting: boolean;
};

interface TestimonialData {
  icon: string;
  iconBg: string;
  quote: string;
  name: string;
  location: string;
  rating?: number;
}

const testimonials: TestimonialData[] = [
  {
    icon: "🇦🇺",
    iconBg: "bg-movesync-blue/10",
    quote: "MoveSync made our relocation to Sydney completely stress-free. The AI assistant helped us find the perfect apartment in Bondi, navigate the visa process, and even suggested the best schools for our children. We couldn't have done it without this incredible technology!",
    name: "Sarah & Michael Thompson",
    location: "Relocated from London to Sydney",
    rating: 5
  },
  {
    icon: "🏙️",
    iconBg: "bg-green-100",
    quote: "As a Melbourne local moving to Brisbane for work, I was worried about finding the right neighborhood and making new connections. MoveSync's AI found me the perfect apartment near my new office and connected me with local community groups. The interstate move was smoother than I ever expected!",
    name: "David Chen",
    location: "Relocated from Melbourne to Brisbane",
    rating: 5
  },
  {
    icon: "🌉",
    iconBg: "bg-amber-100",
    quote: "When my tech company transferred me to Melbourne, I had just 4 weeks to move my entire family from San Francisco. MoveSync's personalized relocation timeline and school recommendations were invaluable. Our transition was seamless despite the short timeframe!",
    name: "Jennifer Kumar",
    location: "Relocated from San Francisco to Melbourne",
    rating: 5
  },
  {
    icon: "🏖️",
    iconBg: "bg-rose-100",
    quote: "After retiring, we dreamed of moving to the Gold Coast but were overwhelmed by the logistics. MoveSync helped us understand the financial implications, find the perfect beachside property, and connect with local retirement communities. We're loving our new Australian lifestyle!",
    name: "Robert & June Wilson",
    location: "Relocated from Toronto to Gold Coast",
    rating: 5
  },
  {
    icon: "🏫",
    iconBg: "bg-purple-100",
    quote: "Moving to Perth for my PhD was incredibly daunting as an international student. MoveSync guided me through the student visa process, found affordable housing near my university, and even helped me open an Australian bank account before arrival. I couldn't recommend it more highly!",
    name: "Akira Tanaka",
    location: "Relocated from Tokyo to Perth",
    rating: 5
  }
];

const TestimonialCard: React.FC<{ data: TestimonialData }> = ({ data }) => (
  <div className="flex flex-col h-full bg-white rounded-xl p-6 shadow-md hover:shadow-lg transition-all duration-300">
    <div className="flex justify-between items-start mb-6">
      <div className={`w-14 h-14 ${data.iconBg} rounded-full flex items-center justify-center shrink-0`}>
        <span className="text-2xl">{data.icon}</span>
      </div>
      <div className="flex">
        {[...Array(data.rating || 5)].map((_, i) => (
          <Star key={i} className="w-5 h-5 fill-yellow-400 text-yellow-400" />
        ))}
      </div>
    </div>
    
    <div className="flex-grow">
      <div className="relative mb-4">
        <QuoteIcon className="absolute -left-2 -top-2 w-8 h-8 text-movesync-blue/10 rotate-180" />
        <p className="italic text-gray-700 pl-6 pr-2 relative z-10">
          "{data.quote}"
        </p>
      </div>
    </div>
    
    <div className="mt-4 pt-4 border-t border-gray-100">
      <p className="font-semibold text-gray-800">{data.name}</p>
      <p className="text-sm text-movesync-gray">{data.location}</p>
    </div>
  </div>
);

const Testimonial: React.FC<TestimonialProps> = ({ isIntersecting }) => {
  return (
    <div 
      className={`mt-16 transition-all duration-700 delay-700 ${
        isIntersecting ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <div className="inline-flex items-center rounded-full bg-movesync-blue/10 px-3 py-1 text-sm font-medium text-movesync-blue mb-4">
            <span className="animate-pulse mr-1">•</span> Success Stories
          </div>
          <h2 className="text-3xl font-bold mb-4">What Our Users Say</h2>
          <p className="text-movesync-gray-dark max-w-2xl mx-auto">
            Hear from people who have successfully relocated to Australia with MoveSync's help
          </p>
        </div>
        
        <div className="bg-gradient-to-b from-white to-gray-50 rounded-2xl shadow-lg p-8">
          <Carousel className="w-full">
            <CarouselContent>
              {testimonials.map((testimonial, index) => (
                <CarouselItem key={index} className="md:basis-1/2 lg:basis-1/3 p-2">
                  <TestimonialCard data={testimonial} />
                </CarouselItem>
              ))}
            </CarouselContent>
            <div className="flex justify-center mt-8">
              <CarouselPrevious className="relative static left-0 translate-y-0 mr-4 h-10 w-10" />
              <CarouselNext className="relative static right-0 translate-y-0 ml-4 h-10 w-10" />
            </div>
          </Carousel>
        </div>
      </div>
    </div>
  );
};

export default Testimonial;
