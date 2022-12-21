import { Box, Button, TextField } from "@mui/material";

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

export const FieldTypeForm = (): JSX.Element => {
    return (
        <Box sx={{display: 'inline-flex', alignItems: 'center', justifyContent: 'space-around', width: '100%'}}>
            <TextField
                    id="outlined-password-input"
                    label="Nome"
                    type="text"
                    variant="standard"
                    sx={{width: '100%', padding: '5px'}}
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
                >
                {currencies.map((option) => (
                    <option key={option.value} value={option.value}>
                    {option.label}
                    </option>
                ))}
                </TextField>
                <Button variant="contained" sx={{padding: '5px'}}>Salvar</Button>
        </Box>
    );
}