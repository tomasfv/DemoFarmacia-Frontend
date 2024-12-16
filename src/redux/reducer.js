const initialState = {
  clientes: [],
  allClientes: [],
  detail: [],
  obrasSociales: [],
  allObrasSociales: [],
  error: null,
};

export default function rootReducer(state=initialState, action) {
  switch(action.type) {
    case 'GET_CLIENTES':
      return{
        ...state,
        clientes: action.payload,
        allClientes: action.payload,
        error: null,

      }
    case 'GET_NOMBRE_CLIENTE_OK':
      return{
        ...state,
        clientes: action.payload,
        error: null,
      }
    case 'GET_NOMBRE_CLIENTE_ERROR':
      return{
        ...state,
        clientes: [],
        error: 'CLIENTE NO ENCONTRADO',
      }
    case 'GET_CLIENTE_BY_ID':
      return{
        ...state,
        clientes: action.payload,
        error: null,
      }
    case 'ORDER_BY_NAME':
        let sortedArr = action.payload === 'asc'? 

            state.clientes.sort(function(a, b){
              if(a.nombre > b.nombre) return 1;
              if (b.nombre > a.nombre) return -1;
              return 0;
            }) :

            state.clientes.sort(function(a, b){
              if(a.nombre > b.nombre) return -1;
              if(b.nombre > a.nombre) return 1;
              return 0;
            })
            return {
              ...state,
              clientes: sortedArr,
              error: null,
            }
    case "POST_CLIENTE":
      return {
        ...state,
        error: null,
      }
    case "EDIT_CLIENTE":
      return {
        ...state,
        clientes: state.clientes.map(cliente => cliente.id === action.payload.id ? action.payload : cliente),
        error: null,
      }
    case "GET_DETAILS":
      return{
        ...state,
        detail: action.payload,
        error: null,
      }
    case "DELETE_CLIENTE":
      return {
        ...state,
        clientes: state.clientes.filter(cliente => cliente.id !== action.payload),
        error: null,
      }
    case "GET_OBRAS_SOCIALES":
      return {
        ...state,
        obrasSociales: action.payload,
        allObrasSociales: action.payload,
        error: null,
      }
      case 'GET_NOMBRE_OBRA_SOCIAL_OK':
        return{
          ...state,
          obrasSociales: action.payload,
          error: null,
        }
      case 'GET_NOMBRE_OBRA_SOCIAL_ERROR':
        return{
          ...state,
          obrasSociales: [],
          error: 'OBRA SOCIAL NO ENCONTRADA',
        }
        case 'GET_OBRA_SOCIAL_BY_ID':
          return{
            ...state,
            obrasSociales: action.payload,
            error: null,
          }
          case 'ORDER_OBRAS_SOCIALES_BY_NAME':
            let sortedArrOs = action.payload === 'asc'? 
    
                state.obrasSociales.sort(function(a, b){
                  if(a.nombre > b.nombre) return 1;
                  if (b.nombre > a.nombre) return -1;
                  return 0;
                }) :
    
                state.obrasSociales.sort(function(a, b){
                  if(a.nombre > b.nombre) return -1;
                  if(b.nombre > a.nombre) return 1;
                  return 0;
                })
                return {
                  ...state,
                  obrasSociales: sortedArrOs,
                  error: null,
                }
          case "EDIT_OBRA_SOCIAL":
            return {
              ...state,
              obrasSociales: state.obrasSociales.map(os => os.id === action.payload.id ? action.payload : os),
              error: null,
            }
    case "DELETE_OBRA_SOCIAL":
        return {
          ...state,
          obrasSociales: state.obrasSociales.filter(os => os.id !== action.payload),
          error: null,
        }
    
      default:
        return state;
      
  }

}

