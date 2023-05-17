import React, { useState } from 'react';
import { DataGrid, GridColDef } from '@mui/x-data-grid';
import { frFRLocalization } from "../constantes/constantes";
import  Home  from '../views/Home'

import "./../../Unite.css"
 

interface Row {
  id: number;
  cop_id: number;
  cop_name: string;
  cop_lib: string;
  cop_prg: string;
}

const columns: GridColDef[] = [
  { field: 'cop_id', headerName: 'ID', width: 150, renderCell: (params) => <ProgressBar value={params.value} /> },
  { field: 'cop_name', headerName: 'Name', width: 150 },
  { field: 'cop_lib', headerName: 'Library', width: 150 },
  { field: 'cop_prg', headerName: 'Program', width: 150 },
];

const rows: Row[] = [
  { id: 1, cop_id: 80, cop_name: 'John Doe', cop_lib: 'Library 1', cop_prg: 'Program 1' },
  { id: 2, cop_id: 50, cop_name: 'Jane Smith', cop_lib: 'Library 2', cop_prg: 'Program 2' },
  // Add more rows as needed
];

interface ProgressBarProps {
  value: number;
}

const ProgressBar: React.FC<ProgressBarProps> = ({ value }) => {
  return (
   
    <div className="progress">
      <div
        className="progress-bar"
        role="progressbar"
        style={{ width: `${value}%` }}
        aria-valuenow={value}
        aria-valuemin={0}
        aria-valuemax={100}
      >
        {`${value}%`}
      </div>
    </div>
  );
};

const CentrePage = ()=>{ 
  return (
    <div>
       <Home/>
    <div className="table-container card me-5 p-3 shadow">
      <DataGrid
        className="table table-striped"
        rows={rows}
        columns={columns}
        localeText={frFRLocalization}
      />
    </div>
    </div>
  );
}
export default CentrePage;