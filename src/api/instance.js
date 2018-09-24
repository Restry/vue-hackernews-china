import axios from 'axios';

export default (context) => {
  const instance = axios.create({
    baseURL: 'http://127.0.0.1:8080/api',
    // withCredentials: true,
    headers: {
      'X-Custom-Header': context ? context.city.pinyin : ''
    }
  });

  return {
    child(url) {
      return instance.get(url)
    },
    instance
  }
} 
