import { xml2json } from 'xml-js';
//Nao pode ter 2 raias
//Nao pode ter 2 start
type Process = {
    startEvent: any;
    endEvent: any;
    sequenceFlow: any;
    task: any;
}
export const processDiagram = (xml: string): any => {

    const fluxo = {
        startEvent: null,
        endEvent: null,
        sequenceFlow: null,
        task: null
    } as Process;

    const jsonString = xml2json(xml);
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

    console.log("fluxo", fluxo)
}

export default processDiagram;