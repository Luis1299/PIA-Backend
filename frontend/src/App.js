import React, { useContext } from 'react'
import {BrowserRouter as Router, Switch, Route, Redirect} from 'react-router-dom'
import { UserContext, UserProvider } from './context/UserContext.jsx'

import LoginScreen from './screens/Login.jsx'
import RegisterScreen from './screens/Register.jsx'

import UsersScreen from './screens/Usuarios.jsx'
import AddUserScreen from './screens/addUser.jsx'

function Rutas(){
  
  const {isLogedIn} = useContext(UserContext)

  if(isLogedIn()){
    return(
      <Switch>
        <Route exact path="/users" component={UsersScreen}/>
        <Route exact path="/addUser" component={AddUserScreen}/>
        <Route path="*">
          <Redirect to="/users"></Redirect>
        </Route>
      </Switch>
    )
  }

  return (
    <Switch>
      <Route exact path="/login" component={LoginScreen}/>
      <Route exact path="/register" component={RegisterScreen}/>
      <Route path="*">
          <Redirect to="/login"></Redirect>
        </Route>
    </Switch>
  )
}


function App() {
  return (
    <UserProvider>
      <Router>
        <div className="App">
            <Rutas/>
        </div>
      </Router>
    </UserProvider>
  );
}

export default App