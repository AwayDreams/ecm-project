import { LoadingButton } from "@mui/lab";
import { Box, Button, TextField } from "@mui/material";
import { useCallback, useEffect, useState } from "react";
import api from "../api.json";
import Notification from "./Notification";

const currencies = [
    {
      value: 'text',
      label: 'Texto',
    },
    {
      value: 'Number',
      label: 'Numerico',
    }
  ];

type FieldType = {
    id: Number | null,
    dataTypeId: Number | null,
    name: String,
    tipo: String
}

type Props = {
  FieldType: FieldType,
  setNameCallback: React.Dispatch<React.SetStateAction<String>>
}


export const FieldTypeForm = (props: Props): JSX.Element => {
    const {FieldType, setNameCallback} = props;
    const [name, setName] = useState<String>(FieldType.name);
    const [tipo, setTipo] = useState<String>(FieldType.tipo);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<Error | null>(null);
    const [data, setData] = useState<any>(null);

    const handlerName = (event: React.ChangeEvent<HTMLInputElement>) => {
      setName(event.target.value);
    }

    const handlerTipo = (event: React.ChangeEvent<HTMLInputElement>) => {
      setTipo(event.target.value);
      console.log(event.target.value);
      console.log(tipo);
    }

    const saveFieldItem = useCallback(async () => {
      console.log("clickado")
      setLoading(true);
      try {
        const fieldType = {
          id: FieldType.id,
          dataTypeId:  FieldType.dataTypeId,
          name: name,
          tipo: tipo
        } as FieldType;
        const options = {
          method: 'PUT',
          body: JSON.stringify(fieldType),
          headers: {
            'Content-Type': 'application/json',
          }
        };
        console.log(fieldType);
        const response = await fetch(api.FieldType.save, options);
        const data = await response.json();
        setData(data);
        Notification.success("Campo salvo com sucesso!")
        setNameCallback(data.name);
        setName(data.name);
        setTipo(data.tipo);
        setLoading(false);
      } catch (error: any) {
        setError(error);
        Notification.error("Error ao salvar o campo!")
        setLoading(false);
      }
    },[name, tipo])

    return (
        <Box sx={{display: 'inline-flex', alignItems: 'center', justifyContent: 'space-around', width: '100%'}}>
            <TextField
                    id="outlined-password-input"
                    label="Nome"
                    type="text"
                    variant="standard"
                    sx={{width: '100%', padding: '5px'}}
                    value={name}
                    onChange={handlerName}
                  />

              <TextField
                id="outlined-select-currency-native"
                select
                label="Tipo"
                variant="standard"
                sx={{width: '100%', padding: '5px'}}
                SelectProps={{
                    native: true,
                }}
                value={tipo}
                onChange={handlerTipo}
                >
                {currencies.map((option) => (
                    <option key={option.value} value={option.value}>
                    {option.label}
                    </option>
                ))}
                </TextField>
                <LoadingButton variant="contained" sx={{padding: '5px'}} onClick={saveFieldItem} loading={loading}>Salvar</LoadingButton>
        </Box>
    );
}

function useCallBack(arg0: () => void, arg1: never[]) {
  throw new Error("Function not implemented.");
}
