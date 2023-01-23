import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import { useHistory } from 'react-router-dom';

type Props = {
    name: String,
    description: String,
    accessRoute: string
}

export const MenuCard = (props: Props): JSX.Element => {
  const history = useHistory();

    return (
        <Card sx={{minWidth: 200}} onClick={() => history.push(props.accessRoute)}>
          <CardContent>
            <Typography sx={{ fontSize: 24 }} color="text.secondary" gutterBottom>
              {props.name}
            </Typography>
            <Typography variant="body2">
              {props.description}
            </Typography>
          </CardContent>
        </Card>
    );
}