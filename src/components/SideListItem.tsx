import { Box, Card, CardContent, IconButton, Typography } from "@mui/material"
import DeleteIcon from '@mui/icons-material/Delete';
import { width } from "@mui/system";

type Props = {
    content: String
}
export const SideListItem = (props: Props): JSX.Element => {
    return (<Card sx={{ minWidth: 275,  marginBottom: '10px'}}>
        <CardContent>
            <Box sx={{ display: 'inline-flex', alignItems: 'center', justifyContent: 'space-between', width: '100%'}}>
                <Typography variant="h5" component="div">
                    {props.content}
                </Typography>
                <IconButton
                    size="large"
                    edge="end"
                    color="primary"
                    aria-label="profile"
                >
                    <DeleteIcon />
                </IconButton>
            </Box>
        </CardContent>
    </Card>);
}