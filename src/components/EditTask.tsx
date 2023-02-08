import React, { useCallback, useEffect, useMemo, useState } from 'react';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import { Box, TextField } from '@mui/material';
import { LoadingButton } from '@mui/lab';
import api from "../api.json";
import Notification from "./Notification";
import { Pages } from '@mui/icons-material';


type TaskEditorInformation = {
  name: String
  page: String
  callbackFunction: React.MutableRefObject<(name: string, page: string) => void>
}

interface Props {
  dataTypeId: Number | null;
  open: boolean;
  setOpen: Function;
  taskEditorInformation: TaskEditorInformation;
}


const EditTask = (props : Props) => {
  const [pages, setPages] = useState<any>(null);
  const [page, setPage] = useState<any>(props.taskEditorInformation.page);
  const [name, setName] = useState<any>(props.taskEditorInformation.name);

  useEffect(() => {
    getAllPages()
  },[])

  useEffect(() => {},[pages])

  const handleClose = () => {
    console.log('close clicked', props.taskEditorInformation.callbackFunction)
    props.taskEditorInformation.callbackFunction.current(name, page)
    console.log('close clicked 2')
    props.setOpen(false);
  };

  const handlerPage = (event: React.ChangeEvent<HTMLInputElement>) => {
    setPage(event.target.value);
  }

  const handlerName = (event: React.ChangeEvent<HTMLInputElement>) => {
    setName(event.target.value);
  }

  const getAllPages = useCallback(async () => {
    try {
        const options = {
            method: 'GET'
        };
        const response = await fetch(api.Page.getbyDataType + props.dataTypeId, options);
        const data = await response.json();
        setPages(data);
        return data
    } catch (error: any) {
        return null
    }
}, [])

  return (
    <div>
      <Dialog
        open={props.open}
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
              value={name}
              onChange={handlerName}
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
            >
              <option>Ainda não implementado 😢</option>
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
              value={page}
              onChange={handlerPage}
            >
              <option></option>
              {pages ? pages.map((option) => (
                    <option key={option.id} value={option.id}>
                    {option.name}
                    </option>
                )): <option>Carregando...</option>}
            </TextField>
          </Box>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="primary">
            Cancelar
          </Button>
          <Button onClick={() => { handleClose(); }} color="secondary">
            Salvar
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default EditTask;