import { useState } from 'react';
import * as XLSX from 'xlsx';
import DataTable from './components/DataTable';
import {
  Container,
  Button,
  FormControl,
  Typography,
  Input,
} from '@mui/material';

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
      const data: Array<string> = XLSX.utils.sheet_to_json(salesWorksheet);
      setExcelData(data);
    }
  };

  return (
    <Container
      sx={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        flexDirection: 'column',
        height: '100%',
        width: '100%',
        scrollBehavior: 'smooth',
      }}
    >
      <Typography variant='h2'>Upload & View Excel Sheets</Typography>
      <form onSubmit={handleFileSubmit}>
        <Input type='file' required onChange={handleFile} />
        <Button type='submit' className='btn btn-success btn-md'>
          UPLOAD
        </Button>
        {typeError && (
          <div className='alert alert-danger' role='alert'>
            {typeError}
          </div>
        )}
      </form>
      <div className='viewer'>
        {excelData ? (
          <DataTable salesData={excelData} />
        ) : (
          <div>No File is uploaded yet!</div>
        )}
      </div>
    </Container>
  );
}

export default App;
