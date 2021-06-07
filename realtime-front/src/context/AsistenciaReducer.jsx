const AsistenciaReducer = (state, action) => {
  switch (action.type) {
    case "getAsistencias":
      return {
        ...state,
        asistencias: action.payload,
      };
    case "addAsistencia":
      return {
        ...state,
        asistencias: [action.payload, ...state.asistencias],
      };
    case "updateAsistencia":
      return {
        ...state,
        asistencias: state.asistencias.map((asistencia) =>
          asistencia._id === action.payload._id ? action.payload : asistencia
        ),
      };
    default:
      return {
        ...state,
      };
  }
};

export default AsistenciaReducer;
