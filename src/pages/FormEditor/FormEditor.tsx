import { Body } from "../../components/Body";
import { HeaderFormEditor } from "../../components/HeaderFormEditor";
import MyFormEditor from "./MyFormEditor";

export const FormEditor = (): JSX.Element => {
  return (
    <Body pageTitle={"Editar Pagina"} header={<HeaderFormEditor/>}>
    <MyFormEditor></MyFormEditor>
    </Body>
  );
}
