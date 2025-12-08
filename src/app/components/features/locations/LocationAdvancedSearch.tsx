'use client';

import React from 'react';
import { ChevronDown, MapPin, RotateCcw, Search, X } from 'lucide-react';

interface LocationAdvancedSearchProps {
  onOpenLocationPicker: () => void;
  onApply: () => void;
  onReset: () => void;
  selectedLocations?: string[]; // Danh sách địa điểm đã chọn 
}

export default function LocationAdvancedSearch({ 
  onOpenLocationPicker, 
  onApply, 
  onReset,
  selectedLocations = ['Hồ Chí Minh/Tân Bình', 'Đà Nẵng/All'] // Mock data
}: LocationAdvancedSearchProps) {
  
  return (
    <div className="space-y-5">
      <p className="text-sm text-gray-500">Filter locations by multiple criteria</p>

      <div className="grid grid-cols-2 gap-4">
        {/* --- ROW 1: Status & Active --- */}
        <div>
           <label className="block text-sm font-bold text-gray-900 mb-1.5">Status</label>
           <div className="relative">
             <select className="w-full appearance-none border border-gray-300 rounded-lg px-3 py-2.5 bg-gray-50 text-sm focus:outline-none focus:border-red-500">
                <option>Multiple (2)</option>
             </select>
             <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-500 pointer-events-none" />
             {/* Badge số lượng chọn */}
             <span className="absolute left-[70px] top-1/2 -translate-y-1/2 bg-gray-500 text-white text-[10px] font-bold px-1.5 rounded">2</span>
           </div>
        </div>

        <div>
           <label className="block text-sm font-bold text-gray-900 mb-1.5">Is active</label>
           <div className="relative">
             <select className="w-full appearance-none border border-gray-300 rounded-lg px-3 py-2.5 bg-gray-50 text-sm focus:outline-none focus:border-red-500">
                <option>All</option>
                <option>Active</option>
                <option>Inactive</option>
             </select>
             <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-500 pointer-events-none" />
           </div>
        </div>

        {/* --- ROW 2: Land Price --- */}
        <div>
          <label className="block text-sm font-bold text-gray-900 mb-1.5">Min land price (VNĐ/m²)</label>
          <input type="text" placeholder="10B" className="w-full border border-gray-300 rounded-lg px-3 py-2.5 bg-gray-50 text-sm focus:outline-none focus:border-red-500" />
        </div>
        <div>
          <label className="block text-sm font-bold text-gray-900 mb-1.5">Max land price (VNĐ/m²)</label>
          <input type="text" placeholder="---" className="w-full border border-gray-300 rounded-lg px-3 py-2.5 bg-gray-50 text-sm focus:outline-none focus:border-red-500" />
        </div>

        {/* --- ROW 3: Area --- */}
        <div>
          <label className="block text-sm font-bold text-gray-900 mb-1.5">Min area (m²)</label>
          <input type="text" placeholder="100" className="w-full border border-gray-300 rounded-lg px-3 py-2.5 bg-gray-50 text-sm focus:outline-none focus:border-red-500" />
        </div>
        <div>
          <label className="block text-sm font-bold text-gray-900 mb-1.5">Max price (m²)</label>
          <input type="text" placeholder="---" className="w-full border border-gray-300 rounded-lg px-3 py-2.5 bg-gray-50 text-sm focus:outline-none focus:border-red-500" />
        </div>

        {/* --- ROW 4: Population --- */}
        <div>
          <label className="block text-sm font-bold text-gray-900 mb-1.5">Min population</label>
          <input type="text" placeholder="100" className="w-full border border-gray-300 rounded-lg px-3 py-2.5 bg-gray-50 text-sm focus:outline-none focus:border-red-500" />
        </div>
        <div>
          <label className="block text-sm font-bold text-gray-900 mb-1.5">Max population</label>
          <input type="text" placeholder="---" className="w-full border border-gray-300 rounded-lg px-3 py-2.5 bg-gray-50 text-sm focus:outline-none focus:border-red-500" />
        </div>

        {/* --- ROW 5: Location Picker Trigger --- */}
        <div className="col-span-2">
           <label className="block text-sm font-bold text-gray-900 mb-1.5">Location</label>
           <div 
             onClick={onOpenLocationPicker}
             className="w-full min-h-[42px] border border-gray-300 rounded-lg px-2 py-1.5 bg-gray-50 flex flex-wrap items-center gap-2 cursor-pointer hover:border-red-500 transition-colors"
           >
              {selectedLocations.length > 0 ? (
                  selectedLocations.map((loc, idx) => (
                    <span key={idx} className="inline-flex items-center gap-1 px-2 py-1 bg-white border border-gray-200 rounded text-xs font-medium text-gray-700 shadow-sm">
                        {loc}
                        <X className="w-3 h-3 text-red-500 hover:text-red-700" />
                    </span>
                  ))
              ) : (
                  <span className="text-sm text-gray-400 px-1">Select cities/districts...</span>
              )}
              <ChevronDown className="w-4 h-4 text-gray-400 ml-auto" />
           </div>
        </div>
      </div>

      {/* --- Footer Actions --- */}
      <div className="flex items-center justify-end gap-3 pt-4 border-t border-gray-100 mt-2">
        <button 
            onClick={onReset}
            className="px-4 py-2 border border-gray-300 rounded-lg text-sm font-medium text-gray-600 hover:bg-gray-50 flex items-center gap-2 transition-colors"
        >
            <RotateCcw className="w-3 h-3" />
            Reset All
        </button>
        <button 
            onClick={onApply}
            className="px-6 py-2 bg-red-600 hover:bg-red-700 text-white text-sm font-bold rounded-lg flex items-center gap-2 transition-colors shadow-sm"
        >
            <Search className="w-3 h-3" />
            Apply
        </button>
      </div>
    </div>
  );
}