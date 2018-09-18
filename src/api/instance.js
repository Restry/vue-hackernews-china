import axios from 'axios';

const instance = axios.create({
  baseURL: 'http://127.0.0.1:8080/api',
  // withCredentials: true,
});

const api = {
  child(url) {
    return instance.get(url)
  },
  instance
}

export default api;
