/*
 * @Description: In User Settings Edit
 * @Author: your name
 * @Date: 2019-05-30 19:54:44
 * @LastEditTime: 2019-08-17 18:31:34
 * @LastEditors: Please set LastEditors
 */
import React from 'react';
import {  Card, Avatar, Icon } from 'antd';

class MenuDetails extends React.Component {
   
    goBack(){
        this.props.history.goBack();
    }

    render(){
        let data = this.props.location.state;
        const {Meta} = Card;
        let title = data.menuName+'的详细信息';
        return (
            <div className="menu_details">
                {/* <h2>{data.menuName}的详细信息</h2>
                <Button onClick={this.goBack.bind(this)}>返回</Button>
                <p>{JSON.stringify(data)}</p>
              <img alt="图片迷路了" src={data.photo} style={{width:"30%",border:"1px solid red",padding:"1em",borderRadius:"5px"}}/> */}
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
                            <p>菜名： {data.menuName}</p>
                            <p>单价： {data.menuPrice}元</p>
                            <p>库存： {data.menuSum}</p>
                            <p>已售数量： {data.menuSales}</p>
                        </div>
                    }
                    />
                </Card>

            </div>
        )
    }
    

}

export default MenuDetails;