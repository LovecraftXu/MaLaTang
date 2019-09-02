/*
 * @Description: In User Settings Edit
 * @Author: your name
 * @Date: 2019-05-30 19:54:44
 * @LastEditTime: 2019-09-02 13:31:01
 * @LastEditors: Please set LastEditors
 */
import React from 'react';

import { Button, Table, Divider, Icon, Modal} from 'antd';
import { connect } from 'react-redux';

import MenuForm from './MenuForm';
import MenuSumForm from './MenuSumForm';

import { 
    reloadMenu,
    deleteById,
    showModal,
    closeModal, 
    saveData,
    editData,
    getIds,
    deleteByIds,
    clearModal,
    clearModal2,
    showModal2,
    closeModal2,
    saveData2,
    editData2,

} from '../../store/menuReducer'



class Menu extends React.Component {

    componentWillMount(){
        this.props.dispatch(reloadMenu());
    }

    //点击添加执行函数
    toAdd = () => {
        this.props.dispatch(clearModal());
        this.props.dispatch(showModal());     
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

     //入库
     toAddStore = (record) => {    
        this.props.dispatch(clearModal2());
        this.props.dispatch(showModal2()); 
        this.props.dispatch(editData2(record)); 
    }

    //点击取消
    handleCancel2 = e => {
        this.props.dispatch(closeModal2());
    };

    //提交
    handleOk2 = e => {
        e.preventDefault();
        this.form.validateFields((err, values2) => {
          if (!err) {
            this.props.dispatch(saveData2(values2));
          } 
        });    
    }

    //查看详细信息
    toDetails(record){
        this.props.history.push({
            pathname:'/menuDetails',
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
    FormRefs = (form1) =>{
        this.form = form1;
    }

    //ref函数
    FormRefs2 = (form2) =>{
        this.form = form2;
    }

    render(){
        let { ids, obj, list, visible, loading, visible2, obj2, title } = this.props.menuState;
        let { Column } = Table;
        var rowSelection = {
            onChange: (selectedRowKeys, selectedRows) => {
                this.props.dispatch(getIds(selectedRowKeys));
            },
            getCheckboxProps: record => ({
                disabled: record.name === 'Disabled Menu', // Column configuration not to be checked
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
            <div className="menu">
                <h2>菜单管理</h2>
                <div className="btns">
                    <Button type="primary" className="btn" onClick={this.toAdd.bind(this)}>添加菜品</Button>
                    <Button type="danger" className="btn" onClick = {this.batchDeleteByIds.bind(this,ids)}>批量下架</Button>
                </div>
                
               {/* 模态框 */}
               <Modal
                    title={title}
                    visible={visible}
                    onOk={this.handleOk}
                    onCancel={this.handleCancel}
                    >
                    <MenuForm initData={obj} ref={this.FormRefs} />
                </Modal>

                <Modal
                    title="入库"
                    visible={visible2}
                    onOk={this.handleOk2}
                    onCancel={this.handleCancel2}
                    >
                    <MenuSumForm initData={obj2}  ref={this.FormRefs2} />
                </Modal>     

                <Table rowKey="menuId" 
                dataSource={list} 
                bordered={true} 
                rowSelection={rowSelection} 
                size="small" 
                pagination={pagination} 
                loading={loading}>
                    <Column align="center" title="菜品名" dataIndex="menuName" key="menuName" />
                    <Column align="center" title="价格" dataIndex="menuPrice" key="menuPrice" />
                    <Column align="center" title="菜品种类" dataIndex="menuType" key="menuType" />
                    <Column align="center" title="库存" dataIndex="menuSum" key="menuSum" />
                    <Column align="center" title="销量" dataIndex="menuSales" key="menuSales" />
                    

                    <Column align="center"
                    title="操作"
                    key="action"
                    render={(text, record) => (
                        <span>
                        <Icon type="delete" onClick={this.toDelete.bind(this,record.menuId)}></Icon>
                        <Divider type="vertical" />
                        <Icon type="edit"  onClick = {this.toEdit.bind(this,record)}></Icon>
                        <Divider type="vertical" />
                        <Icon type="eye" onClick={this.toDetails.bind(this,record)}></Icon>
                        <Divider type="vertical" />
                        <Icon type="plus-circle" onClick={this.toAddStore.bind(this,record)}></Icon>
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


export default connect(mapStateToProps)(Menu);