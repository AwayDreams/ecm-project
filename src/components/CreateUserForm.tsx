import { Box, Button, TextField } from "@mui/material";

export const CreateUserForm = (): JSX.Element => {
    return (

        <Box component="form"
            sx={{
                '& .MuiTextField-root': { m: 1, width: '25ch' }, display: 'inline-flex', alignItems: 'flex-end', justifyContent: 'start', width: '100%' ,
            }}
            noValidate
            autoComplete="off">
            <Box>
                <Box>
                    <TextField
                        id="outlined-password-input"
                        label="Usuario"
                        type="text"
                        variant="standard"
                    />
                    <TextField
                        id="outlined-password-input"
                        label="Nome"
                        type="text"
                        variant="standard"
                    />
                </Box>
                <Box>
                    <TextField
                        id="outlined-password-input"
                        label="senha"
                        type="password"
                        variant="standard"
                    />
                    <TextField
                        id="outlined-password-input"
                        label="confirmar senha"
                        type="password"
                        variant="standard"
                    />
                </Box>
            </Box>
            <Box sx={{marginBottom: '8px'}}>
                <Button variant="contained" sx={{ padding: '5px' }}>Salvar</Button>
            </Box>
        </Box>

    );
}