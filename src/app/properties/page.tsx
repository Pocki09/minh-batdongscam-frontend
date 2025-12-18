'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { Building, Search, MapPin, Bed, Bath, Square, Heart, Grid, List, SlidersHorizontal, ChevronDown, X, Menu } from 'lucide-react';
import Footer from '@/app/components/layout/Footer';

// Mock properties data
const allProperties = [
  {
    id: 1,
    title: 'Modern Villa with Pool',
    image: 'https://images.unsplash.com/photo-1564013799919-ab600027ffc6?w=800',
    price: 850000,
    priceDisplay: '$850,000',
    type: 'Sale',
    category: 'Villa',
    location: 'District 7',
    city: 'Ho Chi Minh City',
    bedrooms: 4,
    bathrooms: 3,
    area: 280,
    areaDisplay: '280 m²',
    isFavorite: false,
  },
  {
    id: 2,
    title: 'Luxury Apartment Downtown',
    image: 'https://images.unsplash.com/photo-1512917774080-9991f1c4c750?w=800',
    price: 1200,
    priceDisplay: '$1,200/month',
    type: 'Rent',
    category: 'Apartment',
    location: 'District 1',
    city: 'Ho Chi Minh City',
    bedrooms: 2,
    bathrooms: 2,
    area: 120,
    areaDisplay: '120 m²',
    isFavorite: true,
  },
  {
    id: 3,
    title: 'Family House with Garden',
    image: 'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=800',
    price: 650000,
    priceDisplay: '$650,000',
    type: 'Sale',
    category: 'House',
    location: 'Thu Duc City',
    city: 'Ho Chi Minh',
    bedrooms: 5,
    bathrooms: 4,
    area: 350,
    areaDisplay: '350 m²',
    isFavorite: false,
  },
  {
    id: 4,
    title: 'Cozy Studio Near Park',
    image: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=800',
    price: 450,
    priceDisplay: '$450/month',
    type: 'Rent',
    category: 'Studio',
    location: 'Binh Thanh',
    city: 'Ho Chi Minh City',
    bedrooms: 1,
    bathrooms: 1,
    area: 45,
    areaDisplay: '45 m²',
    isFavorite: false,
  },
  {
    id: 5,
    title: 'Penthouse with City View',
    image: 'https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=800',
    price: 2500000,
    priceDisplay: '$2,500,000',
    type: 'Sale',
    category: 'Penthouse',
    location: 'District 3',
    city: 'Ho Chi Minh City',
    bedrooms: 3,
    bathrooms: 3,
    area: 200,
    areaDisplay: '200 m²',
    isFavorite: false,
  },
  {
    id: 6,
    title: 'Beach Front Villa',
    image: 'https://images.unsplash.com/photo-1613977257363-707ba9348227?w=800',
    price: 1800000,
    priceDisplay: '$1,800,000',
    type: 'Sale',
    category: 'Villa',
    location: 'Vung Tau',
    city: 'Ba Ria',
    bedrooms: 6,
    bathrooms: 5,
    area: 450,
    areaDisplay: '450 m²',
    isFavorite: false,
  },
  {
    id: 7,
    title: 'Modern Office Space',
    image: 'https://images.unsplash.com/photo-1497366216548-37526070297c?w=800',
    price: 3500,
    priceDisplay: '$3,500/month',
    type: 'Rent',
    category: 'Commercial',
    location: 'District 1',
    city: 'Ho Chi Minh City',
    bedrooms: 0,
    bathrooms: 2,
    area: 200,
    areaDisplay: '200 m²',
    isFavorite: false,
  },
  {
    id: 8,
    title: 'Riverside Apartment',
    image: 'https://images.unsplash.com/photo-1600566753190-17f0baa2a6c3?w=800',
    price: 1800,
    priceDisplay: '$1,800/month',
    type: 'Rent',
    category: 'Apartment',
    location: 'District 2',
    city: 'Ho Chi Minh City',
    bedrooms: 3,
    bathrooms: 2,
    area: 150,
    areaDisplay: '150 m²',
    isFavorite: false,
  },
];

