/*
 * @Description: In User Settings Edit
 * @Author: your name
 * @Date: 2019-05-30 17:00:38
 * @LastEditTime: 2019-08-17 18:34:19
 * @LastEditors: Please set LastEditors
 */
import React from 'react';
import {  Card, Avatar, Icon } from 'antd';


class CustomerDetails extends React.Component {
   
    goBack(){
        this.props.history.goBack();
    }

    render(){
        let data = this.props.location.state;
        const {Meta} = Card;
        let title = data.custRealname+'的详细信息';
        return (
            <div className="customer_details">
                {JSON.stringify(data)}
                <Card 
                    style={{ width: 300, margin: '0 auto' }}
                    cover={
                    <img
                        alt="图片未加载"
                        src={data.photo}
                    />
                    }
                    actions={[
                    <Icon type="left-circle" onClick={this.goBack.bind(this)} />,
                    <Icon type="right-circle" onClick={this.goBack.bind(this)}/>,
                    ]}
                >
                    <Meta
                    avatar={<Avatar src={data.photo} />}
                    title={title}
                    description={
                        <div>
                            <p>顾客姓名： {data.custRealname}</p>
                            <p>顾客类型： {data.custType}</p>
                            <p>顾客满意度： {data.custSatisfy}</p>
                        </div>
                    }
                    />
                </Card>

            </div>
        )
    }
    

}

export default CustomerDetails;