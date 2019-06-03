import React from 'react';
import './App.css';
import Nav from './Nav';

import {BrowserRouter, Route, Switch} from 'react-router-dom';

import User from './pages/User_module/User';
import UserDetails from './pages/User_module/UserDetails'
import Role from './pages/Role_module/Role';
import RoleDetails from './pages/Role_module/RoleDetails';
import Log from './pages/Log_module/Log';
import LogDetails from './pages/Log_module/LogDetails';
import Customer from './pages/Customer_module/Customer';
import CustomerDetails from './pages/Customer_module/CustomerDetails';
import Seat from './pages/Seat_module/Seat';
import SeatDetails from './pages/Seat_module/SeatDetails';
import Menu from './pages/Menu_module/Menu';
import MenuDetails from './pages/Menu_module/MenuDetails';
import Order from './pages/Order_module/Order';
import OrderDetails from './pages/Order_module/OrderDetails';


function App() {
  return (
    <div className="App">
      <header className="header">
        <h2>麻辣烫智能服务系统</h2>
      </header>
      <article className="content">
        <BrowserRouter>
          <div className="nav">
          <Nav />
          </div>
          <div className="content_right">
            <Switch>
              <Route path='/user' component={User} />
              <Route path='/userDetails' component={UserDetails} />
              <Route path='/role' component={Role} />
              <Route path='/roleDetails' component={RoleDetails} />
              <Route path='/log' component={Log} />
              <Route path='/logDetails' component={LogDetails} />
              <Route path='/customer' component={Customer} />
              <Route path='/customerDetails' component={CustomerDetails} />
              <Route path='/seat' component={Seat} />
              <Route path='/seatDetails' component={SeatDetails} />
              <Route path='/menu' component={Menu} />
              <Route path='/menuDetails' component={MenuDetails} />
              <Route path='/order' component={Order} />
              <Route path='/orderDetails' component={OrderDetails} />

            </Switch>
          </div>
        </BrowserRouter>
      </article>
    </div>
  );
}

export default App;
