import React from 'react';
import Home from '../../views/Home';
import './../../../unite.css';
import { DataGrid, GridColDef, GridToolbarColumnsButton, GridToolbarContainer,GridToolbarFilterButton,GridToolbarExport,
  GridToolbarDensitySelector,
  gridClasses, } from '@mui/x-data-grid';
import { frFRLocalization } from "../../constantes/constantes";
import { useFetchInfrastructureLocaliteQuery } from '../../../features/infrastructure/infrastructureLocalite';
import { ProgressBar, Spinner } from 'react-bootstrap';
import { blueGrey, grey } from '@mui/material/colors';
import Loader from '../../../Messages/Loader';

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
  { field: 'id', headerName: 'N°Localisation', width: 150, headerClassName: 'boldHeader',sortable: false, },
  { field: 'nom', headerName: 'Nom localisation', width: 250,headerClassName: 'boldHeader',sortable: false, },
  { field: 'inventaireScannes', headerName: 'Inventaire scannés', width: 150,headerClassName: 'boldHeader',align: 'center' },
  { field: 'inventaireNonScannes', headerName: 'Inventaire non scannés', width: 150,headerClassName: 'boldHeader' ,align: 'center'},
  { field: 'total', headerName: 'Total', width: 100 ,headerClassName: 'boldHeader', headerAlign: 'center',align: 'center'},
  {
    field: 'pourcentage',
    headerName: 'Pourcentage',
    width: 160,
    headerClassName: 'boldHeader',
    headerAlign: 'center',
    align: 'center',
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
    return  <div  className="d-flex flex-row justify-content-center"> <Loader/> </div>
  }

  if (isError) {
    return ( <div className="alert alert-danger" role="alert">
    <h4 className="alert-heading">ERROR</h4>
    <p>An error happened while fetching data </p>
    <hr/>
    <p className="mb-0">check your internet connexion and refresh the page </p>
  </div>)
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
        <div style={{ height: '100%' }}>    {/*change longeur tea la table*/}
          <DataGrid className="table" 
          rows={rows } 
          columns={columns}  
          slots={{
            toolbar: CustomToolbar,
          }}
        
        pageSizeOptions={[5, 10, 25,50,100]}
        localeText={frFRLocalization}
        getRowSpacing={(params) => ({
          top: params.isFirstVisible ? 0 : 5,
          bottom: params.isLastVisible ? 0 : 5,
        })}
        sx={{
          [`& .${gridClasses.row}`]: {
            bgcolor: (theme) => theme.palette.mode === 'light' ? blueGrey[(50)] : grey[50],
          },
        }} />
        
        </div>
      </div>
    </main>
  );
};

export default LocalitePage;