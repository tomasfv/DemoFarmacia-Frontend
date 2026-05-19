import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const getClientes = createAsyncThunk(
  "clientes/getClientes",
  async (_, { rejectWithValue }) => {
    try {
      const response = await axios.get("/clientes");
      return response.data.data;
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || "Error al obtener clientes");
    }
  }
);

export const getClienteById = createAsyncThunk(
  "clientes/getClienteById",
  async (id, { rejectWithValue }) => {
    try {
      const response = await axios.get(`/clientes/${id}`);
      return response.data.data;
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || "Error al obtener el cliente");
    }
  }
);

export const getNombreCliente = createAsyncThunk(
  "clientes/getNombreCliente",
  async (nombre, { rejectWithValue }) => {
    try {
      const response = await axios.get(`/clientes?nombre=${nombre}`);
      return response.data.data;
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || "Cliente no encontrado");
    }
  }
);

export const postCliente = createAsyncThunk(
  "clientes/postCliente",
  async (payload, { rejectWithValue }) => {
    try {
      const response = await axios.post("/clientes", payload);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || "Error al crear cliente");
    }
  }
);

export const editCliente = createAsyncThunk(
  "clientes/editCliente",
  async ({ id, payload }, { rejectWithValue }) => {
    try {
      const response = await axios.put(`/clientes/${id}`, payload);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || "Error al editar cliente");
    }
  }
);

export const deleteCliente = createAsyncThunk(
  "clientes/deleteCliente",
  async (id, { rejectWithValue }) => {
    try {
      await axios.delete(`/clientes/${id}`);
      return id;
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || "Error al eliminar cliente");
    }
  }
);

const clientesSlice = createSlice({
  name: "clientes",
  initialState: {
    clientesList: [],
    clienteDetail: null,
    isLoading: false,
    error: null,
  },
  reducers: {
    orderByName: (state, action) => {
      const sorted = [...state.clientesList].sort((a, b) => {
        if (action.payload === "asc") {
          return a.nombre.localeCompare(b.nombre);
        } else {
          return b.nombre.localeCompare(a.nombre);
        }
      });
      state.clientesList = sorted;
    },
    clearClienteDetail: (state) => {
      state.clienteDetail = null;
    }
  },
  extraReducers: (builder) => {
    builder
      // GET CLIENTES
      .addCase(getClientes.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(getClientes.fulfilled, (state, action) => {
        state.isLoading = false;
        state.clientesList = action.payload;
      })
      .addCase(getClientes.rejected, (state, action) => {
        state.isLoading = false;
        state.clientesList = [];
        state.error = action.payload;
      })

      // GET CLIENTE BY ID
      .addCase(getClienteById.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(getClienteById.fulfilled, (state, action) => {
        state.isLoading = false;
        state.clienteDetail = action.payload;
      })
      .addCase(getClienteById.rejected, (state, action) => {
        state.isLoading = false;
        state.clienteDetail = null;
        state.error = action.payload;
      })

      // GET CLIENTE BY NOMBRE
      .addCase(getNombreCliente.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(getNombreCliente.fulfilled, (state, action) => {
        state.isLoading = false;
        state.clientesList = action.payload;
      })
      .addCase(getNombreCliente.rejected, (state, action) => {
        state.isLoading = false;
        state.clientesList = [];
        state.error = action.payload;
      })

      // DELETE CLIENTE
      .addCase(deleteCliente.fulfilled, (state, action) => {
        state.clientesList = state.clientesList.filter(
          (c) => c.id !== action.payload
        );
      });
  },
});

export const { orderByName, clearClienteDetail } = clientesSlice.actions;
export default clientesSlice.reducer;
