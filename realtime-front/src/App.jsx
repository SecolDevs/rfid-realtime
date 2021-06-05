import React from 'react'
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom'
import Botones from './components/Botones'
import Asistencias from './routes/Asistencias'
import Informacion from './routes/Informacion'
import Main from './routes/Main'

const App = () => {
  return (
    <Router>
      <Botones />

      <Switch>
        <Route exact path="/informacion" component={Informacion} />
        <Route exact path="/asistencias" component={Asistencias} />
        <Route exact path="/" component={Main} />
      </Switch>
    </Router>
  )
}

export default App
