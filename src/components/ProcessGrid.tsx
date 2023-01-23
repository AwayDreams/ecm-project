import { Box } from "@mui/system"
import { SideListItem } from "./SideListItem"
import AddIcon from '@mui/icons-material/Add';
import { Button, IconButton, LinearProgress } from "@mui/material";
import { useHistory } from 'react-router-dom';
import { useCallback, useEffect, useState } from "react";
import { styled, alpha } from '@mui/material/styles';
import Menu, { MenuProps } from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import { SelectProcessType } from "./SelectProcessType";
import api from "../api.json";
import Notification from "./Notification";
import { ProcessGridItem } from "./ProcessGridItem";


const StyledMenu = styled((props: MenuProps) => (
    <Menu
        elevation={0}
        anchorOrigin={{
            vertical: 'bottom',
            horizontal: 'right',
        }}
        transformOrigin={{
            vertical: 'top',
            horizontal: 'right',
        }}
        {...props}
    />
))(({ theme }) => ({
    '& .MuiPaper-root': {
        borderRadius: 6,
        marginTop: theme.spacing(1),
        minWidth: 180,
        color:
            theme.palette.mode === 'light' ? 'rgb(55, 65, 81)' : theme.palette.grey[300],
        boxShadow:
            'rgb(255, 255, 255) 0px 0px 0px 0px, rgba(0, 0, 0, 0.05) 0px 0px 0px 1px, rgba(0, 0, 0, 0.1) 0px 10px 15px -3px, rgba(0, 0, 0, 0.05) 0px 4px 6px -2px',
        '& .MuiMenu-list': {
            padding: '4px 0',
        },
        '& .MuiMenuItem-root': {
            '& .MuiSvgIcon-root': {
                fontSize: 18,
                color: theme.palette.text.secondary,
                marginRight: theme.spacing(1.5),
            },
            '&:active': {
                backgroundColor: alpha(
                    theme.palette.primary.main,
                    theme.palette.action.selectedOpacity,
                ),
            },
        },
    },
}));

export const ProcessGrid = () => {
    const [data, setData] = useState<any>();
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<Error | null>(null);


    const getAllProcess = useCallback(async () => {
        try {
            const options = {
                method: 'GET'
            };
            const response = await fetch(api.Process.getAll, options);
            const data = await response.json();
            setData(data);
            setLoading(false);
        } catch (error: any) {
            setError(error);
            setLoading(false);
        }
    }, [data])

    useEffect(() => {
        getAllProcess();
    }, [])

    useEffect(() => {},
    [data])



    const showItens = (): JSX.Element => {
        if (data && !data.error) {
            return (
                <div>
                    {data.map(element => <ProcessGridItem id={element.id} activityTypeName={element.activityType.name} processTypeName={element.processType.name} accessRoute={"/process/"+ element.id} />)}
                </div>
            )
        }
        return <div>Error</div>;
    }





    return (
        <div>
            <SelectProcessType></SelectProcessType>
            <Box sx={{ border: 'solid 1px black', padding: '10px', maxHeight: '500px', overflowY: 'scroll' }}>
                {loading ? <LinearProgress /> : error ? "error" : showItens()}
            </Box>
        </div>
    );
} 