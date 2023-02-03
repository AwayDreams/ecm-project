import { Box } from "@mui/material";
import { ChangeEvent, useCallback, useEffect, useState } from "react";
import { Body } from "../../components/Body";
import { HeaderBpmEditor } from "../../components/HeaderBpmEditor";
import BpmnView from "./diagramViewer";
import { useParams } from "react-router-dom";
import "./styles.css";
import api from "../../api.json";
import Notification from "../../components/Notification";
import { useHistory } from 'react-router-dom';
import { validaBpm } from "./validaBpm";
import { filterRoutes } from "./processDiagram";

type Bpm = {
  processType: ProcessType,
  activityTypes: [ActivityType],
  routes: [Route],
}

type ActivityType = {
  id: String | null;
  name: String;
  type: String;
  pageId: Number | null;
  processId: Number;
}

type Route = {
  id: String | null;
  name: String;
  nameKey: String;
  content: String;
  activity: String | null;
  nextActivity: String | null;
}

type ProcessType = {
  id: Number | null,
  version: number,
  dataTypeId: Number | null,
  name: String,
  content: String,
  firstActivityId: String | null
}




export const BpmEditor = (): JSX.Element => {
  let { id } = useParams();
  const [bpmEditorid, setBpmEditorid] = useState<any>(id == "null" ? null : id);
  const [name, setName] = useState<String>("");
  const [version, setVersion] = useState<Number>(0);
  const [tipo, setTipo] = useState<String>();
  const [content, setContent] = useState<any>("");
  const [bpm, setBpm] = useState<Bpm>({
    processType: {
      id: bpmEditorid,
      version: 0,
      dataTypeId: tipo,
      name: name,
      content: content,
      firstActivityId: null
    },
    activityTypes: [],
    routes: [],
  } as unknown as Bpm);

  const [error, setError] = useState<Error | null>(null);
  const [loading, setLoading] = useState(false);
  const [loadingProcess, setLoadingProcess] = useState(id == "null" ? false : true);

  const history = useHistory();

  useEffect(() => {
    if (bpmEditorid != null) {
      getProcessType(id)
    }
  }, [])

  useEffect(() => {},[loadingProcess, bpmEditorid])

  useEffect(() => {
    history.replace(`/bpmEditor/${bpmEditorid}`);
  }, [bpmEditorid]);


  const handlerName = (event: React.ChangeEvent<HTMLInputElement>) => {
    setName(event.target.value);
  }

  const handlerTipo = (event: React.ChangeEvent<HTMLInputElement>) => {
    setTipo(event.target.value);
    console.log(event.target.value);
    console.log(tipo);
  }

  const getProcessType = useCallback(async (id: Number) => {
    try {
      const options = {
        method: 'GET'
      };
      const response = await fetch(api.ProcessType.get + id, options);
      const data = await response.json();
      setName(data.name);
      setVersion(data.version);
      setTipo(data.dataType.id);
      setContent(data.content);
      setLoadingProcess(false);
    } catch (error: any) {
      setError(error);
      Notification.error("Falha ao carregar os dados, tente novamente mais tarde.");
    }
  }, [])

  const saveProcessType = useCallback(async () => {
    debugger;
    setLoading(true);
    try {
      var bpmToSave = {} as Bpm;
      Object.assign(bpmToSave, bpm);
      bpmToSave.processType.name = String(name)
      bpmToSave.processType.id = Number.isNaN(Number(id)) ? null : Number(id) 
      bpmToSave.processType.dataTypeId = Number.isNaN(Number(tipo)) ? null : Number(tipo) 
      console.log(bpmToSave);
      if(!validaBpm(bpmToSave)){
        setLoading(false);
        return;
      }
      bpmToSave.routes = filterRoutes(bpmToSave.routes)
      const options = {
        method: 'PUT',
        body: JSON.stringify(bpmToSave),
        headers: {
          'Content-Type': 'application/json'
        }
      };
      const response = await fetch(api.Bpm.save, options);
      const data = await response.json();
      setBpmEditorid(data.id);
      Notification.success("Pagina salva com sucesso!");
      setLoading(false);
    } catch (error: any) {
      setError(error);
      Notification.error("Error ao salvar Pagina");
      setLoading(false);
    }
  }, [bpmEditorid, tipo, content, bpm, name, id])

  const showBpmView = useCallback((): JSX.Element => {
    console.log("Show", loadingProcess, bpmEditorid);
    if((!loadingProcess) && (bpmEditorid != null)){
      return (
        <Box sx={{ width: '100%', height: '100%', border: 'solid 1px gray', }}>
          <BpmnView content={content} bpm={bpm} setBpm={setBpm} processType={{
            id: bpmEditorid,
            version: Number(version),
            dataTypeId: Number(tipo),
            name: name,
            content: content,
            firstActivityId: null
          }} />
        </Box>
      )
    }
    return <></>
  },[loadingProcess, bpmEditorid])

  return (
    <Body pageTitle={"Editor BPM"} header={<HeaderBpmEditor id={bpmEditorid} name={name} tipo={tipo} handlerTipo={handlerTipo} handlerName={handlerName} saveProcessCallback={saveProcessType} />}>
      {showBpmView()}
    </Body>
  );
}
