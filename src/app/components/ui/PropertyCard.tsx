'use client';

import React from 'react';
import Link from 'next/link';
import { MapPin, Bed, Bath, Square, Heart } from 'lucide-react';

interface PropertyCardProps {
  id: number;
  title: string;
  image: string;
  price: string;
  type?: 'Sale' | 'Rent';
  location: string;
  city?: string;
  bedrooms?: number;
  bathrooms?: number;
  area: string;
  isFavorite?: boolean;
  onToggleFavorite?: (id: number) => void;
  category?: string;
  noBorder?: boolean;
}

export default function PropertyCard({
  id,
  title,
  image,
  price,
  type,
  location,
  city,
  bedrooms,
  bathrooms,
  area,
  isFavorite = false,
  onToggleFavorite,
  category,
  noBorder = false,
}: PropertyCardProps) {
  return (
    <Link
      href={`/property/${id}`}
      className={`group bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 ${
        noBorder ? 'border-0' : 'border-2 border-gray-200'
      }`}
    >
      <div className="relative h-48 overflow-hidden">
        <img
          src={image}
          alt={title}
          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
        />
        {type && (
          <div className="absolute top-3 left-3">
            <span className={`px-3 py-1 text-xs font-bold rounded-full ${
              type === 'Sale' ? 'bg-green-500 text-white' : 'bg-blue-500 text-white'
            }`}>
              For {type}
            </span>
          </div>
        )}
        {onToggleFavorite && (
          <button 
            onClick={(e) => { e.preventDefault(); onToggleFavorite(id); }}
            className="absolute top-3 right-3 w-8 h-8 bg-white/90 rounded-full flex items-center justify-center hover:bg-white"
          >
            <Heart className={`w-4 h-4 ${isFavorite ? 'fill-red-500 text-red-500' : 'text-gray-600'}`} />
          </button>
        )}
      </div>

      <div className="p-4">
        <p className="text-xl font-bold text-red-600">{price}</p>
        <h3 className="font-semibold text-gray-900 mt-1 line-clamp-1">{title}</h3>
        <p className="text-sm text-gray-500 flex items-center gap-1 mt-2">
          <MapPin className="w-3 h-3" />
          {location}{city ? `, ${city}` : ''}
        </p>

        <div className="flex items-center gap-4 mt-4 text-sm text-gray-600">
          {bedrooms !== undefined && bedrooms > 0 && (
            <span className="flex items-center gap-1">
              <Bed className="w-4 h-4 text-gray-400" />
              {bedrooms}
            </span>
          )}
          {bathrooms !== undefined && (
            <span className="flex items-center gap-1">
              <Bath className="w-4 h-4 text-gray-400" />
              {bathrooms}
            </span>
          )}
          <span className="flex items-center gap-1">
            <Square className="w-4 h-4 text-gray-400" />
            {area}
          </span>
        </div>
      </div>
    </Link>
  );
}
