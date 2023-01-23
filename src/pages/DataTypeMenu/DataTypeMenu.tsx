import { useEffect, useState } from "react";
import { Body } from "../../components/Body";
import { DataTypeForm } from "../../components/DatatypeForm";
import { FieldList } from "../../components/FieldList";
import { useParams } from "react-router-dom";
import api from "../../api.json";
import Notification from "../../components/Notification";
import { LinearProgress } from "@mui/material";

export const DataTypeMenu = (): JSX.Element => {
    let { id } = useParams();
    const [dataTypeId, setDataTypeId] = useState<any>(id == "null" ? null : id);
    const [name, setName] = useState<string>("");
    const [error, setError] = useState<Error | null>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        setDataTypeId(id);
        getDataType(id);
    }, [dataTypeId, name])

    const dataTypeIdCallback = (dataTypeId: Number) => {
        setDataTypeId(dataTypeId)
    }

    const getDataType = async (id: Number) => {
        try {
            const options = {
                method: 'GET'
            };
            const response = await fetch(api.DataType.get + id, options);
            const data = await response.json();
            setName(data.name);
            setLoading(false);
        } catch (error: any) {
            setError(error);
            Notification.error("Falha ao carregar os dados, tente novamente mais tarde.");
        }
    }

    const showDataType = (): JSX.Element => {
        return (
            <div>
                <DataTypeForm id={dataTypeId} name={name} dataTypeIdCallback={dataTypeIdCallback}></DataTypeForm>
                {dataTypeId != "null" ? <FieldList id={dataTypeId!!}></FieldList> : null}
            </div>)
    }

    return (
        <Body pageTitle="Criar tipo de dado">
            <div>
                {
                    loading ? <LinearProgress /> : showDataType()
                }
            </div>
        </Body>
    );

}