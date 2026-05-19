import React from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import './App.css';
import LandingPage from './components/LandingPage.jsx';
import Home from './components/Home.jsx';
import ClientCreate from './components/ClientCreate.jsx';
import ClientEdit from './components/ClientEdit.jsx';
import Detail from './components/Detail.jsx';
import ObrasSociales from './components/ObrasSociales.jsx';
import ObraSocialCreate from './components/ObraSocialCreate.jsx';
import ObraSocialEdit from './components/ObraSocialEdit.jsx';
import Layout from './components/Layout.jsx';
import AccesoDenegado from './components/AccesoDenegado.jsx';

function App() {
  return (
    <Router>
      <div>
        <Routes>
          <Route path='/' element={<LandingPage/>}/>
          <Route path='/clientes' element={<Layout><Home/></Layout>}/>
          <Route path='/clientes/nuevo' element={<Layout><ClientCreate/></Layout>}/>
          <Route path='/clientes/:id' element={<Layout><Detail/></Layout>}/>
          <Route path='/clientes/editar/:id' element={<Layout><ClientEdit/></Layout>}/>
          <Route path='/obras-sociales' element={<Layout><ObrasSociales/></Layout>}/>
          <Route path='/obras-sociales/nueva' element={<Layout><ObraSocialCreate/></Layout>}/>
          <Route path='/obras-sociales/editar/:id' element={<Layout><ObraSocialEdit/></Layout>}/>
          <Route path='/acceso-denegado' element={<AccesoDenegado/>}/>
          {/* Redireccionar cualquier ruta vieja o no existente a /clientes */}
          <Route path='/home' element={<Navigate to="/clientes" replace />} />
          <Route path='/home/:id' element={<Navigate to="/clientes/:id" replace />} />
          <Route path='/cliente' element={<Navigate to="/clientes/nuevo" replace />} />
          <Route path='/cliente/:id' element={<Navigate to="/clientes/editar/:id" replace />} />
          <Route path='/obrasocial' element={<Navigate to="/obras-sociales/nueva" replace />} />
          <Route path='/obrasocial/:id' element={<Navigate to="/obras-sociales/editar/:id" replace />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
