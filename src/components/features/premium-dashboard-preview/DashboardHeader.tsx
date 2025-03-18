
const DashboardHeader = () => {
  return (
    <div className="text-center mb-12">
      <div className="inline-flex items-center rounded-full bg-movesync-blue/10 px-3 py-1 text-sm font-medium text-movesync-blue mb-4">
        <span className="animate-pulse-light mr-1">•</span> Premium Dashboard Access
      </div>
      <h2 className="heading-lg mb-4">
        Your Premium <span className="text-gradient-aussie">Australian Dashboard</span>
      </h2>
      <p className="text-movesync-gray-dark text-lg max-w-3xl mx-auto">
        Gain instant access to all the tools you need for a seamless Australian relocation. Our premium dashboard
        integrates all essential services in one place - from property hunting to visa tracking.
      </p>
    </div>
  );
};

export default DashboardHeader;
