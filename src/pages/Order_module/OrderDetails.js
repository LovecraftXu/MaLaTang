import React from 'react';
import { Button } from 'antd';

class OrderDetails extends React.Component {
   
    goBack(){
        this.props.history.goBack();
    }

    render(){
        let data = this.props.location.state;
        return (
            <div className="order_details">
                <h2>订单详细信息</h2>
                <Button onClick={this.goBack.bind(this)}>返回</Button>
                <p>{JSON.stringify(data)}</p>
              {/* <img alt="图片迷路了" src={data.photo} style={{width:"20%",border:"1px solid red",padding:"1em",borderRadius:"5px"}}/> */}
            </div>
        )
    }
    

}

export default OrderDetails;