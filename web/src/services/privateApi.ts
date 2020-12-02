import axios, { AxiosInstance } from 'axios';

export default (cb: () => void): AxiosInstance => {
  const api = axios.create({
    baseURL: 'http://localhost:3333',
  })

  api.interceptors.request.use((config) => {
    config.headers.Authorization = `Bearer ${localStorage.getItem('@HappyAuth:token')}`
    return config
  }, (err) => {
    return Promise.reject(err);
  })

  api.interceptors.response.use(response => {
    return response
  }, err => {
    return new Promise((resolve) => {
      const originalReq = err.config;
      if (err.response && err.response.status === 401 && err.config && !err.config.__isRetryRequest) {
        originalReq.__retry = true;

        const responseRetry = axios.post('http://localhost:3333/update_refresh_token', {
          refresh_token: localStorage.getItem('@HappyAuth:refreshToken')
        }).then(response => {
          if (response.status === 200) {

            const { refresh_token, access_token } = response.data;

            localStorage.setItem('@HappyAuth:token', access_token);
            localStorage.setItem('@HappyAuth:refreshToken', refresh_token);

            originalReq.headers['Authorization'] = `Bearer ${access_token}`

            return axios(originalReq)
          }
        }).catch(() => {
          cb()
          return Promise.reject(err)
        })

        resolve(responseRetry)
      }

      if (!err.response) {
        cb()
      }
      
      return Promise.reject(err)
    }
    )
  })

  return api
};