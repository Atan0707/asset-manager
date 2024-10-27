import { Link } from 'react-router-dom';

import Wallet from './connectWallet';

const Navbar = () => {
  return (
    <nav className="navbar flex justify-between items-center">
      <Link to="/" className="navbar-brand">Asset Manager</Link>
      <div className="navbar-menu flex items-center gap-4">
        <Link to="/" className="navbar-item">Home</Link>
        <Wallet />
      </div>
    </nav>
  );
};



export default Navbar;

