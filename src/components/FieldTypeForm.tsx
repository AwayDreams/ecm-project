import { LoadingButton } from "@mui/lab";
import { Box, Button, TextField } from "@mui/material";
import { useEffect, useState } from "react";
import api from "../api.json";

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


export const FieldTypeForm = (props: FieldType): JSX.Element => {
    const [name, setName] = useState<String>();
    const [tipo, setTipo] = useState<String>();
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<Error | null>(null);
    const [data, setData] = useState<any>(null);

    useEffect(()=> {
      setName(props.name);
      setName(props.tipo);
    }, [])

    const handlerName = (event: React.ChangeEvent<HTMLInputElement>) => {
      setName(event.target.value);
    }

    const handlerTipo = (event: React.ChangeEvent<HTMLInputElement>) => {
      setTipo(event.target.value);
    }

    const saveFieldItem = async () => {
      console.log("clickado")
      setLoading(true);
      try {
        const fieldType = {
          id: props.id,
          dataTypeId:  props.dataTypeId,
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
        const response = await fetch(api.FieldType.save, options);
        const data = await response.json();
        setData(data);
        setLoading(false);
      } catch (error: any) {
        setError(error);
        setLoading(false);
      }
    }

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
