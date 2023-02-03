import React, { useCallback, useEffect, useRef, useState } from "react";
import Button from '@mui/material/Button';
import BpmnJS from "bpmn-js/lib/Modeler";
import "bpmn-js/dist/assets/diagram-js.css";
import "bpmn-font/dist/css/bpmn-embedded.css";
import myPaletteProvider from "./MyPaletteProvider"
import CustomContextPadProvider from "./CustomContextPadProvider"
import {
  getBusinessObject
} from 'bpmn-js/lib/util/ModelUtil';

import processDiagram from "./processDiagram";
import EditTask from "../../components/EditTask";
//import "bpmn-js-properties-panel/dist/assets/bpmn-js-properties-panel.css";
type TaskEditorInformation = {
  id: String,
  name: String,
  page: String,
  callbackFunction: React.MutableRefObject<(name: string, page: string) => void>
}

type ProcessType = {
  id: Number | null,
  version: number,
  dataTypeId: Number | null,
  name: String,
  content: String,
  firstActivityId: String | null
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

type Bpm = {
  processType: ProcessType,
  activityTypes: [ActivityType],
  routes: [Route],
}

type Props = {
  content: String
  bpm: Bpm | null
  setBpm: Function
  processType: ProcessType
}

export const BpmnView = (props: Props): JSX.Element => {
  const [modalName, setModalName] = useState<string>("");
  const [modalPage, setModalPage] = useState<string>("");
  const modalCallback = useRef((name: string, page: string)=>{});
  const [viewer, setViewer] = useState<any>();
  const [showTaskEditor, setShowTaskEditor] = useState<boolean>(false);
  const [taskEditorInformation, setTaskEditorInformation] = useState<TaskEditorInformation>();

  useEffect(() => {
    console.log("componente montado")
    const modeler = new BpmnJS({
      container: document.getElementById("js-canvas"),
      processRef: true,
      keyboard: {
        bindTo: document
      },
      additionalModules: [
        /*{
        __init__: [
          "labelEditingProvider"
        ],
        labelEditingProvider: ["value", (element: any) => {
          console.log("valudando");
          return element.type == "bpmn:SequenceFlow"
        }],
      },*/
      myPaletteProvider, CustomContextPadProvider],
    

    })
  setChangedEvent(modeler);
  setActivityEvent(modeler);
  console.log(modeler);
  setViewer(modeler);
  runSetBpm(modeler);
}, [])

const setActivityEvent = (modeler: any) => {
  modeler.on('element.dblclick', function (event) {
    console.log("double clck")
    const element = event.element;
    // verifique se o elemento clicado é uma task
    if (element.type === 'bpmn:Task') {
        const businessObject = getBusinessObject(element);
        console.log("bbb", businessObject);
        console.log("bbb2", businessObject.$attrs.page);
        const { id } = businessObject;

        setModalName(businessObject.name)

        if(businessObject.$attrs.hasOwnProperty('page')){
          setModalPage(businessObject.$attrs.page)
        }

        modalCallback.current = (name: string, page: string) => {

        modeler.get('modeling').updateProperties(element, {
          name: name,
          page: page
        });
      }

      console.log("modalCallBack", modalCallback);

      setShowTaskEditor(true);
      console.log("taskEditor", showTaskEditor);
    }
  });
}

const runSetBpm = (modeler: any) => {
  modeler.saveXML({ format: true }, function (err: any, xml: any) {
    console.log("SALVANDO@@")
    props.setBpm(processDiagram({xml: xml, processType: props.processType}));
  })
}

const setChangedEvent = (modeler: any) => {
  modeler.on('commandStack.changed', function (event) {
    modeler.saveXML({ format: true }, function (err: any, xml: any) {
      runSetBpm(modeler)
    })
    return;
  });
}


const importXML = async () => {
  try {
    console.log(props.content, "props.content");
    const result = await viewer.importXML(props.content);
    const { warnings } = result;
    console.log("warnings", warnings);
    runSetBpm(viewer);
  } catch (err: any) {
    const diagramDefault =
      `<?xml version="1.0" encoding="UTF-8"?>
      <definitions xmlns="http://www.omg.org/spec/BPMN/20100524/MODEL" xmlns:bpmndi="http://www.omg.org/spec/BPMN/20100524/DI" xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" id="sid-38422fae-e03e-43a3-bef4-bd33b32041b2" targetNamespace="http://bpmn.io/bpmn" exporter="bpmn-js (https://demo.bpmn.io)" exporterVersion="11.1.0">
        <process id="Process_0ce5ktp" />
        <bpmndi:BPMNDiagram id="BpmnDiagram_1">
          <bpmndi:BPMNPlane id="BpmnPlane_1" bpmnElement="Process_0ce5ktp" />
        </bpmndi:BPMNDiagram>
      </definitions>`
    await viewer.importXML(diagramDefault);
    console.log(err.message, err.warnings);
  }
}

useEffect(() => { 
}, [modalCallback]);

useEffect(
  () => {
    console.log("componente montado 2")
    if (viewer !== undefined) {
      console.log("viewer", viewer);
      importXML()
    }
  }
  , [viewer])

const save = () => {
  viewer.saveXML({ format: true }, function (err: any, xml: any) {
    processDiagram({xml: xml, processType: props.processType});
  })
}

return (
  <>
    <div style={{ height: "100%" }}>
      <div id="js-canvas" />
      <Button onClick={save}>save!</Button>
    </div>
    {showTaskEditor ? <EditTask open={showTaskEditor} setOpen={setShowTaskEditor} dataTypeId={1} taskEditorInformation={{
      name: modalName,
      page: modalPage,
      callbackFunction: modalCallback
    }} /> : null}
  </>
);
}


export default BpmnView;


