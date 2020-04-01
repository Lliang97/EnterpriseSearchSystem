import axios from 'axios';
import actions from '../constants/actions';
import configs from '../constants/configs';
import {
    getTokenHeader
} from '../../src/untils/utils';
const {
    GET_ENTERPRISE_RECRUIT_SUCCESS,//查询公司招聘
	GET_ENTERPRISE_RECRUIT_FAILURE,
	GET_ENTERPRISE_RECRUITNUMBER_SUCCESS,//查询公司招聘条数
	GET_ENTERPRISE_RECRUITNUMBER_FAILURE,
	PUT_RECRUIT_SUCCESS,//修改招聘信息
    PUT_RECRUIT_FAILURE,
    INSERT_RECRUIT_SUCCESS,//新增招聘信息
    INSERT_RECRUIT_FAILURE,
    DELETE_RECRUIT_SUCCESS,//删除招聘信息
    DELETE_RECRUIT_FAILURE,
} = actions;
const baseUrl = configs.baseUrl;
export function getEnterprise_recruit(query = '') {
	return async(dispatch) => {
		try {
			const data = (await axios.get(`${baseUrl}recruit/query.do${query}`)).data;
			dispatch({
				type: GET_ENTERPRISE_RECRUIT_SUCCESS,
				data: data
			});
		} catch (error) {
			dispatch({
				type: GET_ENTERPRISE_RECRUIT_FAILURE,
				error: new Error('查询索公司招聘获取失败, 请稍后再试')
			});
		}
	};
};
export function getEnterprise_recruitnumber(query = '') {
	return async(dispatch) => {
		try {
			const data = (await axios.get(`${baseUrl}recruit/total.do${query}`)).data;
			dispatch({
				type: GET_ENTERPRISE_RECRUITNUMBER_SUCCESS,
				data: data
			});
		} catch (error) {
			dispatch({
				type: GET_ENTERPRISE_RECRUITNUMBER_FAILURE,
				error: new Error('查询索公司招聘条数获取失败, 请稍后再试')
			});
		}
	};
};
export function applychange_recruit(config,query=''){
    return async(dispatch) => {
        try{
			let headers = getTokenHeader({})
            const data = (await axios.put(`${baseUrl}recruit/update.do${query}`,config,{
                headers:headers
            })).data;
            dispatch({
                type:PUT_RECRUIT_SUCCESS,
                data:data
            })
        }catch(error){
            dispatch({
                type:PUT_RECRUIT_FAILURE,
                error:Error("修改招聘失败，请稍后再试")
            })
        }
    }
}
export function insert_recruit(config,query=''){
    return async(dispatch) => {
        try{
            let headers = getTokenHeader({})
            const data = (await axios.post(`${baseUrl}recruit/insert.do${query}`,config,{
                headers:headers
            })).data;
            dispatch({
                type: INSERT_RECRUIT_SUCCESS,
                data: data
            })
        }catch(error){
            dispatch({
                type: INSERT_RECRUIT_FAILURE,
                error: Error("添加招聘失败，请稍后再试")  
            })
        }
    }
}
export function delete_recruit(query='',config){
    return async(dispatch) => {
        try{
            let headers = getTokenHeader({});
            const data = (await axios.delete(`${baseUrl}recruit/delete.do${query}`,{
                headers:headers
            },config)).data;
            dispatch({
                type: DELETE_RECRUIT_SUCCESS,
                data: data
            })
        }catch(error){
            dispatch({
                type: DELETE_RECRUIT_FAILURE,
                error: Error("删除招聘信息失败!!")
            })
        }
    }
}