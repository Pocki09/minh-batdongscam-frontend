import apiClient from '../client';
import { SingleResponse, ListResponse } from '../types';

const LOCATION_ENDPOINTS = {
  CITIES: '/public/location/cities',
  DISTRICTS: '/public/location/districts',
  WARDS: '/public/location/wards',
};

export interface City {
  cityId: string;
  cityName: string;
  cityDescription?: string;
  cityImageUrl?: string;
}

export interface District {
  districtId: string;
  districtName: string;
  districtDescription?: string;
  districtImageUrl?: string;
  cityId: string;
}

export interface Ward {
  wardId: string;
  wardName: string;
  wardDescription?: string;
  wardImageUrl?: string;
  districtId: string;
}

export const locationService = {
  /**
   * Get all cities
   */
  async getCities(): Promise<City[]> {
    const response = await apiClient.get<ListResponse<City>>(LOCATION_ENDPOINTS.CITIES);
    return response.data.data;
  },

  /**
   * Get districts by city ID
   */
  async getDistricts(cityId: string): Promise<District[]> {
    const response = await apiClient.get<ListResponse<District>>(
      `${LOCATION_ENDPOINTS.DISTRICTS}?cityId=${cityId}`
    );
    return response.data.data;
  },

  /**
   * Get wards by district ID
   */
  async getWards(districtId: string): Promise<Ward[]> {
    const response = await apiClient.get<ListResponse<Ward>>(
      `${LOCATION_ENDPOINTS.WARDS}?districtId=${districtId}`
    );
    return response.data.data;
  },
};
