import { LoadingButton } from "@mui/lab";
import { Box } from "@mui/material";
import { useEffect, useState } from "react";
import { Body } from "../../components/Body";
import { useParams } from "react-router-dom";
import api from "../../api.json";
import Notification from "../../components/Notification";

type Props = {

}

export const Process = (props: Props): JSX.Element => {
    let { id } = useParams();
    const [activityId, setActivityId] = useState<any>(id == "null" ? null : id);
    const [data, setData] = useState<any>();
    const [error, setError] = useState<Error | null>(null);
    const [loading, setLoading] = useState(true);
    

    useEffect(() => {
        if(id != "null"){
            setActivityId(id);
            getDataType(id);
        }
    }, [activityId])

    const getDataType = async (id: Number) => {
        try {
            const options = {
                method: 'GET'
            };
            const response = await fetch(api.Process.get + id, options);
            const data = await response.json();
            setData(data);
            console.log(data);
            setLoading(false); 
        } catch (error: any) {
            setError(error);
            Notification.error("Falha ao carregar os dados, tente novamente mais tarde.");
        }
    }

    return (
        <Body pageTitle={data ?  data.activityType.name : "Carregando..."}>
            <Box sx={{ height: "80%", width: "100%"}}>
                <Box sx={{ height: "100%", width: "100%"}}>
                    <Box sx={{ height: "100%", width: "100%", border: 'solid 1px black' }}>
                        {data ? <div style={{ display: 'table-caption' }} dangerouslySetInnerHTML={{__html: data.activityType.page.content}} /> : <div> Carregando...</div>}
                    </Box>
                </Box>
                <Box sx={{padding: "10px", paddingLeft: "0px"}}>
                    {
                        data ? data.activityType.routes.map(
                            element => <LoadingButton variant="contained" sx={{ padding: '5px' }} onClick={() => { }} loading={false}>{element.name}</LoadingButton>
                        ) : <div> Carregando... </div>
                    }
                </Box>
            </Box>
        </Body>

    );
}
