/*
 * @Description: In User Settings Edit
 * @Author: your name
 * @Date: 2019-05-28 22:54:06
 * @LastEditTime: 2019-08-17 18:12:40
 * @LastEditors: Please set LastEditors
 */
import React from 'react';
import { Card, Avatar, Icon } from 'antd';

class UserDetails extends React.Component {
   
    goBack(){
        this.props.history.goBack();
    }

    render(){
        let data = this.props.location.state;
        const {Meta} = Card;
        let title = data.custRealname+'的详细信息';
        return (
            <div className="user_details">
                {/* <h2>{data.userUsername}的详细信息</h2>
                <Button onClick={this.goBack.bind(this)}>返回</Button>
                <p>{JSON.stringify(data)}</p>
              <img alt="图片迷路了" src={data.photo} style={{width:"20%",border:"1px solid red",padding:"1em",borderRadius:"5px"}}/> */}
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
                    description={JSON.stringify(data)}
                    />
                </Card>

            </div>
        )
    }
    

}

export default UserDetails;