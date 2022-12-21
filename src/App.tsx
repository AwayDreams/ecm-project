import React, { useCallback, useEffect, useState } from 'react';
import logo from './logo.svg';
import './App.css';
import { Home } from './pages/Home/Home';
import { Login } from './pages/Login/Login';
import { Provider } from 'react-redux';
import store from './store/storeConfig';
import { PageHeader } from './components/PageHeader';
import { createTheme, CssBaseline, ThemeProvider } from '@mui/material';
import { Menu } from './components/Menu';
import { Body } from './components/Body';
import { ListMenu } from './pages/ListMenu/ListMenu';
import { DataTypeMenu } from './pages/DataTypeMenu/DataTypeMenu';
import { FieldTypeForm } from './components/FieldTypeForm';
import { FieldList } from './components/FieldList';
import { CreateUserMenu } from './pages/CreateUserMenu/CreateUserMenu';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import { BpmEditor } from './pages/BpmEditor/BpmEditor';
import { FormEditor } from './pages/FormEditor/FormEditor';



const darkTheme = createTheme({
  palette: {
    primary: {
      main: '#1976d2'
    },
  },
});

function App() {
  const [valor, setValor] = useState(1);
  const update = useCallback(() => {
    console.log("clickado");
    setValor(store.getState().slice3.min);
  }, [])

  store.subscribe(() => {
    setValor(store.getState().slice3.min);
  })
  //<Login nome="Lucas" array={["Lucas", "Marcos", "Matheus", "maria"]}></Login>
  /*
  <ThemeProvider theme= {darkTheme}>
        <CssBaseline />
        <div className="App">
          <PageHeader nome='teste'></PageHeader>
          
        </div>
      </ThemeProvider>
  */
  return (
    <Router>
      <Switch>
        <Route exact path="/">
          <Login nome={""} array={[]}></Login>
        </Route>
        <Route path="/Home">
          <Home></Home>
        </Route>
        <Route path="/CreateUser">
          <CreateUserMenu></CreateUserMenu>
        </Route>
        <Route path="/bpmEditor">
          <BpmEditor></BpmEditor>
        </Route>
        <Route path="/FormEditor">
          <FormEditor></FormEditor>
        </Route>
      </Switch>
    </Router>
  );
}

export default App;
