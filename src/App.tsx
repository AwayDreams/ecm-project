import React, { useCallback, useState } from 'react';
import './App.css';
import { Home } from './pages/Home/Home';
import { Login } from './pages/Login/Login';
import store from './store/storeConfig';
import { createTheme, CssBaseline, ThemeProvider } from '@mui/material';
import { PageList } from './pages/PageList/PageList';
import { DataTypeMenu } from './pages/DataTypeMenu/DataTypeMenu';
import { CreateUserMenu } from './pages/CreateUserMenu/CreateUserMenu';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import { BpmEditor } from './pages/BpmEditor/BpmEditor';
import { FormEditor } from './pages/FormEditor/FormEditor';
import { Transicao } from './components/Transicao';
import { ProcessList } from './pages/ProcessList/ProcessList';
import { DataTypeList } from './pages/DataTypeList/DataTypeList';
import { Activity } from './pages/Activity/Activity';



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
            <Transicao>
              <BpmEditor></BpmEditor>
            </Transicao>
          </Route>
          <Route path="/formEditor">
            <Transicao>
                <FormEditor></FormEditor>
            </Transicao>
          </Route>
          <Route path="/DataTypeMenu">
            <DataTypeMenu dataTypeId={null}></DataTypeMenu>
          </Route>
          <Route path="/pageList">
            <Transicao>
              <PageList></PageList>
            </Transicao>
          </Route>
          <Route path="/processList">
            <Transicao>
              <ProcessList></ProcessList>
            </Transicao>
          </Route>
          <Route path="/dataTypeList">
            <Transicao>
              <DataTypeList></DataTypeList>
            </Transicao>
          </Route>
          <Route path="/activity">
            <Transicao>
              <Activity></Activity>
            </Transicao>
          </Route>
        </Switch>
      </Router>
  );
}

export default App;
