/*
 * @Description: In User Settings Edit
 * @Author: your name
 * @Date: 2019-05-31 17:05:53
 * @LastEditTime: 2019-09-02 13:39:01
 * @LastEditors: Please set LastEditors
 */
import React from 'react';
import { Button, Table, Divider, Icon, Modal, } from 'antd';
import { connect } from 'react-redux';

import OrderForm from './OrderForm';

import { 
    reloadOrder,
    deleteById,
    showModal,
    closeModal, 
    saveData,
    editData,
    getIds,
    deleteByIds,
    clearModal,

} from '../../store/orderReducer'




class Order extends React.Component {

    componentWillMount(){
        this.props.dispatch(reloadOrder());
    }

    //点击添加执行函数
    toAdd = () => {
        this.props.dispatch(showModal());
        this.props.dispatch(clearModal()) 
    }

    //点击取消
    handleCancel = e => {
        this.props.dispatch(closeModal());
    };

    //提交
    handleOk = e => {
        e.preventDefault();
        this.form.validateFields((err, values) => {
          if (!err) {
            let time=values.orderDate._d.getTime();
            this.props.dispatch(saveData({...values,orderDate:time}));
          } 
        });    
    }

    //查看详细信息
    toDetails(record){
        this.props.history.push({
            pathname:'/orderDetails',
            state:record
        });
    }
    
    //点击修改执行函数
    toEdit = (record) =>{
        this.props.dispatch(showModal());
        this.props.dispatch(editData(record));
    }

    //点击删除按钮后执行
    toDelete = (id) => {
        Modal.confirm({
          title: '是否确定删除本行?',
          content: 'Some descriptions',
          okText: '是',
          okType: 'danger',
          cancelText: '否',
          onOk:() => {
            this.props.dispatch(deleteById(id));      
        },
          onCancel() {
            
          },
        });
    }

    //点击批量删除按钮后执行
    batchDeleteByIds(ids){
        Modal.confirm({
            title: '是否确定批量删除数据?',
            content: 'Some descriptions',
            okText: '是',
            okType: 'danger',
            cancelText: '否',
            onOk:() => {
                this.props.dispatch(deleteByIds(ids));
          },
            onCancel() {
              
            },
          });
    }


    //ref函数
    FormRefs = (form) =>{
        this.form = form;
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
        // this.props.dispatch(reloadOrder());
        let { ids, obj, list, visible, loading, title } = this.props.orderState;
        let { Column } = Table;
        var rowSelection = {
            onChange: (selectedRowKeys, selectedRows) => {
                this.props.dispatch(getIds(selectedRowKeys));
            },
            getCheckboxProps: record => ({
                disabled: record.name === 'Disabled Order', // Column configuration not to be checked
                name: record.name,
              }),
          };
        //   parseInt(number)==number
        //分页配置
        // console.log("订单数量",list.length);
        // var pageCurrent = 0;
        // var page = list.length % 10;
        // if(parseInt(page) == page){
        //     pageCurrent = list.length/10;
        //     console.log(1)
        // } else {
        //     pageCurrent = list.length/10+1;
        //     console.log(12,pageCurrent)
        // }
        // console.log("默认订单页",parseInt(pageCurrent));
        // pageCurrent = parseInt(pageCurrent);
        let pagination = {
            position:'bottom',
            pageSize:10,
            defaultCurrent:6,
        }
        // console.log(ids);
        return (
            <div className="order">
                <h2>订单管理</h2>
                <div className="btns">
                    <Button type="primary" className="btn" onClick={this.toAdd.bind(this)}>添加订单</Button>
                    <Button type="danger" className="btn" onClick = {this.batchDeleteByIds.bind(this,ids)}>批量删除</Button>
                </div>
                
               {/* 模态框 */}
               <Modal
                    title={title}
                    visible={visible}
                    onOk={this.handleOk}
                    onCancel={this.handleCancel}
                    >
                    <OrderForm initData={obj} ref={this.FormRefs} />
                </Modal>

                <Table rowKey="orderId" 
                dataSource={list} 
                bordered={true} 
                rowSelection={rowSelection} 
                size="small" 
                pagination={pagination} 
                loading={loading}>
                    <Column align="center" title="订单状态" dataIndex="orderType" key="orderType" />
                    <Column align="center" title="订单总价" dataIndex="orderAllprice" key="orderAllprice" />
                    <Column align="center" title="订单时间" key="orderDate" render={(record) => (
                        <span>
                        {this.timestampToTime(record.orderDate)}
                        </span>
                    )} />
                    <Column align="center" title="桌子位置" key="orderSeatId" render={(record) => (
                        <span>
                        {record.seat.seatPosition}
                        </span>
                    )} />
                    <Column align="center" title="下单人姓名" key="orderCustId" render={(record) => (
                        <span>
                        {record.customer.custRealname}
                        </span>
                    )} />
                    {/* <Column align="center" title="订单名" dataIndex="orderName" key="orderName" /> */}

                    
                    <Column align="center"
                    title="操作"
                    key="action"
                    render={(text, record) => (
                        <span>
                        <Icon type="delete" onClick={this.toDelete.bind(this,record.orderId)}></Icon>
                        <Divider type="vertical" />
                        <Icon type="edit"  onClick = {this.toEdit.bind(this,record)}></Icon>
                        <Divider type="vertical" />
                        <Icon type="eye" onClick={this.toDetails.bind(this,record)}></Icon>
                        </span>
                    )}
                    />
                </Table>
            </div>
        )
    }
}

let mapStateToProps = (state) =>{
    return state;
}


export default connect(mapStateToProps)(Order);