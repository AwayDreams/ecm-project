import {Orientar} from "../Login/style";
import { Body } from "../../components/Body";
import { Menu } from "../../components/Menu";


export const Home = (): JSX.Element => { 
    return(
        <Body pageTitle={"Menu"}>
            <Menu></Menu>
        </Body>
    )
}