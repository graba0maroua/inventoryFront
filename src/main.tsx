import React from 'react'
import ReactDOM from 'react-dom/client'
import './index.css'
import { Provider } from 'react-redux'
import { store } from './app/store.ts'
import PublicWrapper from './hoc/UnProtected'
import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom'
import LoginPage from './app/views/LoginPage.tsx'
import HomePage from './app/views/Home.tsx'
import PrivateWrapper from './hoc/Protected.tsx'

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
          
          </Routes>
          </BrowserRouter>
          </Provider>
          </React.StrictMode>  
)