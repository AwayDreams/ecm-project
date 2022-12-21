import { Box } from "@mui/system"
import { SideListItem } from "./SideListItem"
import AddIcon from '@mui/icons-material/Add';
import { IconButton } from "@mui/material";
import { FieldListItem } from "./FieldListItem";

export const FieldList = () => {
    return (
        <div>
            <Box sx={{ display: 'inline-flex', alignItems: 'center', justifyContent: 'flex-end', width: '99%' }}>
                <IconButton
                    size="large"
                    edge="end"
                    color="primary"
                    aria-label="profile"
                >
                    <AddIcon />

                </IconButton>
            </Box>
            <Box sx={{ border: 'solid 1px black', padding: '10px', maxHeight: '500px', overflowY: 'scroll' }}>
                <FieldListItem content={"teste 01"} />
                <FieldListItem content={"teste 02"} />
                <FieldListItem content={"teste 03"} />
                <FieldListItem content={"teste 04"} />
            </Box>
        </div>
    );
} 