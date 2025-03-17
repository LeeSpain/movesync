
interface PricingHeaderProps {
  isIntersecting: boolean;
}

const PricingHeader = ({ isIntersecting }: PricingHeaderProps) => {
  return (
    <div 
      className={`max-w-3xl mx-auto text-center mb-16 transition-all duration-700 ${
        isIntersecting ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
      }`}
    >
      <h2 className="heading-lg mb-4">
        Simple, Transparent <span className="text-gradient">Pricing</span>
      </h2>
      <p className="text-movesync-gray-dark text-lg">
        MoveSync offers a straightforward pricing model designed to make relocation
        accessible to everyone. Start for free or unlock all features with Premium.
      </p>
    </div>
  );
};

export default PricingHeader;
