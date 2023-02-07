import { LoadingButton } from "@mui/lab";
import { Box } from "@mui/material";
import { useCallback, useEffect, useState } from "react";
import { Body } from "../../components/Body";
import { useParams } from "react-router-dom";
import api from "../../api.json";
import Notification from "../../components/Notification";
import { useHistory } from 'react-router-dom';

type Props = {};

export const Process = (props: Props): JSX.Element => {
  let { id } = useParams();
  const [activityId, setActivityId] = useState<any>(id == "null" ? null : id);
  const [data, setData] = useState<any>();
  const [error, setError] = useState<Error | null>(null);
  const [loading, setLoading] = useState(true);

  const history = useHistory();

  useEffect(() => {
    if (id != "null") {
      setActivityId(id);
      getProcess(id);
    }
  }, [activityId]);

  const getProcess = async (id: Number) => {
    try {
      const options = {
        method: "GET",
      };
      const response = await fetch(api.Process.get + id, options);
      const data = await response.json();
      setData(data);
      console.log(data);
      setLoading(false);
    } catch (error: any) {
      setError(error);
      Notification.error(
        "Falha ao carregar os dados, tente novamente mais tarde."
      );
    }
  };

  const setProcess = useCallback(
    async (nextActivityId: String | null) => {
      setLoading(true);

      const processToSave = {
        id: data.id,
        processTypeId: data.processType.id,
        activityTypeId: nextActivityId
      }

      try {
        const options = {
          method: "PUT",
          body: JSON.stringify(processToSave),
          headers: {
            "Content-Type": "application/json",
          },
        };
        const response = await fetch(api.Process.save, options);
        console.log(response);
        history.push(`/processList`);
        
      } catch (error: any) {
        setError(error);
        Notification.error("Ocorreu um error ao avançar.");
        setLoading(false);
      }
    },
    [data]
  );

  return (
    <Body pageTitle={data ? data.activityType.name : "Carregando..."}>
      <Box sx={{ height: "80%", width: "100%" }}>
        <Box sx={{ height: "100%", width: "100%" }}>
          <Box
            sx={{ height: "100%", width: "100%", border: "solid 1px black" }}
          >
            {data ? (
              <div
                style={{ display: "table-caption" }}
                dangerouslySetInnerHTML={{
                  __html: data.activityType.page.content,
                }}
              />
            ) : (
              <div> Carregando...</div>
            )}
          </Box>
        </Box>
        <Box sx={{ padding: "10px", paddingLeft: "0px" }}>
          {data && data.activityType.routes ? (
            data.activityType.routes.map((element) => (
              <LoadingButton
                variant="contained"
                sx={{ padding: "5px", margin: "5px" }}
                onClick={() => {setProcess(element.nextActivity?.id)}}
                loading={false}
              >
                {element.name}
              </LoadingButton>
            ))
          ) : (
            <div> Carregando... </div>
          )}
        </Box>
      </Box>
    </Body>
  );
};
