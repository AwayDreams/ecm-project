import { Body } from "../../components/Body";
import { FieldTypeForm } from "../../components/FieldTypeForm";

export const fieldtypeMenu = (): JSX.Element => {
    return (
        <Body pageTitle ="Criar novo campo">
            <FieldTypeForm></FieldTypeForm>
        </Body>
    );
}