'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { Building, MapPin, Bed, Bath, Square, Heart, Share2, Phone, Mail, Calendar, ChevronLeft, ChevronRight, Star, User, Check, Clock, Shield, Menu, X } from 'lucide-react';
import Modal from '@/app/components/ui/Modal';
import DocumentList from '@/app/components/features/properties/details/DocumentList';
import Footer from '@/app/components/layout/Footer';

// Mock property data
const mockProperty = {
  id: 1,
  title: 'Modern Villa with Pool',
  images: [
    'https://images.unsplash.com/photo-1564013799919-ab600027ffc6?w=1200',
    'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=1200',
    'https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=1200',
    'https://images.unsplash.com/photo-1600566753190-17f0baa2a6c3?w=1200',
  ],
  price: '$850,000',
  type: 'Sale',
  category: 'Villa',
  location: 'District 7, Ho Chi Minh City',
  address: '123 Nguyen Van Linh, Tan Phu Ward, District 7, Ho Chi Minh City',
  bedrooms: 4,
  bathrooms: 3,
  area: '280 m²',
  yearBuilt: 2022,
  description: `This stunning modern villa offers the perfect blend of luxury and comfort. Located in the prestigious District 7, this property features contemporary architecture with high-end finishes throughout.

The spacious open-plan living area seamlessly connects to the gourmet kitchen, perfect for entertaining. Floor-to-ceiling windows flood the space with natural light and offer beautiful views of the private pool and landscaped garden.

The master suite includes a walk-in closet and a spa-like ensuite bathroom. Three additional bedrooms provide ample space for family or guests. The property also features a private cinema room, gym, and a two-car garage.`,
  features: [
    'Swimming Pool',
    'Private Garden',
    'Smart Home System',
    'Air Conditioning',
    'Security System',
    'Private Garage',
    'Modern Kitchen',
    'Cinema Room',
    'Gym',
    'Balcony',
  ],
  agent: {
    name: 'Trần Văn Agent',
    phone: '0909 123 456',
    email: 'agent@batdongscam.vn',
    rating: 4.8,
    reviews: 45,
    avatar: null,
  },
  owner: {
    name: 'Nguyễn Văn Owner',
    verified: true,
  },
  documents: [
    { id: 1, name: 'Property Title Deed.pdf', type: 'PDF', size: '2.4 MB', url: '#' },
    { id: 2, name: 'Building Permit.pdf', type: 'PDF', size: '1.8 MB', url: '#' },
    { id: 3, name: 'Floor Plan.pdf', type: 'PDF', size: '3.2 MB', url: '#' },
  ],
  isFavorite: false,
  views: 234,
  listedAt: '2024-01-10',
};

