import React from 'react';
import Home from '../../views/Home';
import { Button, Form, Modal } from 'react-bootstrap';
import './../../../unite.css';
import { DataGrid, GridColDef } from '@mui/x-data-grid';
import { frFRLocalization } from "../../constantes/constantes";
import { useFetchPlansQuery } from '../../../features/PlanInventaire/Plan';
import AddPlanModal from "../../views/PlanInventaire/AddPlan";
import { useAppDispatch } from '../../hooks';
import { show } from '../../../features/PlanInventaire/Plan-ui';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faAdd } from '@fortawesome/free-solid-svg-icons';


interface Row {
  id: number;
  LOC_ID: string;
  COP_ID: string;
}

const columns: GridColDef[] = [
  { field: 'id', headerName: 'ID Equipe', width: 100 },
  { field: 'LOC_ID', headerName: 'ID Localisation', width: 150 },
  { field: 'COP_ID', headerName: 'ID Centre opérationel ID', width: 150 },
  {
    field: 'actions',
    headerName: 'Actions',
    width: 700,
    headerClassName: 'Action-buttons',
    renderCell: (params) => (
      <>
        <button className="button-52" style={{ marginRight: '15px' }}>
          Delete
        </button>
        <button className="button-56">View Details</button>
      </>
    ),
  },
];

const PlanPage = () => {
  const { data, isLoading, isError, refetch } = useFetchPlansQuery();


  const dispatch = useAppDispatch();

  function CustomRefetch(){
    refetch();

  }  

  if (isLoading) {
    return <div>Loading...</div>;
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
      <div className='d-flex flex-row my-3'>
        

        <div className='col-9 me-4 '>
          <Form.Control type="text" placeholder="Equipe , localisation ..." />

        </div>
        <div>
        
          <button className='btn bg-secondaire ' onClick={() =>{dispatch(show()); }}> <FontAwesomeIcon icon={faAdd} /> Ajouter un accès</button>

        </div>
        
        </div>
        <div style={{ height: '100%' }}>
          <DataGrid
            rows={rows}
            columns={columns}
            pageSizeOptions={[5, 10, 25, 50, 100]}
            localeText={frFRLocalization}
          />

        </div>
      </div>
    <AddPlanModal refetch={CustomRefetch} />
    </main>
  );
};

export default PlanPage;