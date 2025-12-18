'use client';

import React, { useState, useRef, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import {
  Building,
  Heart,
  Home,
  Calendar,
  FileText,
  Wallet,
  Bell,
  User,
  ChevronDown,
  LogOut,
  Settings,
  MapPin,
  Search,
  Menu,
  X,
  AlertTriangle,
  Briefcase,
  Users,
  LayoutDashboard,
  Plus,
} from 'lucide-react';

type UserRole = 'customer' | 'owner' | 'agent';

interface NavBarProps {
  role?: UserRole;
}

interface MenuItem {
  href: string;
  label: string;
  icon: React.ElementType;
}

const customerMenuItems: MenuItem[] = [
  { href: '/my/properties', label: 'Properties', icon: Building },
  { href: '/my/favorites', label: 'Favorites', icon: Heart },
  { href: '/my/profile', label: 'My Profile', icon: User },
  { href: '/my/viewings', label: 'Viewings', icon: Calendar },
  { href: '/my/payments', label: 'Payments', icon: Wallet },
  { href: '/my/reports', label: 'Violation Reports', icon: AlertTriangle },
  { href: '/my/notifications', label: 'Notifications', icon: Bell },
];

const ownerMenuItems: MenuItem[] = [
  { href: '/owner/dashboard', label: 'Dashboard', icon: LayoutDashboard },
  { href: '/my/properties', label: 'My Properties', icon: Building },
  { href: '/my/contracts', label: 'Contracts', icon: FileText },
  { href: '/my/payments', label: 'Payments', icon: Wallet },
  { href: '/my/reports', label: 'Reports', icon: AlertTriangle },
];

const agentMenuItems: MenuItem[] = [
  { href: '/agent/dashboard', label: 'Dashboard', icon: LayoutDashboard },
  { href: '/my/properties', label: 'My Assigned Properties', icon: Building },
  { href: '/agent/assignments', label: 'Assignments', icon: Briefcase },
  { href: '/my/appointments', label: 'Appointments', icon: Calendar },
  { href: '/agent/customers', label: 'Customers', icon: Users },
  { href: '/my/contracts', label: 'Contracts', icon: FileText },
];

const userInfo = {
  customer: { name: 'Phan Đình Minh', email: 'phandinhminh@batdongscam.vn', initials: 'PM' },
  owner: { name: 'Nguyễn Văn Owner', email: 'owner@batdongscam.vn', initials: 'NO' },
  agent: { name: 'Trần Văn Agent', email: 'agent@batdongscam.vn', initials: 'TA' },
};

export default function NavBar({ role = 'customer' }: NavBarProps) {
  const pathname = usePathname();
  const [showDropdown, setShowDropdown] = useState(false);
  const [showMobileMenu, setShowMobileMenu] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  const menuItems = role === 'owner' ? ownerMenuItems : role === 'agent' ? agentMenuItems : customerMenuItems;
  const user = userInfo[role];

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setShowDropdown(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  return (
    <>
      <nav className="fixed top-0 left-0 right-0 z-50 bg-white border-b border-gray-200">
        <div className="max-w-[95%] mx-auto">
          <div className="flex items-center justify-between h-16 px-4">
            {/* Left Side: Logo + Nav Links */}
            <div className="flex items-center gap-8">
              {/* Logo - matching guest style */}
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
                <Link
                  href="/properties?type=rent"
                  className="text-sm font-bold text-gray-900 hover:text-gray-700 transition-colors"
                >
                  Rent
                </Link>
                <Link
                  href="/properties?type=sale"
                  className="text-sm font-bold text-gray-900 hover:text-gray-700 transition-colors"
                >
                  Buy
                </Link>
                <Link
                  href="/projects"
                  className="text-sm font-bold text-gray-900 hover:text-gray-700 transition-colors"
                >
                  Projects
                </Link>
              </div>
            </div>

            {/* Right Side: Favorites + Notifications + User */}
            <div className="flex items-center gap-4">

              {/* Favorites */}
              <Link
                href="/my/favorites"
                className="p-2 text-gray-600 hover:text-gray-900 transition-colors"
              >
                <Heart className="w-5 h-5" />
              </Link>

              {/* Notifications */}
              <Link
                href="/my/notifications"
                className="relative p-2 text-gray-600 hover:text-gray-900 transition-colors"
              >
                <Bell className="w-5 h-5" />
                <span className="absolute top-1 right-1 w-2 h-2 bg-red-600 rounded-full"></span>
              </Link>

              {/* User Dropdown */}
              <div className="relative" ref={dropdownRef}>
                <button
                  onClick={() => setShowDropdown(!showDropdown)}
                  className="flex items-center gap-2 hover:opacity-80 transition-opacity"
                >
                  <div className="w-8 h-8 bg-gray-200 rounded-full flex items-center justify-center overflow-hidden">
                    <img 
                      src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100" 
                      alt="Profile" 
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div className="hidden sm:block text-left">
                    <p className="text-sm font-medium text-gray-900">{user.name}</p>
                  </div>
                  <ChevronDown className={`w-4 h-4 text-gray-600 transition-transform ${showDropdown ? 'rotate-180' : ''}`} />
                </button>

                {/* Dropdown Menu */}
                {showDropdown && (
                  <div className="absolute right-0 mt-2 w-64 bg-white rounded-lg shadow-lg border border-gray-100 py-2 z-50">
                    {/* User Info */}
                    <div className="px-4 py-3 border-b border-gray-100">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-full overflow-hidden">
                          <img 
                            src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100" 
                            alt="Profile" 
                            className="w-full h-full object-cover"
                          />
                        </div>
                        <div>
                          <p className="font-medium text-gray-900">{user.name}</p>
                          <p className="text-xs text-gray-500">{user.email}</p>
                        </div>
                      </div>
                    </div>

                    {/* Menu Items */}
                    <div className="py-2">
                      {menuItems.map((item) => (
                        <Link
                          key={item.href}
                          href={item.href}
                          onClick={() => setShowDropdown(false)}
                          className={`flex items-center gap-3 px-4 py-2 text-sm transition-colors ${
                            pathname === item.href || pathname.startsWith(item.href + '/')
                              ? 'text-red-600 bg-red-50'
                              : 'text-gray-600 hover:text-gray-900 hover:bg-gray-50'
                          }`}
                        >
                          <item.icon className="w-4 h-4" />
                          {item.label}
                        </Link>
                      ))}
                    </div>

                    {/* Owner Quick Action */}
                    {role === 'owner' && (
                      <div className="px-4 py-2 border-t border-gray-100">
                        <Link
                          href="/owner/properties/new"
                          onClick={() => setShowDropdown(false)}
                          className="flex items-center gap-2 w-full px-3 py-2 bg-red-600 text-white text-sm font-medium rounded-lg hover:bg-red-700 transition-colors"
                        >
                          <Plus className="w-4 h-4" />
                          Add New Property
                        </Link>
                      </div>
                    )}

                    {/* Footer */}
                    <div className="border-t border-gray-100 pt-2 mt-2">
                      <Link
                        href="/settings"
                        onClick={() => setShowDropdown(false)}
                        className="flex items-center gap-3 px-4 py-2 text-sm text-gray-600 hover:text-gray-900 hover:bg-gray-50 transition-colors"
                      >
                        <Settings className="w-4 h-4" />
                        Settings
                      </Link>
                      <button
                        onClick={() => setShowDropdown(false)}
                        className="flex items-center gap-3 px-4 py-2 text-sm text-red-600 hover:bg-red-50 transition-colors w-full text-left"
                      >
                        <LogOut className="w-4 h-4" />
                        Sign Out
                      </button>
                    </div>
                  </div>
                )}
              </div>

              {/* Mobile Menu Button */}
              <button
                onClick={() => setShowMobileMenu(!showMobileMenu)}
                className="lg:hidden p-2 text-gray-900"
              >
                {showMobileMenu ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Menu */}
        {showMobileMenu && (
          <div className="lg:hidden bg-white border-t border-gray-200">
            <div className="px-4 py-4 space-y-2">
              <Link
                href="/properties?type=rent"
                onClick={() => setShowMobileMenu(false)}
                className="block py-2 text-sm font-bold text-gray-900 hover:text-gray-700"
              >
                Rent
              </Link>
              <Link
                href="/properties?type=sale"
                onClick={() => setShowMobileMenu(false)}
                className="block py-2 text-sm font-bold text-gray-900 hover:text-gray-700"
              >
                Buy
              </Link>
              <Link
                href="/projects"
                onClick={() => setShowMobileMenu(false)}
                className="block py-2 text-sm font-bold text-gray-900 hover:text-gray-700"
              >
                Projects
              </Link>
            </div>
          </div>
        )}
      </nav>
      
      {/* Spacer for fixed navbar */}
      <div className="h-14" />
    </>
  );
}
