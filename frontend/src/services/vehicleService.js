import axios from "axios";

const API_BASE_URL = "http://localhost:8000/api/vehicles";

const vehicleApiService = {
  async getAllVehicles() {
    try {
      const response = await axios.get(API_BASE_URL);
      return response.data;
    } catch (error) {
      console.error("Error fetching vehicles:", error);
      throw error;
    }
  },

  async getVehicleById(id) {
    try {
      const response = await axios.get(`${API_BASE_URL}/${id}`);
      return response.data;
    } catch (error) {
      console.error(`Error fetching vehicle with id ${id}:`, error);
      throw error;
    }
  },

  async createVehicle(vehicleData) {
    try {
      const response = await axios.post(API_BASE_URL, vehicleData);
      return response.data;
    } catch (error) {
      console.error("Error creating vehicle:", error);
      throw error;
    }
  },

  async updateVehicle(id, vehicleData) {
    try {
      const response = await axios.put(`${API_BASE_URL}/${id}`, vehicleData);
      return response.data;
    } catch (error) {
      console.error(`Error updating vehicle with id ${id}:`, error);
      throw error;
    }
  },

  async deleteVehicle(id) {
    try {
      const response = await axios.delete(`${API_BASE_URL}/${id}`);
      return response.data;
    } catch (error) {
      console.error(`Error deleting vehicle with id ${id}:`, error);
      throw error;
    }
  },
};

export default vehicleApiService;
