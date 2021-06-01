import Root from './components/Root'
import { socket, SocketContext } from './context/Socket'

function App() {
  return (
    <SocketContext.Provider value={socket}>
      <Root />
    </SocketContext.Provider>
  )
}

export default App
