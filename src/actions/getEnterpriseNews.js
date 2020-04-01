import axios from 'axios';
import actions from '../constants/actions';
import configs from '../constants/configs';
import {
    getTokenHeader
} from '../../src/untils/utils';
const {
    GET_ENTERPRISE_NEWS_SUCCESS,//查询公司新闻
	GET_ENTERPRISE_NEWS_FAILURE,
	GET_ENTERPRISE_NEWSNUMBER_SUCCESS,//查询新闻条数
	GET_ENTERPRISE_NEWSNUMBER_FAILURE,
	PUT_NEWS_SUCCESS,//修改新闻
	PUT_NEWS_FAILURE,
	INSERT_NEWS_SUCCESS,//新增新闻
	INSERT_NEWS_FAILURE,
	DELETE_NEWS_SUCCESS,//删除新闻
	DELETE_NEWS_FAILURE,
} = actions;
const baseUrl = configs.baseUrl;
export function getEnterprise_news(query = '') {
	return async(dispatch) => {
		try {
			const data = (await axios.get(`${baseUrl}news/query.do${query}`)).data;
			dispatch({
				type: GET_ENTERPRISE_NEWS_SUCCESS,
				data: data
			});
		} catch (error) {
			dispatch({
				type: GET_ENTERPRISE_NEWS_FAILURE,
				error: new Error('查询公司新闻获取失败, 请稍后再试')
			});
		}
	};
};
export function getEnterprise_newsnumber(query = '') {
	return async(dispatch) => {
		try {
			const data = (await axios.get(`${baseUrl}news/total.do${query}`)).data;
			dispatch({
				type: GET_ENTERPRISE_NEWSNUMBER_SUCCESS,
				data: data
			});
		} catch (error) {
			dispatch({
				type: GET_ENTERPRISE_NEWSNUMBER_FAILURE,
				error: new Error('查询公司新闻条数获取失败, 请稍后再试')
			});
		}
	};
};

export function applychange_news(config,query = ''){
    return async(dispatch) => {
        try {
            let headers = getTokenHeader({})
            const data = (await axios.put(`${baseUrl}/news/update.do${query}`,config,{
                headers:headers
            })).data;
            dispatch({
                type: PUT_NEWS_SUCCESS,
                data: data
            })
        }catch(error){
            dispatch({
                type: PUT_NEWS_FAILURE,
                error: Error("修改新闻失败，请稍后再试")
            })
        }
    }
}
export function insert_news(config,query=''){
    return async(dispatch) => {
        try{
            let headers = getTokenHeader({})
            const data = (await axios.post(`${baseUrl}/news/insert.do${query}`,config,{
                headers:headers
            })).data;
            dispatch({
                type: INSERT_NEWS_SUCCESS,
                data: data
            })
        }catch(error){
            dispatch({
                type: INSERT_NEWS_FAILURE,
                error: Error("添加新闻失败，请稍后再试")  
            })
        }
    }
}
export function delete_news(query='',config){
    return async(dispatch) => {
        try{
            let headers = getTokenHeader({});
            const data = (await axios.delete(`${baseUrl}/news/delete.do${query}`,{
                headers:headers
            },config)).data;
            dispatch({
                type: DELETE_NEWS_SUCCESS,
                data: data
            })
        }catch(error){
            dispatch({
                type: DELETE_NEWS_FAILURE,
                error: Error("删除新闻信息失败!!")
            })
        }
    }
}