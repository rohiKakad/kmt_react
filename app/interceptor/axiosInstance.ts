
import axios from "axios"

const axiosIntacnce = axios.create({
    baseURL: '',
    headers:{
        'Content-Type': 'application/json'
    }
})

axiosIntacnce.interceptors.request.use((config) => {
    const jwtToken = localStorage.getItem('Jwt-token');
    if(jwtToken){
        config.headers.Authorization = `Bearer ${jwtToken}`;
    }
    return config
},
(err) => Promise.reject(err)
);

export default axiosIntacnce