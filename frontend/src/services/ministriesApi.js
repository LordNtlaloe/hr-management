import axios from 'axios';

const API_URL = 'http://localhost:8000/api';

export const getAllMinistries = async () => {
    try {
      const response = await axios.get(`${API_URL}/ministries`);
      return response;
    } catch (error) {
      console.error('Error fetching ministries:', error);
      throw error;
    }
  };

export const getMinistryById = (id) => {
  return axios.get(`${API_URL}/ministries/${id}`);
};

export const createMinistry = (ministryData) => {
  return axios.post(`${API_URL}/add-ministry`, ministryData);
};

export const updateMinistry = (id, ministryData) => {
  return axios.put(`${API_URL}/ministries/${id}`, ministryData);
};

export const deleteMinistry = async (id) => {
    try {
      const response = await axios.delete(`${API_URL}/ministries/${id}`);
      return response;
    } catch (error) {
      console.error('Error deleting ministry:', error);
      throw error;
    }
  };
