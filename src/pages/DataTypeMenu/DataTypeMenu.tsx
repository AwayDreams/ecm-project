import { Body } from "../../components/Body";
import { DataTypeForm } from "../../components/DatatypeForm";
import { SideList } from "../../components/SideList";

export const DataTypeMenu = (): JSX.Element => {
    return (
        <Body pageTitle="Criar tipo de dado">
            <div>
                <DataTypeForm></DataTypeForm>
                <SideList></SideList>
            </div>
        </Body>
    );

}