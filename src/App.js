import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import './App.css';
import LandingPage from './components/LandingPage.jsx';
import Home from './components/Home.jsx';
import ClientCreate from './components/ClientCreate.jsx'
import ClientEdit from './components/ClientEdit.jsx';
import Detail from './components/Detail.jsx';
import ObrasSociales from './components/ObrasSociales.jsx';
import ObraSocialCreate from './components/ObraSocialCreate.jsx';
import ObraSocialEdit from './components/ObraSocialEdit.jsx';
import Layout from './components/Layout.jsx';
import ProtectedRoute from "./components/ProtectedRoute.jsx";
import AccesoDenegado from './components/AccesoDenegado.jsx';

function App() {
  return (
    <Router>
    <div>
      <Routes>
        <Route path='/' element={<LandingPage/>}/>
        <Route path='/home' element={<ProtectedRoute><Layout><Home/></Layout></ProtectedRoute>}/>
        <Route path='/cliente' element={<ProtectedRoute><Layout><ClientCreate/></Layout></ProtectedRoute>}/>
        <Route path='/cliente/:id' element={<ProtectedRoute><Layout><ClientEdit/></Layout></ProtectedRoute>}/>
        <Route path='/home/:id' element={<Detail/>}/>
        <Route path='/obras-sociales' element={<ProtectedRoute><Layout><ObrasSociales/></Layout></ProtectedRoute>}/>
        <Route path='/obrasocial' element={<ProtectedRoute><Layout><ObraSocialCreate/></Layout></ProtectedRoute>}/>
        <Route path='/obrasocial/:id' element={<ProtectedRoute><Layout><ObraSocialEdit/></Layout></ProtectedRoute>}/>
        <Route path='/acceso-denegado' element={<AccesoDenegado/>}/>
      </Routes>
    </div>
    </Router>
  )
}

export default App;
