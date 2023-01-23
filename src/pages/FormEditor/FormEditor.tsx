import { Body } from "../../components/Body";
import { HeaderFormEditor } from "../../components/HeaderFormEditor";
import MyFormEditor from "./MyFormEditor";
import { useParams } from "react-router-dom";
import { ChangeEvent, useCallback, useEffect, useState } from "react";
import api from "../../api.json";
import Notification from "../../components/Notification";
import { useHistory } from 'react-router-dom';

type Page = {
  id: Number | null,
  dataTypeId: Number,
  name: String,
  content: string
}

export const FormEditor = (): JSX.Element => {
  let { id } = useParams();

  const [formEditorId, setFormEditorId] = useState<Number | null>(id == "null" ? null : id);
  const [textAreaValue, setTextAreaValue] = useState<string>("");
  const [tipo, setTipo] = useState<Number>();
  const [name, setName] = useState<String>("");


  const [error, setError] = useState<Error | null>(null);
  const [loading, setLoading] = useState(false);
  const [loadingPage, setLoadingPage] = useState(true);

  const history = useHistory();

  useEffect(() => {
    if(id != "null"){
      getPage(id)
      setFormEditorId(id);
    }
}, [])

  useEffect(() => {
    history.replace(`/formEditor/${formEditorId}`);
  }, [formEditorId]);

  const getPage = useCallback(async (id: Number) => {
    try {
        const options = {
            method: 'GET'
        };
        const response = await fetch(api.Page.get + id, options);
        const data = await response.json();
        setName(data.name);
        setTipo(data.dataType.id);
        setLoadingPage(false);
    } catch (error: any) {
        setError(error);
        Notification.error("Falha ao carregar os dados, tente novamente mais tarde.");
    }
  }, [])
  
  const handlerTextAreaValue = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
    setTextAreaValue(event.target.value);
  }

  const handlerTipo = (event: React.ChangeEvent<HTMLInputElement>) => {
    setTipo(Number(event.target.value));
  }

  const handlerName = (event: React.ChangeEvent<HTMLInputElement>) => {
    setName(event.target.value);
  }

  const savePage = useCallback(async () => {
    setLoading(true);
    try {
        const pageToSave: Page = {
            id: formEditorId,
            dataTypeId: Number(tipo),
            name: name,
            content: textAreaValue
        }
        console.log(pageToSave);
        const options = {
            method: 'PUT',
            body: JSON.stringify(pageToSave),
            headers: {
                'Content-Type': 'application/json'
            }
          };
        const response = await fetch(api.Page.save, options);
        const data = await response.json();
        console.log("esteee", data);
        setFormEditorId(data.id);
        Notification.success("Pagina salva com sucesso!");
        setLoading(false);
    } catch (error: any) {
        setError(error);
        Notification.error("Error ao salvar Pagina");
        setLoading(false);
    }
  }, [formEditorId, tipo])

  return (
    <Body pageTitle={"Editar Pagina"} header={<HeaderFormEditor name={name} tipo={tipo} loading={loading} savePageCallback={savePage} handlerTipo={handlerTipo} handlerName={handlerName}/>}>
    {formEditorId != null ? <MyFormEditor dataTypeId={tipo} handlerTextAreaValue={handlerTextAreaValue} textAreaValue={textAreaValue}/> : <></>}
    </Body>
  );
}
