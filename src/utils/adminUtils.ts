
// This file contains utility functions for admin operations
// In a real application, these would interact with an API instead of using localStorage

import { toast } from "@/components/ui/use-toast";

export interface AdminUser {
  id: string;
  name: string;
  email: string;
  plan: 'free' | 'premium';
  country: string;
  joinDate: string;
  lastActive: string;
  status: 'active' | 'inactive';
}

export interface Country {
  id: string;
  name: string;
  code: string;
  continent: string;
  visaProcessTime: string;
  languageRequirements: string;
  active: boolean;
  properties: number;
  jobs: number;
  description: string;
}

export interface Property {
  id: string;
  title: string;
  location: string;
  price: string;
  type: string;
  bedrooms: number;
  bathrooms: number;
  area: string;
  status: 'available' | 'pending' | 'sold';
  featured: boolean;
  dateAdded: string;
}

export interface Job {
  id: string;
  title: string;
  company: string;
  location: string;
  salary: string;
  type: string;
  status: 'active' | 'inactive';
  dateAdded: string;
}

export interface Service {
  id: string;
  name: string;
  category: string;
  country: string;
  city: string;
  rating: number;
  status: 'active' | 'inactive';
  featured: boolean;
}

export interface SystemSetting {
  key: string;
  value: string | number | boolean;
  category: 'general' | 'security' | 'ai' | 'database';
}

// Generic function to save data
export const saveData = <T>(key: string, data: T[]): void => {
  try {
    localStorage.setItem(key, JSON.stringify(data));
    toast({
      title: "Success",
      description: "Data saved successfully",
    });
  } catch (error) {
    console.error("Error saving data:", error);
    toast({
      title: "Error",
      description: "Failed to save data",
      variant: "destructive",
    });
  }
};

// Generic function to get data
export const getData = <T>(key: string, defaultValue: T[] = []): T[] => {
  try {
    const data = localStorage.getItem(key);
    return data ? JSON.parse(data) : defaultValue;
  } catch (error) {
    console.error("Error fetching data:", error);
    toast({
      title: "Error",
      description: "Failed to fetch data",
      variant: "destructive",
    });
    return defaultValue;
  }
};

// User management
export const getUsers = (): AdminUser[] => getData<AdminUser>('admin_users', []);
export const saveUsers = (users: AdminUser[]): void => saveData('admin_users', users);
export const updateUser = (user: AdminUser): void => {
  const users = getUsers();
  const index = users.findIndex(u => u.id === user.id);
  if (index !== -1) {
    users[index] = user;
    saveUsers(users);
  }
};
export const deleteUser = (userId: string): void => {
  const users = getUsers();
  saveUsers(users.filter(u => u.id !== userId));
};

// Country management
export const getCountries = (): Country[] => getData<Country>('admin_countries', []);
export const saveCountries = (countries: Country[]): void => saveData('admin_countries', countries);
export const updateCountry = (country: Country): void => {
  const countries = getCountries();
  const index = countries.findIndex(c => c.id === country.id);
  if (index !== -1) {
    countries[index] = country;
    saveCountries(countries);
  }
};
export const deleteCountry = (countryId: string): void => {
  const countries = getCountries();
  saveCountries(countries.filter(c => c.id !== countryId));
};

// Property management
export const getProperties = (): Property[] => getData<Property>('admin_properties', []);
export const saveProperties = (properties: Property[]): void => saveData('admin_properties', properties);
export const updateProperty = (property: Property): void => {
  const properties = getProperties();
  const index = properties.findIndex(p => p.id === property.id);
  if (index !== -1) {
    properties[index] = property;
    saveProperties(properties);
  }
};
export const deleteProperty = (propertyId: string): void => {
  const properties = getProperties();
  saveProperties(properties.filter(p => p.id !== propertyId));
};

// System settings
export const getSettings = (): SystemSetting[] => getData<SystemSetting>('admin_settings', []);
export const saveSettings = (settings: SystemSetting[]): void => saveData('admin_settings', settings);
export const updateSetting = (setting: SystemSetting): void => {
  const settings = getSettings();
  const index = settings.findIndex(s => s.key === setting.key);
  if (index !== -1) {
    settings[index] = setting;
  } else {
    settings.push(setting);
  }
  saveSettings(settings);
};
export const getSetting = (key: string, defaultValue: any = null): any => {
  const settings = getSettings();
  const setting = settings.find(s => s.key === key);
  return setting ? setting.value : defaultValue;
};

// Analytics data (mock)
export const getAnalytics = () => {
  return {
    userGrowth: {
      labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'],
      datasets: [
        {
          label: 'Total Users',
          data: [800, 950, 1050, 1150, 1220, 1245],
          borderColor: 'rgb(59, 130, 246)',
          backgroundColor: 'rgba(59, 130, 246, 0.1)',
        },
      ],
    },
    countryDistribution: {
      labels: ['Australia', 'Canada', 'UK', 'USA', 'Germany', 'Others'],
      datasets: [
        {
          data: [40, 20, 15, 10, 8, 7],
          backgroundColor: [
            'rgb(59, 130, 246)',
            'rgb(139, 92, 246)',
            'rgb(248, 113, 113)',
            'rgb(52, 211, 153)',
            'rgb(251, 191, 36)',
            'rgb(209, 213, 219)',
          ],
        },
      ],
    },
    planDistribution: {
      free: 861,
      premium: 384,
    },
    activeUsers: {
      daily: 325,
      weekly: 752,
      monthly: 1102,
    },
  };
};
