
import React, { useState, useEffect } from 'react';
import { MessageCircle, ShoppingBag, Loader2 } from 'lucide-react';
import { CONTACT_INFO } from '../constants';
import { Link } from 'react-router-dom';

const FurniturePage: React.FC = () => {
  const [items, setItems] = useState<any[]>([]);

  useEffect(() => {
    const saved = localStorage.getItem('mmgg_listings');
    if (saved) {
      const all = JSON.parse(saved);
      setItems(all.filter((item: any) => item.type === 'furniture'));
    }
  }, []);

  return (
    <div className="min-h-screen bg-slate-50 py-20 px-4">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-20 space-y-6">
          <span className="text-[#D4AF37] font-black uppercase tracking-[0.5em] text-[10px]">Exclusive Catalog</span>
          <h1 className="text-6xl font-serif font-black text-[#001F3F]">Artisanal Furniture</h1>
          <p className="text-slate-500 max-w-2xl mx-auto font-medium text-lg italic">
            "Designed for comfort, crafted for royalty. Every piece in our collection is a testament to Nigerian craftsmanship."
          </p>
        </div>

        {items.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-10">
            {items.map((item) => (
              <div key={item.id} className="group bg-white rounded-[2.5rem] overflow-hidden shadow-sm hover:shadow-2xl transition-all border border-slate-100 flex flex-col">
                <div className="relative aspect-square overflow-hidden">
                  <img src={item.images?.[0] || 'https://via.placeholder.com/800'} alt={item.title} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" />
                  <div className="absolute top-6 right-6 bg-white/90 backdrop-blur px-4 py-2 rounded-2xl text-[10px] font-black text-[#001F3F] uppercase tracking-widest">
                    {item.location || 'Bespoke'}
                  </div>
                </div>
                <div className="p-8 flex-grow flex flex-col justify-between">
                  <div>
                    <h3 className="font-serif font-black text-xl mb-2 text-[#001F3F] group-hover:text-[#D4AF37] transition-colors uppercase tracking-tight">{item.title}</h3>
                    <p className="text-slate-500 text-sm mb-6 line-clamp-2 font-medium">{item.description}</p>
                    <div className="text-2xl font-black text-[#006837] mb-8 tracking-tighter">
                      ₦ {parseInt(item.price).toLocaleString()}
                    </div>
                  </div>
                  <div className="space-y-3">
                    <Link
                      to={`/furniture/${item.id}`}
                      className="block w-full text-center bg-slate-50 text-[#001F3F] py-4 rounded-2xl font-black uppercase text-[10px] tracking-widest hover:bg-slate-100 transition-all"
                    >
                      Specifications
                    </Link>
                    <a
                      href={`https://wa.me/${CONTACT_INFO.WHATSAPP}?text=Official Inquiry: I wish to purchase the ${item.title}. Reference: ${item.id}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center justify-center gap-2 w-full bg-[#006837] text-white py-4 rounded-2xl font-black text-[10px] uppercase tracking-widest hover:bg-[#004d29] transition-all shadow-lg"
                    >
                      <MessageCircle size={18} />
                      Order via WhatsApp
                    </a>
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="py-32 text-center bg-white rounded-[4rem] border-2 border-dashed border-slate-100">
             <div className="mb-8 opacity-10 flex justify-center"><ShoppingBag size={80} className="text-[#001F3F]" /></div>
             <h3 className="text-3xl font-serif font-black text-[#001F3F] uppercase tracking-widest">Curating The Collection</h3>
             <p className="text-slate-400 font-bold mt-4 text-lg">Our master artisans are finalizing new luxury pieces.</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default FurniturePage;
