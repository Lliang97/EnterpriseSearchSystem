import axios from 'axios';
import actions from '../constants/actions';
import configs from '../constants/configs';
import {
    getTokenHeader
} from '../../src/untils/utils';
const {
    GET_TRADETOTAL_SUCCESS,//查询商标总数
    GET_TRADETOTAL_FAILURE,
    GET_TRADEDATA_SUCCESS,//查询商标数据
    GET_TRADEDATA_FAILURE,
    PUT_TRADE_SUCCESS,//修改商标
    PUT_TRADE_FAILURE,
    INSERT_TRADE_SUCCESS,//新增商标数据
    INSERT_TRADE_FAILURE,
    DELETE_TRADE_SUCCESS,//删除商标数据
    DELETE_TRADE_FAILURE,
} = actions;
const baseUrl = configs.baseUrl;
export function getEnterprise_tradetotal(query = '') {
    return async(dispatch) => {
        try{
            const data = (await axios.get(`${baseUrl}/trade/total.do${query}`)).data;
            dispatch({
                type:GET_TRADETOTAL_SUCCESS,
                data:data
            })
        }catch(error){
            dispatch({
                type:GET_TRADETOTAL_FAILURE,
                error:Error("商标总数获取失败，请稍后再试")
            })
        }
    }
};
export function getEnterprise_tradedata(query = '') {
    return async(dispatch) => {
        try{
            const data = (await axios.get(`${baseUrl}/trade/query.do${query}`)).data;
            dispatch({
                type:GET_TRADEDATA_SUCCESS,
                data:data
            })
        }catch(error){
            dispatch({
                type:GET_TRADEDATA_FAILURE,
                error:Error("商标数据获取失败，请稍后再试")
            })
        }
    }
}
export function applychange_trade(config,query=''){
    return async(dispatch) => {
        try{
            let headers = getTokenHeader({})
            const data = (await axios.put(`${baseUrl}/trade/update.do${query}`,config,{
                headers:headers
            })).data;
            dispatch({
                type:PUT_TRADE_SUCCESS,
                data:data
            })
        }catch(error){
            dispatch({
                type:PUT_TRADE_FAILURE,
                error:Error("修改商标失败，请稍后再试")
            })
        }
    }
}
export function insert_trade(config,query = '') {
    return async(dispatch) => {
        try{
            let headers = getTokenHeader({})
            const data = (await axios.post(`${baseUrl}/trade/insert.do${query}`,config,{
                headers:headers
            })).data;
            dispatch({
                type:INSERT_TRADE_SUCCESS,
                data:data
            })
        }catch(error){
            dispatch({
                type:INSERT_TRADE_FAILURE,
                error:Error("添加商标信息失败，请稍后再试")
            })
        }
    }
}
export function delete_trade(query = '',config) {
    return async(dispatch) => {
        try{
            let headers = getTokenHeader({})
            const data = (await axios.delete(`${baseUrl}/trade/delete.do${query}`,{
                headers:headers
            },config)).data;
            dispatch({
                type:DELETE_TRADE_SUCCESS,
                data:data
            })
        }catch(error){
            dispatch({
                type:DELETE_TRADE_FAILURE,
                error:Error("删除商标失败，请稍后再试")
            })
        }
    }
}