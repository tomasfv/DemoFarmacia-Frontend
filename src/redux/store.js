import { configureStore } from "@reduxjs/toolkit";
import clientesReducer from "./slices/clientesSlice";
import obrasSocialesReducer from "./slices/obrasSocialesSlice";

const store = configureStore({
  reducer: {
    clientes: clientesReducer,
    obrasSociales: obrasSocialesReducer,
  },
});

export default store;
