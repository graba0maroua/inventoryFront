import React from 'react';
import Home from '../../views/Home';
import './../../../unite.css';
import { DataGrid, GridColDef, GridToolbarColumnsButton, GridToolbarContainer,GridToolbarFilterButton,GridToolbarExport,
  GridToolbarDensitySelector,
  gridClasses, } from '@mui/x-data-grid';
import { frFRLocalization } from "../../constantes/constantes";
import { useFetchChefUniteQuery } from '../../../features/ListeInventaire/ChefUnite';
import { blueGrey, grey } from '@mui/material/colors';
import Loader from '../../../Messages/Loader';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCheckCircle, faTimesCircle } from '@fortawesome/free-solid-svg-icons';
import SideBar from '../../components/SideBarComponent';
import WelcomeComponent from '../../components/WelComeComponent';
import { useAppSelector } from '../../hooks';
import { MainUiState, setLoadingState, setShowUrlModal, setUrl } from '../../../features/uistate/mainui';

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
        <GridToolbarExport style={buttonStyle} />
      </GridToolbarContainer>
    );
  }
  interface Row {
    id: string;
    COP_ID:string,
    AST_ID: string;
    code_bar: string;
    AST_LIB: string;
    AST_VALBASE: number;
    AST_DTE_ACQ: Date;
    LOC_ID_INIT: string;
    LOC_LIB_INIT: string;
    status: string;
  }
  const columns: GridColDef[] = [
    { field: 'id', headerName: 'ID', width: 30, headerClassName: 'boldHeader', sortable: false },
    { field: 'COP_ID', headerName: 'N°Centre', width: 80, headerClassName: 'boldHeader', sortable: false },
    { field: 'AST_ID', headerName: 'N°inventaire', width: 120, headerClassName: 'boldHeader', sortable: false ,},
    { field: 'AST_LIB', headerName: 'Asset Libellé', width: 200, headerClassName: 'boldHeader', sortable: false ,},
    { field: 'code_bar', headerName: 'Code Bar', width: 150, headerClassName: 'boldHeader', sortable: false ,headerAlign: 'center'},
    { field: 'AST_DTE_ACQ', headerName: 'Date Acquisition', width: 100, headerClassName: 'boldHeader', sortable: false },
    { field: 'LOC_ID_INIT', headerName: 'Localisation ID', width: 150, headerClassName: 'boldHeader', sortable: false },
    {
      field: 'status',
      headerName: 'Status',
      headerAlign: 'center',
      width: 130,
      headerClassName: 'boldHeader',
      sortable: false,
      renderCell: (params) => {
        const status = params.value as string;
    
        if (status === 'Scanné') {
          return (
            <span className="status-badge scanned-badge">
              <FontAwesomeIcon className="icon" icon={faCheckCircle} /> {status}
            </span>
          );
        } else {
          return (
            <span className="status-badge not-scanned-badge">
              <FontAwesomeIcon className="icon" icon={faTimesCircle} /> {status}
            </span>
          );
        }
      },
    },
    { field: 'AST_VALBASE', headerName: 'Valeur', width: 90, headerClassName: 'boldHeader', align: 'center',headerAlign: 'center' },
    { field: 'LOC_LIB_INIT', headerName: 'Localisation Libellé', width: 100, headerClassName: 'boldHeader', sortable: false },
    
  ];

  const Chefunite = () => {
    const { data, isLoading, isError } = useFetchChefUniteQuery();
    const margin_left = useAppSelector((state: { mainUiSlice: MainUiState }) => state.mainUiSlice.marginLeft);
  if (isLoading) {
    return (
      <div className="d-flex flex-row justify-content-center">
        <Loader />
      </div>
    );
  }

  if (isError) {
    return (
      <div className="alert alert-danger" role="alert">
        <h4 className="alert-heading">ERROR</h4>
        <p>An error happened while fetching data</p>
        <hr />
        <p className="mb-0">error</p>
      </div>
    );
  }
  const rows: Row[] = data
  ? data.map((item, index) => ({
      id: (index + 1).toString(),
      COP_ID: item.COP_ID,
      AST_ID: item.AST_ID,
      code_bar: item.code_bar,
      AST_LIB: item.AST_LIB,
      AST_VALBASE: item.AST_VALBASE,
      AST_DTE_ACQ: item.AST_DTE_ACQ, // Convert the string to a Date object
      LOC_ID_INIT: item.LOC_ID_INIT,
      LOC_LIB_INIT: item.LOC_LIB_INIT,
      status: item.status,
    }))
  : [];

 return (
  <main>
  <SideBar  active='Localités' />
   <WelcomeComponent 
   page="Liste d'inventaire"
   title="Liste d'inventaire"
   subItem={'Table de données'} 
   downloadLink='#'
   isDownloadable={false} />
    
    <div className={`table-container ${margin_left} card me-2 p-3 shadow`}>
        <div style={{ height: '100%' }}>
          <DataGrid
            className="table"
            rows={rows}
            columns={columns}
            slots={{
                toolbar: CustomToolbar,
              }}
              initialState={{
                pagination: {
                  paginationModel: { page: 0, pageSize: (5) },
                },
              }}
            pageSizeOptions={[(5), 10, 25,50,100]}
            localeText={frFRLocalization}
            getRowSpacing={(params) => ({
              top: params.isFirstVisible ? 0 : (5),
              bottom: params.isLastVisible ? 0 : (5),
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
export default Chefunite;
