import { xml2json } from 'xml-js';
//Nao pode ter 2 raias
//Nao pode ter 2 start
type Flow = {
    startEvent: any;
    endEvent: any;
    sequenceFlow: any;
    task: any;
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

type Props = {
    processType: ProcessType,
    xml: string
}

type Bpm = {
    processType: ProcessType,
    activityTypes: [ActivityType],
    routes: [Route],
}



export const processDiagram = (props: Props): any => {
    const fluxo = {
        startEvent: null,
        endEvent: null,
        sequenceFlow: null,
        task: null
    } as Flow;

    const jsonString = xml2json(props.xml);
    const json = JSON.parse(jsonString);

    console.log("json", json)
    const process = json.elements[0].elements.filter(element => element.name == "process")
    console.log("process", process);

    process.forEach(process => {
        fluxo.startEvent = process.elements.filter(element => element.name == "startEvent")
        fluxo.endEvent = process.elements.filter(element => element.name == "endEvent")
        fluxo.sequenceFlow = process.elements.filter(element => element.name == "sequenceFlow")
        fluxo.task = process.elements.filter(element => element.name == "task")
    });

    const bpm = {
        processType: processTypeToSave(props.processType, getFirstActivityId(fluxo.startEvent, fluxo.sequenceFlow), props.xml),
        activityTypes: activityTypeToSave(fluxo.task, props.processType.id),
        routes: routeToSave(fluxo.sequenceFlow),
    } as unknown as Bpm
    console.log(bpm);
    return bpm;
}

const activityTypeToSave = (itens: any, processTypeId: Number | null) => {
   return itens.map(item =>{
        return {
            id: item.attributes.id,
            name: item.attributes.name,
            type: "task",
            pageId: item.attributes.page,
            processTypeId: processTypeId
        } as unknown as ActivityType
    })
}

const routeToSave = (itens: any) => {
    const rotas = itens.map(item =>{
         return {
            id: item.attributes.id,
            name: item.attributes.name,
            nameKey: "",
            content: "",
            activity: item.attributes.sourceRef,
            nextActivity: item.attributes.targetRef
         } as unknown as Route
     })
 }

const processTypeToSave = (processType: ProcessType, firstActivityId: String, xml: String) => {
    processType.content = xml
    processType.version = processType.version++;
    processType.firstActivityId = firstActivityId;
    return processType
}

const getFirstActivityId = (startEvent: any, sequencesFlow: any) => {
    const rotaId = startEvent[0].elements[0].elements[0].text
    const rota = sequencesFlow.find(sequence => sequence.attributes.id == rotaId)
    return rota.attributes.targetRef
}

export function filterRoutes(rotas: any){
    rotas = rotas.filter((r) => !r.activity.includes("Event"))
}






export default processDiagram;