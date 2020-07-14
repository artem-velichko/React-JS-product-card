import React from 'react'
import { BrowserRouter, Switch, Route } from 'react-router-dom'
import { Navbar } from './components/Navbar'
import { AddItem } from './pages/AddItem'
import { Edit } from './pages/Edit'
import List from './pages/List'
import { Home } from './pages/Home'
import { FirebaseState } from './context/firebase/FirebaseState'
import { Alert } from './components/Alert'
import { AlertState } from './context/alert/AlertState'

function App() {

    return (
      <FirebaseState>
          <BrowserRouter>
              <Navbar />
              <AlertState>
                <div className="container">
                  <Alert />
                  <Switch>
                    <Route path="/" exact component={Home} />
                    <Route path="/list" component={List} />
                    <Route path="/add_item" component={AddItem} />
                    <Route path="/edit" component={Edit} />
                  </Switch>
                </div>
              </AlertState>
          </BrowserRouter>
      </FirebaseState>
    )
  }
  
  export default App