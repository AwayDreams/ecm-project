import "./style/dragula.css";
import "./style/form-js-editor.css";
import "./style/form-js.css";
import "./style/light.css";
import "./style/properties-panel.css";
import { Box, Button } from "@mui/material";
import { FormItem } from "../../components/FormItem";
import { useEffect, useRef } from "react";


export const MyFormEditor = (): JSX.Element => {
    return (
        <>
            <Box>
            <Button variant="contained" sx={{padding: '5px'}}>Salvar</Button>
            </Box>
            <Box sx={{ height: "100%", width: "100%", display: 'flex' }}>
                <Box sx={{ width: "30%", height: "100%" }}>
                    <Box sx={{ border: 'solid 1px black', padding: '10px', height: '100%', overflowY: 'scroll' }}>
                        <FormItem content="teste"></FormItem>
                        <FormItem content="teste"></FormItem>
                        <FormItem content="teste"></FormItem>
                        <FormItem content="teste"></FormItem>
                    </Box>
                </Box>
                <Box sx={{ width: "70%", height: "100%" }}>
                    <textarea name="" id="" cols={30} rows={10} style={{ width: "100%", height: "100%" }}></textarea>
                </Box>
            </Box>
        </>
    )
}

export default MyFormEditor;