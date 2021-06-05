import axios from 'axios'
import url from './initConfig'

const clienteAxios = axios.create({
  baseURL: url,
})

export default clienteAxios
