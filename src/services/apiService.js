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
    return this.post(`/mapLocation`, data);
  }

  removePlaceInMap(data) {
    console.log(data);
    return this.delete(`/mapLocation/${data?._id}`);
  }

  updatePlaceInMap(data) {
    console.log("mapLocation api", data);
    return this.put(`/mapLocation/${data?._id}`, data);
  }

  getMapLocations() {
    return this.get(`/mapLocation`);
  }

  addFile(file) {
    return this.post("/upload", file);
  }

  getProvinces() {
    return this.get("/province");
  }

  addProvince(data) {
    return this.post("/province", data);
  }

  addCity(data) {
    return this.put(`/province/city/${data?._id}`, data);
  }

  removeCity(data) {
    return this.delete(`/province/city/${data?._id}/${data?.cityId}`, data);
  }

  removeCategory(data) {
    return this.delete(`/category/${data?._id}`, data);
  }

  getCategories() {
    return this.get("/category");
  }

  addCategory(data) {
    return this.post("/category", data);
  }

  updateCategory(data) {
    return this.put(`/category/${data?._id}`, data);
  }

  getHotels() {
    return this.get("/hotel");
  }

  addHotel(data) {
    return this.post("/hotel", data);
  }

  updateHotel(data) {
    return this.put(`/hotel/${data?._id}`, data);
  }

  removeHotel(data) {
    return this.delete(`/hotel/${data?._id}`);
  }
}

export default new ApiService();
