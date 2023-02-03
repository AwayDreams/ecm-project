import { Route } from "@mui/icons-material";
import { elementAcceptingRef } from "@mui/utils";
import Notification from "../../components/Notification";
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
  

export const validaBpm = (bpm: Bpm): any => {
    if(bpm.processType.firstActivityId == null && bpm.processType.id != null){
        Notification.error("Necessario o evento de start!");
        return false;
    }

    for(const activity of bpm.activityTypes){
        if(activity.pageId == null){
            Notification.error(`A atividade ${activity.name} não tem pagina definida!`);
            return false;
        }
        if(bpm.routes.find(r => r.nextActivity == activity.id) == undefined){
            Notification.error(`A atividade ${activity.name} não pode ser alcançada no diagrama!`);
        }
    }

    
    return true;
}