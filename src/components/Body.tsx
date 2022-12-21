import { Box, Grid, IconButton, Typography } from "@mui/material";
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import ArrowCircleLeftIcon from '@mui/icons-material/ArrowCircleLeft';

type Props = {
    pageTitle: String,
    children: JSX.Element,
};

export const Body = (props: Props): JSX.Element => {
    return <Box sx={{ boxShadow: 10, margin: '10px', padding: '20px', paddingTop: '20px', borderRadius: 2, height: '100%' }}>
        <Typography variant="h3" sx={{ paddingBottom: '10px' }}>
            <Grid container
                direction="row"
                alignItems="center">
                <IconButton
                    color="primary"
                >
                    <ArrowCircleLeftIcon fontSize='large' />

                </IconButton>{props.pageTitle || 'titulo'}
            </Grid>
        </Typography>
        {props.children}

    </Box >
}