export default function PropertyDetailPage() {
  const [currentImage, setCurrentImage] = useState(0);
  const [showBookingModal, setShowBookingModal] = useState(false);
  const [isFavorite, setIsFavorite] = useState(mockProperty.isFavorite);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  
  // Booking form state
  const [bookingForm, setBookingForm] = useState({
    date: '',
    time: '',
    name: '',
    phone: '',
    email: '',
    message: '',
  });

  const nextImage = () => {
    setCurrentImage((prev) => (prev + 1) % mockProperty.images.length);
  };

  const prevImage = () => {
    setCurrentImage((prev) => (prev - 1 + mockProperty.images.length) % mockProperty.images.length);
  };

  const handleBooking = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Booking:', bookingForm);
    alert('Viewing request submitted successfully!');
    setShowBookingModal(false);
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

      <div className="pt-16">
        {/* Image Gallery */}
        <div className="relative h-[50vh] lg:h-[60vh] bg-gray-900">
          <img
            src={mockProperty.images[currentImage]}
            alt={mockProperty.title}
            className="w-full h-full object-cover"
          />
          
          {/* Navigation Arrows */}
          <button
            onClick={prevImage}
            className="absolute left-4 top-1/2 -translate-y-1/2 w-12 h-12 bg-white/90 rounded-full flex items-center justify-center hover:bg-white transition-colors shadow-lg"
          >
            <ChevronLeft className="w-6 h-6 text-gray-900" />
          </button>
          <button
            onClick={nextImage}
            className="absolute right-4 top-1/2 -translate-y-1/2 w-12 h-12 bg-white/90 rounded-full flex items-center justify-center hover:bg-white transition-colors shadow-lg"
          >
            <ChevronRight className="w-6 h-6 text-gray-900" />
          </button>

          {/* Image Counter */}
          <div className="absolute bottom-4 left-1/2 -translate-x-1/2 px-4 py-2 bg-black/60 text-white text-sm rounded-full">
            {currentImage + 1} / {mockProperty.images.length}
          </div>

          {/* Thumbnails */}
          <div className="absolute bottom-4 right-4 flex gap-2">
            {mockProperty.images.map((img, idx) => (
              <button
                key={idx}
                onClick={() => setCurrentImage(idx)}
                className={`w-16 h-12 rounded-lg overflow-hidden border-2 transition-all ${
                  currentImage === idx ? 'border-white' : 'border-transparent opacity-70 hover:opacity-100'
                }`}
              >
                <img src={img} alt="" className="w-full h-full object-cover" />
              </button>
            ))}
          </div>

          {/* Actions */}
          <div className="absolute top-4 right-4 flex gap-2">
            <button
              onClick={() => setIsFavorite(!isFavorite)}
              className="w-10 h-10 bg-white rounded-full flex items-center justify-center hover:bg-gray-100 transition-colors shadow-lg"
            >
              <Heart className={`w-5 h-5 ${isFavorite ? 'fill-red-500 text-red-500' : 'text-gray-600'}`} />
            </button>
            <button className="w-10 h-10 bg-white rounded-full flex items-center justify-center hover:bg-gray-100 transition-colors shadow-lg">
              <Share2 className="w-5 h-5 text-gray-600" />
            </button>
          </div>

          {/* Type Badge */}
          <div className="absolute top-4 left-4">
            <span className={`px-4 py-2 text-sm font-bold rounded-full ${
              mockProperty.type === 'Sale' ? 'bg-green-500 text-white' : 'bg-blue-500 text-white'
            }`}>
              For {mockProperty.type}
            </span>
          </div>
        </div>

        <div className="max-w-[85%] mx-auto px-4 py-8">
          <div className="grid lg:grid-cols-3 gap-8">
            {/* Main Content */}
            <div className="lg:col-span-2 space-y-8">
              {/* Price & Title */}
              <div>
                <p className="text-3xl font-bold text-red-600">{mockProperty.price}</p>
                <h1 className="text-2xl font-bold text-gray-900 mt-2">{mockProperty.title}</h1>
                <p className="text-gray-600 flex items-center gap-2 mt-2">
                  <MapPin className="w-5 h-5 text-gray-400" />
                  {mockProperty.address}
                </p>
              </div>

              {/* Quick Stats */}
              <div className="grid grid-cols-4 gap-4 bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
                <div className="text-center">
                  <Bed className="w-6 h-6 text-red-600 mx-auto" />
                  <p className="text-lg font-bold text-gray-900 mt-2">{mockProperty.bedrooms}</p>
                  <p className="text-sm text-gray-500">Bedrooms</p>
                </div>
                <div className="text-center">
                  <Bath className="w-6 h-6 text-red-600 mx-auto" />
                  <p className="text-lg font-bold text-gray-900 mt-2">{mockProperty.bathrooms}</p>
                  <p className="text-sm text-gray-500">Bathrooms</p>
                </div>
                <div className="text-center">
                  <Square className="w-6 h-6 text-red-600 mx-auto" />
                  <p className="text-lg font-bold text-gray-900 mt-2">{mockProperty.area}</p>
                  <p className="text-sm text-gray-500">Area</p>
                </div>
                <div className="text-center">
                  <Calendar className="w-6 h-6 text-red-600 mx-auto" />
                  <p className="text-lg font-bold text-gray-900 mt-2">{mockProperty.yearBuilt}</p>
                  <p className="text-sm text-gray-500">Year Built</p>
                </div>
              </div>

              {/* Description */}
              <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
                <h2 className="text-xl font-bold text-gray-900 mb-4">Description</h2>
                <div className="text-gray-600 whitespace-pre-line leading-relaxed">
                  {mockProperty.description}
                </div>
              </div>

              {/* Features */}
              <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
                <h2 className="text-xl font-bold text-gray-900 mb-4">Features & Amenities</h2>
                <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                  {mockProperty.features.map((feature) => (
                    <div key={feature} className="flex items-center gap-2 text-gray-600">
                      <Check className="w-5 h-5 text-green-500" />
                      {feature}
                    </div>
                  ))}
                </div>
              </div>

              {/* Attached Documents */}
              <DocumentList documents={mockProperty.documents} />
            </div>

            {/* Sidebar */}
            <div className="space-y-6">
              {/* Contact Card */}
              <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100 sticky top-24">
                <h3 className="text-lg font-bold text-gray-900 mb-4">Property Owner</h3>
                
                {/* Agent Info */}
                <div className="flex items-center gap-4 mb-6 pb-6 border-b border-gray-100">
                  <div className="w-14 h-14 bg-gradient-to-br from-red-500 to-red-600 rounded-full flex items-center justify-center text-white font-bold">
                    {mockProperty.agent.avatar ? (
                      <img src={mockProperty.agent.avatar} alt="" className="w-full h-full object-cover rounded-full" />
                    ) : (
                      mockProperty.agent.name.split(' ').map(n => n[0]).join('').slice(0, 2)
                    )}
                  </div>
                  <div>
                    <p className="font-semibold text-gray-900">{mockProperty.agent.name}</p>
                    <div className="flex items-center gap-1 text-sm text-gray-500">
                      <Star className="w-4 h-4 text-yellow-500 fill-yellow-500" />
                      {mockProperty.agent.rating} ({mockProperty.agent.reviews} reviews)
                    </div>
                  </div>
                </div>

                {/* Owner Info */}
                <div className="flex items-center gap-4 mb-6 pb-6 border-b border-gray-100">
                  <div className="w-14 h-14 bg-gradient-to-br from-blue-500 to-blue-600 rounded-full flex items-center justify-center text-white font-bold">
                    {mockProperty.owner.name.split(' ').map(n => n[0]).join('').slice(0, 2)}
                  </div>
                  <div>
                    <p className="font-semibold text-gray-900 flex items-center gap-2">
                      {mockProperty.owner.name}
                      {mockProperty.owner.verified && (
                        <Shield className="w-4 h-4 text-green-500" />
                      )}
                    </p>
                    <p className="text-sm text-gray-500">Property Owner</p>
                  </div>
                </div>

                {/* Agent Info */}
                <div className="flex items-center gap-3 mb-6 p-3 bg-gray-50 rounded-lg">
                  <User className="w-5 h-5 text-gray-400" />
                  <div>
                    <p className="text-sm text-gray-500">Sales Agent</p>
                    <p className="font-medium text-gray-900 flex items-center gap-1">
                      {mockProperty.agent.name}
                    </p>
                    <div className="flex items-center gap-1 text-xs text-gray-500">
                      <Star className="w-3 h-3 text-yellow-500 fill-yellow-500" />
                      {mockProperty.agent.rating} ({mockProperty.agent.reviews} reviews)
                    </div>
                  </div>
                </div>

                {/* Contact Buttons */}
                <div className="space-y-3">
                  <button
                    onClick={() => setShowBookingModal(true)}
                    className="w-full py-3 bg-red-600 text-white font-medium rounded-xl hover:bg-red-700 transition-colors flex items-center justify-center gap-2"
                  >
                    <Calendar className="w-5 h-5" />
                    Book a Viewing
                  </button>
                  <a
                    href={`tel:${mockProperty.agent.phone}`}
                    className="w-full py-3 border border-gray-300 text-gray-900 font-medium rounded-xl hover:bg-gray-50 transition-colors flex items-center justify-center gap-2"
                  >
                    <Phone className="w-5 h-5" />
                    Call Agent
                  </a>
                  <a
                    href={`mailto:${mockProperty.agent.email}`}
                    className="w-full py-3 border border-gray-300 text-gray-900 font-medium rounded-xl hover:bg-gray-50 transition-colors flex items-center justify-center gap-2"
                  >
                    <Mail className="w-5 h-5" />
                    Send Email
                  </a>
                </div>

                {/* Property Stats */}
                <div className="mt-6 pt-6 border-t border-gray-100 flex items-center justify-between text-sm text-gray-500">
                  <span className="flex items-center gap-1">
                    <Clock className="w-4 h-4" />
                    Listed {mockProperty.listedAt}
                  </span>
                  <span>{mockProperty.views} views</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Booking Modal */}
      <Modal
        isOpen={showBookingModal}
        onClose={() => setShowBookingModal(false)}
        title="Book a Viewing"
      >
        <form onSubmit={handleBooking} className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Preferred Date</label>
              <input
                type="date"
                value={bookingForm.date}
                onChange={(e) => setBookingForm({ ...bookingForm, date: e.target.value })}
                className="w-full px-4 py-2.5 border border-gray-300 rounded-xl focus:ring-2 focus:ring-red-500/20 focus:border-red-500"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Preferred Time</label>
              <select
                value={bookingForm.time}
                onChange={(e) => setBookingForm({ ...bookingForm, time: e.target.value })}
                className="w-full px-4 py-2.5 border border-gray-300 rounded-xl focus:ring-2 focus:ring-red-500/20 focus:border-red-500"
                required
              >
                <option value="">Select time</option>
                <option value="09:00">09:00 AM</option>
                <option value="10:00">10:00 AM</option>
                <option value="11:00">11:00 AM</option>
                <option value="14:00">02:00 PM</option>
                <option value="15:00">03:00 PM</option>
                <option value="16:00">04:00 PM</option>
              </select>
            </div>
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Full Name</label>
            <input
              type="text"
              value={bookingForm.name}
              onChange={(e) => setBookingForm({ ...bookingForm, name: e.target.value })}
              placeholder="Enter your full name"
              className="w-full px-4 py-2.5 border border-gray-300 rounded-xl focus:ring-2 focus:ring-red-500/20 focus:border-red-500"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Phone Number</label>
            <input
              type="tel"
              value={bookingForm.phone}
              onChange={(e) => setBookingForm({ ...bookingForm, phone: e.target.value })}
              placeholder="Enter your phone number"
              className="w-full px-4 py-2.5 border border-gray-300 rounded-xl focus:ring-2 focus:ring-red-500/20 focus:border-red-500"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
            <input
              type="email"
              value={bookingForm.email}
              onChange={(e) => setBookingForm({ ...bookingForm, email: e.target.value })}
              placeholder="Enter your email"
              className="w-full px-4 py-2.5 border border-gray-300 rounded-xl focus:ring-2 focus:ring-red-500/20 focus:border-red-500"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Message (Optional)</label>
            <textarea
              value={bookingForm.message}
              onChange={(e) => setBookingForm({ ...bookingForm, message: e.target.value })}
              placeholder="Any questions or special requests?"
              rows={3}
              className="w-full px-4 py-2.5 border border-gray-300 rounded-xl focus:ring-2 focus:ring-red-500/20 focus:border-red-500 resize-none"
            />
          </div>

          <button
            type="submit"
            className="w-full py-3 bg-red-600 text-white font-medium rounded-xl hover:bg-red-700 transition-colors"
          >
            Submit Request
          </button>
        </form>
      </Modal>

      {/* Footer */}
      <Footer />
    </div>
  );
}
