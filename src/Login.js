/*
 * @Description: In User Settings Edit
 * @Author: your name
 * @Date: 2019-06-09 14:36:15
 * @LastEditTime: 2019-09-02 21:33:14
 * @LastEditors: Please set LastEditors
 */
import React from 'react';
import { Form, Icon, Input, Button, message } from 'antd';
import { connect } from 'react-redux';

import './Login.css';
import axios from './http';

class Login extends React.Component {

    handleSubmit = e => {
        console.log("手机",this.props);  
        e.preventDefault();
        this.props.form.validateFields((err, values) => {
          if (!err) {
            axios.post(
                "/user/login",
                values
                ).then((result)=>{
                    console.log(result.data)
                    if(result.status === 200){
                        message.success(result.statusText);
                        window.localStorage.setItem("userId",result.data.userId);
                        window.localStorage.setItem("userName",result.data.userUsername);
                        window.localStorage.setItem("roleId",result.data.userRoleId);
                        console.log("id已存在storage");
                        window.location.href = '/mlt';

                    } else {
                        message.success(result.statusText);
                    }

                })
          }
        });
    };



    render(){
        const { getFieldDecorator } = this.props.form;
        return(
            <div className="login">
                
                
                <Form onSubmit={this.handleSubmit} className="Loginform">
                    <span className="title">麻辣烫管理系统</span>
                    <Form.Item>
                    {getFieldDecorator('userUsername', {
                        rules: [{ required: true, message: 'Please input your username!' }],
                    })(
                        <Input
                        prefix={<Icon type="user" style={{ color: 'rgba(0,0,0,.25)' }} />}
                        placeholder="Username"
                        />,
                    )}
                    </Form.Item>
                    <Form.Item>
                    {getFieldDecorator('userPassword', {
                        rules: [{ required: true, message: 'Please input your Password!' }],
                    })(
                        <Input
                        prefix={<Icon type="lock" style={{ color: 'rgba(0,0,0,.25)' }} />}
                        type="password"
                        placeholder="Password"
                        />,
                    )}
                    </Form.Item>
                    <Form.Item>
                    <Button type="primary" block htmlType="submit" className="login-form-button">
                        登录
                    </Button>
                    {/* 禁止注册，因为管理人员的新增只能是内部人员添加 */}
                    {/* <Button type="gost" block  className="register-form-button">
                        立即注册
                    </Button> */}
                    </Form.Item>

                    <div className="copyright-container">
                        <span className="copyright">
                            &copy;王豆豆毕设
                        </span>
                    </div>
                </Form>
                
            </div>
        )
    }
}

export default connect(state=>state)(Form.create()(Login));
