import { Box } from "@mui/material";
import { width } from "@mui/system";
import { Body } from "../../components/Body";
import { HeaderBpmEditor } from "../../components/HeaderBpmEditor";
import BpmnView from "./diagramViewer";
import "./styles.css";

export const BpmEditor = (): JSX.Element => {
  return (
      <Body pageTitle={"Editor BPM"} header={<HeaderBpmEditor />}>
        <Box sx={{width:'100%', height: '100%', border: 'solid 1px gray',}}>
          <BpmnView />
        </Box>
      </Body>
  );
}
