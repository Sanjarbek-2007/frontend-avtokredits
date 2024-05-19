import axios from 'axios';
import './Cars.css';

// Define the base URL for the car-related API endpoints
const API_URL = 'https://your-api-url.com/api/cars';

// Function to get the list of all cars
export const getCars = async () => {
    try {
        const response = await axios.get(API_URL);
        return response.data;
    } catch (error) {
        console.error("Error fetching cars:", error);
        throw error;
    }
};

// Function to get a car by ID
export const getCarById = async (id) => {
    try {
        const response = await axios.get(`${API_URL}/${id}`);
        return response.data;
    } catch (error) {
        console.error(`Error fetching car with ID ${id}:`, error);
        throw error;
    }
};

// Function to create a new car
export const createCar = async (car) => {
    try {
        const response = await axios.post(API_URL, car);
        return response.data;
    } catch (error) {
        console.error("Error creating car:", error);
        throw error;
    }
};

// Function to update an existing car by ID
export const updateCar = async (id, car) => {
    try {
        const response = await axios.put(`${API_URL}/${id}`, car);
        return response.data;
    } catch (error) {
        console.error(`Error updating car with ID ${id}:`, error);
        throw error;
    }
};

// Function to delete a car by ID
export const deleteCar = async (id) => {
    try {
        const response = await axios.delete(`${API_URL}/${id}`);
        return response.data;
    } catch (error) {
        console.error(`Error deleting car with ID ${id}:`, error);
        throw error;
    }
};
