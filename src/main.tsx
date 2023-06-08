import React from 'react'
import ReactDOM from 'react-dom/client'
import './index.css'
import 'bootstrap/dist/css/bootstrap.min.css';

import { Provider } from 'react-redux'
import { store } from './app/store.ts'
import PublicWrapper from './hoc/UnProtected'
import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom'
import LoginPage from './app/views/LoginPage.tsx'
import SettingsPage from './app/views/SettingsPage.tsx'
import MyComponent from './app/views/ProfilePage'
import HomePage from './app/views/Home.tsx'
import PrivateWrapper from './hoc/Protected.tsx'
import LocalitePage from './app/views/Infrastructure/LocalitePage';
import ChartComponent from './app/views/Chart';
import PieChartEquipe from './app/views/PieChartEquipe';
import CentrePage from './app/views/Infrastructure/CentrePage';
import UnitePage from './app/views/Infrastructure/UnitePage';
import PlanPage from './app/views/PlanInventaire/PlanPage';
import Chefcentre from './app/views/Listeinventaire/Chefcentre';
import ChefUnite from './app/views/Listeinventaire/Chefunite';
import ChefEquipe from './app/views/Listeinventaire/Chefequipe';
import AdminPage from './app/views/Admin/AdminPage';

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
          }>
            </Route>
        
            <Route path="/infrastructure/localite" element={
            <PrivateWrapper>
              <LocalitePage />
            </PrivateWrapper>   
          }/>
            <Route path="/lineChart" element={
            <PrivateWrapper>
              <ChartComponent />
            </PrivateWrapper>   
          }/>
            <Route path="/pieChart1" element={
            <PrivateWrapper>
              <PieChartEquipe />
            </PrivateWrapper>   
          }/>
            <Route path="/infrastructure/centre" element={
            <PrivateWrapper>
              <CentrePage />
            </PrivateWrapper>   
          }/>
            <Route path="/infrastructure/unite" element={
            <PrivateWrapper>
              <UnitePage />
            </PrivateWrapper>   
          }/>
            <Route path="/updatePassword" element={
            <PrivateWrapper>
              <SettingsPage />
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
            <Route path="/inventoryList-unite" element={
            <PrivateWrapper>
              < ChefUnite/>
            </PrivateWrapper>   
          }/>
            <Route path="/inventoryList-equipe" element={
            <PrivateWrapper>
              < ChefEquipe/>
            </PrivateWrapper>   
          }/>
            <Route path="/admin" element={
            <PrivateWrapper>
              < AdminPage/>
            </PrivateWrapper>   
          }/>
            <Route path="/profil" element={
            <PrivateWrapper>
              < MyComponent/>
            </PrivateWrapper>   
          }/>
            <Route path="/settings" element={
            <PrivateWrapper>
              < SettingsPage/>
            </PrivateWrapper>   
          }/>
          </Routes> 
          </BrowserRouter>
          </Provider>
          </React.StrictMode>  
)
