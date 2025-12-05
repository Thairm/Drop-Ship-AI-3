import React, { useState } from 'react';
import { Image as ImageIcon, Video, Zap, LayoutGrid, Settings, CreditCard, LogOut, ArrowLeft, LayoutTemplate, FileText, Search, Filter } from 'lucide-react';
import { GenerationMode, AppView } from '../types';

interface TemplatesProps {
  onSelectTemplate: (mode: GenerationMode, prompt: string) => void;
  onNavigate: (view: AppView) => void;
  onSelectTool: (mode: GenerationMode) => void;
  onBack: () => void;
}

const Templates: React.FC<TemplatesProps> = ({ onSelectTemplate, onNavigate, onSelectTool, onBack }) => {
  const [filter, setFilter] = useState<'ALL' | 'IMAGE' | 'VIDEO'>('ALL');

  const templates = [
    {
      id: 1,
      mode: GenerationMode.IMAGE,
      title: "Luxury Minimalism",
      description: "Clean, high-end studio lighting with soft shadows on a marble surface.",
      prompt: "Product on a white marble podium, soft luxury studio lighting, minimalist background, high contrast, photorealistic, 4k.",
      imageUrl: "https://images.unsplash.com/photo-1596462502278-27bfdd403cc2?q=80&w=2535&auto=format&fit=crop"
    },
    {
      id: 2,
      mode: GenerationMode.IMAGE,
      title: "Nature's Touch",
      description: "Organic setting with leaves, wood textures, and warm natural sunlight.",
      prompt: "Product surrounded by tropical green leaves, wooden textured surface, dappled sunlight, organic and natural feel, shallow depth of field.",
      imageUrl: "https://images.unsplash.com/photo-1542038784424-48ed95430170?q=80&w=2674&auto=format&fit=crop"
    },
    {
      id: 3,
      mode: GenerationMode.IMAGE,
      title: "Neon Cyberpunk",
      description: "Futuristic glow with pink and blue neon lights for tech products.",
      prompt: "Product in a futuristic cyberpunk city street, neon pink and blue lighting, wet pavement reflections, night time, cinematic.",
      imageUrl: "https://images.unsplash.com/photo-1635776063328-153b13e3c645?q=80&w=2664&auto=format&fit=crop"
    },
    {
      id: 4,
      mode: GenerationMode.VIDEO,
      title: "Cinematic Pan",
      description: "Slow, smooth camera movement around the product.",
      prompt: "Cinematic slow motion pan around the product, golden hour lighting, high quality commercial style.",
      imageUrl: "https://images.unsplash.com/photo-1516035069371-29a1b244cc32?q=80&w=2255&auto=format&fit=crop"
    },
    {
      id: 5,
      mode: GenerationMode.VIDEO,
      title: "Dynamic Splash",
      description: "High energy water splash effect for beverages or waterproof items.",
      prompt: "Dynamic slow motion video of water splashing around the product, fresh, clean, high speed camera, studio lighting.",
      imageUrl: "https://images.unsplash.com/photo-1555445054-01888e2808c1?q=80&w=2574&auto=format&fit=crop"
    },
    {
      id: 6,
      mode: GenerationMode.IMAGE,
      title: "Kitchen Lifestyle",
      description: "Warm, cozy kitchen counter setting for food or appliances.",
      prompt: "Product sitting on a modern kitchen counter, blurred background of a cozy home kitchen, morning light, lifestyle photography.",
      imageUrl: "https://images.unsplash.com/photo-1556910103-1c02745a30bf?q=80&w=2670&auto=format&fit=crop"
    }
  ];

  const filteredTemplates = templates.filter(t => {
    if (filter === 'ALL') return true;
    return t.mode === filter;
  });

  return (
    <div className="flex h-screen bg-brand-dark overflow-hidden">
      
      {/* Sidebar Navigation (Consistent with Hub) */}
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
            className="group relative p-3 rounded-xl text-gray-400 hover:text-white hover:bg-white/5 transition-colors"
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
            className="group relative p-3 rounded-xl bg-white/10 text-brand-cyan shadow-[0_0_15px_rgba(0,255,255,0.2)]"
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
      <main className="flex-1 overflow-y-auto bg-brand-dark">
        <div className="mx-auto max-w-7xl px-8 py-12">
            <div className="flex items-center gap-4 mb-8">
                <button 
                onClick={() => onNavigate(AppView.HUB)} 
                className="flex items-center gap-2 text-gray-400 hover:text-brand-cyan transition-colors group"
                >
                <ArrowLeft className="h-6 w-6 group-hover:-translate-x-1 transition-transform" />
                <span className="text-sm font-medium">Back to Hub</span>
                </button>
            </div>

            <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-10 gap-4">
                <div>
                    <h1 className="text-3xl font-bold text-white mb-2">Creative Templates</h1>
                    <p className="text-gray-400">Jumpstart your viral campaigns with pre-engineered prompts.</p>
                </div>
                
                <div className="flex items-center gap-2 bg-brand-panel p-1 rounded-lg border border-white/10">
                    <button 
                        onClick={() => setFilter('ALL')}
                        className={`px-4 py-2 rounded-md text-sm font-medium transition-all ${filter === 'ALL' ? 'bg-gray-800 text-white' : 'text-gray-400 hover:text-white'}`}
                    >
                        All
                    </button>
                    <button 
                        onClick={() => setFilter('IMAGE')}
                        className={`flex items-center gap-2 px-4 py-2 rounded-md text-sm font-medium transition-all ${filter === 'IMAGE' ? 'bg-brand-cyan text-black' : 'text-gray-400 hover:text-white'}`}
                    >
                        <ImageIcon className="h-4 w-4" /> Images
                    </button>
                    <button 
                        onClick={() => setFilter('VIDEO')}
                        className={`flex items-center gap-2 px-4 py-2 rounded-md text-sm font-medium transition-all ${filter === 'VIDEO' ? 'bg-brand-blue text-white' : 'text-gray-400 hover:text-white'}`}
                    >
                        <Video className="h-4 w-4" /> Videos
                    </button>
                </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredTemplates.map((template) => (
                    <div key={template.id} className="group flex flex-col rounded-2xl border border-white/10 bg-brand-panel overflow-hidden hover:border-brand-cyan/30 transition-all hover:shadow-lg">
                        <div className="h-48 overflow-hidden relative">
                            <img src={template.imageUrl} alt={template.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                            <div className="absolute top-3 left-3 px-2 py-1 rounded bg-black/60 backdrop-blur-md text-xs font-bold text-white flex items-center gap-1">
                                {template.mode === GenerationMode.IMAGE ? <ImageIcon className="h-3 w-3" /> : <Video className="h-3 w-3" />}
                                {template.mode}
                            </div>
                        </div>
                        <div className="p-6 flex flex-col flex-grow">
                            <h3 className="text-lg font-bold text-white mb-2">{template.title}</h3>
                            <p className="text-sm text-gray-400 mb-6 flex-grow">{template.description}</p>
                            <button 
                                onClick={() => onSelectTemplate(template.mode, template.prompt)}
                                className="w-full py-3 rounded-lg bg-white/5 hover:bg-brand-cyan hover:text-black border border-white/10 hover:border-transparent text-white font-medium transition-all"
                            >
                                Use Template
                            </button>
                        </div>
                    </div>
                ))}
            </div>
        </div>
      </main>
    </div>
  );
};

export default Templates;