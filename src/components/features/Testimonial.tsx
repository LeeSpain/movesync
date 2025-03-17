
import React from 'react';
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { Card, CardContent } from "@/components/ui/card";

type TestimonialProps = {
  isIntersecting: boolean;
};

interface TestimonialData {
  icon: string;
  iconBg: string;
  quote: string;
  name: string;
  location: string;
}

const testimonials: TestimonialData[] = [
  {
    icon: "🇦🇺",
    iconBg: "bg-movesync-blue/10",
    quote: "MoveSync made our relocation to Sydney completely stress-free. The AI assistant helped us find the perfect apartment in Bondi, navigate the visa process, and even suggested the best schools for our children. We couldn't have done it without this incredible technology!",
    name: "Sarah & Michael Thompson",
    location: "Relocated from London to Sydney"
  },
  {
    icon: "🏙️",
    iconBg: "bg-green-100",
    quote: "As a Melbourne local moving to Brisbane for work, I was worried about finding the right neighborhood and making new connections. MoveSync's AI found me the perfect apartment near my new office and connected me with local community groups. The interstate move was smoother than I ever expected!",
    name: "David Chen",
    location: "Relocated from Melbourne to Brisbane"
  },
  {
    icon: "🌉",
    iconBg: "bg-amber-100",
    quote: "When my tech company transferred me to Melbourne, I had just 4 weeks to move my entire family from San Francisco. MoveSync's personalized relocation timeline and school recommendations were invaluable. Our transition was seamless despite the short timeframe!",
    name: "Jennifer Kumar",
    location: "Relocated from San Francisco to Melbourne"
  },
  {
    icon: "🏖️",
    iconBg: "bg-rose-100",
    quote: "After retiring, we dreamed of moving to the Gold Coast but were overwhelmed by the logistics. MoveSync helped us understand the financial implications, find the perfect beachside property, and connect with local retirement communities. We're loving our new Australian lifestyle!",
    name: "Robert & June Wilson",
    location: "Relocated from Toronto to Gold Coast"
  },
  {
    icon: "🏫",
    iconBg: "bg-purple-100",
    quote: "Moving to Perth for my PhD was incredibly daunting as an international student. MoveSync guided me through the student visa process, found affordable housing near my university, and even helped me open an Australian bank account before arrival. I couldn't recommend it more highly!",
    name: "Akira Tanaka",
    location: "Relocated from Tokyo to Perth"
  }
];

const TestimonialCard: React.FC<{ data: TestimonialData }> = ({ data }) => (
  <div className="flex flex-col items-center text-center px-4">
    <div className={`w-16 h-16 ${data.iconBg} rounded-full flex items-center justify-center mb-4`}>
      <span className="text-2xl">{data.icon}</span>
    </div>
    <p className="italic text-movesync-gray-dark mb-4">
      "{data.quote}"
    </p>
    <p className="font-semibold">{data.name}</p>
    <p className="text-sm text-movesync-gray">{data.location}</p>
  </div>
);

const Testimonial: React.FC<TestimonialProps> = ({ isIntersecting }) => {
  return (
    <div 
      className={`mt-16 bg-white p-6 rounded-2xl shadow-lg max-w-5xl mx-auto transition-all duration-700 delay-700 ${
        isIntersecting ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
      }`}
    >
      <h2 className="text-3xl font-bold text-center mb-8">What Our Users Say</h2>
      
      <Carousel className="w-full max-w-4xl mx-auto">
        <CarouselContent>
          {testimonials.map((testimonial, index) => (
            <CarouselItem key={index} className="md:basis-full">
              <Card className="border-none shadow-none">
                <CardContent className="p-0">
                  <TestimonialCard data={testimonial} />
                </CardContent>
              </Card>
            </CarouselItem>
          ))}
        </CarouselContent>
        <div className="flex justify-center mt-6">
          <CarouselPrevious className="relative static left-0 translate-y-0 mr-2" />
          <CarouselNext className="relative static right-0 translate-y-0 ml-2" />
        </div>
      </Carousel>
    </div>
  );
};

export default Testimonial;
