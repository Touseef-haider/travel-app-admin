import BaseService from "./baseService";

class ApiService extends BaseService {
  // Auth Routes
  login(data) {
    return this.post("/login", data);
  }
  forgotPassword(data) {
    return this.post("/forgot_password", data);
  }
  register(data) {
    return this.post("/register", data);
  }

  // Other Routes
  // profile
  getOwnProfile() {
    return this.get("/profiles/getOwnProfile");
  }
  updateProfile(data) {
    return this.put(`/profiles/${data?._id}`, data);
  }

  // experience
  addExperience(data) {
    return this.post("/experience", data, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
  }

  updateExperience(data) {
    console.log("data", data);
    return this.put(`/experience/${data?._id}`, data);
  }

  getExperiences() {
    return this.get("/experience");
  }

  getParticularExperience(id) {
    return this.get(`/experience/${id}`);
  }

  addPlaceInMap(data) {
    return this.post(`/mapLocation/`, data);
  }
  getMapLocations() {
    return this.get(`/mapLocation/`);
  }
}

export default new ApiService();
