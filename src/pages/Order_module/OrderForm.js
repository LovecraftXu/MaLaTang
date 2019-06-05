import { Form,  Select,  DatePicker } from 'antd';
import {connect} from 'react-redux'
import React from 'react';

import {
  reloadCustomer,
} from '../../store/customerReducer';

import {
  reloadNoPeopleSeat,
} from '../../store/seatReducer'
const {Option} = Select;

class OrderForm extends React.Component {
  
  componentWillMount(){
    this.props.dispatch(reloadCustomer());
    this.props.dispatch(reloadNoPeopleSeat());
  }

  render() {

    const config = {
      rules: [{ type: 'object', required: true, message: 'Please select time!' }],
    };

    const { getFieldDecorator } = this.props.form;
    let { list:cList } = this.props.customerState;
    let { list:sList } = this.props.seatState;
    getFieldDecorator("orderId");
    getFieldDecorator("orderAllprice");
    getFieldDecorator("orderName");
    return (
        <div  className="order_form">
        
        <Form className="form">
        <Form.Item label="订单状态">
          {getFieldDecorator("orderType" , {
            rules: [{ required: true, message: 'Please input orderType!' }],
          })( <Select placeholder="Select a option and change input text above" >
              <Option value="排队等餐">排队等餐</Option>   
              <Option value="待取餐">待取餐</Option>   
              <Option value="已取餐">已取餐</Option>   

          </Select> )}
        </Form.Item>
        
        <Form.Item label="订单日期">
        {getFieldDecorator('orderDate', config)(
            <DatePicker showTime format="YYYY-MM-DD HH:mm:ss" />,
          )}
        </Form.Item>

        <Form.Item label="桌子位置">
          {getFieldDecorator('orderSeatId', {
            rules: [{ required: true, message: 'Please select orderSeatPosition!' }],
          })( <Select placeholder="Select a option and change input text above" >
                {
                  sList.map((item)=>{
                    return <Option key={item.seatId} value={item.seatId}>{item.seatPosition}</Option>   
                  })
                }
       </Select> )}
        </Form.Item>
        <Form.Item label="下单人姓名">
          {getFieldDecorator('orderCustId', {
            rules: [{ required: true, message: 'Please select name!' }],
          })( <Select placeholder="Select a option and change input text above" >
                {
                  cList.map((item)=>{
                    return <Option key={item.custId} value={item.custId}>{item.custRealname}</Option>   
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
      if(key === "orderDate"){
        obj[key] = Form.createFormField({value: null })
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
})(connect(mapStateToProps)(OrderForm));