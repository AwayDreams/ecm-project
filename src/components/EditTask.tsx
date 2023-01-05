import React, { useEffect } from 'react';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import { Box, TextField } from '@mui/material';
import { LoadingButton } from '@mui/lab';

interface Props {
  onConfirm: Function;
  open: boolean;
  setOpen: Function
}

const EditTask = ({ onConfirm, open, setOpen }) => {

  useEffect(() => {
    console.log('renderizou', open);
  })

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <div>
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">Editar atividade</DialogTitle>
        <DialogContent>
          <Box sx={{ width: '500px' }}>
            <TextField
              id="outlined-password-input"
              label="Nome"
              type="text"
              variant="standard"
              sx={{ width: '100%', minWidth: "50px", padding: '5px' }}
              value={"teste"}
              onChange={() => { }}
            />
          </Box>
          <Box sx={{ display: 'inline-flex', alignItems: 'center', justifyContent: 'space-around', width: '100%', marginTop: '10px' }}>
            <TextField
              id="outlined-select-currency-native"
              select
              label="Grupo"
              variant="standard"
              sx={{ width: '100%', padding: '5px' }}
              SelectProps={{
                native: true,
              }}
              value={"teste"}
            >
              <option></option>
            </TextField>
            <TextField
              id="outlined-select-currency-native"
              select
              label="Pagina"
              variant="standard"
              sx={{ width: '100%', padding: '5px' }}
              SelectProps={{
                native: true,
              }}
              value={"teste"}
            >
              <option></option>
            </TextField>
          </Box>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="primary">
            Cancelar
          </Button>
          <Button onClick={() => { handleClose(); onConfirm() }} color="secondary">
            Salvar
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default EditTask;