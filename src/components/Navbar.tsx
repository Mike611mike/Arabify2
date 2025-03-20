
import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Book, BookOpen, Plus, Gamepad2 } from 'lucide-react';

const Navbar: React.FC = () => {
  const location = useLocation();

  const isActive = (path: string) => location.pathname === path;

  return (
    <nav className="fixed bottom-0 left-0 right-0 bg-black bg-opacity-95 backdrop-blur-lg p-2 z-50">
      <div className="container max-w-md mx-auto">
        <div className="flex justify-around items-center">
          <NavItem 
            to="/" 
            icon={<Book size={24} />} 
            label="Home" 
            isActive={isActive('/')} 
          />
          <NavItem 
            to="/review" 
            icon={<BookOpen size={24} />} 
            label="Review" 
            isActive={isActive('/review')} 
          />
          <NavItem 
            to="/add" 
            icon={<Plus size={24} />} 
            label="Add" 
            isActive={isActive('/add')} 
          />
          <NavItem 
            to="/quiz" 
            icon={<Gamepad2 size={24} />} 
            label="Games" 
            isActive={isActive('/quiz')} 
          />
        </div>
      </div>
    </nav>
  );
};

interface NavItemProps {
  to: string;
  icon: React.ReactNode;
  label: string;
  isActive: boolean;
}

const NavItem: React.FC<NavItemProps> = ({ to, icon, label, isActive }) => {
  return (
    <Link 
      to={to} 
      className={`flex flex-col items-center py-2 px-3 rounded-lg transition-all duration-300 ${
        isActive 
          ? 'text-spotify-green' 
          : 'text-spotify-text hover:text-spotify-white'
      }`}
    >
      <div className="mb-1">
        {icon}
      </div>
      <span className="text-xs font-medium">{label}</span>
    </Link>
  );
};

export default Navbar;
