import { Body } from "../../components/Body";
import { CreateUserForm } from "../../components/CreateUserForm";

export const CreateUserMenu = (): JSX.Element => {
    return (
        <Body pageTitle="Criar Usuario">
            <div>
                <CreateUserForm></CreateUserForm>
            </div>
        </Body>
    );

}