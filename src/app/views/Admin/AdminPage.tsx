import React, { useState } from 'react';
import { useFetchDemandeCompteQuery, useAcceptDemandeCompteMutation, useRefuseDemandeCompteMutation } from '../../../features/Admin/Admin';
import { useSelector, useDispatch } from 'react-redux';
import { DemandeCompte } from '../../../app/models/DemandeCompte';
import { Button, Modal, Spinner } from 'react-bootstrap';
import './../../../unite.css';
import { DataGrid, GridColDef, GridToolbarColumnsButton, GridToolbarContainer, GridToolbarFilterButton, GridToolbarExport, GridToolbarDensitySelector, gridClasses, frFR } from '@mui/x-data-grid';
import { frFRLocalization } from "../../constantes/constantes";
import { blueGrey, grey } from '@mui/material/colors';
import Loader from '../../../Messages/Loader';
import inv from "../../../assets/Asset4.svg";
import profil from "../../../assets/user2.png";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCheck, faSignOutAlt, faTimes } from '@fortawesome/free-solid-svg-icons';
import { useLogoutMutation } from '../../../features/auth/login';
import { signOut } from '../../../features/auth/auth-slice';
import { useAppDispatch } from '../../hooks';
import { BsPersonFillCheck, BsPersonFillDash } from 'react-icons/bs';


