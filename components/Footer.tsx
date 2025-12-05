import React from 'react';

const Footer: React.FC = () => {
  return (
    <footer className="bg-brand-dark border-t border-white/5 py-12">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="mb-4 md:mb-0">
                <span className="text-xl font-bold tracking-tight text-white">
                DropShip <span className="text-brand-cyan">AI</span>
                </span>
                <p className="text-gray-500 text-sm mt-1">© 2024 DropShip AI Inc. All rights reserved.</p>
            </div>
            <div className="flex space-x-6">
                <a href="#" className="text-gray-400 hover:text-white text-sm">Privacy Policy</a>
                <a href="#" className="text-gray-400 hover:text-white text-sm">Terms of Service</a>
                <a href="#" className="text-gray-400 hover:text-white text-sm">Twitter</a>
                <a href="#" className="text-gray-400 hover:text-white text-sm">Instagram</a>
            </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;