import { LoadingButton } from "@mui/lab";
import { Box, TextField } from "@mui/material";
import { useEffect, useState } from "react";
import api from "../api.json";
import Notification from "./Notification";

type Props= {
  id: Number;
  name: String;
  tipo: any;
  handlerTipo: (event: React.ChangeEvent<HTMLInputElement>) => void;
  handlerName: (event: React.ChangeEvent<HTMLInputElement>) => void;
  saveProcessCallback: Function;
}

export const HeaderBpmEditor = (props: Props): JSX.Element => {
    const [dataType, setDataType] = useState<any>();
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<Error | null>(null);
  
    useEffect(() => {
      getAllDataTypes();
    }, [])

    const getAllDataTypes = async () => {
      try {
          const options = {
              method: 'GET'
          };
          const response = await fetch(api.DataType.getAll, options);
          const data = await response.json();
          setDataType(data);
          setLoading(false);
      } catch (error: any) {
          setError(error);
          Notification.error("Falha ao carregar os dados, tente novamente mais tarde.");
      }
    }

    return (
        <Box sx={{minWidth: '500px', marginLeft: '30px'}} display="flex">
            <TextField
              id="outlined-select-currency-native"
              label="Nome do Processo"
              variant="standard"
              sx={{ width: '100%', padding: '5px' }}
              SelectProps={{
                native: true,
              }}
              value={props.name}
              onChange={props.handlerName}
            >
              <option></option>
            </TextField>
            <TextField
              id="outlined-select-currency-native"
              select
              label="Tipo de Dado"
              variant="standard"
              sx={{ width: '100%', padding: '5px' }}
              SelectProps={{
                native: true,
              }}
              value={props.tipo}
              onChange={props.handlerTipo}
            >
              <option></option>
              {dataType ? dataType.map((option) => (
                    <option key={option.id} value={option.id}>
                    {option.name}
                    </option>
                )): <option>Carregando...</option>}
            </TextField>
            <div>
                <LoadingButton variant="contained" sx={{ padding: '5px' }} onClick={()=>{props.saveProcessCallback()}} loading={false} >Salvar</LoadingButton>
            </div>
        </Box>
    );
}