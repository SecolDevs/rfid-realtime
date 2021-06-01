import { useEffect, useState } from 'react'
import { socket } from '../context/Socket'

const Root = () => {
  const [persona, setPersona] = useState({})
  const [error, setError] = useState(false)

  useEffect(() => {
    socket.on('succesCard', (data) => {
      setPersona(data[0])
    })

    socket.on('badCard', () => {
      setError(true)
      setPersona({})
      setTimeout(() => {
        setError(false)
      }, 5000)
    })
    // eslint-disable-next-line
  }, [socket])

  return (
    <div className="container shadow">
      <div className="row mt-5 p-2 bg-secondary shadow rounded">
        <div className="col-lg-12">
          <h1 className="p-3 bg-primary rounded">
            <small>Use la tarjeta de verificacion</small>
          </h1>
        </div>

        <>
          {error ? (
            <div className="col-lg-12">
              <h2 className="text-center bg-danger p-2">
                Error, tarjeta incorrecta <br />
                Verifique e intente nuevamente
              </h2>
            </div>
          ) : (
            Object.keys(persona).length > 0 && (
              <div className="col-lg-12 p-2 bg-secondary rounded shadow">
                <div className="row p-2">
                  <div className="col-lg-4">
                    <img
                      style={{ width: '100%' }}
                      src={persona.foto}
                      alt="Foto Persona"
                      className="rounded"
                    />
                  </div>
                  <div className="col-lg-8 p-2 bg-light text-dark mx-auto my-auto">
                    <h1>{persona.nombre}</h1>
                    <h3>Codigo de Tarjeta: {persona.tag}</h3>
                  </div>
                </div>
              </div>
            )
          )}
        </>
      </div>
    </div>
  )
}

export default Root
