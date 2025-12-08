'use client';

import React, { useState } from 'react';
import { Search, X, RotateCcw, Check } from 'lucide-react';
import Modal from '@/app/components/ui/Modal'; // Đảm bảo đường dẫn đúng

interface LocationPickerProps {
  isOpen: boolean;
  onClose: () => void;
  onSelect: (location: string) => void;
}

// Mock data 
const POPULAR_CITIES = ['Hà Nội', 'Gay', 'Gay', 'Gay', 'Gay', 'Gay'];
const ALL_CITIES = Array(40).fill('Gay');

export default function LocationPicker({ isOpen, onClose, onSelect }: LocationPickerProps) {
  const [searchTerm, setSearchTerm] = useState('');
  // Mock tags đã chọn
  const [selectedTags, setSelectedTags] = useState<string[]>(['Hồ Chí Minh/Tân Bình', 'Đà Nẵng/All', 'Hồ Chí Minh/Gò Vấp/Hạnh Thông']);

  const removeTag = (tag: string) => {
      setSelectedTags(prev => prev.filter(t => t !== tag));
  }

  return (
    <Modal isOpen={isOpen} onClose={onClose} title="Where are you interested in?">
      <div className="absolute top-5 right-12 flex gap-2">
         <button 
            className="flex items-center gap-1 px-3 py-1.5 border border-red-600 text-red-600 text-xs font-bold rounded bg-white hover:bg-red-50 transition-colors"
            onClick={() => setSelectedTags([])}
         >
            <RotateCcw className="w-3 h-3" /> Reset All
         </button>
         <button 
            onClick={onClose} 
            className="flex items-center gap-1 px-3 py-1.5 bg-red-600 text-white text-xs font-bold rounded hover:bg-red-700 transition-colors"
         >
            <Check className="w-3 h-3" /> Done
         </button>
      </div>

      <div className="space-y-4 mt-2">
        {/* Search Input */}
        <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 w-5 h-5" />
            <input 
                type="text" 
                placeholder="Enter Location" 
                className="w-full pl-10 pr-4 py-2.5 bg-gray-100 border-none rounded-lg text-sm focus:outline-none focus:ring-1 focus:ring-red-500 transition-colors"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
            />
        </div>

        {/* Selected Tags List */}
        <div className="flex flex-wrap gap-2">
            {selectedTags.map((tag, idx) => (
                <span key={idx} className="inline-flex items-center gap-1 px-2 py-1 bg-white border border-gray-200 rounded text-[11px] font-medium text-gray-700 shadow-sm whitespace-nowrap">
                    {tag}
                    <X 
                        className="w-3 h-3 cursor-pointer text-red-500 hover:text-red-700" 
                        onClick={() => removeTag(tag)}
                    />
                </span>
            ))}
        </div>

        <hr className="border-gray-100"/>

        {/* Top Popular Cities (Grid ô vuông xám) */}
        <div>
            <h4 className="text-sm font-medium text-gray-600 mb-3">Top 10 popular cities</h4>
            <div className="grid grid-cols-3 sm:grid-cols-6 gap-3">
                {POPULAR_CITIES.map((city, idx) => (
                    <div 
                        key={idx}
                        className="aspect-square bg-gray-300 hover:bg-gray-400 rounded-sm flex items-end justify-center p-2 cursor-pointer transition-colors"
                        onClick={() => onSelect(city)}
                    >
                        <span className="text-white font-medium text-xs drop-shadow-md">{city}</span>
                    </div>
                ))}
            </div>
            <div className="h-1 w-full bg-gray-200 mt-4 rounded-full overflow-hidden">
                <div className="h-full w-2/3 bg-red-600"></div>
            </div>
        </div>

        {/* All Cities List */}
        <div>
             <h4 className="text-sm font-medium text-gray-600 mb-3">All cities (double click to select districts)</h4>
             <div className="grid grid-cols-2 sm:grid-cols-4 md:grid-cols-6 gap-y-2 gap-x-2 max-h-60 overflow-y-auto custom-scrollbar">
                {ALL_CITIES.map((city, idx) => (
                    <button 
                        key={idx} 
                        className="text-left text-xs text-gray-500 hover:text-red-600 hover:font-bold transition-all py-1"
                        onClick={() => onSelect(city)}
                    >
                        {city}
                    </button>
                ))}
             </div>
        </div>
      </div>
    </Modal>
  );
}