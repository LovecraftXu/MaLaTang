import axios from '../http/index';
import { message } from 'antd';


let initState = {
    ids:[],
    list:[],
    obj:{},
	visible:false,
    loading:false,
    visible2:false,
    obj2:{}
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
//关闭
export function closeModal(){
    return {type:"CLOSE_MODAL"}
}
//清空模态框
export function clearModal(){
    return {type:"CLEAR_MODEL"}
}

//启动模态框2
export function showModal2(){
    return {type:"SHOW_MODAL2"}
}
//关闭
export function closeModal2(){
    return {type:"CLOSE_MODAL2"}
}
//清空模态框2
export function clearModal2(){
    return {type:"CLEAR_MODEL2"}
}

//重载信息
export function reloadMenu(){
    return function(dispatch){
        dispatch(beginLoading);
        axios.get("/menu/findAll").then((result)=>{
            dispatch({type:"RELOAD_MENU", payload:result.data})         
        })
        dispatch(endLoading);
    }  
}
//根据id删除单行信息
export function deleteById(id){
    return function(dispatch){
        axios.get("/menu/deleteById",{
            params:{id}
        }).then(({statusText})=>{
            message.success(statusText);
            dispatch(reloadMenu());
        })
    }   
}
//提交表单
export function saveData(data){
    return function(dispatch){
        axios.post("/menu/saveOrUpdate",data).then(({statusText})=>{
            message.success(statusText);
            dispatch(clearModal());
            dispatch(closeModal());
            dispatch(reloadMenu());
        })  
    }
}

//提交表单2
export function saveData2(data){
    return function(dispatch){
        let {menuId, menuSum} = data;
        axios.get("/menu/addStore?id="+menuId+"&num="+menuSum).then(({statusText})=>{
            message.success(statusText);
            dispatch(clearModal2());
            dispatch(closeModal2());
            dispatch(reloadMenu());
        })  
    }
}
//接收要修改的信息
export function editData(record){
    return {type:"EDIT_DATA", payload:record}
}

//接收要修改的信息2
export function editData2(record){
    return {type:"EDIT_DATA2", payload:record}
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
        axios.post("/menu/deleteBatchByIds?"+arrNew).then(({statusText})=>{
            message.success(statusText);
            dispatch(reloadMenu());
        })
    }
}




function menuReducer(state=initState,action){
	switch(action.type){
		case "RELOAD_MENU":
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
            
        case "SHOW_MODAL2":
            return {
                ...state,
                visible2:true
            }; 
        case "CLOSE_MODAL2":
            return {
                ...state,
                visible2:false
            }; 
        case "CLEAR_MODEL2":
            return {
                ...state,
                obj2:{}
            };
        case "EDIT_DATA2":
            return {
                ...state,
                obj2:action.payload
            }; 
        
        default:
		return state;
	}
}

export default menuReducer;