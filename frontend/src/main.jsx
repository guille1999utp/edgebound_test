import React from 'react'
import ReactDOM from 'react-dom/client'
import {
  BrowserRouter, Route, Routes,
} from "react-router-dom";
import './styles/index.css'
import App from './App';
import { pageNotFound } from './pageNotFound';
import Pokemon from './Pokemon';

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path="/search" Component={App}/> 
        <Route path="/search/:pokemon" Component={Pokemon}/> 
        <Route path="/*" Component={pageNotFound}/> 
      </Routes>
    </BrowserRouter>
  </React.StrictMode>,
)
