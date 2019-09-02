/*
 * @Description: In User Settings Edit
 * @Author: your name
 * @Date: 2019-05-28 20:10:18
 * @LastEditTime: 2019-09-02 12:25:42
 * @LastEditors: Please set LastEditors
 */
import React from 'react';
import './App.css';
import Nav from './Nav';

import { Button } from 'antd';

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
import Shopcart from './pages/Shopcart_module/Shopcart';
import ShopcartDetails from './pages/Shopcart_module/ShopcartDetails';

function exit(){
  window.localStorage.removeItem("userId");
  window.location.href = "/";
  console.log("销毁id")
}

function App() {
  let userName = window.localStorage.getItem("userName");
  return (
    <div className="App">
      <header className="header">
        <span>欢迎您,{userName}</span>
        <h2>麻辣烫服务管理系统</h2>
        <Button type="primary"  onClick = {() => exit()}>注销</Button>
      </header>
      <article className="content">
        <BrowserRouter>
          <div className="nav">
          <Nav />
          </div>    
            <div className="content_right">
              <div className="container">
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
                <Route path='/shopcart' component={Shopcart} />
                <Route path='/shopcartDetails' component={ShopcartDetails} />
              </Switch>
              </div>
          </div>
        </BrowserRouter>
      </article>
    </div>
  );
}

export default App;
