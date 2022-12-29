import { Box, Card, CardContent, IconButton, Typography } from "@mui/material"
import DeleteIcon from '@mui/icons-material/Delete';

type Props = {
    content: String
}
export const FormItem = (props: Props): JSX.Element => {
    return (
        <div draggable onDragStart={(event) => {event.dataTransfer.setData('text/plain', "test12323e")}}>
            <Card sx={{ minWidth: 275, marginBottom: '10px' }}>
                <CardContent>
                    <Box sx={{ display: 'inline-flex', alignItems: 'center', justifyContent: 'space-between', width: '100%' }}>
                        <Typography variant="h5" component="div">
                            {props.content}
                        </Typography>
                    </Box>
                </CardContent>
            </Card>
        </div>);
}