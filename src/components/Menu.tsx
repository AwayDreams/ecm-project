import { Box, Card, Grid } from "@mui/material";
import { MenuCard } from "./MenuCard";

export const Menu = (): JSX.Element => {
    return (
        <Box sx={{paddingLeft: '20%', marginTop: '2%'}} display="flex" flexDirection="column" >
            <Grid container spacing={3} direction="row" justifyContent="center" alignItems="center" wrap="wrap">
                
                <Grid item xs>
                    <MenuCard name="Tipos de Dados" description="Defina agrupamentos de dados." accessRoute={"/dataTypeList/"} />
                </Grid>
                <Grid item xs>
                    <MenuCard name="Paginas" description="Gerencie as telas interativas." accessRoute={"/pageList/"}  />
                </Grid>
                <Grid item xs>
                    <MenuCard name="Fluxo de Processos" description="Crie e edite fluxos de processos." accessRoute={"/processTypeList/"} />
                </Grid>
                <Grid item xs>
                    <MenuCard name="Processos Ativos" description="Acesse processos ativos." accessRoute={"/processList/"} />
                </Grid>
            </Grid>
        </Box>
    );
}