import { Form, Input, Select } from 'antd';
import {connect} from 'react-redux';

import React from 'react';



import {
  reloadMenu,
} from '../../store/menuReducer';

import {
  reloadOrder,
} from '../../store/orderReducer';

const { Option } = Select;

class ShopcartForm extends React.Component {

  componentWillMount(){
    this.props.dispatch(reloadMenu());
    this.props.dispatch(reloadOrder());
  }

  render() {
    
    
    const { getFieldDecorator } = this.props.form;
    let { list:mList } = this.props.menuState;
    let { list:oList } = this.props.orderState;
    getFieldDecorator("shopMenuId");
    getFieldDecorator("shopPrice");
    return (
        <div  className="shopcart_form">
        
        <Form className="form">
        <Form.Item label="菜品名称">
          {getFieldDecorator('shopMenuId', {
            rules: [{ required: true, message: 'Please select shopMenuId!' }],
          })( <Select placeholder="Select a option and change input text above" >
                {
                  mList.map((item)=>{
                    return <Option key={item.menuId} value={item.menuId}>{item.menuName}</Option>   
                  })
                }
       </Select> )}
        </Form.Item>
        
        <Form.Item label="数量">
          {getFieldDecorator("shopNumber" , {
            rules: [{ required: true, message: 'Please input  shopNumber!' }],
          })( <Input placeholder="shopNumber" /> )}
        </Form.Item>
        <Form.Item label="订单名">
          {getFieldDecorator('shopOrderId', {
            rules: [{ required: true, message: 'Please select shopOrder name!' }],
          })( <Select placeholder="Select a option and change input text above" >
                {
                  oList.map((item)=>{
                    return <Option key={item.orderId} value={item.orderId}>{item.orderName}</Option>   
                  })
                }
       </Select> )}
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
})(connect(mapStateToProps)(ShopcartForm));