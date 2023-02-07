import { Orientar, Red, Blue, Column } from "./style";
import "@fontsource/roboto";
import {
  Stack,
  TextField,
  Grid,
  Checkbox,
  FormControlLabel,
  InputAdornment,
} from "@mui/material";
import { AccountCircle, Lock } from "@mui/icons-material";
import { Button } from "@mui/material";
import { Box } from "@mui/system";
import { useHistory } from 'react-router-dom';

import capa from "../../assets/capa.jpg"
import logo from "../../assets/logo.webp"


type Props = {
  nome: String;
  array: String[];
};

export const Login = (props: Props): JSX.Element => {
  const history = useHistory();


  return (
    <>
      <Box sx={{height: '100vh', margin: 0, padding: 0, overflow: 'hidden'}}>
        <Grid container >
          <Grid container item xs>
            <Red>
              <img src={capa} alt="imagem" style={{width: '100%', height: '100%', objectFit: 'cover'}}/>
            </Red>
          </Grid>
          <Grid container item sx={{ margin: 0, width: '664px', Minwidth: '50%'}}>
            <Blue>
              <Box
                component="form"
                sx={{
                  width: '65%',
                  height: 300,
                  margin: "auto",
                  paddingTop: '5%',
                  backgroundColor: "primary.dark",
                }}
                noValidate
                autoComplete="off"
              >
                <img src={logo} alt="imagem" style={{width: '100%', height: '200px', objectFit: 'cover', paddingTop: '10px', paddingBottom: '10px'}}/>
                <Stack spacing={2}>
                  <TextField
                    id="outlined-password-input"
                    label="Login"
                    type="text"
                    variant="standard"
                    InputProps={{
                      startAdornment: (
                        <InputAdornment position="start">
                          <AccountCircle />
                        </InputAdornment>
                        )
                    }}
                  />
                  <TextField
                    id="outlined-password-input"
                    label="Senha"
                    type="password"
                    variant="standard"
                    InputProps={{
                      startAdornment: (
                        <InputAdornment position="start">
                          <Lock />
                        </InputAdornment>
                        )
                    }}
                  />
                  <Stack
                    direction="row"
                    justifyContent="space-between"
                    alignItems="center"
                    spacing={2}
                  >
                    <FormControlLabel
                      label="Manter Conectado"
                      control={<Checkbox />}
                    />
                    <Button variant="contained" onClick={() => {history.push("/home")}}>Login</Button>
                  </Stack>
                </Stack>
              </Box>
            </Blue>
          </Grid>
        </Grid>
      </Box>
    </>
  );
};
