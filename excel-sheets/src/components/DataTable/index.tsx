import { Box, Container, Typography } from '@mui/material';
import {
  DataGrid,
  GridColDef,
  GridRowsProp,
  GridToolbarContainer,
  GridToolbarExport,
} from '@mui/x-data-grid';
import { useState } from 'react';
import * as XLSX from 'xlsx';

interface DataTableProps {
  salesData: XLSX.WorkSheet;
}

function CustomToolbar() {
  return (
    <GridToolbarContainer>
      <GridToolbarExport includeColumnGroupsHeaders />
    </GridToolbarContainer>
  );
}
export default function DataTable(props: DataTableProps) {
  const [salesData] = useState<any>(props.salesData);

  const columns: GridColDef[] = [
    {
      field: 'cliente',
      headerName: 'Cliente',
      width: 80,
      editable: true,
    },
    {
      field: 'idade',
      headerName: 'Idade',
      width: 80,
      editable: true,
    },
    {
      field: 'estado',
      headerName: 'Estado',
      width: 150,
      editable: true,
    },
    {
      field: 'produto',
      headerName: 'Produto',
      width: 80,
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

  function CustomFooter() {
    var numberOfSales = salesData.map(
      (row: any) => (numberOfSales = row.QUANTIDADE_VENDIDA)
    );
    var sum = 0;

    for (var i = 0; i < numberOfSales.length; i++) {
      sum += numberOfSales[i];
    }
    return (
      <Box sx={{ p: 1, display: 'flex' }}>
        <Typography variant='body1'>{`Total de vendas: ${sum}`}</Typography>
      </Box>
    );
  }
  return (
    <Container
      sx={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
      }}
    >
      <div
        style={{
          height: 600,
          width: '100%',
          borderRadius: '10px',
          boxShadow: '0px 5px 10px rgba(0, 0, 0, 0.1)',
        }}
      >
        <DataGrid
          columns={columns}
          rows={rows}
          slots={{
            toolbar: CustomToolbar,
            footer: CustomFooter,
          }}
        />
      </div>
    </Container>
  );
}
