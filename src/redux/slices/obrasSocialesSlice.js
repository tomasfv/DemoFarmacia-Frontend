import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const getObrasSociales = createAsyncThunk(
  "obrasSociales/getObrasSociales",
  async (_, { rejectWithValue }) => {
    try {
      const response = await axios.get("/obras-sociales");
      return response.data.data;
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || "Error al obtener obras sociales");
    }
  }
);

export const getObraSocialById = createAsyncThunk(
  "obrasSociales/getObraSocialById",
  async (id, { rejectWithValue }) => {
    try {
      const response = await axios.get(`/obras-sociales/${id}`);
      return response.data.data;
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || "Error al obtener la obra social");
    }
  }
);

export const getNombreObraSocial = createAsyncThunk(
  "obrasSociales/getNombreObraSocial",
  async (nombre, { rejectWithValue }) => {
    try {
      const response = await axios.get(`/obras-sociales?nombre=${nombre}`);
      return response.data.data;
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || "Obra social no encontrada");
    }
  }
);

export const postObraSocial = createAsyncThunk(
  "obrasSociales/postObraSocial",
  async (payload, { rejectWithValue }) => {
    try {
      const response = await axios.post("/obras-sociales", payload);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || "Error al crear obra social");
    }
  }
);

export const editObraSocial = createAsyncThunk(
  "obrasSociales/editObraSocial",
  async ({ id, payload }, { rejectWithValue }) => {
    try {
      const response = await axios.put(`/obras-sociales/${id}`, payload);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || "Error al editar obra social");
    }
  }
);

export const deleteObraSocial = createAsyncThunk(
  "obrasSociales/deleteObraSocial",
  async (id, { rejectWithValue }) => {
    try {
      await axios.delete(`/obras-sociales/${id}`);
      return id;
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || "Error al eliminar obra social");
    }
  }
);

const obrasSocialesSlice = createSlice({
  name: "obrasSociales",
  initialState: {
    obrasSocialesList: [],
    obraSocialDetail: null,
    isLoading: false,
    error: null,
  },
  reducers: {
    orderObrasSocialesByName: (state, action) => {
      const sorted = [...state.obrasSocialesList].sort((a, b) => {
        if (action.payload === "asc") {
          return a.nombre.localeCompare(b.nombre);
        } else {
          return b.nombre.localeCompare(a.nombre);
        }
      });
      state.obrasSocialesList = sorted;
    },
    clearObraSocialDetail: (state) => {
      state.obraSocialDetail = null;
    }
  },
  extraReducers: (builder) => {
    builder
      // GET OBRAS SOCIALES
      .addCase(getObrasSociales.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(getObrasSociales.fulfilled, (state, action) => {
        state.isLoading = false;
        state.obrasSocialesList = action.payload;
      })
      .addCase(getObrasSociales.rejected, (state, action) => {
        state.isLoading = false;
        state.obrasSocialesList = [];
        state.error = action.payload;
      })

      // GET OBRA SOCIAL BY ID
      .addCase(getObraSocialById.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(getObraSocialById.fulfilled, (state, action) => {
        state.isLoading = false;
        state.obraSocialDetail = action.payload;
      })
      .addCase(getObraSocialById.rejected, (state, action) => {
        state.isLoading = false;
        state.obraSocialDetail = null;
        state.error = action.payload;
      })

      // GET OBRA SOCIAL BY NOMBRE
      .addCase(getNombreObraSocial.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(getNombreObraSocial.fulfilled, (state, action) => {
        state.isLoading = false;
        state.obrasSocialesList = action.payload;
      })
      .addCase(getNombreObraSocial.rejected, (state, action) => {
        state.isLoading = false;
        state.obrasSocialesList = [];
        state.error = action.payload;
      })

      // DELETE OBRA SOCIAL
      .addCase(deleteObraSocial.fulfilled, (state, action) => {
        state.obrasSocialesList = state.obrasSocialesList.filter(
          (os) => os.id !== action.payload
        );
      });
  },
});

export const { orderObrasSocialesByName, clearObraSocialDetail } = obrasSocialesSlice.actions;
export default obrasSocialesSlice.reducer;
