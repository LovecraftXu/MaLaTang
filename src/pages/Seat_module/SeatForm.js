import { Form, Input, Select } from 'antd';
import {connect} from 'react-redux'
import React from 'react';

const { Option } = Select;

class CustomerForm extends React.Component {

  render() {

    const { getFieldDecorator } = this.props.form;
    getFieldDecorator("seatId");
    return (
        <div  className="seat_form">
        
        <Form className="form">
        <Form.Item label="位置">
          {getFieldDecorator("seatPosition" , {
            rules: [{ required: true, message: 'Please input your seatPosition!' }],
          })( <Input placeholder="SeatPosition" /> )}
        </Form.Item>
        <Form.Item label="桌位状态">
          {getFieldDecorator('seatType', {
            rules: [{ required: true, message: 'Please select your seatType!' }],
          })( <Select placeholder="Select a option and change input text above" >
                <Option  value="占用">占用</Option>             
                <Option  value="空闲">空闲</Option>             
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
})(connect(mapStateToProps)(CustomerForm));