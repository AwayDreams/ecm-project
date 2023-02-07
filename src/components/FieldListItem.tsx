import { Box, Card, CardActions, CardContent, Collapse, IconButton, IconButtonProps, styled, Typography } from "@mui/material"
import DeleteIcon from '@mui/icons-material/Delete';
import React, { useEffect, useState } from "react";
import { FieldTypeForm } from "./FieldTypeForm";
import EditIcon from '@mui/icons-material/Edit';

type Props = {
  id: Number,
  dataTypeId: Number,
  expanded: boolean,
  name: String,
  tipo: String
  deleteFieldTypeCallback: Function
}

interface ExpandMoreProps extends IconButtonProps {
  expand: boolean;
}

const ExpandMore = styled((props: ExpandMoreProps) => {
  const { expand, ...other } = props;
  return <IconButton {...other} />;
})(({ theme, expand }) => ({
  transform: !expand ? 'rotate(0deg)' : 'rotate(180deg)',
  marginLeft: 'auto',
  transition: theme.transitions.create('transform', {
    duration: theme.transitions.duration.shortest,
  }),
}));

export const FieldListItem = (props: Props): JSX.Element => {
  const [name, setName] = useState<String>("");
  const [expanded, setExpanded] = useState(false);


  useEffect(() => {
    console.log("props", props);
    setName(props.name);
    if(props.expanded) setExpanded(!expanded);
  }, [])

  const handleExpandClick = () => {
    setExpanded(!expanded);
  };

  return (<Card sx={{ minWidth: 275, marginBottom: '10px' }}>
    <CardContent>
      <Box sx={{ display: 'inline-flex', alignItems: 'center', justifyContent: 'space-between', width: '100%' }}>
        <Typography variant="h5" component="div">
          {name}
        </Typography>
        <Box sx={{ display: 'inline-flex', alignItems: 'center' }}>
          <IconButton
            size="large"
            edge="end"
            color="primary"
            aria-label="profile"
            onClick={() => {props.deleteFieldTypeCallback(props.id)}}
          >
            <DeleteIcon />
          </IconButton>
          <CardActions disableSpacing>
            <ExpandMore
              expand={expanded}
              onClick={handleExpandClick}
              aria-expanded={expanded}
              aria-label="show more"
            >
              <EditIcon />
            </ExpandMore>
          </CardActions>
        </Box>
      </Box>
    </CardContent>
    <Collapse in={expanded} timeout="auto" unmountOnExit>
      <CardContent>
        <FieldTypeForm FieldType={{id: props.id, dataTypeId: props.dataTypeId, name: name, tipo: props.tipo}} setNameCallback={setName} />
      </CardContent>
    </Collapse>
  </Card>);
}