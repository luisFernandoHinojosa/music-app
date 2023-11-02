import axios from "axios";

const axiosMusic =  axios.create({
  baseURL:"https://spotify-api-luis.3.us-1.fl0.io"
})

axiosMusic.interceptors.request.use((config)=>{
 config.headers.Authorization = `JWT ${JSON.parse(localStorage.getItem("userInfo"))?.token}`
 return config 
})

export {axiosMusic}