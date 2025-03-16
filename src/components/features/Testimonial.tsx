
import React from 'react';

type TestimonialProps = {
  isIntersecting: boolean;
};

const Testimonial: React.FC<TestimonialProps> = ({ isIntersecting }) => {
  return (
    <div 
      className={`mt-16 bg-white p-6 rounded-2xl shadow-lg max-w-3xl mx-auto transition-all duration-700 delay-700 ${
        isIntersecting ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
      }`}
    >
      <div className="flex flex-col items-center text-center">
        <div className="w-16 h-16 bg-movesync-blue/10 rounded-full flex items-center justify-center mb-4">
          <span className="text-2xl">🇦🇺</span>
        </div>
        <p className="italic text-movesync-gray-dark mb-4">
          "MoveSync made our relocation to Sydney completely stress-free. The AI assistant helped us find the perfect apartment in Bondi, navigate the visa process, and even suggested the best schools for our children. We couldn't have done it without this incredible technology!"
        </p>
        <p className="font-semibold">Sarah & Michael Thompson</p>
        <p className="text-sm text-movesync-gray">Relocated from London to Sydney</p>
      </div>
    </div>
  );
};

export default Testimonial;
