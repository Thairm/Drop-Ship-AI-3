import React from 'react';
import { Image as ImageIcon, Video, ArrowRight, Sparkles, Zap, LayoutGrid, Settings, CreditCard, LogOut, ArrowLeft, LayoutTemplate, FileText } from 'lucide-react';
import { GenerationMode, AppView } from '../types';

interface HubProps {
  onSelectTool: (mode: GenerationMode) => void;
  onNavigate: (view: AppView) => void;
  onBack: () => void;
}

const Hub: React.FC<HubProps> = ({ onSelectTool, onNavigate, onBack }) => {
  return (
    <div className="flex h-screen bg-brand-dark overflow-hidden">
      
      {/* Sidebar Navigation */}
      <aside className="w-20 lg:w-24 border-r border-white/10 bg-brand-panel flex flex-col items-center py-8 z-20">
        <div 
          onClick={onBack}
          className="mb-12 flex h-10 w-10 items-center justify-center rounded-lg bg-gradient-to-br from-brand-cyan to-brand-blue cursor-pointer hover:scale-110 transition-transform"
        >
          <Zap className="h-6 w-6 text-black fill-black" />
        </div>

        <nav className="flex-1 flex flex-col gap-8 w-full items-center">
          <button 
            onClick={() => onNavigate(AppView.HUB)}
            className="group relative p-3 rounded-xl bg-white/10 text-brand-cyan shadow-[0_0_15px_rgba(0,255,255,0.2)]"
          >
            <LayoutGrid className="h-6 w-6" />
            <span className="absolute left-full ml-4 rounded-md bg-gray-900 px-2 py-1 text-xs text-white opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap z-50 pointer-events-none">Dashboard</span>
          </button>

          <button 
            onClick={() => onSelectTool(GenerationMode.IMAGE)}
            className="group relative p-3 rounded-xl text-gray-400 hover:text-white hover:bg-white/5 transition-colors"
          >
            <ImageIcon className="h-6 w-6" />
            <span className="absolute left-full ml-4 rounded-md bg-gray-900 px-2 py-1 text-xs text-white opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap z-50 pointer-events-none">Image Generator</span>
          </button>

          <button 
            onClick={() => onSelectTool(GenerationMode.VIDEO)}
            className="group relative p-3 rounded-xl text-gray-400 hover:text-white hover:bg-white/5 transition-colors"
          >
            <Video className="h-6 w-6" />
            <span className="absolute left-full ml-4 rounded-md bg-gray-900 px-2 py-1 text-xs text-white opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap z-50 pointer-events-none">Video Creator</span>
          </button>

          <button 
            onClick={() => onNavigate(AppView.TEMPLATES)}
            className="group relative p-3 rounded-xl text-gray-400 hover:text-white hover:bg-white/5 transition-colors"
          >
            <LayoutTemplate className="h-6 w-6" />
            <span className="absolute left-full ml-4 rounded-md bg-gray-900 px-2 py-1 text-xs text-white opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap z-50 pointer-events-none">Templates</span>
          </button>

          <button 
            onClick={() => onNavigate(AppView.DOCUMENTS)}
            className="group relative p-3 rounded-xl text-gray-400 hover:text-white hover:bg-white/5 transition-colors"
          >
            <FileText className="h-6 w-6" />
            <span className="absolute left-full ml-4 rounded-md bg-gray-900 px-2 py-1 text-xs text-white opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap z-50 pointer-events-none">Documents</span>
          </button>

          <button className="group relative p-3 rounded-xl text-gray-400 hover:text-white hover:bg-white/5 transition-colors">
            <CreditCard className="h-6 w-6" />
            <span className="absolute left-full ml-4 rounded-md bg-gray-900 px-2 py-1 text-xs text-white opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap z-50 pointer-events-none">Billing</span>
          </button>
        </nav>

        <div className="flex flex-col gap-6 w-full items-center mt-auto">
          <button className="group relative p-3 rounded-xl text-gray-400 hover:text-white hover:bg-white/5 transition-colors">
            <Settings className="h-6 w-6" />
            <span className="absolute left-full ml-4 rounded-md bg-gray-900 px-2 py-1 text-xs text-white opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap z-50 pointer-events-none">Settings</span>
          </button>
          <button 
            onClick={onBack}
            className="group relative p-3 rounded-xl text-gray-400 hover:text-red-400 hover:bg-red-900/10 transition-colors"
          >
            <LogOut className="h-6 w-6" />
            <span className="absolute left-full ml-4 rounded-md bg-gray-900 px-2 py-1 text-xs text-white opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap z-50 pointer-events-none">Exit Hub</span>
          </button>
        </div>
      </aside>

      {/* Main Content Area */}
      <main className="flex-1 overflow-y-auto relative bg-brand-dark">
        <div className="mx-auto max-w-7xl px-8 py-12">
          
          {/* Top Bar with Back Button */}
          <div className="flex items-center gap-4 mb-12">
            <button 
              onClick={onBack} 
              className="flex items-center gap-2 text-gray-400 hover:text-brand-cyan transition-colors group"
            >
              <ArrowLeft className="h-6 w-6 group-hover:-translate-x-1 transition-transform" />
              <span className="text-sm font-medium">Back to Home</span>
            </button>
          </div>

          <div className="flex flex-col items-center animate-in fade-in slide-in-from-bottom-4 duration-500">
            <div className="text-center mb-12 max-w-3xl">
              <h1 className="text-4xl font-extrabold text-white sm:text-5xl tracking-tight mb-4">
                Creative <span className="text-transparent bg-clip-text bg-gradient-to-r from-brand-cyan to-brand-blue">Hub</span>
              </h1>
              <p className="text-xl text-gray-400">
                Select a tool to start creating viral e-commerce assets.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-5xl w-full">
              {/* Image Generation Card */}
              <div 
                onClick={() => onSelectTool(GenerationMode.IMAGE)}
                className="group relative cursor-pointer overflow-hidden rounded-3xl border border-white/10 bg-brand-panel p-8 transition-all duration-300 hover:-translate-y-2 hover:border-brand-cyan/50 hover:shadow-[0_0_40px_rgba(0,255,255,0.15)]"
              >
                <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:opacity-20 transition-opacity">
                  <ImageIcon className="h-32 w-32" />
                </div>
                
                <div className="relative z-10 flex flex-col h-full">
                  <div className="mb-6 inline-flex h-14 w-14 items-center justify-center rounded-2xl bg-gradient-to-br from-gray-800 to-black border border-white/10 group-hover:border-brand-cyan/30 transition-colors">
                    <ImageIcon className="h-7 w-7 text-white group-hover:text-brand-cyan" />
                  </div>
                  
                  <h3 className="text-2xl font-bold text-white mb-3">AI Product Photography</h3>
                  <p className="text-gray-400 mb-8 flex-grow">
                    Instantly replace backgrounds and place your products in realistic lifestyle scenes. Perfect for website listings.
                  </p>
                  
                  <div className="flex items-center text-brand-cyan font-bold group-hover:text-white transition-colors">
                    Create Images <ArrowRight className="ml-2 h-5 w-5 transition-transform group-hover:translate-x-1" />
                  </div>
                </div>
              </div>

              {/* Video Generation Card */}
              <div 
                onClick={() => onSelectTool(GenerationMode.VIDEO)}
                className="group relative cursor-pointer overflow-hidden rounded-3xl border border-white/10 bg-brand-panel p-8 transition-all duration-300 hover:-translate-y-2 hover:border-brand-blue/50 hover:shadow-[0_0_40px_rgba(59,130,246,0.15)]"
              >
                <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:opacity-20 transition-opacity">
                  <Video className="h-32 w-32" />
                </div>
                
                <div className="relative z-10 flex flex-col h-full">
                  <div className="mb-6 inline-flex h-14 w-14 items-center justify-center rounded-2xl bg-gradient-to-br from-gray-800 to-black border border-white/10 group-hover:border-brand-blue/30 transition-colors">
                    <Video className="h-7 w-7 text-white group-hover:text-brand-blue" />
                  </div>
                  
                  <div className="flex items-center gap-3 mb-3">
                      <h3 className="text-2xl font-bold text-white">Video Ads Creator</h3>
                      <span className="px-2 py-0.5 rounded text-xs font-bold bg-brand-cyan text-black">NEW</span>
                  </div>
                  <p className="text-gray-400 mb-8 flex-grow">
                    Turn static images into high-converting 10-second video ads for TikTok & Reels using the Veo model.
                  </p>
                  
                  <div className="flex items-center text-brand-blue font-bold group-hover:text-white transition-colors">
                    Create Videos <ArrowRight className="ml-2 h-5 w-5 transition-transform group-hover:translate-x-1" />
                  </div>
                </div>
              </div>
            </div>
            
            <div className="mt-16 p-6 rounded-2xl bg-white/5 border border-white/10 max-w-5xl w-full flex flex-col md:flex-row items-center justify-between gap-6">
              <div className="flex items-center gap-4">
                  <div className="h-10 w-10 rounded-full bg-yellow-500/20 flex items-center justify-center text-yellow-500">
                      <Sparkles className="h-5 w-5" />
                  </div>
                  <div>
                      <h4 className="text-white font-semibold">Free Credits Available</h4>
                      <p className="text-sm text-gray-400">You have 5 free generations remaining today.</p>
                  </div>
              </div>
              <button className="px-6 py-2 rounded-full bg-white/10 text-white hover:bg-white text-sm font-medium hover:text-black transition-all">
                  View Pricing
              </button>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Hub;