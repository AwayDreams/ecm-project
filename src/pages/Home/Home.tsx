import {Orientar} from "../Login/style";

type Props = {
    nome: String
}

export const Home = (props: Props): JSX.Element => { 
    const {nome} = props;
    return <>{nome}</> 
}