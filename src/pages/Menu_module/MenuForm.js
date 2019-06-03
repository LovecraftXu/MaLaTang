import { Form, Input, Upload, message, Button, Icon, } from 'antd';
import {connect} from 'react-redux'
import React from 'react';


class MenuForm extends React.Component {

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
    getFieldDecorator("menuId");
    getFieldDecorator("photo");
    getFieldDecorator("menuSum");
    getFieldDecorator("menuSales");

    return (
        <div  className="menu_form">
        
        <Form className="form">
        <Form.Item label="菜品名">
          {getFieldDecorator("menuName" , {
            rules: [{ required: true, message: 'Please input menu name!' }],
          })( <Input placeholder="MenuName" /> )}
        </Form.Item>
        <Form.Item label="价格">
          {getFieldDecorator("menuPrice" , {
            rules: [{ required: true, message: 'Please input  menuPrice!' }],
          })( <Input placeholder="MenuPrice" /> )}
        </Form.Item>
        <Form.Item label="菜品种类">
          {getFieldDecorator('menuType', {
            rules: [{ required: true, message: 'Please input menuType!' }],
          })( <Input placeholder="MenuType" /> )}
        </Form.Item>
        
        <Form.Item label="图片">
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
})(connect(mapStateToProps)(MenuForm));