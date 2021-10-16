import React from 'react';
import './index.css';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import Home from './views/Home'
import Calendar from './views/Calendar'
import CalendarTodo from './views/CalendarTodo'
import Login from './views/Login'
import Register from './views/Register'
import Dashboard from './views/Dashboard'

const App: React.FC = () => {
  return (
    <Router>
      <Switch>
        <Route exact path="/">
          <Home />
        </Route>
        <Route path="/calendar">
          <Calendar />
        </Route>
        <Route path="/calendary/:calendarDate">
          <CalendarTodo />
        </Route>
        <Route path="/login">
          <Login />
        </Route>
        <Route path="/register">
          <Register />
        </Route>
        <Route path="/dashboard">
          <Dashboard />
        </Route>
      </Switch>
    </Router>
  );
}

export default App;
