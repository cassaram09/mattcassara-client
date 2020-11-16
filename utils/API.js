import axios from "axios";

export default class API {
  constructor(url) {
    this.base = url || `${process.env.NEXT_PUBLIC_SERVER_URL}`;
  }

  get = async (path, options) => {
    try {
      const { data } = await axios.get(`${this.base}${path}`, options);
      return data;
    } catch (e) {
      console.error(e);
      return { error: e.error || e.message || e };
    }
  };

  post = async (path, payload, options) => {
    try {
      const { data } = await axios.post(
        `${this.base}${path}`,
        payload,
        options
      );
      return data;
    } catch (e) {
      const details = this.stringify(e.response.data);
      console.error(e, "\n" + details);
      return { error: e.message || e };
    }
  };

  stringify(object) {
    try {
      return JSON.stringify(object);
    } catch (e) {
      return object;
    }
  }
}
