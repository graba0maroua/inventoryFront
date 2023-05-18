import React from 'react';
import Home from '../../views/Home';
import '../../views/infra.css';
import './../../../unite.css';
import { DataGrid, GridColDef, GridToolbarColumnsButton, GridToolbarContainer,GridToolbarFilterButton,GridToolbarExport,
  GridToolbarDensitySelector, } from '@mui/x-data-grid';
import { frFRLocalization } from "../../constantes/constantes";
import { useFetchInfrastructureLocaliteQuery } from '../../../features/infrastructure/infrastructureLocalite';
import { ProgressBar } from 'react-bootstrap';

function CustomToolbar() {
  const buttonStyle = {
    color: '#072645',
    transition: 'background-color 0.3s ease',
  };

  const buttonHoverStyle = {
    backgroundColor: '#CFE8FF',
  };

  return (
    <GridToolbarContainer>
      <GridToolbarColumnsButton style={buttonStyle}  />
      <GridToolbarFilterButton style={buttonStyle}  />
      <GridToolbarDensitySelector style={buttonStyle}  />
      <style>
        {`.toolbar-button:hover { background-color: ${buttonHoverStyle.backgroundColor}; }`}
      </style>
    </GridToolbarContainer>
  );
}
interface Row {
  id:string;
  nom: string;
  inventaireScannes: number;
  inventaireNonScannes: number;
  total: number;
  pourcentage: string;
}

const columns: GridColDef[] = [
  { field: 'id', headerName: 'N°Localisation', width: 150, headerClassName: 'boldHeader' },
  { field: 'nom', headerName: 'Nom localisation', width: 250,headerClassName: 'boldHeader' },
  { field: 'inventaireScannes', headerName: 'Inventaire scannés', width: 150,headerClassName: 'boldHeader' },
  { field: 'inventaireNonScannes', headerName: 'Inventaire non scannés', width: 150,headerClassName: 'boldHeader' },
  { field: 'total', headerName: 'Total', width: 100 ,headerClassName: 'boldHeader'},
  {
    field: 'pourcentage',
    headerName: 'Pourcentage',
    width: 150,
    headerClassName: 'boldHeader',
    renderCell: (params) => (
      <div style={{ width: '100%', height: 20 }}>
        <ProgressBar now={params.value} label={`${params.value}%`}
        className="custom-progress-bar" />
      </div>
    ),
  }
];

const LocalitePage = () => {
  const { data, isLoading, isError } = useFetchInfrastructureLocaliteQuery();
  
  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (isError) {
    return <div>Error occurred while fetching data.</div>;
  }

  const rows: Row[] = data ? data.map((item) => ({
    id: item.locality_id.toString(),
    nom: item.locality_name,
    inventaireScannes: item.scanned_count,
    inventaireNonScannes: item.not_scanned_count,
    total: item.total_count,
    pourcentage: item.percentage.toString(),
  })) : [];

  return (
    <main>
      <Home />

      <div className="table-container  margin_left card me-5 p-3 shadow">
      <div className="d-flex flex-row "> {/*i took off my-3 */}
          <div className="col-3">
            <select className="form-select mb-3" aria-label=".form-select-lg example">
              <option selected>Centres opérationnels</option>
              <option value="1">DIRECTION ADMINISTRATION GENERALE</option>
              <option value="2">D.A.S.C. CHERAGA</option>
              <option value="3">D.A.S.C. CHLEF</option>
            </select>
          </div>
          <div className="col-6"></div>
          <div className="col-3">
            <select className="form-select mb-3" aria-label=".form-select-lg example">
              <option selected>Localisation</option>
              <option value="1">CHALET A AUDIT</option>
              <option value="2">COULOIR REZ DE CHAUSSE</option>
              <option value="3">BUREAU 17</option>
            </select>
          </div>
        </div>
        <div style={{ height: '50vh' }}>    {/*change longeur tea la table*/}
          <DataGrid className="table" 
          rows={rows } 
          columns={columns}  
          slots={{
            toolbar: CustomToolbar,
          }}
        pageSizeOptions={[5, 10, 25,50,100]}
        localeText={frFRLocalization} />
        
        </div>
      </div>
    </main>
  );
};

export default LocalitePage;