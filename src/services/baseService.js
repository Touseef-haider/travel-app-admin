import axiosInstance from "../utils/axios";

export default class BaseService {
  constructor(instance = axiosInstance) {
    this.instance = instance;
  }

  get(...args) {
    return this.execute("get", ...args);
  }

  post(...args) {
    return this.execute("post", ...args);
  }

  put(...args) {
    return this.execute("put", ...args);
  }

  delete(...args) {
    return this.execute("delete", ...args);
  }

  patch(...args) {
    return this.execute("patch", ...args);
  }

  async execute(method, ...args) {
    const response = await this.instance[method](...args);
    if (response.status >= 400) {
      return Promise.reject(response);
    }
    return Promise.resolve(response);
  }
}
