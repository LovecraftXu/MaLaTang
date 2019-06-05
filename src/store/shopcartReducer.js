import axios from '../http/index';
import { message } from 'antd';


let initState = {
    ids:[],
    list:[],
    obj:{},
	visible:false,
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
//启动模态框
export function showModal(){
    return {type:"SHOW_MODAL"}
}
//关闭模态框
export function closeModal(){
    return {type:"CLOSE_MODAL"}
}
//清空模态框
export function clearModal(){
    return {type:"CLEAR_MODEL"}
}

//重载用户信息
export function reloadShopcart(){
    return function(dispatch){
        dispatch(beginLoading);
        axios.get("/shopcart/findAllWithMenuAndOrder").then((result)=>{
            dispatch({type:"RELOAD_SHOPCART", payload:result.data})         
        })
        dispatch(endLoading);
    }  
}
//根据id删除单行信息
export function deleteById(id){
    return function(dispatch){
        axios.get("/shopcart/deleteById",{
            params:{id}
        }).then(({statusText})=>{
            message.success(statusText);
            dispatch(reloadShopcart());
        })
    }   
}
//提交表单
export function saveData(data){
    return function(dispatch){
        axios.post("/shopcart/saveOrUpdate",data).then(({statusText})=>{
            message.success(statusText);
            dispatch(clearModal());
            dispatch(closeModal());
            dispatch(reloadShopcart());
        })  
    }
}
//接收要修改的信息
export function editData(record){
    return {type:"EDIT_DATA", payload:record}
}

//接收要删除的ids
export function getIds(ids){
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
        console.log(arrNew);
        axios.post("/shopcart/deleteBatchByIds?"+arrNew).then(({statusText})=>{
            message.success(statusText);
            dispatch(reloadShopcart());
        })
    }
}




function ShopcartReducer(state=initState,action){
	switch(action.type){
		case "RELOAD_SHOPCART":
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
        case "SHOW_MODAL":
            return {
                ...state,
                visible:true
            }; 
        case "CLOSE_MODAL":
            return {
                ...state,
                visible:false
            }; 
        case "EDIT_DATA":
            return {
                ...state,
                obj:action.payload
            }; 
        case "GET_IDS":
            return {
                
                ...state,
                ids:action.payload
            };
        case "CLEAR_MODEL":
            return {
                ...state,
                obj:{}
            };           
        
        default:
		return state;
	}
}

export default ShopcartReducer;