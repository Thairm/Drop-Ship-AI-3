import React from 'react';
import { Layers, Video, Palette } from 'lucide-react';

const Features: React.FC = () => {
  const features = [
    {
      title: "One-Click Product Photo",
      description: "Instantly generate product images and place products in realistic, diverse scenes like beaches, luxury studios, or cityscapes.",
      icon: <Layers className="h-6 w-6 text-brand-cyan" />
    },
    {
      title: "Dynamic Video Ad Generation",
      description: "Turn static AI images into short, looping 5-10 second video ads suitable for TikTok, Reels, and Shorts using the Veo model.",
      icon: <Video className="h-6 w-6 text-brand-cyan" />
    },
    {
      title: "Brand Consistency",
      description: "Apply the same lighting, color palette, and style prompts across your entire catalog for a professional, unified brand look.",
      icon: <Palette className="h-6 w-6 text-brand-cyan" />
    }
  ];

  return (
    <section id="features" className="py-24 bg-brand-dark border-t border-white/5">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl font-bold tracking-tight text-white sm:text-4xl">
            Everything you need to <span className="text-brand-cyan">sell more</span>
          </h2>
          <p className="mt-4 text-lg text-gray-400">
            Professional grade assets without the professional price tag.
          </p>
        </div>

        <div className="grid grid-cols-1 gap-8 md:grid-cols-3">
          {features.map((feature, index) => (
            <div 
              key={index}
              className="group relative rounded-2xl border border-white/10 bg-brand-panel p-8 hover:border-brand-cyan/50 transition-colors duration-300"
            >
              <div className="absolute -inset-px rounded-2xl bg-gradient-to-b from-brand-cyan/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
              <div className="relative">
                <div className="mb-6 inline-flex h-12 w-12 items-center justify-center rounded-lg bg-gray-800 ring-1 ring-white/10 group-hover:bg-brand-cyan/10 group-hover:ring-brand-cyan/50 transition-all">
                  {feature.icon}
                </div>
                <h3 className="text-xl font-semibold text-white mb-3">{feature.title}</h3>
                <p className="text-gray-400 leading-relaxed">
                  {feature.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Features;