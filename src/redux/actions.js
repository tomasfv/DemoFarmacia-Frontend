import axios from 'axios';


export function getClientes(){
  return async function(dispatch){
    var json = await axios.get("/clientes", {});
    return dispatch({
      type: 'GET_CLIENTES',
      payload: json.data
    })
  }
};

export function getClienteById(id){
  return async function(dispatch){
    try{
      var json = await axios.get('/clientes/' + id);
      return dispatch ({
        type: "GET_CLIENTE_BY_ID",
        payload: json.data
      })
    } catch(error){
      console.log(error);
    }
  }
}

export function getNombreCliente(nombre){
  return async function(dispatch){
    try{
      var json = await axios.get('/clientes?nombre=' + nombre);
      if(json.data.length > 0){
        return dispatch ({
          type: "GET_NOMBRE_CLIENTE_OK",
          payload: json.data
        })
      } else {
        return dispatch({
          type: "GET_NOMBRE_CLIENTE_ERROR"
        })
      }
    } catch(error){
      console.log("ESTE ES EL ERROR: " + error);
      return dispatch({
        type: "GET_NOMBRE_CLIENTE_ERROR"
      })
    }
  }
};

export function postCliente(payload){
  return async function(dispatch){
    const response = await axios.post("/cliente", payload);
    console.log(response);
    return response;
  }
};

export function editCliente(payload, id){
  return async function(dispatch){
    const response = await axios.put(`/cliente/${id}`, payload);
    console.log(response);
    return response;
  }
}

export function deleteCliente(id){
  return async function(dispatch){
    try{
      await axios.delete("/cliente/" + id);
      return dispatch({
        type: "DELETE_CLIENTE",
        payload: id
      })
    }catch(error){
      console.log(error);
    }
  }
}

export function getDetail(id){
  return async function(dispatch){
    try{
      var json = await axios.get("/clientes/" + id);
      return dispatch({
        type: "GET_DETAILS",
        payload: json.data
      })
    }catch(error){
      console.log(error);
    }
  }
}

export function orderByName(payload){
  return {
    type: "ORDER_BY_NAME",
    payload
  }
};

export function getObrasSociales(){
  return async function(dispatch){
    var info = await axios.get('/obras-sociales', {});
    return dispatch({
      type: "GET_OBRAS_SOCIALES",
      payload: info.data
    })
  }
};

export function getNombreObraSocial(nombre){
  return async function(dispatch){
    try{
      var json = await axios.get('/obras-sociales?nombre=' + nombre);
      if(json.data.length > 0){
        return dispatch ({
          type: "GET_NOMBRE_OBRA_SOCIAL_OK",
          payload: json.data
        })
      } else {
        return dispatch({
          type: "GET_NOMBRE_OBRA_SOCIAL_ERROR"
        })
      }
    } catch(error){
      console.log("ESTE ES EL ERROR: " + error);
      return dispatch({
        type: "GET_NOMBRE_OBRA_SOCIAL_ERROR"
      })
    }
  }
};

export function getObraSocialById(id){
  return async function(dispatch){
    try{
      var json = await axios.get('/obras-sociales/' + id);
      return dispatch ({
        type: "GET_OBRA_SOCIAL_BY_ID",
        payload: json.data
      })
    } catch(error){
      console.log(error);
    }
  }
}

export function postObraSocial(payload){
  return async function(dispatch){
    const response = await axios.post("/obrasocial", payload);
    console.log(response);
    return response;
  }
};

export function editObraSocial(payload, id){
  return async function(dispatch){
    const response = await axios.put(`/obrasocial/${id}`, payload);
    console.log(response);
    return response;
  }
}

export function deleteObraSocial(id){
  return async function(dispatch){
    try{
      await axios.delete("/obrasocial/" + id);
      return dispatch({
        type: "DELETE_OBRA_SOCIAL",
        payload: id
      })
    }catch(error){
      console.log(error);
    }
  }
}

export function orderObrasSocialesByName(payload){
  return {
    type: "ORDER_OBRAS_SOCIALES_BY_NAME",
    payload
  }
};


