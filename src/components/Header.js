import React from 'react';
import './Header.css';

const Header = () => {
  return (
    <header className="header">
      <h1 className="title">CIM - Crazy Imba Movers</h1>
      <p className="subtitle">The old days are gone, but the bond remains strong</p>
      <p className="description">
        We're no longer in competitive gaming, but we still play Dota in Turbo mode.<br />
        Jobs, families, and life priorities come first, but our friendship endures through every match.
      </p>
    </header>
  );
};

export default Header;