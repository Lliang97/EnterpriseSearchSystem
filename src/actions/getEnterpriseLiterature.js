import axios from 'axios';
import actions from '../constants/actions';
import configs from '../constants/configs';

const {
    GET_ENTERPRISE_LITERATURE_SUCCESS,//查询公司科技文献
	GET_ENTERPRISE_LITERATURE_FAILURE,
	GET_ENTERPRISE_LITERATURENUMBER_SUCCESS,//查询公司科技文献条数
	GET_ENTERPRISE_LITERATURENUMBER_FAILURE
} = actions;
const baseUrl = configs.baseUrl;
export function getEnterprise_literature(query = '') {
	return async(dispatch) => {
		try {
			const data = (await axios.get(`${baseUrl}literature/query.do${query}`)).data;
			dispatch({
				type: GET_ENTERPRISE_LITERATURE_SUCCESS,
				data: data
			});
		} catch (error) {
			dispatch({
				type: GET_ENTERPRISE_LITERATURE_FAILURE,
				error: new Error('查询公司科技文献获取失败, 请稍后再试')
			});
		}
	};
};
export function getEnterprise_literaturenumber(query = '') {
	return async(dispatch) => {
		try {
			const data = (await axios.get(`${baseUrl}literature/total.do${query}`)).data;
			dispatch({
				type: GET_ENTERPRISE_LITERATURENUMBER_SUCCESS,
				data: data
			});
		} catch (error) {
			dispatch({
				type: GET_ENTERPRISE_LITERATURENUMBER_FAILURE,
				error: new Error('查询公司科技文献条数获取失败, 请稍后再试')
			});
		}
	};
};
