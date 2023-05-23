import React from 'react'
import ReactDOM from 'react-dom/client'
import './index.css'
import 'bootstrap/dist/css/bootstrap.min.css';

import { Provider } from 'react-redux'
import { store } from './app/store.ts'
import PublicWrapper from './hoc/UnProtected'
import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom'
import LoginPage from './app/views/LoginPage.tsx'
import HomePage from './app/views/Home.tsx'
import PrivateWrapper from './hoc/Protected.tsx'
import CentrePage from './app/views/CentrePage.tsx';
import LocalitePage from './app/views/Infrastructure/LocalitePage';
import PlanPage from './app/views/PlanInventaire/PlanPage';
import Chefcentre from './app/views/Listeinventaire/Chefcentre';

  ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
    <React.StrictMode>
      <Provider store={store}>
      <BrowserRouter>
        <Routes>
          <Route path='/' element={<Navigate to="/login" replace />}/>
  
        
          <Route path="/login" element={
            <PublicWrapper>
              <LoginPage/>
            </PublicWrapper>   
          }/>
          <Route path="/home" element={
            <PrivateWrapper>
              <HomePage />
            </PrivateWrapper>   
          }/>
            <Route path="/centres" element={
            <PrivateWrapper>
              <CentrePage />
            </PrivateWrapper>   
          }/>
         
            <Route path="/infrastructure/localite" element={
            <PrivateWrapper>
              <LocalitePage />
            </PrivateWrapper>   
          }/>
            <Route path="/plan" element={
            <PrivateWrapper>
              <PlanPage />
            </PrivateWrapper>   
          }/>
            <Route path="/inventoryList-centre" element={
            <PrivateWrapper>
              < Chefcentre/>
            </PrivateWrapper>   
          }/>
          </Routes> 
          </BrowserRouter>
          </Provider>
          </React.StrictMode>  
)
