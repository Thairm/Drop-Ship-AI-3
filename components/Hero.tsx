import React from 'react';
import { ArrowRight, Sparkles, Image as ImageIcon, Video } from 'lucide-react';

interface HeroProps {
  onStart: () => void;
}

const Hero: React.FC<HeroProps> = ({ onStart }) => {
  return (
    <div id="hero" className="relative overflow-hidden bg-brand-dark pt-16 pb-24 md:pt-32 md:pb-32">
      {/* Background decoration */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-7xl h-full opacity-30 pointer-events-none">
         <div className="absolute top-[-10%] left-[20%] w-96 h-96 bg-brand-blue/40 rounded-full blur-[100px]" />
         <div className="absolute top-[10%] right-[10%] w-72 h-72 bg-brand-cyan/30 rounded-full blur-[80px]" />
      </div>

      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 flex flex-col items-center text-center">
        <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-brand-cyan/30 bg-brand-cyan/10 px-4 py-1.5 text-sm font-medium text-brand-cyan">
          <Sparkles className="h-4 w-4" />
          <span>New: Veo Video Generation Available</span>
        </div>
        
        <h1 className="max-w-4xl text-5xl font-extrabold tracking-tight text-white md:text-7xl">
          Generate Viral <br />
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-brand-cyan to-brand-blue">E-commerce Visuals</span> in Seconds.
        </h1>
        
        <p className="mt-6 max-w-2xl text-lg text-gray-400 md:text-xl">
          Stop wasting time and money on photoshoots. DropShip AI creates high-converting lifestyle content and video ads from a single product photo.
        </p>

        <p className="mt-4 text-base font-semibold text-brand-blue/90 md:text-lg tracking-wide uppercase">
          Best for E-Commerce and Dropshipping
        </p>
        
        <div className="mt-10 flex flex-col gap-4 sm:flex-row sm:justify-center">
          <button 
            onClick={onStart}
            className="group relative inline-flex items-center justify-center gap-2 overflow-hidden rounded-full bg-brand-cyan px-8 py-4 text-base font-bold text-black transition-all hover:bg-white hover:scale-105 hover:shadow-[0_0_20px_rgba(0,255,255,0.4)]"
          >
            Start Generating Free
            <ArrowRight className="h-5 w-5 transition-transform group-hover:translate-x-1" />
          </button>
        </div>

        {/* Visual Mockup */}
        <div className="mt-20 w-full max-w-5xl">
            <div className="relative rounded-2xl border border-white/10 bg-brand-panel p-2 shadow-2xl shadow-brand-blue/20">
                <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-brand-cyan/50 to-transparent" />
                <div className="aspect-[16/9] w-full overflow-hidden rounded-xl bg-gray-900 relative flex items-center justify-center group">
                    {/* Simulated Interface */}
                    <div className="absolute inset-0 flex">
                        <div className="w-1/3 border-r border-white/5 p-6 flex flex-col gap-4">
                            <div className="h-40 rounded-lg bg-gray-800 border-2 border-dashed border-gray-700 flex items-center justify-center">
                                <ImageIcon className="h-8 w-8 text-gray-600" />
                            </div>
                            <div className="h-8 w-full rounded bg-gray-800/50" />
                            <div className="h-8 w-3/4 rounded bg-gray-800/50" />
                            <div className="mt-auto h-10 w-full rounded bg-brand-blue/20" />
                        </div>
                        <div className="w-2/3 p-6 flex items-center justify-center bg-[url('https://picsum.photos/1200/800?grayscale')] bg-cover bg-center opacity-50 group-hover:opacity-100 transition-opacity duration-700">
                             <div className="absolute inset-0 flex items-center justify-center">
                                <div className="bg-black/60 backdrop-blur-md rounded-xl p-4 flex items-center gap-3">
                                    <Video className="h-6 w-6 text-brand-cyan animate-pulse" />
                                    <span className="text-white font-mono text-sm">Generating Video Ad...</span>
                                </div>
                             </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
      </div>
    </div>
  );
};

export default Hero;