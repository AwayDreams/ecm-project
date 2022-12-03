import { Box, Card, Grid } from "@mui/material";
import { MenuCard } from "./MenuCard";

export const Menu = (): JSX.Element => {
    return (
        <Box sx={{paddingLeft: '20%', marginTop: '2%'}} display="flex" flexDirection="column">
            <Grid container spacing={3} direction="row" justifyContent="center" alignItems="center">
                <Grid item xs>
                    <MenuCard name="Paginas" description="Gerencie as telas interativas." />
                </Grid>
                <Grid item xs>
                    <MenuCard name="Tipos de Dados" description="Defina agrupamentos de dados." />
                </Grid>
                <Grid item xs>
                    <MenuCard name="Processos" description="Crie e edite fluxos de processos." />
                </Grid>
            </Grid>
        </Box>
    );
}