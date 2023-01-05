import { Box } from "@mui/system"
import { SideListItem } from "./SideListItem"
import AddIcon from '@mui/icons-material/Add';
import { IconButton, LinearProgress } from "@mui/material";
import { useHistory } from 'react-router-dom';
import { useEffect, useState } from "react";

type Props = {
    getAllFunction: Function
    deleteFunction: (setLoading: Function, setError: Function, id: string) => Promise<void>
    accessRoute: string
    data: any,
}

export const SideList = (props: Props) => {
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<Error | null>(null);
    

    const history = useHistory();
    
    useEffect(() => {
        props.getAllFunction(setLoading, setError)
    }, [])



    const showItens = (): JSX.Element => {
        if (props.data && !props.data.error) {
            return (
                <div>
                     {props.data.map(element => <SideListItem id={element.id} name={element.name} accessRoute={"/formEditor"} deleteFunction={props.deleteFunction} />)}
                </div>
            ) 
        }
        return <div>Error</div>;
    }



    return (
        <div>
            <IconButton
                size="large"
                edge="end"
                color="primary"
                aria-label="profile"
                onClick={() => history.push(props.accessRoute)}
            >
                <AddIcon />
            </IconButton>
            <Box sx={{ border: 'solid 1px black', padding: '10px', maxHeight: '500px', overflowY: 'scroll' }}>
                {loading ? <LinearProgress /> : error ? "error"  : showItens()}
            </Box>
        </div>
    );
} 