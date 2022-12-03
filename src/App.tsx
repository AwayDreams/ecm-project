import React, { useCallback, useEffect, useState } from 'react';
import logo from './logo.svg';
import './App.css';
import {Home} from './pages/Home/Home';
import {Login} from './pages/Login/Login';
import {Provider} from 'react-redux';
import store from './store/storeConfig';
import { PageHeader } from './components/PageHeader';
import { createTheme, ThemeProvider } from '@mui/material';
import { Menu } from './components/Menu';
import { Body } from './components/Body';

const darkTheme = createTheme({
  palette: {
    mode: 'dark',
    primary: {
      main: '#1976d2',
    },
  },
});

function App() {
  const [valor, setValor] = useState(1);
  const update = useCallback(() => {
    console.log("clickado");
    setValor(store.getState().slice3.min);
  },[])

  store.subscribe(()=> {
    setValor(store.getState().slice3.min);
  })
//<Login nome="Lucas" array={["Lucas", "Marcos", "Matheus", "maria"]}></Login>
  return (
    <ThemeProvider theme= {darkTheme}>
      <div className="App">
        <PageHeader nome="teste"></PageHeader>
        <Body>
          <Menu/>
        </Body>
      </div>
    </ThemeProvider>
    
  );
}

export default App;
