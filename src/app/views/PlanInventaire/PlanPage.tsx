import React, { useState } from 'react';
import Home from '../../views/Home';
import { Button, Form, Modal } from 'react-bootstrap';
import './../../../unite.css';
import { DataGrid, GridColDef, gridClasses } from '@mui/x-data-grid';
import { frFRLocalization } from "../../constantes/constantes";
import { useDeletePlanMutation, useFetchPlansQuery } from '../../../features/PlanInventaire/Plan';
import AddPlanModal from "../../views/PlanInventaire/AddPlan";
import EditPlanModal from "../../views/PlanInventaire/EditPlan";
import { Plan } from "../../../app/models/Plan";
import { useAppDispatch, useAppSelector } from '../../hooks';
import { show, showEdit } from '../../../features/PlanInventaire/Plan-ui';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faAdd, faEdit, faInfoCircle, faTrash } from '@fortawesome/free-solid-svg-icons';
import { blueGrey, grey } from '@mui/material/colors';
import Loader from '../../../Messages/Loader';
import SideBar from '../../components/SideBarComponent';
import WelcomeComponent from '../../components/WelComeComponent';
import { MainUiState } from '../../../features/uistate/mainui';



interface Row {
  id: string;
  grpid:number,
  LOC_ID: string;
  COP_ID: string;
}

const PlanPage = () => {
  const [keyword,setKeyword] = useState('');
  const { data, isLoading, isError, refetch } = useFetchPlansQuery({keyword:keyword});
  const dispatch = useAppDispatch();
  const [selectedPlan, setSelectedPlan] = useState<Plan|null>(null);
  const   [deletePlan] = useDeletePlanMutation();

  const margin_left = useAppSelector((state: { mainUiSlice: MainUiState }) => state.mainUiSlice.marginLeft);
  // const margin_right = useAppSelector((state: { mainUiSlice: MainUiState }) => state.mainUiSlice.marginRight);
  const columns: GridColDef[] = [
    { field: 'id', headerName: 'ID', width: 50, headerAlign: 'center', align: 'center'},
    { field: 'grpid', headerName: 'ID Equipe', width: 210, headerAlign: 'center', align: 'center',sortable: false},
    { field: 'LOC_ID', headerName: 'ID Localisation', width: 210 , headerAlign: 'center',align: 'center',sortable: false},
    { field: 'COP_ID', headerName: 'ID Centre opérationel ID', width: 320 , headerAlign: 'center',align: 'center',sortable: false},
    {
      field: 'actions',
      headerName: 'Actions',
      width: 215,
      headerClassName: 'Action-buttons',
      headerAlign: 'center',
      align: 'center',
      sortable: false,
      renderCell: (params) => (
        <>
     
        <Button className="action-button delete-button" size="sm" onClick={(e) => handleDeletePlan({
          GROUPE_ID:params.row.grpid,
          LOC_ID:params.row.LOC_ID,
          COP_ID:params.row.COP_ID
        })}>
          <FontAwesomeIcon icon={faTrash} className="me-2" />
          Supprimer
        </Button>
      </>
      ),
    },
  ];
  const  handleDeletePlan =async (plan:Plan) => {
    const result  = await deletePlan(plan).unwrap();
    refetch();
  };
  function CustomRefetch() {
    refetch();
  }

  if (isLoading) {
    return <Loader></Loader>
  }

  if (isError) {
    return <div>Une erreur s'est produite lors de la récupération des données </div>;
  }

  const rows: Row[] = data
    ? data.map((item, index) => ({
        id: (index + 1).toString(),
        grpid: item.GROUPE_ID,
        LOC_ID: item.LOC_ID,
        COP_ID: item.COP_ID,
      }))
    : [];

  return (
    <main>
      <SideBar active="Localités" />
      <WelcomeComponent 
   page="Plan d'inventaire"
   title="Plan d'inventaire"
   subItem={'Table de données'} 
   downloadLink='#'
   isDownloadable={false}
   onClickCustom={null} />
      <div className={`table-container ${margin_left}  card me-2 p-2 shadow`}>
        <div className="d-flex flex-row my-3 align-items-center">
          <div className="col-9 me-4">
            <Form.Control type="text" placeholder="Equipe, localisation , centre ..." onChange={(e)=>{
                setKeyword(e.target.value)
            }} />
          </div>
          <div className='align-self-center'>
            <Button className='bg-secondaire' onClick={() => dispatch(show())}>
              <FontAwesomeIcon icon={faAdd} /> Ajouter  plan d'inventaire
            </Button>
          </div>
        </div>
        <div style={{ height: '100%' }}>
          <DataGrid
            rows={rows}
            columns={columns}
            initialState={{
              pagination: {
                paginationModel: { page: 0, pageSize: 4 },
              },
            }}
          pageSizeOptions={[4, 10, 25,50,100]}
          localeText={frFRLocalization}
          getRowSpacing={(params) => ({
            top: params.isFirstVisible ? 0 : 4,
            bottom: params.isLastVisible ? 0 : 4,
          })}
            sx={{
              [`& .${gridClasses.row}`]: {
                bgcolor: (theme) => theme.palette.mode === 'light' ? blueGrey[(50)] : grey[50],
              },
              
            }}
          />
        </div>
      </div>
      <AddPlanModal refetch={CustomRefetch} />
    </main>
  );
};

export default PlanPage;