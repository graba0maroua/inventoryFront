import React from 'react';
import { DataGrid, GridColDef } from '@mui/x-data-grid';
import { frFRLocalization } from "../constantes/constantes";

import "./../../Unite.css"

interface Row {
    id: number;
    cop_id: number;
    cop_name: string;
    cop_lib: string;
    cop_prg: string;
  }
  
  const columns: GridColDef[] = [
    { field: 'cop_id', headerName: 'ID', width: 90 },
    { field: 'cop_name', headerName: 'Name', width: 150 },
    { field: 'cop_lib', headerName: 'Library', width: 150 },
    { field: 'cop_prg', headerName: 'Program', width: 150 },
  ];
  
  const rows: Row[] = [
    { id: 1, cop_id: 1, cop_name: 'John Doe', cop_lib: 'Library 1', cop_prg: 'Program 1' },
    { id: 2, cop_id: 2, cop_name: 'Jane Smith', cop_lib: 'Library 2', cop_prg: 'Program 2' },
    // Add more rows as needed
  ];
  
  export default function Unite() {
    return (
        <div className="table-container">
        <DataGrid
          className="table table-striped"
          rows={rows}
          columns={columns}
          localeText={frFRLocalization}
        />
      </div>
    );
  }