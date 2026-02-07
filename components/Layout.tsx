
import React, { useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
// Added MapPin and User to the imports
import { Menu, X, Phone, Mail, Instagram, MessageCircle, Home, ShoppingBag, Palette, LayoutDashboard, Lock, Globe, ArrowRight, MapPin, User } from 'lucide-react';
import { COLORS, CONTACT_INFO } from '../constants';

const Layout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [showLogin, setShowLogin] = useState(false);
  const [credentials, setCredentials] = useState({ user: '', pass: '' });
  const location = useLocation();
  const navigate = useNavigate();

  const navLinks = [
    { name: 'Home', path: '/' },
    { name: 'Properties', path: '/properties' },
    { name: 'Furniture', path: '/furniture' },
    { name: 'Paints', path: '/paints' },
  ];

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (credentials.user === 'mmgg' && credentials.pass === 'mm&gg') {
      localStorage.setItem('admin_auth', 'true');
      setShowLogin(false);
      navigate('/admin');
    } else {
      alert('Invalid Credentials');
    }
  };

  const isAdmin = localStorage.getItem('admin_auth') === 'true';

  return (
    <div className="min-h-screen flex flex-col font-sans selection:bg-[#D4AF37] selection:text-[#001F3F]">
      {/* Premium Top Bar */}
      <div className="bg-[#001F3F] text-white/80 py-2.5 px-6 text-[10px] md:text-xs flex justify-between items-center border-b border-white/5 uppercase tracking-[0.15em] font-bold">
        <div className="flex gap-6">
          <span className="flex items-center gap-2 hover:text-[#D4AF37] transition-colors cursor-pointer"><Phone size={14} className="text-[#D4AF37]" /> {CONTACT_INFO.PHONE}</span>
          <span className="hidden sm:flex items-center gap-2 hover:text-[#D4AF37] transition-colors cursor-pointer"><Mail size={14} className="text-[#D4AF37]" /> {CONTACT_INFO.EMAIL}</span>
        </div>
        <div className="flex gap-6 items-center">
          <span className="hidden lg:block opacity-50">MM&GG REAL ESTATE AND PROPERTY LTD</span>
          <div className="flex gap-3">
            <a href="#" className="hover:text-[#D4AF37] transition-colors"><Instagram size={14} /></a>
            <Globe size={14} className="opacity-40" />
          </div>
        </div>
      </div>

      {/* Modern Header */}
      <header className="sticky top-0 z-[60] bg-[#006837] text-white shadow-2xl backdrop-blur-md bg-opacity-95">
        <div className="max-w-7xl mx-auto px-6 h-24 flex items-center justify-between">
          <Link to="/" className="flex items-center group transition-transform hover:scale-[1.02]">
            <svg viewBox="0 0 400 150" className="h-20 w-auto filter drop-shadow-lg">
                <path d="M50 100 L150 20 L250 100" fill="none" stroke="#D4AF37" strokeWidth="10" strokeLinecap="round" />
                <rect x="135" y="50" width="30" height="30" fill="#D4AF37" opacity="0.8" />
                <text x="50" y="130" fill="white" fontSize="62" fontWeight="900" fontFamily="Playfair Display">MM&GG</text>
                <text x="52" y="150" fill="#D4AF37" fontSize="13" fontWeight="bold" letterSpacing="3.5" className="uppercase opacity-90">Real Estate & Property</text>
            </svg>
          </Link>

          {/* Nav Items */}
          <nav className="hidden lg:flex items-center gap-10">
            {navLinks.map((link) => (
              <Link
                key={link.path}
                to={link.path}
                className={`text-xs font-black tracking-[0.2em] transition-all hover:text-[#D4AF37] uppercase py-2 border-b-2 ${location.pathname === link.path ? 'border-[#D4AF37] text-[#D4AF37]' : 'border-transparent text-white/90'}`}
              >
                {link.name}
              </Link>
            ))}
            {isAdmin && (
              <Link to="/admin" className="text-xs font-black text-[#D4AF37] flex items-center gap-2 bg-white/10 px-4 py-2 rounded-full border border-[#D4AF37]/30 hover:bg-[#D4AF37] hover:text-[#001F3F] transition-all">
                <LayoutDashboard size={14} /> DASHBOARD
              </Link>
            )}
            <a
              href={`https://wa.me/${CONTACT_INFO.WHATSAPP}`}
              target="_blank"
              rel="noopener noreferrer"
              className="bg-[#D4AF37] text-[#001F3F] px-8 py-3.5 rounded-full font-black text-[11px] hover:bg-white transition-all shadow-[0_8px_20px_-5px_rgba(212,175,55,0.4)] hover:shadow-none hover:translate-y-0.5 uppercase tracking-widest"
            >
              Contact Specialist
            </a>
          </nav>

          <button className="lg:hidden p-2 rounded-xl bg-white/10" onClick={() => setIsMenuOpen(!isMenuOpen)}>
            {isMenuOpen ? <X size={28} /> : <Menu size={28} />}
          </button>
        </div>

        {/* Mobile Sidebar Navigation */}
        <div className={`fixed inset-0 z-[-1] bg-black/60 backdrop-blur-sm lg:hidden transition-opacity duration-300 ${isMenuOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'}`} onClick={() => setIsMenuOpen(false)} />
        <div className={`fixed top-0 right-0 h-full w-4/5 max-w-sm bg-[#004d29] lg:hidden transition-transform duration-500 transform ${isMenuOpen ? 'translate-x-0' : 'translate-x-full'} shadow-2xl z-[70] p-8`}>
           <div className="flex justify-between items-center mb-12">
              <span className="font-serif font-black text-2xl text-white">MM&GG</span>
              <button onClick={() => setIsMenuOpen(false)} className="p-2 bg-white/10 rounded-full"><X size={24} /></button>
           </div>
           <div className="flex flex-col gap-6">
              {navLinks.map((link) => (
                <Link
                  key={link.path}
                  to={link.path}
                  onClick={() => setIsMenuOpen(false)}
                  className="text-lg font-bold text-white/90 hover:text-[#D4AF37] border-b border-white/10 pb-4 flex justify-between items-center"
                >
                  {link.name} <ArrowRight size={18} className="text-[#D4AF37]" />
                </Link>
              ))}
              {isAdmin && (
                <Link to="/admin" onClick={() => setIsMenuOpen(false)} className="text-lg font-bold text-[#D4AF37] border-b border-white/10 pb-4">Admin Dashboard</Link>
              )}
           </div>
        </div>
      </header>

      <main className="flex-grow">
        {children}
      </main>

      {/* Professional Footer */}
      <footer className="bg-[#001F3F] text-white pt-24 pb-12 px-8 relative overflow-hidden">
        <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-[#006837] via-[#D4AF37] to-[#006837]"></div>
        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-16 relative z-10">
          <div className="space-y-8">
            <svg viewBox="0 0 400 150" className="h-16 w-auto">
                <path d="M50 100 L150 20 L250 100" fill="none" stroke="#D4AF37" strokeWidth="8" />
                <text x="50" y="130" fill="white" fontSize="55" fontWeight="900" fontFamily="Playfair Display">MM&GG</text>
            </svg>
            <p className="text-slate-400 text-sm leading-relaxed max-w-xs font-medium">
              Redefining Nigerian luxury through exceptional real estate developments, high-end furniture, and signature architectural paints.
            </p>
            <div className="flex gap-4">
              {[1,2,3].map(i => <div key={i} className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center hover:bg-[#D4AF37] transition-all cursor-pointer"><Instagram size={18} /></div>)}
            </div>
          </div>

          <div>
            <h4 className="font-black mb-8 text-[#D4AF37] uppercase tracking-[0.2em] text-[10px]">Business Segments</h4>
            <ul className="space-y-4 text-xs font-bold text-slate-300 uppercase tracking-widest">
              <li><Link to="/properties" className="hover:text-white transition-all flex items-center gap-2">Property Sales <ArrowRight size={10} className="text-[#D4AF37]" /></Link></li>
              <li><Link to="/furniture" className="hover:text-white transition-all flex items-center gap-2">Furniture Design <ArrowRight size={10} className="text-[#D4AF37]" /></Link></li>
              <li><Link to="/paints" className="hover:text-white transition-all flex items-center gap-2">Paint Solutions <ArrowRight size={10} className="text-[#D4AF37]" /></Link></li>
            </ul>
          </div>

          <div>
            <h4 className="font-black mb-8 text-[#D4AF37] uppercase tracking-[0.2em] text-[10px]">Office Locations</h4>
            <div className="space-y-6 text-xs text-slate-400 font-medium">
              <p className="flex items-start gap-3"><MapPin size={16} className="text-[#D4AF37] mt-0.5 flex-shrink-0" /> Lagos HQ: Ikeja GRA, Lagos State, Nigeria</p>
              <p className="flex items-start gap-3"><MapPin size={16} className="text-[#D4AF37] mt-0.5 flex-shrink-0" /> Abuja Branch: Maitama, Abuja FCT</p>
              <p className="flex items-center gap-3"><Phone size={16} className="text-[#D4AF37] flex-shrink-0" /> {CONTACT_INFO.PHONE}</p>
            </div>
          </div>

          <div>
            <h4 className="font-black mb-8 text-[#D4AF37] uppercase tracking-[0.2em] text-[10px]">Admin Access</h4>
            {!isAdmin ? (
              <div className="space-y-4">
                {!showLogin ? (
                  <button onClick={() => setShowLogin(true)} className="group flex items-center gap-3 text-[10px] font-black uppercase tracking-[0.2em] text-slate-500 hover:text-[#D4AF37] transition-colors">
                    <Lock size={14} className="group-hover:animate-bounce" /> Portal Sign-in
                  </button>
                ) : (
                  <form onSubmit={handleLogin} className="space-y-3 bg-white/5 p-5 rounded-2xl border border-white/10 animate-in fade-in slide-in-from-bottom-2 duration-300">
                    <div className="relative">
                      <User size={12} className="absolute left-3 top-1/2 -translate-y-1/2 text-white/30" />
                      <input 
                        type="text" 
                        placeholder="ID" 
                        className="w-full bg-white/10 border-none text-[10px] pl-8 pr-3 py-3 rounded-lg outline-none text-white focus:bg-white/20"
                        value={credentials.user}
                        onChange={e => setCredentials({...credentials, user: e.target.value})}
                      />
                    </div>
                    <div className="relative">
                      <Lock size={12} className="absolute left-3 top-1/2 -translate-y-1/2 text-white/30" />
                      <input 
                        type="password" 
                        placeholder="KEY" 
                        className="w-full bg-white/10 border-none text-[10px] pl-8 pr-3 py-3 rounded-lg outline-none text-white focus:bg-white/20"
                        value={credentials.pass}
                        onChange={e => setCredentials({...credentials, pass: e.target.value})}
                      />
                    </div>
                    <button className="w-full bg-[#D4AF37] text-[#001F3F] text-[10px] font-black py-3 rounded-lg tracking-widest hover:bg-white transition-all">ENTER PORTAL</button>
                    <button type="button" onClick={() => setShowLogin(false)} className="w-full text-[10px] text-slate-500 font-bold uppercase tracking-tighter">Exit</button>
                  </form>
                )}
              </div>
            ) : (
              <div className="space-y-4 bg-[#25D366]/5 p-5 rounded-2xl border border-[#25D366]/20">
                <p className="text-[10px] text-[#25D366] font-black uppercase tracking-[0.2em]">● Authorized Session</p>
                <button 
                  onClick={() => { localStorage.removeItem('admin_auth'); navigate('/'); window.location.reload(); }} 
                  className="text-[10px] font-black text-red-400 underline uppercase tracking-tighter hover:text-red-300"
                >
                  Terminate Access
                </button>
              </div>
            )}
          </div>
        </div>

        <div className="max-w-7xl mx-auto border-t border-white/5 mt-20 pt-10 flex flex-col md:flex-row justify-between items-center gap-6 text-[10px] text-slate-500 uppercase tracking-widest font-bold">
          <p>© {new Date().getFullYear()} MM&GG REAL ESTATE AND PROPERTY LTD. ALL RIGHTS RESERVED.</p>
          <div className="flex gap-10">
            <a href="#" className="hover:text-[#D4AF37] transition-colors">Privacy Policy</a>
            <a href="#" className="hover:text-[#D4AF37] transition-colors">Client Terms</a>
            <a href="#" className="hover:text-[#D4AF37] transition-colors">Agent Portal</a>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Layout;
