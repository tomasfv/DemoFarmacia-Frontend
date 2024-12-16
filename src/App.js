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

function App() {
  return (
    <Router>
    <div>
      <Routes>
        <Route path='/' element={<LandingPage/>}/>
        <Route path='/home' element={<Layout><Home/></Layout>}/>
        <Route path='/cliente' element={<Layout><ClientCreate/></Layout>}/>
        <Route path='/cliente/:id' element={<Layout><ClientEdit/></Layout>}/>
        <Route path='/home/:id' element={<Detail/>}/>
        <Route path='/obras-sociales' element={<Layout><ObrasSociales/></Layout>}/>
        <Route path='/obrasocial' element={<Layout><ObraSocialCreate/></Layout>}/>
        <Route path='/obrasocial/:id' element={<Layout><ObraSocialEdit/></Layout>}/>
      </Routes>
    </div>
    </Router>
  )
}

export default App;
