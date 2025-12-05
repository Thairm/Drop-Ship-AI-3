import React, { useState } from 'react';
import { Image as ImageIcon, Video, Zap, LayoutGrid, Settings, CreditCard, LogOut, ArrowLeft, LayoutTemplate, FileText, BookOpen, Layers, Sparkles, ExternalLink } from 'lucide-react';
import { GenerationMode, AppView } from '../types';

interface DocumentsProps {
  onNavigate: (view: AppView) => void;
  onSelectTool: (mode: GenerationMode) => void;
  onBack: () => void;
}

const Documents: React.FC<DocumentsProps> = ({ onNavigate, onSelectTool, onBack }) => {
  const [activeTab, setActiveTab] = useState<'getting-started' | 'product-images' | 'video-ads' | 'template-guide' | 'credits-pricing'>('getting-started');

  return (
    <div className="flex h-screen bg-brand-dark overflow-hidden">
      
      {/* 1. Main Sidebar Navigation (App Level) */}
      <aside className="w-16 border-r border-white/10 bg-[#0A0A0A] flex flex-col items-center py-6 z-30 shrink-0">
        <div 
          onClick={onBack}
          className="mb-8 flex h-10 w-10 items-center justify-center rounded-lg bg-gradient-to-br from-brand-cyan to-brand-blue cursor-pointer hover:scale-105 transition-transform"
          title="Back to Hub"
        >
          <Zap className="h-5 w-5 text-black fill-black" />
        </div>

        <nav className="flex-1 flex flex-col gap-6 w-full items-center">
          <button onClick={() => onNavigate(AppView.HUB)} className="p-2 text-gray-500 hover:text-white transition-colors" title="Dashboard">
            <LayoutGrid className="h-6 w-6" />
          </button>

          <button onClick={() => onSelectTool(GenerationMode.IMAGE)} className="p-2 text-gray-500 hover:text-white transition-colors" title="Image Generator">
            <ImageIcon className="h-6 w-6" />
          </button>

          <button onClick={() => onSelectTool(GenerationMode.VIDEO)} className="p-2 text-gray-500 hover:text-white transition-colors" title="Video Creator">
            <Video className="h-6 w-6" />
          </button>

          <button onClick={() => onNavigate(AppView.TEMPLATES)} className="p-2 text-gray-500 hover:text-white transition-colors" title="Templates">
            <LayoutTemplate className="h-6 w-6" />
          </button>

          <button className="p-2 text-brand-cyan bg-white/10 rounded-lg shadow-[0_0_10px_rgba(0,255,255,0.2)] transition-colors" title="Documents">
            <FileText className="h-6 w-6" />
          </button>

          <button className="p-2 text-gray-500 hover:text-white transition-colors" title="Billing">
            <CreditCard className="h-6 w-6" />
          </button>
        </nav>

        <div className="flex flex-col gap-6 mb-4">
            <button className="p-2 text-gray-500 hover:text-white transition-colors"><Settings className="h-6 w-6" /></button>
            <button onClick={onBack} className="p-2 text-gray-500 hover:text-red-400 transition-colors"><LogOut className="h-6 w-6" /></button>
        </div>
      </aside>

      {/* 2. Secondary Sidebar: Documentation Menu */}
      <aside className="w-64 bg-[#0F0F0F] border-r border-white/10 hidden md:flex flex-col z-20 shrink-0">
         <div className="h-16 flex items-center px-6 border-b border-white/5">
             <h2 className="text-lg font-bold text-white">Documentation</h2>
         </div>
         
         <div className="flex-1 overflow-y-auto p-4 custom-scrollbar">
             <div className="mb-6">
                 <h3 className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-3 px-2">Guides</h3>
                 <nav className="space-y-1">
                     <button 
                        onClick={() => setActiveTab('getting-started')} 
                        className={`w-full text-left px-3 py-2 text-sm rounded-lg transition-colors flex items-center gap-2 ${activeTab === 'getting-started' ? 'bg-white/10 text-brand-cyan' : 'text-gray-300 hover:text-white hover:bg-white/5'}`}
                     >
                        <BookOpen className="h-4 w-4" /> Getting Started
                     </button>
                     <button 
                        onClick={() => setActiveTab('product-images')} 
                        className={`w-full text-left px-3 py-2 text-sm rounded-lg transition-colors flex items-center gap-2 ${activeTab === 'product-images' ? 'bg-white/10 text-brand-cyan' : 'text-gray-300 hover:text-white hover:bg-white/5'}`}
                     >
                        <ImageIcon className="h-4 w-4" /> Product Images
                     </button>
                     <button 
                        onClick={() => setActiveTab('video-ads')} 
                        className={`w-full text-left px-3 py-2 text-sm rounded-lg transition-colors flex items-center gap-2 ${activeTab === 'video-ads' ? 'bg-white/10 text-brand-cyan' : 'text-gray-300 hover:text-white hover:bg-white/5'}`}
                     >
                        <Video className="h-4 w-4" /> Video Ads
                     </button>
                     <button 
                        onClick={() => setActiveTab('template-guide')} 
                        className={`w-full text-left px-3 py-2 text-sm rounded-lg transition-colors flex items-center gap-2 ${activeTab === 'template-guide' ? 'bg-white/10 text-brand-cyan' : 'text-gray-300 hover:text-white hover:bg-white/5'}`}
                     >
                        <LayoutTemplate className="h-4 w-4" /> Template Guide
                     </button>
                     <button 
                        onClick={() => setActiveTab('credits-pricing')} 
                        className={`w-full text-left px-3 py-2 text-sm rounded-lg transition-colors flex items-center gap-2 ${activeTab === 'credits-pricing' ? 'bg-white/10 text-brand-cyan' : 'text-gray-300 hover:text-white hover:bg-white/5'}`}
                     >
                        <Sparkles className="h-4 w-4" /> Credits & Pricing
                     </button>
                 </nav>
             </div>

             <div className="pt-6 border-t border-white/10">
                 <h3 className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-3 px-2">Resources</h3>
                 <nav className="space-y-1">
                     <a href="#" className="flex items-center justify-between px-3 py-2 text-sm text-gray-400 hover:text-brand-cyan transition-colors group">
                        API Reference <ExternalLink className="h-3 w-3 opacity-0 group-hover:opacity-100 transition-opacity" />
                     </a>
                     <a href="#" className="flex items-center justify-between px-3 py-2 text-sm text-gray-400 hover:text-brand-cyan transition-colors group">
                        Community Guide <ExternalLink className="h-3 w-3 opacity-0 group-hover:opacity-100 transition-opacity" />
                     </a>
                     <a href="#" className="flex items-center justify-between px-3 py-2 text-sm text-gray-400 hover:text-brand-cyan transition-colors group">
                        Help Center <ExternalLink className="h-3 w-3 opacity-0 group-hover:opacity-100 transition-opacity" />
                     </a>
                 </nav>
             </div>
         </div>
      </aside>

      {/* 3. Main Content Area */}
      <main className="flex-1 overflow-y-auto bg-[#050505]">
        <div className="max-w-4xl mx-auto px-8 py-12">
            
            {/* Header */}
            <div className="mb-12">
                <div className="flex items-center gap-2 text-gray-500 text-sm mb-4">
                    <span onClick={() => onNavigate(AppView.HUB)} className="cursor-pointer hover:text-white">Hub</span>
                    <span>/</span>
                    <span className="text-white">Documentation</span>
                </div>
                <h1 className="text-4xl font-extrabold text-white mb-4">How to use DropShip AI</h1>
                <p className="text-xl text-gray-400">Complete guide to creating viral e-commerce assets.</p>
            </div>

            <div className="min-h-[500px]">
                
                {/* Section 1: Getting Started */}
                {activeTab === 'getting-started' && (
                    <section className="animate-in fade-in slide-in-from-bottom-4 duration-500">
                        <div className="flex items-center gap-4 mb-6">
                            <div className="p-3 rounded-lg bg-brand-cyan/10 border border-brand-cyan/20">
                                <BookOpen className="h-6 w-6 text-brand-cyan" />
                            </div>
                            <h2 className="text-2xl font-bold text-white">Getting Started</h2>
                        </div>
                        <div className="bg-brand-panel border border-white/10 rounded-2xl p-8 text-gray-300 leading-relaxed">
                            <p className="mb-4">
                                DropShip AI helps you transform simple product photos into professional marketing assets. 
                                To begin, navigate to the <strong className="text-white">Dashboard</strong> and select either the 
                                Image Generator or Video Creator.
                            </p>
                            <ul className="space-y-3">
                                <li className="flex items-start gap-3">
                                    <div className="h-1.5 w-1.5 rounded-full bg-brand-cyan mt-2 shrink-0" />
                                    <span>Upload a clear photo of your product (white background preferred but not required).</span>
                                </li>
                                <li className="flex items-start gap-3">
                                    <div className="h-1.5 w-1.5 rounded-full bg-brand-cyan mt-2 shrink-0" />
                                    <span>Ensure the product is centered and well-lit.</span>
                                </li>
                                <li className="flex items-start gap-3">
                                    <div className="h-1.5 w-1.5 rounded-full bg-brand-cyan mt-2 shrink-0" />
                                    <span>Supported formats: JPG, PNG, WEBP (Max 5MB).</span>
                                </li>
                            </ul>
                        </div>
                    </section>
                )}

                {/* Section 2: Image Generation */}
                {activeTab === 'product-images' && (
                    <section className="animate-in fade-in slide-in-from-bottom-4 duration-500">
                        <div className="flex items-center gap-4 mb-6">
                            <div className="p-3 rounded-lg bg-purple-500/10 border border-purple-500/20">
                                <ImageIcon className="h-6 w-6 text-purple-400" />
                            </div>
                            <h2 className="text-2xl font-bold text-white">Generating Product Images</h2>
                        </div>
                        <div className="bg-brand-panel border border-white/10 rounded-2xl p-8 text-gray-300 leading-relaxed">
                            <p className="mb-6">
                                Our <strong>AI Product Photography</strong> tool places your product in any environment you can imagine.
                            </p>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                <div className="bg-black/40 p-5 rounded-xl border border-white/5">
                                    <h3 className="text-white font-semibold mb-2">1. Select Model</h3>
                                    <p className="text-sm">
                                        Use <strong>Gemini Flash</strong> for fast results or <strong>Nano Banana Pro</strong> for 4K high-fidelity marketing shots.
                                    </p>
                                </div>
                                <div className="bg-black/40 p-5 rounded-xl border border-white/5">
                                    <h3 className="text-white font-semibold mb-2">2. Write a Prompt</h3>
                                    <p className="text-sm">
                                        Describe the scene clearly. Example: <em className="text-brand-cyan">"A perfume bottle on a wooden table in a sunlit garden, bokeh background."</em>
                                    </p>
                                </div>
                            </div>
                        </div>
                    </section>
                )}

                 {/* Section 3: Video Creation */}
                 {activeTab === 'video-ads' && (
                    <section className="animate-in fade-in slide-in-from-bottom-4 duration-500">
                        <div className="flex items-center gap-4 mb-6">
                            <div className="p-3 rounded-lg bg-brand-blue/10 border border-brand-blue/20">
                                <Video className="h-6 w-6 text-brand-blue" />
                            </div>
                            <h2 className="text-2xl font-bold text-white">Creating Video Ads</h2>
                        </div>
                        <div className="bg-brand-panel border border-white/10 rounded-2xl p-8 text-gray-300 leading-relaxed">
                            <p className="mb-6">
                                Turn static images into engaging video content for social media using the <strong>Veo</strong> model.
                            </p>
                             <ul className="space-y-3">
                                <li className="flex items-start gap-3">
                                    <div className="h-1.5 w-1.5 rounded-full bg-brand-blue mt-2 shrink-0" />
                                    <span>Best for: TikTok, Instagram Reels, YouTube Shorts.</span>
                                </li>
                                <li className="flex items-start gap-3">
                                    <div className="h-1.5 w-1.5 rounded-full bg-brand-blue mt-2 shrink-0" />
                                    <span>Select <strong>9:16 Aspect Ratio</strong> for mobile-first content.</span>
                                </li>
                                <li className="flex items-start gap-3">
                                    <div className="h-1.5 w-1.5 rounded-full bg-brand-blue mt-2 shrink-0" />
                                    <span>Describe the motion in your prompt (e.g., "Slow camera pan", "Water splashing").</span>
                                </li>
                                <li className="flex items-start gap-3">
                                    <div className="h-1.5 w-1.5 rounded-full bg-brand-blue mt-2 shrink-0" />
                                    <span className="text-brand-cyan">Note: Video generation requires more credits than images.</span>
                                </li>
                            </ul>
                        </div>
                    </section>
                )}

                {/* Section 4: Template Guide */}
                {activeTab === 'template-guide' && (
                    <section className="animate-in fade-in slide-in-from-bottom-4 duration-500">
                        <div className="flex items-center gap-4 mb-6">
                            <div className="p-3 rounded-lg bg-pink-500/10 border border-pink-500/20">
                                <LayoutTemplate className="h-6 w-6 text-pink-400" />
                            </div>
                            <h2 className="text-2xl font-bold text-white">Template Guide</h2>
                        </div>
                        <div className="bg-brand-panel border border-white/10 rounded-2xl p-8 text-gray-300 leading-relaxed">
                            <p className="mb-6">
                                Our <strong>Templates</strong> provide pre-engineered prompts and settings to get you started quickly with high-quality results.
                            </p>
                            <div className="grid grid-cols-1 gap-4">
                                <div className="p-4 bg-white/5 rounded-xl border border-white/5">
                                    <h3 className="text-white font-semibold mb-2 flex items-center gap-2">
                                        <ImageIcon className="h-4 w-4 text-brand-cyan" /> Image Templates
                                    </h3>
                                    <p className="text-sm mb-2">
                                        Designed for specific aesthetics like "Luxury Minimalism" or "Nature's Touch". These templates pre-configure the AI model, aspect ratio, and provide a base prompt structure you can modify.
                                    </p>
                                </div>
                                 <div className="p-4 bg-white/5 rounded-xl border border-white/5">
                                    <h3 className="text-white font-semibold mb-2 flex items-center gap-2">
                                        <Video className="h-4 w-4 text-brand-blue" /> Video Templates
                                    </h3>
                                    <p className="text-sm mb-2">
                                        Optimized for motion. Templates like "Cinematic Pan" or "Dynamic Splash" ensure the video model understands the specific movement required for the shot.
                                    </p>
                                </div>
                            </div>
                            <p className="mt-6 text-sm text-gray-400">
                                To use a template, navigate to the <strong>Templates</strong> page from the sidebar, browse the gallery, and click "Use Template" to load it into the Generator.
                            </p>
                        </div>
                    </section>
                )}

                 {/* Section 5: Credits & Pricing */}
                 {activeTab === 'credits-pricing' && (
                    <section className="animate-in fade-in slide-in-from-bottom-4 duration-500">
                        <div className="flex items-center gap-4 mb-6">
                            <div className="p-3 rounded-lg bg-yellow-500/10 border border-yellow-500/20">
                                <Sparkles className="h-6 w-6 text-yellow-500" />
                            </div>
                            <h2 className="text-2xl font-bold text-white">Credits & Pricing</h2>
                        </div>
                        <div className="bg-brand-panel border border-white/10 rounded-2xl p-8 text-gray-300 leading-relaxed">
                            <p className="mb-6">
                                DropShip AI operates on a simple credit system.
                            </p>
                            <div className="flex flex-col gap-3">
                                <div className="flex justify-between items-center p-4 bg-white/5 rounded-xl border border-white/5">
                                    <span className="font-medium text-white">Standard Image Generation</span>
                                    <span className="font-mono text-brand-cyan bg-brand-cyan/10 px-3 py-1 rounded">1 Credit</span>
                                </div>
                                 <div className="flex justify-between items-center p-4 bg-white/5 rounded-xl border border-white/5">
                                    <span className="font-medium text-white">High-Res (4K) Image</span>
                                    <span className="font-mono text-brand-cyan bg-brand-cyan/10 px-3 py-1 rounded">3 Credits</span>
                                </div>
                                 <div className="flex justify-between items-center p-4 bg-white/5 rounded-xl border border-white/5">
                                    <span className="font-medium text-white">Video Generation (Veo)</span>
                                    <span className="font-mono text-brand-cyan bg-brand-cyan/10 px-3 py-1 rounded">20 Credits</span>
                                </div>
                            </div>
                        </div>
                    </section>
                )}

            </div>
        </div>
      </main>
    </div>
  );
};

export default Documents;