const AdminPage = () => {
  const [keyword, setKeyword] = useState('');
  const { data, isLoading,refetch } = useFetchDemandeCompteQuery({ keyword: keyword });
  const [showLogout, setShowLogout] = useState(false);
  const [logout] = useLogoutMutation();
  const dispatch = useAppDispatch();
  const [acceptDemande] = useAcceptDemandeCompteMutation();
  const [refuseDemande] = useRefuseDemandeCompteMutation();
  const [selectedDemande, setSelectedDemande] = useState<DemandeCompte | null>(null); // Store the selected demande
  const [showAcceptModal, setShowAcceptModal] = useState(false);
  const [showRefuseModal, setShowRefuseModal] = useState(false);

  const handleAcceptConfirmation = async () => {
    if (selectedDemande) {
      await acceptDemande({ id: selectedDemande.id }).unwrap();
      setShowAcceptModal(false);
      refetch();
    }
  };

  const handleRefuseConfirmation = async () => {
    if (selectedDemande) {
      await refuseDemande({ id: selectedDemande.id }).unwrap();
      setShowRefuseModal(false);
      refetch();
    }
  };

  const columns: GridColDef[] = [
    { field: 'id', headerName: 'ID', width: 50 },
    { field: 'name', headerName: 'Nom complet', width: 155, },
    { field: 'created_at', headerName: 'crée le', width:  150,  headerAlign: 'center',},
    { field: 'matricule', headerName: 'Matricule', width: 100,align: 'center',headerAlign: 'center' },
    { field: 'email', headerName: 'Email', width: 100,align: 'center',headerAlign: 'center' },
    {
      field: 'role',
      headerName: 'Role',
      align: 'center',
      headerAlign: 'center',
      width: 150,
      renderCell: (params) => {
        const role = params.value as string;
        let formattedRole = '';
    
        if (role === 'Chef_centre') {
          formattedRole = "Chef de centre";
        } else if (role === 'Chef_unité') {
          formattedRole = "Chef d'unité";
        } else if (role === 'Chef_équipe') {
          formattedRole = "Chef d'équipe";
        } else if (role === 'Admin') {
          formattedRole = "Admin";
        } else if (role === 'Chef_équipe') {
          formattedRole = "Chef d'équipe";
        }
    
        return <div>{formattedRole}</div>;
      },
    },
    { field: 'structure_id', headerName: 'N°structure', width: 90 ,headerAlign: 'center',align: 'center',},
    { field: 'status', headerName: 'Etat',align: 'center',headerAlign: 'center', width: 140 ,renderCell: (params) => {
      const demande = params.row as DemandeCompte;
      
      let statusBackgroundColor = '';
      let statusTextColor = '';
      let statusText = '';
    
      switch (demande.status) {
        case 'pending':
          statusBackgroundColor = '#f6eacd';
          statusTextColor = '#FCAA06';
          statusText = 'En-attente';
          break;
        case 'accepted':
          statusBackgroundColor = '#ccf3d5';
          statusTextColor = '#37C24B';
          statusText = 'Accepté';
          break;
        case 'refused':
          statusBackgroundColor = '#da5955';
          statusTextColor = '#FFF';
          statusText = 'Refusé';
          break;
        default:
          break;
      }
      const statusStyle = {
        backgroundColor: statusBackgroundColor,
        color: statusTextColor,
        borderRadius: '5px',
        padding: '4px 8px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        fontWeight: 'bold',
        fontFamily: 'lato, sans-serif',
        fontSize: '14px',
      };
    
      return (
        <div style={statusStyle}>
          {statusText}
        </div>
      );
    },},
    {
      field: 'actions',
      headerName: 'Actions',
      align: 'center',
      width: 250,
      sortable: false,
      headerAlign: 'center',
      renderCell: (params) => {
        const demande = params.row as DemandeCompte;
        return (
          <>
            {demande.status === 'pending' && (
              <div className="actions-container">
                <button
                  className="accept-button"
                  onClick={() => {
                    setSelectedDemande(demande); // Set the selected demande
                    setShowAcceptModal(true); // Open the accept confirmation modal
                  }}
                >
                  <BsPersonFillCheck className="icon" />
                  Accepter
                </button>
                <button
                  className="refuse-button"
                  onClick={() => {
                    setSelectedDemande(demande); // Set the selected demande
                    setShowRefuseModal(true); // Open the refuse confirmation modal
                  }}
                >
                  <BsPersonFillDash className="icon" />
                  Refuser
                </button>
              </div>
            )}
          </>
        );
      },
    },
  ];
  const sortedData = data ? [...data].sort((a, b) => {
    if (a.status === 'pending' && b.status !== 'pending') {
      return -1; // Move pending rows to the top
    } else if (a.status !== 'pending' && b.status === 'pending') {
      return 1; // Move pending rows to the top
    } else {
      return 0; // Maintain the original order for non-pending rows
    }
  }) : [];
  
  const rows = sortedData.map((demande) => ({
    id: demande.id,
    name: demande.name,
    matricule: demande.matricule,
    role: demande.role,
    structure_id: demande.structure_id,
    email:demande.email,
    created_at:demande.created_at,
    status: demande.status,
    actions: demande, // pass the whole object to actions column
  }));

  const CustomToolbar = () => {
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
        <style>{`.toolbar-button:hover { background-color: ${buttonHoverStyle.backgroundColor}; }`}</style>
      </GridToolbarContainer>
    );
  };

  return (
    <main>
     <nav className="navbar navbar-light bg-white " style={{ margin: '0.5vw 1.5vw', boxShadow: '0px 2px 4px rgba(0, 0, 0, 0.1)' }}>
  <div className="container-fluid">
    <div className="navbar-brand">
      <img src={inv} alt="logo" width="100%" height="30" className="d-inline-block align-text-top logo" />
    </div>
    <form className="admin search" action="#">
      <div className="form-input">
        <input
          type="search"
          placeholder="Rechercher..."
          onChange={(e) => {
            setKeyword(e.target.value);
          }}
        />
        <button type="submit" className="search-btn">
          <i className="bx bx-search"></i>
        </button>
      </div>
    </form>
    <div className="d-flex align-items-center">
      <img
        src={profil}
        alt="profile"
        width="40"
        height="40"
        className="d-inline-block align-text-top me-2 profile-pic"
        onClick={() => setShowLogout(!showLogout)}
      />
      {showLogout && (
        <button
          className="btn btn-light logout-button"
          onClick={async () => {
            await logout("");
            dispatch(signOut());
          }}
        >
          <FontAwesomeIcon icon={faSignOutAlt} /> Déconnexion
        </button>
      )}
    </div>
  </div>
</nav>
      <div className="mt-3 table AdminTable card me-5 p-3 shadow">
        <DataGrid
          rows={rows || []}
          columns={columns}
          slots={{
            toolbar: CustomToolbar,
          }}
          initialState={{
            pagination: {
              paginationModel: { page: 0, pageSize: 5 },
            },
          }}
        pageSizeOptions={[4,5, 10, 25,50,100]}
        localeText={frFR.components.MuiDataGrid.defaultProps.localeText}
          getRowSpacing={(params) => ({
            top: params.isFirstVisible ? 0 : 4,
            bottom: params.isLastVisible ? 0 : 4,
          })}
          sx={{
            [`& .${gridClasses.row}`]: {
              bgcolor: (theme) => theme.palette.mode === 'light' ? grey[(100)] : grey[500],
            },
          }}
        />
        {isLoading && (
          <Loader></Loader>
        )}
      </div>
      {/* Accept Confirmation Modal */}
      <Modal centered show={showAcceptModal} onHide={() => setShowAcceptModal(false)}>
        <Modal.Header style={{ backgroundColor: "#c8e6c9"}} closeButton>
          <Modal.Title style={{ fontSize: '20px', fontFamily: 'lato', fontWeight: 700 }}>Confirmation</Modal.Title>
        </Modal.Header>
        <Modal.Body style={{ fontFamily: 'poppins' }}>
          <p>Voulez-vous vraiment accepter cette demande de compte ?</p>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowAcceptModal(false)}>
            Annuler
          </Button>
          <Button style={{ backgroundColor: "#4caf50" }} onClick={handleAcceptConfirmation}>
            Aceepter
          </Button>
        </Modal.Footer>
      </Modal>

      {/* Refuse Confirmation Modal */}
      <Modal centered show={showRefuseModal} onHide={() => setShowRefuseModal(false)}>
        <Modal.Header style={{ backgroundColor: "#ffcdd2" }} closeButton>
          <Modal.Title style={{ fontSize: '20px', fontFamily: 'lato', fontWeight: 700 }}>Confirmation</Modal.Title>
        </Modal.Header>
        <Modal.Body style={{ fontFamily: 'poppins' }}>
          <p>Voulez-vous vraiment refuser cette demande de compte ?</p>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowRefuseModal(false)}>
            Annuler
          </Button>
          <Button style={{ backgroundColor: "#d32f2f" }} onClick={handleRefuseConfirmation}>
            Refuser
          </Button>
        </Modal.Footer>
      </Modal>
    </main>
  );
};


export default AdminPage;