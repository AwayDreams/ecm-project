import { Body } from "../../components/Body";
import { SideList } from "../../components/SideList";


export const ListMenu = (): JSX.Element => {
    return (
        <Body pageTitle="Titulo">
            <div>
                <SideList></SideList>
            </div>
        </Body>
    );

}