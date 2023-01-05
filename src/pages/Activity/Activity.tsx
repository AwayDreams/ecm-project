import { LoadingButton } from "@mui/lab";
import { Box } from "@mui/material";
import { Body } from "../../components/Body";

type Props = {

}

export const Activity = (props: Props): JSX.Element => {
    return (
        <Body pageTitle={""}>
            <Box sx={{ height: "80%", width: "100%"}}>
                <Box sx={{ height: "100%", width: "100%"}}>
                    <Box sx={{ height: "100%", width: "100%", border: 'solid 1px black' }}></Box>
                </Box>
                <Box sx={{padding: "10px", paddingLeft: "0px"}}>
                    <LoadingButton variant="contained" sx={{ padding: '5px' }} onClick={() => { }} loading={false}>Salvar</LoadingButton>
                </Box>
            </Box>
        </Body>

    );
}
