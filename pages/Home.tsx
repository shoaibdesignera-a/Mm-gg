
import React, { useState, useEffect } from 'react';
import { Search, MapPin, Bed, Bath, ArrowRight, Star, CheckCircle, Instagram, Loader2 } from 'lucide-react';
import { Link } from 'react-router-dom';

const Home: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [properties, setProperties] = useState<any[]>([]);

  useEffect(() => {
    const saved = localStorage.getItem('mmgg_listings');
    if (saved) {
      const all = JSON.parse(saved);
      // Only show items categorized as properties on the home/property section
      setProperties(all.filter((item: any) => item.type === 'properties'));
    }
  }, []);

  const filteredProperties = properties.filter(p => 
    p.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
    p.location.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="space-y-20 pb-20">
      {/* Hero Section */}
      <section className="relative h-[85vh] flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0">
          <img
            src="https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1920&q=80"
            className="w-full h-full object-cover"
            alt="Hero Background"
          />
          <div className="absolute inset-0 bg-[#001F3F]/60" />
        </div>
        
        <div className="relative z-10 text-center text-white px-4 max-w-4xl animate-in fade-in zoom-in duration-700">
          <h1 className="text-5xl md:text-8xl font-black mb-6 drop-shadow-2xl">OWN YOUR <span className="text-[#D4AF37]">LEGACY</span></h1>
          <p className="text-xl md:text-2xl font-medium mb-12 text-slate-100 italic tracking-wide">MM&GG: The apex of Real Estate, Premium Furniture, & Quality Paints.</p>
          
          <div className="bg-white/10 backdrop-blur-xl p-4 rounded-3xl max-w-2xl mx-auto flex flex-col md:flex-row gap-4 border border-white/30 shadow-2xl">
            <div className="flex-grow flex items-center bg-white rounded-2xl px-4 py-4">
              <Search className="text-slate-400 mr-2" size={24} />
              <input
                type="text"
                placeholder="Search by location, type, or budget..."
                className="w-full bg-transparent outline-none text-slate-800 font-bold placeholder:text-slate-400"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
            <button className="bg-[#D4AF37] hover:bg-white text-[#001F3F] px-10 py-4 rounded-2xl font-black transition-all shadow-xl shadow-black/20 uppercase tracking-widest text-sm">
              Explore
            </button>
          </div>
        </div>
      </section>

      {/* Trust Badges */}
      <section className="max-w-7xl mx-auto px-4 -mt-20 relative z-20">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          {[
            { label: 'RC: 1234567', icon: <CheckCircle className="text-[#D4AF37]" /> },
            { label: 'Luxury Standards', icon: <Star className="text-[#D4AF37]" /> },
            { label: 'Lagos & Abuja', icon: <MapPin className="text-[#D4AF37]" /> },
            { label: 'Global Delivery', icon: <Star className="text-[#D4AF37]" /> },
          ].map((item, idx) => (
            <div key={idx} className="bg-white p-8 rounded-3xl shadow-2xl flex flex-col items-center gap-4 border-t-8 border-[#006837] group hover:-translate-y-2 transition-transform">
              <div className="bg-[#001F3F]/5 p-4 rounded-full group-hover:bg-[#D4AF37]/20 transition-colors">{item.icon}</div>
              <span className="font-black text-xs uppercase tracking-widest text-[#001F3F]">{item.label}</span>
            </div>
          ))}
        </div>
      </section>

      {/* Featured Properties */}
      <section className="max-w-7xl mx-auto px-4">
        <div className="flex justify-between items-end mb-12">
          <div>
            <span className="text-[#D4AF37] font-black uppercase tracking-[0.3em] text-xs">Portfolio</span>
            <h2 className="text-5xl font-black mt-2 text-[#001F3F]">Top Tier Assets</h2>
          </div>
          <Link to="/properties" className="text-[#006837] font-black flex items-center gap-2 hover:gap-4 transition-all uppercase text-sm">
            Refresh Catalog <ArrowRight size={20} />
          </Link>
        </div>

        {filteredProperties.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
            {filteredProperties.map((prop) => (
              <div key={prop.id} className="group bg-white rounded-[2.5rem] overflow-hidden shadow-sm hover:shadow-2xl transition-all border border-slate-100 flex flex-col h-full">
                <div className="relative h-80 overflow-hidden">
                  <img src={prop.images?.[0] || 'https://via.placeholder.com/800'} alt={prop.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" />
                  <div className="absolute top-6 left-6 bg-[#006837] text-white text-[10px] font-black px-4 py-2 rounded-full uppercase tracking-widest">
                    EXECUTIVE
                  </div>
                  <div className="absolute bottom-0 inset-x-0 h-32 bg-gradient-to-t from-black/80 to-transparent flex items-end p-8">
                    <div className="text-white font-black text-2xl tracking-tighter">
                      ₦ {parseInt(prop.price).toLocaleString()}
                    </div>
                  </div>
                </div>
                <div className="p-8 flex-grow flex flex-col justify-between">
                  <div>
                    <h3 className="text-2xl font-serif font-black mb-3 text-[#001F3F] group-hover:text-[#D4AF37] transition-colors">{prop.title}</h3>
                    <div className="flex items-center text-slate-500 font-bold text-sm mb-6 gap-2">
                      <MapPin size={18} className="text-[#D4AF37]" /> {prop.location}
                    </div>
                  </div>
                  <div>
                    <Link 
                      to={`/properties/${prop.id}`} 
                      className="block w-full text-center bg-[#001F3F] text-white py-4 rounded-2xl font-black uppercase text-xs tracking-widest hover:bg-[#D4AF37] hover:text-[#001F3F] transition-all shadow-lg active:scale-95"
                    >
                      View Full Details
                    </Link>
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="py-20 text-center bg-white rounded-[3rem] border-2 border-dashed border-slate-100">
             <div className="mb-6 opacity-20 flex justify-center"><Loader2 size={64} className="animate-spin text-[#006837]" /></div>
             <h3 className="text-2xl font-black text-[#001F3F] uppercase tracking-widest">New Listings Coming Soon</h3>
             <p className="text-slate-400 font-bold mt-2">Our agents are currently verifying elite properties for you.</p>
          </div>
        )}
      </section>

      {/* Services Grid */}
      <section className="bg-slate-900 py-32 text-white relative overflow-hidden">
        <div className="absolute top-0 right-0 w-96 h-96 bg-[#006837]/20 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2"></div>
        <div className="max-w-7xl mx-auto px-4 grid grid-cols-1 lg:grid-cols-2 gap-20 items-center relative z-10">
          <div className="grid grid-cols-2 gap-6">
            <div className="space-y-6">
              <img src="https://images.unsplash.com/photo-1524758631624-e2822e304c36?auto=format&fit=crop&w=400&q=80" className="rounded-[3rem] h-80 w-full object-cover shadow-2xl border-4 border-[#006837]" alt="Furniture" />
              <div className="bg-[#D4AF37] p-10 rounded-[3rem] text-[#001F3F]">
                <h4 className="text-4xl font-black mb-4 tracking-tighter">Bespoke Living</h4>
                <p className="text-xs font-bold uppercase tracking-widest opacity-70">Furniture that mirrors your status.</p>
              </div>
            </div>
            <div className="space-y-6 mt-16">
              <div className="bg-[#006837] p-10 rounded-[3rem] text-white shadow-2xl">
                <h4 className="text-4xl font-black mb-4 tracking-tighter">Royal Finish</h4>
                <p className="text-xs font-bold uppercase tracking-widest opacity-70">Paints that breathe life into walls.</p>
              </div>
              <img src="https://images.unsplash.com/photo-1589939705384-5185137a7f0f?auto=format&fit=crop&w=400&q=80" className="rounded-[3rem] h-80 w-full object-cover shadow-2xl border-4 border-[#D4AF37]" alt="Paints" />
            </div>
          </div>
          <div className="space-y-10">
            <span className="text-[#D4AF37] font-black uppercase tracking-[0.5em] text-xs">Total Infrastructure</span>
            <h2 className="text-6xl font-serif font-black leading-tight">We Build. <br/> We Furnish. <br/> We Beautify.</h2>
            <p className="text-slate-400 text-xl leading-relaxed max-w-lg">MM&GG provides an end-to-end luxury ecosystem. From acquiring prime land to furnishing your penthouse and painting it to perfection.</p>
            <div className="flex gap-6">
              <Link to="/furniture" className="bg-white text-[#001F3F] px-10 py-5 rounded-2xl font-black hover:bg-[#D4AF37] transition-all uppercase text-xs tracking-widest">Shop Furniture</Link>
              <Link to="/paints" className="border-2 border-white text-white px-10 py-5 rounded-2xl font-black hover:bg-white hover:text-[#001F3F] transition-all uppercase text-xs tracking-widest">Explore Paints</Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;
