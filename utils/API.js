import axios from "axios";

export default class API {
  constructor(url) {
    this.base = url || `${process.env.NEXT_PUBLIC_SERVER_URL}`;
    this.headers = {};
  }

  get = async (path, headers) => {
    try {
      const { data } = await axios.get(`${this.base}${path}`, {
        headers: { ...this.headers, ...headers },
      });
      return data;
    } catch (e) {
      const message = this.detailedError(e) || e.message || e;
      console.error(`${this.base}${path}`, message);
      return { error: message };
    }
  };

  post = async (path, payload, headers) => {
    try {
      const { data } = await axios.post(`${this.base}${path}`, payload, {
        headers: { ...this.headers, ...headers },
      });
      return data;
    } catch (e) {
      const message = this.detailedError(e) || e.message || e;
      console.error(`${this.base}${path}`, message);
      return { error: message };
    }
  };

  patch = async (path, payload, headers) => {
    try {
      const { data } = await axios.patch(`${this.base}${path}`, payload, {
        headers: { ...this.headers, ...headers },
      });
      return data;
    } catch (e) {
      const message = this.detailedError(e) || e.message || e;
      console.error(`${this.base}${path}`, message);

      return { error: message };
    }
  };

  delete = async (path, headers) => {
    try {
      const { data } = await axios.delete(`${this.base}${path}`, {
        headers: { ...this.headers, ...headers },
      });
      return data;
    } catch (e) {
      const message = this.detailedError(e) || e.message || e;
      console.error(`${this.base}${path}`, message);

      return { error: message };
    }
  };

  detailedError = (e) => {
    try {
      return e.response && e.response.data && e.response.data.error;
    } catch (error) {
      return e;
    }
  };

  stringify(object) {
    try {
      return JSON.stringify(object);
    } catch (e) {
      return object;
    }
  }

  setAuthHeader(key, value) {
    if (key && value) {
      this.headers = {
        ...this.headers,
        [key]: value,
      };
    }
  }
}