const categories = ['All', 'House', 'Apartment', 'Villa', 'Studio', 'Penthouse', 'Commercial', 'Land'];
const locations = ['All Locations', 'District 1', 'District 2', 'District 3', 'District 7', 'Binh Thanh', 'Thu Duc City', 'Vung Tau'];

export default function PropertiesPage() {
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [searchTerm, setSearchTerm] = useState('');
  const [propertyType, setPropertyType] = useState<'all' | 'Sale' | 'Rent'>('all');
  const [category, setCategory] = useState('All');
  const [location, setLocation] = useState('All Locations');
  const [priceRange, setPriceRange] = useState<'all' | 'low' | 'mid' | 'high'>('all');
  const [showFilters, setShowFilters] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  // Filter properties
  const filteredProperties = allProperties.filter(p => {
    const matchesSearch = p.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          p.location.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesType = propertyType === 'all' || p.type === propertyType;
    const matchesCategory = category === 'All' || p.category === category;
    const matchesLocation = location === 'All Locations' || p.location === location;
    
    let matchesPrice = true;
    if (priceRange === 'low') matchesPrice = p.price < 500000;
    else if (priceRange === 'mid') matchesPrice = p.price >= 500000 && p.price < 1500000;
    else if (priceRange === 'high') matchesPrice = p.price >= 1500000;
    
    return matchesSearch && matchesType && matchesCategory && matchesLocation && matchesPrice;
  });

  const toggleFavorite = (id: number) => {
    // TODO: Implement favorite toggle
    console.log('Toggle favorite:', id);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Navigation */}
      <nav className="fixed top-0 left-0 right-0 z-50 bg-white border-b border-gray-100">
        <div className="max-w-[95%] mx-auto">
          <div className="flex items-center justify-between h-16 px-4">
            {/* Left: Logo + Navigation */}
            <div className="flex items-center gap-8">
              <Link href="/" className="flex items-center gap-2">
                <div className="w-10 h-10 bg-red-600 rounded-xl flex items-center justify-center">
                  <Building className="w-6 h-6 text-white" />
                </div>
                <span className="font-bold text-xl text-gray-900">
                  BatDong<span className="text-red-600">Scam</span>
                </span>
              </Link>

              {/* Desktop Navigation - RIGHT of logo */}
              <div className="hidden lg:flex items-center gap-6">
                <Link href="/properties?type=rent" className="text-sm font-bold text-gray-900 hover:text-gray-700">Rent</Link>
                <Link href="/properties?type=sale" className="text-sm font-bold text-gray-900 hover:text-gray-700">Buy</Link>
                <Link href="/projects" className="text-sm font-bold text-gray-900 hover:text-gray-700">Projects</Link>
              </div>
            </div>

            {/* Right: Auth Buttons */}
            <div className="hidden lg:flex items-center gap-4">
              <Link href="/login" className="text-sm font-bold text-gray-900 hover:text-gray-700">Login</Link>
              <Link href="/register" className="px-5 py-2 bg-red-600 text-white text-sm font-medium rounded-lg hover:bg-red-700">Sign Up</Link>
            </div>

            <button onClick={() => setMobileMenuOpen(!mobileMenuOpen)} className="lg:hidden p-2">
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </nav>

      <div className="pt-20 max-w-[85%] mx-auto px-4 py-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900">Properties for {propertyType === 'Rent' ? 'Rent' : propertyType === 'Sale' ? 'Sale' : 'Sale & Rent'}</h1>
          <p className="text-gray-600 mt-2">{filteredProperties.length} properties found</p>
        </div>

        {/* Search & Filters */}
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 mb-8">
          {/* Search Bar */}
          <div className="flex flex-col lg:flex-row gap-4 mb-6">
            <div className="relative flex-1">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
              <input
                type="text"
                placeholder="Search by property name, location..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-12 pr-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-red-500/20 focus:border-red-500"
              />
            </div>
            <button
              onClick={() => setShowFilters(!showFilters)}
              className="flex items-center gap-2 px-6 py-3 border border-gray-200 rounded-xl hover:bg-gray-50 lg:hidden"
            >
              <SlidersHorizontal className="w-5 h-5" />
              Filters
            </button>
          </div>

          {/* Type Tabs */}
          <div className="flex flex-wrap gap-2 mb-4">
            <button
              onClick={() => setPropertyType('all')}
              className={`px-4 py-2 text-sm font-medium rounded-lg transition-colors ${
                propertyType === 'all' ? 'bg-red-600 text-white' : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
              }`}
            >
              All
            </button>
            <button
              onClick={() => setPropertyType('Sale')}
              className={`px-4 py-2 text-sm font-medium rounded-lg transition-colors ${
                propertyType === 'Sale' ? 'bg-red-600 text-white' : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
              }`}
            >
              For Sale
            </button>
            <button
              onClick={() => setPropertyType('Rent')}
              className={`px-4 py-2 text-sm font-medium rounded-lg transition-colors ${
                propertyType === 'Rent' ? 'bg-red-600 text-white' : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
              }`}
            >
              For Rent
            </button>
          </div>

          {/* Advanced Filters */}
          <div className={`grid sm:grid-cols-2 lg:grid-cols-4 gap-4 ${showFilters ? 'block' : 'hidden lg:grid'}`}>
            <select
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              className="px-4 py-2.5 border border-gray-200 rounded-xl focus:ring-2 focus:ring-red-500/20 focus:border-red-500 text-sm"
            >
              {categories.map((cat) => (
                <option key={cat} value={cat}>{cat}</option>
              ))}
            </select>
            <select
              value={location}
              onChange={(e) => setLocation(e.target.value)}
              className="px-4 py-2.5 border border-gray-200 rounded-xl focus:ring-2 focus:ring-red-500/20 focus:border-red-500 text-sm"
            >
              {locations.map((loc) => (
                <option key={loc} value={loc}>{loc}</option>
              ))}
            </select>
            <select
              value={priceRange}
              onChange={(e) => setPriceRange(e.target.value as any)}
              className="px-4 py-2.5 border border-gray-200 rounded-xl focus:ring-2 focus:ring-red-500/20 focus:border-red-500 text-sm"
            >
              <option value="all">Any Price</option>
              <option value="low">Under $500,000</option>
              <option value="mid">$500,000 - $1,500,000</option>
              <option value="high">Over $1,500,000</option>
            </select>
            <div className="flex items-center gap-2">
              <button
                onClick={() => setViewMode('grid')}
                className={`p-2.5 rounded-lg transition-colors ${viewMode === 'grid' ? 'bg-red-100 text-red-600' : 'text-gray-400 hover:text-gray-600'}`}
              >
                <Grid className="w-5 h-5" />
              </button>
              <button
                onClick={() => setViewMode('list')}
                className={`p-2.5 rounded-lg transition-colors ${viewMode === 'list' ? 'bg-red-100 text-red-600' : 'text-gray-400 hover:text-gray-600'}`}
              >
                <List className="w-5 h-5" />
              </button>
            </div>
          </div>
        </div>

        {/* Properties Grid/List */}
        {viewMode === 'grid' ? (
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {filteredProperties.map((property) => (
              <Link
                key={property.id}
                href={`/property/${property.id}`}
                className="group bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 border border-gray-100"
              >
                <div className="relative h-48 overflow-hidden">
                  <img
                    src={property.image}
                    alt={property.title}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                  />
                  <div className="absolute top-3 left-3">
                    <span className={`px-3 py-1 text-xs font-bold rounded-full ${
                      property.type === 'Sale' ? 'bg-green-500 text-white' : 'bg-blue-500 text-white'
                    }`}>
                      For {property.type}
                    </span>
                  </div>
                  <button 
                    onClick={(e) => { e.preventDefault(); toggleFavorite(property.id); }}
                    className="absolute top-3 right-3 w-8 h-8 bg-white/90 rounded-full flex items-center justify-center hover:bg-white"
                  >
                    <Heart className={`w-4 h-4 ${property.isFavorite ? 'fill-red-500 text-red-500' : 'text-gray-600'}`} />
                  </button>
                </div>

                <div className="p-4">
                  <p className="text-xl font-bold text-red-600">{property.priceDisplay}</p>
                  <h3 className="font-semibold text-gray-900 mt-1 line-clamp-1">{property.title}</h3>
                  <p className="text-sm text-gray-500 flex items-center gap-1 mt-2">
                    <MapPin className="w-3 h-3" />
                    {property.location}, {property.city}
                  </p>

                  <div className="flex items-center gap-4 mt-4 pt-4 border-t border-gray-100 text-sm text-gray-600">
                    {property.bedrooms > 0 && (
                      <span className="flex items-center gap-1">
                        <Bed className="w-4 h-4 text-gray-400" />
                        {property.bedrooms}
                      </span>
                    )}
                    <span className="flex items-center gap-1">
                      <Bath className="w-4 h-4 text-gray-400" />
                      {property.bathrooms}
                    </span>
                    <span className="flex items-center gap-1">
                      <Square className="w-4 h-4 text-gray-400" />
                      {property.areaDisplay}
                    </span>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        ) : (
          <div className="space-y-4">
            {filteredProperties.map((property) => (
              <Link
                key={property.id}
                href={`/property/${property.id}`}
                className="flex flex-col lg:flex-row bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-lg transition-all border border-gray-100"
              >
                <div className="relative w-full lg:w-72 h-48 lg:h-auto shrink-0 overflow-hidden">
                  <img
                    src={property.image}
                    alt={property.title}
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute top-3 left-3">
                    <span className={`px-3 py-1 text-xs font-bold rounded-full ${
                      property.type === 'Sale' ? 'bg-green-500 text-white' : 'bg-blue-500 text-white'
                    }`}>
                      For {property.type}
                    </span>
                  </div>
                </div>

                <div className="flex-1 p-5">
                  <div className="flex items-start justify-between">
                    <div>
                      <p className="text-2xl font-bold text-red-600">{property.priceDisplay}</p>
                      <h3 className="text-lg font-semibold text-gray-900 mt-1">{property.title}</h3>
                      <p className="text-gray-500 flex items-center gap-1 mt-2">
                        <MapPin className="w-4 h-4" />
                        {property.location}, {property.city}
                      </p>
                    </div>
                    <button 
                      onClick={(e) => { e.preventDefault(); toggleFavorite(property.id); }}
                      className="w-10 h-10 bg-gray-100 rounded-full flex items-center justify-center hover:bg-gray-200"
                    >
                      <Heart className={`w-5 h-5 ${property.isFavorite ? 'fill-red-500 text-red-500' : 'text-gray-400'}`} />
                    </button>
                  </div>

                  <div className="flex items-center gap-6 mt-4 text-gray-600">
                    {property.bedrooms > 0 && (
                      <span className="flex items-center gap-2">
                        <Bed className="w-5 h-5 text-gray-400" />
                        {property.bedrooms} Beds
                      </span>
                    )}
                    <span className="flex items-center gap-2">
                      <Bath className="w-5 h-5 text-gray-400" />
                      {property.bathrooms} Baths
                    </span>
                    <span className="flex items-center gap-2">
                      <Square className="w-5 h-5 text-gray-400" />
                      {property.areaDisplay}
                    </span>
                  </div>

                  <div className="mt-4">
                    <span className="px-3 py-1 bg-gray-100 text-gray-600 text-sm rounded-full">{property.category}</span>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        )}

        {/* Empty State */}
        {filteredProperties.length === 0 && (
          <div className="flex flex-col items-center justify-center py-16 bg-white rounded-2xl border border-gray-100">
            <Building className="w-16 h-16 text-gray-300 mb-4" />
            <h3 className="text-lg font-medium text-gray-900 mb-2">No properties found</h3>
            <p className="text-gray-500 text-sm">Try adjusting your search or filters</p>
          </div>
        )}
      </div>

      {/* Footer */}
      <Footer />
    </div>
  );
}
