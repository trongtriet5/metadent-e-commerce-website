import axios from 'axios';

const API_BASE_URL = 'http://localhost:8000/api';

export interface PageImage {
  id: number;
  name: string;
  position: string;
  image: string;
  link_url?: string;
  is_active: boolean;
  created_at: string;
  updated_at: string;
}

export interface SiteSetting {
  id: number;
  key: string;
  value: string;
  description: string;
  category: string;
}

export const cmsApi = {
  getPageImages: async (): Promise<PageImage[]> => {
    const response = await axios.get(`${API_BASE_URL}/cms/page-images/`);
    return response.data;
  },

  getPageImageByPosition: async (position: string): Promise<PageImage | null> => {
    const response = await axios.get(`${API_BASE_URL}/cms/page-images/`);
    const images = response.data;
    return images.find((img: PageImage) => img.position === position && img.is_active) || null;
  },

  getSiteSettings: async (): Promise<SiteSetting[]> => {
    const response = await axios.get(`${API_BASE_URL}/cms/settings/`);
    return response.data;
  },

  getSiteSetting: async (key: string): Promise<string | null> => {
    const response = await axios.get(`${API_BASE_URL}/cms/settings/`);
    const settings = response.data;
    const setting = settings.find((s: SiteSetting) => s.key === key);
    return setting ? setting.value : null;
  },

  getSiteSettingsByCategory: async (category: string): Promise<SiteSetting[]> => {
    const response = await axios.get(`${API_BASE_URL}/cms/settings/`);
    const settings = response.data;
    return settings.filter((s: SiteSetting) => s.category === category);
  },

  getAllSiteSettingsMap: async (): Promise<Record<string, string>> => {
    const settings = await cmsApi.getSiteSettings();
    const map: Record<string, string> = {};
    settings.forEach(setting => {
      map[setting.key] = setting.value;
    });
    return map;
  },
};

// Helper function to get image URL
export const getImageUrl = (imagePath: string): string => {
  if (!imagePath) return '';
  
  if (imagePath.startsWith('http://') || imagePath.startsWith('https://')) {
    return imagePath;
  }
  
  const baseUrl = 'http://localhost:8000';
  return `${baseUrl}${imagePath.startsWith('/') ? imagePath : `/${imagePath}`}`;
};

