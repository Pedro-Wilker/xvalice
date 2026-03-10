"use client";

import React from 'react';
import { Button } from '@/components/ui/button';
import { MapPin } from 'lucide-react';

const Index = () => {
  const openMaps = () => {
    window.open("https://www.google.com/maps/place/Festa+%26+Cia/@-11.431244,-40.5952361,20.5z/data=!4m14!1m7!3m6!1s0x76c87f74c2b9e31:0x169bcdfbf412f3cc!2sDoce+Vida+Bomboniere+e+festa!8m2!3d-11.4313673!4d-40.5953833!16s%2Fg%2F11jtvs1p2y!3m5!1s0x76c8785d78207ed:0x53d178a0482b1df3!8m2!3d-11.4312495!4d-40.5953558!16s%2Fg%2F11h32_b877?entry=ttu&g_ep=EgoyMDI2MDMwOC4wIKXMDSoASAFQAw%3D%3D", "_blank");
  };

  return (
    <div className="min-h-screen bg-white selection:bg-amber-100 overflow-x-hidden">
      {/* Conteúdo Principal - Carrega diretamente sem overlays */}
      <main 
        className="mx-auto bg-white min-h-screen shadow-2xl relative z-0"
        style={{ maxWidth: '1080px' }}
      >
        
        {/* SEÇÃO 1: VÍDEO */}
        <section id="section-1" className="w-full leading-[0] overflow-hidden">
          <video 
            src="/sessao1.mp4" 
            className="w-full h-auto block" 
            autoPlay 
            loop 
            muted 
            playsInline
          />
        </section>

        {/* SEÇÃO 2: Imagem 02.png com sobreposição */}
        <section id="section-2" className="w-full relative leading-[0]">
          <img 
            src="/02.png" 
            alt="Convite Parte 2" 
            className="w-full h-auto block"
          />
          
          {/* Conteúdo de Localização SOBREPOSTO */}
          <div 
            className="absolute left-0 right-0 flex flex-col items-center px-6 space-y-4 md:space-y-6"
            style={{ top: '47%' }}
          >
            <div className="w-full max-w-[220px] sm:max-w-[280px] md:max-w-md overflow-hidden rounded-2xl shadow-2xl border-2 md:border-4 border-white">
              <img 
                src="/local.png" 
                alt="Mapa do Local" 
                className="w-full h-auto block"
              />
            </div>
            
            <Button 
              onClick={openMaps}
              className="bg-[#8c0000] hover:bg-[#6b0000] text-white px-6 py-4 md:px-10 md:py-7 rounded-full text-sm md:text-lg font-semibold shadow-2xl transition-all hover:scale-105 active:scale-95 flex items-center gap-2 md:gap-3"
            >
              <MapPin className="w-4 h-4 md:w-6 md:h-6" />
              ABRIR NO MAPS
            </Button>
          </div>
        </section>

        <div className="h-10 bg-white" />
      </main>
    </div>
  );
};

export default Index;