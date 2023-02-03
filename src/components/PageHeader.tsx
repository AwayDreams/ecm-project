import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';

type Props = {
    nome: String
}

export const PageHeader = (props: Props): JSX.Element => {
    return (
        <Box sx={{ flexGrow: 1 }}>
          <AppBar position="static">
            <Toolbar>
              <IconButton
                size="large"
                edge="start"
                color="inherit"
                aria-label="menu"
                sx={{ mr: 2 }}
              >
                <MenuIcon />
              </IconButton>
              <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
                Plataforma BPM
              </Typography>
              <Button color="inherit">Lucas Coelho de Faria</Button>
              <IconButton
                size="large"
                edge="end"
                color="default"
                aria-label="profile"
              >
                <AccountCircleIcon />
              </IconButton>
            </Toolbar>
          </AppBar>
        </Box>
      );
}