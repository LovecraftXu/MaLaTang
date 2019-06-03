import React from 'react';

import { Button, Table, Divider, Icon, Modal, } from 'antd';
import { connect } from 'react-redux';

import { 
    reloadLog,
    deleteById,
    getIds,
    deleteByIds,
} from '../../store/logReducer'



class Log extends React.Component {

    componentWillMount(){
        this.props.dispatch(reloadLog());
    }

    //查看详细信息
    toDetails(record){
        this.props.history.push({
            pathname:'/logDetails',
            state:record
        });
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


    render(){
        let { ids,  list,  loading } = this.props.logState;
        let { Column } = Table;
        var rowSelection = {
            onChange: (selectedRowKeys, selectedRows) => {
                this.props.dispatch(getIds(selectedRowKeys));
            },
            getCheckboxProps: record => ({
                disabled: record.name === 'Disabled User', // Column configuration not to be checked
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
            <div className="log">
                <h2>日志管理</h2>
                <div className="btns">
                    <Button type="danger" className="btn" onClick = {this.batchDeleteByIds.bind(this,ids)}>批量下架</Button>
                </div>

                <Table rowKey="logId" 
                dataSource={list} 
                bordered={true} 
                rowSelection={rowSelection} 
                size="small" 
                pagination={pagination} 
                loading={loading}>
                    <Column align="center" title="执行者" dataIndex="logOp" key="logOp" />
                    <Column align="center" title="事件内容" dataIndex="logEvent" key="logEvent" />
                    <Column align="center" title="执行时间" dataIndex="logDate" key="logDate" />
                    
                    <Column align="center"
                    title="操作"
                    key="action"
                    render={(text, record) => (
                        <span>
                        <Icon type="delete" onClick={this.toDelete.bind(this,record.logId)}></Icon>
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


export default connect(mapStateToProps)(Log);