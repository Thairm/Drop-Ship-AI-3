import React, { useState, useRef, useEffect } from 'react';
import { 
  Upload, Image as ImageIcon, Video, Loader2, Sparkles, AlertCircle, 
  Download, MonitorPlay, ArrowLeft, LayoutGrid, LayoutTemplate, 
  FileText, CreditCard, Settings, LogOut, Zap, Maximize, Lock, Info, RotateCcw, Copy,
  Search, Filter, ChevronDown, Plus, X
} from 'lucide-react';
import { GenerationMode, GenerationState, AppView, AVAILABLE_MODELS, ModelConfig } from '../types';
import { generateProductImage, generateProductVideo } from '../services/geminiService';

interface GeneratorProps {
  initialMode?: GenerationMode;
  initialPrompt?: string;
  onBack?: () => void;
  onNavigate?: (view: AppView) => void;
}

const Generator: React.FC<GeneratorProps> = ({ 
  initialMode = GenerationMode.IMAGE, 
  initialPrompt = '', 
  onBack,
  onNavigate 
}) => {
  // Find default model for the mode
  const defaultModel = AVAILABLE_MODELS.find(m => m.mode === initialMode) || AVAILABLE_MODELS[0];

  const [state, setState] = useState<GenerationState>({
    originalImages: [], // Initialize as empty array
    generatedImage: null,
    generatedVideoUri: null,
    prompt: initialPrompt,
    mode: initialMode,
    isLoading: false,
    error: null,
    progressMessage: ''
  });

  const [selectedModel, setSelectedModel] = useState<ModelConfig>(defaultModel);
  const [aspectRatio, setAspectRatio] = useState<string>(initialMode === GenerationMode.VIDEO ? '9:16' : '1:1');
  const [resolution, setResolution] = useState<string>(initialMode === GenerationMode.VIDEO ? '720p' : '1K');
  
  const fileInputRef = useRef<HTMLInputElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);

  // Sync mode changes when user manually toggles mode in sidebar
  useEffect(() => {
    const newModel = AVAILABLE_MODELS.find(m => m.mode === state.mode) || AVAILABLE_MODELS[0];
    setSelectedModel(newModel);
    
    // Set safe defaults
    if (state.mode === GenerationMode.VIDEO) {
        setAspectRatio('9:16');
        setResolution('720p');
    } else {
        setAspectRatio('1:1');
        setResolution('1K');
    }
  }, [state.mode]);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (files && files.length > 0) {
      const newImages: string[] = [];
      let processedCount = 0;

      // Convert FileList to array and iterate
      Array.from(files).forEach((file: File) => {
        if (file.size > 5 * 1024 * 1024) {
           setState(prev => ({ ...prev, error: `File ${file.name} is too large (max 5MB).` }));
           return;
        }

        const reader = new FileReader();
        reader.onloadend = () => {
            if (reader.result) {
                newImages.push(reader.result as string);
            }
            processedCount++;
            
            // If all files processed, update state
            if (processedCount === files.length) {
                setState(prev => ({ 
                    ...prev, 
                    originalImages: [...prev.originalImages, ...newImages],
                    generatedImage: null,
                    generatedVideoUri: null,
                    error: null
                }));
            }
        };
        reader.readAsDataURL(file);
      });
    }
  };

  const removeImage = (indexToRemove: number) => {
    setState(prev => ({
        ...prev,
        originalImages: prev.originalImages.filter((_, index) => index !== indexToRemove)
    }));
  };

  const handleGenerate = async () => {
    // Validation: Require image only if model supports it
    if (selectedModel.capabilities.supportsInputImage && state.originalImages.length === 0) {
      setState(prev => ({ ...prev, error: "Please upload at least one product image." }));
      return;
    }
    if (!state.prompt.trim()) {
        setState(prev => ({ ...prev, error: "Please enter a description for the scene." }));
        return;
    }

    setState(prev => ({ ...prev, isLoading: true, error: null, progressMessage: `Initializing ${selectedModel.label}...` }));

    // Use the first image for generation (Service currently handles single image)
    const primaryImage = state.originalImages[0];

    try {
      if (state.mode === GenerationMode.IMAGE) {
        setState(prev => ({ ...prev, progressMessage: 'Processing image details...' }));
        const result = await generateProductImage(primaryImage, state.prompt, selectedModel.id, aspectRatio, resolution);
        setState(prev => ({ 
          ...prev, 
          generatedImage: result, 
          generatedVideoUri: null,
          isLoading: false,
          progressMessage: ''
        }));
      } else {
        // Video Mode
        setState(prev => ({ ...prev, progressMessage: 'Connecting to Veo video model (may prompt for API key)...' }));
        // Ensure we have an image for video mode (Veo generally needs start image)
         if (!primaryImage) {
             throw new Error("Video generation currently requires a start image.");
         }
        const result = await generateProductVideo(primaryImage, state.prompt, selectedModel.id, aspectRatio, resolution);
        setState(prev => ({ 
          ...prev, 
          generatedVideoUri: result,
          generatedImage: null,
          isLoading: false,
          progressMessage: ''
        }));
      }
    } catch (err: any) {
      setState(prev => ({ 
        ...prev, 
        isLoading: false, 
        error: err.message || "Generation failed. Please try again.",
        progressMessage: ''
      }));
    }
  };

  // Reset video when URI changes
  useEffect(() => {
    if (state.generatedVideoUri && videoRef.current) {
        videoRef.current.load();
    }
  }, [state.generatedVideoUri]);

  return (
    <div className="flex h-screen bg-black overflow-hidden">
      
      {/* 1. Left Sidebar Navigation */}
      <aside className="w-16 border-r border-white/10 bg-[#0A0A0A] flex flex-col items-center py-6 z-30">
        <div 
          onClick={onBack}
          className="mb-8 flex h-10 w-10 items-center justify-center rounded-lg bg-gradient-to-br from-brand-cyan to-brand-blue cursor-pointer hover:scale-105 transition-transform"
          title="Back to Hub"
        >
          <Zap className="h-5 w-5 text-black fill-black" />
        </div>

        <nav className="flex-1 flex flex-col gap-6 w-full items-center">
            <button onClick={() => onNavigate?.(AppView.HUB)} className="p-2 text-gray-500 hover:text-white transition-colors" title="Dashboard">
                <LayoutGrid className="h-6 w-6" />
            </button>
            <button 
                onClick={() => setState(s => ({...s, mode: GenerationMode.IMAGE}))}
                className={`p-2 transition-colors ${state.mode === GenerationMode.IMAGE ? 'text-brand-cyan' : 'text-gray-500 hover:text-white'}`}
                title="Image Generator"
            >
                <ImageIcon className="h-6 w-6" />
            </button>
            <button 
                 onClick={() => setState(s => ({...s, mode: GenerationMode.VIDEO}))}
                 className={`p-2 transition-colors ${state.mode === GenerationMode.VIDEO ? 'text-brand-cyan' : 'text-gray-500 hover:text-white'}`}
                 title="Video Creator"
            >
                <Video className="h-6 w-6" />
            </button>
            <button onClick={() => onNavigate?.(AppView.TEMPLATES)} className="p-2 text-gray-500 hover:text-white transition-colors" title="Templates">
                <LayoutTemplate className="h-6 w-6" />
            </button>
            <button onClick={() => onNavigate?.(AppView.DOCUMENTS)} className="p-2 text-gray-500 hover:text-white transition-colors" title="Documents">
                <FileText className="h-6 w-6" />
            </button>
        </nav>

        <div className="flex flex-col gap-6 mb-4">
            <button className="p-2 text-gray-500 hover:text-white transition-colors"><Settings className="h-6 w-6" /></button>
            <button onClick={onBack} className="p-2 text-gray-500 hover:text-red-400 transition-colors"><LogOut className="h-6 w-6" /></button>
        </div>
      </aside>

      {/* 2. Middle Column: Settings Panel (Dynamic based on Model Registry) */}
      <aside className="w-[340px] border-r border-white/10 bg-[#121212] flex flex-col z-20 overflow-hidden">
        
        {/* Panel Header */}
        <div className="h-16 flex items-center justify-between px-6 border-b border-white/5 shrink-0">
            <h2 className="text-lg font-bold text-white flex items-center gap-2">
                {state.mode === GenerationMode.IMAGE ? 'Image' : 'Video'} 
                <span className="px-2 py-0.5 rounded bg-white/10 text-xs text-gray-400 font-normal">Gen</span>
            </h2>
            <button 
                onClick={() => onNavigate?.(AppView.DOCUMENTS)}
                className="text-xs flex items-center gap-1 text-gray-400 hover:text-white border border-white/10 px-2 py-1 rounded"
            >
                <Info className="h-3 w-3" /> Guides
            </button>
        </div>

        <div className="flex-1 overflow-y-auto custom-scrollbar p-5 space-y-6">
            
            {/* Model Selection Card */}
            <div className="space-y-2">
                <span className="text-xs text-gray-400 font-medium ml-1">AI Model</span>
                <div className="relative">
                    <div className="rounded-xl overflow-hidden border border-white/10 bg-[#1A1A1A] cursor-pointer group">
                        <div className="h-16 bg-gradient-to-r from-purple-900/40 to-blue-900/40 relative p-3 flex flex-col justify-center">
                            <span className="text-[10px] uppercase font-bold text-white/60 tracking-wider">Selected Model</span>
                            <h3 className="text-white font-bold text-sm truncate">{selectedModel.label}</h3>
                        </div>
                        <div className="p-2 bg-[#1A1A1A]">
                            <select 
                                value={selectedModel.id}
                                onChange={(e) => {
                                    const model = AVAILABLE_MODELS.find(m => m.id === e.target.value);
                                    if (model) setSelectedModel(model);
                                }}
                                className="w-full bg-black/40 border border-white/10 rounded text-xs text-gray-300 p-2 focus:border-brand-cyan outline-none appearance-none"
                            >
                                {AVAILABLE_MODELS.filter(m => m.mode === state.mode).map(model => (
                                    <option key={model.id} value={model.id}>{model.label}</option>
                                ))}
                            </select>
                        </div>
                    </div>
                </div>
                <p className="text-[10px] text-gray-500 px-1">{selectedModel.description}</p>
            </div>

            {/* Basic Settings Section */}
            <div>
                <div className="flex items-center justify-between mb-3">
                     <h3 className="text-sm font-semibold text-gray-300">Basic Settings</h3>
                     <ArrowLeft className="h-3 w-3 text-gray-600 rotate-90" />
                </div>

                <div className="space-y-4">
                     
                     {/* Resolution Control - Only if supported by model */}
                     {selectedModel.capabilities.supportsResolution && (
                        <div>
                             <div className="flex items-center justify-between text-xs text-gray-400 mb-2">
                                <span>Output Quality</span>
                             </div>
                             <div className="grid grid-cols-3 gap-2">
                                {(state.mode === GenerationMode.IMAGE ? ['1K', '2K', '4K'] : ['720p', '1080p']).map((res) => (
                                    <button 
                                        key={res}
                                        onClick={() => setResolution(res)}
                                        className={`py-1.5 text-xs font-medium rounded border ${resolution === res ? 'border-brand-cyan text-brand-cyan bg-brand-cyan/5' : 'border-white/10 text-gray-500 hover:text-white'}`}
                                    >
                                        {res}
                                    </button>
                                ))}
                             </div>
                        </div>
                     )}

                     {/* Aspect Ratio - Only if supported by model */}
                     {selectedModel.capabilities.supportsAspectRatio && (
                        <div>
                            <div className="flex items-center justify-between text-xs text-gray-400 mb-2">
                                <span>Aspect Ratio</span>
                                <span>{aspectRatio}</span>
                            </div>
                            <div className="grid grid-cols-4 gap-2">
                                {['2:3', '1:1', '9:16', '4:3', '16:9'].map((ratio) => (
                                    <button 
                                        key={ratio}
                                        onClick={() => setAspectRatio(ratio)}
                                        className={`flex flex-col items-center justify-center gap-1 p-2 rounded border transition-all ${
                                            aspectRatio === ratio 
                                            ? 'border-brand-cyan text-brand-cyan bg-brand-cyan/5' 
                                            : 'border-white/10 text-gray-500 hover:border-white/30 hover:text-gray-300'
                                        }`}
                                    >
                                        <div className={`border rounded-sm ${
                                            ratio === '1:1' ? 'h-4 w-4' : 
                                            ratio === '9:16' ? 'h-5 w-3' : 
                                            ratio === '16:9' ? 'h-3 w-5' : 
                                            ratio === '2:3' ? 'h-5 w-3.5' : 'h-3.5 w-5'
                                        } border-current`} />
                                        <span className="text-[10px]">{ratio}</span>
                                    </button>
                                ))}
                            </div>
                        </div>
                     )}

                     {/* Image Quantity - Only if supported */}
                     {selectedModel.capabilities.supportsQuantity && (
                        <div>
                            <span className="text-xs text-gray-400 mb-2 block">Batch Size</span>
                            <div className="grid grid-cols-4 gap-2">
                                {[1, 2, 3, 4].map(num => (
                                    <button 
                                        key={num}
                                        className={`py-1.5 text-xs font-medium rounded border border-white/10 text-gray-500 hover:text-white`}
                                    >
                                        {num}
                                    </button>
                                ))}
                            </div>
                        </div>
                     )}
                </div>
            </div>

            {/* Upload Area - CONDITIONALLY RENDERED */}
            {selectedModel.capabilities.supportsInputImage ? (
                <div>
                     <div className="flex items-center justify-between mb-3">
                         <h3 className="text-sm font-semibold text-gray-300">Input Image</h3>
                         <span className="text-xs text-gray-500">
                             {state.originalImages.length > 0 ? `${state.originalImages.length} selected` : 'Required'}
                         </span>
                    </div>
                    
                    {/* Grid View for Uploaded Images */}
                    {state.originalImages.length > 0 ? (
                        <div className="grid grid-cols-3 gap-2">
                            {state.originalImages.map((img, idx) => (
                                <div key={idx} className="relative aspect-square rounded-lg border border-white/10 bg-black/20 overflow-hidden group">
                                    <img src={img} alt={`Upload ${idx}`} className="w-full h-full object-cover" />
                                    <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                                        <button 
                                            onClick={() => removeImage(idx)}
                                            className="p-1 rounded-full bg-red-500/80 text-white hover:bg-red-600"
                                            title="Remove image"
                                        >
                                            <X className="h-3 w-3" />
                                        </button>
                                    </div>
                                    {idx === 0 && (
                                        <div className="absolute bottom-0 left-0 right-0 bg-brand-cyan/80 text-black text-[9px] font-bold text-center py-0.5">
                                            MAIN
                                        </div>
                                    )}
                                </div>
                            ))}
                            {/* Add More Button */}
                            <div 
                                onClick={() => fileInputRef.current?.click()}
                                className="aspect-square rounded-lg border border-dashed border-white/20 hover:border-brand-cyan/50 hover:bg-white/5 flex flex-col items-center justify-center cursor-pointer transition-all"
                            >
                                <Plus className="h-5 w-5 text-gray-500" />
                                <span className="text-[10px] text-gray-500 mt-1">Add</span>
                            </div>
                        </div>
                    ) : (
                        // Empty State Upload Box
                        <div 
                            onClick={() => fileInputRef.current?.click()}
                            className="relative rounded-lg border-2 border-dashed border-white/10 hover:border-gray-500 bg-black/20 transition-all cursor-pointer overflow-hidden h-40 flex flex-col items-center justify-center group"
                        >
                            <div className="text-center p-4">
                                <Upload className="mx-auto h-6 w-6 text-gray-500 mb-2 group-hover:text-brand-cyan transition-colors" />
                                <p className="text-xs text-gray-400 group-hover:text-gray-300">Click to upload images</p>
                                <p className="text-[10px] text-gray-600 mt-1">Supports JPG, PNG, WEBP</p>
                            </div>
                        </div>
                    )}
                    
                    <input 
                        type="file" 
                        ref={fileInputRef} 
                        onChange={handleFileChange} 
                        accept="image/*" 
                        multiple 
                        className="hidden" 
                    />
                </div>
            ) : (
                /* Information for Text-to-Image models */
                 <div className="p-4 rounded-lg bg-blue-900/20 border border-blue-500/30">
                    <div className="flex gap-2 text-blue-300 mb-2">
                        <Sparkles className="h-4 w-4" />
                        <h4 className="text-xs font-bold uppercase">Creative Mode</h4>
                    </div>
                    <p className="text-xs text-gray-300">
                        This model generates images from scratch based on your text description only. It does not use an input image.
                    </p>
                 </div>
            )}

            {/* Private Mode Toggles */}
            <div className="space-y-3 pt-4 border-t border-white/5">
                <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                        <span className="text-xs text-gray-300">Private Creation</span>
                        <Zap className="h-3 w-3 text-yellow-500" />
                    </div>
                    <div className="w-8 h-4 bg-brand-cyan rounded-full relative cursor-pointer"><div className="absolute right-0.5 top-0.5 w-3 h-3 bg-black rounded-full" /></div>
                </div>
            </div>

        </div>
      </aside>

      {/* 3. Right Column: Main Workspace */}
      <main className="flex-1 flex flex-col relative bg-[#050505] min-w-0">
        
        {/* Top Header/Toolbar */}
        <div className="h-14 flex items-center justify-between px-6 border-b border-white/5 bg-[#0A0A0A]">
            <div className="flex items-center gap-4 text-xs font-medium text-gray-400">
                <span className="px-2 py-1 bg-white/5 rounded text-gray-300">History</span>
                <span className="hover:text-white cursor-pointer">Favorites</span>
            </div>
            <div className="flex items-center gap-3">
                 <button className="p-2 hover:bg-white/5 rounded text-gray-400"><Search className="h-4 w-4" /></button>
                 <button className="p-2 hover:bg-white/5 rounded text-gray-400"><LayoutGrid className="h-4 w-4" /></button>
                 <button className="p-2 hover:bg-white/5 rounded text-gray-400"><Filter className="h-4 w-4" /></button>
            </div>
        </div>

        {/* Main Canvas / Preview Area */}
        <div className="flex-1 overflow-y-auto p-6 flex flex-col items-center">
             
             {/* Render Canvas */}
             <div className="w-full h-full max-w-5xl flex flex-col gap-4">
                
                {/* Status/Welcome Message if empty */}
                {!state.generatedImage && !state.generatedVideoUri && !state.isLoading && (
                    <div className="flex-1 flex flex-col items-center justify-center text-center opacity-40">
                        <MonitorPlay className="h-24 w-24 text-gray-600 mb-4" />
                        <h3 className="text-2xl font-bold text-gray-300">Ready to Create</h3>
                        <p className="text-gray-500 max-w-md mt-2">
                            Using <span className="text-brand-cyan font-semibold">{selectedModel.label}</span>. 
                            Configure your settings on the left, describe your vision below, and start generating viral assets.
                        </p>
                    </div>
                )}

                {/* Loading State */}
                {state.isLoading && (
                     <div className="flex-1 flex flex-col items-center justify-center">
                        <div className="relative mb-8">
                            <div className="h-32 w-32 rounded-full border-t-2 border-b-2 border-brand-cyan animate-spin"></div>
                            <div className="absolute inset-0 flex items-center justify-center">
                                <Sparkles className="h-10 w-10 text-brand-blue animate-pulse" />
                            </div>
                        </div>
                        <p className="text-brand-cyan font-mono text-lg animate-pulse">{state.progressMessage}</p>
                     </div>
                )}

                {/* Results Display */}
                {(state.generatedImage || state.generatedVideoUri) && (
                    <div className="flex-1 flex items-center justify-center min-h-0 relative group">
                        <div className="relative max-h-full max-w-full rounded-lg overflow-hidden shadow-2xl border border-white/10">
                            {state.generatedImage && (
                                <img src={state.generatedImage} alt="Result" className="max-h-[calc(100vh-250px)] object-contain" />
                            )}
                            {state.generatedVideoUri && (
                                <video 
                                    ref={videoRef}
                                    src={state.generatedVideoUri} 
                                    controls 
                                    autoPlay 
                                    loop 
                                    className="max-h-[calc(100vh-250px)] object-contain" 
                                />
                            )}
                            
                            {/* Overlay Actions */}
                            <div className="absolute top-4 right-4 flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                                <button className="p-2 bg-black/60 backdrop-blur rounded text-white hover:bg-white hover:text-black"><Maximize className="h-4 w-4" /></button>
                                <a href={state.generatedImage || state.generatedVideoUri || '#'} download className="p-2 bg-brand-cyan text-black rounded hover:bg-white"><Download className="h-4 w-4" /></a>
                            </div>
                        </div>
                    </div>
                )}

                {/* Error Message */}
                {state.error && (
                    <div className="w-full bg-red-900/20 border border-red-500/30 rounded-lg p-4 flex items-start gap-3 text-red-200">
                        <AlertCircle className="h-5 w-5 shrink-0" />
                        <p>{state.error}</p>
                    </div>
                )}
             </div>
        </div>

        {/* Bottom Prompt Bar */}
        <div className="p-4 bg-[#0A0A0A] border-t border-white/10 shrink-0 z-30">
            <div className="max-w-5xl mx-auto w-full">
                <div className="relative bg-[#1A1A1A] rounded-2xl border border-white/10 p-2 focus-within:border-brand-cyan/50 transition-colors">
                     <textarea 
                        value={state.prompt}
                        onChange={(e) => setState(prev => ({...prev, prompt: e.target.value}))}
                        placeholder={state.mode === GenerationMode.IMAGE ? "Describe your product scene (e.g., perfume bottle on a mossy rock in a misty forest...)" : "Describe the video motion and scene..."}
                        className="w-full bg-transparent border-none text-white placeholder-gray-500 focus:ring-0 resize-none h-12 py-3 px-3 custom-scrollbar"
                     />
                     <div className="flex items-center justify-between px-2 pt-2 pb-1">
                        <div className="flex items-center gap-2">
                            <button className="p-2 rounded hover:bg-white/5 text-gray-400" title="Add Negative Prompt"><Lock className="h-4 w-4" /></button>
                            <button className="p-2 rounded hover:bg-white/5 text-gray-400" title="History"><RotateCcw className="h-4 w-4" /></button>
                        </div>
                        <div className="flex items-center gap-3">
                             <div className="text-xs text-gray-500 font-mono hidden sm:block">
                                 {state.mode === GenerationMode.IMAGE ? 'Cost: 1 Credit' : 'Cost: 20 Credits'}
                             </div>
                             <button 
                                onClick={handleGenerate}
                                disabled={state.isLoading}
                                className={`flex items-center gap-2 px-6 py-2.5 rounded-xl font-bold text-sm transition-all ${
                                    state.isLoading 
                                    ? 'bg-gray-700 text-gray-400 cursor-not-allowed' 
                                    : 'bg-gradient-to-r from-brand-cyan to-brand-blue text-white hover:shadow-[0_0_15px_rgba(0,255,255,0.3)] hover:scale-[1.02]'
                                }`}
                             >
                                {state.isLoading ? <Loader2 className="h-4 w-4 animate-spin" /> : <Sparkles className="h-4 w-4" />}
                                Generate <span className="text-xs opacity-80 bg-black/20 px-1.5 py-0.5 rounded ml-1">⚡ 24</span>
                             </button>
                        </div>
                     </div>
                </div>
            </div>
        </div>

      </main>
    </div>
  );
};

export default Generator;