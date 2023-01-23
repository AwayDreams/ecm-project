import "./style/dragula.css";
import "./style/form-js-editor.css";
import "./style/form-js.css";
import "./style/light.css";
import "./style/properties-panel.css";
import { Box, Button } from "@mui/material";
import { FormItem } from "../../components/FormItem";
import { ChangeEventHandler, useCallback, useEffect, useState } from "react";
import api from "../../api.json";
import Notification from "../../components/Notification";

type Props = {
    dataTypeId: any
    handlerTextAreaValue: ChangeEventHandler<HTMLTextAreaElement>
    textAreaValue: string
}

export const MyFormEditor = (props: Props): JSX.Element => {
    const [name, setName] = useState<string>("");
    const [fieldType, setFieldType] = useState<any>([]);
    const [error, setError] = useState<Error | null>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        getAllFieldType();
    }, [props.dataTypeId])


    const loadFieldTypeList = useCallback(() => {
        console.log("Loading");
        return fieldType.map((item) => {
            return <FormItem id={item.id} name={item.name} tipo={item.type}></FormItem>
        })
    },[fieldType])
    
    const getAllFieldType = async () => {
        console.log("clickado")
        try {
            const options = {
                method: 'GET'
            };

            const params = new URLSearchParams();
            params.set("dataTypeId", props.dataTypeId.toString());
            const response = await fetch(api.FieldType.getAll + "?" + params, options);
            const data = await response.json();
            setFieldType(data);
            Notification.success("data carregado")
            setLoading(false);
        } catch (error: any) {
            setError(error);
            Notification.error("falha ao carregar os campos. Tente novamente mais tarde!");
            setLoading(false);
        }
    } 

    return (
        <Box sx={{ height: "100%", width: "100%", display: 'flex', justifyContent: "space-around" }}>
            <Box sx={{ width: "30%", height: "100%" }}>
                <Box sx={{ border: 'solid 1px black', height: '100%', overflowY: 'scroll' }}>
                    {loadFieldTypeList()}
                </Box>
            </Box>
            <Box sx={{ width: "30%", height: "100%" }}>
                <textarea name="" id="" cols={30} rows={10} style={{ width: "100%", height: "100%" }} onChange={props.handlerTextAreaValue} value={props.textAreaValue}></textarea>
            </Box>
            <Box sx={{ width: "30%", height: "100%" }}>
                <Box sx={{ border: 'solid 1px black', height: "100%" }}>
                    <div style={{ display: 'table-caption' }} dangerouslySetInnerHTML={{__html: props.textAreaValue}} />
                </Box>
            </Box>
        </Box>
    )
}

export default MyFormEditor;