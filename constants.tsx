
import React from 'react';

export const COLORS = {
  EMERALD: '#006837',
  NAVY: '#001F3F',
  GOLD: '#D4AF37',
  WHITE: '#FFFFFF',
  SLATE: '#64748b'
};

export const CONTACT_INFO = {
  PHONE: '+234 813 619 0811',
  WHATSAPP: '2348136190811',
  EMAIL: 'info@mmggrealestate.com',
  INSTAGRAM: '@mmggrealestateandprty',
  TIKTOK: '@mmgg.real.estate'
};

export const LOCATIONS = ['Lagos', 'Abuja', 'Magboro', 'Port Harcourt', 'Ibadan'];

export const LOGO_SVG = (
  <svg viewBox="0 0 400 150" className="h-12 w-auto">
    <path d="M50 100 L150 20 L250 100" fill="none" stroke={COLORS.GOLD} strokeWidth="8" />
    <text x="50" y="130" fill="white" fontSize="48" fontWeight="bold">MM&GG</text>
  </svg>
);
