
import React from 'react';
import { Link } from 'react-router-dom';

export const NavbarLogo = () => {
  return (
    <Link to="/" className="flex items-center">
      <span className="text-2xl font-bold text-movesync-black">
        Move-<span className="text-movesync-blue">Sync</span>
      </span>
    </Link>
  );
};

export default NavbarLogo;
