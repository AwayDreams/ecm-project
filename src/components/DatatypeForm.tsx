import { LoadingButton } from "@mui/lab";
import { Box, TextField } from "@mui/material";
import { useCallback, useEffect, useState } from "react";
import { useHistory } from 'react-router-dom';
import api from "../api.json";
import Notification from "./Notification";


type DataType = {
  id: Number | null;
  name: string;
  dataTypeIdCallback: Function;
}

export const DataTypeForm = (props: DataType): JSX.Element => {

  const [dataType, setDataType] = useState<DataType>(props);
  const [error, setError] = useState<Error | null>(null);
  const [loading, setLoading] = useState(false);

  const history = useHistory();

  const handlerDataType = (event: React.ChangeEvent<HTMLInputElement>) => {
    setDataType({ ...dataType, name: event.target.value } as DataType);
    console.log(dataType.name);
  }

  useEffect(() => {
    history.replace(`/dataTypeMenu/${dataType.id}`);
  }, [dataType]);

  const saveDataType = useCallback(async () => {
    console.log("clickado")
    setLoading(true);
    try {
      console.log(dataType);
      const options = {
        method: 'PUT',
        body: JSON.stringify(dataType),
        headers: {
          'Content-Type': 'application/json',
        }
      };
      const response = await fetch(api.DataType.save, options);
      const data = await response.json();
      props.dataTypeIdCallback(data.id);
      setDataType(data);
      setLoading(false);
      Notification.success("Tipo de dado salvo com sucesso!");
    } catch (error: any) {
      setError(error);
      Notification.error("Ocorreu um error ao salvar tipo de dado.");
      setLoading(false);
    }
  }, [dataType]);

  return (
    <>
      <TextField
        id="outlined-password-input"
        label="Nome"
        type="text"
        variant="standard"
        value={dataType.name}
        onChange={handlerDataType}
      />
      <Box sx={{ marginBottom: '8px' }}>
        <LoadingButton variant="contained" sx={{ padding: '5px' }} onClick={saveDataType} loading={loading} >Salvar</LoadingButton>
      </Box>
    </>
  );
}