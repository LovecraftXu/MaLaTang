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
            this.props.dispatch(saveData(values));
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

    render(){
        let { ids, obj, list, visible, loading } = this.props.orderState;
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
        //分页配置
        let pagination = {
            position:'bottom',
            pageSize:5,
            
        }
        // console.log(ids);
        return (
            <div className="order">
                <h2>用户管理</h2>
                <div className="btns">
                    <Button type="primary" className="btn" onClick={this.toAdd.bind(this)}>添加</Button>
                    <Button type="danger" className="btn" onClick = {this.batchDeleteByIds.bind(this,ids)}>批量下架</Button>
                </div>
                
               {/* 模态框 */}
               <Modal
                    title="添加"
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
                    <Column align="center" title="订单日期" dataIndex="orderDate" key="orderDate" />
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
                    <Column align="center" title="订单名" dataIndex="orderName" key="orderName" />

                    
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