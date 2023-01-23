import { Body } from "../../components/Body";
import { SideList } from "../../components/SideList";
import api from "../../api.json";
import { useCallback, useState } from "react";


export const PageList = (): JSX.Element => {
    const [data, setData] = useState<any>();

    const getAllPages = useCallback(async (setLoading: Function, setError: Function) => {
        try {
            const options = {
                method: 'GET'
            };
            const response = await fetch(api.Page.getAll, options);
            const data = await response.json();
            setData(data);
            setLoading(false);
        } catch (error: any) {
            setError(error);
            setLoading(false);
        }
    }, [data])

    const deletePage = useCallback(async (setLoading: Function, setError: Function, id: string) => {
        setLoading(true);
        try {
            const options = {
                method: 'DELETE'
            };
            const params = new URLSearchParams();
            params.set("pageId", id);
            const response = await fetch(api.Page.delete + "?" +params, options);
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
        <Body pageTitle="Paginas">
            <div>
                <SideList getAllFunction={getAllPages} deleteFunction={deletePage} accessRoute={"/formEditor/"} data={data}></SideList>
            </div>
        </Body>
    );

}

