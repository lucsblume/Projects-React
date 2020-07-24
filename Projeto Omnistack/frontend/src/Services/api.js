import axios from 'axios'; //necessita de instalação // CLIENTE HTTP = faz chamada a api do backend e obter as respostas

const api = axios.create({
    baseURL: 'http://localhost:3333',
})

export default api;