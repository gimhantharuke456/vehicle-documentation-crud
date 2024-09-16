import axios from "axios";

const API_BASE_URL = "http://localhost:8000/api/vprofiles";

const vProfileService = {
  // Fetch all vehicle profiles
  async getAllProfiles() {
    try {
      const response = await axios.get(API_BASE_URL);
      return response.data;
    } catch (error) {
      console.error("Error fetching vehicle profiles:", error);
      throw error;
    }
  },

  // Fetch a single vehicle profile by ID
  async getProfileById(id) {
    try {
      const response = await axios.get(`${API_BASE_URL}/${id}`);
      return response.data;
    } catch (error) {
      console.error(`Error fetching vehicle profile with id ${id}:`, error);
      throw error;
    }
  },

  // Create a new vehicle profile
  async createProfile(profileData) {
    try {
      const response = await axios.post(API_BASE_URL, profileData);
      return response.data;
    } catch (error) {
      console.error("Error creating vehicle profile:", error);
      throw error;
    }
  },

  // Update an existing vehicle profile
  async updateProfile(id, profileData) {
    try {
      const response = await axios.put(`${API_BASE_URL}/${id}`, profileData);
      return response.data;
    } catch (error) {
      console.error(`Error updating vehicle profile with id ${id}:`, error);
      throw error;
    }
  },

  // Delete a vehicle profile
  async deleteProfile(id) {
    try {
      const response = await axios.delete(`${API_BASE_URL}/${id}`);
      return response.data;
    } catch (error) {
      console.error(`Error deleting vehicle profile with id ${id}:`, error);
      throw error;
    }
  },
};

export default vProfileService;
