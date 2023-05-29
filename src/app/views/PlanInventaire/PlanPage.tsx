import React, { useState } from 'react';
import Home from '../../views/Home';
import { Button, Form, Modal } from 'react-bootstrap';
import './../../../unite.css';
import { DataGrid, GridColDef, gridClasses } from '@mui/x-data-grid';
import { frFRLocalization } from "../../constantes/constantes";
import { useFetchPlansQuery } from '../../../features/PlanInventaire/Plan';
import AddPlanModal from "../../views/PlanInventaire/AddPlan";
import EditPlanModal from "../../views/PlanInventaire/EditPlan";
import { Plan } from "../../../app/models/Plan";
import { useAppDispatch } from '../../hooks';
import { show, showEdit } from '../../../features/PlanInventaire/Plan-ui';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faAdd, faEdit, faInfoCircle, faTrash } from '@fortawesome/free-solid-svg-icons';
import { blueGrey, grey } from '@mui/material/colors';
import Loader from '../../../Messages/Loader';



interface Row {
  id: number;
  LOC_ID: string;
  COP_ID: string;
}

const PlanPage = () => {
  const { data, isLoading, isError, refetch } = useFetchPlansQuery();
  const dispatch = useAppDispatch();
  const [selectedPlan, setSelectedPlan] = useState(null);

  const columns: GridColDef[] = [
    { field: 'id', headerName: 'ID Equipe', width: 200, headerAlign: 'center', align: 'center'},
    { field: 'LOC_ID', headerName: 'ID Localisation', width: 200 , headerAlign: 'center',align: 'center'},
    { field: 'COP_ID', headerName: 'ID Centre opérationel ID', width: 240 , headerAlign: 'center',align: 'center'},
    {
      field: 'actions',
      headerName: 'Actions',
      width: 350,
      headerClassName: 'Action-buttons',
      headerAlign: 'center',
      renderCell: (params) => (
        <>
        <Button className="action-button edit-button" size="sm" onClick={() => handleEditPlan(params.row)}>
          <FontAwesomeIcon icon={faEdit} className="me-2" />
          Modifier
        </Button>
        <Button className="action-button details-button" size="sm" onClick={() => handlePlanDetails(params.row)}>
          <FontAwesomeIcon icon={faInfoCircle} className="me-2" />
          Détails
        </Button>
        <Button className="action-button delete-button" size="sm" onClick={() => handleDeletePlan(params.row)}>
          <FontAwesomeIcon icon={faTrash} className="me-2" />
          Supprimer
        </Button>
      </>
      ),
    },
  ];

  const handleEditPlan = (plan) => {
    setSelectedPlan(plan);
    dispatch(showEdit());
  };
  const handleDeletePlan = (plan) => {
    setSelectedPlan(plan);
    dispatch(showEdit());
  };
  const handlePlanDetails = (plan) => {
    setSelectedPlan(plan);
    dispatch(showEdit());
  };

  function CustomRefetch() {
    refetch();
  }

  if (isLoading) {
    return <Loader></Loader>
  }

  if (isError) {
    return <div>Error occurred while fetching data.</div>;
  }

  const rows: Row[] = data
    ? data.map((item) => ({
        id: item.GROUPE_ID,
        LOC_ID: item.LOC_ID,
        COP_ID: item.COP_ID,
      }))
    : [];

  return (
    <main>
      <Home />
      <div className="table-container margin_left card me-2 p-2 shadow">
        <div className="d-flex flex-row my-3">
          <div className="col-9 me-4">
            <Form.Control type="text" placeholder="Equipe, localisation ..." />
          </div>
          <div>
            <Button className='bg-secondaire' onClick={() => dispatch(show())}>
              <FontAwesomeIcon icon={faAdd} /> Ajouter un plan de scan
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
      {selectedPlan && (
       <EditPlanModal plan={selectedPlan} refetch={CustomRefetch} />
      )}
    </main>
  );
};

export default PlanPage;