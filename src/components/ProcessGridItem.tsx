import { Box, Card, CardContent, IconButton, Typography } from "@mui/material"
import DeleteIcon from '@mui/icons-material/Delete';
import { useHistory } from 'react-router-dom';
import { useCallback, useEffect, useState } from "react";
import { LoadingButton } from "@mui/lab";
import ConfirmationDialog from "./ConfirmationDialog";

type Props = {
    id: any
    activityTypeName: String
    processTypeName: String
    accessRoute: String
}
export const ProcessGridItem = (props: Props): JSX.Element => {
    const history = useHistory();

    return (<>
        <Card sx={{ minWidth: 275, marginBottom: '10px' }} onClick={() => history.push(props.accessRoute)}>
            <CardContent>
                <Box sx={{ display: 'inline-flex', alignItems: 'center', justifyContent: 'space-between', width: '100%' }}>
                    <Typography variant="h5" component="div">
                        {props.activityTypeName}
                    </Typography>
                    <Typography variant="h4" component="div">
                        {props.processTypeName}
                    </Typography>
                </Box>
            </CardContent>
        </Card>
    </>);
}