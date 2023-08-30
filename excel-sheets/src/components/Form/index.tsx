import { Box, Button, Input } from '@mui/material';

interface FormProps {
  onSubmit: (e: React.FormEvent<HTMLFormElement>) => void;
  handleFile: (e: React.ChangeEvent<HTMLInputElement>) => void;
  typeError: string | null;
}

export default function Form(props: FormProps) {
  return (
    <form onSubmit={props.onSubmit}>
      <Box
        display='flex'
        justifyContent='space-between'
        width={'100%'}
        alignItems='center'
        flexDirection='row'
        gap='1rem'
      >
        <Input
          disableUnderline
          type='file'
          required
          onChange={props.handleFile}
          color='primary'
          placeholder='Selecione um arquivo.'
          sx={{
            border: '1px solid #242424',
            width: '100%',
            padding: '.2rem',
            borderRadius: '5px',
          }}
        />
        <Button type='submit' variant='contained' size='large' color='primary'>
          UPLOAD
        </Button>
      </Box>
      {props.typeError && <div role='alert'>{props.typeError}</div>}
    </form>
  );
}
