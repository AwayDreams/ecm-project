import { Box, Card, CardContent, IconButton, Typography } from "@mui/material"
import DeleteIcon from '@mui/icons-material/Delete';
import { useHistory } from 'react-router-dom';
import { useCallback, useEffect, useState } from "react";
import { LoadingButton } from "@mui/lab";
import ConfirmationDialog from "./ConfirmationDialog";

type Props = {
    id: any
    name: String
    accessRoute: String
    deleteFunction: (setLoading: Function, setError: Function, id: string) => Promise<void>
}
export const SideListItem = (props: Props): JSX.Element => {
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<Error | null>(null)
    const [showModalConfirmation, setShowModalConfirmation] = useState<Boolean>(false);

    const history = useHistory();

    useEffect(() => {
        console.log("useEffect");
    },
        [showModalConfirmation, setError])

    const removeEvent = (event) => {
        event.stopPropagation();
        setShowModalConfirmation(true);
    }


    return (<>
        <Card sx={{ minWidth: 275, marginBottom: '10px' }} onClick={() => history.push(props.accessRoute)}>
            <CardContent>
                <Box sx={{ display: 'inline-flex', alignItems: 'center', justifyContent: 'space-between', width: '100%' }}>
                    <Typography variant="h5" component="div">
                        {props.name}
                    </Typography>
                    <LoadingButton
                        variant="contained"
                        color="primary"
                        loading={loading}
                        onClick={removeEvent}
                    >
                        <DeleteIcon />
                    </LoadingButton>
                </Box>
            </CardContent>
        </Card>
        {
            showModalConfirmation ?
                <ConfirmationDialog
                    onConfirm={
                        () => { 
                            props.deleteFunction(setLoading, setError, props.id) 
                        }
                    }
                    open={showModalConfirmation}
                    setOpen={setShowModalConfirmation} />
                : null
        }
    </>);
}