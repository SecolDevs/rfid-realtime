import React from "react";
import { socket, SocketContext } from "./config/SocketConfig";
import AsistenciaState from "./context/AsistenciaState";
import Root from "./Root";

const App = () => {
  return (
    <SocketContext.Provider value={socket}>
      <AsistenciaState>
        <Root />
      </AsistenciaState>
    </SocketContext.Provider>
  );
};

export default App;
