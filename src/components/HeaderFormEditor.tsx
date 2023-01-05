import { LoadingButton } from "@mui/lab";
import { Box, TextField } from "@mui/material";

export const HeaderFormEditor = (): JSX.Element => {
    return (
        <Box sx={{minWidth: '500px', marginLeft: '30px'}} display="flex">
            <TextField
              id="outlined-select-currency-native"
              label="Nome da pagina"
              variant="standard"
              sx={{ width: '100%', padding: '5px' }}
              SelectProps={{
                native: true,
              }}
              value={""}
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
              value={"teste"}
            >
              <option></option>
            </TextField>
            <div>
                <LoadingButton variant="contained" sx={{ padding: '5px' }} onClick={()=>{}} loading={false} >Salvar</LoadingButton>
            </div>
        </Box>
    );
}