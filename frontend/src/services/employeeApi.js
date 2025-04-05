import axios from 'axios';

const API_URL = 'http://localhost:8000/api';

export const getAllEmployees = async () => {
    try {
        const response = await axios.get(`${API_URL}/employees`);
        return response;
    } catch (error) {
        console.error('Error fetching employees:', error);
        throw error;
    }
};

export const getEmployeeById = async (id) => {
    try {
        const response = await axios.get(`${API_URL}/${id}`);
        return response;
    } catch (error) {
        console.error('Error fetching employee:', error);
        throw error;
    }
};

export const createEmployee = async (employeeData) => {
    try {
        const response = await axios.post(`${API_URL}/create-employee`, employeeData);
        return response;
    } catch (error) {
        console.error('Error creating employee:', error);
        throw error;
    }
};

export const updateEmployee = async (id, employeeData) => {
    try {
        const response = await axios.put(`${API_URL}/${id}`, employeeData);
        return response;
    } catch (error) {
        console.error('Error updating employee:', error);
        throw error;
    }
};

export const deleteEmployee = async (id) => {
    try {
        const response = await axios.delete(`${API_URL}/${id}`);
        return response;
    } catch (error) {
        console.error('Error deleting employee:', error);
        throw error;
    }
};

export const searchEmployees = async (query) => {
    try {
        const response = await axios.get(`${API_URL}/search`, {
            params: { query }
        });
        return response;
    } catch (error) {
        console.error('Error searching employees:', error);
        throw error;
    }
};