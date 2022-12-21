import { Box } from "@mui/system"
import { SideListItem } from "./SideListItem"
import AddIcon from '@mui/icons-material/Add';
import { IconButton } from "@mui/material";

export const SideList = () => {
    return (
        <div>
            <IconButton
                size="large"
                edge="end"
                color="primary"
                aria-label="profile"
            >
                <AddIcon />
            </IconButton>
            <Box sx={{ border: 'solid 1px black', padding: '10px', maxHeight: '500px', overflowY: 'scroll' }}>
                <SideListItem content={"teste 01"} />
                <SideListItem content={"teste 02"} />
                <SideListItem content={"teste 03"} />
                <SideListItem content={"teste 04"} />
            </Box>
        </div>
    );
} 