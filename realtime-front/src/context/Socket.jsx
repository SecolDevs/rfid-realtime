import { createContext } from 'react'
import io from 'socket.io-client'

export const socket = io.connect('http://192.168.0.100:4000')
export const SocketContext = createContext(socket)
