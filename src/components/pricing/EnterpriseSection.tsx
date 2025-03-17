
interface EnterpriseSectionProps {
  isIntersecting: boolean;
}

const EnterpriseSection = ({ isIntersecting }: EnterpriseSectionProps) => {
  return (
    <div 
      className={`mt-16 max-w-3xl mx-auto text-center bg-movesync-gray-light rounded-xl p-6 md:p-8 transition-all duration-700 delay-500 ${
        isIntersecting ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
      }`}
    >
      <h3 className="text-xl font-semibold mb-4">Enterprise Solutions</h3>
      <p className="text-movesync-gray-dark mb-6">
        Looking for a custom solution for your business? MoveSync offers API and B2B licensing options 
        for HR departments, relocation agencies, and real estate firms.
      </p>
      <a 
        href="#" 
        className="btn-secondary inline-flex"
      >
        Contact for Enterprise
      </a>
    </div>
  );
};

export default EnterpriseSection;
