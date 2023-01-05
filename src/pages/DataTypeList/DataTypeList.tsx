import { Body } from "../../components/Body";
import { SideList } from "../../components/SideList";
import api from "../../api.json";
import { useCallback, useState } from "react";


export const DataTypeList = (): JSX.Element => {
    const [data, setData] = useState<any>();

    const getAllDataTypes = useCallback(async (setLoading: Function, setError: Function) => {
        try {
            const options = {
                method: 'GET'
            };
            const response = await fetch(api.DataType.getAll, options);
            const data = await response.json();
            setData(data);
            setLoading(false);
        } catch (error: any) {
            setError(error);
            setLoading(false);
        }
    }, [data])

    const deleteDataType = useCallback(async (setLoading: Function, setError: Function, id: string) => {
        setLoading(true);
        try {
            const options = {
                method: 'DELETE'
            };
            const params = new URLSearchParams();
            params.set("dataTypeId", id);
            const response = await fetch(api.DataType.delete + "?" +params, options);
            if(response.status === 200){
                console.log(data);
                const newData = data.filter(elem =>  elem.id !== id)
                setData(newData);
            }
            setLoading(false);
        } catch (error: any) {
            setError(error);
            setLoading(false);
        }
    }, [data])
    
    return (
        <Body pageTitle="Tipos de Dados">
            <div>
                <SideList getAllFunction={getAllDataTypes} deleteFunction={deleteDataType} accessRoute={"/DataTypeMenu"} data={data}></SideList>
            </div>
        </Body>
    );

}

