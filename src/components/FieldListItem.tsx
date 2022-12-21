import { Box, Card, CardActions, CardContent, Collapse, IconButton, IconButtonProps, styled, Typography } from "@mui/material"
import DeleteIcon from '@mui/icons-material/Delete';
import { width } from "@mui/system";
import React from "react";
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { FieldTypeForm } from "./FieldTypeForm";
import EditIcon from '@mui/icons-material/Edit';

type Props = {
  content: String
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

  const [expanded, setExpanded] = React.useState(false);

  const handleExpandClick = () => {
    setExpanded(!expanded);
  };


  return (<Card sx={{ minWidth: 275, marginBottom: '10px' }}>
    <CardContent>
      <Box sx={{ display: 'inline-flex', alignItems: 'center', justifyContent: 'space-between', width: '100%' }}>
        <Typography variant="h5" component="div">
          {props.content}
        </Typography>
        <Box sx={{ display: 'inline-flex', alignItems: 'center' }}>
          <IconButton
            size="large"
            edge="end"
            color="primary"
            aria-label="profile"
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
        <FieldTypeForm />
      </CardContent>
    </Collapse>
  </Card>);
}