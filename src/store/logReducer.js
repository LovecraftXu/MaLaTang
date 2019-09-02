/*
 * @Description: In User Settings Edit
 * @Author: your name
 * @Date: 2019-05-30 16:19:00
 * @LastEditTime: 2019-09-02 13:41:21
 * @LastEditors: Please set LastEditors
 */
import axios from '../http/index';
import { message } from 'antd';

let initState = {
    ids:[],
    list:[],
    loading:false,
}
//启动加载
export function beginLoading(){
    return {type:"BEGIN_LOADING"}
}
//结束加载
export function endLoading(){
    return {type:"END_LOADING"}
}

//重载信息
export function reloadLog(){
    return function(dispatch){
        dispatch(beginLoading());
        axios.get("/log/findAll").then((result)=>{
            dispatch({type:"RELOAD_LOG", payload:result.data});
            dispatch(endLoading());

        })
    }  
}
//根据id删除单行信息
export function deleteById(id){
    return function(dispatch){
        axios.get("/log/deleteById",{
            params:{id}
        }).then(({statusText})=>{
            message.success(statusText);
            dispatch(reloadLog());
        })
    }   
}

//接收要删除的ids
export function getIds(ids){
    // console.log(ids)
    return {type:"GET_IDS", payload:ids}
}
//批量删除
export function deleteByIds(ids){
    return function(dispatch){
        var arr = ""; 
        for(let id in ids ){
            arr+="ids="+ids[id]+'&';
        }
        let arrNew = arr.substring(0,arr.length-1);
        console.log(arrNew)
        axios.post("/log/deleteBatchByIds?"+arrNew).then(({statusText})=>{
            message.success(statusText);
            dispatch(reloadLog());
        })
    }
}


function logReducer(state=initState,action){
	switch(action.type){
		case "RELOAD_LOG":
			return {
                ...state,
                list:action.payload
            };
        case "BEGIN_LOADING":
            return {
                ...state,
                loading:true
            };
        case "END_LOADING":
            return {
                ...state,
                loading:false
            };
        case "GET_IDS":
            return {
                ...state,
                ids:action.payload
            };     
        
        default:
		return state;
	}
}

export default logReducer;