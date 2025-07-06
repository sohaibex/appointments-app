import React, { useState } from 'react';
import { Calendar, X, Menu, LogOut } from 'lucide-react';

const Header = ({ userType, onLogout }) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  
  return (
    <header className="bg-gradient-to-r from-blue-600 to-blue-800 text-white shadow-lg">
      <div className="container mx-auto px-4 py-4">
        <div className="flex justify-between items-center">
          <div className="flex items-center space-x-2">
            <Calendar className="w-8 h-8" />
            <h1 className="text-2xl font-bold">Planification RDV</h1>
          </div>
          
          <nav className="hidden md:flex items-center space-x-6">
            {userType === 'client' && <span className="text-sm">Espace Client</span>}
            {userType === 'planning' && <span className="text-sm">Service Planification</span>}
            {userType === 'admin' && <span className="text-sm">Super Admin</span>}
            {userType && (
              <button onClick={onLogout} className="flex items-center space-x-2 hover:text-blue-200 transition">
                <LogOut className="w-4 h-4" />
                <span>Déconnexion</span>
              </button>
            )}
          </nav>
          
          <button 
            className="md:hidden"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          >
            {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
        
        {mobileMenuOpen && (
          <nav className="mt-4 py-4 border-t border-blue-700 md:hidden">
            {userType && (
              <button onClick={onLogout} className="flex items-center space-x-2 hover:text-blue-200 transition">
                <LogOut className="w-4 h-4" />
                <span>Déconnexion</span>
              </button>
            )}
          </nav>
        )}
      </div>
    </header>
  );
};

export default Header;