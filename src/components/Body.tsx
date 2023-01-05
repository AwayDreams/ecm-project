import { Box, Grid, IconButton, Typography } from "@mui/material";
import { useHistory } from 'react-router-dom';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import ArrowCircleLeftIcon from '@mui/icons-material/ArrowCircleLeft';

type Props = {
    pageTitle: String,
    children: JSX.Element,
    header?: JSX.Element
};

export const Body = (props: Props): JSX.Element => {
    const history = useHistory();
    
    return <Box sx={{ boxShadow: 10, margin: '10px', padding: '20px', paddingTop: '20px', borderRadius: 2, height: '90vh', display: "flex", flexDirection: "column"}}>
        <Box>
            <Typography variant="h3" sx={{ paddingBottom: '10px' }}>
                <Grid container
                    direction="row"
                    alignItems="center">
                    <IconButton
                        color="primary"
                        onClick={() => {
                            history.goBack();
                        }}
                    >
                        <ArrowCircleLeftIcon fontSize='large' />

                    </IconButton>{props.pageTitle}
                    {props.header}
                </Grid>
            </Typography>
        </Box>
        {props.children}
    </Box >
}