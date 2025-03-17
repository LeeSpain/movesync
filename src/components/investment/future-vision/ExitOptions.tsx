
import React from 'react';

const ExitOptions: React.FC = () => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
      <div className="bg-white p-5 rounded-xl border border-amber-100 shadow-sm">
        <h4 className="font-bold text-lg mb-3 flex items-center">
          <span className="text-2xl mr-2">🏢</span>
          Strategic Acquisition
        </h4>
        <p className="text-sm text-gray-600 mb-3">
          Position MoveSync as an attractive acquisition target for major tech companies or established relocation firms looking to acquire our technology and market share.
        </p>
        <div className="bg-amber-50 p-2 rounded-lg text-center">
          <span className="font-semibold text-amber-800 text-sm">Potential 5-7x return on investment</span>
        </div>
      </div>
      
      <div className="bg-white p-5 rounded-xl border border-amber-100 shadow-sm">
        <h4 className="font-bold text-lg mb-3 flex items-center">
          <span className="text-2xl mr-2">📈</span>
          IPO Opportunity
        </h4>
        <p className="text-sm text-gray-600 mb-3">
          If market conditions are favorable and we meet growth targets, pursuing an Initial Public Offering to provide liquidity to early investors.
        </p>
        <div className="bg-amber-50 p-2 rounded-lg text-center">
          <span className="font-semibold text-amber-800 text-sm">Potentially 8-10x return on investment</span>
        </div>
      </div>
    </div>
  );
};

export default ExitOptions;
