import axios from 'axios';

// API endpoint cho địa chỉ Việt Nam
const API_BASE_URL = 'https://provinces.open-api.vn/api';

export interface AddressOption {
  value: string;
  label: string;
}

export interface Province {
  code: number;
  name: string;
}

export interface District {
  code: number;
  name: string;
  province_code: number;
}

export interface Ward {
  code: number;
  name: string;
  district_code: number;
}

// Cache để tránh gọi API nhiều lần
const cache = {
  provinces: null as AddressOption[] | null,
  districts: {} as Record<string, AddressOption[]>,
  wards: {} as Record<string, AddressOption[]>,
};

export const addressApi = {
  // Lấy danh sách tỉnh/thành phố
  getProvinces: async (): Promise<AddressOption[]> => {
    if (cache.provinces) {
      return cache.provinces;
    }

    try {
      const response = await axios.get(`${API_BASE_URL}/p/`);
      console.log('API Response:', response.data.slice(0, 3)); // Log first 3 items
      const provinces = response.data.map((province: Province) => ({
        value: province.code.toString(),
        label: province.name,
      }));
      
      console.log('Mapped provinces:', provinces.slice(0, 3)); // Log first 3 mapped items
      cache.provinces = provinces;
      return provinces;
    } catch (error) {
      console.error('Error fetching provinces:', error);
      // Fallback data nếu API lỗi
      return [
        { value: '1', label: 'Thành phố Hà Nội' },
        { value: '79', label: 'Thành phố Hồ Chí Minh' },
        { value: '48', label: 'Thành phố Đà Nẵng' },
        { value: '31', label: 'Thành phố Hải Phòng' },
        { value: '92', label: 'Thành phố Cần Thơ' },
      ];
    }
  },

  // Lấy danh sách quận/huyện theo tỉnh
  getDistricts: async (provinceCode: string): Promise<AddressOption[]> => {
    if (cache.districts[provinceCode]) {
      return cache.districts[provinceCode];
    }

    try {
      const response = await axios.get(`${API_BASE_URL}/p/${provinceCode}?depth=2`);
      const districts = response.data.districts.map((district: District) => ({
        value: district.code.toString(),
        label: district.name,
      }));
      
      cache.districts[provinceCode] = districts;
      return districts;
    } catch (error) {
      console.error('Error fetching districts:', error);
      return [];
    }
  },

  // Lấy danh sách phường/xã theo quận/huyện
  getWards: async (districtCode: string): Promise<AddressOption[]> => {
    if (cache.wards[districtCode]) {
      return cache.wards[districtCode];
    }

    try {
      const response = await axios.get(`${API_BASE_URL}/d/${districtCode}?depth=2`);
      const wards = response.data.wards.map((ward: Ward) => ({
        value: ward.code.toString(),
        label: ward.name,
      }));
      
      cache.wards[districtCode] = wards;
      return wards;
    } catch (error) {
      console.error('Error fetching wards:', error);
      return [];
    }
  },

  // Lấy tên địa chỉ theo code
  getAddressName: async (provinceCode: string, districtCode?: string, wardCode?: string): Promise<string> => {
    try {
      let address = '';
      
      if (wardCode && districtCode) {
        const wardResponse = await axios.get(`${API_BASE_URL}/w/${wardCode}`);
        const districtResponse = await axios.get(`${API_BASE_URL}/d/${districtCode}`);
        const provinceResponse = await axios.get(`${API_BASE_URL}/p/${provinceCode}`);
        
        address = `${wardResponse.data.name}, ${districtResponse.data.name}, ${provinceResponse.data.name}`;
      } else if (districtCode) {
        const districtResponse = await axios.get(`${API_BASE_URL}/d/${districtCode}`);
        const provinceResponse = await axios.get(`${API_BASE_URL}/p/${provinceCode}`);
        
        address = `${districtResponse.data.name}, ${provinceResponse.data.name}`;
      } else {
        const provinceResponse = await axios.get(`${API_BASE_URL}/p/${provinceCode}`);
        address = provinceResponse.data.name;
      }
      
      return address;
    } catch (error) {
      console.error('Error fetching address name:', error);
      return '';
    }
  },

  // Clear cache
  clearCache: () => {
    cache.provinces = null;
    cache.districts = {};
    cache.wards = {};
  },
};
