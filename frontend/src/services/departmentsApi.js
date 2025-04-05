import axios from 'axios';

const API_URL = 'http://localhost:8000/api';

export const getAllDepartments = async () => {
    try {
      const response = await axios.get(`${API_URL}/departments`);
      return response;
    } catch (error) {
      console.error('Error fetching departments:', error);
      throw error;
    }
  };

export const getDepartmentById = (id) => {
  return axios.get(`${API_URL}/departments/${id}`);
};

export const createDepartment = (departmentData) => {
  return axios.post(`${API_URL}/add-department`, departmentData);
};

export const updateDepartment = (id, departmentData) => {
  return axios.put(`${API_URL}/departments/${id}`, departmentData);
};

export const deleteDepartment = async (id) => {
    try {
      const response = await axios.delete(`${API_URL}/departments/${id}`);
      return response;
    } catch (error) {
      console.error('Error deleting department:', error);
      throw error;
    }
  };
