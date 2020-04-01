import axios from 'axios';
import actions from '../constants/actions';
import configs from '../constants/configs';
import {
    getTokenHeader
} from '../../src/untils/utils';
const {
    GET_ENTERPRISE_PARTNER_SUCCESS,//查询企业股东投资
	GET_ENTERPRISE_PARTNER_FAILURE,
	GET_PARTNERTOTAL_SUCCESS,//获取股东数量
	GET_PARTNERTOTAL_FAILURE,
	PUT_PARTNER_SUCCESS,//修改股东信息
	PUT_PARTNER_FAILURE,
	INSERT_PARTNER_SUCCESS,//新增股东信息
	INSERT_PARTNER_FAILURE,
	DELETE_PARTNER_SUCCESS,//删除股东信息
	DELETE_PARTNER_FAILURE,
} = actions;
const baseUrl = configs.baseUrl;
export function getEnterprise_partner(query = '') {
	return async(dispatch) => {
		try {
			const data = (await axios.get(`${baseUrl}partner/query.do${query}`)).data;
			dispatch({
				type: GET_ENTERPRISE_PARTNER_SUCCESS,
				data: data
			});
		} catch (error) {
			dispatch({
				type: GET_ENTERPRISE_PARTNER_FAILURE,
				error: new Error('股东获取失败, 请稍后再试')
			});
		}
	};
};
export function getEnterprise_partnertotal(query = '') {
    return async(dispatch) => {
        try{
            const data = (await axios.get(`${baseUrl}partner/total.do${query}`)).data;
            dispatch({
                type: GET_PARTNERTOTAL_SUCCESS,
                data:data
            });
        }catch(error){
            dispatch({
                type: GET_PARTNERTOTAL_FAILURE,
                error: new Error("股东数量获取失败，请稍后再试")
            });
        }
    }
};
export function applychange_partner(config,query = ''){
    return async(dispatch) => {
        try{
            let headers = getTokenHeader({})
            const data = (await axios.put(`${baseUrl}partner/update.do${query}`,config,{
                headers:headers
            })).data;
            dispatch({
                type:PUT_PARTNER_SUCCESS,
                data:data
            })
        }catch(error){
            dispatch({
                type:PUT_PARTNER_FAILURE,
                error:Error("修改股东信息失败，请稍后再试")
            })
        }
    }
}
export function insert_partner(config,query=''){
    return async(dispatch) => {
        try{
            let headers = getTokenHeader({})
            const data = (await axios.post(`${baseUrl}partner/insert.do${query}`,config,{
                headers:headers
            })).data;
            dispatch({
                type:INSERT_PARTNER_SUCCESS,
                data:data
            })
        }catch(error){
            dispatch({
                type:INSERT_PARTNER_FAILURE,
                error:Error("添加股东失败，请稍后再试")
            })
        }
    }
}
export function delete_partner(query='',config){
    return async(dispatch) => {
        try{
            let headers = getTokenHeader({});
            const data = (await axios.delete(`${baseUrl}partner/delete.do${query}`,{
                headers:headers
            },config)).data;
            dispatch({
                type: DELETE_PARTNER_SUCCESS,
                data: data
            })
        }catch(error){
            dispatch({
                type: DELETE_PARTNER_FAILURE,
                error: Error("删除股东信息失败!!")
            })
        }
    }
}