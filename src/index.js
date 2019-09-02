import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import Login from './Login';
import * as serviceWorker from './serviceWorker';
import store from './store';
import { Provider } from 'react-redux';


var userId = window.localStorage.getItem("userId");
var show = <Login/>;
console.log("没进id",userId);
if(userId){
    console.log("我有id",userId);
    // window.localStorage.removeItem("userId");
    // userId = window.localStorage.getItem("userId");
    // console.log("销毁id",userId);
    show = <App/>;
}

ReactDOM.render(
    <Provider store={store}>
        {/* <App /> */}
        { show }
    </Provider>
, 
document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
