import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';

type Props = {
    name: String,
    description: String,
}

export const MenuCard = (props: Props): JSX.Element => {
    return (
        <Card sx={{minWidth: 200}}>
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