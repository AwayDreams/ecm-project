import { useEffect, useState } from "react";
import { Body } from "../../components/Body";
import { DataTypeForm } from "../../components/DatatypeForm";
import { FieldList } from "../../components/FieldList";

type Props = {
    dataTypeId: Number | null
}

export const DataTypeMenu = (props: Props): JSX.Element => {
    const [dataTypeId, setDataTypeId] = useState<Number | null>(null);

    useEffect(() => {
        setDataTypeId(props.dataTypeId)
    }, [])

    const dataTypeIdCallback = (dataTypeId: Number) => {
        setDataTypeId(dataTypeId)
    }

    return (
        <Body pageTitle="Criar tipo de dado">
            <div>
                <DataTypeForm id={dataTypeId} name={""} dataTypeIdCallback={dataTypeIdCallback}></DataTypeForm>
               { dataTypeId ? <FieldList id={dataTypeId!!}></FieldList> : null}
            </div>
        </Body>
    );

}