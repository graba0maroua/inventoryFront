import React from 'react';
import Home from '../../views/Home';
import '../../views/infra.css';
import { DataGrid, GridColDef } from '@mui/x-data-grid';
import { frFRLocalization } from "../../constantes/constantes";
import { Button,Dropdown, Form, Modal } from 'react-bootstrap';;
import { faAdd, faKey } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faDownload } from '@fortawesome/free-solid-svg-icons';
import { useAppSelector } from '../../hooks';
// import {  MainUiState } from '../../../features/uistate/mainui';
// import mainUiSlice from "../../../features/uistate/mainui";
//! the marginLeft not working 

interface Row {
    id: number;
    numero: string;
    nom: string;
    inventaireScannes: number;
    inventaireNonScannes: number;
    total: number;
    pourcentage: string;
  }
  
  const columns: GridColDef[] = [
    { field: 'numero', headerName: 'N°Localisation', width: 150 },
    { field: 'nom', headerName: 'Nom localisation', width: 150 },
    { field: 'inventaireScannes', headerName: 'Inventaire scannés', width: 150 },
    { field: 'inventaireNonScannes', headerName: 'Inventaire non scannés', width: 150 },
    { field: 'total', headerName: 'Total', width: 150 },
    { field: 'pourcentage', headerName: 'Pourcentage', width: 150 },
  ];
  
  const rows: Row[] = [
    { id: 1, numero: '001', nom: 'Localisation 1', inventaireScannes: 10, inventaireNonScannes: 5, total: 15, pourcentage: '66.7%' },
    { id: 2, numero: '002', nom: 'Localisation 2', inventaireScannes: 8, inventaireNonScannes: 7, total: 15, pourcentage: '53.3%' },
    // Add more rows as needed
  ];
  
  // const  marginLeft = useAppSelector((state:{mainUiSlice:MainUiState})=> state.mainUiSlice.marginLeft)
  const LocalitePage = () => {
    return (
        <main>
          <Home />
      
          {/* <div className={`table-container ${marginLeft} margin_left card me-5 p-3 shadow`}> */}          {/*! bring these back when u test marginLeft*/}
          <div className="table-container marginLeft margin_left card me-5 p-3 shadow">
            <div className="d-flex flex-row my-3">
              <div className="col-3">
                <select className="form-select mb-3" aria-label=".form-select-lg example">
                  <option selected>Centres opérationnels</option>
                  <option value="1">DIRECTION ADMINISTRATION GENERALE</option>
                  <option value="2">D.A.S.C. CHERAGA</option>
                  <option value="3">D.A.S.C. CHLEF</option>
                </select>
              </div>
              <div className="col-6"></div> {/* Add this div for spacing */}
              <div className="col-3">
                <select className="form-select mb-3" aria-label=".form-select-lg example">
                  <option selected>Localisation</option>
                  <option value="1">CHALET A AUDIT</option>
                  <option value="2">COULOIR REZ DE CHAUSSE</option>
                  <option value="3">BUREAU 17</option>
                </select>
              </div>
            </div>
      
            <div>
              <DataGrid
                className="table"
                rows={rows}
                columns={columns}
                localeText={frFRLocalization}
              />
            </div>
          </div>
        </main>
      );
  };
  
  export default LocalitePage;