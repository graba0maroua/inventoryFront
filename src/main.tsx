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
import LocalitePage from './app/views/Infrastructure/LocalitePage.tsx';
import PlanPage from './app/views/PlanInventaire/PlanPage.tsx';

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
            <PublicWrapper>
              <HomePage />
            </PublicWrapper>   
          }/>
            <Route path="/centres" element={
            <PublicWrapper>
              <CentrePage />
            </PublicWrapper>   
          }/>
         
            <Route path="/infrastructure/localite" element={
            <PublicWrapper>
              <LocalitePage />
            </PublicWrapper>   
          }/>
            <Route path="/plan" element={
            <PublicWrapper>
              <PlanPage />
            </PublicWrapper>   
          }/>
          </Routes> 
          </BrowserRouter>
          </Provider>
          </React.StrictMode>  
)
