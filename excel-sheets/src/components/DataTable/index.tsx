import { Container } from '@mui/material';
import {
  DataGrid,
  GridColDef,
  GridRowsProp,
  GridToolbar,
} from '@mui/x-data-grid';
import { useState } from 'react';
import * as XLSX from 'xlsx';

interface DataTableProps {
  salesData: XLSX.WorkSheet;
}

export default function DataTable(props: DataTableProps) {
  const [salesData] = useState<any>(props.salesData);

  var numberOfSales = salesData.map((row: any) => row.QUANTIDADE_VENDIDA);

  var sum = 0;

  for (var i = 0; i < numberOfSales.length; i++) {
    sum += numberOfSales[i];
  }
  console.log(sum);

  const columns: GridColDef[] = [
    {
      field: 'cliente',
      headerName: 'Cliente',
      width: 180,
      editable: true,
    },
    {
      field: 'idade',
      headerName: 'Idade',
      width: 180,
      editable: true,
    },
    {
      field: 'estado',
      headerName: 'Estado',
      width: 180,
      editable: true,
    },
    {
      field: 'produto',
      headerName: 'Produto',
      width: 180,
      editable: true,
    },

    {
      field: 'categoria',
      headerName: 'Categoria',
      width: 180,
      editable: true,
    },
    {
      field: 'quantidade_vendida',
      headerName: 'Quantidade Vendida',
      width: 180,
      editable: true,
    },
    {
      field: 'data',
      headerName: 'Data',
      width: 180,
      editable: true,
    },
  ];

  const rows: GridRowsProp = salesData.map((row: any) => ({
    id: row.__rowNum__,
    cliente: row.CLIENTE,
    idade: row.IDADE,
    estado: row.ESTADO,
    produto: row.PRODUTO,
    categoria:
      row.PRODUTO === 'A'
        ? 'MÁQUINA DE CORTAR GRAMA'
        : '' || row.PRODUTO === 'B'
        ? 'MANGUEIRAS'
        : '' || row.PRODUTO === 'C'
        ? 'UTILIDADES DOMÉSTICAS'
        : '' || row.PRODUTO === 'D'
        ? 'LIMPEZA'
        : '' || row.PRODUTO === 'E'
        ? 'JARDINAGEM'
        : '',
    quantidade_vendida: row.QUANTIDADE_VENDIDA,
    data: row.DATA,
  }));

  return (
    <Container
      sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}
    >
      <div style={{ height: 300, width: '100%' }}>
        <DataGrid
          columns={columns}
          rows={rows}
          slots={{ toolbar: GridToolbar }}
        />
      </div>
    </Container>
  );
}
