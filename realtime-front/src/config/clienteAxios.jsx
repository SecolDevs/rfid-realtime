import axios from 'axios'

const clienteAxios = axios.create({
  baseURL: 'http://192.168.0.100:4000/',
})

export default clienteAxios
