
import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { MapPin, Bed, Bath, Share2, Heart, CheckCircle, MessageCircle, ArrowLeft, ShieldCheck, ChevronRight, Star } from 'lucide-react';
import { CONTACT_INFO } from '../constants';

const DetailView: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const [activeImage, setActiveImage] = useState(0);
  const [item, setItem] = useState<any>(null);

  useEffect(() => {
    // 1. Fetch from localStorage exclusively
    const saved = localStorage.getItem('mmgg_listings');
    const all = saved ? JSON.parse(saved) : [];
    
    // 2. Find the requested asset
    const found = all.find((p: any) => p.id === id);
    
    if (found) {
        // Normalize dynamic data structure if needed
        setItem({
            ...found,
            images: Array.isArray(found.images) ? found.images : [found.images],
            amenities: typeof found.amenities === 'string' ? found.amenities.split(',').map((s:string) => s.trim()) : found.amenities
        });
    }
  }, [id]);

  if (!item) return (
    <div className="min-h-screen flex flex-col items-center justify-center p-20 text-center bg-slate-50">
      <Loader2 className="animate-spin text-[#006837] mb-4" size={48} />
      <h2 className="text-2xl font-serif font-black text-[#001F3F]">SEARCHING GLOBAL ASSET DATABASE...</h2>
      <Link to="/" className="mt-8 text-[#D4AF37] font-black uppercase tracking-widest border-b-2 border-[#D4AF37]">Return To Base</Link>
    </div>
  );

  const priceFormatted = parseInt(item.price).toLocaleString();

  return (
    <div className="bg-[#FDFDFD] min-h-screen">
      {/* Contextual Header */}
      <div className="bg-[#001F3F] text-white/40 py-3 px-6 text-[10px] font-black uppercase tracking-[0.3em] flex items-center gap-4">
        <Link to="/" className="hover:text-[#D4AF37] transition-colors">Global</Link>
        <ChevronRight size={10} />
        <Link to={`/${item.type}`} className="hover:text-[#D4AF37] transition-colors">{item.type}</Link>
        <ChevronRight size={10} />
        <span className="text-[#D4AF37] truncate max-w-[150px]">{item.title}</span>
      </div>

      <div className="max-w-7xl mx-auto px-6 lg:px-12 py-12 grid grid-cols-1 lg:grid-cols-2 gap-20">
        {/* Dynamic Gallery with High Contrast */}
        <div className="space-y-6">
          <div className="aspect-[4/3] rounded-[3rem] overflow-hidden shadow-[0_30px_80px_-20px_rgba(0,0,0,0.2)] bg-slate-100 relative group border-[12px] border-white">
            <img 
                src={item.images[activeImage] || 'https://via.placeholder.com/1200'} 
                className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-[2s] ease-out" 
                alt={item.title} 
            />
            <div className="absolute top-8 left-8 bg-[#006837] text-white px-5 py-2.5 rounded-full text-[10px] font-black uppercase tracking-[0.2em] shadow-lg">
                Verified Asset
            </div>
          </div>
          <div className="grid grid-cols-4 md:grid-cols-5 gap-4">
            {item.images.map((img:string, i:number) => (
              <button 
                key={i} 
                onClick={() => setActiveImage(i)}
                className={`aspect-square rounded-2xl overflow-hidden border-4 transition-all hover:-translate-y-1 ${activeImage === i ? 'border-[#D4AF37] scale-105 shadow-xl' : 'border-white opacity-40 grayscale hover:grayscale-0 hover:opacity-100'}`}
              >
                <img src={img} className="w-full h-full object-cover" alt="Gallery thumbnail" />
              </button>
            ))}
          </div>
        </div>

        {/* High-End Content Architecture */}
        <div className="space-y-10">
          <header className="space-y-6">
            <div className="flex items-center gap-3">
              <span className="w-8 h-1 bg-[#D4AF37] rounded-full"></span>
              <span className="text-xs font-black text-[#006837] uppercase tracking-[0.4em]">{item.type?.replace('s','')} Specialist Collection</span>
            </div>
            <h1 className="text-5xl md:text-6xl font-serif font-black text-[#001F3F] leading-[1.1]">{item.title}</h1>
            <div className="flex items-center gap-3 text-slate-500 font-black text-xs uppercase tracking-widest">
              <MapPin size={20} className="text-[#D4AF37]" /> {item.location}
            </div>
          </header>

          <div className="inline-block px-10 py-6 bg-[#F8FAFC] rounded-[2rem] border border-slate-100 relative group overflow-hidden">
            <div className="absolute top-0 left-0 w-1.5 h-full bg-[#006837] group-hover:w-full transition-all opacity-10"></div>
            <div className="relative z-10 flex flex-col">
                <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1">Asset Valuation</span>
                <span className="text-4xl font-black text-[#006837] tracking-tighter">₦ {priceFormatted}</span>
            </div>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-3 gap-8 py-10 border-y border-slate-100">
            {item.type === 'properties' ? (
                <>
                    <div className="space-y-2">
                        <span className="text-[10px] text-slate-400 font-black uppercase tracking-[0.2em]">Accommodations</span>
                        <div className="flex items-center gap-3 font-black text-xl text-[#001F3F]"><Bed size={24} className="text-[#D4AF37]" /> {item.bedrooms || 0} Rooms</div>
                    </div>
                    <div className="space-y-2">
                        <span className="text-[10px] text-slate-400 font-black uppercase tracking-[0.2em]">Sanitation</span>
                        <div className="flex items-center gap-3 font-black text-xl text-[#001F3F]"><Bath size={24} className="text-[#D4AF37]" /> {item.bathrooms || 0} Baths</div>
                    </div>
                </>
            ) : (
                <div className="space-y-2">
                    <span className="text-[10px] text-slate-400 font-black uppercase tracking-[0.2em]">Catalog Tag</span>
                    <div className="flex items-center gap-3 font-black text-xl text-[#001F3F]"><Star size={24} className="text-[#D4AF37]" /> Exclusive</div>
                </div>
            )}
            <div className="space-y-2">
                <span className="text-[10px] text-slate-400 font-black uppercase tracking-[0.2em]">Security Rating</span>
                <div className="flex items-center gap-3 font-black text-xl text-[#25D366]"><ShieldCheck size={24} /> Verified</div>
            </div>
          </div>

          <div className="space-y-6">
            <h3 className="font-black text-xs text-[#001F3F] uppercase tracking-[0.3em] flex items-center gap-3">
                <span className="w-1.5 h-1.5 rounded-full bg-[#D4AF37]"></span> Executive Summary
            </h3>
            <div className="relative">
              <div className="absolute left-0 top-0 w-1 h-full bg-[#D4AF37]/30 rounded-full"></div>
              <p className="text-slate-600 leading-relaxed font-medium text-lg italic pl-8">
                {item.description}
              </p>
            </div>
          </div>

          <div className="space-y-6">
            <h3 className="font-black text-xs text-[#001F3F] uppercase tracking-[0.3em] flex items-center gap-3">
                <span className="w-1.5 h-1.5 rounded-full bg-[#D4AF37]"></span> Specifications & Perks
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {item.amenities.map((amenity:string) => (
                <div key={amenity} className="flex items-center gap-4 text-sm text-slate-700 font-black bg-white shadow-sm p-5 rounded-2xl border border-slate-50 group hover:border-[#D4AF37] transition-colors">
                  <div className="p-2 bg-[#006837]/5 rounded-full group-hover:bg-[#006837] group-hover:text-white transition-all">
                    <CheckCircle size={16} />
                  </div>
                  <span className="uppercase tracking-widest text-[10px]">{amenity}</span>
                </div>
              ))}
            </div>
          </div>

          <div className="pt-12 space-y-6">
            <a
              href={`https://wa.me/${CONTACT_INFO.WHATSAPP}?text=Official Inquiry: I wish to acquire the ${item.title} located at ${item.location}. Reference ID: ${item.id}`}
              target="_blank"
              rel="noopener noreferrer"
              className="group w-full bg-[#006837] text-white py-7 rounded-[2rem] font-black text-center flex items-center justify-center gap-4 hover:bg-[#001F3F] transition-all shadow-[0_30px_60px_-15px_rgba(0,104,55,0.4)] hover:-translate-y-2 uppercase tracking-[0.2em] text-xs"
            >
              <MessageCircle size={28} className="group-hover:rotate-12 transition-transform" />
              Direct Purchase via WhatsApp
            </a>
            <p className="text-center text-[10px] text-slate-400 uppercase font-black tracking-[0.3em] animate-pulse">
               Secure Channel Encrypted
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

const Loader2 = ({ size, className }: { size: number; className?: string }) => (
    <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
        <path d="M21 12a9 9 0 1 1-6.219-8.56" />
    </svg>
);

const Bed = ({ size, className }: { size: number; className?: string }) => (
    <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
      <path d="M2 4v16" /><path d="M2 8h18a2 2 0 0 1 2 2v10" /><path d="M2 17h20" /><path d="M6 8v9" />
    </svg>
);

const Bath = ({ size, className }: { size: number; className?: string }) => (
    <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
      <path d="M9 6 6.5 3.5a1.5 1.5 0 0 0-1-1.5 1.5 1.5 0 0 0-1 1.5L7 6" />
      <path d="M10 8.5a.5.5 0 0 1 .5-.5h3a.5.5 0 0 1 .5.5v0a.5.5 0 0 1-.5.5h-3a.5.5 0 0 1-.5-.5z" />
      <path d="M2 12h20" /><path d="M7 12c0 4.4 3.6 8 8 8s8-3.6 8-8" /><path d="M5 12c0 4.4 3.6 8 8 8" />
    </svg>
);

export default DetailView;
