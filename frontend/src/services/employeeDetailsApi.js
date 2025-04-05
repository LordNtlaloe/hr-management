import axios from 'axios';

const API_URL = 'http://localhost:8000/api';

export const getAllEmployeeDetails = async () => {
    try {
      const response = await axios.get(`${API_URL}/employee-details`);
      return response;
    } catch (error) {
      console.error('Error fetching employee-details:', error);
      throw error;
    }
  };

export const getEmployeeDetailsById = (id) => {
  return axios.get(`${API_URL}/employee-details/${id}`);
};

export const createEmployeeDetails = (employeeDetailsData) => {
  return axios.post(`${API_URL}/add-employee-details`, employeeDetailsData);
};

export const updateEmployeeDetails = (id, employeeDetailsData) => {
  return axios.put(`${API_URL}/employee-details/${id}`, employeeDetailsData);
};

export const updateEmployeeDetailsStatus = async (id, status) => {
  try {
    const response = await axios.put(`${API_URL}/employee-details/update-status/${id}`, status);
    return response;
  } catch (error) {
    console.error('Error updating status:', error);
    throw error;
  }
};

export const deleteEmployeeDetails = async (id) => {
    try {
      const response = await axios.delete(`${API_URL}/employee-details/${id}`);
      return response;
    } catch (error) {
      console.error('Error deleting employeeDetails:', error);
      throw error;
    }
  };
