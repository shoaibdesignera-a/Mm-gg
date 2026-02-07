
export enum PropertyType {
  APARTMENT = 'Apartment',
  LAND = 'Land',
  COMMERCIAL = 'Commercial',
  HOUSE = 'House'
}

export enum FurnitureCategory {
  LIVING_ROOM = 'Living Room',
  BEDROOM = 'Bedroom',
  OFFICE = 'Office',
  DINING = 'Dining'
}

export interface Property {
  id: string;
  title: string;
  type: PropertyType;
  location: string;
  price: number;
  bedrooms?: number;
  bathrooms?: number;
  description: string;
  images: string[];
  amenities: string[];
  status: 'Available' | 'Sold';
  videoUrl?: string;
}

export interface Furniture {
  id: string;
  title: string;
  category: FurnitureCategory;
  price: number;
  images: string[];
  description: string;
}

export interface Paint {
  id: string;
  title: string;
  price4L: number;
  price20L: number;
  colors: string[];
  images: string[];
  description: string;
}

export interface Lead {
  id: string;
  name: string;
  email: string;
  phone: string;
  message: string;
  propertyId?: string;
  timestamp: number;
}
