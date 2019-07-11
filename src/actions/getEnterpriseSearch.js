import axios from 'axios';
import actions from '../constants/actions';
import configs from '../constants/configs';

const {
    GET_ENTERPRISE_SEARCH_SUCCESS,//获取公司信息
	GET_ENTERPRISE_SEARCH_FAILURE,
	GET_ENTERPRISE_NUMBER_SUCCESS,//获取查询的公司数量
	GET_ENTERPRISE_NUMBER_FAILURE,
} = actions;
const baseUrl = configs.baseUrl;
export function getEnterprise_search(query = '') {
	return async(dispatch) => {
		try {
			const data = (await axios.get(`${baseUrl}company/query.do${query}`)).data;
			dispatch({
				type: GET_ENTERPRISE_SEARCH_SUCCESS,
				data: data
			});
		} catch (error) {
			dispatch({
				type: GET_ENTERPRISE_SEARCH_FAILURE,
				error: new Error('查询公司信息获取失败, 请稍后再试')
			});
		}
	};
};
export function getEnterprise_number(query = '') {
	return async(dispatch) => {
		try {
			//let headers = getTokenHeader({});
			const data = (await axios.get(`${baseUrl}company/total.do${query}`)).data;
			dispatch({
				type: GET_ENTERPRISE_NUMBER_SUCCESS,
				data: data
			});
		} catch (error) {
			dispatch({
				type: GET_ENTERPRISE_NUMBER_FAILURE,
				error: new Error('查询公司条数获取失败, 请稍后再试')
			});
		}
	};
};