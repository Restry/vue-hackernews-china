import axios from 'axios';


const getConfig = () => {
  const port = process.env.PORT || '8080';

  const config = {
    prod: {
      url: 'http://api.syyrx.com/api',
    },

    dev: {
      url: 'http://127.0.0.1:'+port+'/api',
    }
  }
  if (process.env.NODE_ENV === 'development') {
    return config.dev
  } else {
    return config.prod
  }
}

export default (context) => {
  const config =getConfig();
  const instance = axios.create({
    baseURL: config.url,
    // withCredentials: true,
    headers: {
      'X-Custom-Header': context ? context.city.pinyin : ''
    }
  });

  return instance
} 
