import axios from 'axios';

const allaxios = axios.create ({
    baseURL:"https://api-web.prepacademy.in",
    headers:{
        "Content-Type":"application/json",
    },
});

export default allaxios

//https://api-web.prepacademy.in
//http://127.0.0.1:8000