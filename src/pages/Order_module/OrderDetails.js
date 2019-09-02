/*
 * @Description: In User Settings Edit
 * @Author: your name
 * @Date: 2019-05-31 17:05:53
 * @LastEditTime: 2019-08-17 18:26:50
 * @LastEditors: Please set LastEditors
 */
import React from 'react';
import { Card, Avatar, Icon } from 'antd';

class OrderDetails extends React.Component {
   
    goBack(){
        this.props.history.goBack();
    }

    //时间戳转日期  没有时间默认为1970-01-1 8:0:0
    timestampToTime(timestamp) {
        let date = new Date(timestamp);//时间戳为10位需*1000，时间戳为13位的话不需乘1000    
        let Y = date.getFullYear() + '-';      
        let M = (date.getMonth()+1 < 10 ? '0'+(date.getMonth()+1) : date.getMonth()+1) + '-';      
        let D = date.getDate() + ' ';     
        let h = date.getHours() + ':';
        let m = date.getMinutes() + ':';
        let s = date.getSeconds();
         return Y+M+D+h+m+s;
    }

    render(){
        let data = this.props.location.state;
        const {Meta} = Card;
        // let title = data.custRealname+'的详细信息';
        return (
            <div className="order_details">
                
                <Card 
                    style={{ width: 300, margin: '0 auto' }}
                    // cover={
                    // <img
                    //     alt="图片未加载"
                    //     src={data.photo}
                    // />
                    // }
                    actions={[
                    <Icon type="left-circle" onClick={this.goBack.bind(this)} />,
                    <Icon type="right-circle" onClick={this.goBack.bind(this)}/>,
                    ]}
                >
                    <Meta
                    avatar={<Avatar src={data.photo} />}
                    title={data.orderName}
                    description={ 
                        <div>
                            <p>订单编号： {data.orderId} </p>
                            <p>订单状态： {data.orderType} </p>
                            
                            <p>下单日期： { this.timestampToTime(data.orderDate) } </p>
                            <p>下单桌位： {data.seat.seatPosition} </p>
                            <p>下单人： {data.customer.custRealname} </p>
                            <p>总价： {data.orderAllprice}元 </p>
                        </div>
                    }
                    />
                </Card>
              
            </div>
        )
    }
    

}

export default OrderDetails;