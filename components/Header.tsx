import React from 'react';
import { Menu, X, Zap } from 'lucide-react';
import { AppView } from '../types';

interface HeaderProps {
  currentView: AppView;
  onNavigate: (view: AppView, sectionId?: string) => void;
}

const Header: React.FC<HeaderProps> = ({ currentView, onNavigate }) => {
  const [isMenuOpen, setIsMenuOpen] = React.useState(false);

  const handleNavClick = (view: AppView, sectionId?: string) => {
    setIsMenuOpen(false);
    onNavigate(view, sectionId);
  };

  return (
    <nav className="sticky top-0 z-50 w-full border-b border-white/10 bg-brand-dark/80 backdrop-blur-md">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 items-center justify-between">
          <div className="flex items-center gap-2 cursor-pointer" onClick={() => handleNavClick(AppView.LANDING, 'hero')}>
            <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-gradient-to-br from-brand-cyan to-brand-blue">
              <Zap className="h-5 w-5 text-black fill-black" />
            </div>
            <span className="text-xl font-bold tracking-tight text-white">
              DropShip <span className="text-brand-cyan">AI</span>
            </span>
          </div>
          
          <div className="hidden md:block">
            <div className="flex items-center space-x-8">
              <button onClick={() => handleNavClick(AppView.LANDING, 'features')} className="text-sm font-medium text-gray-300 hover:text-white transition-colors">Features</button>
              <button onClick={() => handleNavClick(AppView.LANDING, 'pricing')} className="text-sm font-medium text-gray-300 hover:text-white transition-colors">Pricing</button>
              <button onClick={() => handleNavClick(AppView.HUB)} className={`text-sm font-medium transition-colors ${currentView === AppView.HUB || currentView === AppView.GENERATOR ? 'text-brand-cyan' : 'text-gray-300 hover:text-white'}`}>Generator</button>
              <button onClick={() => handleNavClick(AppView.HUB)} className="rounded-full bg-brand-cyan px-6 py-2 text-sm font-semibold text-black transition-all hover:bg-white hover:shadow-[0_0_15px_rgba(0,255,255,0.5)]">
                Get Free Credits
              </button>
            </div>
          </div>
          
          <div className="-mr-2 flex md:hidden">
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="inline-flex items-center justify-center rounded-md p-2 text-gray-400 hover:bg-gray-700 hover:text-white"
            >
              {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>
        </div>
      </div>

      {isMenuOpen && (
        <div className="md:hidden bg-brand-panel border-b border-white/10">
          <div className="space-y-1 px-2 pb-3 pt-2 sm:px-3">
            <button onClick={() => handleNavClick(AppView.LANDING, 'features')} className="block w-full text-left rounded-md px-3 py-2 text-base font-medium text-gray-300 hover:bg-gray-700 hover:text-white">Features</button>
            <button onClick={() => handleNavClick(AppView.LANDING, 'pricing')} className="block w-full text-left rounded-md px-3 py-2 text-base font-medium text-gray-300 hover:bg-gray-700 hover:text-white">Pricing</button>
            <button onClick={() => handleNavClick(AppView.HUB)} className="block w-full text-left rounded-md px-3 py-2 text-base font-medium text-gray-300 hover:bg-gray-700 hover:text-white">Generator</button>
            <button onClick={() => handleNavClick(AppView.HUB)} className="mt-4 w-full rounded-md bg-brand-cyan px-5 py-3 text-center font-bold text-black">
              Get Free Credits
            </button>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Header;