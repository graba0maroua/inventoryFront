import React, { useState } from 'react';
import Home from '../../views/Home';
import './../../../unite.css';
import { DataGrid, GridColDef, GridToolbarColumnsButton, GridToolbarContainer, GridToolbarFilterButton, GridToolbarDensitySelector, gridClasses, frFR } from '@mui/x-data-grid';
import { frFRLocalization } from "../../constantes/constantes";
import { useFetchChefEquipeQuery } from '../../../features/ListeInventaire/ChefEquipe';
import { useFetchVisitedLocaliteQuery,useFetchNotVisitedLocaliteQuery } from '../../../features/ListeInventaire/LocalitesVisEtNonVisite';
import { blueGrey, grey } from '@mui/material/colors';
import Loader from '../../../Messages/Loader';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCheckCircle, faTimesCircle } from '@fortawesome/free-solid-svg-icons';
import SideBar from '../../components/SideBarComponent';
import WelcomeComponent from '../../components/WelComeComponent';
import { Button, Modal } from 'react-bootstrap';
import VisitedLocaliteComponent from '../../components/VisitedLocaliteComponent';
import { MainUiState, setLoadingState, setShowUrlModal, setUrl } from '../../../features/uistate/mainui';
import { useAppSelector } from '../../hooks';
import { BsBuildingCheck, BsBuildingFillCheck, BsBuildingFillSlash } from 'react-icons/bs';
import NotVisitedLocaliteComponent from '../../components/NotVisitedLocaliteComponent';

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
      <GridToolbarColumnsButton style={buttonStyle} />
      <GridToolbarFilterButton style={buttonStyle} />
      <GridToolbarDensitySelector style={buttonStyle} />
      <style>
        {`.toolbar-button:hover { background-color: ${buttonHoverStyle.backgroundColor}; }`}
      </style>
    </GridToolbarContainer>
  );
}


interface Row {
  id: string;
  COP_ID: string;
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
  { field: 'LOC_ID_INIT', headerName: 'N°Localisation', width: 130, headerClassName: 'boldHeader', sortable: false },
  { field: 'AST_ID', headerName: 'N°inventaire', width: 130, headerClassName: 'boldHeader', sortable: false },
  { field: 'code_bar', headerName: 'Code bar', width: 150, headerClassName: 'boldHeader', sortable: false, headerAlign: 'center' },
  { field: 'AST_LIB', headerName: 'Designations', width: 200, headerClassName: 'boldHeader', sortable: false },
  { field: 'AST_VALBASE', headerName: 'Valeur', width: 90, headerClassName: 'boldHeader', align: 'center', headerAlign: 'center' },
  { field: 'AST_DTE_ACQ', headerName: 'Acquis le', width: 100, headerClassName: 'boldHeader', sortable: false },
  {
    field: 'status',
    headerName: 'État',
    headerAlign: 'center',
    width: 120,
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
  { field: 'LOC_LIB_INIT', headerName: 'Localisation', width: 100, headerClassName: 'boldHeader', sortable: false },
];

const ChefEquipe = () => {
  const { data, isLoading, isError } = useFetchChefEquipeQuery();
  // const { data: notVisitedLocalities, isLoading: notVisitedLoading, isError: notVisitedError } = useFetchNotVisitedLocaliteQuery();
  const [showVisitedModal, setShowVisitedModal] = useState(false);
  const [showNotVisitedModal, setShowNotVisitedModal] = useState(false);
  const margin_left = useAppSelector((state: { mainUiSlice: MainUiState }) => state.mainUiSlice.marginLeft);

  const handleVisitedModalOpen = () => {
    setShowVisitedModal(true);
  };

  const handleVisitedModalClose = () => {
    setShowVisitedModal(false);
  };

  const handleNotVisitedModalOpen = () => {
    setShowNotVisitedModal(true);
  };

  const handleNotVisitedModalClose = () => {
    setShowNotVisitedModal(false);
  };
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
      <SideBar active="Localités" />
      <WelcomeComponent 
   page="Liste d'inventaire"
   title="Liste d'inventaire"
   subItem={'Table de données'} 
   downloadLink='#'
   isDownloadable={false}
   onClickCustom={null}
    />

<div className="button-container">
        <Button className="btn-loc" onClick={handleVisitedModalOpen}>
        <BsBuildingFillCheck /> Localités Visitées
        </Button>
        <Button className="btn-loc" onClick={handleNotVisitedModalOpen}>
         <BsBuildingFillSlash/> Localités Non Visitées
        </Button>
      </div>

      {/* Visited Localities Modal */}
      <Modal  className='w-100' show={showVisitedModal} onHide={handleVisitedModalClose}>
  <Modal.Header className="bg-secondaire" closeButton>
    <Modal.Title className="text-center" style={{ fontSize: '20px', fontFamily: 'lato' ,fontWeight :700  ,}}>
      <BsBuildingFillCheck className='me-2' /> Localités Visitées
    </Modal.Title>
  </Modal.Header>
  <Modal.Body style={{ maxHeight: '66vh', overflowY: 'auto' }}>
    <VisitedLocaliteComponent />
  </Modal.Body>
  <Modal.Footer>
    <Button variant="secondary" onClick={handleVisitedModalClose}>
      Fermer
    </Button>
  </Modal.Footer>
</Modal>

      {/* Not Visited Localities Modal */}
      <Modal centered show={showNotVisitedModal} onHide={handleNotVisitedModalClose}>
        <Modal.Header className="bg-secondaire" closeButton>
        <Modal.Title className="text-center" style={{ fontSize: '20px', fontFamily: 'lato' ,fontWeight :700  ,}}>
        <BsBuildingFillSlash className='me-2' /> Localités non Visitées
    </Modal.Title>
        </Modal.Header>
        <Modal.Body style={{ maxHeight: '66vh', overflowY: 'auto' }}>
        <NotVisitedLocaliteComponent />
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleNotVisitedModalClose}>
            Fermer
          </Button>
        </Modal.Footer>
      </Modal>

        
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
                paginationModel: { page: 0, pageSize: 5 },
              },
            }}
            pageSizeOptions={[5, 10, 25, 50, 100]}
            localeText={frFR.components.MuiDataGrid.defaultProps.localeText}
            getRowSpacing={(params) => ({
              top: params.isFirstVisible ? 0 : 5,
              bottom: params.isLastVisible ? 0 : 5,
            })}
            sx={{
              [`& .${gridClasses.row}`]: {
                bgcolor: (theme) => (theme.palette.mode === 'light' ? blueGrey[50] : grey[50]),
              },
            }}
          />
        </div>
      </div>
    </main>
  );
};

export default ChefEquipe;
  