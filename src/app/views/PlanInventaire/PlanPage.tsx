import React from 'react'
import Home from '../../views/Home';
import './../../../unite.css';
import { DataGrid, GridColDef, GridToolbarColumnsButton, GridToolbarContainer,GridToolbarFilterButton,GridToolbarExport,
  GridToolbarDensitySelector,
  gridClasses, } from '@mui/x-data-grid';
import { frFRLocalization } from "../../constantes/constantes";
import { useFetchPlansQuery } from '../../../features/PlanInventaire/Plan';
import { blueGrey, grey } from '@mui/material/colors';

interface Row {
    id: number;
    LOC_ID: string;
    COP_ID: string;
  }
  const columns: GridColDef[] = [
    { field: 'id', headerName: 'Groupe ID', width: 100 },
    { field: 'LOC_ID', headerName: 'Localité ID', width: 150 },
    { field: 'COP_ID', headerName: 'Centre opérationel ID', width: 150 },
    {
        field: 'actions',
        headerName: 'Actions', 
        width: 700,
        renderCell: (params) => (
            <>
            <button
              type="button"
              className="btn btn-outline-secondary"
              onClick={() => handleEdit(params.row.id)}
              style={{ marginRight: '15px' }}
            >
              Edit
            </button>
            <button
              className="btn btn-outline-danger"
              onClick={() => handleDelete(params.row.id)}
              style={{ marginRight: '15px' }}
            >
              Delete
            </button>
            <button
              className="btn btn-outline-success"
              onClick={() => handleViewDetails(params.row.id)}
            >
              View Details
            </button>
          </>
        ),
      },
  ];

  const handleEdit = (id: number) => {
    // Handle edit logic here
    console.log('Edit row:', id);
  };

  const handleDelete = (id: number) => {
    // Handle delete logic here
    console.log('Delete row:', id);
  };

  const handleViewDetails = (id: number) => {
    // Handle view details logic here
    console.log('View details:', id);
  };
const PlanPage = () => {

    const { data, isLoading, isError } = useFetchPlansQuery();

    if (isLoading) {
      return <div>Loading...</div>;
    }
  
    if (isError) {
      return <div>Error occurred while fetching data.</div>;
    }

    const rows: Row[] = data ? data.map((item) => ({
        id: item.GROUPE_ID,
        LOC_ID: item.LOC_ID,
        COP_ID: item.COP_ID,
      })) : [];

    return (
        <main>
          <Home />
          <div className="table-container margin_left card me-2 p-2 shadow">
            <div style={{ height: '100%' }}>
              <DataGrid
                rows={rows}
                columns={columns}
                pageSizeOptions={[5, 10, 25, 50, 100]}
                localeText={frFRLocalization}
                getRowSpacing={(params) => ({
                    top: params.isFirstVisible ? 0 : 5,
                    bottom: params.isLastVisible ? 0 : 5,
                  })}
                  sx={{
                    [`& .${gridClasses.row}`]: {
                      bgcolor:  blueGrey[(50)] 
                    },
                  }} />
              
            </div>
          </div>
        </main>
      );
    };
    
    export default PlanPage;