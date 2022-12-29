import { Box, Button, CircularProgress, TextField } from "@mui/material";
import React, { useCallback, useEffect, useState } from "react";

type userRegister = {
    user: String,
    password: String,
    name: String,
}

export const CreateUserForm = (): JSX.Element => {
    const [data, setData] = useState<any>(null);
    const [error, setError] = useState<Error | null>(null);
    const [loading, setLoading] = useState(false);
    
    const [user, setUser] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [name, setName] = useState('');

    function handlerUser(event: React.ChangeEvent<HTMLInputElement>) {
        setUser(event.target.value);
    }

    function handlerPassword(event: React.ChangeEvent<HTMLInputElement>) {
        setPassword(event.target.value);
    }

    function handlerConfirmPassword(event: React.ChangeEvent<HTMLInputElement>) {
        setConfirmPassword(event.target.value);
    }

    function handlerName(event: React.ChangeEvent<HTMLInputElement>) {
        setName(event.target.value);
        console.log(name);
    }

    useEffect(() => {}, [user, password, confirmPassword, name])

    const saveUser = useCallback (async () => {
        console.log("clickado")
        console.log(user)
        setLoading(true);
        try {
            const userRegister: userRegister = {
                user: user,
                password: password,
                name: name
            }
            console.log(user)
            console.log(userRegister);
            const options = {
                method: 'PUT',
                body: JSON.stringify(userRegister),
                headers: {
                    'Content-Type': 'application/json'
                }
              };
            const response = await fetch('http://localhost:8080/user', options);
            const data = await response.json();
            setData(data);
            setLoading(false);
        } catch (error: any) {
            setError(error);
            setLoading(false);
        }
    }, [Button]);

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
                        value={user}
                        onChange={handlerUser}
                    />
                    <TextField
                        id="outlined-password-input"
                        label="Nome"
                        type="text"
                        variant="standard"
                        value={name}
                        onChange={handlerName}
                    />
                </Box>
                <Box>
                    <TextField
                        id="outlined-password-input"
                        label="senha"
                        type="password"
                        variant="standard"
                        value={password}
                        onChange={handlerPassword}
                    />
                    <TextField
                        id="outlined-password-input"
                        label="confirmar senha"
                        type="password"
                        variant="standard"
                        value={confirmPassword}
                        onChange={handlerConfirmPassword}
                    />
                </Box>
            </Box>
            <Box sx={{marginBottom: '8px'}}>
                <Button variant="contained" sx={{ padding: '5px' }}  onClick={saveUser} >{loading ? <CircularProgress color="secondary"/> : "Salvar"}</Button>
            </Box>
        </Box>

    );
}