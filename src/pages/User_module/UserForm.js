import { Form, Input, Upload, message, Button, Icon, Select } from 'antd';
import {connect} from 'react-redux'
import React from 'react';

import {
  reloadRole
} from '../../store/roleReducer';
const {Option} = Select;

class UserForm extends React.Component {
  
  componentWillMount(){
    this.props.dispatch(reloadRole());
  }

  render() {
    
    const props = {
      name: 'file',
      action: 'http://134.175.154.93:8099/manager/file/upload',
      onChange:(info) => {
        if (info.file.status !== 'uploading') {
          console.log(info.file.response.data);
          // 上传附件服务器返回的数据
          let data = info.file.response.data;
          let url = "http://134.175.154.93:8888/"+data.groupname+"/"+data.id;
          //将url设置到表单中
          this.props.form.setFieldsValue({
            photo:url
          })
        }
        if (info.file.status === 'done') {
          message.success(`${info.file.name} file uploaded successfully`);
        } else if (info.file.status === 'error') {
          message.error(`${info.file.name} file upload failed.`);
        }
      },
    };

    const { getFieldDecorator } = this.props.form;
    let { list } = this.props.roleState;
    getFieldDecorator("userId");
    getFieldDecorator("photo");
    return (
        <div  className="user_form">
        
        <Form className="form">
        <Form.Item label="用户名">
          {getFieldDecorator("userUsername" , {
            rules: [{ required: true, message: 'Please input your username!' }],
          })( <Input placeholder="Username" /> )}
        </Form.Item>
        <Form.Item label="角色名">
          {getFieldDecorator('userRoleId', {
            rules: [{ required: true, message: 'Please input your rolename!' }],
          })( <Select placeholder="Select a option and change input text above" >
                {
                  list.map((item)=>{
                    return <Option key={item.sysRoleId} value={item.sysRoleId}>{item.sysRoleName}</Option>   
                  })
                }
       </Select> )}
        </Form.Item>
        <Form.Item label="密码">
          {getFieldDecorator('userPassword', {
            rules: [{ required: true, message: 'Please input your password!' }],
          })( <Input type="password" placeholder="Password" /> )}
        </Form.Item>
        <Form.Item label="头像">
          <Upload {...props}>
            <Button>
              <Icon type="upload" /> 
            </Button>
          </Upload>
        </Form.Item>
      </Form>
        </div>
    );
  }
}

const mapPropsToFields = (props) => {
    let obj = {};
    for(let key in props.initData){
        let val = props.initData[key]; 
        obj[key] = Form.createFormField({value: val})
    }
    return obj;
}


let mapStateToProps = (state) =>{
  return state;
}


export default Form.create({
    mapPropsToFields
})(connect(mapStateToProps)(UserForm));