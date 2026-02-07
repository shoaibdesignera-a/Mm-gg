
import React, { useState, useEffect } from 'react';
import { Palette, Check, MessageCircle, PaintBucket } from 'lucide-react';
import { CONTACT_INFO } from '../constants';
import { Link } from 'react-router-dom';

const PaintsPage: React.FC = () => {
  const [paints, setPaints] = useState<any[]>([]);

  useEffect(() => {
    const saved = localStorage.getItem('mmgg_listings');
    if (saved) {
      const all = JSON.parse(saved);
      setPaints(all.filter((item: any) => item.type === 'paints'));
    }
  }, []);

  return (
    <div className="min-h-screen py-20 px-4 bg-[#FDFDFD]">
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col md:flex-row items-center gap-20 mb-32">
          <div className="flex-1 space-y-10">
            <span className="text-[#006837] font-black uppercase tracking-[0.5em] text-[10px]">Surface Engineering</span>
            <h1 className="text-7xl font-serif font-black leading-none text-[#001F3F]">Vibrant Mastery for Modern Walls</h1>
            <p className="text-slate-600 text-xl font-medium leading-relaxed italic">"MM&GG signature paints are formulated with diamond-grade pigments to ensure depth, brilliance, and timeless elegance on every surface."</p>
            <div className="grid grid-cols-2 gap-6">
              {['Non-Toxic Formula', 'Anti-Fungal Barrier', 'Weather-Shield Tech', 'High-Gloss Silk'].map(feat => (
                <div key={feat} className="flex items-center gap-4 text-xs font-black uppercase tracking-widest text-[#001F3F]">
                  <div className="bg-[#D4AF37] p-2 rounded-full shadow-lg"><Check size={14} className="text-[#001F3F]" /></div>
                  {feat}
                </div>
              ))}
            </div>
          </div>
          <div className="flex-1 relative group">
            <div className="absolute -inset-4 bg-gradient-to-r from-[#006837] to-[#D4AF37] rounded-[4rem] blur-2xl opacity-20 group-hover:opacity-40 transition-opacity"></div>
            <img src="https://images.unsplash.com/photo-1562624382-826883fe48b2?auto=format&fit=crop&w=800&q=80" className="rounded-[4rem] shadow-2xl relative z-10 border-8 border-white" alt="Paint Buckets" />
          </div>
        </div>

        {paints.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
            {paints.map(paint => (
              <div key={paint.id} className="bg-white rounded-[3rem] p-10 shadow-sm border border-slate-100 hover:border-[#D4AF37] transition-all group hover:shadow-2xl hover:-translate-y-2">
                <div className="w-20 h-20 bg-slate-50 rounded-3xl flex items-center justify-center mb-8 group-hover:bg-[#006837] group-hover:text-white transition-all shadow-inner">
                  <Palette size={40} className="text-[#006837] group-hover:text-white" />
                </div>
                <h3 className="text-3xl font-serif font-black mb-4 text-[#001F3F] group-hover:text-[#D4AF37] transition-colors">{paint.title}</h3>
                <p className="text-slate-500 text-sm mb-8 font-medium leading-relaxed italic border-l-2 border-slate-100 pl-4">{paint.description}</p>
                
                <div className="space-y-4 mb-10">
                  <div className="flex justify-between items-center bg-[#F8FAFC] p-4 rounded-2xl border border-slate-100 group-hover:bg-white transition-all">
                    <span className="text-[10px] font-black uppercase tracking-widest text-slate-400">Premium Rate</span>
                    <span className="font-black text-2xl text-[#006837]">₦ {parseInt(paint.price).toLocaleString()}</span>
                  </div>
                </div>

                <div className="flex gap-4">
                  <Link to={`/paints/${paint.id}`} className="flex-grow text-center bg-slate-100 text-[#001F3F] py-4 rounded-2xl font-black text-[10px] uppercase tracking-widest hover:bg-slate-200 transition-all">Details</Link>
                  <a
                    href={`https://wa.me/${CONTACT_INFO.WHATSAPP}?text=Official Order: I wish to purchase the ${paint.title}.`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex-[2] block text-center bg-[#001F3F] text-white py-4 rounded-2xl font-black text-[10px] uppercase tracking-widest hover:bg-[#D4AF37] hover:text-[#001F3F] transition-all shadow-lg"
                  >
                    Place Order
                  </a>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="py-32 text-center bg-white rounded-[4rem] border-2 border-dashed border-slate-100">
             <div className="mb-8 opacity-10 flex justify-center"><PaintBucket size={80} className="text-[#006837]" /></div>
             <h3 className="text-3xl font-serif font-black text-[#001F3F] uppercase tracking-widest">Mixing The Masterpieces</h3>
             <p className="text-slate-400 font-bold mt-4 text-lg">Our paint engineers are curating the next elite color palette.</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default PaintsPage;
