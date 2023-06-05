import React, { useState } from 'react';
import { useFetchDemandeCompteQuery, useAcceptDemandeCompteMutation, useRefuseDemandeCompteMutation } from '../../../features/Admin/Admin';
import { useSelector, useDispatch } from 'react-redux';
import { DemandeCompte } from '../../../app/models/DemandeCompte';
import { Spinner } from 'react-bootstrap';
import './../../../unite.css';
import { DataGrid, GridColDef, GridToolbarColumnsButton, GridToolbarContainer, GridToolbarFilterButton, GridToolbarExport, GridToolbarDensitySelector, gridClasses } from '@mui/x-data-grid';
import { frFRLocalization } from "../../constantes/constantes";
import { blueGrey, grey } from '@mui/material/colors';
import Loader from '../../../Messages/Loader';
import inv from "../../../assets/Asset 1.svg";
import profil from "../../../assets/user.png";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCheck, faSignOutAlt, faTimes, faHourglass } from '@fortawesome/free-solid-svg-icons';
import { useLogoutMutation } from '../../../features/auth/login';
import { signOut } from '../../../features/auth/auth-slice';
import { useAppDispatch } from '../../hooks';

const AdminPage = () => {
  const { data, isLoading,refetch } = useFetchDemandeCompteQuery();
  const [showLogout, setShowLogout] = useState(false);
  const [logout] = useLogoutMutation();
  const dispatch = useAppDispatch();

  const [acceptDemande] = useAcceptDemandeCompteMutation();
  const [refuseDemande] = useRefuseDemandeCompteMutation();
  const columns: GridColDef[] = [
    { field: 'id', headerName: 'ID', width: 70 },
    { field: 'name', headerName: 'Name', width: 250, },
    { field: 'matricule', headerName: 'Matricule', width: 150,align: 'center',headerAlign: 'center' },
    // { field: 'email', headerName: 'Email', width: 200 },
    {
      field: 'role',
      headerName: 'Role',
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
        }
    
        return <div>{formattedRole}</div>;
      },
    },
    { field: 'structure_id', headerName: 'Structure ID', width: 120 },
    { field: 'status', headerName: 'Status', width: 140 ,renderCell: (params) => {
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
          statusBackgroundColor = '#E7948E';
          statusTextColor = '#c01104';
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
      width: 210,
      sortable: false,
      headerAlign: 'center',
      renderCell: (params) => {
        const demande = params.row as DemandeCompte;
        return (
          <>
            {demande.status === 'pending' && (
              <div className="actions-container">
                <button className="accept-button " onClick={async (e)=>{
                  const result  = await acceptDemande({id:demande.id}).unwrap();
                  refetch()
                }}>
                  <FontAwesomeIcon icon={faCheck} className="icon" />
                  Accepter
                </button>
                <button className="refuse-button" onClick={async (e)=>{
                  const result  = await refuseDemande({id:demande.id}).unwrap();
                  refetch()

                }}>
                  <FontAwesomeIcon icon={faTimes} className="icon" />
                  Refuser
                </button>
              </div>
            )}
          </>
        );
      },
    }
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
      <nav className="navbar navbar-light bg-white shadow">
        <div className="container-fluid">
          <a className="navbar " href="#">
            <img src={inv} alt="logo" width="100%" height="30" className="d-inline-block align-text-top" />
          </a>
        <form  className='search' action="#">
				<div className="form-input">
					<input type="search" placeholder="Rechercher..."/>
					<button type="submit" className="search-btn"><i className='bx bx-search' ></i></button>
				</div>
			</form>
          <div className="d-flex align-items-center">
            <img src={profil} alt="profile" width="40" height="40" className="d-inline-block align-text-top me-2" onClick={() => setShowLogout(!showLogout)} />
            {showLogout && (
              <button className="btn btn-light logout-button" onClick={async () => {
                await logout("");
                dispatch(signOut());
              }}>
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
          }}
        />
        {isLoading && (
          <Loader></Loader>
        )}
      </div>
    </main>
  );
};

export default AdminPage;