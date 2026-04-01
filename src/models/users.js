//localHost:33030/api/users/getUser


import axios from 'axios'
import { getToken } from "../helpers/regex"

export const api = axios.create({
    baseURL: "localHost:33030/api/users",
    timeout: 10000,
    headers: {
        "Content-Type": "application/jason"
    }
})

apiUsuarios.interceptors.request.use(
    async (config) => {
        try {
            const token = await getToken('JWTToken')
            if (token !== null){
                config.headers.Authorization = `Bearer ${token}`

            }
            return config;
        } catch (error) {
            return Promise.reject(error)
        }
    },
        (error) => {
            return Promise.reject(error)
    }
)
export default api;