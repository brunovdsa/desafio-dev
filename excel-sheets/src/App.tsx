import { useState } from 'react';
import * as XLSX from 'xlsx';
import DataTable from './components/DataTable';
import { Container, Typography, Grid } from '@mui/material';
import Form from './components/Form';

function App() {
  const [excelFile, setExcelFile] = useState<string | null>(null);
  const [typeError, setTypeError] = useState<string | null>(null);
  const [excelData, setExcelData] = useState<Array<string> | null>(null);

  const handleFile = (e: React.ChangeEvent<HTMLInputElement>) => {
    let fileTypes: string[] = [
      'application/vnd.ms-excel',
      'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
      'text/csv',
    ];
    let selectedFile: File | null = e.target.files?.[0] || null;
    if (selectedFile) {
      if (selectedFile && fileTypes.includes(selectedFile.type)) {
        setTypeError(null);
        let reader: FileReader = new FileReader();
        reader.readAsArrayBuffer(selectedFile);
        reader.onload = (e: any) => {
          setExcelFile(e.target.result);
        };
      } else {
        setTypeError('Please select only excel file types');
        setExcelFile(null);
      }
    } else {
      console.log('Please select your file');
    }
  };

  const handleFileSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (excelFile !== null) {
      const workbook: XLSX.WorkBook = XLSX.read(excelFile, { type: 'buffer' });
      const salesWorksheetName: string = workbook.SheetNames[0];
      const salesWorksheet: XLSX.WorkSheet =
        workbook.Sheets[salesWorksheetName];
      const data: Array<string> = XLSX.utils.sheet_to_json(salesWorksheet, {
        dateNF: 'yyyy-mm-dd',
      });
      setExcelData(data);
    }
  };

  return (
    <Container>
      <Grid
        justifyContent='center'
        alignItems='center'
        height={'50%'}
        width={'100%'}
        padding={'2rem 0 0 0'}
        margin={'1rem 0 2rem 0 '}
      >
        <Grid item height={'50%'}>
          <Typography variant='h3' padding={'1rem 0'}>
            Upload & View Excel Sheets
          </Typography>
        </Grid>
        <Grid item>
          <Form
            onSubmit={handleFileSubmit}
            handleFile={handleFile}
            typeError={typeError}
          />
        </Grid>
      </Grid>
      <Grid
        justifyContent='center'
        alignItems='center'
        height={'100%'}
        width={'100%'}
      >
        <Grid item>
          <div className='viewer'>
            {excelData ? (
              <DataTable salesData={excelData} />
            ) : (
              <div>No File is uploaded yet!</div>
            )}
          </div>
        </Grid>
      </Grid>
    </Container>
  );
}

export default App;
