import './App.css';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import LandingPage from './components/LandingPage'
import Home from './components/Home'
import ActivityCreate from './components/ActivityCreate';

function App() {
  return (
    <BrowserRouter>
     <div className="App">
       <Switch>
    <Route exact path='/' component = {LandingPage} />
    <Route exact path='/home' component = {Home} />
    <Route exact path='/activity' component = {ActivityCreate} />

       </Switch>
      
    </div>
    </BrowserRouter>
   
  );
}

export default App;
