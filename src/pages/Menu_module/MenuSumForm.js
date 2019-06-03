import { Form, Input} from 'antd';
import {connect} from 'react-redux'
import React from 'react';


class MenuSumForm extends React.Component {

  render() {

    const { getFieldDecorator } = this.props.form;
    getFieldDecorator("menuId");

    return (
        <div  className="menu_form2">
        
        <Form className="form">
      
        <Form.Item label="入库数量">
          {getFieldDecorator("menuSum" , {
            rules: [{ required: true, message: 'Please input  add Sum!' }],
          })( <Input placeholder="MenuSum" /> )}
        </Form.Item>
      </Form>
        </div>
    );
  }
}

const mapPropsToFields = (props) => {
  
    let obj = {};
    for(let key in props.initData){ 
        if("menuSum" === key)
        {
            obj[key] = Form.createFormField({value: null});
        } else {
            let val = props.initData[key]; 
            obj[key] = Form.createFormField({value: val})
        }
        
          
    }
    return obj;
}

let mapStateToProps = (state) =>{
  return state;
}

export default Form.create({
    mapPropsToFields
})(connect(mapStateToProps)(MenuSumForm));